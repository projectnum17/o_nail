const contactModal = () => {
    const modal = document.querySelector('.js-contact-modal');
    if (!modal) return;

    const openButtons = document.querySelectorAll('.js-contact-form');
    if (!openButtons.length) return;

    const closeFormBtn = modal.querySelector('.contact-modal__close');
    const closeSuccessBtn = modal.querySelector(
        '.contact-modal__success-close'
    );
    const form = modal.querySelector('.contact-modal__form');
    const formWrapper = modal.querySelector('.contact-modal__wrapper');
    const successBox = modal.querySelector('.contact-modal__success');

    const openModal = () => {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        if (formWrapper) formWrapper.style.display = 'flex';
        if (successBox) successBox.style.display = 'none';
    };

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    openButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
        });
    });

    if (closeFormBtn) {
        closeFormBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    if (closeSuccessBtn) {
        closeSuccessBtn.addEventListener('click', (e) => {
            e.preventDefault();
            closeModal();
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            if (formWrapper) formWrapper.style.display = 'none';
            if (successBox) successBox.style.display = 'block';
        });
    }
};

export default contactModal;
