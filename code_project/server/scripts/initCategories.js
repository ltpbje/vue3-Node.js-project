const mongoose = require('mongoose')
const CategoryModel = require('../models/CategoryModel')

const initCategories = async () => {
    try {
        const categories = [
            {
                title: '最新动态',
                value: 1,
                description: '最新动态相关新闻',
                sort: 100,
                status: 1
            },
            {
                title: '典型案例',
                value: 2,
                description: '典型案例相关新闻',
                sort: 90,
                status: 1
            },
            {
                title: '通知公告',
                value: 3,
                description: '通知公告相关新闻',
                sort: 80,
                status: 1
            }
        ]

        for (const category of categories) {
            const existing = await CategoryModel.findOne({ value: category.value })
            if (!existing) {
                await CategoryModel.create(category)
                console.log(`分类 "${category.title}" 创建成功`)
            } else {
                console.log(`分类 "${category.title}" 已存在`)
            }
        }

        console.log('分类初始化完成')
        process.exit(0)
    } catch (error) {
        console.error('初始化失败:', error)
        process.exit(1)
    }
}

mongoose.connect('mongodb://localhost:27017/vue3-node-project').then(() => {
    console.log('数据库连接成功')
    initCategories()
}).catch(err => {
    console.error('数据库连接失败:', err)
    process.exit(1)
})
