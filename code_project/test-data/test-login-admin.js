const axios = require('axios');

async function testLogin() {
    try {
        console.log('测试登录接口...');
        console.log('用户名: admin');
        console.log('密码: 123456');
        console.log('');
        
        const response = await axios.post('http://localhost:3000/adminapi/user/login', {
            username: 'admin',
            password: '123456'
        });
        
        console.log('登录成功！');
        console.log('响应状态:', response.status);
        console.log('响应数据:', JSON.stringify(response.data, null, 2));
        console.log('Authorization:', response.headers.authorization);
    } catch (error) {
        console.error('登录失败！');
        console.error('错误信息:', error.message);
        if (error.response) {
            console.error('响应状态:', error.response.status);
            console.error('响应数据:', JSON.stringify(error.response.data, null, 2));
        }
    }
}

testLogin();
