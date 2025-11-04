<template>
    <div class="gear-icon" :class="status">
        <!-- 齿轮 SVG 图标 -->
        <!-- 
            SVG 说明：
            - 使用多个圆和多边形组成齿轮形状
            - fill="currentColor" 使用父元素的文字颜色
        -->
        <svg width="30" height="30" viewBox="0 0 100 100" class="gear-svg">
            <!-- 齿轮外圈 - 16个齿，清晰的齿轮形状 -->
            <path 
                d="M50,5 L51,5 L52,18 L54,16 L55,29 L57,27 L58,40 L60,38 L61,51 L63,49 L64,62 L66,60 L67,73 L69,71 L70,84 L72,82 L73,95 L77,95 L78,82 L80,84 L81,71 L83,73 L84,60 L86,62 L87,49 L89,51 L90,38 L92,40 L93,27 L95,29 L96,16 L98,18 L99,5 L95,5 L94,18 L92,16 L91,29 L89,27 L88,40 L86,38 L85,51 L83,49 L82,62 L80,60 L79,73 L77,71 L76,84 L74,82 L73,95 L69,95 L68,82 L66,84 L65,71 L63,73 L62,60 L60,62 L59,49 L57,51 L56,38 L54,40 L53,27 L51,29 L50,16 L49,18 L48,5 Z" 
                fill="currentColor"
            />
            <!-- 齿轮内圈 - 使用白色填充挖空内圈 -->
            <circle cx="50" cy="50" r="32" fill="white"/>
            <!-- 齿轮内圈实心部分 -->
            <circle cx="50" cy="50" r="29" fill="currentColor"/>
            <!-- 中心孔 -->
            <circle cx="50" cy="50" r="12" fill="white"/>
            <!-- 中心点 -->
            <circle cx="50" cy="50" r="3" fill="currentColor"/>
        </svg>
    </div>
</template>

<script>
/**
 * 数码齿轮动画组件
 * 
 * Props:
 * - status: 下拉状态（'pulling' | 'loosing' | 'loading'）
 * - duration: 动画时长（毫秒）
 * 
 * 动画状态说明：
 * - pulling: 下拉中，齿轮缓慢旋转
 * - loosing: 松开刷新，齿轮加速旋转
 * - loading: 加载中，齿轮快速旋转，增强科技感
 */
export default {
    name: 'Gear',
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
            default: 400
        }
    }
};
</script>

<style scoped>

/* ==================== 基础样式 ==================== */

.gear-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.3s ease;
    color: inherit;
}

.gear-svg {
    width: 30px;
    height: 30px;
    transition: transform 0.3s ease;
}

/* ==================== 下拉中状态（pulling）==================== */
/* 齿轮缓慢旋转，表示准备状态 */

.gear-icon.pulling {
    animation: slowRotate 2s linear infinite;
}

.gear-icon.pulling .gear-svg {
    animation: slowRotate 2s linear infinite;
}

/* ==================== 松开刷新状态（loosing）==================== */
/* 齿轮加速旋转，表示激活状态 */

.gear-icon.loosing {
    animation: fastRotate 0.5s linear infinite;
}

.gear-icon.loosing .gear-svg {
    animation: fastRotate 0.5s linear infinite;
}

/* ==================== 加载中状态（loading）==================== */
/* 齿轮快速旋转，增强科技感 */

.gear-icon.loading {
    animation: ultraFastRotate 0.3s linear infinite;
}

.gear-icon.loading .gear-svg {
    animation: ultraFastRotate 0.3s linear infinite;
}

/* ==================== 动画关键帧 ==================== */

/**
 * 缓慢旋转动画
 * 下拉时齿轮缓慢旋转，表示准备状态
 */
@keyframes slowRotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/**
 * 快速旋转动画
 * 松开刷新时齿轮加速旋转，表示激活状态
 */
@keyframes fastRotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

/**
 * 超快速旋转动画
 * 加载时齿轮超快速旋转，增强科技感和活跃度
 */
@keyframes ultraFastRotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}
</style>
