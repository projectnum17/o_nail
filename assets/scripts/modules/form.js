const form = () => {
    const forms = document.querySelectorAll('form');

    if (!forms.length) return;

    forms.forEach((form) => {
        const phoneInput = form.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', function (e) {
                let value = e.target.value.replace(/\D/g, '');

                if (value.length > 0 && !value.startsWith('38')) {
                    value = '38' + value;
                }

                value = value.slice(0, 12);

                const match = value.match(
                    /(\d{2})(\d{0,3})(\d{0,3})(\d{0,2})(\d{0,2})/
                );

                if (match) {
                    let formatted = '';

                    if (match[1]) {
                        formatted += '+ ' + match[1];
                    }

                    if (match[2]) {
                        formatted += ' (' + match[2];
                    }

                    if (match[3]) {
                        formatted += ') ' + match[3];
                    }

                    if (match[4]) {
                        formatted += '-' + match[4];
                    }

                    if (match[5]) {
                        formatted += '-' + match[5];
                    }

                    e.target.value = formatted;
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
