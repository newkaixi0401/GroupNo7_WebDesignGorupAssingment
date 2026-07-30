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
let dragThreshold = 50; // 拖动多少像素触发切换

// 初始化每张卡片在3D圆环上的位置
function initCarousel() {
    items.forEach((item, index) => {
        item.style.transform = `translate(-50%, -50%) rotateY(${index * rotateAngle}deg) translateZ(400px)`;
    });
    updateCardStyles();
}

// 核心：动态计算并更新卡片的显形与半透明状态
function updateCardStyles() {
    items.forEach((item, index) => {
        // 计算当前卡片相对于正中心卡片的偏移量
        let itemAngle = (index * rotateAngle + angle) % 360;
        if (itemAngle < 0) itemAngle += 360;

        // 如果在正前方（角度接近 0 或 360），完全不透明并高清显示
        // 如果在两边或背面，降低透明度形成半透明待机效果
        if (itemAngle < 10 || itemAngle > 350) {
            item.style.opacity = "1";
            item.style.filter = "blur(0px)";
            item.style.pointerEvents = "auto";
        } else if (itemAngle > 80 && itemAngle < 280) {
            // 背面隐藏
            item.style.opacity = "0";
            item.style.pointerEvents = "none";
        } else {
            // 两边侧面：半透明待机
            item.style.opacity = "0.4";
            item.style.filter = "blur(1px)";
            item.style.pointerEvents = "auto";
        }
    });
}

// 旋转到指定索引
function rotateToIndex(index) {
    currentIndex = index;
    angle = -currentIndex * rotateAngle;
    container.style.transform = `rotateY(${angle}deg)`;
    updateCardStyles();
}

// 下一张
function nextSlide() {
    currentIndex = (currentIndex + 1) % itemCount;
    rotateToIndex(currentIndex);
}

// 启动慢速自动轮播（每 4 秒切一次，速度更柔和）
function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 4000);
}

function stopAutoPlay() {
    clearInterval(autoPlayTimer);
}

// --- 鼠标 / 触控拖拽逻辑 ---
const carouselEl = document.getElementById("carousel");

carouselEl.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    currentAngle = angle;
    stopAutoPlay(); // 用户操作时暂停自动轮播
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
    // 根据拖动距离实时改变旋转角度
    angle = currentAngle + (deltaX / 4);
    container.style.transform = `rotateY(${angle}deg)`;
    updateCardStyles();
});

window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = e.clientX - startX;

    // 如果拖动距离超过阈值，则切换到上一张或下一张
    if (Math.abs(deltaX) > dragThreshold) {
        if (deltaX > 0) {
            currentIndex = (currentIndex - 1 + itemCount) % itemCount;
        } else {
            currentIndex = (currentIndex + 1) % itemCount;
        }
    }
    rotateToIndex(currentIndex);
    startAutoPlay(); // 恢复自动轮播
});

// 手机端触摸支持
carouselEl.addEventListener("touchstart", (e) => {
    isDragging = true;
    startX = e.touches[0].clientX;
    currentAngle = angle;
    stopAutoPlay();
});

window.addEventListener("touchmove", (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - startX;
    angle = currentAngle + (deltaX / 4);
    container.style.transform = `rotateY(${angle}deg)`;
    updateCardStyles();
});

window.addEventListener("touchend", (e) => {
    if (!isDragging) return;
    isDragging = false;
    // 简化处理，触控结束后平滑对齐当前最近的一张
    const targetIndex = Math.round(-angle / rotateAngle) % itemCount;
    currentIndex = targetIndex < 0 ? targetIndex + itemCount : targetIndex;
    rotateToIndex(currentIndex);
    startAutoPlay();
});

// 初始化执行
initCarousel();
startAutoPlay();
