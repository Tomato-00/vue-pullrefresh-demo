/**
 * 下拉刷新个性化配置 - Vue2 应用
 * 
 * 核心功能：
 * 1. 根据商品分类（生鲜、数码、服饰）显示不同的下拉刷新样式
 * 2. 原生实现下拉刷新功能（不依赖第三方库）
 * 3. 动态渲染不同的动画组件和文案
 * 4. 支持配置化和组件化
 */

// 下拉刷新个性化配置表
const pullRefreshConfig = {
    // 生鲜分类：绿色主题 + 水滴动画 + 新鲜文案
    fresh: {
        theme: 'green',
        icon: 'droplet',
        text: {
            pulling: '下拉获取新鲜食材...',
            loosing: '松开刷新啦~',
            loading: '正在挑选最新鲜的...'
        },
        animationDuration: 300,
        color: '#4cd964',
        threshold: 80
    },
    // 数码分类：科技蓝主题 + 齿轮动画 + 科技感文案
    digital: {
        theme: 'blue',
        icon: 'gear',
        text: {
            pulling: '下拉探索黑科技...',
            loosing: '松开加载新品~',
            loading: '正在加载前沿数码...'
        },
        animationDuration: 400,
        color: '#007aff',
        threshold: 80
    },
    // 服饰分类：粉色主题 + 旋转衣服动画 + 时尚文案
    clothing: {
        theme: 'pink',
        icon: 'clothes',
        text: {
            pulling: '下拉刷新潮流穿搭...',
            loosing: '松开查看新款~',
            loading: '正在更新当季流行...'
        },
        animationDuration: 350,
        color: '#ff2d55',
        threshold: 80
    }
};

/**
 * 获取初始分类（在 Vue 实例外部定义）
 * 
 * @returns {string} 分类值（fresh/digital/clothing），默认为 'fresh'
 */
function getInitialCategory() {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category && pullRefreshConfig[category]) {
        return category;
    }
    return 'fresh'; // 默认生鲜分类
}

/**
 * 根据分类获取商品数据（在 Vue 实例外部定义）
 * 
 * @param {string} category - 分类值（fresh/digital/clothing）
 * @returns {Array} 商品数组
 */
function getGoodsByCategory(category) {
    const goodsData = {
        // 生鲜分类商品
        fresh: [
            { id: 1, name: '新鲜草莓', price: 29.90, image: '🍓' },
            { id: 2, name: '有机苹果', price: 19.90, image: '🍎' },
            { id: 3, name: '时令蔬菜', price: 15.80, image: '🥬' },
            { id: 4, name: '精选牛肉', price: 89.00, image: '🥩' },
            { id: 5, name: '鲜活海鲜', price: 128.00, image: '🦐' },
            { id: 6, name: '有机鸡蛋', price: 28.50, image: '🥚' }
        ],
        // 数码分类商品
        digital: [
            { id: 1, name: '智能手机', price: 3999.00, image: '📱' },
            { id: 2, name: '笔记本电脑', price: 5999.00, image: '💻' },
            { id: 3, name: '无线耳机', price: 299.00, image: '🎧' },
            { id: 4, name: '智能手表', price: 1299.00, image: '⌚' },
            { id: 5, name: '游戏主机', price: 2499.00, image: '🎮' },
            { id: 6, name: '数码相机', price: 4599.00, image: '📷' }
        ],
        // 服饰分类商品
        clothing: [
            { id: 1, name: '时尚T恤', price: 99.00, image: '👕' },
            { id: 2, name: '休闲裤', price: 199.00, image: '👖' },
            { id: 3, name: '运动鞋', price: 299.00, image: '👟' },
            { id: 4, name: '连衣裙', price: 259.00, image: '👗' },
            { id: 5, name: '外套', price: 399.00, image: '🧥' },
            { id: 6, name: '配饰', price: 59.00, image: '👒' }
        ]
    };
    
    return goodsData[category] || goodsData.fresh;
}

