const activityCollection = (selector, activity) => {
    const el = document.querySelectorAll(selector);
    if (!el.length) return;

    el[0].classList.add(activity);

    el.forEach((item) => {
        item.addEventListener('click', () => {
            const isActive = item.classList.contains(activity);

            el.forEach((elItem) => {
                elItem.classList.remove(activity);
            });

            if (!isActive) {
                item.classList.add(activity);
            }
        });
    });
};

export default activityCollection;
