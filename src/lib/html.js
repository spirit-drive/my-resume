const html = {
    getPosition: elem => {
        if (!('offsetLeft' in elem) || !('offsetTop' in elem)) throw new Error(`Елемент "${elem.tagName} не содержит offsetLeft или offsetTop`);
        let parent = elem.parentElement && getComputedStyle(elem.parentElement).position !== 'static' ? this.getPosition(elem.parentElement) : {x: 0, y: 0};
        return {
            x: elem.offsetLeft + parent.x,
            y: elem.offsetTop + parent.y,
        };
    }
};

export default html;