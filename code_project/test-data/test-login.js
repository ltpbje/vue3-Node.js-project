const axios = require('axios');

async function testLogin() {
    try {
        const response = await axios.post('http://localhost:3000/adminapi/user/login', {
            username: 'admin',
            password: '123456'
        });
        console.log('登录成功！');
        console.log('响应数据:', response.data);
        console.log('Authorization Header:', response.headers.authorization);
    } catch (error) {
        console.error('登录失败:', error.message);
        if (error.response) {
            console.error('响应状态:', error.response.status);
            console.error('响应数据:', error.response.data);
        }
    }
}

testLogin();
