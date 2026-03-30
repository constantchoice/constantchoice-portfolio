class Page3Manager {
    constructor() {
        this.container = document.getElementById('page3');
        if (!this.container) return;
        
        // Загружаем все настройки
        this.layout = CONFIG.PAGE3.LAYOUT || {};
        this.sizeConfig = CONFIG.PAGE3.SIZES || {};
        this.floatingSettings = CONFIG.PAGE3.FLOATING_SETTINGS || {};
        this.floatingLinks = CONFIG.PAGE3.FLOATING_LINKS || [];
        this.skillsIcons = CONFIG.PAGE3.SKILLS_ICONS || [];
        this.linksData = CONFIG.PAGE3.LINKS || {};
        
        // Текущий масштаб
        this.scale = 1;
        
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
    
    calculateScale() {
        const containerHeight = this.container.clientHeight;
        const baseHeight = this.layout.BASE_HEIGHT || 1163;
        
        // Вычисляем масштаб относительно базовой высоты
        this.scale = Math.max(0.6, Math.min(1, containerHeight / baseHeight));
        
        // Адаптивные размеры
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
    
    applyLayout() {
        const topBlock = this.container.querySelector('.top-block');
        const middleBlock = this.container.querySelector('.middle-block');
        const bottomBlock = this.container.querySelector('.bottom-block');
        const titles = this.container.querySelectorAll('.block-title');
        
        if (!topBlock || !middleBlock || !bottomBlock) return;
        
        const containerHeight = this.container.clientHeight;
        
        // Применяем размер шрифта к заголовкам
        titles.forEach(title => {
            title.style.fontSize = this.sizes.titleFont + 'px';
            title.style.marginBottom = this.sizes.gap + 'px';
        });
        
        // ===== НИЖНИЙ БЛОК (фиксированные размеры) =====
        if (this.layout.BOTTOM_BLOCK) {
            // Отступ от низа - фиксированный процент от базовой высоты
            const bottomOffsetPercent = this.layout.BOTTOM_BLOCK.BOTTOM_OFFSET_PERCENT || 5.59;
            const bottomOffset = (bottomOffsetPercent / 100) * this.layout.BASE_HEIGHT;
            
            // Высота - фиксированный процент от базовой высоты
            const height = (this.layout.BOTTOM_BLOCK.HEIGHT_PERCENT / 100) * this.layout.BASE_HEIGHT;
            
            bottomBlock.style.bottom = bottomOffset + 'px';
            bottomBlock.style.height = height + 'px';
        }
        
        // ===== СРЕДНИЙ БЛОК (фиксированные размеры) =====
        if (this.layout.MIDDLE_BLOCK) {
            // Отступ от низа - фиксированный процент от базовой высоты
            const bottomOffsetPercent = this.layout.MIDDLE_BLOCK.BOTTOM_OFFSET_PERCENT || 32.2;
            const bottomOffset = (bottomOffsetPercent / 100) * this.layout.BASE_HEIGHT;
            
            // Высота - фиксированный процент от базовой высоты
            const height = (this.layout.MIDDLE_BLOCK.HEIGHT_PERCENT / 100) * this.layout.BASE_HEIGHT;
            
            middleBlock.style.bottom = bottomOffset + 'px';
            middleBlock.style.height = height + 'px';
        }
        
        // ===== ВЕРХНИЙ БЛОК (адаптивный) =====
        if (this.layout.TOP_BLOCK) {
            const topOffset = this.layout.TOP_BLOCK.TOP_OFFSET || 90;
            
            // Вычисляем доступное пространство между верхним отступом и средним блоком
            const middleBottom = parseFloat(middleBlock.style.bottom) || 0;
            const middleHeight = parseFloat(middleBlock.style.height) || 0;
            const bottomHeight = parseFloat(bottomBlock.style.height) || 0;
            
            // Верхняя граница среднего блока
            const middleTop = containerHeight - middleBottom - middleHeight;
            
            // Доступная высота для верхнего блока
            let availableHeight = middleTop - topOffset - this.sizes.gap * 2;
            
            // Минимальная высота верхнего блока
            const minHeight = 200;
            availableHeight = Math.max(minHeight, availableHeight);
            
            topBlock.style.top = topOffset + 'px';
            topBlock.style.height = availableHeight + 'px';
        }
    }
    
    createSkillsIcons() {
        const container = document.getElementById('skillsContainer-page3');
        if (!container) return;
        
        container.innerHTML = '';
        container.style.gap = this.sizes.gap + 'px';
        
        this.skillsIcons.forEach((iconData) => {
            const div = document.createElement('div');
            div.className = 'skill-icon';
            div.style.width = this.sizes.skillIcon + 'px';
            div.style.height = this.sizes.skillIcon + 'px';
            div.style.borderRadius = this.sizes.borderRadiusBig + 'px';
            
            const img = document.createElement('img');
            img.src = iconData.image;
            img.alt = 'Skill';
            img.loading = 'lazy';
            
            div.appendChild(img);
            container.appendChild(div);
        });
    }
    
    createLinks() {
        const container = document.getElementById('linksContainer-page3');
        if (!container) return;
        
        container.innerHTML = '';
        
        // Строка 1 - центральное изображение
        const row1 = document.createElement('div');
        row1.className = 'row-1';
        row1.style.marginBottom = '0';
        
        if (this.linksData.center) {
            const centerLink = this.createLinkElement(
                this.linksData.center,
                'link-center',
                this.sizes.linkBig,
                this.sizes.borderRadiusBig
            );
            row1.appendChild(centerLink);
        }
        
        container.appendChild(row1);
        
        // Строка 2
        const row2 = document.createElement('div');
        row2.className = 'row-2';
        row2.style.gap = '0'; // Управляем через margin
        
        // Левая группа маленьких
        if (this.linksData.smallLeft?.length) {
            const leftSmallGroup = document.createElement('div');
            leftSmallGroup.className = 'left-small-group';
            leftSmallGroup.style.gap = this.sizes.gap + 'px';
            leftSmallGroup.style.marginRight = this.sizes.gap + 'px'; // 15px от маленьких до левого большого
            
            this.linksData.smallLeft.forEach((item) => {
                const link = this.createLinkElement(
                    item,
                    'small-link',
                    this.sizes.linkSmall,
                    this.sizes.borderRadiusSmall
                );
                leftSmallGroup.appendChild(link);
            });
            
            row2.appendChild(leftSmallGroup);
        }
        
        // Левое большое
        if (this.linksData.left) {
            const leftLink = this.createLinkElement(
                this.linksData.left,
                'link-left',
                this.sizes.linkBig,
                this.sizes.borderRadiusBig
            );
            leftLink.style.marginRight = this.sizes.bigGap + 'px'; // 40px между большими
            row2.appendChild(leftLink);
        }
        
        // Правое большое
        if (this.linksData.right) {
            const rightLink = this.createLinkElement(
                this.linksData.right,
                'link-right',
                this.sizes.linkBig,
                this.sizes.borderRadiusBig
            );
            row2.appendChild(rightLink);
        }
        
        // Правая группа маленьких
        if (this.linksData.smallRight?.length) {
            const rightSmallGroup = document.createElement('div');
            rightSmallGroup.className = 'right-small-group';
            rightSmallGroup.style.gap = this.sizes.gap + 'px';
            rightSmallGroup.style.marginLeft = this.sizes.gap + 'px'; // 15px от правого большого до маленьких
            
            this.linksData.smallRight.forEach((item) => {
                const link = this.createLinkElement(
                    item,
                    'small-link',
                    this.sizes.linkSmall,
                    this.sizes.borderRadiusSmall
                );
                rightSmallGroup.appendChild(link);
            });
            
            row2.appendChild(rightSmallGroup);
        }
        
        container.appendChild(row2);
    }
    
    createLinkElement(data, className, size, borderRadius) {
        const link = document.createElement('a');
        
        // Проверяем, является ли ссылка email
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
                img.onload = () => {
                    resolve({
                        ...linkData,
                        width: img.naturalWidth,
                        height: img.naturalHeight,
                        aspectRatio: img.naturalWidth / img.naturalHeight
                    });
                };
                img.onerror = () => {
                    resolve({
                        ...linkData,
                        width: 300,
                        height: 150,
                        aspectRatio: 2
                    });
                };
                img.src = linkData.image;
            });
        });
        
        Promise.all(imagePromises).then((linksWithSizes) => {
            const scaledLinks = linksWithSizes.map(link => {
                let width;
                
                if (this.floatingSettings.sizeMode === 'fixed') {
                    width = this.floatingSettings.fixedWidth || 750;
                } else {
                    width = containerWidth * (this.floatingSettings.relativeScale || 0.15);
                }
                
                width = Math.max(
                    this.floatingSettings.minWidth || 100, 
                    Math.min(this.floatingSettings.maxWidth || 500, width)
                );
                
                const height = width / link.aspectRatio;
                
                return {
                    ...link,
                    displayWidth: width,
                    displayHeight: height
                };
            });
            
            const positions = this.generateNonOverlappingPositions(
                scaledLinks,
                containerWidth,
                containerHeight - titleHeight,
                titleHeight
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
                linkElement.style.borderRadius = (this.floatingSettings.borderRadius || 8) + 'px';
                
                if (this.floatingSettings.shadow) {
                    linkElement.style.boxShadow = `0 ${this.floatingSettings.shadowSize || 4}px 15px rgba(0,0,0,0.2)`;
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
                    
                    if (dx < (this.floatingSettings.minDistance || 100) && dy < (this.floatingSettings.minDistance || 100)) {
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

    getCurrentTheme() {
        return document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    }

    showContactOverlay(email) {
        // Получаем текущую тему
        const currentTheme = this.getCurrentTheme();
        
        // Создаём оверлей
        const overlay = document.createElement('div');
        overlay.className = 'contact-overlay';
        
        // Применяем класс темы к оверлею
        if (currentTheme === 'dark') {
            overlay.classList.add('contact-overlay-dark');
        } else {
            overlay.classList.add('contact-overlay-light');
        }
        
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
                
                <div class="contact-divider">
                    <span>or</span>
                </div>
                
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
        
        // Анимация появления
        requestAnimationFrame(() => {
            overlay.classList.add('visible');
        });
        
        // Закрытие
        const closeBtn = overlay.querySelector('.contact-close');
        closeBtn.addEventListener('click', () => this.closeContactOverlay(overlay));
        
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) this.closeContactOverlay(overlay);
        });
        
        // Обработка предустановленных тем
        const options = overlay.querySelectorAll('.contact-option');
        options.forEach(option => {
            option.addEventListener('click', () => {
                const subject = option.dataset.subject;
                this.sendMailWithSubject(email, subject);
                this.closeContactOverlay(overlay);
            });
        });
        
        // Обработка кастомной темы
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
        
        // Копирование email
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
            setTimeout(() => {
                copyBtn.innerHTML = originalText;
            }, 2000);
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
    
    onResize() {
        this.calculateScale();
        this.applyLayout();
        this.createFloatingImages();
        this.createSkillsIcons();
        this.createLinks();
    }
}