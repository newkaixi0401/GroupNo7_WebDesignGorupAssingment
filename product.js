document.addEventListener("DOMContentLoaded", () => {
    let cart = [];

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

    const productModal = document.getElementById("productModal");
    const closeProductModalBtn = document.querySelector("#productModal .close-btn");
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
    let currentProductData = {};

    productCards.forEach(card => {
        card.addEventListener("click", () => {
            const imgSrc = card.querySelector("img").getAttribute("src");
            const title = card.querySelector("h3").textContent;
            const priceText = card.querySelector(".price").textContent;
            const desc = card.querySelector(".description").textContent;

            const numericPrice = parseFloat(priceText.replace(/[^0-9.]/g, ''));

            currentProductData = {
                title: title,
                price: numericPrice,
                img: imgSrc
            };

            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalPrice.textContent = priceText;
            modalDesc.textContent = desc;

            currentQuantity = 1;
            quantityValue.textContent = currentQuantity;

            productModal.style.display = "flex";
        });
    });

    closeProductModalBtn.addEventListener("click", () => {
        productModal.style.display = "none";
    });

    decreaseBtn.addEventListener("click", () => {
        if (currentQuantity > 1) {
            currentQuantity--;
            quantityValue.textContent = currentQuantity;
        }
    });

    increaseBtn.addEventListener("click", () => {
        currentQuantity++;
        quantityValue.textContent = currentQuantity;
    });

    addToCartBtn.addEventListener("click", () => {
        const existingItem = cart.find(item => item.title === currentProductData.title);

        if (existingItem) {
            existingItem.quantity += currentQuantity;
        } else {
            cart.push({
                ...currentProductData,
                quantity: currentQuantity
            });
        }

        updateCartBadge();
        productModal.style.display = "none";
    });

    const cartIconBtn = document.getElementById("cartIconBtn");
    const cartModal = document.getElementById("cartModal");
    const closeCartBtn = document.querySelector(".close-cart-btn");
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const cartTotalPrice = document.getElementById("cartTotalPrice");
    const cartCountBadge = document.getElementById("cartCount");
    const checkoutBtn = document.getElementById("checkoutBtn");

    cartIconBtn.addEventListener("click", () => {
        renderCart();
        cartModal.style.display = "flex";
    });

    closeCartBtn.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === productModal) productModal.style.display = "none";
        if (e.target === cartModal) cartModal.style.display = "none";
    });

    function updateCartBadge() {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountBadge.textContent = totalItems;
    }

    function renderCart() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `<p class="empty-cart-msg">Your cart is currently empty.</p>`;
            cartTotalPrice.textContent = "RM 0.00";
            return;
        }

        cartItemsContainer.innerHTML = "";
        let totalSum = 0;

        cart.forEach((item, index) => {
            const itemTotal = item.price * item.quantity;
            totalSum += itemTotal;

            const itemRow = document.createElement("div");
            itemRow.classList.add("cart-item-row");

            itemRow.innerHTML = `
                <img src="${item.img}" alt="${item.title}" class="cart-item-img">
                <div class="cart-item-info">
                    <div class="cart-item-title">${item.title}</div>
                    <div class="cart-item-price">RM ${item.price.toFixed(2)}</div>
                </div>
                <div class="cart-item-qty-ctrl">
                    <button class="cart-qty-minus" data-index="${index}">-</button>
                    <span>${item.quantity}</span>
                    <button class="cart-qty-plus" data-index="${index}">+</button>
                </div>
                <button class="cart-item-remove" data-index="${index}">&times;</button>
            `;

            cartItemsContainer.appendChild(itemRow);
        });

        cartTotalPrice.textContent = `RM ${totalSum.toFixed(2)}`;

        document.querySelectorAll(".cart-qty-minus").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = e.target.getAttribute("data-index");
                if (cart[idx].quantity > 1) {
                    cart[idx].quantity--;
                } else {
                    cart.splice(idx, 1);
                }
                updateCartBadge();
                renderCart();
            });
        });

        document.querySelectorAll(".cart-qty-plus").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = e.target.getAttribute("data-index");
                cart[idx].quantity++;
                updateCartBadge();
                renderCart();
            });
        });

        document.querySelectorAll(".cart-item-remove").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const idx = e.target.getAttribute("data-index");
                cart.splice(idx, 1);
                updateCartBadge();
                renderCart();
            });
        });
    }

    checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
            alert("Your cart is empty! Please add some products first.");
            return;
        }
        const selectedPayment = document.querySelector('input[name="payment"]:checked').value;
        alert(`Thank you for your order!\nTotal: ${cartTotalPrice.textContent}\nPayment method selected: ${selectedPayment.toUpperCase()}`);
        cart = [];
        updateCartBadge();
        cartModal.style.display = "none";
    });
});
