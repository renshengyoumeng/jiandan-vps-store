const pug = require('pug');
const path = require('path');
const fs = require('fs');

class TemplateService {
    constructor() {
        this.cache = new Map();

        // 默认模板目录（你可以根据需要扩展）
        this.templateDirs = [
            path.join(__dirname, '../views/components'),
            path.join(__dirname, '../views/templates')
        ];
    }

    /**
     * 查找模板文件路径
     */
    findTemplate(templateName) {
        for (const dir of this.templateDirs) {
            const file = path.join(dir, `${templateName}.pug`);
            if (fs.existsSync(file)) {
                return file;
            }
        }
        throw new Error(`Template not found: ${templateName}`);
    }

    /**
     * 渲染模板（支持缓存）
     */
    render(templateName, data = {}, useCache = true) {
        const file = this.findTemplate(templateName);

        // 使用缓存
        if (useCache && this.cache.has(file)) {
            const compiled = this.cache.get(file);
            return compiled(data);
        }

        // 编译模板并缓存
        const compiled = pug.compileFile(file);
        if (useCache) {
            this.cache.set(file, compiled);
        }

        return compiled(data);
    }

    /**
     * 专门为 HTMX 请求封装（自动判断是否为 htmx）
     */
    renderHTMX(req, templateName, data = {}, useCache = true) {
        const isHTMX = req.headers['hx-request'];
        const html = this.render(templateName, data, useCache);

        // 如果是 HTMX，请求时返回部分模板
        if (isHTMX) {
            return html;
        }

        // 否则返回完整页面（需要你自己定义）
        return `<div>${html}</div>`;
    }
}

module.exports = new TemplateService();
