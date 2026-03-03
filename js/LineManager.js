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
        window.addEventListener('resize', () => this.init());
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

        // При наведении на точную зону - затемняем линию
        zone.addEventListener('mouseenter', () => {
            // Находим линию по ID из состояния
            const lineData = this.linesState[corner]?.find(l => l.level === level);
            if (lineData) {
                const line = container.querySelector(`[data-line-id="${lineData.id}"]`);
                if (line) {
                    line.setAttribute('stroke', '#666');
                    line.setAttribute('stroke-width', this.LINE_THICKNESS + 1);
                }
            }
        });

        zone.addEventListener('mouseleave', () => {
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

        // При клике запускаем анимацию
        zone.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.isAnimating) return;

            console.log(`Запуск анимации: ${corner} level ${level}`);

            // Находим линию по ID из состояния
            const lineData = this.linesState[corner]?.find(l => l.level === level);
            if (lineData) {
                const line = container.querySelector(`[data-line-id="${lineData.id}"]`);
                if (line) {
                    this.animateLineTransition(line, corner, level);
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

        const offset = this.pxToPercentX(this.BASE_OFFSET, w);
        const offsetY = this.pxToPercentY(this.BASE_OFFSET, h);
        const length = level === 1 ? this.WIDTH_LENGTH_1 : this.WIDTH_LENGTH_2;
        const heightLength = level === 1 ? this.HEIGHT_LENGTH_1 : this.HEIGHT_LENGTH_2;
        const radius = this.pxToPercentX(this.CORNER_RADIUS, w);
        const radiusY = this.pxToPercentY(this.CORNER_RADIUS, h);

        let newLevel;

        if (toCorner === 'br' || toCorner === 'tl') {
            const existingLevels = this.linesState[toCorner].map(l => l.level);
            if (existingLevels.length === 0) {
                newLevel = 1;
            } else {
                newLevel = Math.max(...existingLevels) + 1;
            }
        } else {
            newLevel = 1;
        }

        // НАЧАЛЬНЫЕ ТОЧКИ с правильным отступом для текущего уровня
        let startPoints;
        const startOffset = this.BASE_OFFSET + (level - 1) * this.LINE_SPACING;
        const startOffsetX = this.pxToPercentX(startOffset, w);
        const startOffsetY = this.pxToPercentY(startOffset, h);

        if (fromCorner === 'tl') {
            startPoints = {
                p1: { x: startOffsetX + length, y: startOffsetY },
                p2: { x: startOffsetX + radius, y: startOffsetY },
                ctrl: { x: startOffsetX, y: startOffsetY },
                p3: { x: startOffsetX, y: startOffsetY + radiusY },
                p4: { x: startOffsetX, y: startOffsetY + heightLength }
            };
        } else if (fromCorner === 'tr') {
            startPoints = {
                p1: { x: 100 - startOffsetX - length, y: startOffsetY },
                p2: { x: 100 - startOffsetX - radius, y: startOffsetY },
                ctrl: { x: 100 - startOffsetX, y: startOffsetY },
                p3: { x: 100 - startOffsetX, y: startOffsetY + radiusY },
                p4: { x: 100 - startOffsetX, y: startOffsetY + heightLength }
            };
        } else if (fromCorner === 'br') {
            startPoints = {
                p1: { x: 100 - startOffsetX, y: 100 - startOffsetY - heightLength },
                p2: { x: 100 - startOffsetX, y: 100 - startOffsetY - radiusY },
                ctrl: { x: 100 - startOffsetX, y: 100 - startOffsetY },
                p3: { x: 100 - startOffsetX - radius, y: 100 - startOffsetY },
                p4: { x: 100 - startOffsetX - length, y: 100 - startOffsetY }
            };
        } else if (fromCorner === 'bl') {
            startPoints = {
                p1: { x: startOffsetX, y: 100 - startOffsetY - heightLength },
                p2: { x: startOffsetX, y: 100 - startOffsetY - radiusY },
                ctrl: { x: startOffsetX, y: 100 - startOffsetY },
                p3: { x: startOffsetX + radius, y: 100 - startOffsetY },
                p4: { x: startOffsetX + length, y: 100 - startOffsetY }
            };
        }

        // ТОЧКИ В СЕРЕДИНЕ с полусуммой отступов
        const midOffset = (startOffset + (this.BASE_OFFSET + (newLevel - 1) * this.LINE_SPACING)) / 2;
        const midOffsetX = this.pxToPercentX(midOffset, w);
        const midOffsetY = this.pxToPercentY(midOffset, h);

        let midPoints;

        // Проверяем, какие углы участвуют в анимации
        const isSpecialPair = (fromCorner === 'tr' && toCorner === 'bl') || 
                            (fromCorner === 'bl' && toCorner === 'tr');

        if (isSpecialPair) {
            // Для пары верхний правый <-> нижний левый - оставляем как есть (работает правильно)
            midPoints = {
                p1: { x: midOffsetX, y: midOffsetY },
                p2: { x: midOffsetX, y: midOffsetY },
                ctrl: { x: midOffsetX, y: midOffsetY },
                p3: { x: 100 - midOffsetX, y: 100 - midOffsetY },
                p4: { x: 100 - midOffsetX, y: 100 - midOffsetY }
            };
        } 
        else if (fromCorner === 'br' && toCorner === 'tl') {
            // НИЖНИЙ ПРАВЫЙ -> ВЕРХНИЙ ЛЕВЫЙ
            // Первая половина: увеличивается Y, уменьшается X
            // Вторая половина: уменьшается X, увеличивается Y
            midPoints = {
                p1: { x: 100 - midOffsetX, y: midOffsetY },      // X уменьшается к левому краю, Y к верху
                p2: { x: 100 - midOffsetX, y: midOffsetY },      // То же для p2
                ctrl: { x: 100 - midOffsetX, y: midOffsetY },    // Контрольная точка
                p3: { x: midOffsetX, y: 100 - midOffsetY },      // X к левому краю, Y к низу
                p4: { x: midOffsetX, y: 100 - midOffsetY }       // Конечная точка
            };
        } 
        else if (fromCorner === 'tl' && toCorner === 'br') {
            // ВЕРХНИЙ ЛЕВЫЙ -> НИЖНИЙ ПРАВЫЙ
            // Первая половина: увеличивается X, увеличивается Y
            // Вторая половина: уменьшается Y, увеличивается X
            midPoints = {
                p1: { x: 100 - midOffsetX, y: midOffsetY },      // X вправо, Y вниз
                p2: { x: 100 - midOffsetX, y: midOffsetY },      // То же для p2
                ctrl: { x: midOffsetX, y: 100 - midOffsetY },    // Контрольная точка
                p3: { x: midOffsetX, y: 100 - midOffsetY },      // X вправо, Y вверх
                p4: { x: midOffsetX, y: 100 - midOffsetY }       // Конечная точка
            };
        } 
        else {
            // Для всех остальных пар углов (на всякий случай)
            midPoints = {
                p1: { x: midOffsetX, y: midOffsetY },
                p2: { x: midOffsetX, y: midOffsetY },
                ctrl: { x: midOffsetX, y: midOffsetY },
                p3: { x: 100 - midOffsetX, y: 100 - midOffsetY },
                p4: { x: 100 - midOffsetX, y: 100 - midOffsetY }
            };
        }

        // КОНЕЧНЫЕ ТОЧКИ с правильным отступом для нового уровня
        let endPoints;
        const endOffset = this.BASE_OFFSET + (newLevel - 1) * this.LINE_SPACING;
        const endOffsetX = this.pxToPercentX(endOffset, w);
        const endOffsetY = this.pxToPercentY(endOffset, h);

        if (toCorner === 'tl') {
            endPoints = {
                p1: { x: endOffsetX + length, y: endOffsetY },
                p2: { x: endOffsetX + radius, y: endOffsetY },
                ctrl: { x: endOffsetX, y: endOffsetY },
                p3: { x: endOffsetX, y: endOffsetY + radiusY },
                p4: { x: endOffsetX, y: endOffsetY + heightLength }
            };
        } else if (toCorner === 'tr') {
            endPoints = {
                p1: { x: 100 - endOffsetX - length, y: endOffsetY },
                p2: { x: 100 - endOffsetX - radius, y: endOffsetY },
                ctrl: { x: 100 - endOffsetX, y: endOffsetY },
                p3: { x: 100 - endOffsetX, y: endOffsetY + radiusY },
                p4: { x: 100 - endOffsetX, y: endOffsetY + heightLength }
            };
        } else if (toCorner === 'br') {
            endPoints = {
                p1: { x: 100 - endOffsetX, y: 100 - endOffsetY - heightLength },
                p2: { x: 100 - endOffsetX, y: 100 - endOffsetY - radiusY },
                ctrl: { x: 100 - endOffsetX, y: 100 - endOffsetY },
                p3: { x: 100 - endOffsetX - radius, y: 100 - endOffsetY },
                p4: { x: 100 - endOffsetX - length, y: 100 - endOffsetY }
            };
        } else if (toCorner === 'bl') {
            endPoints = {
                p1: { x: endOffsetX, y: 100 - endOffsetY - heightLength },
                p2: { x: endOffsetX, y: 100 - endOffsetY - radiusY },
                ctrl: { x: endOffsetX, y: 100 - endOffsetY },
                p3: { x: endOffsetX + radius, y: 100 - endOffsetY },
                p4: { x: endOffsetX + length, y: 100 - endOffsetY }
            };
        }

        const startTime = performance.now();
        const duration = 2000;

        const animate = (currentTime) => {
            const elapsed = currentTime - startTime;
            let progress = Math.min(elapsed / duration, 1);
            
            let currentPoints;
            
            // Определяем тип пары углов для анимации
            const isSpecialPair = (fromCorner === 'tr' && toCorner === 'bl') || 
                                (fromCorner === 'bl' && toCorner === 'tr');
            const isBRTL = (fromCorner === 'br' && toCorner === 'tl');
            const isTLBR = (fromCorner === 'tl' && toCorner === 'br');
            
            if (progress < 0.5) {
                // ПЕРВАЯ ПОЛОВИНА
                const phaseProgress = progress * 2;
                const offset = 29.5 * Math.sin(phaseProgress * Math.PI);
                
                if (isSpecialPair) {
                    // Для пары верхний правый <-> нижний левый - стандартная интерполяция
                    const p1x = startPoints.p1.x + (midPoints.p1.x - startPoints.p1.x) * phaseProgress;
                    const p1y = startPoints.p1.y + (midPoints.p1.y - startPoints.p1.y) * phaseProgress;
                    
                    const p2x = startPoints.p2.x + (midPoints.p2.x - startPoints.p2.x) * phaseProgress;
                    const p2y = startPoints.p2.y + (midPoints.p2.y - startPoints.p2.y) * phaseProgress;
                    
                    const p3x = startPoints.p3.x + (midPoints.p3.x - startPoints.p3.x) * phaseProgress;
                    const p3y = startPoints.p3.y + (midPoints.p3.y - startPoints.p3.y) * phaseProgress;
                    
                    const p4x = startPoints.p4.x + (midPoints.p4.x - startPoints.p4.x) * phaseProgress;
                    const p4y = startPoints.p4.y + (midPoints.p4.y - startPoints.p4.y) * phaseProgress;
                    
                    const baseCtrlX = startPoints.ctrl.x + (midPoints.ctrl.x - startPoints.ctrl.x) * phaseProgress;
                    const baseCtrlY = startPoints.ctrl.y + (midPoints.ctrl.y - startPoints.ctrl.y) * phaseProgress;
                    
                    currentPoints = {
                        p1: { x: p1x, y: p1y },
                        p2: { x: p2x, y: p2y },
                        ctrl: {
                            x: baseCtrlX + (fromCorner === 'tl' || fromCorner === 'tr' ? offset : 0),
                            y: baseCtrlY + (fromCorner === 'br' || fromCorner === 'bl' ? offset : 0)
                        },
                        p3: { x: p3x, y: p3y },
                        p4: { x: p4x, y: p4y }
                    };
                } 
                else if (isBRTL) {
                    // НИЖНИЙ ПРАВЫЙ -> ВЕРХНИЙ ЛЕВЫЙ - первая половина
                    // Для br -> tl контрольная точка смещается влево (отрицательный X)
                    currentPoints = {
                        p1: {
                            x: startPoints.p1.x + (midPoints.p1.x - startPoints.p1.x) * phaseProgress,
                            y: startPoints.p1.y + (midPoints.p1.y - startPoints.p1.y) * phaseProgress
                        },
                        p2: {
                            x: startPoints.p2.x + (midPoints.p2.x - startPoints.p2.x) * phaseProgress,
                            y: startPoints.p2.y + (midPoints.p2.y - startPoints.p2.y) * phaseProgress
                        },
                        ctrl: {
                            x: startPoints.ctrl.x + (midPoints.ctrl.x - startPoints.ctrl.x) * phaseProgress,
                            y: startPoints.ctrl.y + (midPoints.ctrl.y - startPoints.ctrl.y) * phaseProgress + offset
                        },
                        p3: {
                            x: startPoints.p3.x + (midPoints.p3.x - startPoints.p3.x) * phaseProgress,
                            y: startPoints.p3.y + (midPoints.p3.y - startPoints.p3.y) * phaseProgress
                        },
                        p4: {
                            x: startPoints.p4.x + (midPoints.p4.x - startPoints.p4.x) * phaseProgress,
                            y: startPoints.p4.y + (midPoints.p4.y - startPoints.p4.y) * phaseProgress
                        }
                    };
                }
                else if (isTLBR) {
                    // ВЕРХНИЙ ЛЕВЫЙ -> НИЖНИЙ ПРАВЫЙ - первая половина
                    // Для tl -> br контрольная точка смещается вправо (положительный X)
                    currentPoints = {
                        p1: {
                            x: startPoints.p1.x + (midPoints.p1.x - startPoints.p1.x) * phaseProgress,
                            y: startPoints.p1.y + (midPoints.p1.y - startPoints.p1.y) * phaseProgress
                        },
                        p2: {
                            x: startPoints.p2.x + (midPoints.p2.x - startPoints.p2.x) * phaseProgress,
                            y: startPoints.p2.y + (midPoints.p2.y - startPoints.p2.y) * phaseProgress
                        },
                        ctrl: {
                            x: startPoints.ctrl.x + (midPoints.ctrl.x - startPoints.ctrl.x) * phaseProgress,
                            y: startPoints.ctrl.y + (midPoints.ctrl.y - startPoints.ctrl.y) * phaseProgress - offset
                        },
                        p3: {
                            x: startPoints.p3.x + (midPoints.p3.x - startPoints.p3.x) * phaseProgress,
                            y: startPoints.p3.y + (midPoints.p3.y - startPoints.p3.y) * phaseProgress
                        },
                        p4: {
                            x: startPoints.p4.x + (midPoints.p4.x - startPoints.p4.x) * phaseProgress,
                            y: startPoints.p4.y + (midPoints.p4.y - startPoints.p4.y) * phaseProgress
                        }
                    };
                }
                else {
                    // Стандартная интерполяция для остальных случаев
                    const p1x = startPoints.p1.x + (midPoints.p1.x - startPoints.p1.x) * phaseProgress;
                    const p1y = startPoints.p1.y + (midPoints.p1.y - startPoints.p1.y) * phaseProgress;
                    
                    const p2x = startPoints.p2.x + (midPoints.p2.x - startPoints.p2.x) * phaseProgress;
                    const p2y = startPoints.p2.y + (midPoints.p2.y - startPoints.p2.y) * phaseProgress;
                    
                    const p3x = startPoints.p3.x + (midPoints.p3.x - startPoints.p3.x) * phaseProgress;
                    const p3y = startPoints.p3.y + (midPoints.p3.y - startPoints.p3.y) * phaseProgress;
                    
                    const p4x = startPoints.p4.x + (midPoints.p4.x - startPoints.p4.x) * phaseProgress;
                    const p4y = startPoints.p4.y + (midPoints.p4.y - startPoints.p4.y) * phaseProgress;
                    
                    const baseCtrlX = startPoints.ctrl.x + (midPoints.ctrl.x - startPoints.ctrl.x) * phaseProgress;
                    const baseCtrlY = startPoints.ctrl.y + (midPoints.ctrl.y - startPoints.ctrl.y) * phaseProgress;
                    
                    currentPoints = {
                        p1: { x: p1x, y: p1y },
                        p2: { x: p2x, y: p2y },
                        ctrl: {
                            x: baseCtrlX + (fromCorner === 'tl' || fromCorner === 'tr' ? offset : 0),
                            y: baseCtrlY + (fromCorner === 'br' || fromCorner === 'bl' ? offset : 0)
                        },
                        p3: { x: p3x, y: p3y },
                        p4: { x: p4x, y: p4y }
                    };
                }
                
            } else {
                // ВТОРАЯ ПОЛОВИНА
                const phaseProgress = (progress - 0.5) * 2;
                const offset = 29.5 * Math.sin(phaseProgress * Math.PI);
                
                if (isSpecialPair) {
                    // Для пары верхний правый <-> нижний левый - стандартная интерполяция
                    const p1x = midPoints.p1.x + (endPoints.p1.x - midPoints.p1.x) * phaseProgress;
                    const p1y = midPoints.p1.y + (endPoints.p1.y - midPoints.p1.y) * phaseProgress;
                    
                    const p2x = midPoints.p2.x + (endPoints.p2.x - midPoints.p2.x) * phaseProgress;
                    const p2y = midPoints.p2.y + (endPoints.p2.y - midPoints.p2.y) * phaseProgress;
                    
                    const p3x = midPoints.p3.x + (endPoints.p3.x - midPoints.p3.x) * phaseProgress;
                    const p3y = midPoints.p3.y + (endPoints.p3.y - midPoints.p3.y) * phaseProgress;
                    
                    const p4x = midPoints.p4.x + (endPoints.p4.x - midPoints.p4.x) * phaseProgress;
                    const p4y = midPoints.p4.y + (endPoints.p4.y - midPoints.p4.y) * phaseProgress;
                    
                    const baseCtrlX = midPoints.ctrl.x + (endPoints.ctrl.x - midPoints.ctrl.x) * phaseProgress;
                    const baseCtrlY = midPoints.ctrl.y + (endPoints.ctrl.y - midPoints.ctrl.y) * phaseProgress;
                    
                    currentPoints = {
                        p1: { x: p1x, y: p1y },
                        p2: { x: p2x, y: p2y },
                        ctrl: {
                            x: baseCtrlX + (toCorner === 'tl' || toCorner === 'tr' ? offset : 0),
                            y: baseCtrlY + (toCorner === 'br' || toCorner === 'bl' ? offset : 0)
                        },
                        p3: { x: p3x, y: p3y },
                        p4: { x: p4x, y: p4y }
                    };
                }
                else if (isBRTL) {
                    // НИЖНИЙ ПРАВЫЙ -> ВЕРХНИЙ ЛЕВЫЙ - вторая половина
                    currentPoints = {
                        p1: {
                            x: midPoints.p1.x + (endPoints.p1.x - midPoints.p1.x) * phaseProgress,
                            y: midPoints.p1.y + (endPoints.p1.y - midPoints.p1.y) * phaseProgress
                        },
                        p2: {
                            x: midPoints.p2.x + (endPoints.p2.x - midPoints.p2.x) * phaseProgress,
                            y: midPoints.p2.y + (endPoints.p2.y - midPoints.p2.y) * phaseProgress
                        },
                        ctrl: {
                            x: midPoints.ctrl.x + (endPoints.ctrl.x - midPoints.ctrl.x) * phaseProgress - offset,
                            y: midPoints.ctrl.y + (endPoints.ctrl.y - midPoints.ctrl.y) * phaseProgress
                        },
                        p3: {
                            x: midPoints.p3.x + (endPoints.p3.x - midPoints.p3.x) * phaseProgress,
                            y: midPoints.p3.y + (endPoints.p3.y - midPoints.p3.y) * phaseProgress
                        },
                        p4: {
                            x: midPoints.p4.x + (endPoints.p4.x - midPoints.p4.x) * phaseProgress,
                            y: midPoints.p4.y + (endPoints.p4.y - midPoints.p4.y) * phaseProgress
                        }
                    };
                }
                else if (isTLBR) {
                    // ВЕРХНИЙ ЛЕВЫЙ -> НИЖНИЙ ПРАВЫЙ - вторая половина
                    currentPoints = {
                        p1: {
                            x: midPoints.p1.x + (endPoints.p1.x - midPoints.p1.x) * phaseProgress,
                            y: midPoints.p1.y + (endPoints.p1.y - midPoints.p1.y) * phaseProgress
                        },
                        p2: {
                            x: midPoints.p2.x + (endPoints.p2.x - midPoints.p2.x) * phaseProgress,
                            y: midPoints.p2.y + (endPoints.p2.y - midPoints.p2.y) * phaseProgress
                        },
                        ctrl: {
                            x: midPoints.ctrl.x + (endPoints.ctrl.x - midPoints.ctrl.x) * phaseProgress + offset,
                            y: midPoints.ctrl.y + (endPoints.ctrl.y - midPoints.ctrl.y) * phaseProgress
                        },
                        p3: {
                            x: midPoints.p3.x + (endPoints.p3.x - midPoints.p3.x) * phaseProgress,
                            y: midPoints.p3.y + (endPoints.p3.y - midPoints.p3.y) * phaseProgress
                        },
                        p4: {
                            x: midPoints.p4.x + (endPoints.p4.x - midPoints.p4.x) * phaseProgress,
                            y: midPoints.p4.y + (endPoints.p4.y - midPoints.p4.y) * phaseProgress
                        }
                    };
                }
                else {
                    // Стандартная интерполяция для остальных случаев
                    const p1x = midPoints.p1.x + (endPoints.p1.x - midPoints.p1.x) * phaseProgress;
                    const p1y = midPoints.p1.y + (endPoints.p1.y - midPoints.p1.y) * phaseProgress;
                    
                    const p2x = midPoints.p2.x + (endPoints.p2.x - midPoints.p2.x) * phaseProgress;
                    const p2y = midPoints.p2.y + (endPoints.p2.y - midPoints.p2.y) * phaseProgress;
                    
                    const p3x = midPoints.p3.x + (endPoints.p3.x - midPoints.p3.x) * phaseProgress;
                    const p3y = midPoints.p3.y + (endPoints.p3.y - midPoints.p3.y) * phaseProgress;
                    
                    const p4x = midPoints.p4.x + (endPoints.p4.x - midPoints.p4.x) * phaseProgress;
                    const p4y = midPoints.p4.y + (endPoints.p4.y - midPoints.p4.y) * phaseProgress;
                    
                    const baseCtrlX = midPoints.ctrl.x + (endPoints.ctrl.x - midPoints.ctrl.x) * phaseProgress;
                    const baseCtrlY = midPoints.ctrl.y + (endPoints.ctrl.y - midPoints.ctrl.y) * phaseProgress;
                    
                    currentPoints = {
                        p1: { x: p1x, y: p1y },
                        p2: { x: p2x, y: p2y },
                        ctrl: {
                            x: baseCtrlX + (toCorner === 'tl' || toCorner === 'tr' ? offset : 0),
                            y: baseCtrlY + (toCorner === 'br' || toCorner === 'bl' ? offset : 0)
                        },
                        p3: { x: p3x, y: p3y },
                        p4: { x: p4x, y: p4y }
                    };
                }
            }
            
            // Формируем путь
            const newPath = `
                M ${currentPoints.p1.x},${currentPoints.p1.y}
                L ${currentPoints.p2.x},${currentPoints.p2.y}
                Q ${currentPoints.ctrl.x},${currentPoints.ctrl.y} ${currentPoints.p3.x},${currentPoints.p3.y}
                L ${currentPoints.p4.x},${currentPoints.p4.y}
            `;
            
            line.setAttribute('d', newPath);

            if (progress < 1) {
                requestAnimationFrame(animate);
            } else {
                // Перемещаем SVG в новый контейнер
                toContainer.appendChild(svg);

                // Вычисляем новый уровень в целевом углу
                let newLevel;

                if (toCorner === 'br') {
                    // В правом нижнем углу линии сортируются от края (level 1) к центру
                    const existingLevels = this.linesState[toCorner].map(l => l.level);
                    if (existingLevels.length === 0) {
                        newLevel = 1;
                    } else {
                        // Находим максимальный существующий уровень и добавляем 1
                        newLevel = Math.max(...existingLevels) + 1;
                    }
                } else if (toCorner === 'tl') {
                    // В левом верхнем углу линии сортируются от края (level 1) к центру
                    const existingLevels = this.linesState[toCorner].map(l => l.level);
                    if (existingLevels.length === 0) {
                        newLevel = 1;
                    } else {
                        // Находим максимальный существующий уровень и добавляем 1
                        newLevel = Math.max(...existingLevels) + 1;
                    }
                } else {
                    // Для остальных углов пока level 1
                    newLevel = 1;
                }

                console.log(`Из ${fromCorner} level ${level} в ${toCorner} level ${newLevel}`);
                console.log(`Было в ${toCorner}:`, this.linesState[toCorner].map(l => l.level));

                // Обновляем состояние
                this.linesState[fromCorner] = this.linesState[fromCorner].filter(l => l.id !== lineId);
                this.linesState[toCorner].push({
                    id: lineId,
                    level: newLevel,
                    corner: toCorner
                });

                // Сортируем линии в целевом углу по уровню
                this.linesState[toCorner].sort((a, b) => a.level - b.level);

                console.log(`Стало в ${toCorner}:`, this.linesState[toCorner].map(l => l.level));

                // Перерисовываем только зоны
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

                // Находим существующую линию
                const existingLine = container.querySelector(`[data-line-id="${lineData.id}"]`);
                if (!existingLine) {
                    console.warn(`Линия ${lineData.id} не найдена в контейнере ${corner}`);
                    return;
                }

                // Получаем параметры для этого угла и уровня
                let offsetX, offsetY, widthLength, heightLength;

                const baseOffset = this.BASE_OFFSET + (level - 1) * this.LINE_SPACING;
                offsetX = this.pxToPercentX(baseOffset, w);
                offsetY = this.pxToPercentY(baseOffset, h);
                widthLength = level === 1 ? this.WIDTH_LENGTH_1 : this.WIDTH_LENGTH_2;
                heightLength = level === 1 ? this.HEIGHT_LENGTH_1 : this.HEIGHT_LENGTH_2;

                // Создаём зоны в зависимости от угла
                if (corner === 'tl') {
                    // Толстые зоны для tl
                    const horizontalZone = {
                        top: '0',
                        left: offsetX + '%',
                        width: widthLength + '%',
                        height: (4 * offsetY) + '%'
                    };
                    const verticalZone = {
                        top: offsetY + '%',
                        left: '0',
                        width: (4 * offsetX) + '%',
                        height: heightLength + '%'
                    };

                    this.createActivationZone(container, corner, level, horizontalZone, true, this);
                    this.createActivationZone(container, corner, level, verticalZone, false, this);

                    // Точные зоны для tl
                    const exactHorizontalZone = {
                        top: offsetY + '%',
                        left: offsetX + '%',
                        width: widthLength + '%',
                        height: (this.LINE_THICKNESS * 3) + 'px'
                    };
                    const exactVerticalZone = {
                        top: offsetY + '%',
                        left: offsetX + '%',
                        width: (this.LINE_THICKNESS * 3) + 'px',
                        height: heightLength + '%'
                    };

                    this.createExactZone(container, corner, level, exactHorizontalZone, true, this);
                    this.createExactZone(container, corner, level, exactVerticalZone, false, this);

                } else if (corner === 'tr') {
                    // Толстые зоны для tr
                    const horizontalZone = {
                        top: '0',
                        right: offsetX + '%',
                        width: widthLength + '%',
                        height: (4 * offsetY) + '%'
                    };
                    const verticalZone = {
                        top: offsetY + '%',
                        right: '0',
                        width: (4 * offsetX) + '%',
                        height: heightLength + '%'
                    };

                    this.createActivationZone(container, corner, level, horizontalZone, true, this);
                    this.createActivationZone(container, corner, level, verticalZone, false, this);

                    // Точные зоны для tr
                    const exactHorizontalZone = {
                        top: offsetY + '%',
                        right: offsetX + '%',
                        width: widthLength + '%',
                        height: (this.LINE_THICKNESS * 3) + 'px'
                    };
                    const exactVerticalZone = {
                        top: offsetY + '%',
                        right: offsetX + '%',
                        width: (this.LINE_THICKNESS * 3) + 'px',
                        height: heightLength + '%'
                    };

                    this.createExactZone(container, corner, level, exactHorizontalZone, true, this);
                    this.createExactZone(container, corner, level, exactVerticalZone, false, this);

                } else if (corner === 'br') {
                    // Толстые зоны для br
                    const horizontalZone = {
                        bottom: '0',
                        right: offsetX + '%',
                        width: widthLength + '%',
                        height: (4 * offsetY) + '%'
                    };
                    const verticalZone = {
                        bottom: offsetY + '%',
                        right: '0',
                        width: (4 * offsetX) + '%',
                        height: heightLength + '%'
                    };

                    this.createActivationZone(container, corner, level, horizontalZone, true, this);
                    this.createActivationZone(container, corner, level, verticalZone, false, this);

                    // Точные зоны для br
                    const exactHorizontalZone = {
                        bottom: offsetY + '%',
                        right: offsetX + '%',
                        width: widthLength + '%',
                        height: (this.LINE_THICKNESS * 3) + 'px'
                    };
                    const exactVerticalZone = {
                        bottom: offsetY + '%',
                        right: offsetX + '%',
                        width: (this.LINE_THICKNESS * 3) + 'px',
                        height: heightLength + '%'
                    };

                    this.createExactZone(container, corner, level, exactHorizontalZone, true, this);
                    this.createExactZone(container, corner, level, exactVerticalZone, false, this);

                } else if (corner === 'bl') {
                    // Толстые зоны для bl
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

                    this.createActivationZone(container, corner, level, horizontalZone, true, this);
                    this.createActivationZone(container, corner, level, verticalZone, false, this);

                    // Точные зоны для bl
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

                    this.createExactZone(container, corner, level, exactHorizontalZone, true, this);
                    this.createExactZone(container, corner, level, exactVerticalZone, false, this);
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
        const radius = this.pxToPercentX(this.CORNER_RADIUS, w);
        const radiusY = this.pxToPercentY(this.CORNER_RADIUS, h);

        let offset, offsetX, offsetY;

        if (customOffset !== null) {
            offsetX = this.pxToPercentX(customOffset, w);
            offsetY = this.pxToPercentY(customOffset, h);
            offset = offsetX;
        } else {
            // level 1 = BASE_OFFSET, level 2 = BASE_OFFSET + SPACING, level 3 = BASE_OFFSET + 2*SPACING и т.д.
            const baseOffset = this.BASE_OFFSET + (level - 1) * this.LINE_SPACING;
            offsetX = this.pxToPercentX(baseOffset, w);
            offsetY = this.pxToPercentY(baseOffset, h);
            offset = offsetX;
        }

        let points = {};

        if (corner === 'tl') {
            points = {
                p1: { x: offset + widthLength, y: offset },
                p2: { x: offset + radius, y: offset },
                p3: { x: offset, y: offset },
                p4: { x: offset, y: offset + heightLength }
            };
        } else if (corner === 'tr') {
            points = {
                p1: { x: 100 - offset - widthLength, y: offset },
                p2: { x: 100 - offset - radius, y: offset },
                p3: { x: 100 - offset, y: offset },
                p4: { x: 100 - offset, y: offset + heightLength }
            };
        } else if (corner === 'br') {
            points = {
                p1: { x: 100 - offsetX, y: 100 - offsetY - heightLength },
                p2: { x: 100 - offsetX, y: 100 - offsetY - radiusY },
                p3: { x: 100 - offsetX, y: 100 - offsetY },
                p4: { x: 100 - offsetX - widthLength, y: 100 - offsetY }
            };
        } else if (corner === 'bl') {
            points = {
                p1: { x: offsetX, y: 100 - offsetY - heightLength },
                p2: { x: offsetX, y: 100 - offsetY - radiusY },
                p3: { x: offsetX, y: 100 - offsetY },
                p4: { x: offsetX + widthLength, y: 100 - offsetY }
            };
        }

        return points;
    }

    createPathFromPoints(points, corner) {
        if (corner === 'tl' || corner === 'tr') {
            // Для верхних углов: горизонтальная -> скругление -> вертикальная
            return `
                        M ${points.p1.x},${points.p1.y}
                        L ${points.p2.x},${points.p2.y}
                        Q ${points.p3.x},${points.p3.y} ${points.p3.x},${points.p3.y}
                        L ${points.p4.x},${points.p4.y}
                    `;
        } else {
            // Для нижних углов: вертикальная -> скругление -> горизонтальная
            return `
                        M ${points.p1.x},${points.p1.y}
                        L ${points.p2.x},${points.p2.y}
                        Q ${points.p3.x},${points.p3.y} ${points.p3.x},${points.p3.y}
                        L ${points.p4.x},${points.p4.y}
                    `;
        }
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

        // Находим ID линии из состояния
        const lineData = this.linesState.tl.find(l => l.level === 1);
        if (!lineData) return;

        // Линия
        const offset = this.pxToPercentX(this.BASE_OFFSET, w);
        const offsetX = this.pxToPercentX(this.BASE_OFFSET, w);
        const offsetY = this.pxToPercentY(this.BASE_OFFSET, h);
        const radiusX = this.pxToPercentX(this.CORNER_RADIUS, w);
        const radiusY = this.pxToPercentY(this.CORNER_RADIUS, h);

        const startX = offsetX + this.WIDTH_LENGTH_1;
        const startY = offsetY;

        const cornerX = offsetX;
        const cornerY = offsetY;

        const pathData = `
                    M ${startX},${startY}
                    L ${cornerX + radiusX},${cornerY}
                    Q ${cornerX},${cornerY} ${cornerX},${cornerY + radiusY}
                    L ${cornerX},${cornerY + this.HEIGHT_LENGTH_1}
                `;

        this.createSVG(container, pathData, 1, lineData.id);

        // === ИСПРАВЛЕННЫЕ ЗОНЫ ===

        // Горизонтальная зона (толстая горизонтальная линия)
        // Ширина = длина линии, Высота = расстояние до края
        const horizontalZone = {
            top: '0',
            left: offset + '%',
            width: this.WIDTH_LENGTH_1 + '%',
            height: 4 * offset + '%'
        };

        // Вертикальная зона (толстая вертикальная линия)
        // Ширина = расстояние до края, Высота = длина линии
        const verticalZone = {
            top: offset + '%',
            left: '0',
            width: 4 * offset + '%',
            height: this.HEIGHT_LENGTH_1 + '%'
        };

        this.createActivationZone(container, 'tl', 1, horizontalZone, true, this);
        this.createActivationZone(container, 'tl', 1, verticalZone, false, this);

        // Точные зоны (повторяют форму линии)
        const exactHorizontalZone = {
            top: offset + '%',
            left: offset + '%',
            width: this.WIDTH_LENGTH_1 + '%',
            height: (this.LINE_THICKNESS * 3) + 'px'
        };

        const exactVerticalZone = {
            top: offset + '%',
            left: offset + '%',
            width: (this.LINE_THICKNESS * 3) + 'px',
            height: this.HEIGHT_LENGTH_1 + '%'
        };

        this.createExactZone(container, 'tl', 1, exactHorizontalZone, true, this);
        this.createExactZone(container, 'tl', 1, exactVerticalZone, false, this);
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

        // Горизонтальная зона (вдоль верхнего края)
        const horizontalZone = {
            top: '0',
            right: offset + '%',
            width: this.WIDTH_LENGTH_1 + '%',
            height: (4 * offset) + '%'
        };

        // Вертикальная зона (вдоль правого края)
        const verticalZone = {
            top: offset + '%',
            right: '0',
            width: (4 * offset) + '%',
            height: this.HEIGHT_LENGTH_1 + '%'
        };

        this.createActivationZone(container, 'tr', 1, horizontalZone, true, this);
        this.createActivationZone(container, 'tr', 1, verticalZone, false, this);


        // Точные зоны
        const exactHorizontalZone = {
            top: offset + '%',
            right: offset + '%',
            width: this.WIDTH_LENGTH_1 + '%',
            height: (this.LINE_THICKNESS * 3) + 'px'
        };

        const exactVerticalZone = {
            top: offset + '%',
            right: offset + '%',
            width: (this.LINE_THICKNESS * 3) + 'px',
            height: this.HEIGHT_LENGTH_1 + '%'
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

        // ЗОНЫ ДЛЯ LEVEL 1

        // Горизонтальная зона Level 1 (вдоль нижнего края)
        const horizontalZone1 = {
            bottom: '0',
            right: baseOffsetX + '%',
            width: this.WIDTH_LENGTH_1 + '%',
            height: (4 * baseOffsetY) + '%'
        };

        // Вертикальная зона Level 1 (вдоль правого края)
        const verticalZone1 = {
            bottom: baseOffsetY + '%',
            right: '0',
            width: (4 * baseOffsetX) + '%',
            height: this.HEIGHT_LENGTH_1 + '%'
        };

        this.createActivationZone(container, 'br', 1, horizontalZone1, true, this);
        this.createActivationZone(container, 'br', 1, verticalZone1, false, this);

        // ЗОНЫ ДЛЯ LEVEL 2

        // Горизонтальная зона Level 2 (вдоль нижнего края)
        const horizontalZone2 = {
            bottom: '0',
            right: (baseOffsetX + spacingX) + '%',
            width: this.WIDTH_LENGTH_2 + '%',
            height: (2 * (baseOffsetY + spacingY)) + '%'
        };

        // Вертикальная зона Level 2 (вдоль правого края)
        const verticalZone2 = {
            bottom: (baseOffsetY + spacingY) + '%',
            right: '0',
            width: (2 * (baseOffsetX + spacingX)) + '%',
            height: this.HEIGHT_LENGTH_2 + '%'
        };

        this.createActivationZone(container, 'br', 2, horizontalZone2, true, this);
        this.createActivationZone(container, 'br', 2, verticalZone2, false, this);

        // Точные зоны для Level 1
        const exactHorizontalZone1 = {
            bottom: baseOffsetY + '%',
            right: baseOffsetX + '%',
            width: this.WIDTH_LENGTH_1 + '%',
            height: (this.LINE_THICKNESS * 3) + 'px'
        };

        const exactVerticalZone1 = {
            bottom: baseOffsetY + '%',
            right: baseOffsetX + '%',
            width: (this.LINE_THICKNESS * 3) + 'px',
            height: this.HEIGHT_LENGTH_1 + '%'
        };

        this.createExactZone(container, 'br', 1, exactHorizontalZone1, true, this);
        this.createExactZone(container, 'br', 1, exactVerticalZone1, false, this);

        // Точные зоны для Level 2
        const exactHorizontalZone2 = {
            bottom: (baseOffsetY + spacingY) + '%',
            right: (baseOffsetX + spacingX) + '%',
            width: this.WIDTH_LENGTH_2 + '%',
            height: (this.LINE_THICKNESS * 3) + 'px'
        };

        const exactVerticalZone2 = {
            bottom: (baseOffsetY + spacingY) + '%',
            right: (baseOffsetX + spacingX) + '%',
            width: (this.LINE_THICKNESS * 3) + 'px',
            height: this.HEIGHT_LENGTH_2 + '%'
        };

        this.createExactZone(container, 'br', 2, exactHorizontalZone2, true, this);
        this.createExactZone(container, 'br', 2, exactVerticalZone2, false, this);
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
