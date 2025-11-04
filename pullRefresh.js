/**
 * 下拉刷新个性化配置表
 * 
 * 功能说明：
 * 根据商品分类（生鲜、数码、服饰）定义不同的刷新样式、动画和文案
 * 形成配置映射表，方便动态调用
 * 
 * 使用方式：
 * import { pullRefreshConfig } from './pullRefresh.js';
 * const config = pullRefreshConfig['fresh']; // 获取生鲜分类配置
 */

export const pullRefreshConfig = {
    // ==================== 生鲜分类配置 ====================
    // 绿色主题 + 水滴动画 + 新鲜文案
    fresh: {
        theme: 'green',
        icon: 'droplet', // 自定义水滴动画组件名称
        text: {
            pulling: '下拉获取新鲜食材...',    // 下拉中
            loosing: '松开刷新啦~',          // 松开刷新
            loading: '正在挑选最新鲜的...'    // 加载中
        },
        animationDuration: 300, // 动画时长（毫秒）
        color: '#4cd964', // 主题色：生鲜绿
        threshold: 80 // 触发刷新的下拉距离（像素）
    },
    
    // ==================== 数码分类配置 ====================
    // 科技蓝主题 + 齿轮动画 + 科技感文案
    digital: {
        theme: 'blue',
        icon: 'gear', // 自定义齿轮动画组件名称
        text: {
            pulling: '下拉探索黑科技...',
            loosing: '松开加载新品~',
            loading: '正在加载前沿数码...'
        },
        animationDuration: 400,
        color: '#007aff', // 主题色：数码蓝
        threshold: 80
    },
    
    // ==================== 服饰分类配置 ====================
    // 粉色主题 + 旋转衣服动画 + 时尚文案
    clothing: {
        theme: 'pink',
        icon: 'clothes', // 自定义衣服动画组件名称
        text: {
            pulling: '下拉刷新潮流穿搭...',
            loosing: '松开查看新款~',
            loading: '正在更新当季流行...'
        },
        animationDuration: 350,
        color: '#ff2d55', // 主题色：服饰粉
        threshold: 80
    }
};

/**
 * 获取分类配置
 * 
 * @param {string} category - 分类名称（fresh/digital/clothing）
 * @returns {Object} 配置对象，如果分类不存在则返回默认配置（生鲜）
 */
export function getPullRefreshConfig(category) {
    return pullRefreshConfig[category] || pullRefreshConfig.fresh;
}


