class ProjectGallery {
    constructor(containerId = 'page2') {
        this.container = document.getElementById(containerId);
        if (!this.container) return;
        
        // Создаем контейнер для галереи
        this.galleryContainer = document.createElement('div');
        this.galleryContainer.className = 'gallery-container';
        this.container.appendChild(this.galleryContainer);
        
        // Данные проектов
        this.projects = [];
        this.labels = [];
        this.images = [];
        
        // Параметры для ветвления
        this.minDistance = 160;
        this.baseImageSize = 60;
        
        // ===== КОНФИГУРАЦИЯ ВЕТВЛЕНИЯ ПО КОЛИЧЕСТВУ ИЗОБРАЖЕНИЙ =====
        this.branchConfig = {
            1: {
                branchCount: 1,
                imagesPerBranch: 1,
                baseRadius: 0,
                radiusStep: 0,
                branchAngleSpread: 0
            },
            2: {
                branchCount: 2,
                imagesPerBranch: 1,
                baseRadius: 60,
                radiusStep: 0,
                branchAngleSpread: 0.5
            },
            3: {
                branchCount: 3,
                imagesPerBranch: 1,
                baseRadius: 70,
                radiusStep: 0,
                branchAngleSpread: 0.66
            },
            4: {
                branchCount: 4,
                imagesPerBranch: 1,
                baseRadius: 80,
                radiusStep: 0,
                branchAngleSpread: 0.7
            },
            15: {
                branchCount: 3,
                imagesPerBranch: 5,
                baseRadius: 70,
                radiusStep: 55,
                branchAngleSpread: 0.5
            },
            30: {
                branchCount: 5,
                imagesPerBranch: 6,
                baseRadius: 90,
                radiusStep: 70,
                branchAngleSpread: 0.4
            },
            60: {
                branchCount: 6,
                imagesPerBranch: 10,
                baseRadius: 90,
                radiusStep: 60,
                branchAngleSpread: 0.35
            },
            100: {
                branchCount: 6,
                imagesPerBranch: 16,
                baseRadius: 90,
                radiusStep: 55,
                branchAngleSpread: 0.35
            },
            '100+': {
                branchCount: 8,
                imagesPerBranch: 18,
                baseRadius: 90,
                radiusStep: 50,
                branchAngleSpread: 0.35
            }
        };
        
        // Текущие параметры
        this.branchCount = 4;
        this.imagesPerBranch = 5;
        this.baseRadius = 80;
        this.radiusStep = 40;
        this.branchAngleSpread = 0.4;
        
        // Параметры коллизий
        this.collisionPadding = 10;
        
        // ===== DRAG STATE =====
        this.isDragging = false;
        
        // ===== HOVER STATE =====
        this.hoveredSprite = null;
        this.hoverRaycaster = new THREE.Raycaster();
        this.hoverMouse = new THREE.Vector2();
        this.lastHoverCheck = 0;
        this.hoverCheckInterval = 30;
        
        // HTML-оверлей для линий
        this.hoverLines = document.createElement('div');
        this.hoverLines.className = 'sprite-hover-lines';
        this.hoverLines.innerHTML = `
            <div class="sprite-hover-line sprite-hover-line-top"></div>
            <div class="sprite-hover-line sprite-hover-line-bottom"></div>
        `;
        document.body.appendChild(this.hoverLines);
        
        // Инициализация Three.js
        this.initThree();
        
        // Запускаем анимацию
        this.animate();
    }

    getBranchConfig(imageCount) {
        if (imageCount === 1) return this.branchConfig[1];
        if (imageCount === 2) return this.branchConfig[2];
        if (imageCount === 3) return this.branchConfig[3];
        if (imageCount === 4) return this.branchConfig[4];
        
        if (imageCount <= 15) return this.branchConfig[15];
        if (imageCount <= 30) return this.branchConfig[30];
        if (imageCount <= 60) return this.branchConfig[60];
        if (imageCount <= 100) return this.branchConfig[100];
        return this.branchConfig['100+'];
    }
    
    applyBranchConfig(config) {
        this.branchCount = config.branchCount;
        this.imagesPerBranch = config.imagesPerBranch;
        this.baseRadius = config.baseRadius;
        this.radiusStep = config.radiusStep;
        this.branchAngleSpread = config.branchAngleSpread;
    }
    
    initThree() {
        const width = this.galleryContainer.clientWidth;
        const height = this.galleryContainer.clientHeight;
        
        this.camera = new THREE.OrthographicCamera(
            -width / 2, width / 2,
            height / 2, -height / 2,
            0.1, 1000
        );
        this.camera.position.z = 500;
        this.camera.zoom = 1;
        this.camera.updateProjectionMatrix();
        
        this.scene = new THREE.Scene();
        
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 0);
        this.galleryContainer.appendChild(this.renderer.domElement);
        
