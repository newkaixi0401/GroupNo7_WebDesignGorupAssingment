const container = document.getElementById("carouselContainer");
const items = document.querySelectorAll(".carousel-item");
const itemCount = items.length;
const rotateAngle = 360 / itemCount;

let currentIndex = 0;
let angle = 0;
let autoPlayTimer = null;

let isDragging = false;
let startX = 0;
let currentAngle = 0;
let dragThreshold = 40;

// 初始化卡片位置（Z轴设为 300px，确保左右两侧卡片清晰可见且不会被切）
function initCarousel() {
    items.forEach((item, index) => {
        item.style.transform = `translate(-50%, -50%) rotateY(${-index * rotateAngle}deg) translateZ(300px)`;
    });
    updateCardStyles();
}

function updateCardStyles() {
    items.forEach((item, index) => {
        let itemAngle = (index * rotateAngle + angle) % 360;
        if (itemAngle < 0) itemAngle += 360;

        let diff = itemAngle;
        if (diff > 180) diff -= 360;

        // 根据与正前方的角度差精确定制 Main 和 Side
        if (Math.abs(diff) < 45) {
            // 【Main 中间主卡片】
            item.style.transform = `translate(-50%, -50%) rotateY(${-index * rotateAngle + angle}deg) translateZ(300px) scale(1.15)`;
            item.style.opacity = "1";
            item.style.zIndex = "10";
            item.style.filter = "blur(0px)";
        } else if (Math.abs(diff) > 135) {
            // 背面隐藏
            item.style.transform = `translate(-50%, -50%) rotateY(${-index * rotateAngle + angle}deg) translateZ(300px) scale(0.75)`;
            item.style.opacity = "0";
            item.style.zIndex = "1";
        } else {
            // 【Side 左右两侧次要卡片】
            item.style.transform = `translate(-50%, -50%) rotateY(${-index * rotateAngle + angle}deg) translateZ(300px) scale(0.85)`;
            item.style.opacity = "0.5"; // 半透明待机
            item.style.zIndex = "5";
            item.style.filter = "blur(0.5px)";
        }
    });
}

function rotateToIndex(index) {
    currentIndex = index;
    angle = currentIndex * rotateAngle;
    container.style.transform = `rotateY(${angle}deg)`;
    updateCardStyles();
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % itemCount;
    rotateToIndex(currentIndex);
}

function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 2500); // 2.5秒顺时针快切
}

function stopAutoPlay() {
    clearInterval(autoPlayTimer);
}

// 拖拽交互
const carouselEl = document.getElementById("carousel");

carouselEl.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    currentAngle = angle;
    stopAutoPlay();
});

window.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - startX;
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

// 初始化执行
initCarousel();
startAutoPlay();
