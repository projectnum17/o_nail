const basketFlow = () => {
    const totalProductsValue = document.querySelector('.js-bag-total');

    const basketContainer = document.querySelector('.basket-modal'),
        basketProductsWrapper = basketContainer?.querySelector(
            '.basket-modal__products'
        ),
        basketPurchase = basketContainer?.querySelector('.js-purchase'),
        totalProductsBin = basketContainer?.querySelector('#totalProduct'),
        totalSumEl = basketContainer?.querySelector('#totalSum'),
        emptyBasket = basketContainer?.querySelector('.basket-empty');

    if (
        !totalProductsValue ||
        !basketContainer ||
        !basketProductsWrapper ||
        !basketPurchase ||
        !totalProductsBin ||
        !totalSumEl
    )
        return;

    const showCorrectWord = (count) => {
        const mod10 = count % 10;
        const mod100 = count % 100;
        let key = 'many';

        if (mod10 === 1 && mod100 !== 11) key = 'one';
        else if ([2, 3, 4].includes(mod10) && ![12, 13, 14].includes(mod100))
            key = 'few';

        const wordElements = basketContainer.querySelectorAll('.total-word');

        wordElements.forEach((el) => {
            el.style.display = el.dataset.count === key ? 'inline' : 'none';
        });
    };

    const updateTotals = () => {
        const products = basketProductsWrapper.querySelectorAll('.js-product');

        let totalCount = 0;
        let totalSum = 0;

        products.forEach((product) => {
            const countEl = product.querySelector('.js-product-val');
            const count = parseInt(countEl?.textContent, 10) || 0;

            const price =
                parseFloat(
                    product.querySelector('.product__price')?.dataset?.price
                ) || 0;

            totalCount += count;
            totalSum += price * count;
        });

        const userLocale = navigator.language || 'uk-UA';

        totalProductsValue.textContent = totalCount;
        totalProductsBin.textContent = totalCount;
        totalSumEl.textContent = totalSum.toLocaleString(userLocale);

        if (totalCount > 0) {
            basketPurchase.classList.remove('disable');
            totalProductsValue.classList.add('show');
            emptyBasket.classList.remove('show');
        } else {
            basketPurchase.classList.add('disable');
            totalProductsValue.classList.remove('show');
            emptyBasket.classList.add('show');
        }

        showCorrectWord(totalCount);
    };

    basketProductsWrapper.addEventListener('click', (e) => {
        const target = e.target;
        const incBtn = target.closest('.js-product-inc');
        const decBtn = target.closest('.js-product-dec');
        const binBtn = target.closest('.js-product-bin');

        if (!incBtn && !decBtn && !binBtn) return;

        const product = target.closest('.js-product');
        if (!product) return;

        const countEl = product.querySelector('.js-product-val');
        if (!countEl) return;

        let count = parseInt(countEl.textContent, 10) || 0;

        if (incBtn) {
            countEl.textContent = count + 1;
        }

        if (decBtn) {
            if (count > 1) {
                countEl.textContent = count - 1;
            } else {
                product.remove();
            }
        }

        if (binBtn) {
            product.remove();
        }

        updateTotals();
    });

    updateTotals();
};
export default basketFlow;
