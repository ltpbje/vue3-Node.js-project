const NewsModel = require("../../models/NewsModel")

const NewsService = {
    add: async (data) => {
       const {title,content,category,isPublish,cover,editTime,username}= data
        // console.log('数据库操作')
        return NewsModel.create({title,content,category,isPublish,cover,editTime,username })
    },
    updateList: async ({ title, content, category, isPublish,_id,cover,editTime }) => {
        if (cover) {
            return NewsModel.updateOne({ _id }, {
                title, content, category, isPublish,cover,editTime
            })
        } else {
            return NewsModel.updateOne({ _id }, {
                title, content, category, isPublish,editTime
            })
        }
    },
    getList: async ({ _id ,query}) => {
        if (_id) {
            return   NewsModel.find({_id})
        } else {
            // 分页查询
            const { currentPage, pageSize } = query
            if (currentPage && pageSize) {
                const skip = (currentPage - 1) * pageSize
                const [data, total] = await Promise.all([
                    NewsModel.find({username: query.username})
                        .skip(skip)
                        .limit(pageSize)
                        .sort({ _id: -1 }),
                    NewsModel.countDocuments({username: query.username})
                ])
                return { data, total }
            }
            return NewsModel.find({username: query.username})
        }
    },
    publish: async ({_id,isPublish,editTime}) => {
        return NewsModel.updateOne({
            _id
        }, {
            isPublish,
            editTime
        })
    },
    delList: async ({ _id }) => {
        return NewsModel.deleteOne({
            _id
        })
    }
}

module.exports = NewsService