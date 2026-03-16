const CategoryModel = require("../../models/CategoryModel")

const CategoryService = {
    add: async (data) => {
        const { title, value, description, sort, status } = data
        return CategoryModel.create({
            title,
            value,
            description: description || '',
            sort: sort || 0,
            status: status !== undefined ? status : 1,
            createTime: new Date(),
            updateTime: new Date()
        })
    },
    updateList: async ({ _id, title, value, description, sort, status }) => {
        return CategoryModel.updateOne({ _id }, {
            title,
            value,
            description,
            sort,
            status,
            updateTime: new Date()
        })
    },
    getList: async ({ _id }) => {
        if (_id) {
            return CategoryModel.findById(_id)
        }
        return CategoryModel.find({}).sort({ sort: -1, _id: -1 })
    },
    delList: async ({ _id }) => {
        return CategoryModel.deleteOne({ _id })
    }
}

module.exports = CategoryService
