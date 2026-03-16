const express = require('express')
const router = express.Router()
const RoleController = require('../../controllers/admin/RoleController')

router.post('/add', RoleController.add)
router.post('/update', RoleController.updateList)
router.get('/list', RoleController.getList)
router.get('/list/:id', RoleController.getList)
router.delete('/list/:id', RoleController.delList)

module.exports = router
