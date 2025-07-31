const productPage = () => {
    const reviewsCount = () => {
        const reviewValue = document.querySelector('#totalReviews');
        if (!reviewValue) return;
        const reviewsItems = document.querySelectorAll('.js-review-count');
        if (!reviewsItems.length) return;

        reviewValue.textContent = reviewsItems.length;
    };

    const anchors = () => {
        const anchorsEl = document.querySelectorAll('.js-anchor');
        if (!anchorsEl.length) return;

        anchorsEl[0].classList.add('active');
        anchorsEl[0].scrollIntoView({ behavior: 'smooth', block: 'start' });

        anchorsEl.forEach((anchor) => {
            anchor.addEventListener('click', () => {
                anchorsEl.forEach((a) => {
                    a.classList.remove('active');
                });
                anchor.classList.add('active');

                anchor.scrollIntoView({ behavior: 'smooth', block: 'start' });
            });
        });
    };

    const initGallery = () => {
        if (typeof Swiper === 'undefined') return;

        const smGallery = document.querySelector('#previewSm');
        const lgGallery = document.querySelector('#previewLg');

        if (!smGallery && !lgGallery) return;

        new Swiper(smGallery, {
            spaceBetween: 10,
            direction: 'vertical',
            spaceBetween: 8,
            slidesPerView: 4,
            breakpoints: {
                0: {
                    direction: 'horizontal',
                },
                1200: {
                    direction: 'vertical',
                },
            },
        });

        new Swiper(lgGallery, {
            spaceBetween: 10,
            effect: 'fade',
            thumbs: {
                swiper: smGallery,
            },
        });
    };

    const gifObserver = () => {
        const lazyImages = document.querySelectorAll('.js-video-observer');
        if (!lazyImages.length) return;

        const addErrorHandler = (img) => {
            img.addEventListener('error', () => {
                const fallbackSrc = img.dataset.fallback;
                if (fallbackSrc) {
                    img.src = fallbackSrc;
                }
            });
        };

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        addErrorHandler(img);
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        obs.unobserve(img);
                    }
                });
            });

            lazyImages.forEach((img) => observer.observe(img));
        } else {
            lazyImages.forEach((img) => {
                addErrorHandler(img);
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
            });
        }
    };

    const initInstructionVideos = () => {
        const videoWrapper = document.querySelector(
            '.content__instruction-video'
        );
        const playVideo = videoWrapper?.querySelector('.play-video');
        const videoItem = videoWrapper?.querySelector('video');
        const videoSource = videoItem?.querySelector('source');

        if (!videoWrapper || !videoItem || !videoSource) return;

        videoItem.removeAttribute('controls');

        const loadVideo = () => {
            if (videoSource.dataset.src && !videoSource.src) {
                videoSource.src = videoSource.dataset.src;
                videoItem.load();
            }
        };

        videoItem.addEventListener('play', () => {
            videoWrapper.classList.add('play');
            videoItem.setAttribute('controls', '');
        });

        videoItem.addEventListener('pause', () => {
            videoWrapper.classList.remove('play');
        });

        videoItem.addEventListener('ended', () => {
            videoWrapper.classList.remove('play');
            videoItem.removeAttribute('controls');
        });

        playVideo.addEventListener('click', () => {
            if (videoItem.paused) {
                loadVideo();
                videoItem.play();
            } else {
                videoItem.pause();
            }
        });
    };

    reviewsCount();
    anchors();
    initGallery();
    gifObserver();
    initInstructionVideos();
};

export default productPage;
