const homePage = () => {
    if (typeof Swiper === 'undefined') return;

    const marqueeBlock = (selector, speed) => {
        const parent = document.querySelector(selector);
        if (!parent) return;

        if (!parent.children.length) return;

        const clone = parent.innerHTML;
        let i = 0;

        for (let j = 0; j < 8; j++) {
            parent.insertAdjacentHTML('beforeend', clone);
        }

        const totalWidth = parent.scrollWidth / 2;

        setInterval(function () {
            parent.style.transform = `translateX(-${i}px)`;

            if (i > totalWidth) {
                i = 0;
            }
            i += speed;
        }, 16);
    };

    const influenceModal = () => {
        const openModal = document.querySelector('.js-influencer-open');
        if (!openModal) return;
        const modalWrapper = document.querySelector('.js-influencer');
        if (!modalWrapper) return;
        const closeModal = modalWrapper.querySelector('.js-influencer-close');
        const formItem = modalWrapper.querySelector('form');

        let timeoutId;

        const showModal = () => {
            modalWrapper.classList.add('show');
            document.body.style.overflow = 'hide';
            clearTimeout(timeoutId);
        };

        const hideModal = () => {
            modalWrapper.classList.remove('show');
            document.body.style.overflow = '';
            clearTimeout(timeoutId);
        };

        openModal.addEventListener('click', (e) => {
            e.stopPropagation();
            showModal();
        });

        closeModal.addEventListener('click', () => {
            hideModal();
        });

        modalWrapper.addEventListener('click', (e) => {
            if (e.target === modalWrapper) {
                hideModal();
            }
        });

        timeoutId = setTimeout(() => {
            showModal();
        }, 10000);

        formItem.addEventListener('submit', () => {
            hideModal();
            clearTimeout(timeoutId);
        });
    };

    const videoAutoplay = () => {
        const lazyVideos = Array.from(
            document.querySelectorAll('.js-video-autoplay')
        );

        if (!lazyVideos.length) return;

        const loadAndPlayVideo = (video) => {
            const sources = video.querySelectorAll('source[data-src]');
            sources.forEach((source) => {
                source.src = source.dataset.src;
            });

            video.load();

            video.play().catch((e) => {
                console.warn('Video autoplay failed:', e);
            });

            video.classList.remove('lazyVideo');
        };

        if ('IntersectionObserver' in window) {
            const lazyVideoObserver = new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const video = entry.target;
                            loadAndPlayVideo(video);
                            observer.unobserve(video);
                        }
                    });
                }
            );

            lazyVideos.forEach((video) => {
                lazyVideoObserver.observe(video);
            });
        } else {
            lazyVideos.forEach(loadAndPlayVideo);
        }
    };

    const introGallery = () => {
        const gallEl = document.querySelector('.js-intro-gallery');
        if (!gallEl) return;

        new Swiper(gallEl, {
            effect: 'fade',
            fadeEffect: {
                crossFade: true,
            },
            loop: true,
            speed: 300,
            autoplay: {
                delay: 3000,
                disableOnInteraction: true,
            },

            pagination: {
                el: '.js-pagination',
                clickable: true,
            },
        });
    };

    const initVideosGallery = () => {
        const sliderWrapper = document.querySelector('.js-video-gallery');
        if (!sliderWrapper) return;

        const sliders = sliderWrapper.querySelectorAll('.js-slide');

        let sliderAutoplay = false;

        if (sliders.length > 5) {
            sliderAutoplay = {
                delay: 3000,
                disableOnInteraction: true,
            };
        }

        new Swiper(sliderWrapper, {
            loop: true,
            slidesPerView: 5,
            spaceBetween: 32,
            speed: 800,
            autoplay: sliderAutoplay,
            breakpoints: {
                0: {
                    slidesPerView: 1.5,
                    spaceBetween: 12,
                },
                768: {
                    slidesPerView: 3,
                },
                991: {
                    slidesPerView: 3,
                    spaceBetween: 15,
                },
                992: {
                    spaceBetween: 20,
                },
                1200: {
                    slidesPerView: 5,
                    spaceBetween: 32,
                },
            },
        });
    };

    const initVideoModal = () => {
        const videoBoxes = document.querySelectorAll('.js-video-start');
        const modal = document.querySelector('.js-video-modal');
        if (!modal || !videoBoxes.length) return;

        const closeBtn = modal.querySelector('.js-video-modal__close');
        const playBtn = modal.querySelector('.js-video-modal__play');
        const videoPlayer = modal.querySelector('#videoPlayer');
        const wrapper = modal.querySelector('.js-video-modal__wrapper');

        if (!closeBtn || !playBtn || !videoPlayer || !wrapper) return;

        videoBoxes.forEach((box) => {
            box.addEventListener('click', () => {
                const videoSrc = box.getAttribute('data-video');
                if (videoSrc) {
                    videoPlayer.src = videoSrc;
                    modal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                    videoPlayer.pause();
                    videoPlayer.removeAttribute('controls');
                    playBtn.classList.remove('hide');
                }
            });
        });

        videoPlayer.addEventListener('play', () => {
            playBtn.classList.add('hide');
            wrapper.classList.add('play');
            videoPlayer.setAttribute('controls', '');
        });

        videoPlayer.addEventListener('pause', () => {
            playBtn.classList.remove('hide');
            wrapper.classList.remove('play');
            videoPlayer.removeAttribute('controls');
        });

        videoPlayer.addEventListener('ended', () => {
            playBtn.classList.remove('hide');
            wrapper.classList.remove('play');
            videoPlayer.removeAttribute('controls');
        });

        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (videoPlayer.paused) {
                videoPlayer.play();
            } else {
                videoPlayer.pause();
            }
        });

        const closeModal = () => {
            document.body.style.overflow = '';
            modal.classList.remove('show');
            wrapper.classList.remove('play');
            setTimeout(() => {
                videoPlayer.pause();
                videoPlayer.removeAttribute('src');
                videoPlayer.load();
            }, 300);
        };

        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });
    };

    const partnerFlow = () => {
        const buttonMore = document.querySelector('.js-partners-more');
        if (!buttonMore) return;

        const partnerCards = document.querySelectorAll('.partners__card');
        if (!partnerCards.length) return;

        let hasHiddenCards = false;

        partnerCards.forEach((card, i) => {
            if (i > 11) {
                card.style.display = 'none';
                hasHiddenCards = true;
            }
        });

        if (hasHiddenCards) {
            buttonMore.style.display = '';
            buttonMore.addEventListener('click', () => {
                partnerCards.forEach((card) => {
                    card.style.display = '';
                });
                buttonMore.style.display = 'none';
            });
        } else {
            buttonMore.style.display = 'none';
        }
    };

    const createCountBlock = () => {
        const section = document.querySelector('.js-parent');
        const items = document.querySelectorAll('.js-child');
        const currentVal = document.getElementById('advCurrentVal');
        const totalVal = document.getElementById('advTotalVal');
        const counter = document.querySelector('.js-count');

        if (!section || !items.length || !currentVal || !totalVal || !counter)
            return;

        totalVal.textContent = String(items.length).padStart(2, '0');

        const sectionObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    counter.classList.toggle('visible', entry.isIntersecting);
                });
            },
            { threshold: 0.2 }
        );
        sectionObserver.observe(section);

        const updateCurrent = () => {
            const switchLine = window.innerHeight * 0.5;
            let activeIndex = 0;

            items.forEach((item, i) => {
                const rect = item.getBoundingClientRect();
                if (rect.top <= switchLine) {
                    activeIndex = i;
                }
            });

            currentVal.textContent = String(activeIndex + 1).padStart(2, '0');
        };

        window.addEventListener('scroll', updateCurrent, { passive: true });
        updateCurrent();
    };

    marqueeBlock('.marquee-block', 0.2);
    introGallery();
    videoAutoplay();
    influenceModal();
    initVideosGallery();
    initVideoModal();
    partnerFlow();
    createCountBlock();
};

export default homePage;
