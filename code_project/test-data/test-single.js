const autocannon = require('autocannon');
const axios = require('axios');

async function testSingleEndpoint() {
    console.log('测试单个接口...');
    
    const token = await axios.post('http://localhost:3000/adminapi/user/login', {
        username: 'testuser',
        password: 'test123456'
    }).then(res => res.headers.authorization);
    
    console.log('Token:', token);
    
    const result = await autocannon({
        url: 'http://localhost:3000/adminapi/user/list?page=1&pageSize=10',
        connections: 10,
        duration: 10,
        headers: {
            'Authorization': token
        },
        debug: true
    });
    
    console.log('\n测试结果:');
    console.log('总请求数:', result.requests.total);
    console.log('吞吐量:', result.requests.average, 'req/s');
    console.log('平均响应时间:', result.latency.average, 'ms');
    console.log('错误:', result.errors);
    console.log('状态码:', result.statusCodeStats);
    console.log('完整结果:', JSON.stringify(result, null, 2));
}

testSingleEndpoint().catch(console.error);
