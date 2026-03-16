const mongoose = require('mongoose')

const RoleSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    code: {
        type: Number,
        required: true,
        unique: true
    },
    description: {
        type: String,
        default: ''
    },
    permissions: {
        type: [String],
        default: []
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

const RoleModel = mongoose.model('Role', RoleSchema)

module.exports = RoleModel