// 创建 Vue 应用实例
const app = new Vue({
    el: '#app',
    
    /**
     * data 数据定义
     * 
     * Vue 响应式原理：
     * - Vue 会将 data 中的属性转换为 getter/setter
     * - 当属性变化时，会触发视图更新
     */
    data() {
        // 获取初始分类（在 data 外部获取，避免 this 指向问题）
        const initialCategory = getInitialCategory();
        
        return {
            // ==================== 页面标题 ====================
            title: '下拉刷新个性化配置',
            subtitle: '根据商品分类显示差异化动画和样式',
            
            // ==================== 当前商品分类 ====================
            // 从 URL 参数获取，默认为 'fresh'（生鲜）
            currentCategory: initialCategory,
            
            // ==================== 当前配置 ====================
            // 根据分类动态获取配置
            refreshConfig: pullRefreshConfig[initialCategory],
            
            // ==================== 下拉刷新状态 ====================
            // 下拉刷新状态：'pulling'（下拉中）| 'loosing'（松开刷新）| 'loading'（加载中）| 'normal'（正常）
            pullStatus: 'normal',
            
            // 是否正在刷新
            isRefreshing: false,
            
            // 是否正在下拉（用于判断是否应该处理触摸事件）
            isPulling: false,
            
            // 下拉距离（像素）
            pullDistance: 0,
            
            // 触摸起始位置
            touchStartY: 0,
            
            // 触摸当前位置
            touchCurrentY: 0,
            
            // ==================== 商品列表数据 ====================
            // 根据初始分类加载对应商品（使用外部函数）
            goodsList: getGoodsByCategory(initialCategory),
            
            // ==================== 分类列表 ====================
            categories: [
                { value: 'fresh', label: '生鲜', color: '#4cd964' },
                { value: 'digital', label: '数码', color: '#007aff' },
                { value: 'clothing', label: '服饰', color: '#ff2d55' }
            ]
        };
    },
    
    /**
     * computed 计算属性
     * 
     * 计算属性说明：
     * - 基于响应式依赖进行缓存
     * - 只有当依赖的数据变化时，才会重新计算
     */
    computed: {
        /**
         * 根据当前状态获取刷新文案
         * 
         * @returns {string} 当前状态对应的文案
         */
        refreshText() {
            const textMap = this.refreshConfig.text;
            switch (this.pullStatus) {
                case 'pulling':
                    return textMap.pulling;
                case 'loosing':
                    return textMap.loosing;
                case 'loading':
                    return textMap.loading;
                default:
                    return '';
            }
        },
        
        /**
         * 刷新头部样式
         * 
         * @returns {Object} 动态样式对象
         */
        refreshHeaderStyle() {
            const distance = Math.max(this.pullDistance, 0);
            const headerHeight = 60; // 刷新头部高度
            // 计算 translateY：初始在顶部上方，下拉时逐渐显示
            const translateY = distance > 0 ? -(headerHeight - distance) : -headerHeight;
            
            return {
                height: `${headerHeight}px`,
                minHeight: `${headerHeight}px`,
                transform: `translateY(${translateY}px)`,
                opacity: distance > 0 ? 1 : 0,
                visibility: distance > 0 ? 'visible' : 'hidden',
                transition: this.pullStatus === 'loading' ? 'none' : 'all 0.3s ease'
            };
        }
    },
    
    /**
     * methods 方法定义
     */
    methods: {
        /**
         * 从 URL 参数获取商品分类
         * 
         * @returns {string} 分类值（fresh/digital/clothing），默认为 'fresh'
         */
        getCategoryFromUrl() {
            return getInitialCategory();
        },
        
        /**
         * 切换商品分类
         * 
         * @param {string} category - 分类值（fresh/digital/clothing）
         */
        switchCategory(category) {
            // 如果点击的是当前分类，不重复切换
            if (this.currentCategory === category) {
                return;
            }
            
            this.currentCategory = category;
            this.refreshConfig = pullRefreshConfig[category];
            
            // 立即切换商品列表（根据分类加载对应商品）
            this.goodsList = getGoodsByCategory(category);
            
            // 更新 URL 参数（可选，保持页面状态）
            const url = new URL(window.location.href);
            url.searchParams.set('category', category);
            window.history.pushState({}, '', url);
            
            console.log(`切换到 ${category} 分类，配置:`, this.refreshConfig);
            console.log('商品列表已更新:', this.goodsList);
        },
        
        /**
         * 触摸开始事件
         * 
         * @param {TouchEvent} event - 触摸事件对象
         */
        handleTouchStart(event) {
            // 只在页面顶部且未在刷新时才处理下拉
            if (window.scrollY > 0 || this.isRefreshing || this.isPulling) {
                return;
            }
            
            // 记录触摸起始位置
            this.touchStartY = event.touches[0].clientY;
            this.isPulling = true;
            this.pullStatus = 'pulling';
        },
        
        /**
         * 触摸移动事件
         * 
         * @param {TouchEvent} event - 触摸事件对象
         */
        handleTouchMove(event) {
            // 如果不在下拉状态，不处理
            if (!this.isPulling || this.isRefreshing) {
                return;
            }
            
            // 如果页面已滚动，取消下拉
            if (window.scrollY > 0) {
                this.resetPullState();
                return;
            }
            
            this.touchCurrentY = event.touches[0].clientY;
            const deltaY = this.touchCurrentY - this.touchStartY;
            
            // 只处理向下拉
            if (deltaY > 0) {
                // 计算下拉距离（带阻尼效果）
                // 前 50px 1:1，之后 1:0.5 阻尼
                if (deltaY <= 50) {
                    this.pullDistance = deltaY;
                } else {
                    this.pullDistance = 50 + (deltaY - 50) * 0.5;
                }
                // 限制最大下拉距离
                this.pullDistance = Math.min(this.pullDistance, this.refreshConfig.threshold * 2);
                
                // 判断是否达到刷新阈值
                if (this.pullDistance >= this.refreshConfig.threshold) {
                    this.pullStatus = 'loosing';
                } else {
                    this.pullStatus = 'pulling';
                }
                
                // 阻止默认滚动行为
                event.preventDefault();
            } else {
                // 如果向上滑动，重置状态
                this.resetPullState();
            }
        },
        
        /**
         * 触摸结束事件
         */
        handleTouchEnd() {
            if (!this.isPulling || this.isRefreshing) {
                return;
            }
            
            // 如果达到刷新阈值，触发刷新
            if (this.pullDistance >= this.refreshConfig.threshold) {
                this.startRefresh();
            } else {
                // 未达到阈值，恢复原状
                this.resetPullState();
            }
        },
        
        /**
         * 开始刷新
         */
        startRefresh() {
            this.pullStatus = 'loading';
            this.isRefreshing = true;
            
            // 保持刷新头部显示
            this.pullDistance = this.refreshConfig.threshold;
            
            console.log('开始刷新，分类:', this.currentCategory);
            
            // 模拟异步刷新（实际项目中应该是真实的 API 请求）
            setTimeout(() => {
                this.onRefreshComplete();
            }, 1500); // 模拟 1.5 秒的网络延迟
        },
        
        /**
         * 刷新完成回调
         */
        onRefreshComplete() {
            // 生成新的商品数据（模拟刷新）
            const newGoods = this.generateNewGoods();
            this.goodsList = newGoods;
            
            // 恢复原状
            this.resetPullState();
            
            console.log('刷新完成，新商品列表:', this.goodsList);
        },
        
        /**
         * 重置下拉状态
         */
        resetPullState() {
            this.pullStatus = 'normal';
            this.isRefreshing = false;
            this.isPulling = false;
            this.pullDistance = 0;
            this.touchStartY = 0;
            this.touchCurrentY = 0;
        },
        
        /**
         * 生成新商品数据（模拟数据源）
         * 根据当前分类生成对应分类的新商品（用于下拉刷新）
         * 
         * @returns {Array} 新商品数组
         */
        generateNewGoods() {
            // 根据当前分类获取对应的商品池
            const goodsPool = {
                // 生鲜分类商品池
                fresh: [
                    { name: '新鲜草莓', priceRange: [20, 40], image: '🍓' },
                    { name: '有机苹果', priceRange: [15, 30], image: '🍎' },
                    { name: '时令蔬菜', priceRange: [10, 25], image: '🥬' },
                    { name: '精选牛肉', priceRange: [80, 120], image: '🥩' },
                    { name: '鲜活海鲜', priceRange: [100, 180], image: '🦐' },
                    { name: '有机鸡蛋', priceRange: [25, 35], image: '🥚' },
                    { name: '新鲜橙子', priceRange: [18, 32], image: '🍊' },
                    { name: '时令水果', priceRange: [22, 45], image: '🍉' }
                ],
                // 数码分类商品池
                digital: [
                    { name: '智能手机', priceRange: [3000, 6000], image: '📱' },
                    { name: '笔记本电脑', priceRange: [5000, 10000], image: '💻' },
                    { name: '无线耳机', priceRange: [200, 500], image: '🎧' },
                    { name: '智能手表', priceRange: [1000, 2000], image: '⌚' },
                    { name: '游戏主机', priceRange: [2000, 3000], image: '🎮' },
                    { name: '数码相机', priceRange: [4000, 8000], image: '📷' },
                    { name: '平板电脑', priceRange: [2500, 5000], image: '📱' },
                    { name: '显示器', priceRange: [800, 2000], image: '🖥️' }
                ],
                // 服饰分类商品池
                clothing: [
                    { name: '时尚T恤', priceRange: [80, 150], image: '👕' },
                    { name: '休闲裤', priceRange: [150, 300], image: '👖' },
                    { name: '运动鞋', priceRange: [250, 500], image: '👟' },
                    { name: '连衣裙', priceRange: [200, 400], image: '👗' },
                    { name: '外套', priceRange: [300, 600], image: '🧥' },
                    { name: '配饰', priceRange: [50, 150], image: '👒' },
                    { name: '运动装', priceRange: [180, 350], image: '👕' },
                    { name: '牛仔裤', priceRange: [200, 400], image: '👖' }
                ]
            };
            
            const pool = goodsPool[this.currentCategory] || goodsPool.fresh;
            const goods = [];
            
            // 随机生成6个商品
            for (let i = 0; i < 6; i++) {
                const id = Date.now() + i;
                // 随机选择一个商品模板
                const template = pool[Math.floor(Math.random() * pool.length)];
                // 在价格范围内随机生成价格
                const price = (Math.random() * (template.priceRange[1] - template.priceRange[0]) + template.priceRange[0]).toFixed(2);
                
                goods.push({
                    id: id,
                    name: `${template.name} ${id}`,
                    price: parseFloat(price),
                    image: template.image
                });
            }
            
            return goods;
        },
        
        /**
         * 渲染动画组件
         * 
         * 根据配置的 icon 字段返回对应的 HTML 模板
         * 
         * @returns {string} 动画组件的 HTML 模板
         */
        renderAnimationIcon() {
            const icon = this.refreshConfig.icon;
            const status = this.pullStatus;
            
            // 根据配置返回对应的动画组件 HTML
            switch (icon) {
                case 'droplet':
                    return this.renderDropletIcon(status);
                case 'gear':
                    return this.renderGearIcon(status);
                case 'clothes':
                    return this.renderClothesIcon(status);
                default:
                    return this.renderDropletIcon(status);
            }
        },
        
        /**
         * 渲染水滴图标
         */
        renderDropletIcon(status) {
            return `
                <div class="animation-icon ${status} droplet-icon">
                    <svg width="30" height="30" viewBox="0 0 100 100">
                        <path d="M50,10 C30,10 10,30 10,50 C10,70 30,90 50,90 C70,90 90,70 90,50 C90,30 70,10 50,10 Z" 
                              fill="currentColor"/>
                    </svg>
                </div>
            `;
        },
        
        /**
         * 渲染齿轮图标
         */
        renderGearIcon(status) {
            return `
                <div class="animation-icon ${status} gear-icon">
                    <svg width="30" height="30" viewBox="0 0 100 100">
                        <circle cx="50" cy="50" r="35" fill="currentColor" opacity="0.3"/>
                        <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="3"/>
                        <circle cx="50" cy="50" r="5" fill="currentColor"/>
                    </svg>
                </div>
            `;
        },
        
        /**
         * 渲染衣服图标
         */
        renderClothesIcon(status) {
            return `
                <div class="animation-icon ${status} clothes-icon">
                    <svg width="30" height="30" viewBox="0 0 100 100">
                        <path d="M50,10 L35,20 L35,70 L50,90 L65,70 L65,20 Z" fill="currentColor"/>
                        <path d="M40,20 Q50,15 60,20" fill="none" stroke="white" stroke-width="2"/>
                        <path d="M35,25 Q25,25 25,35 Q25,45 35,40" fill="currentColor"/>
                        <path d="M65,25 Q75,25 75,35 Q75,45 65,40" fill="currentColor"/>
                    </svg>
                </div>
            `;
        }
    },
    
    /**
     * mounted 生命周期钩子
     * 
     * DOM 挂载完成后执行
     */
    mounted() {
        console.log('下拉刷新个性化配置应用已挂载');
        console.log('当前分类:', this.currentCategory);
        console.log('当前配置:', this.refreshConfig);
        
        // 绑定触摸事件到 document，确保在页面顶部时能触发下拉刷新
        document.addEventListener('touchstart', this.handleTouchStart, { passive: false });
        document.addEventListener('touchmove', this.handleTouchMove, { passive: false });
        document.addEventListener('touchend', this.handleTouchEnd, { passive: false });
    },
    
    /**
     * beforeDestroy 生命周期钩子
     * 
     * 组件销毁前执行，清理事件监听器
     */
    beforeDestroy() {
        // 解绑触摸事件
        document.removeEventListener('touchstart', this.handleTouchStart);
        document.removeEventListener('touchmove', this.handleTouchMove);
        document.removeEventListener('touchend', this.handleTouchEnd);
    }
});

