const RoleService = require("../../services/admin/RoleService")

const RoleController = {
    add: async (req, res) => {
        const { name, code, description, permissions, status } = req.body
        await RoleService.add({
            name,
            code,
            description,
            permissions,
            status: status !== undefined ? Number(status) : 1
        })
        res.send({
            ActionType: 'OK'
        })
    },
    updateList: async (req, res) => {
        const { _id, name, code, description, permissions, status } = req.body
        await RoleService.updateList({
            _id,
            name,
            code,
            description,
            permissions,
            status: status !== undefined ? Number(status) : 1
        })
        res.send({
            ActionType: 'OK'
        })
    },
    getList: async (req, res) => {
        const result = await RoleService.getList({ _id: req.params.id })
        res.send({
            ActionType: 'OK',
            data: result
        })
    },
    delList: async (req, res) => {
        await RoleService.delList({ _id: req.params.id })
        res.send({
            ActionType: 'OK'
        })
    }
}

module.exports = RoleController
