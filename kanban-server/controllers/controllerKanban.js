const { User, Task } = require('../models')

class ControllerKanban{
    static showKanbanBoard(req, res, next) {

        Task.findAll({
            order: [
                ['createdAt', 'ASC']
            ],
            include: {
                model : User,
            }
        })
        .then(tasksDB => {
            let tasks = [];
            tasksDB.forEach(el => {
                tasks.push({
                    id: el.id,
                    UserId: el.UserId,
                    title: el.title,
                    category: el.category,
                    createdAt: el.createdAt,
                    updatedAt: el.updatedAt,
                    User: {
                        id: el.User.id,
                        email: el.User.email,
                        createdAt: el.User.createdAt,
                        updatedAt: el.User.updatedAt
                    }
                })
            });
            
            res.status(200).json({ tasks })
        })
        .catch(err => {
            next({ code: 500, message: 'Internal server error', from: 'controllerKanban.showKanbanBoard' })
        })
    }

    static postTask(req, res, next) {
        let { id, email } = req.currentUser;
        let { title, category } = req.body;

        Task.create({ title, UserId: id, category })
        .then(task => {
            res.status(201).json({ task })
        })
        .catch(err => {
            next({ code: 500, message: 'Internal server error', from: 'controllerKanban.postTask' })
        })
    }

    static getTaskById(req, res, next) {
        let taskId = req.params.id;
        let { id, email } = req.currentUser;

        Task.findOne({
            where: {
                id : taskId,
                UserId: id
            }
        })
        .then(task => {
            res.status(200).json({ task })
        })
        .catch(err => {
            next({ code: 500, message: 'Internal server error', from: 'controllerKanban.getTaskId' })
        })
    }

    static editTaskTitleDate(req, res, next) {
        let taskId = req.params.id;
        let { title } = req.body;
        let updatedAt = new Date()

        Task.update({ title, updatedAt }, {
            where: { id: taskId }
        })
        .then(task => {
            res.status(200).json({ message: 'Task title succesfully changed' })
        })
        .catch(err => {
            next({ code: 500, message: 'Internal server error', from: 'controllerKanban.editTaskTitleDate' })
        })
    }

    static editTaskCategory(req, res, next) {
        let taskId = req.params.id;
        let { category } = req.body;

        Task.update({ category }, {
            where: { id: taskId }
        })
        .then(task => {
            res.status(200).json({ message: 'Task category succesfully changed' })
        })
        .catch(err => {
            next({ code: 500, message: 'Internal server error', from: 'controllerKanban.editTaskCategory' })
        })
    }

    static deleteTask(req, res, next) {
        let taskId = req.params.id;

        Task.destroy({
            where: { id: taskId }
        })
        .then(task => {
            res.status(200).json({ message: 'Task succesfully deleted' })
        })
        .catch(err => {
            next({ code: 500, message: 'Internal server error', from: 'controllerKanban.deleteTask' })
        })
    }

}

module.exports = ControllerKanban;