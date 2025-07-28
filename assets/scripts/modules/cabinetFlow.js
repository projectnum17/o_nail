const cabinetFlow = () => {
    const editPersonalInfo = () => {
        const editButton = document.querySelector('.js-edit-button');
        if (!editButton) return;

        const userInfo = document.querySelectorAll('.js-user-info');
        if (!userInfo.length) return;

        const birthdayInput = document.querySelector('#accountBirthdayField');
        const accountAbbr = document.querySelector('#accountAbbr');
        const accountName = document.querySelector('#accountName');
        const accountNameField = document.querySelector('#accountNameField');
        const accountSurnameField = document.querySelector(
            '#accountSurnameField'
        );
        const accountEmailField = document.querySelector('#accountEmailField');
        const accountPhoneField = document.querySelector('#accountPhoneField');

        userInfo.forEach((input) => {
            input.setAttribute('disabled', true);
            input.dataset.originalValue = input.value.trim();
        });

        let isEdit = false;

        editButton.addEventListener('click', () => {
            if (isEdit) {
                let hasError = false;

                userInfo.forEach((input) => {
                    if (input.value.trim() === '') {
                        input.value = input.dataset.originalValue;
                        input.classList.remove('error');
                    }

                    if (input === accountEmailField) {
                        const email = input.value.trim();
                        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

                        if (!emailRegex.test(email)) {
                            input.classList.add('error');
                            hasError = true;
                        } else {
                            input.classList.remove('error');
                        }
                    }

                    if (input === birthdayInput) {
                        if (input.value.length !== 10) {
                            input.classList.add('error');
                            hasError = true;
                        } else {
                            input.classList.remove('error');
                        }
                    }

                    if (
                        input.id === 'accountNameField' ||
                        input.id === 'accountSurnameField'
                    ) {
                        const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s-]+$/;
                        if (!nameRegex.test(input.value.trim())) {
                            input.classList.add('error');
                            hasError = true;
                        } else {
                            input.classList.remove('error');
                        }
                    }

                    if (input === accountPhoneField) {
                        const digitsCount = input.value.replace(
                            /\D/g,
                            ''
                        ).length;
                        if (digitsCount < 12) {
                            input.classList.add('error');
                            hasError = true;
                        } else {
                            input.classList.remove('error');
                        }
                    }
                });

                if (hasError) {
                    return;
                }
            }

            isEdit = !isEdit;
            editButton.classList.toggle('edit', isEdit);
            editButton.setAttribute('type', 'submit');

            if (isEdit) {
                userInfo.forEach((input) => {
                    input.removeAttribute('disabled');
                    input.classList.add('edits');
                });
            } else {
                userInfo.forEach((input) => {
                    input.setAttribute('disabled', true);
                    input.classList.remove('edits');

                    if (!input.classList.contains('error')) {
                        input.setAttribute('value', input.value.trim());
                        input.dataset.originalValue = input.value.trim();
                    }
                });

                accountName.textContent = accountNameField.value;
                accountAbbr.textContent = accountNameField.value.slice(0, 1);
            }
        });

        if (accountEmailField) {
            accountEmailField.addEventListener('input', () => {
                const email = accountEmailField.value.trim();
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (emailRegex.test(email)) {
                    accountEmailField.classList.remove('error');
                }
            });
        }

        if (accountNameField) {
            accountNameField.addEventListener('input', () => {
                const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s-]+$/;
                if (nameRegex.test(accountNameField.value.trim())) {
                    accountNameField.classList.remove('error');
                }
            });
        }

        if (accountSurnameField) {
            accountSurnameField.addEventListener('input', () => {
                const nameRegex = /^[A-Za-zА-Яа-яЁёІіЇїЄєҐґ\s-]+$/;
                if (nameRegex.test(accountSurnameField.value.trim())) {
                    accountSurnameField.classList.remove('error');
                }
            });
        }

        if (birthdayInput) {
            birthdayInput.addEventListener('input', () => {
                let val = birthdayInput.value.replace(/\D/g, '');
                if (val.length > 8) val = val.slice(0, 8);

                if (val.length > 4) {
                    val = val.replace(
                        /^(\d{2})(\d{2})(\d{0,4}).*$/,
                        '$1.$2.$3'
                    );
                } else if (val.length > 2) {
                    val = val.replace(/^(\d{2})(\d{0,2}).*$/, '$1.$2');
                }

                birthdayInput.value = val;
            });
        }

        if (accountPhoneField) {
            accountPhoneField.addEventListener('input', () => {
                const digitsCount = accountPhoneField.value.replace(
                    /\D/g,
                    ''
                ).length;
                if (digitsCount >= 12) {
                    accountPhoneField.classList.remove('error');
                }
            });
        }
    };

    const copiedNumber = () => {
        const copyButton = document.querySelectorAll('.js-copy');
        if (!copyButton.length) return;

        copyButton.forEach((block) => {
            block.addEventListener('click', () => {
                const number = block
                    .querySelector('.js-number')
                    .textContent.trim();

                navigator.clipboard
                    .writeText(number)
                    .then(() => {
                        block.classList.add('copied');
                        setTimeout(
                            () => block.classList.remove('copied'),
                            1500
                        );
                    })
                    .catch((err) => {
                        console.error('Error', err);
                    });
            });
        });
    };

    editPersonalInfo();
    copiedNumber();
};

export default cabinetFlow;
