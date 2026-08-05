document.addEventListener("DOMContentLoaded", function () {
    var form = document.getElementById("contactForm");
    var nameInput = document.getElementById("name");
    var emailInput = document.getElementById("email");
    var phoneInput = document.getElementById("phone");
    var messageInput = document.getElementById("message");

    var nameError = document.getElementById("nameError");
    var emailError = document.getElementById("emailError");
    var phoneError = document.getElementById("phoneError");
    var messageError = document.getElementById("messageError");
    var successMessage = document.getElementById("successMessage");

    var inputs = [nameInput, emailInput, phoneInput, messageInput];

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        var isValid = true;

        nameError.textContent = "";
        emailError.textContent = "";
        phoneError.textContent = "";
        messageError.textContent = "";
        successMessage.style.display = "none";
        
        inputs.forEach(function(input) {
            input.classList.remove("input-error");
        });

        var nameValue = nameInput.value.trim();
        var emailValue = emailInput.value.trim();
        var phoneValue = phoneInput.value.trim();
        var messageValue = messageInput.value.trim();

        if (nameValue === "") {
            nameError.textContent = "Please enter your name.";
            nameInput.classList.add("input-error");
            isValid = false;
        }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (emailValue === "") {
            emailError.textContent = "Please enter your email address.";
            emailInput.classList.add("input-error");
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            emailError.textContent = "Please enter a valid email address.";
            emailInput.classList.add("input-error");
            isValid = false;
        }

        var phonePattern = /^[\d\s\-+()]{7,18}$/;
        if (phoneValue === "") {
            phoneError.textContent = "Please enter your phone number.";
            phoneInput.classList.add("input-error");
            isValid = false;
        } else if (!phonePattern.test(phoneValue)) {
            phoneError.textContent = "Please enter a valid phone number.";
            phoneInput.classList.add("input-error");
            isValid = false;
        }

        if (messageValue === "") {
            messageError.textContent = "Please enter your message.";
            messageInput.classList.add("input-error");
            isValid = false;
        }

        if (isValid) {
            successMessage.style.display = "block";
            form.reset();
        }
    });
});
