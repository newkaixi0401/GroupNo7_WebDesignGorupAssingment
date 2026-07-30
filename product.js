document.addEventListener("DOMContentLoaded", () => {
    // 1. 分类筛选功能
    const filterButtons = document.querySelectorAll(".filter-btn");
    const categorySections = document.querySelectorAll(".category-section");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            filterButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            const selectedFilter = button.getAttribute("data-filter");

            categorySections.forEach(section => {
                const category = section.getAttribute("data-category");

                if (selectedFilter === "all" || category === selectedFilter) {
                    section.style.display = "block";
                } else {
                    section.style.display = "none";
                }
            });
        });
    });

    // 2. 商品弹窗与数量选择功能
    const modal = document.getElementById("productModal");
    const closeBtn = document.querySelector(".close-btn");
    const productCards = document.querySelectorAll(".product-card");

    const modalImg = document.getElementById("modalImg");
    const modalTitle = document.getElementById("modalTitle");
    const modalPrice = document.getElementById("modalPrice");
    const modalDesc = document.getElementById("modalDesc");

    const decreaseBtn = document.getElementById("decreaseBtn");
    const increaseBtn = document.getElementById("increaseBtn");
    const quantityValue = document.getElementById("quantityValue");
    const addToCartBtn = document.querySelector(".add-to-cart-btn");

    let currentQuantity = 1;

    // 点击任意商品卡片，获取其数据并打开弹窗
    productCards.forEach(card => {
        card.addEventListener("click", () => {
            const imgSrc = card.querySelector("img").getAttribute("src");
            const title = card.querySelector("h3").textContent;
            const price = card.querySelector(".price").textContent;
            const desc = card.querySelector(".description").textContent;

            // 填充数据到弹窗
            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalPrice.textContent = price;
            modalDesc.textContent = desc;

            // 重置数量为 1
            currentQuantity = 1;
            quantityValue.textContent = currentQuantity;

            // 显示弹窗
            modal.style.display = "flex";
        });
    });

    // 点击关闭按钮关闭弹窗
    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    // 点击弹窗外部阴影区域也可以关闭弹窗
    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });

    // 数量减 -1
    decreaseBtn.addEventListener("click", () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityValue.textContent = currentQuantity;
        }
    });

    // 数量加 +1
    increaseBtn.addEventListener("click", () => {
        currentQuantity++;
        quantityValue.textContent = currentQuantity;
    });

    // 点击 Add to Cart 按钮的反馈（可根据需要自行扩展购物车逻辑）
    addToCartBtn.addEventListener("click", () => {
        alert(`Successfully added ${currentQuantity} of "${modalTitle.textContent}" to your cart!`);
        modal.style.display = "none";
    });
});
