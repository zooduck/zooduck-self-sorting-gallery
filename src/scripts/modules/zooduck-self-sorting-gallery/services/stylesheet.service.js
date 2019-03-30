const stylesheet = (function(){
    const styleEl = document.createElement('style');
    return {
        create() {
            document.head.appendChild(styleEl);
            styleEl.appendChild(document.createTextNode(''));
        },
        get sheet() {
            return styleEl.sheet;
        }
    }
})();

export default stylesheet;
