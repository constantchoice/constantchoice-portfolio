class LineManager {
    constructor() {
        // Инициализация параметров из CONFIG
        this.LINE_THICKNESS = CONFIG.LINE_THICKNESS;
        this.BASE_OFFSET = CONFIG.BASE_OFFSET;
        this.LINE_SPACING = CONFIG.LINE_SPACING;
        this.CORNER_RADIUS = CONFIG.CORNER_RADIUS;

        this.WIDTH_LENGTH_1 = CONFIG.WIDTH_LENGTH_1;
        this.HEIGHT_LENGTH_1 = CONFIG.HEIGHT_LENGTH_1;
        this.WIDTH_LENGTH_2 = CONFIG.WIDTH_LENGTH_2;
        this.HEIGHT_LENGTH_2 = CONFIG.HEIGHT_LENGTH_2;
        this.WIDTH_LENGTH_3 = CONFIG.WIDTH_LENGTH_3;
        this.HEIGHT_LENGTH_3 = CONFIG.HEIGHT_LENGTH_3;

        this.containers = {
            tl: document.querySelector('.corner-tl'),
            tr: document.querySelector('.corner-tr'),
            br: document.querySelector('.corner-br'),
            bl: document.querySelector('.corner-bl')
        };

        this.linesState = JSON.parse(JSON.stringify(CONFIG.INITIAL_STATE));
        this.isAnimating = false;
        this.zones = [];
        this.showAllZones = true;

        this.init();
        window.addEventListener('resize', () => {
            this.init();
            this.updateWhiteFrame(); // добавляем обновление рамки
        });
        this.setupControls();
    }

    

    setupControls() {
        const updateValue = (id, value) => {
            document.getElementById(id).textContent = value;
        };

        document.getElementById('thickness').addEventListener('input', (e) => {
            this.LINE_THICKNESS = parseFloat(e.target.value);
            updateValue('thicknessValue', this.LINE_THICKNESS);
        });

        document.getElementById('offset').addEventListener('input', (e) => {
            this.BASE_OFFSET = parseFloat(e.target.value);
            updateValue('offsetValue', this.BASE_OFFSET);
        });

        document.getElementById('spacing').addEventListener('input', (e) => {
            this.LINE_SPACING = parseFloat(e.target.value);
            updateValue('spacingValue', this.LINE_SPACING);
        });

        document.getElementById('radius').addEventListener('input', (e) => {
            this.CORNER_RADIUS = parseFloat(e.target.value);
            updateValue('radiusValue', this.CORNER_RADIUS);
        });

        document.getElementById('widthLength1').addEventListener('input', (e) => {
            this.WIDTH_LENGTH_1 = parseFloat(e.target.value);
            updateValue('widthLength1Value', this.WIDTH_LENGTH_1);
        });

        document.getElementById('heightLength1').addEventListener('input', (e) => {
            this.HEIGHT_LENGTH_1 = parseFloat(e.target.value);
            updateValue('heightLength1Value', this.HEIGHT_LENGTH_1);
        });

        document.getElementById('widthLength2').addEventListener('input', (e) => {
            this.WIDTH_LENGTH_2 = parseFloat(e.target.value);
            updateValue('widthLength2Value', this.WIDTH_LENGTH_2);
        });

        document.getElementById('heightLength2').addEventListener('input', (e) => {
            this.HEIGHT_LENGTH_2 = parseFloat(e.target.value);
            updateValue('heightLength2Value', this.HEIGHT_LENGTH_2);
        });

        document.getElementById('showAllZones').addEventListener('click', (e) => {
            this.showAllZones = true;
            e.target.classList.add('active');
            document.getElementById('showHighestOnly').classList.remove('active');
            this.updateZonesVisibility();
        });

        document.getElementById('showHighestOnly').addEventListener('click', (e) => {
            this.showAllZones = false;
            e.target.classList.add('active');
            document.getElementById('showAllZones').classList.remove('active');
            this.updateZonesVisibility();
        });

        document.getElementById('updateBtn').addEventListener('click', () => {
            this.init();
        });
    }


    // Определение текущей страницы по состоянию линий
    getCurrentPageFromState() {
        const tlCount = this.linesState.tl.length;
        const brCount = this.linesState.br.length;
        
        if (tlCount === 1 && brCount === 2) return 1;
        if (tlCount === 2 && brCount === 1) return 2;
        if (tlCount === 3 && brCount === 0) return 3;
        if (tlCount === 0 && brCount === 3) return 4;
        
        return 1;
    }

    // Переключение на страницу
    switchToPage(pageNum) {
        document.querySelectorAll('.page').forEach(page => {
            page.classList.remove('active');
        });
        
        const targetPage = document.getElementById(`page${pageNum}`);
        if (targetPage) {
            targetPage.classList.add('active');
        }
    }

    createWhiteFrame() {
    let frame = document.getElementById('whiteFrame');
    if (!frame) {
        frame = document.createElement('div');
        frame.id = 'whiteFrame';
        frame.className = 'white-frame';
        document.body.appendChild(frame);
    }
    return frame;
}

    // Рамка строится как замкнутый контур из 4 скругленных углов
    // Используем максимальный уровень (3) для всех углов
updateWhiteFrame() {
    const frame = this.createWhiteFrame();
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Отступ для 3-го уровня
    const offset = this.BASE_OFFSET + 2 * this.LINE_SPACING;
    const offsetX = this.pxToPercentX(offset, w);
    const offsetY = this.pxToPercentY(offset, h);
    
    const length = this.WIDTH_LENGTH_3;
    const heightLength = this.HEIGHT_LENGTH_3;
    const radiusX = this.pxToPercentX(this.CORNER_RADIUS, w);
    const radiusY = this.pxToPercentY(this.CORNER_RADIUS, h);
    
    // Внешний контур (весь экран) - движемся ПО ЧАСОВОЙ СТРЕЛКЕ
    const outerRect = "M 0,0 L 100,0 L 100,100 L 0,100 Z";
    
    // Внутренний контур (вырез) - движемся ПРОТИВ ЧАСОВОЙ СТРЕЛКИ
    // Левый верхний угол
    const tlCorner = `
        M ${offsetX + length},${offsetY}
        L ${offsetX + radiusX},${offsetY}
        C ${offsetX},${offsetY} ${offsetX},${offsetY + radiusY} ${offsetX},${offsetY + radiusY}
    `;
    
    // Левая сторона вниз
    const leftEdge = `L ${offsetX},${100 - offsetY - heightLength}`;
    
    // Левый нижний угол
    const blCorner = `
        L ${offsetX},${100 - offsetY - radiusY}
        C ${offsetX},${100 - offsetY} ${offsetX + radiusX},${100 - offsetY} ${offsetX + radiusX},${100 - offsetY}
    `;
    
    // Нижняя сторона вправо
    const bottomEdge = `L ${100 - offsetX - length},${100 - offsetY}`;
    
    // Правый нижний угол
    const brCorner = `
        L ${100 - offsetX - radiusX},${100 - offsetY}
        C ${100 - offsetX},${100 - offsetY} ${100 - offsetX},${100 - offsetY - radiusY} ${100 - offsetX},${100 - offsetY - radiusY}
    `;
    
    // Правая сторона вверх
    const rightEdge = `L ${100 - offsetX},${offsetY + heightLength}`;
    
    // Правый верхний угол
    const trCorner = `
        L ${100 - offsetX},${offsetY + radiusY}
        C ${100 - offsetX},${offsetY} ${100 - offsetX - radiusX},${offsetY} ${100 - offsetX - radiusX},${offsetY}
    `;
    
    // Верхняя сторона влево к началу
    const topEdge = `L ${offsetX + length},${offsetY}`;
    
    // Собираем внутренний контур (против часовой стрелки)
    const innerPath = `
        ${tlCorner}
        ${leftEdge}
        ${blCorner}
        ${bottomEdge}
        ${brCorner}
        ${rightEdge}
        ${trCorner}
        ${topEdge}
        Z
    `;
    
    const pathData = outerRect + " " + innerPath;
    
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '100%');
    svg.setAttribute('height', '100%');
    svg.setAttribute('viewBox', '0 0 100 100');
    svg.setAttribute('preserveAspectRatio', 'none');
    
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathData);
    path.setAttribute('fill', 'white');
    path.setAttribute('fill-rule', 'evenodd'); // Оставляем, но теперь направления правильные
    path.setAttribute('stroke', 'none');
    
    svg.appendChild(path);
    frame.innerHTML = '';
    frame.appendChild(svg);
}

    // Создание белой подложки
    createWhiteMask() {
        let mask = document.getElementById('white-mask');
        if (!mask) {
            mask = document.createElement('div');
            mask.id = 'white-mask';
            mask.className = 'white-mask';
            document.body.appendChild(mask);
        }
        mask.classList.remove('hidden'); // Показываем маску
        mask.innerHTML = ''; // Очищаем
        return mask;
    }

    // Получение точек для подложки на основе точек линии
