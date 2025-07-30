const quickOrder = () => {
    const modal = document.querySelector('.js-quick-form');
    if (!modal) return;

    const formBox = modal.querySelector('.form-box');
    const successBox = modal.querySelector('.success-box');
    const form = modal.querySelector('form');
    const openButtons = document.querySelectorAll('.js-quick-order');
    const closeFormBtn = modal.querySelector('.form-box__close');
    const closeSuccessBtn = modal.querySelector('.success-box__close');

    const openModal = () => {
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        if (formBox) formBox.style.display = 'block';
        if (successBox) successBox.style.display = 'none';
    };

    const closeModal = () => {
        modal.classList.remove('show');
        document.body.style.overflow = '';
    };

    if (openButtons.length > 0) {
        openButtons.forEach((btn) => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });
    }

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
            if (formBox) formBox.style.display = 'none';
            if (successBox) successBox.style.display = 'block';
        });
    }
};

export default quickOrder;
