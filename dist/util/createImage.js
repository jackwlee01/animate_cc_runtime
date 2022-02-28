export const createImage = (src) => new Promise(resolve => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve(img);
    img.onerror = () => { throw ("Image did not load: " + img.src); };
});
