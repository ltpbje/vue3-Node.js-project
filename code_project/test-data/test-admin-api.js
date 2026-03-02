const axios = require('axios');

async function testAdminAPI() {
    try {
        console.log('测试后台管理系统 API...');
        
        const loginResponse = await axios.post('http://localhost:3000/adminapi/user/login', {
            username: 'testuser',
            password: 'test123456'
        });
        
        const token = loginResponse.headers.authorization;
        console.log('认证令牌:', token ? '获取成功' : '获取失败');
        
        const userResponse = await axios.get('http://localhost:3000/adminapi/user/list?page=1&pageSize=10', {
            headers: {
                'Authorization': token
            }
        });
        
        console.log('用户列表接口测试成功');
        console.log('响应状态:', userResponse.status);
        console.log('数据条数:', userResponse.data.data ? userResponse.data.data.length : 0);
        
        return true;
    } catch (error) {
        console.error('测试失败:', error.message);
        if (error.response) {
            console.error('响应状态:', error.response.status);
            console.error('响应数据:', error.response.data);
        }
        return false;
    }
}

testAdminAPI();
