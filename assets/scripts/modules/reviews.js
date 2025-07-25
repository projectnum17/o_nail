const reviews = () => {
    const tabsParent = document.querySelector('.js-tab-parent');
    const tabsChildren = document.querySelectorAll('.js-tab-children');
    const tabsContent = document.querySelectorAll('.js-tab-content');

    if (!tabsParent || tabsChildren.length === 0 || tabsContent.length === 0)
        return;

    const hideActivity = () => {
        tabsContent.forEach((item) => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });

        tabsChildren.forEach((item) => {
            item.classList.remove('active');
        });
    };

    const addActivity = (i = 0) => {
        if (tabsChildren[i] && tabsContent[i]) {
            tabsChildren[i].classList.add('active');
            tabsContent[i].classList.remove('hide');
            tabsContent[i].classList.add('show', 'fade');
        }
    };

    hideActivity();
    addActivity();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if (target && target.classList.contains('js-tab-children')) {
            tabsChildren.forEach((item, i) => {
                if (target === item) {
                    hideActivity();
                    addActivity(i);
                }
            });
        }
    });

    const initShowMoreReviews = () => {
        const tabContents = document.querySelectorAll('.js-tab-content');

        if (tabContents.length === 0) return;

        tabContents.forEach((tabContent) => {
            const wrappers = tabContent.querySelectorAll('.box-wrapper');
            const moreBtn = tabContent.querySelector('.js-more');

            if (wrappers.length > 2) {
                wrappers.forEach((wrapper, index) => {
                    if (index > 1) wrapper.style.display = 'none';
                });

                if (moreBtn) {
                    moreBtn.addEventListener('click', () => {
                        wrappers.forEach((wrapper) => {
                            wrapper.style.display = '';
                        });
                        moreBtn.style.display = 'none';
                    });
                }
            } else {
                if (moreBtn) {
                    moreBtn.style.display = 'none';
                }
            }
        });
    };

    initShowMoreReviews();
};

export default reviews;
