const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let currentIndex = 0;
const itemWidth = 420; // 每张图宽度+margin

function updateCarousel() {
  const offset = -currentIndex * itemWidth;
  track.style.transform = `translateX(${offset}px)`;
}

// 下一张
nextBtn.addEventListener('click', () => {
  currentIndex = (currentIndex + 1) % items.length; // 无限循环
  updateCarousel();
});

// 上一张
prevBtn.addEventListener('click', () => {
  currentIndex = (currentIndex - 1 + items.length) % items.length; // 无限循环
  updateCarousel();
});

// 自动播放（可选）
setInterval(() => {
  currentIndex = (currentIndex + 1) % items.length;
  updateCarousel();
}, 5000);
