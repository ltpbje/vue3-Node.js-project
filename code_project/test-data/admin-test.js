const autocannon = require('autocannon');
const axios = require('axios');

async function getAuthToken() {
    try {
        const response = await axios.post('http://localhost:3000/adminapi/user/login', {
            username: 'admin',
            password: '123456'
        });
        return response.headers.authorization;
    } catch (error) {
        console.error('获取认证令牌失败:', error.message);
        return null;
    }
}

async function runAdminTest() {
    console.log('开始后台管理系统并发测试...');
    console.log('并发用户数: 50');
    console.log('测试时长: 60 秒');
    console.log('-----------------------------------');

    const token = await getAuthToken();
    if (!token) {
        console.error('无法获取认证令牌，测试终止');
        return;
    }

    const testConfig = {
        url: 'http://localhost:3000',
        connections: 50,
        duration: 60,
        headers: {
            'Authorization': token
        },
        requests: [
            {
                method: 'GET',
                path: '/adminapi/user/list',
            },
            {
                method: 'GET',
                path: '/adminapi/news/list',
            },
            {
                method: 'GET',
                path: '/adminapi/product/list',
            }
        ]
    };

    try {
        const result = await autocannon(testConfig);
        console.log('\n测试结果:');
        console.log('-----------------------------------');
        console.log(`总请求数: ${result.requests.total}`);
        console.log(`成功请求: ${result.requests.successful}`);
        console.log(`失败请求: ${result.requests.failed}`);
        console.log(`吞吐量: ${result.requests.average} req/s`);
        console.log(`平均响应时间: ${result.latency.average} ms`);
        console.log(`最小响应时间: ${result.latency.min} ms`);
        console.log(`最大响应时间: ${result.latency.max} ms`);
        console.log(`P50 响应时间: ${result.latency.p50} ms`);
        console.log(`P90 响应时间: ${result.latency.p90} ms`);
        console.log(`P95 响应时间: ${result.latency.p95} ms`);
        console.log(`P99 响应时间: ${result.latency.p99} ms`);
        console.log('-----------------------------------');
        
        if (result.requests.failed > 0) {
            console.log('\n错误信息:');
            result.errors.forEach(error => {
                console.log(`- ${error}`);
            });
        }
    } catch (error) {
        console.error('测试执行失败:', error.message);
    }
}

runAdminTest();
