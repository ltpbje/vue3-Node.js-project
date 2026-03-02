const axios = require('axios');

async function createTestUser() {
    try {
        const response = await axios.post('http://localhost:3000/adminapi/user/register', {
            username: 'testuser',
            password: 'test123456',
            role: 1
        });
        console.log('测试用户创建成功！');
        console.log('响应数据:', response.data);
    } catch (error) {
        console.error('创建测试用户失败:', error.message);
        if (error.response) {
            console.error('响应状态:', error.response.status);
            console.error('响应数据:', error.response.data);
        }
    }
}

createTestUser();
