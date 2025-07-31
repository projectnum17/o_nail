const animationObserver = () => {
    const animationElements = document.querySelectorAll('.js-animation');
    if (!animationElements.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(
            (entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('_animated');
                    obs.unobserve(entry.target);
                }
            },
            {
                threshold: 0.2,
                rootMargin: '0px 0px -10% 0px',
            }
        );
    });

    animationElements.forEach((el) => observer.observe(el));
};

export default animationObserver;
