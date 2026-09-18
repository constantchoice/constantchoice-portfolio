class ProjectCarousel {
    constructor() {
        // ===== PARSE URL =====
        this.projectData = this.parseProjectFromURL();
        
        if (!this.projectData) {
            console.error('Project data not found in URL');
            return;
        }
        
        // ===== DOM =====
        this.carousel = document.getElementById('carousel');
        this.titleEl = document.getElementById('projectTitle');
        this.frameEl = document.getElementById('projectFrame');
        
        // ===== DRAG =====
        this.isDragging = false;
        this.startX = 0;
        this.scrollStartX = 0;
        this.translateX = 0;
        this.maxTranslate = 0;
        this.velocity = 0;
        this.lastMoveTime = 0;
        this.lastMoveX = 0;
        this.animationId = null;
        
        // ===== OFFSET =====
        this.frameOffset = CONFIG.BASE_OFFSET + 2 * CONFIG.LINE_SPACING;
        
        document.documentElement.style.setProperty(
            '--frame-offset', 
            this.frameOffset + 'px'
        );
        
        // ===== HIGHLIGHT =====
        this.currentFramePathData = null;
        this.highlightEl = null;
        this.mouseMoveHandler = null;
        this.frameEnterHandlers = [];
        this.frameLeaveHandlers = [];
        
        // ===== INIT =====
        this.init();
    }
    
    // ==================== URL ====================
    parseProjectFromURL() {
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');
        const url = params.get('url');
        const imagesRaw = params.get('images');
        const startIndex = parseInt(params.get('start') || '0', 10);
        
        if (!name || !url || !imagesRaw) return null;
        
        let images;
        try {
            images = JSON.parse(decodeURIComponent(imagesRaw));
        } catch (e) {
            console.error('Failed to parse images', e);
            return null;
        }
        
        if (!Array.isArray(images) || images.length === 0) return null;
        
        const firstImage = images[startIndex] || images[0];
        const restImages = images.filter((_, i) => i !== startIndex);
        this.shuffleArray(restImages);
        
        return {
            name,
            url,
            images: [firstImage, ...restImages],
            startIndex
        };
    }
    
    shuffleArray(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
        return arr;
    }
      
    // ==================== INIT ====================
    init() {
        this.renderImages();
        this.renderTitle();
        this.renderFrame();
        this.setupDrag();
        this.setupFrameHighlight();
        
        this.waitForImages().then(() => {
            this.calculateBounds();
        });
        
        window.addEventListener('resize', () => {
            this.renderFrame();
            this.calculateBounds();
            this.setupFrameHighlight();
        });
    }
    
    // ==================== RENDER ====================
    renderImages() {
        this.carousel.innerHTML = '';
        
        this.projectData.images.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `${this.projectData.name} — ${index + 1}`;
            img.draggable = false;
            this.carousel.appendChild(img);
        });
    }
    
    renderTitle() {
        this.titleEl.textContent = this.projectData.name;
        this.titleEl.href = this.projectData.url;
        this.titleEl.setAttribute('aria-label', `Open project: ${this.projectData.name}`);
        
        // Определяем платформу по URL и навешиваем data-platform
        const platform = this.getPlatformFromUrl(this.projectData.url);
        this.titleEl.setAttribute('data-platform', platform);
    }

    getPlatformFromUrl(url) {
        if (!url) return 'default';
        if (url.includes('behance.net')) return 'behance';
        if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
        if (url.includes('github.com')) return 'github';
        if (url.includes('instagram.com')) return 'instagram';
        if (url.includes('twitter.com') || url.includes('x.com')) return 'twitter';
        if (url.includes('pinterest.com')) return 'pinterest';
        if (url.includes('dribbble.com')) return 'dribbble';
        if (url.includes('tiktok.com')) return 'tiktok';
        if (url.includes('t.me')) return 'telegram';
        if (url.includes('gmail.com') || url.includes('mailto:')) return 'gmail';
        if (url.includes('kavyar.com')) return 'kavyar';
        if (url.includes('gumroad.com')) return 'gumroad';
        if (url.includes('threads.com')) return 'threads';
        return 'default';
    }
    
    renderFrame() {
        const LINE_SPACING = CONFIG.LINE_SPACING;
        const CORNER_RADIUS = CONFIG.CORNER_RADIUS;
        const WIDTH_LENGTH_3 = CONFIG.WIDTH_LENGTH_3;
        const HEIGHT_LENGTH_3 = CONFIG.HEIGHT_LENGTH_3;
        
        const w = window.innerWidth;
        const h = window.innerHeight;
        
        const offset = this.frameOffset;
        const offsetX = (offset / w) * 100;
        const offsetY = (offset / h) * 100;
        
        const length = WIDTH_LENGTH_3;
        const heightLength = HEIGHT_LENGTH_3;
        const radiusX = (CORNER_RADIUS / w) * 100;
        const radiusY = (CORNER_RADIUS / h) * 100;
        
        const outerRect = "M 0,0 L 100,0 L 100,100 L 0,100 Z";
        
        const tlCorner = `
            M ${offsetX + length},${offsetY}
            L ${offsetX + radiusX},${offsetY}
            C ${offsetX},${offsetY} ${offsetX},${offsetY + radiusY} ${offsetX},${offsetY + radiusY}
        `;
        const leftEdge = `L ${offsetX},${100 - offsetY - heightLength}`;
        const blCorner = `
            L ${offsetX},${100 - offsetY - radiusY}
            C ${offsetX},${100 - offsetY} ${offsetX + radiusX},${100 - offsetY} ${offsetX + radiusX},${100 - offsetY}
        `;
        const bottomEdge = `L ${100 - offsetX - length},${100 - offsetY}`;
        const brCorner = `
            L ${100 - offsetX - radiusX},${100 - offsetY}
            C ${100 - offsetX},${100 - offsetY} ${100 - offsetX},${100 - offsetY - radiusY} ${100 - offsetX},${100 - offsetY - radiusY}
        `;
        const rightEdge = `L ${100 - offsetX},${offsetY + heightLength}`;
        const trCorner = `
            L ${100 - offsetX},${offsetY + radiusY}
            C ${100 - offsetX},${offsetY} ${100 - offsetX - radiusX},${offsetY} ${100 - offsetX - radiusX},${offsetY}
        `;
        const topEdge = `L ${offsetX + length},${offsetY}`;
        
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
        
        // Сохраняем для подсветки
        this.currentFramePathData = pathData;
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');
        svg.setAttribute('viewBox', '0 0 100 100');
        svg.setAttribute('preserveAspectRatio', 'none');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathData);
        path.setAttribute('fill', '#ffffff');
        path.setAttribute('fill-rule', 'evenodd');
        path.setAttribute('stroke', 'none');
        
        svg.appendChild(path);
        this.frameEl.innerHTML = '';
        this.frameEl.appendChild(svg);
        
        this.createFrameClickZones(offset);
    }
    
    createFrameClickZones(thickness) {
        document.querySelectorAll('.frame-click-zone').forEach(el => el.remove());
        
        const zones = [
            { top: 0, left: 0, width: '100%', height: thickness + 'px' },
            { bottom: 0, left: 0, width: '100%', height: thickness + 'px' },
            { top: 0, left: 0, width: thickness + 'px', height: '100%' },
            { top: 0, right: 0, width: thickness + 'px', height: '100%' }
        ];
        
        zones.forEach(style => {
            const zone = document.createElement('div');
            zone.className = 'frame-click-zone';
            Object.assign(zone.style, {
                position: 'fixed',
                zIndex: 60,
                cursor: 'pointer',
                ...style
            });
            
            zone.addEventListener('click', () => {
                this.closeAndReturn();
            });
            
            document.body.appendChild(zone);
        });
    }
    
    // ==================== FRAME HIGHLIGHT ====================
    setupFrameHighlight() {
        // Очищаем старые обработчики
        if (this.mouseMoveHandler) {
            window.removeEventListener('mousemove', this.mouseMoveHandler);
            this.mouseMoveHandler = null;
        }
        this.frameEnterHandlers.forEach(({ el, handler }) => {
            el.removeEventListener('mouseenter', handler);
        });
        this.frameLeaveHandlers.forEach(({ el, handler }) => {
            el.removeEventListener('mouseleave', handler);
        });
        this.frameEnterHandlers = [];
        this.frameLeaveHandlers = [];
        
        // Удаляем старый элемент подсветки
        if (this.highlightEl) {
            this.highlightEl.remove();
            this.highlightEl = null;
        }
        
        // Проверяем настройки
        const cfg = CONFIG.FRAME_HIGHLIGHT || {};
        if (cfg.ENABLED === false) return;
        if (!this.currentFramePathData) return;
        
        // Создаём слой подсветки
        const highlight = document.createElement('div');
        highlight.className = 'project-frame-highlight';
        
        // Формируем SVG-маску из pathData
        const maskSvg = `
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                <path d="${this.currentFramePathData}" fill="white" fill-rule="evenodd"/>
            </svg>
        `;
        const maskUrl = `url("data:image/svg+xml;utf8,${encodeURIComponent(maskSvg)}")`;
        
        highlight.style.setProperty('--frame-mask', maskUrl);
        
        // Применяем параметры из CONFIG
        highlight.style.setProperty('--highlight-radius', (cfg.RADIUS_PX ?? 300) + 'px');
        highlight.style.setProperty('--highlight-opacity', (cfg.OPACITY ?? 0.9).toString());
        
        const [r, g, b] = cfg.COLOR_RGB || [255, 255, 255];
        highlight.style.setProperty('--highlight-color', `${r}, ${g}, ${b}`);
        
        this.highlightEl = highlight;
        this.frameEl.appendChild(highlight);
        
        // Обновление позиции курсора
        this.mouseMoveHandler = (e) => {
            const x = (e.clientX / window.innerWidth) * 100;
            const y = (e.clientY / window.innerHeight) * 100;
            highlight.style.setProperty('--mouse-x', x + '%');
            highlight.style.setProperty('--mouse-y', y + '%');
        };
        window.addEventListener('mousemove', this.mouseMoveHandler);
        
        // Включаем/выключаем подсветку при наведении на зоны рамки
        const frameZones = document.querySelectorAll('.frame-click-zone');
        frameZones.forEach(zone => {
            const onEnter = () => {
                this.frameEl.classList.add('hover-active');
            };
            const onLeave = () => {
                this.frameEl.classList.remove('hover-active');
            };
            
            zone.addEventListener('mouseenter', onEnter);
            zone.addEventListener('mouseleave', onLeave);
            
            this.frameEnterHandlers.push({ el: zone, handler: onEnter });
            this.frameLeaveHandlers.push({ el: zone, handler: onLeave });
        });
    }
    
    closeAndReturn() {
        window.close();
        setTimeout(() => {
            if (!window.closed) {
                if (document.referrer) {
                    window.location.href = document.referrer;
                } else {
                    window.history.back();
                }
            }
        }, 100);
    }
    
    waitForImages() {
        const images = Array.from(this.carousel.querySelectorAll('img'));
        return Promise.all(
            images.map(img => {
                if (img.complete) return Promise.resolve();
                return new Promise(resolve => {
                    img.addEventListener('load', resolve, { once: true });
                    img.addEventListener('error', resolve, { once: true });
                });
            })
        );
    }
    
    // ==================== BOUNDS ====================
    calculateBounds() {
        // Считаем реальную ширину контента (сумму ширин всех картинок)
        const images = Array.from(this.carousel.querySelectorAll('img'));
        const containerWidth = images.reduce((sum, img) => {
            return sum + img.getBoundingClientRect().width;
        }, 0);
        
        const viewportWidth = window.innerWidth;
        const visibleWidth = viewportWidth - 2 * this.frameOffset;
        
        this.maxTranslate = Math.max(0, containerWidth - visibleWidth);
        
        // Прижимаем translateX в допустимый диапазон
        if (this.maxTranslate <= 0) {
            this.translateX = 0;
        } else {
            this.translateX = Math.max(-this.maxTranslate, Math.min(0, this.translateX));
        }
        
        this.baseOffset = this.frameOffset;
        this.applyTransform();
    }
    
    applyTransform() {
        const x = this.baseOffset + this.translateX;
        this.carousel.style.transform = `translateX(${x}px)`;
    }
    
    // ==================== DRAG ====================
    setupDrag() {
        const onStart = (e) => {
            if (e.target.closest('.project-title')) return;
            if (e.target.closest('.frame-click-zone')) return;
            
            this.isDragging = true;
            document.body.classList.add('dragging');
            
            const point = e.touches ? e.touches[0] : e;
            this.startX = point.clientX;
            this.scrollStartX = this.translateX;
            
            this.velocity = 0;
            this.lastMoveX = point.clientX;
            this.lastMoveTime = performance.now();
            
            if (this.animationId) {
                cancelAnimationFrame(this.animationId);
                this.animationId = null;
            }
        };
        
        const onMove = (e) => {
            if (!this.isDragging) return;
            
            const point = e.touches ? e.touches[0] : e;
            const dx = point.clientX - this.startX;
            
            let newTranslate = this.scrollStartX + dx;
            newTranslate = Math.max(-this.maxTranslate, Math.min(0, newTranslate));
            
            this.translateX = newTranslate;
            this.applyTransform();
            
            const now = performance.now();
            const dt = now - this.lastMoveTime;
            if (dt > 0) {
                this.velocity = (point.clientX - this.lastMoveX) / dt;
            }
            this.lastMoveX = point.clientX;
            this.lastMoveTime = now;
        };
        
        const onEnd = () => {
            if (!this.isDragging) return;
            this.isDragging = false;
            document.body.classList.remove('dragging');
            
            this.startInertia();
        };
        
        window.addEventListener('mousedown', onStart);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onEnd);
        
        window.addEventListener('touchstart', onStart, { passive: true });
        window.addEventListener('touchmove', onMove, { passive: true });
        window.addEventListener('touchend', onEnd);
        
        window.addEventListener('dragstart', (e) => e.preventDefault());
    }
    
    startInertia() {
        const friction = 0.95;
        const minVelocity = 0.05;
        
        const animate = () => {
            if (Math.abs(this.velocity) < minVelocity) {
                this.snapToBounds();
                return;
            }
            
            this.velocity *= friction;
            this.translateX += this.velocity * 16;
            
            if (this.translateX > 0) {
                this.translateX = 0;
                this.velocity = 0;
            } else if (this.translateX < -this.maxTranslate) {
                this.translateX = -this.maxTranslate;
                this.velocity = 0;
            }
            
            this.applyTransform();
            this.animationId = requestAnimationFrame(animate);
        };
        
        this.animationId = requestAnimationFrame(animate);
    }
    
    snapToBounds() {
        const animate = () => {
            let target = this.translateX;
            
            if (this.translateX > 0) target = 0;
            else if (this.translateX < -this.maxTranslate) target = -this.maxTranslate;
            
            const diff = target - this.translateX;
            
            if (Math.abs(diff) < 0.5) {
                this.translateX = target;
                this.applyTransform();
                return;
            }
            
            this.translateX += diff * 0.15;
            this.applyTransform();
            this.animationId = requestAnimationFrame(animate);
        };
        
        animate();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.projectCarousel = new ProjectCarousel();
});