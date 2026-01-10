export const SITE = {
  // 你的网站地址（一定要改）
  website: "https://2936170194.github.io",

  // 作者显示名（中文 / 网名 / 都可以）
  author: "李杰",

  // 作者主页（可选，没有就填 GitHub）
  profile: "https://github.com/2936170194",

  // 网站一句话介绍（很重要，首页 + SEO 用）
  desc: "这里是我的个人博客，用来记录思考、学习和生活。",

  // 网站标题（浏览器标题 + 首页主标题）
  title: "杰的博客",

  // OG 图片（先不用管，后面想换再说）
  ogImage: "astropaper-og.jpg",

  // 是否支持深色 / 浅色模式
  lightAndDarkMode: true,

  // 首页每页显示文章数
  postPerIndex: 4,

  // 列表页每页文章数
  postPerPage: 4,

  // 定时文章提前显示的时间（不用改）
  scheduledPostMargin: 15 * 60 * 1000,

  // 是否显示归档页
  showArchives: true,

  // 文章详情页是否显示返回按钮
  showBackButton: true,

  // ❌ 关闭“编辑此页”（这是模板作者用的）
  editPost: {
    enabled: false,
    text: "",
    url: "",
  },

  // 是否启用动态 OG 图（保留）
  dynamicOgImage: true,

  // 文字方向（中文用 ltr）
  dir: "ltr",

  // 🌏 语言：中文博客一定要改
  lang: "zh-CN",

  // ⏰ 时区：改成中国
  timezone: "Asia/Shanghai",
} as const;
