const random = {
    value: (max = 100000000, min = 0) => Math.round(Math.random() * (max - min)) + min
};

export default random;