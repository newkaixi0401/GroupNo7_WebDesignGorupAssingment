let angle = 0;
const items = document.querySelectorAll(".carousel-item");
const container = document.querySelector(".carousel-container");
const itemCount = items.length;
const rotateAngle = 360 / itemCount;

// 初始化位置
items.forEach((item, index) => {
  item.style.transform = `rotateY(${index * rotateAngle}deg) translateZ(300px)`;
});

function rotateCarousel(direction) {
  angle += direction * rotateAngle;
  container.style.transform = `rotateY(${angle}deg)`;
}
