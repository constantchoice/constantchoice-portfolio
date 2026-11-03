class Page3Manager {
    constructor() {
        this.container = document.getElementById('page3');
        if (!this.container) return;
        
        this.layout = CONFIG.PAGE3.LAYOUT || {};
        this.sizeConfig = CONFIG.PAGE3.SIZES || {};
        this.floatingSettings = CONFIG.PAGE3.FLOATING_SETTINGS || {};
        this.floatingLinks = CONFIG.PAGE3.FLOATING_LINKS || [];
        this.skillsIcons = CONFIG.PAGE3.SKILLS_ICONS || [];
        this.linksData = CONFIG.PAGE3.LINKS || {};
        
        this.scale = 1;
        this._skillsRing = null;
        this._skillsRingAnimId = null;
        this._resizeTimeout = null;
        this._lastWidth = 0;
        this._lastHeight = 0;
        
        this.init();
        window.addEventListener('resize', () => this.onResize());
    }
    
    init() {
        this.calculateScale();
        this.applyLayout();
        this.createFloatingImages();
        this.createSkillsIcons();
        this.createLinks();
    }
    
    // ==================== SCALE ====================
    calculateScale() {
        const containerHeight = this.container.clientHeight;
        const baseHeight = this.layout.BASE_HEIGHT || 1163;
        
        this.scale = Math.max(0.6, Math.min(1, containerHeight / baseHeight));
        
        this.sizes = {
            titleFont: this.lerp(
                this.sizeConfig.MIN?.TITLE_FONT_SIZE || 16,
                this.sizeConfig.BASE?.TITLE_FONT_SIZE || 24,
                this.scale
            ),
            skillIcon: this.lerp(
                this.sizeConfig.MIN?.SKILL_ICON_SIZE || 40,
                this.sizeConfig.BASE?.SKILL_ICON_SIZE || 60,
                this.scale
            ),
            linkBig: this.lerp(
                this.sizeConfig.MIN?.LINK_BIG_SIZE || 40,
                this.sizeConfig.BASE?.LINK_BIG_SIZE || 60,
                this.scale
            ),
            linkSmall: this.lerp(
                this.sizeConfig.MIN?.LINK_SMALL_SIZE || 28,
                this.sizeConfig.BASE?.LINK_SMALL_SIZE || 40,
                this.scale
            ),
            gap: this.lerp(
                this.sizeConfig.MIN?.GAP || 8,
                this.sizeConfig.BASE?.GAP || 15,
                this.scale
            ),
            bigGap: this.lerp(
                this.sizeConfig.MIN?.BIG_GAP || 20,
                this.sizeConfig.BASE?.BIG_GAP || 40,
                this.scale
            ),
            floatingTitleOffset: (this.sizeConfig.BASE?.FLOATING_TITLE_OFFSET || 40) * this.scale,
            borderRadiusBig: (this.sizeConfig.BASE?.BORDER_RADIUS_BIG || 15) * this.scale,
            borderRadiusSmall: (this.sizeConfig.BASE?.BORDER_RADIUS_SMALL || 10) * this.scale
        };
    }
    
    lerp(min, max, t) {
        return Math.round(min + (max - min) * t);
    }
    
    lerpFloat(min, max, t) {
        return min + (max - min) * t;
    }
    
    // ==================== LAYOUT ====================
    applyLayout() {
        const topBlock = this.container.querySelector('.top-block');
        const middleBlock = this.container.querySelector('.middle-block');
        const bottomBlock = this.container.querySelector('.bottom-block');
        const titles = this.container.querySelectorAll('.block-title');
        
        if (!topBlock || !middleBlock || !bottomBlock) return;
        
        const containerHeight = this.container.clientHeight;
        
        titles.forEach(title => {
            title.style.fontSize = this.sizes.titleFont + 'px';
            title.style.marginBottom = this.sizes.gap + 'px';
        });
        
        // ===== НИЖНИЙ БЛОК =====
        if (this.layout.BOTTOM_BLOCK) {
            const bottomOffsetPercent = this.layout.BOTTOM_BLOCK.BOTTOM_OFFSET_PERCENT || 5.59;
            const bottomOffset = (bottomOffsetPercent / 100) * this.layout.BASE_HEIGHT;
            const height = (this.layout.BOTTOM_BLOCK.HEIGHT_PERCENT / 100) * this.layout.BASE_HEIGHT;
            
            bottomBlock.style.bottom = bottomOffset + 'px';
            bottomBlock.style.height = height + 'px';
        }
        
        // ===== СРЕДНИЙ БЛОК =====
        if (this.layout.MIDDLE_BLOCK) {
            const bottomOffsetPercent = this.layout.MIDDLE_BLOCK.BOTTOM_OFFSET_PERCENT || 32.2;
            const bottomOffset = (bottomOffsetPercent / 100) * this.layout.BASE_HEIGHT;
            const height = (this.layout.MIDDLE_BLOCK.HEIGHT_PERCENT / 100) * this.layout.BASE_HEIGHT;
            
            middleBlock.style.bottom = bottomOffset + 'px';
            middleBlock.style.height = height + 'px';
        }
        
        // ===== ВЕРХНИЙ БЛОК =====
        if (this.layout.TOP_BLOCK) {
            const topOffset = this.layout.TOP_BLOCK.TOP_OFFSET || 90;
            const middleBottom = parseFloat(middleBlock.style.bottom) || 0;
            const middleHeight = parseFloat(middleBlock.style.height) || 0;
            const middleTop = containerHeight - middleBottom - middleHeight;
            
            let availableHeight = middleTop - topOffset - this.sizes.gap * 2;
            availableHeight = Math.max(200, availableHeight);
            
            topBlock.style.top = topOffset + 'px';
            topBlock.style.height = availableHeight + 'px';
        }
    }
    
    // ==================== SKILLS RING ====================
    createSkillsIcons() {
        // Убиваем старый цикл
        if (this._skillsRingAnimId) {
            cancelAnimationFrame(this._skillsRingAnimId);
            this._skillsRingAnimId = null;
        }
        this._skillsRing = null;
        
        const container = document.getElementById('skillsContainer-page3');
        if (!container) return;
        
        container.innerHTML = '';
        
        const ringCfg = CONFIG.PAGE3.SKILLS_RING || {};
        if (!ringCfg.ENABLED) return;
        
        const ringContainer = document.createElement('div');
        ringContainer.className = 'skills-ring-container';
        ringContainer.style.cssText = `
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: visible;
        `;
        
        container.style.position = 'relative';
        container.style.overflow = 'visible';
        container.appendChild(ringContainer);
        
        // Собираем иконки с учётом итераций
        const allIcons = [];
        const iterations = ringCfg.TOTAL_ITERATIONS || 1;
        
        for (let iter = 0; iter < iterations; iter++) {
            this.skillsIcons.forEach((iconData, idx) => {
                allIcons.push({
                    ...iconData,
                    iterationIndex: iter,
                    iconIndex: idx
                });
            });
        }
        
        const totalIcons = allIcons.length;
        if (totalIcons === 0) return;
        
        const baseSize = this.sizes.skillIcon;
        const baseRadius = this.sizes.borderRadiusBig;
        
        const iconElements = allIcons.map((iconData, i) => {
            const el = document.createElement('div');
            el.className = 'skill-icon';
            
            el.style.width = baseSize + 'px';
            el.style.height = baseSize + 'px';
            el.style.borderRadius = baseRadius + 'px';
            el.style.position = 'absolute';
            el.style.left = '50%';
            el.style.top = '50%';
            
            const img = document.createElement('img');
            img.src = iconData.image;
            img.alt = 'Skill';
            img.loading = 'lazy';
            img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;border-radius:inherit;';
            
            el.appendChild(img);
            ringContainer.appendChild(el);
            
            return {
                el,
                s: i / totalIcons   // ← фиксированная доля дуги (0..1)
            };
        });
        
        this._skillsRing = {
            container: ringContainer,
            icons: iconElements,
            cfg: ringCfg,
            rotation: 0,
            startTime: performance.now()
        };
        
        this.startSkillsRingAnimation();
    }
    
    startSkillsRingAnimation() {
        if (this._skillsRingAnimId) {
            cancelAnimationFrame(this._skillsRingAnimId);
            this._skillsRingAnimId = null;
        }
        
        let lastTime = performance.now();
        
        const animate = (now) => {
            const ring = this._skillsRing;
            
            if (!ring || !ring.container || !ring.container.isConnected) {
                this._skillsRingAnimId = null;
                return;
            }
            
            // ===== КЭШ РАЗМЕРОВ =====
            if (!ring.width || !ring.height) {
                const r = ring.container.getBoundingClientRect();
                ring.width = r.width;
                ring.height = r.height;
                if (!ring.width || !ring.height) {
                    this._skillsRingAnimId = requestAnimationFrame(animate);
                    return;
                }
            }
            
            const dt = Math.min((now - lastTime) / 1000, 0.1);
            lastTime = now;
            
            const cfg = ring.cfg;
            const baseSpeed = (cfg.ROTATION_SPEED || 0.15) * (cfg.DIRECTION || 1);
            ring.rotation += dt * baseSpeed;
            
            const radiusX = ring.width * (cfg.RADIUS_X || 0.42);
            const radiusY = ring.height * (cfg.RADIUS_Y || 0.12);
            
            // ===== ТЕКУЩИЙ НАКЛОН (с учётом TILT_ANIMATION) =====
            const tiltDeg = this._getCurrentTilt(now, cfg);
            const tiltRad = tiltDeg * Math.PI / 180;
            const cosT = Math.cos(tiltRad);
            const sinT = Math.sin(tiltRad);

            const tiltCompX = (cfg.TILT_COMPENSATE !== false) ? radiusY * sinT : 0;
            
            const phaseRad = (cfg.DEPTH_PHASE_DEG || 0) * Math.PI / 180;
            const backRad = (cfg.BACK_PHASE_DEG || 0) * Math.PI / 180;
            const offsetY = cfg.OFFSET_Y_PX ?? 0;
            
            const amplitude = Math.max(-0.99, Math.min(0.99, cfg.SPEED_AMPLITUDE ?? 0));
            const TWO_PI = Math.PI * 2;
            
            const fullZone = Math.max(0, Math.min(1, cfg.FULL_OPACITY_ZONE ?? 0));
            const halfPlateau = fullZone / 2;
            const centerOpacity = cfg.CENTER_OPACITY ?? 1;
            const edgeOpacity = cfg.EDGE_OPACITY ?? 0;
            const edgeScale = cfg.EDGE_SCALE ?? 0.3;
            const centerScale = cfg.CENTER_SCALE ?? 1.0;
            const zBase = cfg.Z_INDEX_BASE || 1;
            const zRange = cfg.Z_INDEX_RANGE || 100;
            
            const icons = ring.icons;
            const lastZ = ring.lastZ || (ring.lastZ = new Array(icons.length).fill(-1));
            
            for (let i = 0; i < icons.length; i++) {
                const el = icons[i].el;
                const s = icons[i].s;
                
                const basePhase = s * TWO_PI + ring.rotation;
                const phase = basePhase + phaseRad;
                const a = phase - amplitude * Math.cos(phase);
                
                const x = Math.cos(a) * radiusX;
                const y = Math.sin(a) * radiusY;
                
                const x2 = x * cosT - y * sinT + tiltCompX;
                const y2 = x * sinT + y * cosT;
                
                // Глубина
                const phaseBack = phase + backRad;
                const sinFront = Math.sin(phase);
                const sinBack = Math.sin(phaseBack);
                const fw = (sinFront + 1) / 2;
                const sinMix = sinFront * fw + sinBack * (1 - fw);
                const depthFactor = (sinMix + 1) / 2;
                
                const scale = edgeScale + (centerScale - edgeScale) * depthFactor;
                
                let opacity;
                if (fullZone >= 1) {
                    opacity = centerOpacity;
                } else if (depthFactor >= 1 - halfPlateau) {
                    opacity = centerOpacity;
                } else if (depthFactor <= halfPlateau) {
                    opacity = edgeOpacity;
                } else {
                    const t = (depthFactor - halfPlateau) / (1 - fullZone);
                    opacity = edgeOpacity + (centerOpacity - edgeOpacity) * t;
                }
                
                const newZ = Math.round(zBase + depthFactor * zRange);
                
                el.style.setProperty('opacity', opacity, 'important');
                el.style.setProperty('--tx', x2 + 'px');
                el.style.setProperty('--ty', (y2 + offsetY) + 'px');
                el.style.setProperty('--sc', scale);
                
                if (lastZ[i] !== newZ) {
                    el.style.zIndex = newZ;
                    lastZ[i] = newZ;
                }
            }
            
            this._skillsRingAnimId = requestAnimationFrame(animate);
        };
        
        this._skillsRingAnimId = requestAnimationFrame(animate);
    }
    
    /**
     * Возвращает текущий TILT_DEG с учётом периодической анимации наклона.
     * Основа — синус (гладкий в точках разворота, без излома).
     *
     * @param {number} now — performance.now() из rAF
     * @param {object} cfg — CONFIG.PAGE3.SKILLS_RING
     * @returns {number} угол в градусах
     */
    _getCurrentTilt(now, cfg) {
        const base = cfg.TILT_DEG ?? 0;
        const anim = cfg.TILT_ANIMATION;
        
        // Анимация выключена — статичный TILT_DEG
        if (!anim || !anim.ENABLED) return base;
        
        const amp = anim.AMPLITUDE ?? 0;
        if (amp === 0) return base;
        
        const period = Math.max(0.1, anim.PERIOD_SEC ?? 8);
        const startPhase = (((anim.START_PHASE ?? 0) % 1) + 1) % 1;
        const easePower = anim.EASE_POWER ?? 1;
        const bias = anim.EASE_BIAS ?? 0;
        
        // Время в секундах с момента старта кольца
        const startTime = this._skillsRing?.startTime ?? 0;
        const tSec = (now - startTime) / 1000;
        
        // фаза 0..1 (цикл)
        let phase = (tSec / period + startPhase) % 1;
        if (phase < 0) phase += 1;
        
        // ===== БАЗА: синус — гладкий в точках разворота =====
        // phase 0    → sin(0)              = 0    → центр (если START_PHASE=0, старт с центра)
        // phase 0.25 → sin(π/2)            = 1    → правый край
        // phase 0.5  → sin(π)              = 0    → центр
        // phase 0.75 → sin(3π/2)           = -1   → левый край
        // phase 1    → sin(2π)             = 0    → центр
        //
        // Если хочешь старт с КРАЯ (как было с треугольником), сдвинь фазу на 0.25:
        //   sin(2π·(phase - 0.25)) — тогда phase=0 → -1 (левый край), phase=0.5 → +1 (правый)
        const raw = Math.sin(2 * Math.PI * (phase - 0.25));
        
        // ===== НЕЛИНЕЙНОСТЬ: smoothstep-подобная кривая на [-1..1] =====
        // Работает поверх синуса, гладко, без излома.
        // 1   = чистый синус
        // > 1 = «залипает» у краёв (дыхание)
        // < 1 = быстрее проходит края, дольше в центре (толчок)
        //
        // Формула: sign(raw) * |raw|^p — симметрично, гладко в 0 и ±1.
        let shaped = raw;
        if (easePower !== 1) {
            const p = Math.max(0.05, easePower);
            const sign = raw < 0 ? -1 : 1;
            shaped = sign * Math.pow(Math.abs(raw), p);
        }
        
        // ===== BIAS: асимметрия =====
        let shapedBiased = shaped;
        if (bias !== 0) {
            // bias как знак-зависимая степень:
            const pRight = 1 + Math.max(0, bias);
            const pLeft  = 1 + Math.max(0, -bias);
            const sign = shaped < 0 ? -1 : 1;
            const p = sign > 0 ? pRight : pLeft;
            shapedBiased = sign * Math.pow(Math.abs(shaped), p);
        }
        
        return base + shapedBiased * amp;
    }
    
    // ==================== LINKS ====================
    createLinks() {
        const container = document.getElementById('linksContainer-page3');
        if (!container) return;
        
        container.innerHTML = '';
        
        const row1 = document.createElement('div');
        row1.className = 'row-1';
        row1.style.marginBottom = '0';
        
        if (this.linksData.center) {
            row1.appendChild(this.createLinkElement(
                this.linksData.center, 'link-center',
                this.sizes.linkBig, this.sizes.borderRadiusBig
            ));
        }
        container.appendChild(row1);
        
        const row2 = document.createElement('div');
        row2.className = 'row-2';
        row2.style.gap = '0';
        
        if (this.linksData.smallLeft?.length) {
            const leftSmallGroup = document.createElement('div');
            leftSmallGroup.className = 'left-small-group';
            leftSmallGroup.style.gap = this.sizes.gap + 'px';
            leftSmallGroup.style.marginRight = this.sizes.gap + 'px';
            
            this.linksData.smallLeft.forEach(item => {
                leftSmallGroup.appendChild(this.createLinkElement(
                    item, 'small-link',
                    this.sizes.linkSmall, this.sizes.borderRadiusSmall
                ));
            });
            row2.appendChild(leftSmallGroup);
        }
        
        if (this.linksData.left) {
            const leftLink = this.createLinkElement(
                this.linksData.left, 'link-left',
                this.sizes.linkBig, this.sizes.borderRadiusBig
            );
            leftLink.style.marginRight = this.sizes.bigGap + 'px';
            row2.appendChild(leftLink);
        }
        
        if (this.linksData.right) {
            row2.appendChild(this.createLinkElement(
                this.linksData.right, 'link-right',
                this.sizes.linkBig, this.sizes.borderRadiusBig
            ));
        }
        
        if (this.linksData.smallRight?.length) {
            const rightSmallGroup = document.createElement('div');
            rightSmallGroup.className = 'right-small-group';
            rightSmallGroup.style.gap = this.sizes.gap + 'px';
            rightSmallGroup.style.marginLeft = this.sizes.gap + 'px';
            
            this.linksData.smallRight.forEach(item => {
                rightSmallGroup.appendChild(this.createLinkElement(
                    item, 'small-link',
                    this.sizes.linkSmall, this.sizes.borderRadiusSmall
                ));
            });
            row2.appendChild(rightSmallGroup);
        }
        
        container.appendChild(row2);
    }
    
    createLinkElement(data, className, size, borderRadius) {
        const link = document.createElement('a');
        
        if (data.url.includes('@') && !data.url.startsWith('http')) {
            link.href = '#';
            link.addEventListener('click', (e) => {
                e.preventDefault();
                this.showContactOverlay(data.url);
            });
        } else {
            link.href = data.url;
            link.target = '_blank';
        }
        
        link.className = className;
        link.style.width = size + 'px';
        link.style.height = size + 'px';
        link.style.borderRadius = borderRadius + 'px';
        
        const img = document.createElement('img');
        img.src = data.image;
        img.alt = 'Link';
        img.loading = 'lazy';
        
        link.appendChild(img);
        return link;
    }
    
    // ==================== FLOATING ====================
    createFloatingImages() {
        const container = document.getElementById('floatingContainer-page3');
        if (!container) return;
        
        container.innerHTML = '';
        
        const containerWidth = container.clientWidth;
        const containerHeight = container.clientHeight;
        const titleHeight = this.sizes.floatingTitleOffset;
        
        const imagePromises = this.floatingLinks.map((linkData) => {
            return new Promise((resolve) => {
                const img = new Image();
                img.onload = () => resolve({
                    ...linkData,
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                    aspectRatio: img.naturalWidth / img.naturalHeight
                });
                img.onerror = () => resolve({
                    ...linkData,
                    width: 300, height: 150, aspectRatio: 2
                });
                img.src = linkData.image;
            });
        });
        
        Promise.all(imagePromises).then((linksWithSizes) => {
            const scaledLinks = linksWithSizes.map(link => {
                let width;
                if (this.floatingSettings.SIZE_MODE === 'fixed') {
                    width = this.floatingSettings.FIXED_WIDTH || 750;
                } else {
                    width = containerWidth * (this.floatingSettings.RELATIVE_SCALE || 0.15);
                }
                width = Math.max(
                    this.floatingSettings.MIN_WIDTH || 100,
                    Math.min(this.floatingSettings.MAX_WIDTH || 500, width)
                );
                const height = width / link.aspectRatio;
                return { ...link, displayWidth: width, displayHeight: height };
            });
            
            const positions = this.generateNonOverlappingPositions(
                scaledLinks, containerWidth, containerHeight - titleHeight, titleHeight
            );
            
            scaledLinks.forEach((link, i) => {
                const pos = positions[i] || {
                    x: Math.random() * (containerWidth - link.displayWidth),
                    y: Math.random() * (containerHeight - link.displayHeight) + titleHeight
                };
                
                const linkElement = document.createElement('a');
                linkElement.href = link.url;
                linkElement.target = '_blank';
                linkElement.className = 'floating-link';
                linkElement.style.left = pos.x + 'px';
                linkElement.style.top = pos.y + 'px';
                linkElement.style.width = link.displayWidth + 'px';
                linkElement.style.height = link.displayHeight + 'px';
                linkElement.style.borderRadius = (this.floatingSettings.BORDER_RADIUS || 8) + 'px';
                
                if (this.floatingSettings.SHADOW) {
                    linkElement.style.boxShadow = `0 ${this.floatingSettings.SHADOW_SIZE || 4}px 15px rgba(0,0,0,0.2)`;
                }
                
                const img = document.createElement('img');
                img.src = link.image;
                img.alt = 'Link';
                img.loading = 'lazy';
                
                linkElement.appendChild(img);
                container.appendChild(linkElement);
            });
        });
    }
    
    generateNonOverlappingPositions(links, containerWidth, containerHeight, offsetY = 0) {
        const positions = [];
        const maxAttempts = 1000;
        
        for (let i = 0; i < links.length; i++) {
            const link = links[i];
            let attempts = 0;
            let placed = false;
            
            while (!placed && attempts < maxAttempts) {
                const x = Math.random() * (containerWidth - link.displayWidth);
                const y = Math.random() * (containerHeight - link.displayHeight) + offsetY;
                
                let overlapping = false;
                for (const pos of positions) {
                    const dx = Math.abs(pos.x - x);
                    const dy = Math.abs(pos.y - y);
                    if (dx < (this.floatingSettings.minDistance || 100) &&
                        dy < (this.floatingSettings.minDistance || 100)) {
                        overlapping = true;
                        break;
                    }
                }
                
                if (!overlapping) {
                    positions.push({ x, y });
                    placed = true;
                }
                attempts++;
            }
            
            if (!placed) {
                positions.push({
                    x: Math.random() * (containerWidth - link.displayWidth),
                    y: Math.random() * (containerHeight - link.displayHeight) + offsetY
                });
            }
        }
        return positions;
    }
    
    // ==================== CONTACT ====================
    getCurrentTheme() {
        return document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    }
    
    showContactOverlay(email) {
        const currentTheme = this.getCurrentTheme();
        
        const overlay = document.createElement('div');
        overlay.className = 'contact-overlay';
        overlay.classList.add(
            currentTheme === 'dark' ? 'contact-overlay-dark' : 'contact-overlay-light'
        );
        
        overlay.innerHTML = `
            <div class="contact-card">
                <button class="contact-close">×</button>
                <div class="contact-header">
                    <span class="contact-emoji">✉️</span>
                    <h3>Get in touch</h3>
                    <p class="contact-subtitle">Choose a topic or write your own</p>
                </div>
                <div class="contact-options">
                    <button class="contact-option" data-subject="Project Inquiry">
                        <span class="option-emoji">🎨</span>
                        <span class="option-text">Project Inquiry</span>
                        <span class="option-desc">Discuss a project or commission</span>
                    </button>
                    <button class="contact-option" data-subject="Collaboration">
                        <span class="option-emoji">🤝</span>
                        <span class="option-text">Collaboration</span>
                        <span class="option-desc">Work together on something cool</span>
                    </button>
                    <button class="contact-option" data-subject="Feedback">
                        <span class="option-emoji">💡</span>
                        <span class="option-text">Feedback</span>
                        <span class="option-desc">Share your thoughts about my work</span>
                    </button>
                    <button class="contact-option" data-subject="Just saying hi">
                        <span class="option-emoji">👋</span>
                        <span class="option-text">Just saying hi</span>
                        <span class="option-desc">No reason, just to connect</span>
                    </button>
                </div>
                <div class="contact-divider"><span>or</span></div>
                <div class="contact-custom">
                    <input type="text" id="custom-subject" placeholder="Write your own subject..." autocomplete="off">
                    <button id="send-custom" class="send-custom-btn">Send →</button>
                </div>
                <div class="contact-email-display">
                    <div class="email-label">Direct email:</div>
                    <div class="email-value">
                        <span class="email-address">${email}</span>
                        <button class="copy-email-btn" data-email="${email}">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                            Copy
                        </button>
                    </div>
                </div>
            </div>
        `;
        
        document.body.appendChild(overlay);
        requestAnimationFrame(() => overlay.classList.add('visible'));
        
        overlay.querySelector('.contact-close').addEventListener('click', () => this.closeContactOverlay(overlay));
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeContactOverlay(overlay);
        });
        
        overlay.querySelectorAll('.contact-option').forEach(option => {
            option.addEventListener('click', () => {
                this.sendMailWithSubject(email, option.dataset.subject);
                this.closeContactOverlay(overlay);
            });
        });
        
        const customSubject = overlay.querySelector('#custom-subject');
        const sendCustom = overlay.querySelector('#send-custom');
        
        const sendCustomHandler = () => {
            const subject = customSubject.value.trim();
            if (subject) {
                this.sendMailWithSubject(email, subject);
                this.closeContactOverlay(overlay);
            } else {
                customSubject.classList.add('error');
                setTimeout(() => customSubject.classList.remove('error'), 500);
            }
        };
        
        sendCustom.addEventListener('click', sendCustomHandler);
        customSubject.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') sendCustomHandler();
        });
        
        const copyBtn = overlay.querySelector('.copy-email-btn');
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(email);
            const originalText = copyBtn.innerHTML;
            copyBtn.innerHTML = `
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Copied!
            `;
            setTimeout(() => { copyBtn.innerHTML = originalText; }, 2000);
        });
    }
    
    closeContactOverlay(overlay) {
        overlay.classList.remove('visible');
        setTimeout(() => overlay.remove(), 300);
    }
    
    sendMailWithSubject(email, subject) {
        const encodedSubject = encodeURIComponent(`FROM SITE CONSTANTCHOICE: ${subject}`);
        window.location.href = `mailto:${email}?subject=${encodedSubject}`;
    }
    
    // ==================== RESIZE ====================
    onResize() {
        if (this._resizeTimeout) clearTimeout(this._resizeTimeout);
        
        this._resizeTimeout = setTimeout(() => {
            const w = window.innerWidth;
            const h = window.innerHeight;
            if (this._lastWidth === w && this._lastHeight === h) return;
            this._lastWidth = w;
            this._lastHeight = h;
            
            this.calculateScale();
            this.applyLayout();
            
            if (this._skillsRing && this._skillsRing.icons.length) {
                const newSize = this.sizes.skillIcon;
                const newRadius = this.sizes.borderRadiusBig;
                this._skillsRing.icons.forEach(({ el }) => {
                    el.style.width = newSize + 'px';
                    el.style.height = newSize + 'px';
                    el.style.borderRadius = newRadius + 'px';
                });
                
                // ===== СБРОС КЭША РАЗМЕРОВ КОЛЬЦА =====
                const r = this._skillsRing.container.getBoundingClientRect();
                this._skillsRing.width = r.width;
                this._skillsRing.height = r.height;
                // lastZ не трогаем — z-index пересчитается при следующем изменении
            } else {
                this.createSkillsIcons();
            }
            
            this.createFloatingImages();
            this.createLinks();
        }, 150);
    }
}