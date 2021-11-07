const Haversine = (latitude1: number, longitude1: number, latitude2: number, longitude2: number): number => {
    const p = 0.017453292519943295;
    const c = Math.cos;
    const a =
        0.5 -
        c((latitude2 - latitude1) * p) / 2 +
        (c(latitude1 * p) * c(latitude2 * p) * (1 - c((longitude2 - longitude1) * p))) / 2;

    return 12742 * Math.asin(Math.sqrt(a));
};

export { Haversine };
