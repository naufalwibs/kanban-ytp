const express = require('express');
const router = express.Router();
const controllerKanban = require('../controllers/controllerKanban')
const { authorize } = require('../middlewares/auth')

router.post('/tasks', controllerKanban.postTask)
router.get('/tasks', controllerKanban.showKanbanBoard)
router.get('/tasks/:id', authorize, controllerKanban.getTaskById)
router.put('/tasks/:id', authorize, controllerKanban.editTaskTitleDate)
router.patch('/tasks/:id', authorize, controllerKanban.editTaskCategory)
router.delete('/tasks/:id', authorize, controllerKanban.deleteTask)


module.exports = router;