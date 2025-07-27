const orderFlow = () => {
    const lightweightDropdown = (selectElement) => {
        if (!selectElement || !(selectElement instanceof HTMLSelectElement))
            return;

        const numberOfOptions = selectElement.options.length;
        if (numberOfOptions === 0) return;

        selectElement.classList.add('select-hidden');

        const wrapper = document.createElement('div');
        wrapper.className = 'select-wrap';

        if (!selectElement.parentNode) return;
        selectElement.parentNode.insertBefore(wrapper, selectElement);
        wrapper.appendChild(selectElement);

        const styledSelect = document.createElement('div');
        styledSelect.className = 'select-styled placeholder';
        styledSelect.textContent = selectElement.options[0].text || '';
        wrapper.appendChild(styledSelect);

        const list = document.createElement('ul');
        list.className = 'select-options hidden';
        wrapper.appendChild(list);

        for (let i = 0; i < numberOfOptions; i++) {
            const option = selectElement.options[i];
            const li = document.createElement('li');
            li.textContent = option.text || '';
            li.setAttribute('rel', option.value);
            if (option.selected) {
                li.classList.add('is-selected');
            }
            list.appendChild(li);
        }

        styledSelect.addEventListener('click', (e) => {
            e.stopPropagation();
            document.querySelectorAll('.select-styled.active').forEach((el) => {
                if (el !== styledSelect) {
                    el.classList.remove('active');
                    const nextUl = el.nextElementSibling;
                    if (nextUl && nextUl.classList.contains('select-options')) {
                        nextUl.classList.remove('show');
                        nextUl.classList.add('hidden');
                    }
                }
            });
            styledSelect.classList.toggle('active');
            if (styledSelect.classList.contains('active')) {
                list.classList.add('show');
                list.classList.remove('hidden');
            } else {
                list.classList.remove('show');
                list.classList.add('hidden');
            }
        });

        list.querySelectorAll('li').forEach((li) => {
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                const selectedValue = li.getAttribute('rel');
                if (selectedValue === null || selectedValue === '') return;

                styledSelect.textContent = li.textContent;
                styledSelect.classList.remove('active');
                list.classList.remove('show');
                list.classList.add('hidden');

                selectElement.value = selectedValue;
                list.classList.remove('show');
                list.classList.add('hidden');

                list.querySelectorAll('.is-selected').forEach((el) =>
                    el.classList.remove('is-selected')
                );
                li.classList.add('is-selected');

                selectElement.dispatchEvent(new Event('change'));
            });
        });

        document.addEventListener('click', () => {
            styledSelect.classList.remove('active');
            list.classList.remove('show');
            list.classList.add('hidden');
        });

        selectElement.addEventListener('change', () => {
            const selectedOption =
                selectElement.options[selectElement.selectedIndex];
            const selectedValue = selectElement.value;

            if (selectedValue === '') {
                styledSelect.classList.add('placeholder');
            } else {
                styledSelect.classList.remove('placeholder');
            }

            styledSelect.textContent = selectedOption
                ? selectedOption.text
                : '';

            list.querySelectorAll('.is-selected').forEach((el) =>
                el.classList.remove('is-selected')
            );

            const selectedLi = list.querySelector(`li[rel="${selectedValue}"]`);
            if (selectedLi) selectedLi.classList.add('is-selected');
        });
    };

    const selectedItem = document.querySelectorAll('.js-select');
    if (!selectedItem.length) return;

    selectedItem.forEach((select) => lightweightDropdown(select));

    const deliveryRadios = document.querySelectorAll(
        'input[name="deliveryMethod"]'
    );
    deliveryRadios.forEach((radio) => {
        radio.addEventListener('change', () => {
            document
                .querySelectorAll('.delivery-box__wrapper')
                .forEach((wrapper) => {
                    const input = wrapper.querySelector(
                        'input[name="deliveryMethod"]'
                    );
                    if (!input || input.checked) return;

                    const selects =
                        wrapper.querySelectorAll('select.js-select');
                    selects.forEach((select) => {
                        select.selectedIndex = 0;

                        const wrapperDiv = select.closest('.select-wrap');
                        if (!wrapperDiv) return;

                        const styled =
                            wrapperDiv.querySelector('.select-styled');
                        const list =
                            wrapperDiv.querySelector('.select-options');
                        if (styled) {
                            styled.textContent = select.options[0]?.text || '';
                            styled.classList.add('placeholder');
                        }

                        if (list) {
                            list.querySelectorAll('li').forEach((li) =>
                                li.classList.remove('is-selected')
                            );
                            const firstLi = list.querySelector(
                                `li[rel="${select.options[0]?.value}"]`
                            );
                            if (firstLi) firstLi.classList.add('is-selected');
                        }

                        select.dispatchEvent(new Event('change'));
                    });
                });
        });
    });

    const numberCardField = document.querySelector('#numberCard');
    if (!numberCardField) return;

    numberCardField.addEventListener('input', (e) => {
        let value = e.target.value;
        value = value.replace(/\D/g, '');
        value = value.slice(0, 16);
        const formattedValue = value.match(/.{1,4}/g)?.join(' ') || '';
        e.target.value = formattedValue;
    });
};

export default orderFlow;
