const { User } = require('../models');
const { comparePassword } = require('../helpers/bcryptjs');
const { generateToken } = require('../helpers/jwt');
const { OAuth2Client } = require('google-auth-library');

class ControllerAccount{
    static register(req, res, next) {

        let { email, password } = req.body;

        User.create({ email, password })
        .then(user => {
            res.status(201).json({ id: user.id, email: user.email })
        })
        .catch(err => {
            next(err)
        })
    }

    static login(req, res, next) {
        console.log(req.body)
        let { email, password } = req.body;

        User.findOne({
            where: { email }
        })
        .then(user => {
            if(user) {
                let comparedPassword = comparePassword(password, user.password)
                
                if (comparedPassword) {
                    let payload = {
                        id: user.id,
                        email: user.email
                    }
                    const token = generateToken(payload);
                    res.status(200).json({ id: payload.id, email: payload.email, access_token: token})
                } else {
                    next({ code: 401, message: 'Invalid email / password', from: 'controllerAccount.login' })
                }
            } else {
                next({ code: 401, message: 'Invalid email / password', from: 'controllerAccount.login' })
            }
        })
        .catch(err => {
            next({ code: 500, message: 'Internal error server', from: 'controllerAccount.login' })
        })
    }

    static googleLogin(req, res, next) {
        let token = req.body.token;
        console.log(token)
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_CLIENT_ID
            })

            const googleUserParams = ticket.getPayload();

            User.findOrCreate({
                where: {
                    email: googleUserParams.email
                },
                defaults : {
                    name: googleUserParams.name,
                    password: (new Date()).toDateString()
                }
            })
            .then( user => {
                // console.log(user)
                let payload = { id:user[0].id, email: user[0].email }
                res.status(200).json({
                    id : user[0].id,
                    email : user[0].email,
                    access_token : generateToken(payload)
                })
            })
            .catch(err => {
                next(err)
            }) 
        }

        verify().catch(console.error)
    }

}

module.exports = ControllerAccount;