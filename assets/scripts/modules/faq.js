const faq = () => {
    const faqBox = document.querySelectorAll('.faq-box');
    if (!faqBox.length) return;

    faqBox.forEach((item) => {
        item.addEventListener('click', () => {
            const isOpen = item.classList.contains('is-open');

            faqBox.forEach((box) => {
                box.classList.remove('is-open');
            });

            if (!isOpen) {
                item.classList.add('is-open');
            }
        });
    });
};

export default faq;
