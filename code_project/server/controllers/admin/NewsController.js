const NewsService = require("../../services/admin/NewsService")
const moment = require('moment-timezone');
const date = moment().tz('Asia/Shanghai').format();
const NewsController = {
    add: async (req, res) => {
        // console.log(req.file,req.body)
        const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
        const { title, content, category, isPublish,username } = req.body
        // console.log(new Date());
        // 调用service进行添加
        await NewsService.add({
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            editTime:new Date(),
            username
            
        })
        res.send({
            ActionType: 'OK'
        })
        
    },
    updateList:async (req, res) => {
         const cover = req.file ? `/newsuploads/${req.file.filename}` : ''
        const { title, content, category, isPublish,_id } = req.body
        // console.log(new Date());
        // 调用service进行更新
        await NewsService.updateList({
            _id,
            title,
            content,
            category: Number(category),
            isPublish: Number(isPublish),
            cover,
            editTime: new Date()
            // editTime:new Date()
        })
        res.send({
            ActionType: 'OK'
        })

    },
    getList: async (req, res) => {
        const result = await NewsService.getList({_id:req.params.id,query:req.query})
        // 如果返回的是分页数据对象（包含data和total）
        if (result && result.data !== undefined) {
            res.send({
                ActionType: 'OK',
                data: result.data,
                total: result.total
            })
        } else {
            // 返回完整数组（单个用户或未分页的情况）
            res.send({
                ActionType: 'OK',
                data: result
            })
        }
    },
    publish:async (req,res) => {
        await NewsService.publish({
            ...req.body,
            editTime:new Date()
        })
        res.send({
            ActionType: 'OK',
        })
    },
    delList: async (req, res) => {
        await NewsService.delList({_id:req.params.id})
        res.send({
            ActionType:'OK'
        })
    }
  
}

module.exports = NewsController