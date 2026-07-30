const container = document.getElementById("carouselContainer");
const items = document.querySelectorAll(".carousel-item");
const itemCount = items.length;
const rotateAngle = 360 / itemCount;

let currentIndex = 0;
let angle = 0;
let autoPlayTimer = null;

// 拖拽相关变量
let isDragging = false;
let startX = 0;
let currentAngle = 0;
let dragThreshold = 40;

// 初始化每张卡片在3D圆环上的位置
function initCarousel() {
    items.forEach((item, index) => {
        // 顺时针布局：让索引递增时往顺时针方向走
        item.style.transform = `translate(-50%, -50%) rotateY(${-index * rotateAngle}deg) translateZ(350px)`;
    });
    updateCardStyles();
}

// 动态控制中间 Main 和两边 Side 的样式、尺寸与透明度
function updateCardStyles() {
    items.forEach((item, index) => {
        let itemAngle = (index * rotateAngle + angle) % 360;
        if (itemAngle < 0) itemAngle += 360;

        // 统一处理成以 0 度（正前方）为中心的偏移范围 [-180, 180]
        let diff = itemAngle;
        if (diff > 180) diff -= 360;

        // 根据距离正前方的角度来动态调整卡片大小和透明度
        if (Math.abs(diff) < 45) {
            // 【Main 中间主卡片】：放大、完全不透明、最高层级
            item.style.transform = `translate(-50%, -50%) rotateY(${-index * rotateAngle + angle}deg) translateZ(350px) scale(1.15)`;
            item.style.opacity = "1";
            item.style.zIndex = "10";
            item.style.filter = "blur(0px)";
        } else if (Math.abs(diff) > 135) {
            // 背面隐藏
            item.style.transform = `translate(-50%, -50%) rotateY(${-index * rotateAngle + angle}deg) translateZ(350px) scale(0.8)`;
            item.style.opacity = "0";
            item.style.zIndex = "1";
        } else {
            // 【Side 两边次要卡片】：缩小、半透明待机
            item.style.transform = `translate(-50%, -50%) rotateY(${-index * rotateAngle + angle}deg) translateZ(350px) scale(0.85)`;
            item.style.opacity = "0.45";
            item.style.zIndex = "5";
            item.style.filter = "blur(0.5px)";
        }
    });
}

// 旋转到指定索引
function rotateToIndex(index) {
    currentIndex = index;
    // 顺时针旋转逻辑
    angle = currentIndex * rotateAngle;
    container.style.transform = `rotateY(${angle}deg)`;
    updateCardStyles();
}

// 顺时针下一张
function nextSlide() {
    currentIndex = (currentIndex + 1) % itemCount;
    rotateToIndex(currentIndex);
}

// 加快自动轮播速度（改用更短的时间间隔，比如 2.5 秒切一次）
function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 2500);
}

function stopAutoPlay() {
    clearInterval(autoPlayTimer);
}

// --- 鼠标 / 触控拖拽交互逻辑 ---
const carouselEl = document.getElementById("carousel");

carouselEl.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    currentAngle = angle;
    stopFileAutoPlay();
});

function stopFileAutoPlay() {
    clearInterval(autoPlayTimer);
}

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    // 拖拽时跟随鼠标顺时针/逆时针滑动
    angle = currentAngle + (deltaX / 3);
    container.style.transform = `rotateY(${angle}deg)`;
    updateCardStyles();
});

window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = e.clientX - startX;

    if (Math.abs(deltaX) > dragThreshold) {
        if (deltaX > 0) {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        } else {
            currentIndex = (currentIndex + 1) % itemCount;
        }
    }
    rotateToIndex(currentIndex);
    startAutoPlay();
});

// 移动端 Touch 支持
carouselEl.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    currentAngle = angle;
    stopFileAutoPlay();
});

window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    angle = currentAngle + (deltaX / 3);
    container.style.transform = `rotateY(${angle}deg)`;
    updateCardStyles();
});

window.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const targetIndex = Math.round(angle / rotateAngle) % itemCount;
    currentIndex = targetIndex < 0 ? (targetIndex + itemCount) % itemCount : targetIndex;
    rotateToIndex(currentIndex);
    startAutoPlay();
});

// 初始化
initCarousel();
startAutoPlay();

// 初始化执行
initCarousel();
startAutoPlay();
