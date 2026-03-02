const axios = require('axios');
const crypto = require('crypto');

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

async function testAPIResponseTime() {
    console.log('========================================');
    console.log('API接口响应时间测试');
    console.log('========================================');
    console.log(`测试时间: ${new Date().toLocaleString()}`);
    console.log(`每个接口测试次数: 20`);
    console.log('========================================\n');

    const results = {};

    console.log('1. 测试门户网站接口...');
    console.log('-----------------------------------');
    
    results.webNews = await testEndpoint(
        'GET /webapi/news/list',
        'http://localhost:3000/webapi/news/list'
    );
    
    results.webProduct = await testEndpoint(
        'GET /webapi/product/list',
        'http://localhost:3000/webapi/product/list'
    );

    console.log('\n2. 测试后台管理系统接口...');
    console.log('-----------------------------------');
    
    const token = await getAuthToken();
    if (!token) {
        console.error('无法获取认证令牌，跳过后台管理系统接口测试');
    } else {
        console.log('认证令牌获取成功\n');
        
        results.adminUser = await testEndpoint(
            'GET /adminapi/user/list',
            'http://localhost:3000/adminapi/user/list?page=1&pageSize=10',
            { 'Authorization': `Bearer ${token}` }
        );
        
        results.adminNews = await testEndpoint(
            'GET /adminapi/news/list',
            'http://localhost:3000/adminapi/news/list?page=1&pageSize=10',
            { 'Authorization': `Bearer ${token}` }
        );
        
        results.adminProduct = await testEndpoint(
            'GET /adminapi/product/list',
            'http://localhost:3000/adminapi/product/list?page=1&pageSize=10',
            { 'Authorization': `Bearer ${token}` }
        );
    }

    console.log('\n========================================');
    console.log('测试总结');
    console.log('========================================\n');

    const summaryData = [];
    for (const [name, result] of Object.entries(results)) {
        if (result) {
            summaryData.push({
                '接口': result.name,
                '平均响应时间': `${result.average} ms`,
                '最小响应时间': `${result.min} ms`,
                '最大响应时间': `${result.max} ms`,
                '成功率': `${result.successRate}%`
            });
        }
    }

    console.table(summaryData);

    console.log('\n========================================');
    console.log('测试完成');
    console.log('========================================');
}

async function getAuthToken() {
    try {
        const hashedPassword = md5('123456');
        console.log('登录用户: admin');
        console.log('密码 MD5 加密值:', hashedPassword);
        
        const response = await axios.post('http://localhost:3000/adminapi/user/login', {
            username: 'admin',
            password: hashedPassword
        });
        
        if (response.data.ActionType === 'OK') {
            return response.headers.authorization;
        } else {
            console.error('登录失败:', response.data);
            return null;
        }
    } catch (error) {
        console.error('获取认证令牌失败:', error.message);
        if (error.response) {
            console.error('响应数据:', error.response.data);
        }
        return null;
    }
}

async function testEndpoint(name, url, headers = {}) {
    const TEST_COUNT = 20;
    const times = [];
    let successCount = 0;
    let failCount = 0;

    console.log(`测试接口: ${name}`);
    
    for (let i = 0; i < TEST_COUNT; i++) {
        try {
            const startTime = Date.now();
            const response = await axios.get(url, { 
                headers,
                timeout: 5000
            });
            const endTime = Date.now();
            const responseTime = endTime - startTime;
            
            times.push(responseTime);
            successCount++;
            
            process.stdout.write(`\r测试进度: ${i + 1}/${TEST_COUNT} - 响应时间: ${responseTime} ms`);
        } catch (error) {
            failCount++;
            process.stdout.write(`\r测试进度: ${i + 1}/${TEST_COUNT} - 失败: ${error.message}          `);
        }
        
        await sleep(100);
    }

    console.log('\n');

    if (times.length === 0) {
        console.log('所有请求均失败，无法计算响应时间');
        return null;
    }

    const average = Math.round(times.reduce((a, b) => a + b, 0) / times.length);
    const min = Math.min(...times);
    const max = Math.max(...times);
    const successRate = ((successCount / TEST_COUNT) * 100).toFixed(1);

    console.log(`平均响应时间: ${average} ms`);
    console.log(`最小响应时间: ${min} ms`);
    console.log(`最大响应时间: ${max} ms`);
    console.log(`成功请求: ${successCount}/${TEST_COUNT}`);
    console.log(`成功率: ${successRate}%`);
    console.log('');

    return {
        name,
        average,
        min,
        max,
        successRate,
        times
    };
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

testAPIResponseTime().catch(console.error);
