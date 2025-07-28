const headerFlow = () => {
    const parent = document.querySelector('.header .container');
    const headerLogo = document.querySelector('.header__logo');
    const logoTarget = document.querySelector('.header__block:last-child');
    const menuItem = document.querySelector('.js-menu');
    const mobileSubmenu = document.querySelector('.js-mobile-submenu');

    if (!parent || !headerLogo || !logoTarget || !menuItem) return;

    const originalParent = headerLogo.parentElement;
    const logoNextSibling = headerLogo.nextElementSibling;

    let burgerBtn = null;

    const toggleBodyScroll = (shouldLock) => {
        document.body.classList.toggle('is-locked', shouldLock);
    };

    const moveLogo = (toOriginal) => {
        if (!headerLogo || !originalParent || !logoTarget) return;

        if (toOriginal) {
            if (logoNextSibling && originalParent.contains(logoNextSibling)) {
                originalParent.insertBefore(headerLogo, logoNextSibling);
            } else {
                originalParent.appendChild(headerLogo);
            }
        } else {
            logoTarget.prepend(headerLogo);
        }
    };

    const createBurger = (menu) => {
        const btn = document.createElement('button');
        btn.classList.add('header__burger');
        btn.innerHTML = `<span></span>`;

        btn.addEventListener('click', () => {
            if (!menu) return;
            const isOpen = menu.classList.toggle('show');
            btn.classList.toggle('is-active', isOpen);
            toggleBodyScroll(isOpen);
        });

        return btn;
    };

    const resizeWindow = () => {
        const clientWidth = window.innerWidth;

        if (clientWidth < 1200) {
            if (!burgerBtn) {
                burgerBtn = createBurger(menuItem);
                parent.prepend(burgerBtn);
            }
            moveLogo(false);
        } else {
            if (burgerBtn && parent.contains(burgerBtn)) {
                parent.removeChild(burgerBtn);
                burgerBtn = null;
            }

            moveLogo(true);

            menuItem.classList.remove('show');
            if (burgerBtn) burgerBtn.classList.remove('is-active');
            toggleBodyScroll(false);
        }
    };

    if (mobileSubmenu) {
        mobileSubmenu.addEventListener('click', () => {
            mobileSubmenu.classList.toggle('show');
        });
    }

    resizeWindow();
    window.addEventListener('resize', resizeWindow);
};

export default headerFlow;
