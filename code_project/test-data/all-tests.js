const autocannon = require('autocannon');
const axios = require('axios');

async function getAuthToken() {
    try {
        const response = await axios.post('http://localhost:3000/adminapi/user/login', {
            username: 'testuser',
            password: 'test123456'
        });
        console.log('认证令牌获取成功');
        return response.headers.authorization;
    } catch (error) {
        console.error('获取认证令牌失败:', error.message);
        return null;
    }
}

async function runAdminTest() {
    console.log('\n========================================');
    console.log('开始后台管理系统并发测试...');
    console.log('并发用户数: 50');
    console.log('测试时长: 60 秒');
    console.log('========================================\n');

    const token = await getAuthToken();
    if (!token) {
        console.error('无法获取认证令牌，测试终止');
        return null;
    }

    const testConfig = {
        url: 'http://localhost:3000/adminapi/user/list?page=1&pageSize=10',
        connections: 50,
        duration: 60,
        headers: {
            'Authorization': token
        }
    };

    try {
        const result = await autocannon(testConfig);
        console.log('\n后台管理系统测试结果:');
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

        return result;
    } catch (error) {
        console.error('后台管理系统测试执行失败:', error.message);
        return null;
    }
}

async function runWebTest() {
    console.log('\n========================================');
    console.log('开始门户网站并发测试...');
    console.log('并发用户数: 100');
    console.log('测试时长: 60 秒');
    console.log('========================================\n');

    const testConfig = {
        url: 'http://localhost:3000/webapi/news/list',
        connections: 100,
        duration: 60
    };

    try {
        const result = await autocannon(testConfig);
        console.log('\n门户网站测试结果:');
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

        return result;
    } catch (error) {
        console.error('门户网站测试执行失败:', error.message);
        return null;
    }
}

async function runAllTests() {
    console.log('========================================');
    console.log('开始并发用户访问测试');
    console.log('========================================');
    console.log('测试时间:', new Date().toLocaleString());
    console.log('目标服务器: http://localhost:3000');
    console.log('========================================\n');

    const adminResult = await runAdminTest();
    const webResult = await runWebTest();

    console.log('\n========================================');
    console.log('测试总结');
    console.log('========================================\n');

    if (adminResult) {
        console.log('后台管理系统:');
        console.log(`  - 吞吐量: ${adminResult.requests.average} req/s`);
        console.log(`  - 平均响应时间: ${adminResult.latency.average} ms`);
        const failRate = adminResult.requests.total > 0
            ? ((adminResult.requests.failed / adminResult.requests.total) * 100).toFixed(2)
            : 0;
        console.log(`  - 失败率: ${failRate}%`);
    }

    if (webResult) {
        console.log('\n门户网站:');
        console.log(`  - 吞吐量: ${webResult.requests.average} req/s`);
        console.log(`  - 平均响应时间: ${webResult.latency.average} ms`);
        const failRate = webResult.requests.total > 0
            ? ((webResult.requests.failed / webResult.requests.total) * 100).toFixed(2)
            : 0;
        console.log(`  - 失败率: ${failRate}%`);
    }

    console.log('\n========================================');
    console.log('测试完成');
    console.log('========================================');
}

runAllTests();
