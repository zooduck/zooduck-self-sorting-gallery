const validate = (function() {

    const validateNumber = (q) => {
        return (typeof q === 'number' && !isNaN(q));
    };

    const validateBoolean = (q) => {
        return typeof q === 'boolean';
    };

    return {
        isNumber(q) {
            return validateNumber(q);
        },
        isBoolean(q) {
            return validateBoolean(q);
        }
    }

})();

export default validate;
