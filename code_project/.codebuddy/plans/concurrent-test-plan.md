# 并发用户访问测试计划

## 测试目标
模拟真实用户访问场景，测试系统在高并发情况下的性能表现。

## 测试环境
- **后端服务器**: Express.js (端口: 3000)
- **后台管理系统**: Vue CLI (端口: 8080)
- **门户网站**: Vite (端口: 5173)
- **数据库**: MongoDB

## 测试场景

### 场景 1: 后台管理系统并发访问
- **并发用户数**: 50 个用户
- **测试接口**:
  - 登录接口: POST /adminapi/user/login
  - 用户列表: GET /adminapi/user/list
  - 新闻列表: GET /adminapi/news/list
  - 产品列表: GET /adminapi/product/list
- **测试时长**: 60 秒
- **请求间隔**: 1-3 秒随机

### 场景 2: 门户网站并发访问
- **并发用户数**: 100 个用户
- **测试接口**:
  - 首页: GET /
  - 新闻列表: GET /webapi/news/list
  - 产品列表: GET /webapi/product/list
- **测试时长**: 60 秒
- **请求间隔**: 1-2 秒随机

## 测试工具
使用 Apache Bench (ab) 进行压力测试，原因：
1. 简单易用，无需复杂配置
2. 支持并发请求测试
3. 提供详细的性能指标
4. 跨平台支持

## 测试指标
- **吞吐量**: 每秒处理的请求数 (Requests per second)
- **响应时间**: 平均响应时间、最小/最大响应时间
- **失败率**: 失败请求的百分比
- **并发处理能力**: 系统同时处理的请求数

## 测试步骤

### 步骤 1: 环境准备
1. 确保所有服务正常运行
2. 检查数据库连接状态
3. 准备测试数据

### 步骤 2: 执行后台管理系统测试
```bash
# 测试登录接口 (50 并发)
ab -n 500 -c 50 -p login.json -T application/json http://localhost:3000/adminapi/user/login

# 测试用户列表接口 (50 并发)
ab -n 500 -c 50 -H "Authorization: Bearer <token>" http://localhost:3000/adminapi/user/list

# 测试新闻列表接口 (50 并发)
ab -n 500 -c 50 -H "Authorization: Bearer <token>" http://localhost:3000/adminapi/news/list

# 测试产品列表接口 (50 并发)
ab -n 500 -c 50 -H "Authorization: Bearer <token>" http://localhost:3000/adminapi/product/list
```

### 步骤 3: 执行门户网站测试
```bash
# 测试新闻列表接口 (100 并发)
ab -n 1000 -c 100 http://localhost:3000/webapi/news/list

# 测试产品列表接口 (100 并发)
ab -n 1000 -c 100 http://localhost:3000/webapi/product/list
```

### 步骤 4: 结果分析
1. 收集测试数据
2. 分析性能瓶颈
3. 提出优化建议

## 预期结果
- **后台管理系统**: 
  - 吞吐量 ≥ 100 req/s
  - 平均响应时间 ≤ 200ms
  - 失败率 ≤ 1%

- **门户网站**:
  - 吞吐量 ≥ 200 req/s
  - 平均响应时间 ≤ 150ms
  - 失败率 ≤ 0.5%

## 风险评估
1. **数据库连接池耗尽**: 高并发可能导致数据库连接池耗尽
2. **内存泄漏**: 长时间运行可能导致内存泄漏
3. **CPU 使用率过高**: 高并发可能导致 CPU 使用率飙升

## 应对措施
1. 监控系统资源使用情况
2. 设置合理的超时时间
3. 准备回滚方案
