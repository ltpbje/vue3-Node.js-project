const CategoryService = require("../../services/admin/CategoryService")

const CategoryController = {
    add: async (req, res) => {
        const { title, value, description, sort, status } = req.body
        await CategoryService.add({
            title,
            value: Number(value),
            description,
            sort: sort ? Number(sort) : 0,
            status: status !== undefined ? Number(status) : 1
        })
        res.send({
            ActionType: 'OK'
        })
    },
    updateList: async (req, res) => {
        const { _id, title, value, description, sort, status } = req.body
        await CategoryService.updateList({
            _id,
            title,
            value: Number(value),
            description,
            sort: sort ? Number(sort) : 0,
            status: status !== undefined ? Number(status) : 1
        })
        res.send({
            ActionType: 'OK'
        })
    },
    getList: async (req, res) => {
        const result = await CategoryService.getList({ _id: req.params.id })
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    delList: async (req, res) => {
        await CategoryService.delList({ _id: req.params.id })
        res.send({
            ActionType: 'OK'
        })
    }
}

module.exports = CategoryController
