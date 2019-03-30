import randomRGBA from './randomRGBA.service';

const placeholderSVG = (imageData = {}) => {

    let aspectRatio = 1;
    
    try {
        aspectRatio = imageData.width / imageData.height;
    } catch (e) {}

    const height = 20;
    const width = height * aspectRatio;
    
    const svg = document.createElement('svg');
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('width', `${width}`);
    svg.setAttribute('height', `${height}`);

    const rect = document.createElement('rect');
    rect.setAttribute('x', '0');
    rect.setAttribute('y', '0');
    rect.setAttribute('width', '100%');
    rect.setAttribute('height', '100%');
    rect.setAttribute('fill', randomRGBA());

    svg.appendChild(rect);

    const base64SVG = window.btoa(svg.outerHTML);
 
    return `data:image/svg+xml;base64,${base64SVG}`;
}

export default placeholderSVG;
