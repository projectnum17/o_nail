const form = () => {
    const forms = document.querySelectorAll('form');

    if (!forms.length) return;

    forms.forEach((form) => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
        });
    });
};

export default form;
