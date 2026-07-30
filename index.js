const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;

function updateCarousel() {
  const offset = -currentIndex * 420; // 每张图宽度+margin
  track.style.transform = `translateX(${offset}px)`;
}

nextBtn.addEventListener('click', () => {
  if (currentIndex < items.length - 1) {
    currentIndex++;
    updateCarousel();
  }
});

prevBtn.addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateCarousel();
  }
});

// 自动播放（可选）
setInterval(() => {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
}, 5000); // 每5秒切换
