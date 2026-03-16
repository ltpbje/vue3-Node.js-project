const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    sort: {
        type: Number,
        default: 0
    },
    status: {
        type: Number,
        default: 1
    },
    createTime: {
        type: Date,
        default: Date.now
    },
    updateTime: {
        type: Date,
        default: Date.now
    }
})

const CategoryModel = mongoose.model('Category', CategorySchema)

module.exports = CategoryModel
