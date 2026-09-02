const formatPrice = (price) => {
    if (!price || price <= 0) {
        return "Miễn phí";
    }

    if (price >= 1000) {
        const value = price / 1000;

        return `${Number.isInteger(value) ? value : value.toFixed(1)} tr`;
    }

    return `${price} k`;
};

export default formatPrice;