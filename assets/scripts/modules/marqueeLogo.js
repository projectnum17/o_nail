const marqueeLogo = () => {
    const marqueeBlock = document.querySelector('.js-marquee');

    if (!marqueeBlock) return;
    if (typeof Swiper === 'undefined') return;

    new Swiper(marqueeBlock, {
        slidesPerView: 'auto',
        spaceBetween: 40,
        loop: true,
        allowTouchMove: false,
        speed: 5000,
        autoplay: {
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
            // reverseDirection: true,
        },
        freeMode: true,
        freeModeMomentum: false,
    });
};

export default marqueeLogo;
