const navToggleOpen = document.querySelector('#nav-toggle-open');
const navToggleClose = document.querySelector('#nav-toggle-close');

navToggleOpen.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
    document.body.classList.toggle('icon-hidden');
});

navToggleClose.addEventListener('click', () => navToggleOpen.click());

// Initialize Swiper
const swiper = new Swiper('.swiper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,

    // If we need pagination
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true,
    },

    // Navigation arrows
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },

    //autoplay
    autoplay: {
        delay: 3000,
        disableOnInteraction: false,
    },


    // Responsive breakpoints
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        640: {
            slidesPerView: 2,
        },
        1024: {
            slidesPerView: 3,
        },
    },
});