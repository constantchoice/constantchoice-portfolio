// Утилиты для работы с процентами и математикой
function pxToPercentX(px, width) {
    return (px / width) * 100;
}

function pxToPercentY(px, height) {
    return (px / height) * 100;
}

function easeInOutCubic(x) {
    return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
}

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function interpolatePoint(p1, p2, t) {
    return {
        x: p1.x + (p2.x - p1.x) * t,
        y: p1.y + (p2.y - p1.y) * t
    };
}

function getMaxLevelInCorner(linesState, corner) {
    const levels = linesState[corner]?.map(l => l.level) || [];
    return levels.length > 0 ? Math.max(...levels) : 0;
}

function updateValue(elementId, value) {
    document.getElementById(elementId).textContent = value;
}