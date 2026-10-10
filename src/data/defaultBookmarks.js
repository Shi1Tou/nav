/**
 * 内置常用书签数据
 * ---------------------------------------------
 * 当项目以纯静态方式部署（如 EdgeOne Pages，无 Cloudflare D1 后端）时，
 * 前端无法访问 /api/* 接口，会自动回退到本文件中的内置书签列表。
 *
 * 数据字段与数据库 schema.sql 保持一致：
 *  - category: id / name / position / parent_id / depth / is_private / created_at
 *  - bookmark: id / name / url / description / icon / category_id / position /
 *              is_private / tags / notes / created_at / updated_at / category_name
 *
 * 自定义方法：直接修改本文件即可在重新部署后看到新的书签。
 */

const now = new Date().toISOString()

export const defaultCategories = [
  { id: 1,  name: '常用导航', position: 0, parent_id: null, depth: 0, is_private: 0, created_at: now },
  { id: 2,  name: '搜索引擎', position: 1, parent_id: null, depth: 0, is_private: 0, created_at: now },
  { id: 3,  name: '开发编程', position: 2, parent_id: null, depth: 0, is_private: 0, created_at: now },
  { id: 4,  name: '效率工具', position: 3, parent_id: null, depth: 0, is_private: 0, created_at: now },
  { id: 5,  name: '学习资源', position: 4, parent_id: null, depth: 0, is_private: 0, created_at: now },
  { id: 6,  name: '生活购物', position: 5, parent_id: null, depth: 0, is_private: 0, created_at: now },
  { id: 7,  name: '社交娱乐', position: 6, parent_id: null, depth: 0, is_private: 0, created_at: now }
]

