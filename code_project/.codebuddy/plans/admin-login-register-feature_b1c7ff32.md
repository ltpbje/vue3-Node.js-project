---
name: admin-login-register-feature
overview: 在管理员登录页面添加用户注册功能，包括前端注册表单和后端注册接口
design:
  architecture:
    framework: vue
  styleKeywords:
    - Glassmorphism
    - Gradient
    - Modern
    - Smooth
  fontSystem:
    fontFamily: PingFang SC
    heading:
      size: 30px
      weight: 600
    subheading:
      size: 18px
      weight: 500
    body:
      size: 16px
      weight: 400
  colorSystem:
    primary:
      - "#667eea"
      - "#764ba2"
    background:
      - "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      - rgba(255, 255, 255, 0.92)
    text:
      - "#333333"
      - "#666666"
    functional:
      - "#667eea"
      - "#f56c6c"
      - "#67c23a"
todos:
  - id: modify-backend-middleware
    content: 修改 app.js 中间件，添加 /adminapi/user/register 接口豁免
    status: completed
  - id: add-register-route
    content: 在 UserRouter.js 添加注册路由 POST /adminapi/user/register
    status: completed
    dependencies:
      - modify-backend-middleware
  - id: add-register-controller
    content: 在 UserController.js 添加 register 方法，复用 UserService.create 并设置默认角色
    status: completed
    dependencies:
      - add-register-route
  - id: add-register-form
    content: 在 Login.vue 添加注册表单 UI、切换 Tab 和表单验证规则
    status: completed
  - id: implement-register-submit
    content: 实现注册表单提交逻辑，成功后切换登录 Tab
    status: completed
    dependencies:
      - add-register-form
---

## 产品概述

在现有的管理员登录页面添加用户注册功能，使新用户可以直接在前端完成账号注册，无需通过管理员后台添加。

## 核心功能

- 登录/注册表单切换功能
- 用户注册表单，包含用户名、密码、确认密码、角色选择
- 表单验证（必填项、密码一致性）
- 调用后端注册接口完成用户注册
- 注册成功后自动跳转登录或直接登录

## 技术栈

- 前端：Vue 3 + Element Plus + Vue Router + Axios + SCSS
- 后端：Node.js + Express + Mongoose

## 实现方案

### 系统架构

在现有分层架构基础上扩展：

- 前端：在 Login.vue 中添加注册表单，通过状态切换登录/注册模式
- 后端：新增公共注册接口，绕过 token 验证中间件

### 核心技术决策

1. **表单切换方式**：使用 Element Plus 的 Tabs 组件或自定义按钮切换，保持 UI 简洁
2. **注册接口设计**：新增 `/adminapi/user/register` 接口，复用现有 UserService.add 方法
3. **中间件豁免**：在 app.js 全局中间件中添加注册接口豁免，类似登录接口
4. **默认角色**：注册时默认角色为编辑（role=2），管理员角色只能由管理员后台添加

### 数据流

用户填写注册表单 → 前端验证 → 调用 /adminapi/user/register → 后端创建用户 → 返回成功 → 切换到登录模式或自动登录

## 实现细节

### 核心目录结构

```
d:/A学习/毕业设计/vue3-Node.js-project/code_project/
├── admin/src/views/
│   └── Login.vue              # [MODIFY] 添加注册表单和切换逻辑
├── server/
│   ├── app.js                 # [MODIFY] 添加注册接口中间件豁免
│   ├── routes/admin/
│   │   └── UserRouter.js      # [MODIFY] 添加注册路由
│   └── controllers/admin/
│       └── UserController.js  # [MODIFY] 添加 register 控制器方法
```

### 性能考虑

- 避免不必要的重渲染，使用 Vue 3 响应式系统优化
- 前端表单验证在提交前完成，减少无效请求
- 注册接口密码加密后存储（遵循现有 UserService.add 逻辑）

### 兼容性

- 保持现有登录功能不变
- 注册失败时显示明确错误提示
- 注册成功后自动切换到登录模式并填写用户名

## 设计风格

基于现有登录页面的玻璃态（Glassmorphism）设计风格，保持渐变背景、半透明容器、模糊效果的一致性。注册表单与登录表单使用相同的视觉语言，通过 Tab 切换或模式切换按钮实现平滑过渡。

## 设计内容描述

### 整体布局

- 保持现有渐变动态背景（135deg 渐变，动画 8s 循环）
- 中央半透明玻璃态表单容器（500px 宽度扩展为 600px 以容纳更多字段）
- 顶部标题"品讯数字化管理系统"保持不变
- 添加"登录/注册"切换 Tab 或按钮组

### 页面块设计

**块 1：标题区**

- 保持现有渐变文字标题
- 字号 30px，渐变色 #667eea 到 #764ba2

**块 2：模式切换 Tab**

- Element Plus Tabs 组件
- 两个标签：登录、注册
- 激活状态使用与按钮一致的渐变色

**块 3：登录表单（现有）**

- 用户名输入框
- 密码输入框（显示/隐藏切换）
- 登录按钮

**块 4：注册表单（新增）**

- 用户名输入框（必填，校验规则）
- 密码输入框（必填，显示/隐藏切换）
- 确认密码输入框（必填，自定义校验规则验证一致性）
- 角色选择（默认编辑，可改为管理员）
- 注册按钮

**块 5：操作按钮区**

- 登录按钮/注册按钮（渐变背景，hover 效果）
- 按钮宽 100%，圆角 8px

### 交互动效

- Tab 切换过渡动画（Element Plus 内置）
- 按钮 hover 上移 2px + 阴影效果
- 表单验证错误提示即时显示
- 注册成功后自动切换到登录 Tab 并填充用户名
- 回车键提交表单（两个模式都支持）