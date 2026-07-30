const items = document.querySelectorAll(".carousel-item");
const itemCount = items.length;

let currentIndex = 0;
let autoPlayTimer = null;

let isDragging = false;
let startX = 0;

// 初始化卡片位置
function updateCarousel() {
    items.forEach((item, index) => {
        // 计算当前卡片相对于中间卡片的“相对位置索引” (-1 代表左侧, 0 代表中间, 1 代表右侧)
        let offset = (index - currentIndex + itemCount) % itemCount;
        
        // 处理循环后的位置修正
        if (offset > itemCount / 2) {
            offset -= itemCount;
        }

        if (offset === 0) {
            // 【Main 中间主卡片】：正中央、最大、不透明、最高层级
            item.style.transform = "translate(-50%, -50%) translateX(0px) scale(1.15)";
            item.style.opacity = "1";
            item.style.zIndex = "10";
            item.style.filter = "blur(0px)";
            item.style.pointerEvents = "auto";
        } else if (offset === -1 || offset === itemCount - 1) {
            // 【左侧次要卡片】：往左偏移、缩小、半透明待机
            item.style.transform = "translate(-50%, -50%) translateX(-280px) scale(0.85)";
            item.style.opacity = "0.45";
            item.style.zIndex = "5";
            item.style.filter = "blur(0.5px)";
            item.style.pointerEvents = "auto";
        } else if (offset === 1) {
            // 【右侧次要卡片】：往右偏移、缩小、半透明待机
            item.style.transform = "translate(-50%, -50%) translateX(280px) scale(0.85)";
            item.style.opacity = "0.45";
            item.style.zIndex = "5";
            item.style.filter = "blur(0.5px)";
            item.style.pointerEvents = "auto";
        } else {
            // 其他多余的卡片直接隐藏
            item.style.transform = "translate(-50%, -50%) translateX(0px) scale(0.5)";
            item.style.opacity = "0";
            item.style.zIndex = "1";
            item.style.pointerEvents = "none";
        }
    });
}

// 顺时针/向左滚动下一张
function nextSlide() {
    currentIndex = (currentIndex + 1) % itemCount;
    updateCarousel();
}

// 启动顺时针自动轮播（2.5秒切一次，速度较快）
function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 2500);
}

function stopAutoPlay() {
    clearInterval(autoPlayTimer);
}

// --- 拖拽交互支持 ---
const carouselEl = document.getElementById("carousel");

carouselEl.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    stopAutoPlay();
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
});

window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = e.clientX - startX;

    // 如果往左拖拽超过 40px，切到下一张；往右拖拽切到上一张
    if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
            currentIndex = (currentIndex + 1) % itemCount; // 顺时针
        } else {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount; // 逆时针
        }
    }
    updateCarousel();
    startAutoPlay();
});

// 手机端触摸支持
carouselEl.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    stopAutoPlay();
});

window.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = e.changedTouches[0].clientX - startX;

    if (Math.abs(deltaX) > 40) {
        if (deltaX < 0) {
            currentIndex = (currentIndex + 1) % itemCount;
        } else {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        }
    }
    updateCarousel();
    startAutoPlay();
});

// 初始化
updateCarousel();
startAutoPlay();
