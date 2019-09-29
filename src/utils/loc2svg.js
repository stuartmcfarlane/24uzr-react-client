function loc2svg(loc) {
    return {
        x: loc.lon,
        y: -1 * loc.lat,
    }
}
function box2svg(box) {
    const topLeft = loc2svg({ lon: box.left, lat: box.top});
    const bottomRight = loc2svg({ lon: box.right, lat: box.bottom});
    return {
        top: topLeft.y,
        left: topLeft.x,
        bottom: bottomRight.y,
        right: bottomRight.x,
    }
}

export {
    loc2svg,
    box2svg,
};