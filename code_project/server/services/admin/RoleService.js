const RoleModel = require("../../models/RoleModel")

const RoleService = {
    add: async (data) => {
        const { name, code, description, permissions, status } = data
        return RoleModel.create({
            name,
            code,
            description: description || '',
            permissions: permissions || [],
            status: status !== undefined ? status : 1,
            createTime: new Date(),
            updateTime: new Date()
        })
    },
    updateList: async ({ _id, name, code, description, permissions, status }) => {
        return RoleModel.updateOne({ _id }, {
            name,
            code,
            description,
            permissions,
            status,
            updateTime: new Date()
        })
    },
    getList: async ({ _id }) => {
        if (_id) {
            return RoleModel.findById(_id)
        }
        return RoleModel.find({}).sort({ _id: -1 })
    },
    delList: async ({ _id }) => {
        return RoleModel.deleteOne({ _id })
    }
}

module.exports = RoleService
