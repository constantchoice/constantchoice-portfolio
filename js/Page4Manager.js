class Page4Manager {
    constructor() {
        this.container = document.getElementById('page4');
        if (!this.container) return;
        
        this.items = CONFIG.PAGE4?.ITEMS || [];
        this.bottomImage = CONFIG.PAGE4?.BOTTOM_IMAGE || null;
        this.rowHeights = new Map();
        this.animationTime = 0;
        this.clipPathIdCounter = 0;
        
        // ============================================================
        // ===== КОНФИГ ДЛЯ ИЗОБРАЖЕНИЙ (aspectRatio: 3/4) =====
        // ============================================================
        this.imageMaskConfig = {
            mode: 1,                    // 0 = старый (угловатый), 1 = новый (плавные Безье)
            scale: 0.75,
            totalPoints: 11,             // Общее количество точек для mode 1 (минимум 3)
            handleLength: 0.1,
            handleAmplitude: 0.808,
            amplitudeSmoothing: 2,      // 0 = нет упрощения, выше = слабее амплитуда
            waveSpeed: 6,
            waveFrequency: 0.35,
            drift: 0.002,
            driftAngle: 45,
            noise: 0.005,
            randomSeed: 0,              // Базовый сид для случайности
            randomOffset: 0.1,          // Сила случайного смещения точек
            // randomOffset: 0,    // Все маски одинаковые
            // randomOffset: 0.2,  // Лёгкие различия
            // randomOffset: 0.4,  // Заметные различия
            // randomOffset: 0.6,  // Сильные различия
        };
        
        // ============================================================
        // ===== КОНФИГ ДЛЯ КОНТАКТНЫХ КАРТОЧЕК (aspectRatio: 1) =====
        // ============================================================
        this.contactMaskConfig = {
            mode: 0,                    // 0 = старый (угловатый), 1 = новый (плавные Безье)
            scale: 0.4,
            totalPoints: 8,             // Для mode 1
            pointsPerSide: 6,           // Для mode 0
            handleLength: 0.6,
            handleAmplitude: 0.8,
            amplitudeSmoothing: 0,
            waveSpeed: 2,
            waveFrequency: 0.35,
            drift: 0.012,
            driftAngle: 45,
            noise: 0.005,
            randomSeed: 100,            // Другой базовый сид
            randomOffset: 0.4,          // Сила случайного смещения точек
            // randomOffset: 0,    // Все маски одинаковые
            // randomOffset: 0.2,  // Лёгкие различия
            // randomOffset: 0.4,  // Заметные различия
            // randomOffset: 0.6,  // Сильные различия
        };
        
        this.init();
        window.addEventListener('resize', () => this.onResize());
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
    
    init() {
        this.createItems();
        this.createBottomImage();
        this.startAnimation();
    }
    
    createItems() {
        const grid = document.getElementById('itemsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        this.items.forEach((itemData, index) => {
            const card = this.createItemCard(itemData, index);
            card.dataset.index = index;
            grid.appendChild(card);
        });
        
        setTimeout(() => this.alignRowHeights(), 100);
    }
    
    createItemCard(data, cardIndex) {
        const card = document.createElement('div');
        card.className = 'item-card';
        
        const topDiv = document.createElement('div');
        topDiv.className = 'card-top';
        
        const leftDiv = document.createElement('div');
        leftDiv.className = 'card-image-container';
        
        const mediaDiv = document.createElement('div');
        mediaDiv.className = 'card-image';
        mediaDiv.classList.add('mask-target');
        
        const isVideo = data.image && (data.image.endsWith('.webm') || data.image.endsWith('.mp4'));
        
        let mediaElement;
        
        if (isVideo) {
            const video = document.createElement('video');
            video.src = data.image;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsinline = true;
            video.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                position: relative;
                z-index: 1;
            `;
            mediaElement = video;
        } else {
            const img = document.createElement('img');
            img.src = data.image;
            img.alt = data.title || 'Item';
            img.loading = 'lazy';
            img.style.cssText = `
                width: 100%;
                height: 100%;
                object-fit: cover;
                display: block;
                position: relative;
                z-index: 1;
            `;
            mediaElement = img;
        }
        
        mediaDiv.appendChild(mediaElement);
        
        const aspectRatio = 3 / 4;
        const clipId = `bubble-clip-${this.clipPathIdCounter++}`;
        
        const config = {
            ...this.imageMaskConfig,
            waveOffset: cardIndex * 1.7,
            seed: cardIndex * 2.3,
            randomSeed: (this.imageMaskConfig.randomSeed || 0) + cardIndex * 7.3,
        };
        
        const points = this.getPoints(config, aspectRatio);
        const pathD = this.pointsToBezierPathD(points, config);
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none;';
        
        const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
        clipPath.setAttribute('id', clipId);
        clipPath.setAttribute('clipPathUnits', 'objectBoundingBox');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathD);
        path.setAttribute('class', 'bubble-path');
        
        clipPath.appendChild(path);
        svg.appendChild(clipPath);
        document.body.appendChild(svg);
        
        mediaDiv.style.clipPath = `url(#${clipId})`;
        mediaDiv.style.webkitClipPath = `url(#${clipId})`;
        
        mediaDiv.dataset.clipId = clipId;
        mediaDiv.dataset.config = JSON.stringify(config);
        mediaDiv.dataset.aspectRatio = aspectRatio;
        
        leftDiv.appendChild(mediaDiv);
        
        const rightDiv = document.createElement('div');
        rightDiv.className = 'card-text-container';
        
        const title = document.createElement('h3');
        title.className = 'card-title';
        title.textContent = data.title || 'ITEM';
        
        const description = document.createElement('div');
        description.className = 'card-description';
        description.textContent = data.description || '';
        
        rightDiv.appendChild(title);
        rightDiv.appendChild(description);
        
        topDiv.appendChild(leftDiv);
        topDiv.appendChild(rightDiv);
        
        const bottomDiv = document.createElement('div');
        bottomDiv.className = 'card-bottom';
        
        const metaDiv = document.createElement('div');
        metaDiv.className = 'card-meta';
        
        const metaLines = data.meta || [
            { label: 'size', value: '' },
            { label: 'format', value: '' },
            { label: 'author', value: '' },
            { label: 'article', value: '' }
        ];
        
        metaLines.forEach(line => {
            const p = document.createElement('p');
            p.innerHTML = `<strong>${line.label}:</strong> ${line.value || '—'}`;
            metaDiv.appendChild(p);
        });
        
        bottomDiv.appendChild(metaDiv);
        
        if (data.contactCard) {
            const contactCardDiv = this.createContactCard(data, cardIndex);
            bottomDiv.appendChild(contactCardDiv);
        }
        
        card.appendChild(topDiv);
        card.appendChild(bottomDiv);
        
        return card;
    }
    
    getPoints(config, aspectRatio = 1) {
        const {
            scale,
            waveSpeed,
            waveFrequency,
            waveOffset,
            seed,
            drift,
            driftAngle,
            noise,
            amplitudeSmoothing,
            randomSeed,
            randomOffset
        } = config;
        
        const time = this.animationTime || 0;
        
        let totalPoints;
        if (config.mode === 1) {
            totalPoints = Math.max(3, config.totalPoints || 4);
        } else {
            totalPoints = (config.pointsPerSide || 1) * 4;
        }
        
        const points = [];
        
        const size = scale;
        const offset = (1 - size) / 2;
        
        const driftRad = driftAngle * Math.PI / 180;
        const driftX = Math.cos(driftRad) * drift;
        const driftY = Math.sin(driftRad) * drift;
        
        const smoothingFactor = 1 / (1 + (amplitudeSmoothing || 0));
        
        const seededRandom = (n) => {
            const x = Math.sin(n * 12.9898 + (randomSeed || 0)) * 43758.5453;
            return x - Math.floor(x);
        };
        
        for (let n = 0; n < totalPoints; n++) {
            const progress = n / totalPoints;
            const side = Math.floor(progress * 4) % 4;
            const localProgress = (progress * 4) % 1;
            
            let x, y;
            
            switch(side) {
                case 0:
                    x = offset + localProgress * size;
                    y = offset;
                    break;
                case 1:
                    x = offset + size;
                    y = offset + localProgress * size;
                    break;
                case 2:
                    x = offset + size - localProgress * size;
                    y = offset + size;
                    break;
                case 3:
                    x = offset;
                    y = offset + size - localProgress * size;
                    break;
            }
            
            const randomShiftX = (seededRandom(n) - 0.5) * 2 * (randomOffset || 0) * size;
            const randomShiftY = (seededRandom(n + 100) - 0.5) * 2 * (randomOffset || 0) * size;
            
            switch(side) {
                case 0: y += randomShiftY; break;
                case 1: x += randomShiftX; break;
                case 2: y -= randomShiftY; break;
                case 3: x -= randomShiftX; break;
            }
            
            const phase = seed + n * 0.7 + waveOffset;
            
            const wave1 = Math.sin(time * waveSpeed * 0.4 + localProgress * Math.PI * 2 * waveFrequency + phase) * 0.04 * smoothingFactor;
            const wave2 = Math.sin(time * waveSpeed * 0.25 + localProgress * Math.PI * 4 * waveFrequency * 0.7 + phase * 1.3) * 0.02 * smoothingFactor;
            const wave3 = Math.cos(time * waveSpeed * 0.35 + localProgress * Math.PI * 6 * waveFrequency * 0.5 + phase * 0.7) * 0.01 * smoothingFactor;
            const noiseWave = Math.sin(time * waveSpeed * 0.8 + n * 3.7 + seed * 0.5) * (noise || 0) * smoothingFactor;
            
            const totalWave = wave1 + wave2 + wave3 + noiseWave;
            
            switch(side) {
                case 0: y += totalWave + driftY; break;
                case 1: x += totalWave + driftX; break;
                case 2: y -= totalWave + driftY; break;
                case 3: x -= totalWave + driftX; break;
            }
            
            x = Math.max(0, Math.min(1, x));
            y = Math.max(0, Math.min(1, y));
            
            points.push({ x, y });
        }
        
        return points;
    }
    
    pointsToBezierPathD(points, config) {
        const mode = config.mode || 0;
        
        if (mode === 0) {
            return this.pointsToBezierPathD_Old(points, config);
        } else {
            return this.pointsToBezierPathD_New(points, config);
        }
    }
    
    pointsToBezierPathD_Old(points, config) {
        if (points.length < 3) return 'M0,0 L1,0 L1,1 L0,1 Z';
        
        const total = points.length;
        const hLen = config.handleLength || 0.7;
        const amp = config.handleAmplitude || 0.08;
        const time = this.animationTime || 0;
        const waveSpeed = config.waveSpeed || 12;
        const seed = config.seed || 0;
        const waveOffset = config.waveOffset || 0;
        
        const handles = [];
        
        for (let i = 0; i < total; i++) {
            const pPrev = points[(i - 1 + total) % total];
            const pCurr = points[i];
            const pNext = points[(i + 1) % total];
            
            const dx = pNext.x - pPrev.x;
            const dy = pNext.y - pPrev.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            const tx = dist > 0 ? dx / dist : 0;
            const ty = dist > 0 ? dy / dist : 0;
            
            const px = -ty;
            const py = tx;
            
            const distToPrev = Math.sqrt((pCurr.x - pPrev.x) ** 2 + (pCurr.y - pPrev.y) ** 2);
            const distToNext = Math.sqrt((pCurr.x - pNext.x) ** 2 + (pCurr.y - pNext.y) ** 2);
            
            const lenPrev = distToPrev * hLen;
            const lenNext = distToNext * hLen;
            
            const phase = seed + i * 0.5 + waveOffset;
            const wave1 = Math.sin(time * waveSpeed * 0.3 + i * 0.4 + phase) * amp;
            const wave2 = Math.sin(time * waveSpeed * 0.15 + i * 0.7 + phase * 0.7) * amp * 0.6;
            const wave3 = Math.cos(time * waveSpeed * 0.2 + i * 0.3 + phase * 1.1) * amp * 0.3;
            const deviation = wave1 + wave2 + wave3;
            
            const inX = pCurr.x - tx * lenPrev + px * deviation;
            const inY = pCurr.y - ty * lenPrev + py * deviation;
            
            const outX = pCurr.x + tx * lenNext + px * deviation;
            const outY = pCurr.y + ty * lenNext + py * deviation;
            
            handles.push({
                x: pCurr.x,
                y: pCurr.y,
                inX: Math.max(0, Math.min(1, inX)),
                inY: Math.max(0, Math.min(1, inY)),
                outX: Math.max(0, Math.min(1, outX)),
                outY: Math.max(0, Math.min(1, outY)),
            });
        }
        
        let d = '';
        
        for (let i = 0; i < total; i++) {
            const curr = handles[i];
            const next = handles[(i + 1) % total];
            
            if (i === 0) {
                d += `M ${curr.x} ${curr.y}`;
            }
            
            d += ` C ${curr.outX.toFixed(4)} ${curr.outY.toFixed(4)}, ${next.inX.toFixed(4)} ${next.inY.toFixed(4)}, ${next.x.toFixed(4)} ${next.y.toFixed(4)}`;
        }
        
        d += ' Z';
        return d;
    }
    
    pointsToBezierPathD_New(points, config) {
        if (points.length < 3) return 'M0,0 L1,0 L1,1 L0,1 Z';
        
        const total = points.length;
        const hLen = config.handleLength || 0.4;
        const amp = config.handleAmplitude || 0.08;
        const time = this.animationTime || 0;
        const waveSpeed = config.waveSpeed || 12;
        const seed = config.seed || 0;
        const waveOffset = config.waveOffset || 0;
        const amplitudeSmoothing = config.amplitudeSmoothing || 0;
        
        const smoothingFactor = 1 / (1 + amplitudeSmoothing);
        const effectiveAmp = amp * smoothingFactor;
        
        const handles = [];
        
        for (let i = 0; i < total; i++) {
            const pPrev = points[(i - 1 + total) % total];
            const pCurr = points[i];
            const pNext = points[(i + 1) % total];
            
            const dx = pNext.x - pPrev.x;
            const dy = pNext.y - pPrev.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            
            let tx, ty;
            if (dist > 0.001) {
                tx = dx / dist;
                ty = dy / dist;
            } else {
                tx = 1;
                ty = 0;
            }
            
            const baseHandleLen = hLen;
            
            const phase = seed + i * 0.5 + waveOffset;
            const wave1 = Math.sin(time * waveSpeed * 0.3 + i * 0.4 + phase) * effectiveAmp;
            const wave2 = Math.sin(time * waveSpeed * 0.15 + i * 0.7 + phase * 0.7) * effectiveAmp * 0.6;
            const wave3 = Math.cos(time * waveSpeed * 0.2 + i * 0.3 + phase * 1.1) * effectiveAmp * 0.3;
            const deviation = wave1 + wave2 + wave3;
            
            const handleLen = baseHandleLen * (1 + deviation);
            
            const inX = pCurr.x - tx * handleLen;
            const inY = pCurr.y - ty * handleLen;
            const outX = pCurr.x + tx * handleLen;
            const outY = pCurr.y + ty * handleLen;
            
            handles.push({
                x: pCurr.x,
                y: pCurr.y,
                inX: inX,
                inY: inY,
                outX: outX,
                outY: outY
            });
        }
        
        let d = '';
        
        for (let i = 0; i < total; i++) {
            const curr = handles[i];
            const next = handles[(i + 1) % total];
            
            if (i === 0) {
                d += `M ${curr.x.toFixed(4)} ${curr.y.toFixed(4)}`;
            }
            
            d += ` C ${curr.outX.toFixed(4)} ${curr.outY.toFixed(4)}, ${next.inX.toFixed(4)} ${next.inY.toFixed(4)}, ${next.x.toFixed(4)} ${next.y.toFixed(4)}`;
        }
        
        d += ' Z';
        return d;
    }
    
    updateClipPath(element, config, aspectRatio) {
        const clipId = element.dataset.clipId;
        if (!clipId) return;
        
        const points = this.getPoints(config, aspectRatio);
        const pathD = this.pointsToBezierPathD(points, config);
        
        const clipPath = document.getElementById(clipId);
        if (clipPath) {
            const path = clipPath.querySelector('path');
            if (path) {
                path.setAttribute('d', pathD);
            }
        }
        
        return points;
    }
    
    createContactCard(data, cardIndex) {
        const contactCardDiv = document.createElement('div');
        contactCardDiv.className = 'card-contact';
        
        const contactContainer = document.createElement('div');
        contactContainer.className = 'contact-container';
        contactContainer.style.position = 'relative';
        contactContainer.style.width = '100%';
        contactContainer.style.height = '100%';
        contactContainer.style.overflow = 'hidden';
        
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('mask-target');
        imageWrapper.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: 1;
        `;
        
        const img = document.createElement('img');
        img.src = data.contactCard.image;
        img.alt = 'Contact';
        img.loading = 'lazy';
        img.style.cssText = `
            width: 100%;
            height: 100%;
            object-fit: cover;
            display: block;
        `;
        
        if (data.contactCard.imageUrl) {
            const link = document.createElement('a');
            link.href = data.contactCard.imageUrl;
            link.target = '_blank';
            link.style.cssText = `
                display: block;
                width: 100%;
                height: 100%;
                text-decoration: none;
            `;
            link.appendChild(img);
            imageWrapper.appendChild(link);
        } else {
            imageWrapper.appendChild(img);
        }
        
        const contactAspectRatio = 1;
        const clipId = `contact-bubble-clip-${this.clipPathIdCounter++}`;
        
        const config = {
            ...this.contactMaskConfig,
            waveOffset: cardIndex * 2.3 + 50,
            seed: cardIndex * 3.1 + 200,
            randomSeed: (this.contactMaskConfig.randomSeed || 0) + cardIndex * 11.7,
        };
        
        const points = this.getPoints(config, contactAspectRatio);
        const pathD = this.pointsToBezierPathD(points, config);
        
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.style.cssText = 'position:absolute;width:0;height:0;pointer-events:none;';
        
        const clipPath = document.createElementNS('http://www.w3.org/2000/svg', 'clipPath');
        clipPath.setAttribute('id', clipId);
        clipPath.setAttribute('clipPathUnits', 'objectBoundingBox');
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', pathD);
        path.setAttribute('class', 'bubble-path');
        
        clipPath.appendChild(path);
        svg.appendChild(clipPath);
        document.body.appendChild(svg);
        
        imageWrapper.style.clipPath = `url(#${clipId})`;
        imageWrapper.style.webkitClipPath = `url(#${clipId})`;
        
        imageWrapper.dataset.clipId = clipId;
        imageWrapper.dataset.config = JSON.stringify(config);
        imageWrapper.dataset.aspectRatio = contactAspectRatio;
        
        contactContainer.appendChild(imageWrapper);
        
        if (data.contactCard.button && data.contactCard.button.text) {
            const button = document.createElement('a');
            button.href = data.contactCard.button.url || '#';
            button.target = '_blank';
            button.className = 'contact-button';
            button.textContent = data.contactCard.button.text;
            button.style.cssText = `
                position: absolute;
                bottom: 15px;
                left: 15px;
                right: 15px;
                z-index: 2;
                background: rgba(0, 0, 0, 0.1);
                color: rgba(255, 255, 255, 0.88);
                font-family: 'Inter', system-ui, sans-serif;
                font-size: 20px;
                font-weight: 400;
                text-align: center;
                padding: 12px 20px;
                border-radius: 15px;
                text-decoration: none;
                backdrop-filter: blur(2px);
                border: 1px solid rgba(255, 255, 255, 0.1);
                transition: transform 0.2s, background 0.2s, border-color 0.2s;
                cursor: pointer;
            `;
            
            const platform = this.getPlatformFromUrl(data.contactCard.button.url);
            button.setAttribute('data-platform', platform);
            
            button.addEventListener('mouseenter', () => {
                const platform = button.dataset.platform;
                const colors = {
                    'behance': 'rgba(23, 105, 255, 0.66)',
                    'youtube': 'rgba(255, 0, 0, 0.66)',
                    'github': 'rgba(0, 3, 51, 0.66)',
                    'instagram': 'linear-gradient(45deg, rgba(255, 220, 128, 0.66), rgba(252, 175, 69, 0.66), rgba(247, 119, 55, 0.66), rgba(245, 96, 64, 0.66), rgba(253, 29, 29, 0.66), rgba(225, 48, 108, 0.66), rgba(193, 53, 132, 0.66), rgba(131, 58, 180, 0.66), rgba(88, 81, 219, 0.66), rgba(64, 93, 230, 0.66))',
                    'twitter': 'rgba(20, 23, 26, 0.66)',
                    'pinterest': 'rgba(230, 0, 35, 0.66)',
                    'dribbble': 'rgba(234, 76, 137, 0.66)',
                    'tiktok': 'rgba(0, 0, 0, 0.66)',
                    'telegram': 'rgba(0, 136, 204, 0.66)',
                    'gmail': 'rgba(8, 133, 27, 0.66)',
                    'kavyar': 'rgba(0, 133, 255, 0.66)',
                    'gumroad': 'rgba(255, 144, 232, 0.66)',
                    'threads': 'rgba(0, 0, 0, 0.66)',
                    'default': 'rgba(255, 255, 255, 0.2)'
                };
                button.style.background = colors[platform] || colors.default;
                if (platform === 'instagram') {
                    button.style.border = 'none';
                }
                button.style.transform = 'scale(1.05)';
            });
            
            button.addEventListener('mouseleave', () => {
                button.style.background = 'rgba(0, 0, 0, 0.1)';
                button.style.border = '1px solid rgba(255, 255, 255, 0.1)';
                button.style.transform = 'scale(1)';
            });
            
            contactContainer.appendChild(button);
        }
        
        contactCardDiv.appendChild(contactContainer);
        return contactCardDiv;
    }
    
    startAnimation() {
        const animate = () => {
            this.animationTime += 0.004;
            
            document.querySelectorAll('.mask-target').forEach(target => {
                const configStr = target.dataset.config;
                if (!configStr) return;
                
                try {
                    const config = JSON.parse(configStr);
                    const aspectRatio = parseFloat(target.dataset.aspectRatio) || 1;
                    this.updateClipPath(target, config, aspectRatio);
                } catch(e) {}
            });
            
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    }
    
    alignRowHeights() {
        const grid = document.getElementById('itemsGrid');
        if (!grid) return;
        
        const cards = grid.querySelectorAll('.item-card');
        if (cards.length === 0) return;

        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            cards.forEach(card => {
                card.style.height = 'auto';
                const bottomPart = card.querySelector('.card-bottom');
                const contactCard = card.querySelector('.card-contact');
                const metaPart = card.querySelector('.card-meta');
                
                if (!bottomPart || !contactCard) return;
                
                bottomPart.style.height = 'auto';
                contactCard.style.height = 'auto';
                if (metaPart) metaPart.style.height = 'auto';
                
                let contactHeight = contactCard.offsetHeight;
                if (contactHeight < 60) contactHeight = 60;
                
                let metaHeight = metaPart ? metaPart.offsetHeight : 0;
                let targetHeight = Math.max(metaHeight, contactHeight);
                
                if (targetHeight > 0) {
                    bottomPart.style.height = targetHeight + 'px';
                    contactCard.style.height = targetHeight + 'px';
                    if (metaPart) metaPart.style.height = targetHeight + 'px';
                }
            });
            return;
        }
            
        cards.forEach(card => {
            card.style.height = 'auto';
            const bottomPart = card.querySelector('.card-bottom');
            if (bottomPart) bottomPart.style.height = 'auto';
            const contactCard = card.querySelector('.card-contact');
            if (contactCard) contactCard.style.height = '0';
        });
        
        for (let i = 0; i < cards.length; i += 2) {
            const rowCards = [cards[i]];
            if (i + 1 < cards.length) rowCards.push(cards[i + 1]);
            
            let maxTopHeight = 0;
            let maxMetaHeight = 0;
            
            rowCards.forEach(card => {
                const topPart = card.querySelector('.card-top');
                const metaPart = card.querySelector('.card-meta');
                
                if (topPart) {
                    const topHeight = topPart.offsetHeight;
                    if (topHeight > maxTopHeight) maxTopHeight = topHeight;
                }
                
                if (metaPart) {
                    const metaHeight = metaPart.offsetHeight;
                    if (metaHeight > maxMetaHeight) maxMetaHeight = metaHeight;
                }
            });
            
            rowCards.forEach(card => {
                card.style.height = (maxTopHeight + maxMetaHeight + 30) + 'px';
                
                const bottomPart = card.querySelector('.card-bottom');
                if (bottomPart) {
                    bottomPart.style.height = maxMetaHeight + 'px';
                }
                
                const contactCard = card.querySelector('.card-contact');
                if (contactCard) {
                    contactCard.style.height = maxMetaHeight + 'px';
                }
            });
        }
    }
    
    createBottomImage() {
        const container = document.getElementById('bottomBanner');
        if (!container || !this.bottomImage) return;
        
        container.innerHTML = '';

        if (this.bottomImage.url) {
            const link = document.createElement('a');
            link.href = this.bottomImage.url;
            link.target = '_blank';
            link.className = 'banner-link';
            link.style.display = 'block';
            link.style.width = '100%';
            link.style.textDecoration = 'none';
            
            const img = document.createElement('img');
            img.src = this.bottomImage.src;
            img.alt = this.bottomImage.alt || 'Banner';
            img.className = 'banner-image';
            img.loading = 'lazy';
            
            link.appendChild(img);
            container.appendChild(link);
        } else {
            const img = document.createElement('img');
            img.src = this.bottomImage.src;
            img.alt = this.bottomImage.alt || 'Banner';
            img.className = 'banner-image';
            img.loading = 'lazy';
            container.appendChild(img);
        }
    }
    
    onResize() {
        this.alignRowHeights();
    }
}
