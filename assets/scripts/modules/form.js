const form = () => {
    const forms = document.querySelectorAll('form');

    if (!forms.length) return;

    forms.forEach((form) => {
        const phoneInput = form.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', function (e) {
                const value = e.target.value.replace(/\D/g, '');
                const match = value.match(/(\d{0,3})(\d{0,3})(\d{0,4})/);

                if (match) {
                    e.target.value = !match[2]
                        ? match[1]
                        : '(' +
                          match[1] +
                          ') ' +
                          match[2] +
                          (match[3] ? '-' + match[3] : '');
                }
            });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            form.reset();
        });
    });
};

export default form;
