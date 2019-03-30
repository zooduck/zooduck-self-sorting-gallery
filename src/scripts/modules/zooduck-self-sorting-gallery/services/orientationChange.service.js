const orientationChange = () => {
    let _lastFiredDate;
    return {
        get lastFiredDate() {
            return _lastFiredDate;
        },
        set lastFiredDate(date) {
            _lastFiredDate = date;
        }
    }
}

export default orientationChange;
