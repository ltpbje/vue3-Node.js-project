const UserModel = require("../../models/UserModel")
const bcrypt = require('bcryptjs')

const UserService =  {
    login: async ({ username,password}) => {
        // 先查找用户
        const user = await UserModel.findOne({ username })
        if (!user) return []

        // 前端已经使用 MD5 加密，直接用于验证
        // 验证密码（bcrypt compare 会自动处理）
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) return []

        return [user]
    },
    upload: async ({ _id, username, introduction, gender, avatar }) => {
        if (avatar) {
            return UserModel.updateOne({ _id }, {
                username,introduction,avatar,gender
            })
        } else {
            return UserModel.updateOne({ _id }, {
                username,introduction,gender
            })            
        }
    },
    add: async ({  username, introduction, gender, avatar,password,role }) => {
        // 前端已经使用 MD5 加密，直接使用 bcrypt 哈希存储
        const hashedPassword = await bcrypt.hash(password, 10)

        return UserModel.create({
            username, introduction, gender, avatar, password: hashedPassword, role
        })
    },
    getList:async ({ id, currentPage, pageSize }) => {
        // 如果有 id 参数，返回单个用户
        if (id) {
            return UserModel.find({_id:id},['username','role','introduction'])
        }

        // 分页查询
        const skip = (currentPage - 1) * pageSize
        const [data, total] = await Promise.all([
            UserModel.find({}, ['username','role','avatar','introduction','gender'])
                .skip(skip)
                .limit(pageSize)
                .sort({ _id: -1 }),
            UserModel.countDocuments({})
        ])

        return { data, total }
    },
    delList: async ({_id}) => {
        return UserModel.deleteOne({_id})
    },
    putList: async (body) => {
        const { _id, password, ...updateData } = body

        // 如果提供了新密码，则进行 bcrypt 哈希
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10)
            updateData.password = hashedPassword
        }

        return UserModel.updateOne({ _id }, updateData)
    }
}


module.exports = UserService