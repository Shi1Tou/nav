# 📚 书签导航

基于 [deerwan/nav](https://github.com/deerwan/nav) Fork 并适配 EdgeOne Pages 全栈部署（前端单文件 + Edge Functions + KV 存储）。

## ✨ 功能

- 🔥 **常用网站**：按点击频率自动生成，无需手动维护
- 🗂 **分类管理**：动态增删改分类，支持私密书签
- 📦 **导入/导出**：JSON 备份与恢复
- 📱 **响应式**：手机 / 电脑自适应布局
- 🌙 **暗色模式**：跟随系统或手动切换
- 🔐 **管理员后台**：登录后增删书签、调整常用区数量、公开/私密标记

## 🚀 一键部署到 EdgeOne

点击下方按钮，自动导入本仓库并进入 EdgeOne Makers 部署流程：

[![使用 EdgeOne Makers 部署](https://img.shields.io/badge/Deploy%20with-EdgeOne%20Makers-blue?style=for-the-badge&logo=tencentqq)](https://console.cloud.tencent.com/edgeone/makers/new?repository-url=https%3A%2F%2Fgithub.com%2FShi1Tou%2Fnav&env=ADMIN_USERNAME%2CADMIN_PASSWORD&env-description=%E7%AE%A1%E7%90%86%E5%91%98%E7%99%BB%E5%BD%95%E8%B4%A6%E5%8F%B7%E5%AF%86%E7%A0%81)

### 部署步骤

1. **点击上方按钮**，跳转到 EdgeOne 控制台（会自动预填本仓库地址和环境变量项）
2. **填写环境变量**：
   - `ADMIN_USERNAME`：管理员用户名（默认 `admin`）
   - `ADMIN_PASSWORD`：管理员密码（**必须设置强密码**，否则登录接口报 500）
3. 点击「立即创建」，等待 1~2 分钟部署完成
4. **绑定 KV 存储**（关键步骤，EdgeOne 暂不支持通过配置文件自动绑定）：
   - 进入 **Pages → KV 存储**，点击「创建命名空间」，名称填 `nav-kv`
   - 进入你的项目 → **项目设置 → 存储绑定**（或在 KV 命名空间详情页点「关联项目」）
   - 添加绑定：
     - **变量名（Variable Name）**：`my_kv`（必须一字不差）
     - **命名空间**：选择刚创建的 `nav-kv`
   - 回到「部署管理」，对最新部署点「重试部署」使绑定生效
5. **访问站点**，点右上角「登录」，用上面设置的账号密码登录，开始管理书签

## 📁 项目结构

```
├── index.html              # 前端单文件（内联 CSS+JS，含管理后台）
├── edgeone.json            # EdgeOne 构建配置（零构建，直接托管根目录）
└── functions/              # EdgeOne Pages Functions
    └── api/
        ├── login.js          # POST 登录，token 存 KV
        ├── bookmarks/index.js    # GET 列表 / POST 新增
        ├── bookmarks/[id].js     # PUT 编辑 / DELETE 删除
        ├── settings.js       # GET/PUT 设置（常用区数量、标题、分类列表）
        ├── click.js          # POST 记录点击
        └── frequent.js       # GET 高频书签排行
```

## 🔧 环境变量

| 变量名 | 必填 | 说明 |
|---|---|---|
| `ADMIN_USERNAME` | 否 | 管理员用户名，默认 `admin` |
| `ADMIN_PASSWORD` | **是** | 管理员登录密码，必须在控制台配置 |

## 🗄 KV 存储绑定

| 绑定变量名 | 必填 | 说明 |
|---|---|---|
| `my_kv` | **是** | Edge KV 命名空间，存储书签、设置、登录会话 |

KV 键设计：
- `bookmarks`：书签数组 JSON
- `settings`：站点设置 JSON（含 categories 分类列表）
- `session:<token>`：登录会话（7 天过期）

## 📡 API 接口

| 路由 | 方法 | 鉴权 | 说明 |
|---|---|---|---|
| `/api/login` | POST | 无 | 登录，返回 token |
| `/api/bookmarks` | GET | 无 | 书签列表（自动过滤私密） |
| `/api/bookmarks` | POST | Bearer token | 新增书签 |
| `/api/bookmarks/:id` | PUT | Bearer token | 编辑书签 |
| `/api/bookmarks/:id` | DELETE | Bearer token | 删除书签 |
| `/api/settings` | GET | 无 | 读取设置 |
| `/api/settings` | PUT | Bearer token | 保存设置 |
| `/api/click` | POST | 无 | 记录一次点击 |
| `/api/frequent` | GET | 无 | 高频书签排行 |

## ❓ 常见问题

**Q：部署后访问站点，点登录报 500？**
A：环境变量 `ADMIN_PASSWORD` 没配置。在项目设置 → 环境变量里加上后重试部署。

**Q：书签列表为空或接口返回 HTML？**
A：KV 没绑定成功。检查存储绑定里变量名是否为 `my_kv`，绑定后是否重试了部署。

**Q：想改管理员密码？**
A：直接改 `ADMIN_PASSWORD` 环境变量，重新部署即可，旧 token 自动失效。

## 📝 License

MIT
