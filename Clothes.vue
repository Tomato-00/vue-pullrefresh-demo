<template>
    <div class="clothes-icon" :class="status">
        <!-- 衣服 SVG 图标 -->
        <!-- 
            SVG 说明：
            - 使用路径绘制衣服形状（T恤）
            - fill="currentColor" 使用父元素的文字颜色
        -->
        <svg width="24" height="24" viewBox="0 0 100 100" class="clothes-svg">
            <!-- 衣服主体 -->
            <path 
                d="M50,10 L35,20 L35,70 L50,90 L65,70 L65,20 Z" 
                fill="currentColor"
            />
            <!-- 领口 -->
            <path 
                d="M40,20 Q50,15 60,20" 
                fill="none" 
                stroke="white" 
                stroke-width="2"
            />
            <!-- 袖子（左侧） -->
            <path 
                d="M35,25 Q25,25 25,35 Q25,45 35,40" 
                fill="currentColor"
            />
            <!-- 袖子（右侧） -->
            <path 
                d="M65,25 Q75,25 75,35 Q75,45 65,40" 
                fill="currentColor"
            />
        </svg>
    </div>
</template>

<script>
/**
 * 服饰衣服动画组件
 * 
 * Props:
 * - status: 下拉状态（'pulling' | 'loosing' | 'loading'）
 * - duration: 动画时长（毫秒）
 * 
 * 动画状态说明：
 * - pulling: 下拉中，衣服轻微摇摆
 * - loosing: 松开刷新，衣服放大并摇摆
 * - loading: 加载中，衣服旋转 + 摇摆，表示潮流涌动
 */
export default {
    name: 'Clothes',
    props: {
        status: {
            type: String,
            default: 'pulling',
            validator: function(value) {
                return ['pulling', 'loosing', 'loading'].indexOf(value) !== -1;
            }
        },
        duration: {
            type: Number,
            default: 350
        }
    }
};
</script>

<style scoped>
/* ==================== 基础样式 ==================== */

.clothes-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    color: inherit;
}

.clothes-svg {
    width: 24px;
    height: 24px;
    transition: transform 0.3s ease;
    transform-origin: center top; /* 设置旋转中心为顶部中心 */
}

/* ==================== 下拉中状态（pulling）==================== */
/* 衣服轻微摇摆，表示准备状态 */

.clothes-icon.pulling {
    animation: gentleSway 2s ease-in-out infinite;
}

.clothes-icon.pulling .clothes-svg {
    animation: gentleSway 2s ease-in-out infinite;
}

/* ==================== 松开刷新状态（loosing）==================== */
/* 衣服放大并摇摆，表示激活状态 */

.clothes-icon.loosing {
    transform: scale(1.2);
    animation: strongSway 0.6s ease-in-out infinite;
}

.clothes-icon.loosing .clothes-svg {
    transform: scale(1.2);
    animation: strongSway 0.6s ease-in-out infinite;
}

/* ==================== 加载中状态（loading）==================== */
/* 衣服旋转 + 摇摆，表示潮流涌动 */

.clothes-icon.loading {
    animation: rotateAndSway 1.5s ease-in-out infinite;
}

.clothes-icon.loading .clothes-svg {
    animation: rotateAndSway 1.5s ease-in-out infinite;
}

/* ==================== 动画关键帧 ==================== */

/**
 * 轻微摇摆动画
 * 下拉时衣服轻微摇摆，模拟被风吹动的感觉
 */
@keyframes gentleSway {
    0%, 100% {
        transform: rotate(-5deg);
    }
    50% {
        transform: rotate(5deg);
    }
}

/**
 * 强烈摇摆动画
 * 松开刷新时衣服放大并强烈摇摆，增强视觉冲击
 */
@keyframes strongSway {
    0%, 100% {
        transform: rotate(-15deg) scale(1.2);
    }
    50% {
        transform: rotate(15deg) scale(1.2);
    }
}

/**
 * 旋转 + 摇摆动画
 * 加载时衣服旋转同时摇摆，表示潮流涌动和活跃状态
 */
@keyframes rotateAndSway {
    0% {
        transform: rotate(0deg) translateX(0);
    }
    25% {
        transform: rotate(90deg) translateX(2px);
    }
    50% {
        transform: rotate(180deg) translateX(0);
    }
    75% {
        transform: rotate(270deg) translateX(-2px);
    }
    100% {
        transform: rotate(360deg) translateX(0);
    }
}
</style>