        this.labelRenderer = new THREE.CSS2DRenderer();
        this.labelRenderer.setSize(width, height);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0';
        this.labelRenderer.domElement.style.left = '0';
        this.labelRenderer.domElement.style.pointerEvents = 'none';
        this.galleryContainer.appendChild(this.labelRenderer.domElement);
        
        this.initEvents();
    }
    
    initEvents() {
        // Zoom колесиком
        this.galleryContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            const zoomSpeed = 0.08;
            const direction = -Math.sign(e.deltaY);
            const factor = 1 + direction * zoomSpeed;
            
            this.camera.zoom = Math.max(0.5, Math.min(25, this.camera.zoom * factor));
            this.camera.updateProjectionMatrix();
        });
        
        // Перетаскивание (pan)
        let lastX, lastY;
        
        this.galleryContainer.addEventListener('mousedown', (e) => {
            this.isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            this.galleryContainer.style.cursor = 'grabbing';
            
            this.clearHover();
        });
        
        window.addEventListener('mousemove', (e) => {
            if (!this.isDragging) return;
            
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            
            this.camera.position.x -= dx / this.camera.zoom;
            this.camera.position.y += dy / this.camera.zoom;
            
            lastX = e.clientX;
            lastY = e.clientY;
        });
        
        window.addEventListener('mouseup', () => {
            this.isDragging = false;
            this.galleryContainer.style.cursor = 'default';
            
            this.clearHover();
        });
        
        // ===== HOVER =====
        this.galleryContainer.addEventListener('mousemove', (e) => {
            if (this.isDragging) return;
            
            const now = performance.now();
            if (now - this.lastHoverCheck < this.hoverCheckInterval) return;
            this.lastHoverCheck = now;
            
            this.checkHover(e);
        });
        
        this.galleryContainer.addEventListener('mouseleave', () => {
            this.clearHover();
        });
        
        // Обновление размеров при ресайзе
        window.addEventListener('resize', () => {
            this.onResize();
        });
    }
    
    onResize() {
        const width = this.galleryContainer.clientWidth;
        const height = this.galleryContainer.clientHeight;
        
        this.camera.left = -width / 2;
        this.camera.right = width / 2;
        this.camera.top = height / 2;
        this.camera.bottom = -height / 2;
        this.camera.updateProjectionMatrix();
        
        this.renderer.setSize(width, height);
        this.labelRenderer.setSize(width, height);
    }
    
    // ===== HOVER =====
    checkHover(e) {
        const rect = this.renderer.domElement.getBoundingClientRect();
        this.hoverMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        this.hoverMouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
        
        this.hoverRaycaster.setFromCamera(this.hoverMouse, this.camera);
        
        const allSprites = [];
        this.projects.forEach(p => {
            p.imageObjects.forEach(s => allSprites.push(s));
        });
        
        const intersects = this.hoverRaycaster.intersectObjects(allSprites);
        
        if (intersects.length > 0) {
            const hit = intersects[0].object;
            if (this.hoveredSprite !== hit) {
                this.setHover(hit);
            } else {
                this.updateHoverPosition();
            }
        } else {
            this.clearHover();
        }
    }
    
    setHover(sprite) {
        this.hoveredSprite = sprite;
        this.updateHoverPosition();
        
        // Сброс анимации
        this.hoverLines.classList.remove('visible');
        this.hoverLines.classList.add('no-transition');
        this.hoverLines.offsetWidth; // force reflow
        this.hoverLines.classList.remove('no-transition');
        
        // Показ
        requestAnimationFrame(() => {
            this.hoverLines.classList.add('visible');
        });
        
        this.galleryContainer.style.cursor = 'pointer';
    }
    
    updateHoverPosition() {
        if (!this.hoveredSprite) return;
        
        const sprite = this.hoveredSprite;
        
        const vector = new THREE.Vector3(
            sprite.position.x,
            sprite.position.y,
            0
        );
        
        const projected = vector.clone().project(this.camera);
        
        const rect = this.renderer.domElement.getBoundingClientRect();
        
        const screenX = Math.round(rect.left + (projected.x + 1) * 0.5 * rect.width);
        const screenY = Math.round(rect.top + (-projected.y + 1) * 0.5 * rect.height);
        
        const pixelWidth = Math.round(sprite.scale.x * this.camera.zoom);
        const pixelHeight = Math.round(sprite.scale.y * this.camera.zoom);
        
        this.hoverLines.style.left = screenX + 'px';
        this.hoverLines.style.top = screenY + 'px';
        
        this.hoverLines.style.setProperty('--sprite-width', pixelWidth + 'px');
        this.hoverLines.style.setProperty('--sprite-height', pixelHeight + 'px');
    }
        
    clearHover() {
        if (!this.hoveredSprite) return;
        
        this.hoveredSprite = null;
        
        this.hoverLines.classList.remove('visible');
        
        if (!this.isDragging) {
            this.galleryContainer.style.cursor = 'default';
        }
    }
    
    // Добавление проекта
    addProject(projectData) {
        const { name, url, images = [], imagesGallery = [] } = projectData;
        const platform = this.getPlatformFromUrl(url);

        const previewImages = imagesGallery.length > 0 ? imagesGallery : images;

        const config = this.getBranchConfig(previewImages.length);
        this.applyBranchConfig(config);
        
        const projectBranchConfig = {
            branchCount: this.branchCount,
            imagesPerBranch: this.imagesPerBranch,
            baseRadius: this.baseRadius,
            radiusStep: this.radiusStep,
            branchAngleSpread: this.branchAngleSpread
        };
        
        console.log(`Проект "${name}": галерея ${previewImages.length} / всего ${images.length} изображений → ветвей: ${this.branchCount}`);
        
        const project = {
            name,
            url,
            platform,
            images: [],                    
            originalImages: images,        
            previewImages: previewImages,  
            position: this.findFreePosition(),
            label: null,
            imageObjects: [],
            branchConfig: projectBranchConfig
        };
        
        const div = document.createElement('div');
        div.className = 'project-label';
        div.setAttribute('data-platform', platform);
        div.innerHTML = `<a href="${url}" target="_blank">${name}</a>`;
        
        const label = new THREE.CSS2DObject(div);
        label.position.set(project.position.x, project.position.y, 0);
        
        project.label = label;
        this.scene.add(label);
        this.labels.push(label);
        
        previewImages.forEach((imgSrc, index) => {
            this.addProjectImage(project, imgSrc, index, projectBranchConfig);
        });
        
        this.projects.push(project);
        this.runSimulation();
        
        return project;
    }

    getPlatformFromUrl(url) {
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

    normalizeGalleryPath(path) {
        return path.replace('/preview/', '/');
    }

    createPlaceholderImage(project, index) {
        const canvas = document.createElement('canvas');
        canvas.width = 100;
        canvas.height = 100;
        const ctx = canvas.getContext('2d');
        
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
        ctx.fillStyle = colors[index % colors.length];
        ctx.fillRect(0, 0, 100, 100);
        
        ctx.fillStyle = 'white';
        ctx.font = 'bold 40px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('🖼️', 50, 50);
        
        const texture = new THREE.CanvasTexture(canvas);
        texture.generateMipmaps = false;
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        
        const material = new THREE.SpriteMaterial({ map: texture });
        const sprite = new THREE.Sprite(material);
        
        sprite.scale.set(this.baseImageSize, this.baseImageSize, 1);
        
        const config = project.branchConfig;
        const branchIndex = index % config.branchCount;
        const positionInBranch = Math.floor(index / config.branchCount);
        const baseAngle = (branchIndex / config.branchCount) * Math.PI * 2;
        const spread = (positionInBranch - (config.imagesPerBranch - 1) / 2) * config.branchAngleSpread;
        const angle = baseAngle + spread;
        const radius = config.baseRadius + positionInBranch * config.radiusStep;
        
        sprite.position.set(
            project.position.x + Math.cos(angle) * radius,
            project.position.y + Math.sin(angle) * radius,
            1
        );
        
        project.imageObjects.push(sprite);
        this.scene.add(sprite);
        this.images.push(sprite);
    }

    optimizePositions(project) {
        const iterations = 5;
        const learningRate = 0.3;
        
        for (let iter = 0; iter < iterations; iter++) {
            for (let i = 0; i < project.imageObjects.length; i++) {
                for (let j = i + 1; j < project.imageObjects.length; j++) {
                    const imgA = project.imageObjects[i];
                    const imgB = project.imageObjects[j];
                    
                    const dx = imgB.position.x - imgA.position.x;
                    const dy = imgB.position.y - imgA.position.y;
                    const distance = Math.sqrt(dx*dx + dy*dy);
                    
                    const sizeA = (imgA.scale.x + imgA.scale.y) / 2;
                    const sizeB = (imgB.scale.x + imgB.scale.y) / 2;
                    const minDistance = (sizeA + sizeB) / 2 + this.collisionPadding;
                    
                    if (distance < minDistance && distance > 0) {
                        const overlap = (minDistance - distance) / 2;
                        const angle = Math.atan2(dy, dx);
                        
                        const factor = (imgA.userData.branchIndex === imgB.userData.branchIndex) 
                            ? learningRate * 1.5
                            : learningRate;
                        
                        imgA.position.x -= Math.cos(angle) * overlap * factor;
                        imgA.position.y -= Math.sin(angle) * overlap * factor;
                        imgB.position.x += Math.cos(angle) * overlap * factor;
                        imgB.position.y += Math.sin(angle) * overlap * factor;
                    }
                }
            }
        }
    }

    warmUpSpritesBatch(batchSize = 5) {
        console.log(`🔥 Пакетный прогрев спрайтов (batch: ${batchSize})...`);
        
        const startTime = performance.now();
        
        const originalPos = this.camera.position.clone();
        const originalZoom = this.camera.zoom;
        
        let index = 0;
        const total = this.images.length;
        
        const processBatch = () => {
            if (index >= total) {
                this.camera.position.copy(originalPos);
                this.camera.zoom = originalZoom;
                this.camera.updateProjectionMatrix();
                this.renderer.render(this.scene, this.camera);
                
                const endTime = performance.now();
                const duration = (endTime - startTime) / 1000;
                console.log(`✅ Пакетный прогрев завершён за ${duration.toFixed(2)} сек`);
                console.log(`   Всего спрайтов: ${total}, рендеров: ${Math.ceil(total / batchSize)}`);
                return;
            }
            
            const end = Math.min(index + batchSize, total);
            
            const targetSprite = this.images[index];
            this.camera.position.x = targetSprite.position.x;
            this.camera.position.y = targetSprite.position.y;
            this.camera.zoom = 1;
            this.camera.updateProjectionMatrix();
            
            this.renderer.render(this.scene, this.camera);
            
            index = end;
            requestAnimationFrame(processBatch);
        };
        
        processBatch();
    }
    
    addProjectImage(project, imageSrc, index, branchConfig) {
        const img = new Image();
        img.src = imageSrc;
        
        img.onload = () => {
            const branchIndex = index % branchConfig.branchCount;
            const positionInBranch = Math.floor(index / branchConfig.branchCount);
            
            const baseAngle = (branchIndex / branchConfig.branchCount) * Math.PI * 2;
            const spread = (positionInBranch - (branchConfig.imagesPerBranch - 1) / 2) * branchConfig.branchAngleSpread;
            const angle = baseAngle + spread;
            
            const radius = branchConfig.baseRadius + positionInBranch * branchConfig.radiusStep;
            
            const baseSize = this.baseImageSize;
            const aspect = img.width / img.height;
            
            let width, height;
            
            if (aspect >= 1) {
                width = baseSize;
                height = baseSize / aspect;
            } else {
                height = baseSize;
                width = baseSize * aspect;
            }
            
            const MAX_SIZE = 100;
            if (width > MAX_SIZE) {
                width = MAX_SIZE;
                height = width / aspect;
            }
            if (height > MAX_SIZE) {
                height = MAX_SIZE;
                width = height * aspect;
            }
            
            const MIN_SIZE = 30;
            if (width < MIN_SIZE && height < MIN_SIZE) {
                if (aspect > 1) {
                    width = MIN_SIZE;
                    height = width / aspect;
                } else {
                    height = MIN_SIZE;
                    width = height * aspect;
                }
            }
            
            const texture = new THREE.CanvasTexture(img);
            texture.generateMipmaps = false;
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            
            const material = new THREE.SpriteMaterial({ 
                map: texture,
                depthTest: false,
                depthWrite: false,
                transparent: true,
                opacity: 1
            });
            
            const sprite = new THREE.Sprite(material);
            sprite.scale.set(width, height, 1);
            
            // ===== ИНДЕКС ИЩЕМ ПО FULL-ПУТИ, ИГНОРИРУЯ /preview/ =====
            const normalizedSrc = this.normalizeGalleryPath(imageSrc);
            let fullIndex = project.originalImages.indexOf(normalizedSrc);
            
            // Fallback: если по нормализованному пути не нашли — пробуем по исходному
            if (fullIndex === -1) {
                fullIndex = project.originalImages.indexOf(imageSrc);
            }
            
            const resolvedIndex = fullIndex !== -1 ? fullIndex : index;

            sprite.userData = {
                branchIndex,
                positionInBranch,
                baseAngle: angle,
                targetRadius: radius,
                sizeMultiplier: Math.max(0.5, 1.0 - positionInBranch * 0.1),
                homePosition: {
                    x: project.position.x + Math.cos(angle) * radius,
                    y: project.position.y + Math.sin(angle) * radius
                },
                isClickable: true,
                project: project,
                imageIndex: resolvedIndex
            };
            
            sprite.position.set(
                project.position.x + Math.cos(angle) * radius,
                project.position.y + Math.sin(angle) * radius,
                1
            );
            
            project.imageObjects.push(sprite);
            this.scene.add(sprite);
            this.images.push(sprite);
            this.makeSpriteClickable(sprite, project, index);
            
            setTimeout(() => {
                this.optimizePositions(project);
            }, 100);
        };
        
        img.onerror = () => {
            console.warn(`Failed to load image: ${imageSrc}`);
            this.createPlaceholderImage(project, index);
        };
    }
    
    makeImageClickable(sprite, url) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        this.galleryContainer.addEventListener('click', (e) => {
            const rect = this.renderer.domElement.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, this.camera);
            
            const intersects = raycaster.intersectObject(sprite);
            
            if (intersects.length > 0) {
                window.open(url, '_blank');
            }
        });
    }

    // ===== клик по спрайту =====
    makeSpriteClickable(sprite, project, imageIndex) {
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        if (!this._clickHandlerAdded) {
            this._clickHandlerAdded = true;
            
            this.galleryContainer.addEventListener('click', (e) => {
                const rect = this.renderer.domElement.getBoundingClientRect();
                mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
                mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
                
                raycaster.setFromCamera(mouse, this.camera);
                
                const allSprites = [];
                const spriteToProject = new Map();
                
                this.projects.forEach(p => {
                    p.imageObjects.forEach(s => {
                        allSprites.push(s);
                        spriteToProject.set(s, p);
                    });
                });
                
                const intersects = raycaster.intersectObjects(allSprites);
                
                if (intersects.length > 0) {
                    const hitSprite = intersects[0].object;
                    const hitProject = spriteToProject.get(hitSprite);
                    
                    if (hitProject) {
                        const hitIndex = hitSprite.userData.imageIndex;
                        this.openProjectCarousel(hitProject, hitIndex);
                    }
                }
            });
        }
    }

    // ===== открытие карусели =====
    openProjectCarousel(project, imageIndex) {
        const allImages = project.originalImages || [];
        
        if (allImages.length === 0) {
            console.warn('No original images found for project', project.name);
        }
        
        const params = new URLSearchParams({
            name: project.name,
            url: project.url,
            images: encodeURIComponent(JSON.stringify(allImages)),
            start: imageIndex.toString()
        });
        
        window.open(`project.html?${params.toString()}`, '_blank');
    }
    
    findFreePosition() {
        const width = this.galleryContainer.clientWidth;
        const height = this.galleryContainer.clientHeight;
        
        return {
            x: (Math.random() - 0.5) * width * 0.8,
            y: (Math.random() - 0.5) * height * 0.8
        };
    }
    
    runSimulation() {
        const nodes = this.projects.map(p => ({
            ...p.position,
            label: p.label,
            images: p.imageObjects
        }));
        
        const simulation = d3.forceSimulation(nodes)
            .force('charge', d3.forceManyBody().strength(-100))
            .force('collision', d3.forceCollide().radius(this.minDistance))
            .force('center', d3.forceCenter(0, 0).strength(0.05))
            .alphaDecay(0.01)
            .alphaMin(0.001)
            .on('tick', () => {
                nodes.forEach((node, i) => {
                    const project = this.projects[i];
                    
                    project.position.x += (node.x - project.position.x) * 0.1;
                    project.position.y += (node.y - project.position.y) * 0.1;
                    
                    if (project.label) {
                        project.label.position.x = project.position.x;
                        project.label.position.y = project.position.y;
                    }
                    
                    project.imageObjects.forEach(img => {
                        const targetX = project.position.x + 
                            Math.cos(img.userData.baseAngle) * img.userData.targetRadius;
                        const targetY = project.position.y + 
                            Math.sin(img.userData.baseAngle) * img.userData.targetRadius;
                        
                        img.position.x += (targetX - img.position.x) * 0.88;
                        img.position.y += (targetY - img.position.y) * 0.88;
                    });
                });
            });
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        // Обновляем позицию hover-линий, если спрайт под курсором
        if (this.hoveredSprite) {
            this.updateHoverPosition();
        }
        
        this.renderer.render(this.scene, this.camera);
        this.labelRenderer.render(this.scene, this.camera);
    }
}