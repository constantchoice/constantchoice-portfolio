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
        this.minDistance = 300; // Мин. расстояние между проектами
        this.baseImageSize = 60; // Базовый размер изображения в пикселях

        this.branchCount = 4;           // Количество ветвей
        this.imagesPerBranch = 5;       // Максимум изображений на ветку
        this.baseRadius = 80;           // Базовый радиус для первого уровня
        this.radiusStep = 40;           // Увеличение радиуса для следующих уровней
        this.branchAngleSpread = 0.4;   // Разброс углов внутри ветки (в радианах)
    
        // Параметры коллизий
        this.collisionPadding = 10;       // Дополнительное пространство между изображениями
        
        // Инициализация Three.js
        this.initThree();
        
        // Запускаем анимацию
        this.animate();
    }
    
    initThree() {
        const width = this.galleryContainer.clientWidth;
        const height = this.galleryContainer.clientHeight;
        
        // Ортографическая камера (без перспективы)
        this.camera = new THREE.OrthographicCamera(
            -width / 2, width / 2,
            height / 2, -height / 2,
            0.1, 1000
        );
        this.camera.position.z = 500;
        this.camera.zoom = 1;
        this.camera.updateProjectionMatrix();
        
        // Сцена
        this.scene = new THREE.Scene();
        
        // Рендерер для 3D объектов (изображения)
        this.renderer = new THREE.WebGLRenderer({ 
            alpha: true,
            antialias: true 
        });
        this.renderer.setSize(width, height);
        this.renderer.setClearColor(0x000000, 0); // Прозрачный фон
        this.galleryContainer.appendChild(this.renderer.domElement);
        
        // Рендерер для HTML-элементов (названия)
        this.labelRenderer = new THREE.CSS2DRenderer();
        this.labelRenderer.setSize(width, height);
        this.labelRenderer.domElement.style.position = 'absolute';
        this.labelRenderer.domElement.style.top = '0';
        this.labelRenderer.domElement.style.left = '0';
        this.labelRenderer.domElement.style.pointerEvents = 'none'; // Сделаем события через CSS
        this.galleryContainer.appendChild(this.labelRenderer.domElement);
        
        // Обработчики событий
        this.initEvents();
    }
    
    initEvents() {
        // Zoom колесиком
        this.galleryContainer.addEventListener('wheel', (e) => {
            e.preventDefault();
            
            const zoomSpeed = 0.08;
            // direction: +1 при прокрутке вверх (приближение), -1 вниз (отдаление)
            const direction = -Math.sign(e.deltaY);
            
            // Экспоненциальное изменение
            // Умножаем на 1.1 при приближении, делим на 1.1 при отдалении
            const factor = 1 + direction * zoomSpeed;
            
            // Применяем фактор, но не даём уйти в ноль или бесконечность
            this.camera.zoom = Math.max(0.5, Math.min(25, this.camera.zoom * factor));
            
            this.camera.updateProjectionMatrix();
        });
        
        // Перетаскивание (pan)
        let isDragging = false;
        let lastX, lastY;
        
        this.galleryContainer.addEventListener('mousedown', (e) => {
            isDragging = true;
            lastX = e.clientX;
            lastY = e.clientY;
            this.galleryContainer.style.cursor = 'grabbing';
        });
        
        window.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const dx = e.clientX - lastX;
            const dy = e.clientY - lastY;
            
            this.camera.position.x -= dx / this.camera.zoom;
            this.camera.position.y += dy / this.camera.zoom;
            
            lastX = e.clientX;
            lastY = e.clientY;
        });
        
        window.addEventListener('mouseup', () => {
            isDragging = false;
            this.galleryContainer.style.cursor = 'default';
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
    
    // Добавление проекта
    addProject(projectData) {
        const { name, url, images = [] } = projectData;
        
        // Определяем платформу по URL
        const platform = this.getPlatformFromUrl(url);
        
        // ===== ДИНАМИЧЕСКОЕ ИЗМЕНЕНИЕ КОЛИЧЕСТВА ВЕТВЕЙ =====
        // Сохраняем оригинальные значения
        const originalBranchCount = this.branchCount;
        const originalImagesPerBranch = this.imagesPerBranch;
        
        // Если изображений больше 50, увеличиваем количество ветвей
        if (images.length > 50) {
            console.log(`Проект "${name}" содержит ${images.length} изображений, увеличиваем ветви до 6`);
            this.branchCount = 6;
            this.imagesPerBranch = Math.ceil(images.length / this.branchCount);
        } else {
            this.branchCount = 4;
            this.imagesPerBranch = 5;
        }
        // ===== КОНЕЦ ДИНАМИЧЕСКОГО ИЗМЕНЕНИЯ =====
        
        // Сохраняем данные
        const project = {
            name,
            url,
            platform,
            images: [],
            position: this.findFreePosition(),
            label: null,
            imageObjects: []
        };
        
        // Создаем название (кликабельное)
        const div = document.createElement('div');
        div.className = 'project-label';
        div.setAttribute('data-platform', platform);
        div.innerHTML = `<a href="${url}" target="_blank">${name}</a>`;
        
        const label = new THREE.CSS2DObject(div);
        label.position.set(project.position.x, project.position.y, 0);
        
        project.label = label;
        this.scene.add(label);
        this.labels.push(label);
        
        // Добавляем изображения
        images.forEach((imgSrc, index) => {
            this.addProjectImage(project, imgSrc, index);
        });
        
        this.projects.push(project);
        
        // Запускаем симуляцию для позиционирования
        this.runSimulation();
        
        this.branchCount = originalBranchCount;
        this.imagesPerBranch = originalImagesPerBranch;
        
        return project;
    }

    getPlatformFromUrl(url) {
        if (url.includes('behance.net')) return 'behance';
        if (url.includes('youtube.com')) return 'youtube';
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
        
        // По умолчанию
        return 'default';
    }


    // Добавляем метод для создания заглушек
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
        
        // Используем ту же логику ветвления для заглушек
        const branchIndex = index % this.branchCount;
        const positionInBranch = Math.floor(index / this.branchCount);
        const baseAngle = (branchIndex / this.branchCount) * Math.PI * 2;
        const spread = (positionInBranch - (this.imagesPerBranch - 1) / 2) * this.branchAngleSpread;
        const angle = baseAngle + spread;
        const radius = this.baseRadius + positionInBranch * this.radiusStep;
        
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
        const iterations = 15;
        const learningRate = 0.3;
        
        for (let iter = 0; iter < iterations; iter++) {
            // Оптимизация внутри веток
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
                        
                        // Разный коэффициент для изображений из одной ветки
                        const factor = (imgA.userData.branchIndex === imgB.userData.branchIndex) 
                            ? learningRate * 1.5  // Сильнее раздвигаем в одной ветке
                            : learningRate;        // Слабее между ветками
                        
                        imgA.position.x -= Math.cos(angle) * overlap * factor;
                        imgA.position.y -= Math.sin(angle) * overlap * factor;
                        imgB.position.x += Math.cos(angle) * overlap * factor;
                        imgB.position.y += Math.sin(angle) * overlap * factor;
                    }
                }
            }
        }
    }
    
    addProjectImage(project, imageSrc, index) {
        const img = new Image();
        img.src = imageSrc;
        
        img.onload = () => {
            // Определяем ветку и позицию в ветке
            const branchIndex = index % this.branchCount;
            const positionInBranch = Math.floor(index / this.branchCount);
            
            // Угол основной ветки (равномерно по кругу)
            const baseAngle = (branchIndex / this.branchCount) * Math.PI * 2;
            
            // Добавляем небольшой разброс для естественности
            const spread = (positionInBranch - (this.imagesPerBranch - 1) / 2) * this.branchAngleSpread;
            const angle = baseAngle + spread;
            
            // Радиус увеличивается с удалением от центра
            const radius = this.baseRadius + positionInBranch * this.radiusStep;
            
            // Размер уменьшается с удалением (дальше = мельче)
            const sizeMultiplier = Math.max(0.5, 1.0 - positionInBranch * 0.1);
            const baseSize = this.baseImageSize;
            const aspect = img.width / img.height;

            // Масштабируем пропорционально, сохраняя высоту = baseSize
            let height = baseSize;
            let width = baseSize * aspect;
            
            const MAX_SIZE = 100; // Максимальный размер любой стороны
            
            if (width > MAX_SIZE) {
                // Если ширина превышает лимит, масштабируем по ширине
                width = MAX_SIZE;
                height = width / aspect;
            }
            
            if (height > MAX_SIZE) {
                // Если высота превышает лимит, масштабируем по высоте
                height = MAX_SIZE;
                width = height * aspect;
            }
            
            // Минимальный размер, чтобы совсем мелкие не терялись
            const MIN_SIZE = 30;
            if (width < MIN_SIZE && height < MIN_SIZE) {
                // Если оба размера меньше минимума, увеличиваем до минимума по большей стороне
                if (aspect > 1) {
                    width = MIN_SIZE;
                    height = width / aspect;
                } else {
                    height = MIN_SIZE;
                    width = height * aspect;
                }
            }
            
            // Создаем текстуру
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
            
            // Сохраняем метаданные для анимации
            sprite.userData = {
                branchIndex,
                positionInBranch,
                baseAngle: angle,
                targetRadius: radius,
                sizeMultiplier,
                homePosition: {
                    x: project.position.x + Math.cos(angle) * radius,
                    y: project.position.y + Math.sin(angle) * radius
                }
            };
            
            // Позиционируем
            sprite.position.set(
                project.position.x + Math.cos(angle) * radius,
                project.position.y + Math.sin(angle) * radius,
                1
            );
            
            project.imageObjects.push(sprite);
            this.scene.add(sprite);
            this.images.push(sprite);
            
            // Запускаем локальную оптимизацию
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
        // Создаем невидимый HTML-элемент для обработки кликов
        // (Three.js спрайты не имеют нативных событий)
        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2();
        
        this.galleryContainer.addEventListener('click', (e) => {
            // Вычисляем позицию мыши в нормализованных координатах
            const rect = this.renderer.domElement.getBoundingClientRect();
            mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
            mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
            
            raycaster.setFromCamera(mouse, this.camera);
            
            // Проверяем пересечение со спрайтом
            const intersects = raycaster.intersectObject(sprite);
            
            if (intersects.length > 0) {
                window.open(url, '_blank');
            }
        });
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
                        
                        img.position.x += (targetX - img.position.x) * 0.1;
                        img.position.y += (targetY - img.position.y) * 0.1;
                    });
                    
                    this.optimizePositions(project);
                });
            });
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
        this.labelRenderer.render(this.scene, this.camera);
    }
}