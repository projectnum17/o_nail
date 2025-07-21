const toggleClass = (trigger, activeClass) => {
    const elements = document.querySelectorAll(trigger);

    if (!elements.length) return;

    elements.forEach((item) => {
        item.addEventListener('click', (e) => {
            e.stopPropagation();
            item.classList.toggle(activeClass);
        });
    });

    document.addEventListener('click', (e) => {
        elements.forEach((item) => {
            if (!item.contains(e.target)) {
                item.classList.remove(activeClass);
            }
        });
    });
};

export default toggleClass;
