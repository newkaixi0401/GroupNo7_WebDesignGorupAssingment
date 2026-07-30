const track = document.querySelector('.carousel-track');
const items = document.querySelectorAll('.carousel-item');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

const itemWidth = 600;
let currentIndex = 1; // 从克隆的第一张开始

// 克隆首尾
const firstClone = items[0].cloneNode(true);
const lastClone = items[items.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, items[0]);

const allItems = document.querySelectorAll('.carousel-item');
track.style.transform = `translateX(${-itemWidth * currentIndex}px)`;

// 更新轮播
function updateCarousel() {
  track.style.transition = "transform 0.5s ease";
  track.style.transform = `translateX(${-itemWidth * currentIndex}px)`;
}

// 下一张
nextBtn.addEventListener('click', () => {
  currentIndex++;
  updateCarousel();
});

// 上一张
prevBtn.addEventListener('click', () => {
  currentIndex--;
  updateCarousel();
});

// 监听过渡结束，处理无限循环
track.addEventListener('transitionend', () => {
  if (allItems[currentIndex].innerHTML === firstClone.innerHTML) {
    track.style.transition = "none";
    currentIndex = 1;
    track.style.transform = `translateX(${-itemWidth * currentIndex}px)`;
  }
  if (allItems[currentIndex].innerHTML === lastClone.innerHTML) {
    track.style.transition = "none";
    currentIndex = allItems.length - 2;
    track.style.transform = `translateX(${-itemWidth * currentIndex}px)`;
  }
});
