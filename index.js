const items = document.querySelectorAll(".carousel-item");
const itemCount = items.length;

let currentIndex = 0;
let autoPlayTimer = null;
let isDragging = false;
let startX = 0;

function updateCarousel() {
    items.forEach((item, index) => {
        // 计算当前卡片相对于中间主卡片的相对偏移 (-1: 左侧, 0: 中间, 1: 右侧)
        let offset = (index - currentIndex + itemCount) % itemCount;
        if (offset > itemCount / 2) {
            offset -= itemCount;
        }

        if (offset === 0) {
            // 【Main 中间主卡片】：居中、放大、完全显形
            item.style.transform = "translate(-50%, -50%) translateX(0px) scale(1.15)";
            item.style.opacity = "1";
            item.style.zIndex = "10";
            item.style.filter = "blur(0px)";
            item.style.pointerEvents = "auto";
        } else if (offset === -1 || offset === itemCount - 1) {
            // 【左侧次要卡片】：往左平移 300px，缩小，半透明待机，且正面朝前
            item.style.transform = "translate(-50%, -50%) translateX(-300px) scale(0.85)";
            item.style.opacity = "0.45";
            item.style.zIndex = "5";
            item.style.filter = "blur(0.5px)";
            item.style.pointerEvents = "auto";
        } else if (offset === 1) {
            // 【右侧次要卡片】：往右平移 300px，缩小，半透明待机，且正面朝前
            item.style.transform = "translate(-50%, -50%) translateX(300px) scale(0.85)";
            item.style.opacity = "0.45";
            item.style.zIndex = "5";
            item.style.filter = "blur(0.5px)";
            item.style.pointerEvents = "auto";
        } else {
            // 其他多余的卡片隐藏在中间并缩小为 0
            item.style.transform = "translate(-50%, -50%) translateX(0px) scale(0)";
            item.style.opacity = "0";
            item.style.zIndex = "1";
            item.style.pointerEvents = "none";
        }
    });
}

// 顺时针/向左切换下一张
function nextSlide() {
    currentIndex = (currentIndex + 1) % itemCount;
    updateCarousel();
}

// 2.5秒快速自动轮播
function startAutoPlay() {
    autoPlayTimer = setInterval(nextSlide, 2500);
}

function stopAutoPlay() {
    clearInterval(autoPlayTimer);
}

// 鼠标拖拽支持
const carouselEl = document.getElementById("carousel");

carouselEl.addEventListener("mousedown", (e) => {
    isDragging = true;
    startX = e.clientX;
    stopAutoPlay();
});

window.addEventListener("mouseup", (e) => {
    if (!isDragging) return;
    isDragging = false;
    const deltaX = e.clientX - startX;

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

// 手机触控支持
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

// 初始化执行
updateCarousel();
startAutoPlay();
