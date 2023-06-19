export default (numberStr) => {
    if (numberStr) {
        return numberStr.replace(/[-]/g, '');
    }
    return '';
};
//# sourceMappingURL=numberParser.js.map