getMaskPointsFromLinePoints(linePoints, fromCorner, startOffset, endOffset, progress) {
    const w = window.innerWidth;
    const h = window.innerHeight;
    
    // Базовые фиксированные углы
    const fixed = {
        tl: { x: 0, y: 0 },
        tr: { x: 100, y: 0 },
        br: { x: 100, y: 100 },
        bl: { x: 0, y: 100 }
    };
    
    // Текущий offset (интерполяция между startOffset и endOffset)
    const currentOffset = startOffset + (endOffset - startOffset) * progress;
    const currentOffsetX = this.pxToPercentX(currentOffset, w);
    const currentOffsetY = this.pxToPercentY(currentOffset, h);
    
    let maskPoints = {};
    
    if (fromCorner === 'br') {
        maskPoints = {
            p0: fixed.tl,
            p1: { x: 100, y: currentOffsetY },
            p2: linePoints.p0,
            p3: linePoints.p1,
            p4: linePoints.p4,
            p5: { x: currentOffsetX, y: 100 }
        };
    }
    else if (fromCorner === 'tl') {
        maskPoints = {
            p0: fixed.br,
            p1: { x: 100, y: currentOffsetY },
            p2: linePoints.p0,
            p3: linePoints.p1,
            p4: linePoints.p4,
            p5: { x: currentOffsetX, y: 100 }
        };
    }
    else if (fromCorner === 'tr') {
        maskPoints = {
            p0: fixed.bl,
            p1: { x: 0, y: currentOffsetY },
            p2: linePoints.p0,
            p3: linePoints.p1,
            p4: linePoints.p4,
            p5: { x: 100 - currentOffsetX, y: 100 }
        };
    }
    else if (fromCorner === 'bl') {
        maskPoints = {
            p0: fixed.tr,
            p1: { x: 0, y: currentOffsetY },
            p2: linePoints.p0,
            p3: linePoints.p1,
            p4: linePoints.p4,
            p5: { x: 100 - currentOffsetX, y: 100 }
        };
    }
    
    return maskPoints;
}

    // Создание SVG для подложки
    createMaskSVG(maskPoints) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('preserveAspectRatio', 'none');
        
        const pathData = `
            M ${maskPoints.p0.x},${maskPoints.p0.y}
            L ${maskPoints.p1.x},${maskPoints.p1.y}
            L ${maskPoints.p2.x},${maskPoints.p2.y}
            C ${maskPoints.p2.x},${maskPoints.p2.y} ${maskPoints.p3.x},${maskPoints.p3.y} ${maskPoints.p4.x},${maskPoints.p4.y}
            L ${maskPoints.p5.x},${maskPoints.p5.y}
            Z
        `;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', 'white'); // белый = видимая область
        
        svg.appendChild(path);
        return svg;
    }

    updateZonesVisibility() {
        this.zones.forEach(zone => {
            if (this.showAllZones) {
                zone.style.display = 'block';
            } else {
                const corner = zone.dataset.corner;
                const level = parseInt(zone.dataset.level);
                const maxLevel = this.getMaxLevelInCorner(corner);

                if (level === maxLevel) {
                    zone.style.display = 'block';
                } else {
                    zone.style.display = 'none';
                }
            }
        });
    }

    getMaxLevelInCorner(corner) {
        if (corner === 'br') return 2;
        if (corner === 'tl' || corner === 'tr') return 1;
        return 0;
    }

    init() {
        const w = window.innerWidth;
        const h = window.innerHeight;

        document.getElementById('resolutionInfo').innerHTML =
            `<strong>📱 Разрешение:</strong> ${w} x ${h}<br>` +
            `<strong>⚙️ Толщина:</strong> ${this.LINE_THICKNESS}px<br>` +
            `<strong>📍 Отступ Level 1:</strong> ${this.BASE_OFFSET}px<br>` +
            `<strong>🔲 Интервал:</strong> ${this.LINE_SPACING}px<br>` +
            `<strong>⚪ Радиус:</strong> ${this.CORNER_RADIUS}px<br>` +
            `<strong>📐 Level 1:</strong> ${this.WIDTH_LENGTH_1}% / ${this.HEIGHT_LENGTH_1}%<br>` +
            `<strong>📐 Level 2:</strong> ${this.WIDTH_LENGTH_2}% / ${this.HEIGHT_LENGTH_2}%`;

        Object.values(this.containers).forEach(c => c.innerHTML = '');
        this.zones = [];

        this.drawTopLeft(w, h);
        this.drawTopRight(w, h);
        this.drawBottomRight(w, h);

        // ВАЖНО: вызываем обновление белой рамки
        this.updateWhiteFrame();

        this.updateZonesVisibility();
    }

    createExactZone(container, corner, level, styles, isHorizontal) {
        const zone = document.createElement('div');
        zone.className = `activation-zone zone-level-${level}`;
        zone.dataset.corner = corner;
        zone.dataset.level = level;
        zone.dataset.type = isHorizontal ? 'horizontal' : 'vertical';
        zone.dataset.exact = 'true';
        
        Object.assign(zone.style, styles);
        
        let hoverTimer = null;
        
        // При наведении на точную зону - затемняем линию
        zone.addEventListener('mouseenter', () => {
            const lineData = this.linesState[corner]?.find(l => l.level === level);
            if (lineData) {
                const line = container.querySelector(`[data-line-id="${lineData.id}"]`);
                if (line) {
                    line.setAttribute('stroke', '#666');
                    line.setAttribute('stroke-width', this.LINE_THICKNESS + 1);
                }
            }
            
            // Запускаем анимацию с небольшой задержкой
            if (hoverTimer) clearTimeout(hoverTimer);
            hoverTimer = setTimeout(() => {
                if (this.isAnimating) return;
                
                console.log(`Запуск анимации по наведению: ${corner} level ${level}`);
                
                const lineDataForAnim = this.linesState[corner]?.find(l => l.level === level);
                if (lineDataForAnim) {
                    const line = container.querySelector(`[data-line-id="${lineDataForAnim.id}"]`);
                    if (line) {
                        this.animateLineTransition(line, corner, level);
                    }
                }
            }, 150); // Задержка 150мс
        });
        
        zone.addEventListener('mouseleave', () => {
            if (hoverTimer) {
                clearTimeout(hoverTimer);
                hoverTimer = null;
            }
            
            if (!this.isAnimating) {
                const lineData = this.linesState[corner]?.find(l => l.level === level);
                if (lineData) {
                    const line = container.querySelector(`[data-line-id="${lineData.id}"]`);
                    if (line) {
                        line.setAttribute('stroke', '#999');
                        line.setAttribute('stroke-width', this.LINE_THICKNESS);
                    }
                }
            }
        });
        
        container.appendChild(zone);
        this.zones.push(zone);
        return zone;
    }

