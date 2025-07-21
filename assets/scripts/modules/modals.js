const initModal = ({
    modalSelector,
    openSelector,
    boxSelector,
    closeSelector,
}) => {
    const modal = document.querySelector(modalSelector),
        openBtns = document.querySelectorAll(openSelector),
        modalBox = document.querySelector(boxSelector),
        closeBtn = document.querySelector(closeSelector);

    if (!modal || !openBtns || !modalBox || !closeBtn) return;

    openBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            modal.classList.add('shown');
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', () => {
        modal.classList.remove('shown');
        document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
        const path = e.composedPath();
        if (!path.includes(modalBox)) {
            modal.classList.remove('shown');
            document.body.style.overflow = '';
        }
    });
};

const modals = () => {
    initModal({
        modalSelector: '.js-catalog',
        openSelector: '.js-catalog-open',
        boxSelector: '.js-catalog-wrapp',
        closeSelector: '.js-catalog-close',
    });

    initModal({
        modalSelector: '.js-basket',
        openSelector: '.js-basket-open',
        boxSelector: '.js-basket-wrapp',
        closeSelector: '.js-basket-close',
    });
};

export default modals;
