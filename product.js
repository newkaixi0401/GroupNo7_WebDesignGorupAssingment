document.addEventListener("DOMContentLoaded", () => {
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
});