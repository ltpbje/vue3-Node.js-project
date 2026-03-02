const axios = require('axios');
const crypto = require('crypto');

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

async function testTokenFormat() {
    try {
        console.log('========================================');
        console.log('测试 Token 格式问题');
        console.log('========================================\n');
        
        const hashedPassword = md5('123456');
        console.log('1. 登录获取 Token...');
        
        const loginResponse = await axios.post('http://localhost:3000/adminapi/user/login', {
            username: 'admin',
            password: hashedPassword
        });
        
        console.log('登录成功！');
        const token = loginResponse.headers.authorization;
        console.log('Token:', token);
        console.log('');
        
        console.log('2. 测试不同的 Authorization Header 格式...\n');
        
        const formats = [
            { name: '直接使用 Token', value: token },
            { name: 'Bearer Token', value: `Bearer ${token}` },
            { name: 'Token 前缀', value: `Token ${token}` }
        ];
        
        for (const format of formats) {
            console.log(`测试格式: ${format.name}`);
            console.log(`Authorization: ${format.value.substring(0, 50)}...`);
            
            try {
                const startTime = Date.now();
                const response = await axios.get('http://localhost:3000/adminapi/user/list?page=1&pageSize=10', {
                    headers: { 'Authorization': format.value },
                    timeout: 3000
                });
                const endTime = Date.now();
                
                console.log(`✅ 成功！响应时间: ${endTime - startTime} ms`);
                console.log(`响应数据: ${JSON.stringify(response.data).substring(0, 100)}...`);
            } catch (error) {
                console.log(`❌ 失败: ${error.message}`);
                if (error.response) {
                    console.log(`响应状态: ${error.response.status}`);
                    console.log(`响应数据: ${JSON.stringify(error.response.data)}`);
                }
            }
            console.log('');
        }
        
    } catch (error) {
        console.error('测试失败:', error.message);
    }
}

testTokenFormat();
