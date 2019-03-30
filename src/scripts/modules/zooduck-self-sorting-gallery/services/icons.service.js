const icons = (function() {

    const _materialIcons__baselineCamera24px = () => {

        const svg = document.createElement('svg');
 
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');

        const path = `<path fill="#ffffff" d="M9.4 10.5l4.77-8.26C13.47 2.09 12.75 2 12 2c-2.4 0-4.6.85-6.32 2.25l3.66 6.35.06-.1zM21.54 9c-.92-2.92-3.15-5.26-6-6.34L11.88 9h9.66zm.26 1h-7.49l.29.5 4.76 8.25C21 16.97 22 14.61 22 12c0-.69-.07-1.35-.2-2zM8.54 12l-3.9-6.75C3.01 7.03 2 9.39 2 12c0 .69.07 1.35.2 2h7.49l-1.15-2zm-6.08 3c.92 2.92 3.15 5.26 6 6.34L12.12 15H2.46zm11.27 0l-3.9 6.76c.7.15 1.42.24 2.17.24 2.4 0 4.6-.85 6.32-2.25l-3.66-6.35-.93 1.6z"/>`;
     
        svg.innerHTML = path;
   
        const base64SVG = window.btoa(svg.outerHTML);
 
        return `data:image/svg+xml;base64,${base64SVG}`;
    };

    const _materialIcons__baselineClose24px = () => {

        const svg = document.createElement('svg');
 
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
        svg.setAttribute('width', '24');
        svg.setAttribute('height', '24');
        svg.setAttribute('viewBox', '0 0 24 24');

        const path = `<path fill="#ffffff" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>`;
        
        svg.innerHTML = path;
   
        const base64SVG = window.btoa(svg.outerHTML);
 
        return `data:image/svg+xml;base64,${base64SVG}`;
    };

    return {
        get camera() {
            return _materialIcons__baselineCamera24px();
        },
        get close() {
            return _materialIcons__baselineClose24px();
        }
    }

})();

export default icons;
