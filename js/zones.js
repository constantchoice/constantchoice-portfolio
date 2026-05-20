// Функции для создания зон активации

function createExactZone(container, corner, level, styles, isHorizontal, lineManager) {
    const zone = document.createElement('div');
    zone.className = `activation-zone zone-level-${level}`;
    zone.dataset.corner = corner;
    zone.dataset.level = level;
    zone.dataset.type = isHorizontal ? 'horizontal' : 'vertical';
    zone.dataset.exact = 'true';
    
    Object.assign(zone.style, styles);
    
    // Дополнительные стили для Safari на iOS
    zone.style.webkitTapHighlightColor = 'transparent';
    zone.style.touchAction = 'manipulation';
    
    let hoverTimer = null;
    
    // При наведении на точную зону - затемняем линию (только для ПК)
    zone.addEventListener('mouseenter', () => {
        const lineData = lineManager.linesState[corner]?.find(l => l.level === level);
        if (lineData) {
            const line = container.querySelector(`[data-line-id="${lineData.id}"]`);
            if (line) {
                line.setAttribute('stroke', '#666');
                line.setAttribute('stroke-width', lineManager.LINE_THICKNESS + 1);
            }
        }
        
        // Запускаем анимацию с небольшой задержкой
        if (hoverTimer) clearTimeout(hoverTimer);
        hoverTimer = setTimeout(() => {
            if (lineManager.isAnimating) return;
            
            console.log(`Запуск анимации по наведению: ${corner} level ${level}`);
            
            const lineDataForAnim = lineManager.linesState[corner]?.find(l => l.level === level);
            if (lineDataForAnim) {
                const line = container.querySelector(`[data-line-id="${lineDataForAnim.id}"]`);
                if (line) {
                    lineManager.animateLineTransition(line, corner, level);
                }
            }
        }, 150);
    });
    
    zone.addEventListener('mouseleave', () => {
        if (hoverTimer) {
            clearTimeout(hoverTimer);
            hoverTimer = null;
        }
        
        if (!lineManager.isAnimating) {
            const lineData = lineManager.linesState[corner]?.find(l => l.level === level);
            if (lineData) {
                const line = container.querySelector(`[data-line-id="${lineData.id}"]`);
                if (line) {
                    line.setAttribute('stroke', '#999');
                    line.setAttribute('stroke-width', lineManager.LINE_THICKNESS);
                }
            }
        }
    });
    
    // Для ПК — клик
    zone.addEventListener('click', (e) => {
        e.stopPropagation();
        if (lineManager.isAnimating) return;
        
        console.log(`Клик: ${corner} level ${level}`);
        
        const lineData = lineManager.linesState[corner]?.find(l => l.level === level);
        if (lineData) {
            const line = container.querySelector(`[data-line-id="${lineData.id}"]`);
            if (line) {
                lineManager.animateLineTransition(line, corner, level);
            }
        }
    });
    
    // Для Safari и мобильных — касание
    zone.addEventListener('touchstart', (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (lineManager.isAnimating) return;
        
        console.log(`Тач (Safari): ${corner} level ${level}`);
        
        const lineData = lineManager.linesState[corner]?.find(l => l.level === level);
        if (lineData) {
            const line = container.querySelector(`[data-line-id="${lineData.id}"]`);
            if (line) {
                lineManager.animateLineTransition(line, corner, level);
            }
        }
    }, { passive: false });
    
    container.appendChild(zone);
    return zone;
}

function createActivationZone(container, corner, level, styles, isHorizontal, lineManager) {
    const zone = document.createElement('div');
    zone.className = `activation-zone zone-level-${level}`;
    zone.dataset.corner = corner;
    zone.dataset.level = level;
    zone.dataset.type = isHorizontal ? 'horizontal' : 'vertical';
    
    Object.assign(zone.style, styles);
    
    // Дополнительные стили для Safari на iOS
    zone.style.webkitTapHighlightColor = 'transparent';
    zone.style.touchAction = 'manipulation';
    
    // При движении мыши внутри зоны (только для ПК)
    zone.addEventListener('mousemove', (e) => {
        const rect = zone.getBoundingClientRect();
        
        let distance = 0;
        let maxDistance = 0;
        
        if (isHorizontal) {
            const centerY = rect.top + rect.height / 2;
            distance = Math.abs(e.clientY - centerY);
            maxDistance = rect.height / 2;
        } else {
            const centerX = rect.left + rect.width / 2;
            distance = Math.abs(e.clientX - centerX);
            maxDistance = rect.width / 2;
        }
        
        const proximity = 1 - (distance / maxDistance);
        const lines = container.querySelectorAll(`.corner-path.level-${level}`);
        
        const grayValue = Math.floor(150 + (proximity * 70));
        const color = `rgb(${grayValue}, ${grayValue}, ${grayValue})`;
        const thickness = lineManager.LINE_THICKNESS + (proximity * 2);
        
        lines.forEach(line => {
            line.setAttribute('stroke', color);
            line.setAttribute('stroke-width', thickness);
        });
    });
    
    zone.addEventListener('mouseleave', () => {
        const lines = container.querySelectorAll(`.corner-path.level-${level}`);
        lines.forEach(line => {
            line.setAttribute('stroke', '#999');
            line.setAttribute('stroke-width', lineManager.LINE_THICKNESS);
        });
    });
    
    container.appendChild(zone);
    return zone;
}