const express = require('express')
const router = express.Router()
const CategoryController = require('../../controllers/admin/CategoryController')

router.post('/add', CategoryController.add)
router.post('/update', CategoryController.updateList)
router.get('/list', CategoryController.getList)
router.get('/list/:id', CategoryController.getList)
router.delete('/list/:id', CategoryController.delList)

module.exports = router