export const defaultBookmarks = [
  // ===== 常用导航 (id=1) =====
  { id: 1,  name: '百度',         url: 'https://www.baidu.com',   description: '全球最大中文搜索引擎', category_id: 1, position: 0, is_private: 0, tags: '导航,搜索', notes: '', created_at: now, updated_at: now, category_name: '常用导航' },
  { id: 2,  name: '高德地图',     url: 'https://www.amap.com',    description: '出门导航、公交地铁查询', category_id: 1, position: 1, is_private: 0, tags: '地图', notes: '', created_at: now, updated_at: now, category_name: '常用导航' },
  { id: 3,  name: '铁路12306',    url: 'https://www.12306.cn',   description: '官方火车票预订',       category_id: 1, position: 2, is_private: 0, tags: '出行,购票', notes: '', created_at: now, updated_at: now, category_name: '常用导航' },
  { id: 4,  name: '携程旅行',     url: 'https://www.ctrip.com',   description: '酒店、机票、旅游度假', category_id: 1, position: 3, is_private: 0, tags: '出行,旅游', notes: '', created_at: now, updated_at: now, category_name: '常用导航' },
  { id: 5,  name: '快递100',     url: 'https://www.kuaidi100.com', description: '一键查询全网物流',   category_id: 1, position: 4, is_private: 0, tags: '物流', notes: '', created_at: now, updated_at: now, category_name: '常用导航' },

  // ===== 搜索引擎 (id=2) =====
  { id: 6,  name: '谷歌',         url: 'https://www.google.com',     description: '全球搜索引擎',         category_id: 2, position: 0, is_private: 0, tags: '搜索', notes: '', created_at: now, updated_at: now, category_name: '搜索引擎' },
  { id: 7,  name: '必应',         url: 'https://cn.bing.com',        description: '微软搜索引擎，国内可直连', category_id: 2, position: 1, is_private: 0, tags: '搜索', notes: '', created_at: now, updated_at: now, category_name: '搜索引擎' },
  { id: 8,  name: '搜狗',         url: 'https://www.sogou.com',      description: '微信公众号文章搜索',   category_id: 2, position: 2, is_private: 0, tags: '搜索', notes: '', created_at: now, updated_at: now, category_name: '搜索引擎' },
  { id: 9,  name: 'DuckDuckGo',   url: 'https://duckduckgo.com',     description: '隐私保护搜索引擎',     category_id: 2, position: 3, is_private: 0, tags: '搜索,隐私', notes: '', created_at: now, updated_at: now, category_name: '搜索引擎' },
  { id: 10, name: 'GitHub 搜索',  url: 'https://github.com/search',  description: '开源项目与代码搜索',   category_id: 2, position: 4, is_private: 0, tags: '搜索,开发', notes: '', created_at: now, updated_at: now, category_name: '搜索引擎' },

  // ===== 开发编程 (id=3) =====
  { id: 11, name: 'GitHub',       url: 'https://github.com',         description: '全球最大代码托管平台', category_id: 3, position: 0, is_private: 0, tags: '开发,代码托管', notes: '', created_at: now, updated_at: now, category_name: '开发编程' },
  { id: 12, name: 'Gitee 码云',   url: 'https://gitee.com',          description: '国内代码托管平台',     category_id: 3, position: 1, is_private: 0, tags: '开发,代码托管', notes: '', created_at: now, updated_at: now, category_name: '开发编程' },
  { id: 13, name: 'Stack Overflow', url: 'https://stackoverflow.com', description: '程序员问答社区',     category_id: 3, position: 2, is_private: 0, tags: '开发,问答', notes: '', created_at: now, updated_at: now, category_name: '开发编程' },
  { id: 14, name: 'MDN Web Docs',  url: 'https://developer.mozilla.org/zh-CN', description: '前端开发者官方文档', category_id: 3, position: 3, is_private: 0, tags: '开发,文档,前端', notes: '', created_at: now, updated_at: now, category_name: '开发编程' },
  { id: 15, name: 'Vue.js',       url: 'https://cn.vuejs.org',       description: '渐进式 JavaScript 框架', category_id: 3, position: 4, is_private: 0, tags: '开发,前端,Vue', notes: '', created_at: now, updated_at: now, category_name: '开发编程' },
  { id: 16, name: 'Vite',          url: 'https://cn.vitejs.dev',      description: '下一代前端构建工具',   category_id: 3, position: 5, is_private: 0, tags: '开发,前端,构建', notes: '', created_at: now, updated_at: now, category_name: '开发编程' },
  { id: 17, name: 'npm',          url: 'https://www.npmjs.com',      description: 'JavaScript 包仓库',   category_id: 3, position: 6, is_private: 0, tags: '开发,包管理', notes: '', created_at: now, updated_at: now, category_name: '开发编程' },
  { id: 18, name: '掘金',         url: 'https://juejin.cn',          description: '开发者技术社区',       category_id: 3, position: 7, is_private: 0, tags: '开发,社区', notes: '', created_at: now, updated_at: now, category_name: '开发编程' },
  { id: 19, name: '菜鸟教程',     url: 'https://www.runoob.com',     description: '编程入门教程',         category_id: 3, position: 8, is_private: 0, tags: '开发,教程', notes: '', created_at: now, updated_at: now, category_name: '开发编程' },
  { id: 20, name: 'Cloudflare',   url: 'https://dash.cloudflare.com', description: '原项目部署平台',       category_id: 3, position: 9, is_private: 0, tags: '部署,云服务', notes: '', created_at: now, updated_at: now, category_name: '开发编程' },

  // ===== 效率工具 (id=4) =====
  { id: 21, name: '飞书',         url: 'https://www.feishu.cn',      description: '企业协作与办公平台',   category_id: 4, position: 0, is_private: 0, tags: '办公,协作', notes: '', created_at: now, updated_at: now, category_name: '效率工具' },
  { id: 22, name: '腾讯文档',     url: 'https://docs.qq.com',        description: '在线协作文档',         category_id: 4, position: 1, is_private: 0, tags: '办公,文档', notes: '', created_at: now, updated_at: now, category_name: '效率工具' },
  { id: 23, name: '语雀',         url: 'https://www.yuque.com',      description: '阿里旗下知识库',       category_id: 4, position: 2, is_private: 0, tags: '办公,笔记', notes: '', created_at: now, updated_at: now, category_name: '效率工具' },
  { id: 24, name: 'Notion',       url: 'https://www.notion.so',      description: 'All-in-one 笔记工具',  category_id: 4, position: 3, is_private: 0, tags: '办公,笔记', notes: '', created_at: now, updated_at: now, category_name: '效率工具' },
  { id: 25, name: 'ProcessOn',    url: 'https://www.processon.com',   description: '在线流程图/思维导图',   category_id: 4, position: 4, is_private: 0, tags: '绘图,脑图', notes: '', created_at: now, updated_at: now, category_name: '效率工具' },
  { id: 26, name: 'Figma',         url: 'https://www.figma.com',      description: '在线 UI/UX 设计工具',  category_id: 4, position: 5, is_private: 0, tags: '设计', notes: '', created_at: now, updated_at: now, category_name: '效率工具' },
  { id: 27, name: '草料二维码',   url: 'https://cli.im',             description: '二维码生成与解析',     category_id: 4, position: 6, is_private: 0, tags: '工具', notes: '', created_at: now, updated_at: now, category_name: '效率工具' },
  { id: 28, name: '临时邮箱',     url: 'https://temp-mail.org/zh/',  description: '一次性匿名邮箱',       category_id: 4, position: 7, is_private: 0, tags: '工具,隐私', notes: '', created_at: now, updated_at: now, category_name: '效率工具' },

  // ===== 学习资源 (id=5) =====
  { id: 29, name: '哔哩哔哩',     url: 'https://www.bilibili.com',   description: '年轻人的视频学习社区', category_id: 5, position: 0, is_private: 0, tags: '视频,学习', notes: '', created_at: now, updated_at: now, category_name: '学习资源' },
  { id: 30, name: '中国大学MOOC', url: 'https://www.icourse163.org', description: '名校公开课',           category_id: 5, position: 1, is_private: 0, tags: '课程,大学', notes: '', created_at: now, updated_at: now, category_name: '学习资源' },
  { id: 31, name: '网易公开课',   url: 'https://open.163.com',       description: '名校国际课程',         category_id: 5, position: 2, is_private: 0, tags: '课程', notes: '', created_at: now, updated_at: now, category_name: '学习资源' },
  { id: 32, name: '知乎',         url: 'https://www.zhihu.com',      description: '专业问答与知识社区',   category_id: 5, position: 3, is_private: 0, tags: '问答,知识', notes: '', created_at: now, updated_at: now, category_name: '学习资源' },
  { id: 33, name: '维基百科',     url: 'https://zh.wikipedia.org',   description: '自由的百科全书',       category_id: 5, position: 4, is_private: 0, tags: '百科', notes: '', created_at: now, updated_at: now, category_name: '学习资源' },
  { id: 34, name: 'Coursera',     url: 'https://www.coursera.org',   description: '国际名校在线课程',     category_id: 5, position: 5, is_private: 0, tags: '课程,国际', notes: '', created_at: now, updated_at: now, category_name: '学习资源' },

  // ===== 生活购物 (id=6) =====
  { id: 35, name: '淘宝',         url: 'https://www.taobao.com',     description: '综合网购平台',         category_id: 6, position: 0, is_private: 0, tags: '购物', notes: '', created_at: now, updated_at: now, category_name: '生活购物' },
  { id: 36, name: '京东',         url: 'https://www.jd.com',        description: '自营数码家电',         category_id: 6, position: 1, is_private: 0, tags: '购物', notes: '', created_at: now, updated_at: now, category_name: '生活购物' },
  { id: 37, name: '拼多多',       url: 'https://www.pinduoduo.com',  description: '拼团购物',             category_id: 6, position: 2, is_private: 0, tags: '购物', notes: '', created_at: now, updated_at: now, category_name: '生活购物' },
  { id: 38, name: '美团',         url: 'https://www.meituan.com',    description: '外卖、酒店、电影票',     category_id: 6, position: 3, is_private: 0, tags: '生活,外卖', notes: '', created_at: now, updated_at: now, category_name: '生活购物' },
  { id: 39, name: '大众点评',     url: 'https://www.dianping.com',   description: '美食探店评价',         category_id: 6, position: 4, is_private: 0, tags: '生活,美食', notes: '', created_at: now, updated_at: now, category_name: '生活购物' },
  { id: 40, name: '12306 火车票', url: 'https://www.12306.cn/mormhweb/', description: '铁路官方购票',     category_id: 6, position: 5, is_private: 0, tags: '出行', notes: '', created_at: now, updated_at: now, category_name: '生活购物' },

  // ===== 社交娱乐 (id=7) =====
  { id: 41, name: '微博',         url: 'https://weibo.com',          description: '实时热搜社交平台',     category_id: 7, position: 0, is_private: 0, tags: '社交', notes: '', created_at: now, updated_at: now, category_name: '社交娱乐' },
  { id: 42, name: '微信公众平台', url: 'https://mp.weixin.qq.com',   description: '公众号后台',           category_id: 7, position: 1, is_private: 0, tags: '社交,内容', notes: '', created_at: now, updated_at: now, category_name: '社交娱乐' },
  { id: 43, name: '小红书',       url: 'https://www.xiaohongshu.com', description: '生活方式分享社区',     category_id: 7, position: 2, is_private: 0, tags: '社交,种草', notes: '', created_at: now, updated_at: now, category_name: '社交娱乐' },
  { id: 44, name: '抖音',         url: 'https://www.douyin.com',     description: '短视频平台',           category_id: 7, position: 3, is_private: 0, tags: '视频', notes: '', created_at: now, updated_at: now, category_name: '社交娱乐' },
  { id: 45, name: '网易云音乐',   url: 'https://music.163.com',      description: '在线音乐',             category_id: 7, position: 4, is_private: 0, tags: '音乐', notes: '', created_at: now, updated_at: now, category_name: '社交娱乐' },
  { id: 46, name: '腾讯视频',     url: 'https://v.qq.com',           description: '在线视频平台',         category_id: 7, position: 5, is_private: 0, tags: '视频', notes: '', created_at: now, updated_at: now, category_name: '社交娱乐' },
  { id: 47, name: 'YouTube',      url: 'https://www.youtube.com',    description: '全球视频平台',         category_id: 7, position: 6, is_private: 0, tags: '视频,国际', notes: '', created_at: now, updated_at: now, category_name: '社交娱乐' }
]
