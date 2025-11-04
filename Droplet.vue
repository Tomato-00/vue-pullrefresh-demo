<template>
    <div class="droplet-icon" :class="status">
        <!-- 水滴 SVG 图标 -->
        <!-- 
            SVG 说明：
            - viewBox 定义 SVG 的坐标系统
            - path 定义水滴形状的路径
            - fill="currentColor" 使用父元素的文字颜色
        -->
        <svg width="30" height="30" viewBox="0 0 100 100" class="droplet-svg">
            <path 
                d="M50,10 C30,10 10,30 10,50 C10,70 30,90 50,90 C70,90 90,70 90,50 C90,30 70,10 50,10 Z" 
                fill="currentColor"
            />
        </svg>
    </div>
</template>

<script>
/**
 * 生鲜水滴动画组件
 * 
 * Props:
 * - status: 下拉状态（'pulling' | 'loosing' | 'loading'）
 * - duration: 动画时长（毫秒）
 * 
 * 动画状态说明：
 * - pulling: 下拉中，水滴随下拉距离放大
 * - loosing: 松开刷新，水滴放大到 1.2 倍
 * - loading: 加载中，水滴旋转 + 波动动画
 */
export default {
    name: 'Droplet',
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
            default: 300
        }
    }
};
</script>

<style scoped>
/* ==================== 基础样式 ==================== */

.droplet-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    color: inherit; /* 继承父元素的颜色 */
}

.droplet-svg {
    width: 30px;
    height: 30px;
    transition: transform 0.3s ease;
}

/* ==================== 下拉中状态（pulling）==================== */
/* 水滴随下拉距离放大，并添加脉冲动画 */

.droplet-icon.pulling {
    animation: pulse 1.5s ease-in-out infinite;
}

.droplet-icon.pulling .droplet-svg {
    transform: scale(0.8);
}

/* ==================== 松开刷新状态（loosing）==================== */
/* 水滴放大到 1.2 倍，准备加载 */

.droplet-icon.loosing {
    transform: scale(1.2);
}

.droplet-icon.loosing .droplet-svg {
    transform: scale(1.2);
}

/* ==================== 加载中状态（loading）==================== */
/* 水滴旋转 + 波动动画，表示正在加载 */

.droplet-icon.loading {
    animation: rotateAndScale 2s linear infinite;
}

.droplet-icon.loading .droplet-svg {
    animation: rotateAndScale 2s linear infinite;
}

/* ==================== 动画关键帧 ==================== */

/**
 * 脉冲动画
 * 模拟水滴的呼吸效果，增强视觉吸引力
 */
@keyframes pulse {
    0%, 100% {
        transform: scale(0.8);
    }
    50% {
        transform: scale(1);
    }
}

/**
 * 旋转 + 缩放动画
 * 加载时水滴旋转，同时有缩放效果，表示活跃状态
 */
@keyframes rotateAndScale {
    0% {
        transform: rotate(0deg) scale(1);
    }
    25% {
        transform: rotate(90deg) scale(1.1);
    }
    50% {
        transform: rotate(180deg) scale(1);
    }
    75% {
        transform: rotate(270deg) scale(1.1);
    }
    100% {
        transform: rotate(360deg) scale(1);
    }
}
</style>

