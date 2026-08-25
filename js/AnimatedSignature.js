class AnimatedSignature {
    constructor(config = {}) {
        this.config = {
            duration: 24,
            delay: 0.3,
            fillColor: '#999999',
            pointCount: 1500,
            easing: 'ease-in-out',
            scale: 1,
            position: {
                top: '41.5%',
                left: '49.334%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                maxWidth: '900px'
            },
            ...config
        };
        
        this.container = null;
        this.isAnimating = false;
        this.animationId = null;
        this.svgData = null;
        this.allPoints = [];
        this.fillPath = null;
        this.svgElement = null;
    }
    
    loadSVG(svgData) {
        if (typeof svgData === 'string') {
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgData, 'image/svg+xml');
            const svg = doc.querySelector('svg');
            if (!svg) throw new Error('Invalid SVG data');
            this.svgData = svg;
        } else if (svgData instanceof SVGElement) {
            this.svgData = svgData.cloneNode(true);
        } else {
            throw new Error('svgData must be string or SVGElement');
        }
        return this;
    }
    
    async loadFromURL(url) {
        const response = await fetch(url);
        const text = await response.text();
        this.loadSVG(text);
        return this;
    }
    
    getPathPoints(pathData, count = 500) {
        const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        tempPath.setAttribute('d', pathData);
        
        const points = [];
        const length = tempPath.getTotalLength();
        
        if (length === 0) return points;
        
        for (let i = 0; i <= count; i++) {
            const t = i / count;
            try {
                const point = tempPath.getPointAtLength(t * length);
                points.push({ x: point.x, y: point.y });
            } catch(e) {}
        }
        
        return points;
    }
    
    getAllPointsFromSVG(svg) {
        const allPaths = svg.querySelectorAll('path');
        let allPoints = [];
        
        allPaths.forEach((el) => {
            const pathData = el.getAttribute('d') || '';
            if (!pathData) return;
            
            try {
                const points = this.getPathPoints(pathData, this.config.pointCount);
                allPoints = allPoints.concat(points);
            } catch(e) {}
        });
        
        return allPoints;
    }
    
    createAnimatedSVG() {
        if (!this.svgData) throw new Error('SVG not loaded');
        
        // Загружаем точки синхронно (сразу, без задержки)
        this.allPoints = this.getAllPointsFromSVG(this.svgData);
        this.totalPoints = this.allPoints.length;
        
        if (this.allPoints.length === 0) {
            throw new Error('No valid paths found');
        }
        
        const originalSvg = this.svgData;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        
        const attrs = originalSvg.attributes;
        for (let i = 0; i < attrs.length; i++) {
            svg.setAttribute(attrs[i].name, attrs[i].value);
        }
        
        // ===== ПРИМЕНЯЕМ МАСШТАБ =====
        const scale = this.config.scale || 1;
        const viewBox = svg.getAttribute('viewBox') || '0 0 1920 1440';
        const vbParts = viewBox.split(' ').map(Number);
        
        if (vbParts.length === 4) {
            const [x, y, w, h] = vbParts;
            const cx = x + w / 2;
            const cy = y + h / 2;
            const newW = w * scale;
            const newH = h * scale;
            svg.setAttribute('viewBox', `${cx - newW/2} ${cy - newH/2} ${newW} ${newH}`);
        }
        
        const fillPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        fillPath.setAttribute('fill', this.config.fillColor);
        fillPath.setAttribute('stroke', 'none');
        fillPath.setAttribute('d', '');
        
        svg.appendChild(fillPath);
        
        this.svgElement = svg;
        this.fillPath = fillPath;
        
        return svg;
    }
    
    ease(t) {
        const easing = this.config.easing;
        switch(easing) {
            case 'ease-in':
                return t * t;
            case 'ease-out':
                return t * (2 - t);
            case 'ease-in-out':
                return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
            case 'linear':
            default:
                return t;
        }
    }
    
    start(container, onComplete = null) {
        if (this.isAnimating) this.stop();
        
        this.container = container || this.container;
        if (!this.container) throw new Error('Container not specified');
        
        // Применяем позиционирование к контейнеру
        const pos = this.config.position;
        Object.assign(this.container.style, {
            position: 'absolute',
            top: pos.top || '50%',
            left: pos.left || '50%',
            transform: pos.transform || 'translate(-50%, -50%)',
            width: pos.width || '80%',
            maxWidth: pos.maxWidth || '900px',
            height: 'auto',
            pointerEvents: 'none',
            zIndex: '10'
        });
        
        const animatedSVG = this.createAnimatedSVG();
        this.container.innerHTML = '';
        this.container.appendChild(animatedSVG);
        
        this.isAnimating = true;
        const startTime = performance.now() + this.config.delay * 1000;
        const duration = this.config.duration * 1000;
        const totalPoints = this.totalPoints || this.allPoints.length;
        
        const animateFrame = (currentTime) => {
            if (!this.isAnimating) return;
            
            const elapsed = currentTime - startTime;
            let progress = Math.max(0, Math.min(1, elapsed / duration));
            const easedProgress = this.ease(progress);
            
            const startIndex = Math.floor(totalPoints * easedProgress);
            const endIndex = totalPoints - Math.floor(totalPoints * easedProgress) - 1;
            
            if (startIndex >= endIndex) {
                let d = `M ${this.allPoints[0].x} ${this.allPoints[0].y}`;
                for (let i = 1; i < totalPoints; i++) {
                    d += ` L ${this.allPoints[i].x} ${this.allPoints[i].y}`;
                }
                d += ` Z`;
                this.fillPath.setAttribute('d', d);
                
                this.isAnimating = false;
                if (onComplete) onComplete();
                return;
            }
            
            let d = `M ${this.allPoints[0].x} ${this.allPoints[0].y}`;
            
            for (let i = 1; i <= startIndex; i++) {
                d += ` L ${this.allPoints[i].x} ${this.allPoints[i].y}`;
            }
            
            for (let i = endIndex; i < totalPoints; i++) {
                d += ` L ${this.allPoints[i].x} ${this.allPoints[i].y}`;
            }
            
            d += ` Z`;
            this.fillPath.setAttribute('d', d);
            
            this.animationId = requestAnimationFrame(animateFrame);
        };
        
        // Запускаем анимацию сразу, без задержки
        this.animationId = requestAnimationFrame(animateFrame);
    }
    
    stop() {
        this.isAnimating = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }
    
    reset() {
        this.stop();
        if (this.container) {
            this.container.innerHTML = '';
        }
        this.svgElement = null;
        this.fillPath = null;
        this.allPoints = [];
    }
}