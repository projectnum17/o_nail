const asideMenu = () => {
    const scrollCurrentMenuItemIntoCenter = () => {
        // Только на экранах меньше 992px
        if (window.innerWidth >= 992) return;

        const menuList = document.querySelector('.aside-menu__list');
        const currentLink = document.querySelector(
            '.aside-menu__link--current'
        );

        if (!menuList || !currentLink) return;

        const listRect = menuList.getBoundingClientRect();

        const offsetLeft = currentLink.offsetLeft;

        const listWidth = listRect.width;
        const linkWidth = currentLink.offsetWidth;

        const scrollTo = offsetLeft - listWidth / 2 + linkWidth / 2.4;

        menuList.scrollTo({
            left: scrollTo,
            behavior: 'smooth',
        });
    };

    window.addEventListener('load', scrollCurrentMenuItemIntoCenter);
    window.addEventListener('resize', scrollCurrentMenuItemIntoCenter);
};

export default asideMenu;
