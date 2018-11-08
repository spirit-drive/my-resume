const math = {
    toRad: angle => angle * Math.PI / 180,
    getHypotenuse: (a, b) => Math.sqrt(a ** 2 + b ** 2)
};

export default math;