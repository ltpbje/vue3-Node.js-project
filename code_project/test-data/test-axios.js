const axios = require('axios');

async function testWithAxios() {
    try {
        const token = await axios.post('http://localhost:3000/adminapi/user/login', {
            username: 'testuser',
            password: 'test123456'
        }).then(res => res.headers.authorization);
        
        console.log('Token:', token);
        
        const response = await axios.get('http://localhost:3000/adminapi/user/list?page=1&pageSize=10', {
            headers: {
                'Authorization': token
            }
        });
        
        console.log('响应状态:', response.status);
        console.log('响应数据:', response.data);
    } catch (error) {
        console.error('错误:', error.message);
        if (error.response) {
            console.error('响应状态:', error.response.status);
            console.error('响应数据:', error.response.data);
        }
    }
}

testWithAxios();
