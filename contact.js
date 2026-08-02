document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('username').value;
            
            alert('Thank you, ' + name + '! Your message has been sent successfully.');

            contactForm.reset();
        });
    }
});
