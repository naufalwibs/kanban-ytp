const { User, Task } = require('../models')
const { verifyToken } = require('../helpers/jwt')

const authenticate = (req, res, next) => {
    if(req.headers.access_token) {
        let { id, email } = verifyToken(req.headers.access_token)

        User.findOne({
            where: { email }
        })
        .then(user => {
            req.currentUser = { id: user.id, email: user.email }
            next()
        })
        .catch(err => {
            next({ code: 500, message: 'Internal server error', from: 'auth.js' })
        })        
    } else {
        next({ code: 401, message: 'Unauthorized, you must login first', from: 'auth.js' })
    }

}

const authorize = (req, res, next) => {
    let { id, email } = req.currentUser;

    Task.findOne({ where: {
        id : req.params.id
        } 
    })
    .then(data => {
        if (data) {
            if (data.UserId == id) {
                next()
            } else {
                next({ code: 401, message: " You don't have permission to have access this task ", from: 'auth.js' })
            }
        } else {
            next({ code: 404, message: 'Data not found', from: 'auth.js' })
        }
    })
    .catch(err => {
        next({ code: 500, message: 'Internal server error', from: 'auth.js' })
    })

    
}

module.exports = {
    authenticate,
    authorize
}