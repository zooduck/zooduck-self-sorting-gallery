const getRandomRGBA = (alpha = .65) => {
    return `rgba(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)}, ${alpha})`;
};

export default getRandomRGBA;
