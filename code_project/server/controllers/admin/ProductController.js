const ProductService = require("../../services/admin/ProductService")

const moment = require('moment-timezone');
const date = moment().tz('Asia/Shanghai').format();
const ProductController = {
    add: async (req, res) => {
        // console.log(req)
        
        // console.log(req.file,req.body)
        const cover = req.file ? `/productuploads/${req.file.filename}` : ''
        const { title, introduction,detail,username } = req.body
        // console.log(new Date());
        // 调用service进行添加
        await ProductService.add({
            title,
            introduction,
            detail,           
            cover,
            editTime:date,
            username
            // editTime:new Date()
        })
        res.send({
            ActionType: 'OK'
        })
        
    },
    updateList:async (req, res) => {
         const cover = req.file ? `/productuploads/${req.file.filename}` : ''
        const { title, introduction,detail,_id } = req.body
        // console.log(new Date());
        // 调用service进行更新
        await ProductService.updateList({
            _id,
            title,
            introduction,
            detail,
            cover,
            editTime: new Date()
            // editTime:new Date()
        })
        res.send({
            ActionType: 'OK'
        })

    },
    getList: async (req, res) => {
        const result = await ProductService.getList({_id:req.params.id,query:req.query})
        // 如果返回的是分页数据对象（包含data和total）
        if (result && result.data !== undefined) {
            res.send({
                ActionType: 'OK',
                data: result.data,
                total: result.total
            })
        } else {
            // 返回完整数组（单个产品或未分页的情况）
            res.send({
                ActionType: 'OK',
                data: result
            })
        }
    },
    // publish:async (req,res) => {
    //     await NewsService.publish({
    //         ...req.body,
    //         editTime:date
    //     })
    //     res.send({
    //         ActionType: 'OK',
    //     })
    // },
    delList: async (req, res) => {
        await ProductService.delList({_id:req.params.id})
        res.send({
            ActionType:'OK'
        })
    }
}

module.exports = ProductController