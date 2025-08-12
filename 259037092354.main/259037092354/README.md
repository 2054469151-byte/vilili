# 生日抽奖网页

一个为生日派对设计的互动抽奖网页，用户可以点击抽取神秘礼物。

## 如何使用

### 本地运行
1. 确保已安装Node.js和npm
2. 克隆或下载此项目到本地
3. 打开终端，进入项目目录
4. 安装依赖：
   ```bash
   npm install
   ```
5. 启动开发服务器：
   ```bash
   npm run dev
   ```
6. 在浏览器中访问 `http://localhost:3000` 即可使用

### 分享给他人
要分享给他人，您需要先将项目部署到互联网上：

1. 构建项目：
   ```bash
   npm run build
   ```
2. 将生成的 `dist` 文件夹部署到免费平台，如：
   - [Netlify](https://www.netlify.com/) - 直接拖放dist文件夹即可部署
   - [Vercel](https://vercel.com/) - 连接GitHub仓库自动部署
   - [GitHub Pages](https://pages.github.com/) - 通过GitHub仓库部署

部署完成后，您将获得一个公开链接，可以发送给朋友使用。

## 功能特点
- 10种神秘礼物，每种都有独特的四字代号和祝福语
- 已获得的礼物不会重复抽取
- 精美的生日主题UI设计
- 抽奖动画和庆祝效果