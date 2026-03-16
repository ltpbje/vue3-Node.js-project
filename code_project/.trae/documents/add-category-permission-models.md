# 添加新闻分类和权限字段计划（基于现有接口修改，不影响现有功能）

## 任务概述

在现有的 MongoDB 数据库实体基础上添加新闻分类和权限相关字段，**核心原则**：

* 不影响现有功能

* 向后兼容

* 不添加新接口

* 只修改现有模型

## 现有结构分析

### 现有模型

* `NewsModel` - 新闻模型，已有 `category` 字段（Number类型）

* `UserModel` - 用户模型，已有 `role` 字段（管理员1，编辑2）

* `ProductModel` - 产品模型

### 现有接口（保持不变）

| 方法     | 路径                      | <br /> | 说明     |
| ------ | ----------------------- | :----- | ------ |
| POST   | /adminapi/news/add      | <br /> | 添加新闻   |
| GET    | /adminapi/news/list     | <br /> | 获取新闻列表 |
| GET    | /adminapi/news/list/:id | <br /> | 获取单个新闻 |
| POST   | /adminapi/news/list     | <br /> | 更新新闻   |
| PUT    | /adminapi/news/publish  | <br /> | 发布新闻   |
| DELETE | /adminapi/news/list/:id | <br /> | 删除新闻   |
| POST   | /adminapi/user/login    | <br /> | 用户登录   |
| POST   | /adminapi/user/register | <br /> | 用户注册   |
| GET    | /adminapi/user/list     | <br /> | 获取用户列表 |
| POST   | /adminapi/user/add      | <br /> | 添加用户   |
| PUT    | /adminapi/user/list/:id | <br /> | 更新用户   |
| DELETE | /adminapi/user/list/:id | <br /> | 删除用户   |

## 实施计划

### 步骤 1: 修改新闻模型 (NewsModel.js)

**修改文件**: `server/models/NewsModel.js`

**添加字段**:

```javascript
{
  // 现有字段（保留）
  title: String,
  content: String,
  category: Number,  // 保留原字段
  
  // 新增字段 - 分类信息
  categoryName: String,  // 分类名称
  categoryId: String,    // 分类ID（ObjectId，关联分类表）
  
  // 现有字段（保留）
  cover: String,
  isPublish: Number,
  editTime: Date,
  username: String
}
```

**向后兼容说明**:

* `category` 字段保留（Number类型），现有数据不受影响

* 新增 `categoryName` 和 `categoryId` 字段为可选字段，新数据可为空

* 查询新闻时，可以通过 `category` 数字值匹配分类

### 步骤 2: 修改用户模型 (UserModel.js)

**修改文件**: `server/models/UserModel.js`

**添加字段**:

```javascript
{
  // 现有字段（保留）
  username: String,
  password: String,
  gender: Number,
  introduction: String,
  avatar: String,
  role: Number,
  
  // 新增字段 - 权限信息
  permissions: [String],    // 权限代码列表
  permissionsName: [String], // 权限名称列表
  lastLoginTime: Date,    // 最后登录时间
  lastLoginIP: String     // 最后登录IP
}
```

**向后兼容说明**:

* `role` 字段保留，现有用户数据不受影响

* 新增字段为可选字段，现有数据不受影响

### 步骤 3: 修改新闻服务 (NewsService.js)

**修改文件**: `server/services/admin/NewsService.js`

**修改功能**:

* `getList` 方法添加分类筛选功能（可选）

* 支持按分类ID查询新闻（可选）

**向后兼容说明**:

* 现有查询逻辑保持不变

* 新增功能为可选功能

## 文件修改清单

### 修改文件

1. `server/models/NewsModel.js` - 添加分类相关字段
2. `server/models/UserModel.js` - 添加权限相关字段

### 新建文件

1. `server/models/CategoryModel.js` - 新闻分类模型
2. `server/models/PermissionModel.js` - 权限模型

## 向后兼容保证

1. **数据兼容** - 独立创建分类和权限表，不依赖现有表
2. **字段可选** - 新字段设置默认值或可为空
3. **查询兼容** - 新增功能不影响现有查询
4. **接口不变** - 不修改现有接口
5. **代码风格** - 遵循现有代码规范

## 不影响现有功能的保证

1. **不修改现有接口** - 所有现有接口保持不变
2. **不修改现有控制器** - 所有现有控制器保持不变
3. **不修改现有路由** - 所有现有路由保持不变
4. **只修改模型** - 只在现有模型中添加新字段
5. **新字段可选** - 新字段设置默认值或可为空，现有数据不受影响