animateLineTransition(line, fromCorner, level) {
    console.log(`Анимация: ${fromCorner} level ${level}`);
    this.isAnimating = true;

    // Определяем противоположный угол
    const oppositeCorners = {
        'tl': 'br',
        'tr': 'bl',
        'br': 'tl',
        'bl': 'tr'
    };
    const toCorner = oppositeCorners[fromCorner];

    const lineData = this.linesState[fromCorner].find(l => l.level === level);
    if (!lineData) {
        this.isAnimating = false;
        return;
    }

    // Сохраняем ID линии
    const lineId = lineData.id;

    // Получаем контейнеры
    const fromContainer = this.containers[fromCorner];
    const toContainer = this.containers[toCorner];

    // Сохраняем родительский SVG линии
    const svg = line.closest('svg');

    const w = window.innerWidth;
    const h = window.innerHeight;

    // Определяем текущую страницу ДО переключения
    const currentPage = this.getCurrentPageFromState();
    
    // Определяем целевую страницу
    let targetPage;
    const tlCount = this.linesState.tl.length;
    const brCount = this.linesState.br.length;
    
    if (fromCorner === 'tl') {
        if (tlCount - 1 === 1 && brCount + 1 === 2) targetPage = 1;
        else if (tlCount - 1 === 2 && brCount + 1 === 1) targetPage = 2;
        else if (tlCount - 1 === 3 && brCount + 1 === 0) targetPage = 3;
        else if (tlCount - 1 === 0 && brCount + 1 === 3) targetPage = 4;
    } else if (fromCorner === 'br') {
        if (tlCount + 1 === 1 && brCount - 1 === 2) targetPage = 1;
        else if (tlCount + 1 === 2 && brCount - 1 === 1) targetPage = 2;
        else if (tlCount + 1 === 3 && brCount - 1 === 0) targetPage = 3;
        else if (tlCount + 1 === 0 && brCount - 1 === 3) targetPage = 4;
    } else {
        targetPage = currentPage;
    }
    
    console.log(`Переход: ${currentPage} -> ${targetPage}`);

    // СОХРАНЯЕМ ЭЛЕМЕНТЫ СТРАНИЦ
    const currentPageElement = document.getElementById(`page${currentPage}`);
    const targetPageElement = document.getElementById(`page${targetPage}`);

    // Поднимаем текущую страницу выше целевой
    if (currentPageElement) {
        currentPageElement.style.zIndex = '3';
    }
    if (targetPageElement) {
        targetPageElement.style.zIndex = '2';
    }

    // ПОКАЗЫВАЕМ ЦЕЛЕВУЮ СТРАНИЦУ, НО НЕ ПРЯЧЕМ ТЕКУЩУЮ
    document.querySelectorAll('.page').forEach(page => {
        if (page.id !== `page${currentPage}`) {
            page.classList.remove('active');
        }
    });
    if (targetPageElement) {
        targetPageElement.classList.add('active');
    }

    // ===== СОЗДАЁМ МАСКУ КАК В ТЕСТЕ =====
    // Создаём SVG элемент для маски (размер 0)
    const maskSVG = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    maskSVG.setAttribute('width', '0');
    maskSVG.setAttribute('height', '0');
    maskSVG.style.position = 'absolute';

    // Создаём mask с правильными атрибутами
    const mask = document.createElementNS('http://www.w3.org/2000/svg', 'mask');
    mask.setAttribute('id', 'animation-mask');
    mask.setAttribute('maskContentUnits', 'objectBoundingBox');
    mask.setAttribute('x', '0');
    mask.setAttribute('y', '0');
    mask.setAttribute('width', '1');
    mask.setAttribute('height', '1');

    // Создаём path для маски
    const maskPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    maskPath.setAttribute('fill', 'white'); // Белый = видимая область
    maskPath.setAttribute('stroke', 'none');
    mask.appendChild(maskPath);
    maskSVG.appendChild(mask);

    // Добавляем маску на страницу
    document.body.appendChild(maskSVG);

    // Применяем маску к текущей странице
    if (currentPageElement) {
        currentPageElement.style.mask = 'url(#animation-mask)';
        currentPageElement.style.webkitMask = 'url(#animation-mask)';
    }
    // ===== КОНЕЦ СОЗДАНИЯ МАСКИ =====

    // Вычисляем новый уровень для целевого угла
    let newLevel;
    if (toCorner === 'br' || toCorner === 'tl') {
        const existingLevels = this.linesState[toCorner].map(l => l.level);
        newLevel = existingLevels.length === 0 ? 1 : Math.max(...existingLevels) + 1;
    } else {
        newLevel = 1;
    }

    // Функция для получения точек линии (возвращает в процентах 0-100)
    const getPointsWithOffset = (corner, level, offset) => {
        const offsetX = this.pxToPercentX(offset, w);
        const offsetY = this.pxToPercentY(offset, h);
        
        const length = level === 1 ? this.WIDTH_LENGTH_1 : this.WIDTH_LENGTH_2;
        const heightLength = level === 1 ? this.HEIGHT_LENGTH_1 : this.HEIGHT_LENGTH_2;
        const radiusX = this.pxToPercentX(this.CORNER_RADIUS, w);
        const radiusY = this.pxToPercentY(this.CORNER_RADIUS, h);

        if (corner === 'tl') {
            return {
                p0: { x: offsetX + length, y: offsetY },
                p1: { x: offsetX + radiusX, y: offsetY },
                p2: { x: offsetX, y: offsetY },
                p3: { x: offsetX, y: offsetY + radiusY },
                p4: { x: offsetX, y: offsetY + radiusY },
                p5: { x: offsetX, y: offsetY + heightLength }
            };
        } else if (corner === 'tr') {
            return {
                p0: { x: 100 - offsetX - length, y: offsetY },
                p1: { x: 100 - offsetX - radiusX, y: offsetY },
                p2: { x: 100 - offsetX, y: offsetY },
                p3: { x: 100 - offsetX, y: offsetY + radiusY },
                p4: { x: 100 - offsetX, y: offsetY + radiusY },
                p5: { x: 100 - offsetX, y: offsetY + heightLength }
            };
        } else if (corner === 'br') {
            return {
                p0: { x: 100 - offsetX, y: 100 - offsetY - heightLength },
                p1: { x: 100 - offsetX, y: 100 - offsetY - radiusY },
                p2: { x: 100 - offsetX, y: 100 - offsetY },
                p3: { x: 100 - offsetX - radiusX, y: 100 - offsetY },
                p4: { x: 100 - offsetX - radiusX, y: 100 - offsetY },
                p5: { x: 100 - offsetX - length, y: 100 - offsetY }
            };
        } else if (corner === 'bl') {
            return {
                p0: { x: offsetX, y: 100 - offsetY - heightLength },
                p1: { x: offsetX, y: 100 - offsetY - radiusY },
                p2: { x: offsetX, y: 100 - offsetY },
                p3: { x: offsetX + radiusX, y: 100 - offsetY },
                p4: { x: offsetX + radiusX, y: 100 - offsetY },
                p5: { x: offsetX + length, y: 100 - offsetY }
            };
        }
    };

    // Функция для конвертации процентов в relative (0-1)
    const toRelative = (points) => ({
        p0: { x: points.p0.x / 100, y: points.p0.y / 100 },
        p1: { x: points.p1.x / 100, y: points.p1.y / 100 },
        p2: { x: points.p2.x / 100, y: points.p2.y / 100 },
        p3: { x: points.p3.x / 100, y: points.p3.y / 100 },
        p4: { x: points.p4.x / 100, y: points.p4.y / 100 },
        p5: { x: points.p5.x / 100, y: points.p5.y / 100 }
    });

    // Начальные точки
    const startOffset = this.BASE_OFFSET + (level - 1) * this.LINE_SPACING;
    const startPoints = getPointsWithOffset(fromCorner, level, startOffset);

    // Конечные точки
    const endOffset = this.BASE_OFFSET + (newLevel - 1) * this.LINE_SPACING;
    const endPoints = getPointsWithOffset(toCorner, newLevel, endOffset);

    // Промежуточные точки
    const midOffset = (startOffset + endOffset) / 2;
    
    let midPoints;
    const isBRTL = (fromCorner === 'br' && toCorner === 'tl');
    const isTLBR = (fromCorner === 'tl' && toCorner === 'br');

    if (isBRTL) {
        const midOffsetX = this.pxToPercentX(midOffset, w);
        const midOffsetY = this.pxToPercentY(midOffset, h);
        midPoints = {
            p0: { x: 100 - midOffsetX, y: midOffsetY },
            p1: { x: 100 - midOffsetX, y: midOffsetY },
            p2: { x: 100 - midOffsetX, y: midOffsetY },
            p3: { x: midOffsetX, y: 100 - midOffsetY },
            p4: { x: midOffsetX, y: 100 - midOffsetY },
            p5: { x: midOffsetX, y: 100 - midOffsetY }
        };
    } else if (isTLBR) {
        const midOffsetX = this.pxToPercentX(midOffset, w);
        const midOffsetY = this.pxToPercentY(midOffset, h);
        midPoints = {
            p0: { x: 100 - midOffsetX, y: midOffsetY },
            p1: { x: 100 - midOffsetX, y: midOffsetY },
            p2: { x: 100 - midOffsetX, y: midOffsetY },
            p3: { x: midOffsetX, y: 100 - midOffsetY },
            p4: { x: midOffsetX, y: 100 - midOffsetY },
            p5: { x: midOffsetX, y: 100 - midOffsetY }
        };
    } else {
        midPoints = startPoints;
    }

    // Функция интерполяции
    const interpolatePoints = (start, end, t) => ({
        p0: { x: start.p0.x + (end.p0.x - start.p0.x) * t, y: start.p0.y + (end.p0.y - start.p0.y) * t },
        p1: { x: start.p1.x + (end.p1.x - start.p1.x) * t, y: start.p1.y + (end.p1.y - start.p1.y) * t },
        p2: { x: start.p2.x + (end.p2.x - start.p2.x) * t, y: start.p2.y + (end.p2.y - start.p2.y) * t },
        p3: { x: start.p3.x + (end.p3.x - start.p3.x) * t, y: start.p3.y + (end.p3.y - start.p3.y) * t },
        p4: { x: start.p4.x + (end.p4.x - start.p4.x) * t, y: start.p4.y + (end.p4.y - start.p4.y) * t },
        p5: { x: start.p5.x + (end.p5.x - start.p5.x) * t, y: start.p5.y + (end.p5.y - start.p5.y) * t }
    });

    const startTime = performance.now();
    const duration = 2000;
    const amplitude = 29.5;

    const animate = (currentTime) => {
        const elapsed = currentTime - startTime;
        let progress = Math.min(elapsed / duration, 1);
        
        let currentPoints;
        
        if (progress < 0.5) {
            const phaseProgress = progress * 2;
            currentPoints = interpolatePoints(startPoints, midPoints, phaseProgress);
            const offset = amplitude * Math.sin(phaseProgress * Math.PI);
            
            if (isBRTL) {
                currentPoints.p2.y += offset;
                currentPoints.p3.x += offset;
            } else if (isTLBR) {
                currentPoints.p2.x -= offset;
                currentPoints.p3.y -= offset;
            }
        } else {
            const phaseProgress = (progress - 0.5) * 2;
            currentPoints = interpolatePoints(midPoints, endPoints, phaseProgress);
            const offset = amplitude * Math.sin(phaseProgress * Math.PI);
            
            if (isBRTL) {
                currentPoints.p2.x -= offset;
                currentPoints.p3.y -= offset;
            } else if (isTLBR) {
                currentPoints.p2.y += offset;
                currentPoints.p3.x += offset;
            }
        }

        // Обновляем линию (в процентах)
        const newPath = `
            M ${currentPoints.p0.x},${currentPoints.p0.y}
            L ${currentPoints.p1.x},${currentPoints.p1.y}
            C ${currentPoints.p2.x},${currentPoints.p2.y} ${currentPoints.p3.x},${currentPoints.p3.y} ${currentPoints.p4.x},${currentPoints.p4.y}
            L ${currentPoints.p5.x},${currentPoints.p5.y}
        `;
        line.setAttribute('d', newPath);
        
        // Получаем точки для маски и конвертируем в relative
        const maskPoints = this.getMaskPointsFromLinePoints(
            currentPoints, 
            fromCorner, 
            startOffset, 
            endOffset, 
            progress 
        );
        
        const relativePoints = toRelative(maskPoints);
        
        const maskPathData = `
            M ${relativePoints.p0.x},${relativePoints.p0.y}
            L ${relativePoints.p1.x},${relativePoints.p1.y}
            L ${relativePoints.p2.x},${relativePoints.p2.y}
            C ${relativePoints.p2.x},${relativePoints.p2.y} ${relativePoints.p3.x},${relativePoints.p3.y} ${relativePoints.p4.x},${relativePoints.p4.y}
            L ${relativePoints.p5.x},${relativePoints.p5.y}
            Z
        `;
        maskPath.setAttribute('d', maskPathData);

        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
    // Перемещаем линию
    toContainer.appendChild(svg);

    // Обновляем состояние
    this.linesState[fromCorner] = this.linesState[fromCorner].filter(l => l.id !== lineId);
    this.linesState[toCorner].push({
        id: lineId,
        level: newLevel,
        corner: toCorner
    });

    if (currentPageElement) {
        currentPageElement.style.zIndex = '';
    }
    if (targetPageElement) {
        targetPageElement.style.zIndex = '';
    }

    // ===== ИСПРАВЛЕННАЯ КОНЦОВКА =====
    // 1. СНАЧАЛА убираем active (страница исчезает)
    if (currentPageElement) {
        currentPageElement.classList.remove('active');
    }
    
    // 2. ПОТОМ убираем маску (уже не важно, что там видно)
    if (currentPageElement) {
        currentPageElement.style.mask = '';
        currentPageElement.style.webkitMask = '';
    }
    
    // 3. Удаляем SVG маски
    maskSVG.remove();
    // ===== КОНЕЦ ИСПРАВЛЕНИЯ =====

    this.linesState[toCorner].sort((a, b) => a.level - b.level);
    this.redrawZonesOnly();
    this.isAnimating = false;
        }
    };

    requestAnimationFrame(animate);
}

    // Вспомогательная функция для создания пути из точек
    endPointsToPath(corner, points) {
        if (corner === 'tl' || corner === 'tr') {
            return `
                        M ${points.p1.x},${points.p1.y}
                        L ${points.p2.x},${points.p2.y}
                        Q ${points.p3.x},${points.p3.y} ${points.p3.x},${points.p3.y}
                        L ${points.p4.x},${points.p4.y}
                    `;
        } else {
            return `
                        M ${points.p1.x},${points.p1.y}
                        L ${points.p2.x},${points.p2.y}
                        Q ${points.p3.x},${points.p3.y} ${points.p3.x},${points.p3.y}
                        L ${points.p4.x},${points.p4.y}
                    `;
        }
    }

    // Вспомогательная функция для определения максимального уровня в углу
    getMaxLevelInCorner(corner) {
        const levels = this.linesState[corner].map(l => l.level);
        return levels.length > 0 ? Math.max(...levels) : 0;
    }

    // Функция для проверки, является ли линия最高шего уровня
    isHighestLevel(corner, level) {
        const maxLevel = this.getMaxLevelInCorner(corner);
        return level === maxLevel;
    }

    redrawZonesOnly() {
        // Очищаем только зоны (не трогаем линии!)
        this.zones.forEach(zone => zone.remove());
        this.zones = [];

        const w = window.innerWidth;
        const h = window.innerHeight;

        console.log('redrawZonesOnly, состояние:', JSON.parse(JSON.stringify(this.linesState)));

        // Для каждого угла создаём зоны на основе существующих линий
        Object.entries(this.linesState).forEach(([corner, lines]) => {
            lines.forEach(lineData => {
                const level = lineData.level;
                const container = this.containers[corner];
                const isHighest = this.isHighestLevel(corner, level);

                // Находим существующую линию
                const existingLine = container.querySelector(`[data-line-id="${lineData.id}"]`);
                if (!existingLine) {
                    console.warn(`Линия ${lineData.id} не найдена в контейнере ${corner}`);
                    return;
                }

                // Получаем параметры для этого угла и уровня
                const baseOffset = this.BASE_OFFSET + (level - 1) * this.LINE_SPACING;
                const offsetX = this.pxToPercentX(baseOffset, w);
                const offsetY = this.pxToPercentY(baseOffset, h);
                const widthLength = level === 1 ? this.WIDTH_LENGTH_1 : this.WIDTH_LENGTH_2;
                const heightLength = level === 1 ? this.HEIGHT_LENGTH_1 : this.HEIGHT_LENGTH_2;

                // Дополнительные проценты для зон
                const hoverExtra = 4; // +4% для зоны подсветки
                const clickExtra = 1;  // +1% для зоны активации

                // Создаём зоны в зависимости от угла
                if (corner === 'tl') {
                    // ЗОНЫ ПОДСВЕТКИ (для всех линий, с +4%)
                    const hoverHorizontalZone = {
                        top: '0',
                        left: Math.max(0, offsetX - hoverExtra) + '%',
                        width: Math.min(100 - (offsetX - hoverExtra), widthLength + 2 * hoverExtra) + '%',
                        height: (offsetY + hoverExtra) + '%'
                    };
                    const hoverVerticalZone = {
                        top: Math.max(0, offsetY - hoverExtra) + '%',
                        left: '0',
                        width: (offsetX + hoverExtra) + '%',
                        height: Math.min(100 - (offsetY - hoverExtra), heightLength + 2 * hoverExtra) + '%'
                    };

                    this.createActivationZone(container, corner, level, hoverHorizontalZone, true, this);
                    this.createActivationZone(container, corner, level, hoverVerticalZone, false, this);

                    // ЗОНЫ АКТИВАЦИИ (только для линий уровня, с +1%)
                    if (isHighest) {
                        const clickHorizontalZone = {
                            top: '0',
                            left: Math.max(0, offsetX - clickExtra) + '%',
                            width: Math.min(100 - (offsetX - clickExtra), widthLength + 2 * clickExtra) + '%',
                            height: (offsetY + clickExtra) + '%'
                        };
                        const clickVerticalZone = {
                            top: Math.max(0, offsetY - clickExtra) + '%',
                            left: '0',
                            width: (offsetX + clickExtra) + '%',
                            height: Math.min(100 - (offsetY - clickExtra), heightLength + 2 * clickExtra) + '%'
                        };

                        this.createExactZone(container, corner, level, clickHorizontalZone, true, this);
                        this.createExactZone(container, corner, level, clickVerticalZone, false, this);
                    }

                } else if (corner === 'tr') {
                    // ЗОНЫ ПОДСВЕТКИ
                    const hoverHorizontalZone = {
                        top: '0',
                        right: Math.max(0, offsetX - hoverExtra) + '%',
                        width: Math.min(100 - (offsetX - hoverExtra), widthLength + 2 * hoverExtra) + '%',
                        height: (offsetY + hoverExtra) + '%'
                    };
                    const hoverVerticalZone = {
                        top: Math.max(0, offsetY - hoverExtra) + '%',
                        right: '0',
                        width: (offsetX + hoverExtra) + '%',
                        height: Math.min(100 - (offsetY - hoverExtra), heightLength + 2 * hoverExtra) + '%'
                    };

                    this.createActivationZone(container, corner, level, hoverHorizontalZone, true, this);
                    this.createActivationZone(container, corner, level, hoverVerticalZone, false, this);

                    // ЗОНЫ АКТИВАЦИИ (только для уровня)
                    if (isHighest) {
                        const clickHorizontalZone = {
                            top: '0',
                            right: Math.max(0, offsetX - clickExtra) + '%',
                            width: Math.min(100 - (offsetX - clickExtra), widthLength + 2 * clickExtra) + '%',
                            height: (offsetY + clickExtra) + '%'
                        };
                        const clickVerticalZone = {
                            top: Math.max(0, offsetY - clickExtra) + '%',
                            right: '0',
                            width: (offsetX + clickExtra) + '%',
                            height: Math.min(100 - (offsetY - clickExtra), heightLength + 2 * clickExtra) + '%'
                        };

                        this.createExactZone(container, corner, level, clickHorizontalZone, true, this);
                        this.createExactZone(container, corner, level, clickVerticalZone, false, this);
                    }

                } else if (corner === 'br') {
                    // ЗОНЫ ПОДСВЕТКИ
                    const hoverHorizontalZone = {
                        bottom: '0',
                        right: Math.max(0, offsetX - hoverExtra) + '%',
                        width: Math.min(100 - (offsetX - hoverExtra), widthLength + 2 * hoverExtra) + '%',
                        height: (offsetY + hoverExtra) + '%'
                    };
                    const hoverVerticalZone = {
                        bottom: Math.max(0, offsetY - hoverExtra) + '%',
                        right: '0',
                        width: (offsetX + hoverExtra) + '%',
                        height: Math.min(100 - (offsetY - hoverExtra), heightLength + 2 * hoverExtra) + '%'
                    };

                    this.createActivationZone(container, corner, level, hoverHorizontalZone, true, this);
                    this.createActivationZone(container, corner, level, hoverVerticalZone, false, this);

                    // ЗОНЫ АКТИВАЦИИ (только для уровня)
                    if (isHighest) {
                        const clickHorizontalZone = {
                            bottom: '0',
                            right: Math.max(0, offsetX - clickExtra) + '%',
                            width: Math.min(100 - (offsetX - clickExtra), widthLength + 2 * clickExtra) + '%',
                            height: (offsetY + clickExtra) + '%'
                        };
                        const clickVerticalZone = {
                            bottom: Math.max(0, offsetY - clickExtra) + '%',
                            right: '0',
                            width: (offsetX + clickExtra) + '%',
                            height: Math.min(100 - (offsetY - clickExtra), heightLength + 2 * clickExtra) + '%'
                        };

                        this.createExactZone(container, corner, level, clickHorizontalZone, true, this);
                        this.createExactZone(container, corner, level, clickVerticalZone, false, this);
                    }

                } else if (corner === 'bl') {
                    // ЗОНЫ ПОДСВЕТКИ
                    const hoverHorizontalZone = {
                        bottom: '0',
                        left: Math.max(0, offsetX - hoverExtra) + '%',
                        width: Math.min(100 - (offsetX - hoverExtra), widthLength + 2 * hoverExtra) + '%',
                        height: (offsetY + hoverExtra) + '%'
                    };
                    const hoverVerticalZone = {
                        bottom: Math.max(0, offsetY - hoverExtra) + '%',
                        left: '0',
                        width: (offsetX + hoverExtra) + '%',
                        height: Math.min(100 - (offsetY - hoverExtra), heightLength + 2 * hoverExtra) + '%'
                    };

                    this.createActivationZone(container, corner, level, hoverHorizontalZone, true, this);
                    this.createActivationZone(container, corner, level, hoverVerticalZone, false, this);

                    // ЗОНЫ АКТИВАЦИИ (только для уровня)
                    if (isHighest) {
                        const clickHorizontalZone = {
                            bottom: '0',
                            left: Math.max(0, offsetX - clickExtra) + '%',
                            width: Math.min(100 - (offsetX - clickExtra), widthLength + 2 * clickExtra) + '%',
                            height: (offsetY + clickExtra) + '%'
                        };
                        const clickVerticalZone = {
                            bottom: Math.max(0, offsetY - clickExtra) + '%',
                            left: '0',
                            width: (offsetX + clickExtra) + '%',
                            height: Math.min(100 - (offsetY - clickExtra), heightLength + 2 * clickExtra) + '%'
                        };

                        this.createExactZone(container, corner, level, clickHorizontalZone, true, this);
                        this.createExactZone(container, corner, level, clickVerticalZone, false, this);
                    }
                }
            });
        });

        this.updateZonesVisibility();
        console.log('Зоны перерисованы');
    }

    easeInOutCubic(x) {
        return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
    }

    lerp(start, end, t) {
        return start + (end - start) * t;
    }

    getLinePoints(corner, level, w, h, customOffset = null) {
        const widthLength = level === 1 ? this.WIDTH_LENGTH_1 : this.WIDTH_LENGTH_2;
        const heightLength = level === 1 ? this.HEIGHT_LENGTH_1 : this.HEIGHT_LENGTH_2;
        
        let offsetX, offsetY;

        if (customOffset !== null) {
            offsetX = this.pxToPercentX(customOffset, w);
            offsetY = this.pxToPercentY(customOffset, h);
        } else {
            const baseOffset = this.BASE_OFFSET + (level - 1) * this.LINE_SPACING;
            offsetX = this.pxToPercentX(baseOffset, w);
            offsetY = this.pxToPercentY(baseOffset, h);
        }

        // Радиус скругления в процентах
        const radiusX = this.pxToPercentX(this.CORNER_RADIUS, w);
        const radiusY = this.pxToPercentY(this.CORNER_RADIUS, h);

        let points = {};

        if (corner === 'tl') {
            points = {
                p0: { x: offsetX + widthLength, y: offsetY },           // M - начало
                p1: { x: offsetX + radiusX, y: offsetY },               // L1 - конец первой прямой
                p2: { x: offsetX, y: offsetY },                         // C1 - угол (первая контрольная)
                p3: { x: offsetX, y: offsetY + radiusY },               // C2 - точка после угла (вторая контрольная)
                p4: { x: offsetX, y: offsetY + radiusY },               // L2 - конец скругления (бывший Q end)
                p5: { x: offsetX, y: offsetY + heightLength }           // L3 - конечная прямая
            };
        } else if (corner === 'tr') {
            points = {
                p0: { x: 100 - offsetX - widthLength, y: offsetY },
                p1: { x: 100 - offsetX - radiusX, y: offsetY },
                p2: { x: 100 - offsetX, y: offsetY },
                p3: { x: 100 - offsetX, y: offsetY + radiusY },
                p4: { x: 100 - offsetX, y: offsetY + radiusY },
                p5: { x: 100 - offsetX, y: offsetY + heightLength }
            };
        } else if (corner === 'br') {
            points = {
                p0: { x: 100 - offsetX, y: 100 - offsetY - heightLength },
                p1: { x: 100 - offsetX, y: 100 - offsetY - radiusY },
                p2: { x: 100 - offsetX, y: 100 - offsetY },
                p3: { x: 100 - offsetX - radiusX, y: 100 - offsetY },
                p4: { x: 100 - offsetX - radiusX, y: 100 - offsetY },
                p5: { x: 100 - offsetX - widthLength, y: 100 - offsetY }
            };
        } else if (corner === 'bl') {
            points = {
                p0: { x: offsetX, y: 100 - offsetY - heightLength },
                p1: { x: offsetX, y: 100 - offsetY - radiusY },
                p2: { x: offsetX, y: 100 - offsetY },
                p3: { x: offsetX + radiusX, y: 100 - offsetY },
                p4: { x: offsetX + radiusX, y: 100 - offsetY },
                p5: { x: offsetX + widthLength, y: 100 - offsetY }
            };
        }

        return points;
    }

    createPathFromPoints(points, corner) {
        // M - начало
        // L - прямая к началу скругления
        // C - кубическая кривая (скругление)
        // L - прямая после скругления (бывший Q end)
        // L - конечная прямая
        return `
            M ${points.p0.x},${points.p0.y}
            L ${points.p1.x},${points.p1.y}
            C ${points.p2.x},${points.p2.y} ${points.p3.x},${points.p3.y} ${points.p4.x},${points.p4.y}
            L ${points.p5.x},${points.p5.y}
        `;
    }

    interpolatePoints(start, end, t) {
        return {
            p0: { x: start.p0.x + (end.p0.x - start.p0.x) * t, y: start.p0.y + (end.p0.y - start.p0.y) * t },
            p1: { x: start.p1.x + (end.p1.x - start.p1.x) * t, y: start.p1.y + (end.p1.y - start.p1.y) * t },
            p2: { x: start.p2.x + (end.p2.x - start.p2.x) * t, y: start.p2.y + (end.p2.y - start.p2.y) * t },
            p3: { x: start.p3.x + (end.p3.x - start.p3.x) * t, y: start.p3.y + (end.p3.y - start.p3.y) * t },
            p4: { x: start.p4.x + (end.p4.x - start.p4.x) * t, y: start.p4.y + (end.p4.y - start.p4.y) * t },
            p5: { x: start.p5.x + (end.p5.x - start.p5.x) * t, y: start.p5.y + (end.p5.y - start.p5.y) * t }
        };
    }

    interpolatePoint(p1, p2, t) {
        return {
            x: p1.x + (p2.x - p1.x) * t,
            y: p1.y + (p2.y - p1.y) * t
        };
    }

    redrawAllLines() {
        // Очищаем контейнеры
        Object.values(this.containers).forEach(c => c.innerHTML = '');
        this.zones = [];

        const w = window.innerWidth;
        const h = window.innerHeight;

        // Рисуем линии из состояния
        Object.entries(this.linesState).forEach(([corner, lines]) => {
            lines.forEach(lineData => {
                this.drawLine(corner, lineData.level, w, h);
            });
        });

        // Рисуем зоны
        this.drawTopLeft(w, h);
        this.drawTopRight(w, h);
        this.drawBottomRight(w, h);
        this.drawBottomLeft(w, h);

        this.updateZonesVisibility();
    }

    drawLine(corner, level, w, h) {
        const container = this.containers[corner];
        if (!container) return;

        // Находим ID линии из состояния
        const lineData = this.linesState[corner].find(l => l.level === level);
        if (!lineData) return;

        const points = this.getLinePoints(corner, level, w, h);
        const pathData = this.createPathFromPoints(points, corner);

        this.createSVG(container, pathData, level, lineData.id);
    }

    pxToPercentX(px, width) {
        return (px / width) * 100;
    }

    pxToPercentY(px, height) {
        return (px / height) * 100;
    }

    createSVG(container, pathData, level, lineId) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'corner-svg');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('preserveAspectRatio', 'none');

        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('class', `corner-path level-${level}`);
        path.setAttribute('stroke-width', this.LINE_THICKNESS);
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', '#999');
        path.setAttribute('data-line-id', lineId); // Добавляем data атрибут

        svg.appendChild(path);
        container.appendChild(svg);
    }

    getMaxLevelInCorner(corner) {
    const levels = this.linesState[corner]?.map(l => l.level) || [];
    return levels.length > 0 ? Math.max(...levels) : 0;
}

    createActivationZone(container, corner, level, styles, isHorizontal) {
        const zone = document.createElement('div');
        zone.className = `activation-zone zone-level-${level}`;
        zone.dataset.corner = corner;
        zone.dataset.level = level;
        zone.dataset.type = isHorizontal ? 'horizontal' : 'vertical';

        Object.assign(zone.style, styles);

        // При движении мыши внутри зоны
        zone.addEventListener('mousemove', (e) => {
            // Получаем размеры зоны
            const rect = zone.getBoundingClientRect();

            let distance = 0;
            let maxDistance = 0;

            if (isHorizontal) {
                // Для горизонтальной зоны - расстояние до середины по высоте
                const centerY = rect.top + rect.height / 2;
                distance = Math.abs(e.clientY - centerY);
                maxDistance = rect.height / 2;
            } else {
                // Для вертикальной зоны - расстояние до середины по ширине
                const centerX = rect.left + rect.width / 2;
                distance = Math.abs(e.clientX - centerX);
                maxDistance = rect.width / 2;
            }

            // Нормализуем расстояние (0 = у края, 1 = в центре)
            const proximity = 1 - (distance / maxDistance);

            // Находим линии этого уровня
            const lines = container.querySelectorAll(`.corner-path.level-${level}`);

            // Рассчитываем цвет: от #999 (далеко) до #333 (близко)
            const grayValue = Math.floor(150 + (proximity * 70)); // 150-220
            const color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;

            // Рассчитываем толщину: от 3px до 5px
            const thickness = this.LINE_THICKNESS + (proximity * 2);

            lines.forEach(line => {
                line.setAttribute('stroke', color);
                line.setAttribute('stroke-width', thickness);
            });
        });

        // При уходе с зоны - возвращаем исходный цвет
        zone.addEventListener('mouseleave', () => {
            const lines = container.querySelectorAll(`.corner-path.level-${level}`);
            lines.forEach(line => {
                line.setAttribute('stroke', '#999');
                line.setAttribute('stroke-width', this.LINE_THICKNESS);
            });
        });

        container.appendChild(zone);
        this.zones.push(zone);
        return zone;
    }

    drawTopLeft(w, h) {
        const container = this.containers.tl;
        
        // Определяем максимальный уровень в этом углу
        const maxLevel = this.getMaxLevelInCorner('tl');
        
        // Находим ID линии из состояния
        const lineData = this.linesState.tl.find(l => l.level === maxLevel);
        if (!lineData) return;
        
        const level = lineData.level;
        
        // Правильный отступ для уровня
        const offsetX = this.pxToPercentX(this.BASE_OFFSET + (level - 1) * this.LINE_SPACING, w);
        const offsetY = this.pxToPercentY(this.BASE_OFFSET + (level - 1) * this.LINE_SPACING, h);
        const length = level === 1 ? this.WIDTH_LENGTH_1 : this.WIDTH_LENGTH_2;
        const heightLength = level === 1 ? this.HEIGHT_LENGTH_1 : this.HEIGHT_LENGTH_2;
        const radiusX = this.pxToPercentX(this.CORNER_RADIUS, w);
        const radiusY = this.pxToPercentY(this.CORNER_RADIUS, h);
        
        const pathData = `
            M ${offsetX + length},${offsetY}
            L ${offsetX + radiusX},${offsetY}
            Q ${offsetX},${offsetY} ${offsetX},${offsetY + radiusY}
            L ${offsetX},${offsetY + heightLength}
        `;
        
        this.createSVG(container, pathData, level, lineData.id);
        
        // ЗОНЫ ПОДСВЕТКИ (толстые) - для плавного затемнения при приближении
        const hoverExtra = 4; // +4% для зоны подсветки
        
        const hoverHorizontalZone = {
            top: '0',
            left: '0',
            width: (offsetX + length + hoverExtra) + '%', // От левого края до линии +4%
            height: (offsetY + hoverExtra) + '%' // От верхнего края до линии +4%
        };
        
        const hoverVerticalZone = {
            top: '0',
            left: '0',
            width: (offsetX + hoverExtra) + '%', // От левого края до отступа +4%
            height: (offsetY + heightLength + hoverExtra) + '%' // От верхнего края до линии +4%
        };
        
        this.createActivationZone(container, 'tl', level, hoverHorizontalZone, true, this);
        this.createActivationZone(container, 'tl', level, hoverVerticalZone, false, this);
        
        // ТОЧНЫЕ ЗОНЫ (для активации) - от края до линии +1%
        const clickExtra = 1;
        
        const clickHorizontalZone = {
            top: '0',
            left: '0',
            width: (offsetX + length + clickExtra) + '%', // От левого края до линии +1%
            height: (offsetY + clickExtra) + '%' // От верхнего края до линии +1%
        };
        
        const clickVerticalZone = {
            top: '0',
            left: '0',
            width: (offsetX + clickExtra) + '%', // От левого края до отступа +1%
            height: (offsetY + heightLength + clickExtra) + '%' // От верхнего края до линии +1%
        };
        
        this.createExactZone(container, 'tl', level, clickHorizontalZone, true, this);
        this.createExactZone(container, 'tl', level, clickVerticalZone, false, this);
    }

    drawTopRight(w, h) {
        const container = this.containers.tr;

        const lineData = this.linesState.tr.find(l => l.level === 1);
        if (!lineData) return;

        // Линия
        const offset = this.pxToPercentX(this.BASE_OFFSET, w);
        const offsetX = this.pxToPercentX(this.BASE_OFFSET, w);
        const offsetY = this.pxToPercentY(this.BASE_OFFSET, h);
        const radiusX = this.pxToPercentX(this.CORNER_RADIUS, w);
        const radiusY = this.pxToPercentY(this.CORNER_RADIUS, h);

        const startX = 100 - offsetX - this.WIDTH_LENGTH_1;
        const startY = offsetY;

        const cornerX = 100 - offsetX;
        const cornerY = offsetY;

        const pathData = `
            M ${startX},${startY}
            L ${cornerX - radiusX},${cornerY}
            Q ${cornerX},${cornerY} ${cornerX},${cornerY + radiusY}
            L ${cornerX},${cornerY + this.HEIGHT_LENGTH_1}
        `;

        this.createSVG(container, pathData, 1, lineData.id);

        // ЗОНЫ ПОДСВЕТКИ (толстые) - для плавного затемнения при приближении
        const horizontalZone = {
            top: '0',
            right: offset + '%',
            width: this.WIDTH_LENGTH_1 + '%',
            height: (4 * offset) + '%'
        };
        const verticalZone = {
            top: offset + '%',
            right: '0',
            width: (4 * offset) + '%',
            height: this.HEIGHT_LENGTH_1 + '%'
        };

        this.createActivationZone(container, 'tr', 1, horizontalZone, true, this);
        this.createActivationZone(container, 'tr', 1, verticalZone, false, this);

        // ТОЧНЫЕ ЗОНЫ (для активации) - от края до линии +1%
        const clickExtra = 1;
        
        // Горизонтальная зона активации - от верхнего края до линии
        const exactHorizontalZone = {
            top: '0',
            right: '0',
            width: (offsetX + this.WIDTH_LENGTH_1 + clickExtra) + '%', // От правого края влево до линии +1%
            height: (offsetY + clickExtra) + '%' // От верхнего края вниз до линии +1%
        };

        // Вертикальная зона активации - от правого края до линии
        const exactVerticalZone = {
            top: '0',
            right: '0',
            width: (offsetX + clickExtra) + '%', // От правого края влево до линии +1%
            height: (offsetY + this.HEIGHT_LENGTH_1 + clickExtra) + '%' // От верхнего края вниз до линии +1%
        };

        this.createExactZone(container, 'tr', 1, exactHorizontalZone, true, this);
        this.createExactZone(container, 'tr', 1, exactVerticalZone, false, this);
    }

    drawBottomRight(w, h) {
        const container = this.containers.br;
        
        const baseOffsetX = this.pxToPercentX(this.BASE_OFFSET, w);
        const baseOffsetY = this.pxToPercentY(this.BASE_OFFSET, h);
        const spacingX = this.pxToPercentX(this.LINE_SPACING, w);
        const spacingY = this.pxToPercentY(this.LINE_SPACING, h);
        const radiusX = this.pxToPercentX(this.CORNER_RADIUS, w);
        const radiusY = this.pxToPercentY(this.CORNER_RADIUS, h);
        
        // Определяем максимальный уровень в этом углу
        const maxLevel = this.getMaxLevelInCorner('br');
        
        // Level 1 линия
        const lineData1 = this.linesState.br.find(l => l.level === 1);
        if (lineData1) {
            const startX1 = 100 - baseOffsetX;
            const startY1 = 100 - baseOffsetY - this.HEIGHT_LENGTH_1;
            
            const cornerX1 = 100 - baseOffsetX;
            const cornerY1 = 100 - baseOffsetY;
            
            const pathData1 = `
                M ${startX1},${startY1}
                L ${cornerX1},${cornerY1 - radiusY}
                Q ${cornerX1},${cornerY1} ${cornerX1 - radiusX},${cornerY1}
                L ${cornerX1 - this.WIDTH_LENGTH_1},${cornerY1}
            `;
            
            this.createSVG(container, pathData1, 1, lineData1.id);
        }
        
        // Level 2 линия
        const lineData2 = this.linesState.br.find(l => l.level === 2);
        if (lineData2) {
            const startX2 = 100 - baseOffsetX - spacingX;
            const startY2 = 100 - baseOffsetY - spacingY - this.HEIGHT_LENGTH_2;
            
            const cornerX2 = 100 - baseOffsetX - spacingX;
            const cornerY2 = 100 - baseOffsetY - spacingY;
            
            const pathData2 = `
                M ${startX2},${startY2}
                L ${cornerX2},${cornerY2 - radiusY}
                Q ${cornerX2},${cornerY2} ${cornerX2 - radiusX},${cornerY2}
                L ${cornerX2 - this.WIDTH_LENGTH_2},${cornerY2}
            `;
            
            this.createSVG(container, pathData2, 2, lineData2.id);
        }
        
        // ЗОНЫ ПОДСВЕТКИ (толстые) - для всех уровней
        if (lineData1) {
            const horizontalZone1 = {
                bottom: '0',
                right: baseOffsetX + '%',
                width: this.WIDTH_LENGTH_1 + '%',
                height: (4 * baseOffsetY) + '%'
            };
            const verticalZone1 = {
                bottom: baseOffsetY + '%',
                right: '0',
                width: (4 * baseOffsetX) + '%',
                height: this.HEIGHT_LENGTH_1 + '%'
            };
            
            this.createActivationZone(container, 'br', 1, horizontalZone1, true, this);
            this.createActivationZone(container, 'br', 1, verticalZone1, false, this);
        }
        
        if (lineData2) {
            const horizontalZone2 = {
                bottom: '0',
                right: (baseOffsetX + spacingX) + '%',
                width: this.WIDTH_LENGTH_2 + '%',
                height: (4 * (baseOffsetY + spacingY)) + '%'
            };
            const verticalZone2 = {
                bottom: (baseOffsetY + spacingY) + '%',
                right: '0',
                width: (4 * (baseOffsetX + spacingX)) + '%',
                height: this.HEIGHT_LENGTH_2 + '%'
            };
            
            this.createActivationZone(container, 'br', 2, horizontalZone2, true, this);
            this.createActivationZone(container, 'br', 2, verticalZone2, false, this);
        }
        
        // ТОЧНЫЕ ЗОНЫ (для клика) - ТОЛЬКО для максимального уровня
        if (lineData2 && maxLevel === 2) {
            // Горизонтальная зона (вдоль нижнего края) - от правого края влево до линии, от нижнего края вверх до линии
            const clickHorizontalZone2 = {
                bottom: '0',
                right: '0',
                width: (baseOffsetX + spacingX + this.WIDTH_LENGTH_2 + 1) + '%', // От правого края влево до линии +1%
                height: (baseOffsetY + spacingY + 1) + '%' // От нижнего края вверх до линии +1%
            };
            
            // Вертикальная зона (вдоль правого края) - от нижнего края вверх до линии, от правого края влево до линии
            const clickVerticalZone2 = {
                bottom: '0',
                right: '0',
                width: (baseOffsetX + spacingX + 1) + '%', // От правого края влево до линии +1%
                height: (baseOffsetY + spacingY + this.HEIGHT_LENGTH_2 + 1) + '%' // От нижнего края вверх до линии +1%
            };
            
            this.createExactZone(container, 'br', 2, clickHorizontalZone2, true, this);
            this.createExactZone(container, 'br', 2, clickVerticalZone2, false, this);
        }
    }

    drawBottomLeft(w, h) {
        const container = this.containers.bl;

        const lines = this.linesState.bl;
        if (!lines || lines.length === 0) return;

        lines.forEach(lineData => {
            const level = lineData.level;

            // Правильный отступ для уровня
            const baseOffset = this.BASE_OFFSET + (level - 1) * this.LINE_SPACING;
            const offsetX = this.pxToPercentX(baseOffset, w);
            const offsetY = this.pxToPercentY(baseOffset, h);

            const radiusX = this.pxToPercentX(this.CORNER_RADIUS, w);
            const radiusY = this.pxToPercentY(this.CORNER_RADIUS, h);
            const widthLength = level === 1 ? this.WIDTH_LENGTH_1 : this.WIDTH_LENGTH_2;
            const heightLength = level === 1 ? this.HEIGHT_LENGTH_1 : this.HEIGHT_LENGTH_2;

            // Рисуем линию для нижнего левого угла
            const pathData = `
                        M ${offsetX},${100 - offsetY - heightLength}
                        L ${offsetX},${100 - offsetY - radiusY}
                        Q ${offsetX},${100 - offsetY} ${offsetX + radiusX},${100 - offsetY}
                        L ${offsetX + widthLength},${100 - offsetY}
                    `;

            this.createSVG(container, pathData, level, lineData.id);

            // Толстые зоны для приближения
            const horizontalZone = {
                bottom: '0',
                left: '0',
                width: '100%',
                height: (offsetY + heightLength) + '%'
            };

            const verticalZone = {
                bottom: '0',
                left: '0',
                width: (offsetX + widthLength) + '%',
                height: '100%'
            };

            this.createActivationZone(container, 'bl', level, horizontalZone, true, this);
            this.createActivationZone(container, 'bl', level, verticalZone, false, this);

            // Точные зоны для клика
            const exactHorizontalZone = {
                bottom: offsetY + '%',
                left: offsetX + '%',
                width: widthLength + '%',
                height: (this.LINE_THICKNESS * 3) + 'px'
            };

            const exactVerticalZone = {
                bottom: offsetY + '%',
                left: offsetX + '%',
                width: (this.LINE_THICKNESS * 3) + 'px',
                height: heightLength + '%'
            };

            this.createExactZone(container, 'bl', level, exactHorizontalZone, true, this);
            this.createExactZone(container, 'bl', level, exactVerticalZone, false, this);
        });
    }
}