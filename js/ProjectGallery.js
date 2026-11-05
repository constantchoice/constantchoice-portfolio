class ProjectGallery {
    constructor(containerId = 'page2') {
        this.container = document.getElementById(containerId);
        if (!this.container) return;

        this.galleryContainer = document.createElement('div');
        this.galleryContainer.className = 'gallery-container';
        this.galleryContainer.style.cssText = 'position:absolute;top:0;left:0;width:100%;height:100%;overflow:hidden;z-index:1;';
        this.container.appendChild(this.galleryContainer);

        this.projects = [];
        this.viewer = null;
        this.currentTheme = null;
        this._blurStage = null;
        this._previewsVisible = false;

        // ===== АВТОВРАЩЕНИЕ ПЛАНЕТЫ (состояние) =====
        this._autoRotateSpeed = 0;
        this._lastInteraction = 0;
        this._lastFrameTime = 0;
        this._isUserDragging = false;
        this._handler = null;

        // === НАВИГАЦИЯ ===
        this._navigating = false;
        this._navTimer = null;
        this._canvasNavListeners = null;
        this._suppressClickUntil = 0;
        this._dragStart = null;

        // Инжектим CSS для защиты навигации
        this.injectNavigationStyles();

        // ============================================================
        // ===== КОНФИГ =====
        // ============================================================
        this.config = {
            useOfflineTexture: false,
            initialCamera: { lat: 20, lng: 0, height: 25000000 },

            // ===== АВТОВРАЩЕНИЕ ПЛАНЕТЫ =====
            autoRotate: {
                enabled: true,
                speed: 0.5,
                idleDelay: 10000,
                fadeInDuration: 5000,
                fadeOutDuration: 4000,
                minHeight: 1000000,
                maxHeight: 5000000,
            },

            // ===== 3D-МОДЕЛИ =====
            models: {
                basePath: '3d/',
                heightMeters: 1000000,
                scale: 1000000000.0,
                minimumPixelSize: 0,
                maximumScale: 20000000,
                disableDepthTestDistance: true,
                rotationSpeed: 5,
                showOrientationPanel: false,
                debugAxes: false,
                debugAxesLength: 100000,
                debugAxesColor: Cesium.Color.RED,
            },

            // ===== РАЗБРОС КООРДИНАТ =====
            coordinateJitter: {
                enabled: true,
                radiusKm: 10,
            },

            // ===== РАСТАЛКИВАНИЕ МАРКЕРОВ =====
            markerSpacing: {
                enabled: false,
                padding: 8,
                iterations: 6,
                strength: 0.5,
                returnStrength: 0.15,
            },

            markerStyles: {
                base: {
                    bgColor: 'rgba(0, 0, 0, 0.55)',
                    textColor: '#ffffff',
                    borderColor: 'rgba(255, 255, 255, 0.25)',
                },
                hover: {
                    behance: 'rgba(23, 105, 255, 0.85)',
                    youtube: 'rgba(255, 0, 0, 0.85)',
                    github: 'rgba(0, 3, 51, 0.85)',
                    instagram: 'linear-gradient(45deg, rgba(255,220,128,.85), rgba(252,175,69,.85), rgba(247,119,55,.85), rgba(245,96,64,.85), rgba(253,29,29,.85), rgba(225,48,108,.85), rgba(193,53,132,.85), rgba(131,58,180,.85), rgba(88,81,219,.85), rgba(64,93,230,.85))',
                    twitter: 'rgba(20, 23, 26, 0.85)',
                    pinterest: 'rgba(230, 0, 35, 0.85)',
                    dribbble: 'rgba(234, 76, 137, 0.85)',
                    tiktok: 'rgba(0, 0, 0, 0.85)',
                    telegram: 'rgba(0, 136, 204, 0.85)',
                    gmail: 'rgba(8, 133, 27, 0.85)',
                    kavyar: 'rgba(0, 133, 255, 0.85)',
                    gumroad: 'rgba(255, 144, 232, 0.85)',
                    threads: 'rgba(0, 0, 0, 0.85)',
                    default: 'rgba(255, 255, 255, 0.3)',
                },
                hoverTextColor: '#ffffff',
            },

            previews: {
                enabled: true,
                showHeight: 53000,
                hideHeight: 56000,
                markerOffsetY: -20,
                sizeFar: 30,
                sizeNear: 300,
                nearHeight: 20,
                sizeCurve: 6.0,
                radiusFar: 50,
                radiusNear: 220,
                maxCount: 5,
                angleSpread: Math.PI * 2,
                startAngle: -Math.PI / 2,
                opacity: 0.9,
                borderRadius: 5,
                transitionMs: 250,
                hoverLineLength: 0.6,
                hoverLineColor: 'rgba(255, 130, 245, 0.7)',
                hoverLineThickness: 2,
                hoverLineGap: 8,
                hoverBorderColor: 'rgba(255, 255, 255, 0.6)',
            },

            light: {
                backgroundColor: Cesium.Color.WHITE,
                skyBox: false,
                skyAtmosphere: false,
                webglAlpha: false,
                camera: {
                    minZoomDistance: 1000,
                    maxZoomDistance: 30000000,
                    inertiaZoom: 0.8,
                    inertiaSpin: 0.9,
                    inertiaTranslate: 0.9,
                    zoomFactor: 1.0,
                },
                antialiasing: {
                    msaaSamples: 4,
                    fxaa: true,
                    resolutionScale: window.devicePixelRatio || 1.5,
                },
                imagery: {
                    brightness: 1.05,
                    contrast: 1.0,
                    gamma: 1.0,
                    hue: 0.0,
                    saturation: 1.0,
                },
                cssFilter: {
                    enabled: true,
                    brightness: 1.05,
                    contrast: 1.0,
                    saturate: 1.0,
                    hueRotate: 0,
                    sepia: 0,
                    grayscale: 0,
                    invert: 0,
                },
                atmosphere: {
                    hueShift: 0.0,
                    saturationShift: -0.1,
                    brightnessShift: 0.05,
                },
                postProcess: {
                    bloom: { enabled: true, contrast: 204.0, brightness: -0.49, glowOnly: false },
                    tonemapper: null,
                    exposure: 1.0,
                },
                // Анимация: CSS brightness (1.05 -> 1.0)
                dynamicCssBrightness: {
                    enabled: true,
                    nearHeight: 6000000,
                    nearBrightness: 1.0,
                    farHeight: 10000000,
                    farBrightness: 1.05,
                    smoothing: 0.15,
                },
                // Анимация: bloom.brightness (-0.49 -> -1.0)
                dynamicBloomBrightness: {
                    enabled: true,
                    nearHeight: 4500000,
                    nearBrightness: -1.0,
                    farHeight: 9000000,
                    farBrightness: -0.49,
                    smoothing: 0.15,
                },
            },

            dark: {
                backgroundColor: Cesium.Color.TRANSPARENT,
                skyBox: false,
                skyAtmosphere: true,
                webglAlpha: true,
                camera: {
                    minZoomDistance: 1000,
                    maxZoomDistance: 30000000,
                    inertiaZoom: 0.8,
                    inertiaSpin: 0.9,
                    inertiaTranslate: 0.9,
                    zoomFactor: 1.0,
                },
                antialiasing: {
                    msaaSamples: 4,
                    fxaa: true,
                    resolutionScale: window.devicePixelRatio || 1.5,
                },
                imagery: {
                    brightness: 0.95,
                    contrast: 1.0,
                    gamma: 1.0,
                    hue: 0.0,
                    saturation: 1.0,
                },
                cssFilter: {
                    enabled: true,
                    brightness: 1.05,
                    contrast: 1.0,
                    saturate: 0.84,
                    hueRotate: -5,
                    sepia: 0,
                    grayscale: 0,
                    invert: 0,
                },
                atmosphere: {
                    hueShift: 0.0,
                    saturationShift: -0.15,
                    brightnessShift: 0.0,
                },
                postProcess: {
                    bloom: { enabled: false, contrast: 100.0, brightness: -0.3, glowOnly: false },
                    tonemapper: null,
                    exposure: 1.0,
                },
                // Анимация: CSS contrast (1.05 -> 1.0)
                dynamicImageryContrast: {
                    enabled: true,
                    nearHeight: 1000000,
                    nearContrast: 1.0,
                    farHeight: 4000000,
                    farContrast: 1.05,
                    smoothing: 0.15,
                },
                // Анимация: Встроенная saturation (0.84 -> 0.8)
                dynamicImagerySaturation: {
                    enabled: true,
                    nearHeight: 800000,
                    nearSaturation: 0.8,
                    farHeight: 5000000,
                    farSaturation: 0.84,
                    smoothing: 0.15,
                },
            },
        };

        this.initViewer();
        this.setupThemeListener();
    }

    // === НАВИГАЦИЯ ===
    injectNavigationStyles() {
        if (document.getElementById('project-gallery-nav-styles')) return;
        const style = document.createElement('style');
        style.id = 'project-gallery-nav-styles';
        style.textContent = `
            .gallery-container.is-navigating .globe-preview,
            .gallery-container.is-navigating .globe-marker,
            .gallery-container.is-navigating .globe-preview-wrap,
            .gallery-container.is-navigating .globe-preview-line {
                pointer-events: none !important;
            }
            .globe-marker,
            .globe-preview {
                touch-action: manipulation;
            }
        `;
        document.head.appendChild(style);
    }

    // ==================== ТЕМА ====================
    getCurrentTheme() {
        return document.body.classList.contains('dark-theme') ? 'dark' : 'light';
    }
    getThemeConfig(theme) {
        return this.config[theme] || this.config.light;
    }

    setupThemeListener() {
        this.currentTheme = this.getCurrentTheme();
        this._themeObserver = new MutationObserver(() => {
            const newTheme = this.getCurrentTheme();
            if (newTheme === this.currentTheme) return;
            this.currentTheme = newTheme;
            this.rebuildViewer();
        });
        this._themeObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['class'],
        });
    }

    rebuildViewer() {
        const savedCamera = this._captureCameraState();

        // === ФИКС МИГАНИЯ: белый оверлей поверх всего перед уничтожением ===
        let cover = null;
        if (this.galleryContainer) {
            cover = document.createElement('div');
            cover.className = 'theme-fade-cover';
            const bg = this.getCurrentTheme() === 'light' ? '#ffffff' : '#2c2c2c';
            cover.style.cssText = `
                position: absolute;
                inset: 0;
                z-index: 99999;
                pointer-events: none;
                background: ${bg};
                opacity: 1;
            `;
            this.galleryContainer.appendChild(cover);
        }

        if (this.viewer) {
            try { this.viewer.destroy(); } catch (e) {}
            this.viewer = null;
        }
        this._blurStage = null;
        this._handler = null;

        // Примечание: galleryContainer.innerHTML = '' убьёт и cover, поэтому
        // НЕ очищаем всё подряд, а точечно — удаляем только канвас и оверлеи старого viewer'а.
        // Cesium создаёт свои DOM-элементы с классом .cesium-viewer, .cesium-widget и т.д.
        // Самый простой способ — удалить всё, но cover пересоздадим после.
        this.galleryContainer.innerHTML = '';
        if (cover) {
            // возвращаем cover обратно, если он был удалён вместе с innerHTML
            this.galleryContainer.appendChild(cover);
        } else {
            // на всякий случай пересоздаём
            cover = document.createElement('div');
            cover.className = 'theme-fade-cover';
            const bg = this.getCurrentTheme() === 'light' ? '#ffffff' : '#2c2c2c';
            cover.style.cssText = `
                position: absolute;
                inset: 0;
                z-index: 99999;
                pointer-events: none;
                background: ${bg};
                opacity: 1;
            `;
            this.galleryContainer.appendChild(cover);
        }

        this.projects.forEach(p => {
            p._domEl = null;
            p._previewEls = null;
            p._entity3D = null;
        });
        this._previewsVisible = false;
        this._autoRotateSpeed = 0;

        this._navigating = false;
        this._suppressClickUntil = 0;
        this._dragStart = null;
        if (this._navTimer) {
            clearTimeout(this._navTimer);
            this._navTimer = null;
        }
        this._canvasNavListeners = null;
        if (this.galleryContainer) {
            this.galleryContainer.classList.remove('is-navigating');
        }

        this.initViewer();

        if (savedCamera) {
            this._restoreCameraState(savedCamera);
        }

        this.projects.forEach(project => this.recreateMarker(project));

        // === ФИКС МИГАНИЯ: снимаем оверлей после первого рендера ===
        if (cover && this.viewer) {
            let removed = false;
            const removeCover = () => {
                if (removed) return;
                removed = true;
                // двойной rAF — гарантия, что канвас уже отрисован в DOM
                requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                        cover.style.transition = 'opacity 0.05s ease';
                        cover.style.opacity = '0';
                        setTimeout(() => {
                            if (cover.parentNode) cover.remove();
                        }, 100);
                    });
                });
            };

            // сработает после первого успешного рендера сцены
            this.viewer.scene.postRender.addEventListener(removeCover);

            // страховка: если postRender не выстрелит за 1.5с
            setTimeout(removeCover, 1500);
        }
    }

    // ==================== CESIUM VIEWER ====================
    initViewer() {
        const theme = this.currentTheme || this.getCurrentTheme();
        const tc = this.getThemeConfig(theme);
        const aa = tc.antialiasing;

        this.viewer = new Cesium.Viewer(this.galleryContainer, {
            geocoder: false, baseLayerPicker: false, homeButton: false,
            sceneModePicker: false, navigationHelpButton: false,
            animation: false, timeline: false, fullscreenButton: false,
            infoBox: false, selectionIndicator: false,

            skyBox: tc.skyBox,
            orderIndependentTranslucency: false,

            contextOptions: {
                webgl: { alpha: tc.webglAlpha, antialias: true },
                requestWebgl2: true,
            },
            msaaSamples: aa.msaaSamples,

            baseLayer: this.config.useOfflineTexture
                ? Cesium.ImageryLayer.fromProviderAsync(
                    Cesium.TileMapServiceImageryProvider.fromUrl(
                        Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII")
                    )
                )
                : new Cesium.ImageryLayer(
                    new Cesium.UrlTemplateImageryProvider({
                        url: 'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
                        credit: '© OpenStreetMap contributors',
                        maximumLevel: 19
                    })
                ),
        });

        const scene = this.viewer.scene;
        scene.skyAtmosphere.show = tc.skyAtmosphere;
        scene.backgroundColor = tc.backgroundColor;
        if (scene.sun) scene.sun.show = false;
        if (scene.moon) scene.moon.show = false;
        scene.highDynamicRange = false;

        if (tc.imagery) {
            const layer = this.viewer.imageryLayers.get(0);
            if (layer) {
                layer.brightness = tc.imagery.brightness;
                layer.contrast = tc.imagery.contrast;
                layer.gamma = tc.imagery.gamma;
                layer.hue = tc.imagery.hue;
                layer.saturation = tc.imagery.saturation;
            }
        }

        if (tc.atmosphere) {
            scene.atmosphere.hueShift = tc.atmosphere.hueShift;
            scene.atmosphere.saturationShift = tc.atmosphere.saturationShift;
            scene.atmosphere.brightnessShift = tc.atmosphere.brightnessShift;
        }

        if (tc.postProcess) {
            const pp = tc.postProcess;
            if (pp.bloom && pp.bloom.enabled) {
                const bloom = scene.postProcessStages.bloom;
                bloom.enabled = true;
                bloom.uniforms.contrast = pp.bloom.contrast;
                bloom.uniforms.brightness = pp.bloom.brightness;
                bloom.uniforms.glowOnly = pp.bloom.glowOnly;
            }
            if (pp.tonemapper && Cesium.Tonemapper[pp.tonemapper]) {
                scene.postProcessStages.tonemapper = Cesium.Tonemapper[pp.tonemapper];
            }
            if (pp.exposure !== 1.0) {
                scene.postProcessStages.exposure = pp.exposure;
            }
        }

        // Применяем статический CSS-фильтр (базовые значения)
        this._applyCssFilters(tc);

        if (aa.fxaa) scene.postProcessStages.fxaa.enabled = true;
        if (aa.resolutionScale !== 1.0) this.viewer.resolutionScale = aa.resolutionScale;

        this.applyCameraSettings(tc.camera);

        const init = this.config.initialCamera;
        this.viewer.camera.setView({
            destination: Cesium.Cartesian3.fromDegrees(init.lng, init.lat, init.height)
        });

        this._lastInteraction = performance.now() - 999999;
        this._lastFrameTime = performance.now();
        this._autoRotateSpeed = 0;
        this._isUserDragging = false;
        this._belowMinHeight = false;

        // ===== POST RENDER =====
        this.viewer.scene.postRender.addEventListener(() => {
            this.updateMarkerPositions();
            this.updateDynamicEffects(tc); // Единый метод для всех новых анимаций
            this.updatePreviewsVisibility();
            this.update3DRotation();
        });

        this.viewer.clock.onTick.addEventListener(() => {
            this.updateAutoRotate();
        });

        this.viewer.scene.camera.constrainedAxis = undefined;

        this.setupInteractionListeners();
        this.setupNavigationGuards();

        window.cesiumViewer = this.viewer;

        if (this.config.models.showOrientationPanel) {
            this.createOrientationPanel();
        }
    }

    // ==================== НОВЫЙ МЕТОД: CSS-фильтры ====================
    _applyCssFilters(tc) {
        const canvas = this.viewer.scene.canvas;
        const f = tc.cssFilter;
        
        if (f && f.enabled) {
            const parts = [];
            if (f.brightness !== 1) parts.push(`brightness(${f.brightness})`);
            if (f.contrast !== 1) parts.push(`contrast(${f.contrast})`);
            if (f.saturate !== 1) parts.push(`saturate(${f.saturate})`);
            if (f.hueRotate !== 0) parts.push(`hue-rotate(${f.hueRotate}deg)`);
            if (f.sepia !== 0) parts.push(`sepia(${f.sepia})`);
            if (f.grayscale !== 0) parts.push(`grayscale(${f.grayscale})`);
            if (f.invert !== 0) parts.push(`invert(${f.invert})`);
            canvas.style.filter = parts.join(' ') || 'none';
        } else {
            canvas.style.filter = '';
        }
    }

    // ==================== НОВЫЙ МЕТОД: Динамические эффекты ====================
    updateDynamicEffects(tc) {
        const h = this.viewer.camera.positionCartographic.height;
        const canvas = this.viewer.scene.canvas;
        const layer = this.viewer.imageryLayers.get(0);
        const pp = this.viewer.scene.postProcessStages;

        // Утилита для расчета интерполяции
        const calcT = (dyn) => {
            if (dyn.farHeight <= dyn.nearHeight) return 0;
            let t = (dyn.farHeight - h) / (dyn.farHeight - dyn.nearHeight);
            return Math.max(0, Math.min(1, t));
        };

        // 1. Светлая тема: dynamicCssBrightness
        if (tc.dynamicCssBrightness && tc.dynamicCssBrightness.enabled && canvas) {
            const dyn = tc.dynamicCssBrightness;
            const t = calcT(dyn);
            const target = dyn.farBrightness + (dyn.nearBrightness - dyn.farBrightness) * t;
            const s = dyn.smoothing ?? 0.15;
            
            // Извлекаем текущее значение из CSS
            let cur = dyn.farBrightness;
            const match = canvas.style.filter.match(/brightness\(([\d.]+)\)/);
            if (match) cur = parseFloat(match[1]);
            
            const next = cur + (target - cur) * s;
            
            // Обновляем только brightness в CSS
            let filterStr = canvas.style.filter.replace(/brightness\([\d.]+\)/, `brightness(${next})`);
            if (!filterStr.includes('brightness')) {
                filterStr = `brightness(${next}) ${filterStr}`.trim();
            }
            canvas.style.filter = filterStr;
        }

        // 2. Светлая тема: dynamicBloomBrightness
        if (tc.dynamicBloomBrightness && tc.dynamicBloomBrightness.enabled && pp && pp.bloom && pp.bloom.enabled) {
            const dyn = tc.dynamicBloomBrightness;
            const t = calcT(dyn);
            const target = dyn.farBrightness + (dyn.nearBrightness - dyn.farBrightness) * t;
            const s = dyn.smoothing ?? 0.15;
            pp.bloom.uniforms.brightness += (target - pp.bloom.uniforms.brightness) * s;
        }

        // 3. Тёмная тема: dynamicImageryContrast (CSS)
        if (tc.dynamicImageryContrast && tc.dynamicImageryContrast.enabled && canvas) {
            const dyn = tc.dynamicImageryContrast;
            const t = calcT(dyn);
            const target = dyn.farContrast + (dyn.nearContrast - dyn.farContrast) * t;
            const s = dyn.smoothing ?? 0.15;
            
            let cur = dyn.farContrast;
            const match = canvas.style.filter.match(/contrast\(([\d.]+)\)/);
            if (match) cur = parseFloat(match[1]);
            
            const next = cur + (target - cur) * s;
            
            let filterStr = canvas.style.filter.replace(/contrast\([\d.]+\)/, `contrast(${next})`);
            if (!filterStr.includes('contrast')) {
                filterStr = `contrast(${next}) ${filterStr}`.trim();
            }
            canvas.style.filter = filterStr;
        }

        // 4. Тёмная тема: dynamicImagerySaturation (Cesium WebGL)
        if (tc.dynamicImagerySaturation && tc.dynamicImagerySaturation.enabled && layer) {
            const dyn = tc.dynamicImagerySaturation;
            const t = calcT(dyn);
            const target = dyn.farSaturation + (dyn.nearSaturation - dyn.farSaturation) * t;
            const s = dyn.smoothing ?? 0.15;
            layer.saturation += (target - layer.saturation) * s;
        }
    }

    // ==================== СЛУШАТЕЛИ ЧЕРЕЗ CESIUM ====================
    setupInteractionListeners() {
        const canvas = this.viewer.scene.canvas;

        if (this._handler) {
            this._handler.destroy();
        }

        this._handler = new Cesium.ScreenSpaceEventHandler(canvas);

        this._handler.setInputAction(() => {
            this._isUserDragging = true;
            this._lastInteraction = performance.now();
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

        this._handler.setInputAction(() => {
            this._isUserDragging = false;
            this._lastInteraction = performance.now();
        }, Cesium.ScreenSpaceEventType.LEFT_UP);

        this._handler.setInputAction(() => {
            if (this._isUserDragging) {
                this._lastInteraction = performance.now();
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        this._handler.setInputAction(() => {
            this._isUserDragging = true;
            this._lastInteraction = performance.now();
        }, Cesium.ScreenSpaceEventType.RIGHT_DOWN);

        this._handler.setInputAction(() => {
            this._isUserDragging = false;
            this._lastInteraction = performance.now();
        }, Cesium.ScreenSpaceEventType.RIGHT_UP);

        this._handler.setInputAction(() => {
            this._lastInteraction = performance.now();
        }, Cesium.ScreenSpaceEventType.WHEEL);

        this._handler.setInputAction(() => {
            this._isUserDragging = true;
            this._lastInteraction = performance.now();
        }, Cesium.ScreenSpaceEventType.LEFT_DOWN);

        this._handler.setInputAction(() => {
            this._lastInteraction = performance.now();
        }, Cesium.ScreenSpaceEventType.PINCH_START);

        this._handler.setInputAction(() => {
            this._lastInteraction = performance.now();
        }, Cesium.ScreenSpaceEventType.PINCH_END);
    }

    // === НАВИГАЦИЯ ===
    setupNavigationGuards() {
        const canvas = this.viewer?.scene?.canvas;
        if (!canvas) return;

        if (this._canvasNavListeners) {
            const old = this._canvasNavListeners;
            canvas.removeEventListener('wheel', old.wheel);
            canvas.removeEventListener('pointerdown', old.pointerdown);
            canvas.removeEventListener('pointermove', old.pointermove);
            canvas.removeEventListener('pointerup', old.pointerup);
            canvas.removeEventListener('touchstart', old.touchstart);
            canvas.removeEventListener('touchmove', old.touchmove);
            this._canvasNavListeners = null;
        }

        const beginNav = () => {
            this._navigating = true;
            this.galleryContainer.classList.add('is-navigating');
            clearTimeout(this._navTimer);
            this._navTimer = setTimeout(() => {
                this._navigating = false;
                this.galleryContainer.classList.remove('is-navigating');
            }, 250);
        };

        const wheel = () => beginNav();

        const pointerdown = (e) => {
            if (e.button === 0 || e.button === 2) {
                this._dragStart = { x: e.clientX, y: e.clientY };
            }
            beginNav();
        };

        const pointermove = (e) => {
            if (e.buttons !== 0) beginNav();
        };

        const pointerup = (e) => {
            if (this._dragStart) {
                const dx = e.clientX - this._dragStart.x;
                const dy = e.clientY - this._dragStart.y;
                const dist = Math.hypot(dx, dy);
                if (dist > 5) {
                    this._suppressClickUntil = performance.now() + 150;
                }
                this._dragStart = null;
            }
            beginNav();
        };

        const touchstart = () => beginNav();
        const touchmove = () => beginNav();

        canvas.addEventListener('wheel', wheel, { passive: true });
        canvas.addEventListener('pointerdown', pointerdown, { passive: true });
        canvas.addEventListener('pointermove', pointermove, { passive: true });
        canvas.addEventListener('pointerup', pointerup, { passive: true });
        canvas.addEventListener('touchstart', touchstart, { passive: true });
        canvas.addEventListener('touchmove', touchmove, { passive: true });

        this._canvasNavListeners = { wheel, pointerdown, pointermove, pointerup, touchstart, touchmove };
    }

    forwardWheelToCanvas(e) {
        const canvas = this.viewer?.scene?.canvas;
        if (!canvas) return;
        const evt = new WheelEvent('wheel', {
            deltaX: e.deltaX,
            deltaY: e.deltaY,
            deltaZ: e.deltaZ,
            deltaMode: e.deltaMode,
            clientX: e.clientX,
            clientY: e.clientY,
            screenX: e.screenX,
            screenY: e.screenY,
            ctrlKey: e.ctrlKey,
            shiftKey: e.shiftKey,
            altKey: e.altKey,
            metaKey: e.metaKey,
            bubbles: false,
            cancelable: true,
        });
        canvas.dispatchEvent(evt);
    }

    // ==================== АВТОВРАЩЕНИЕ ПЛАНЕТЫ ====================
    updateAutoRotate() {
        const cfg = this.config.autoRotate;
        if (!cfg || !cfg.enabled) return;

        const now = performance.now();
        const dt = Math.min((now - this._lastFrameTime) / 1000, 0.1);
        this._lastFrameTime = now;

        if (this._isUserDragging) {
            this._autoRotateSpeed = 0;
            return;
        }

        const camHeight = this.viewer.camera.positionCartographic.height;

        if (camHeight < cfg.minHeight) {
            this._belowMinHeight = true;
        } else if (camHeight > cfg.maxHeight) {
            this._belowMinHeight = false;
        }

        if (this._belowMinHeight) {
            this._autoRotateSpeed = 0;
            return;
        }

        const timeSinceInteraction = now - this._lastInteraction;
        const targetSpeed = timeSinceInteraction > cfg.idleDelay ? cfg.speed : 0;

        const current = this._autoRotateSpeed;
        const diff = targetSpeed - current;

        if (Math.abs(diff) < 0.001) {
            this._autoRotateSpeed = targetSpeed;
        } else if (targetSpeed > current) {
            const accel = cfg.speed / (cfg.fadeInDuration / 1000);
            this._autoRotateSpeed = Math.min(targetSpeed, current + accel * dt);
        } else {
            const decel = cfg.speed / (cfg.fadeOutDuration / 1000);
            this._autoRotateSpeed = Math.max(targetSpeed, current - decel * dt);
        }

        if (this._autoRotateSpeed === 0) return;

        const deltaRad = Cesium.Math.toRadians(this._autoRotateSpeed * dt);
        this.viewer.camera.rotate(Cesium.Cartesian3.UNIT_Z, deltaRad);
    }

    // ==================== ВРАЩЕНИЕ 3D-МОДЕЛЕЙ ====================
    update3DRotation() {
        const mc = this.config.models;
        const speed = mc.rotationSpeed ?? 0;
        if (speed === 0) return;

        const now = Cesium.JulianDate.now();
        const t = now.secondsOfDay;

        this.projects.forEach(project => {
            if (!project._entity3D) return;
            const pos = project._entity3D.position.getValue(now);
            if (!pos) return;

            const heading = Cesium.Math.toRadians((t * speed) % 360);
            const hpr = new Cesium.HeadingPitchRoll(heading, 0, 0);
            project._entity3D.orientation = Cesium.Transforms.headingPitchRollQuaternion(pos, hpr);
        });
    }

    // ==================== ПАНЕЛЬ ОРИЕНТАЦИИ ====================
    createOrientationPanel() {
        const old = document.getElementById('orientation-panel');
        if (old) old.remove();

        const panel = document.createElement('div');
        panel.id = 'orientation-panel';
        panel.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            background: rgba(20, 20, 20, 0.92);
            color: #fff;
            padding: 16px;
            border-radius: 12px;
            font-family: 'Inter', system-ui, sans-serif;
            font-size: 12px;
            width: 280px;
            box-shadow: 0 8px 32px rgba(0,0,0,0.4);
            border: 1px solid rgba(255,255,255,0.1);
            backdrop-filter: blur(12px);
        `;

        panel.innerHTML = `
            <div style="font-weight:600;margin-bottom:12px;font-size:13px;">🎯 Ориентация</div>
            <div style="margin-bottom:10px;">
                <label style="display:flex;justify-content:space-between;"><span>Heading</span><span id="val-heading">0°</span></label>
                <input type="range" id="slider-heading" min="-180" max="180" step="1" value="0" style="width:100%;">
            </div>
            <div style="margin-bottom:10px;">
                <label style="display:flex;justify-content:space-between;"><span>Pitch</span><span id="val-pitch">0°</span></label>
                <input type="range" id="slider-pitch" min="-180" max="180" step="1" value="0" style="width:100%;">
            </div>
            <div style="margin-bottom:12px;">
                <label style="display:flex;justify-content:space-between;"><span>Roll</span><span id="val-roll">0°</span></label>
                <input type="range" id="slider-roll" min="-180" max="180" step="1" value="0" style="width:100%;">
            </div>
            <button id="copy-orientation" style="width:100%;padding:8px;background:#4CAF50;color:#fff;border:none;border-radius:8px;cursor:pointer;">📋 Скопировать</button>
            <div id="orientation-output" style="margin-top:10px;padding:8px;background:rgba(0,0,0,0.3);border-radius:6px;font-family:monospace;font-size:10px;color:#999;white-space:pre-wrap;"></div>
        `;

        document.body.appendChild(panel);

        const updateModel = () => {
            const h = parseFloat(document.getElementById('slider-heading').value);
            const p = parseFloat(document.getElementById('slider-pitch').value);
            const r = parseFloat(document.getElementById('slider-roll').value);

            document.getElementById('val-heading').textContent = h + '°';
            document.getElementById('val-pitch').textContent = p + '°';
            document.getElementById('val-roll').textContent = r + '°';

            this.projects.forEach(project => {
                if (!project._entity3D) return;
                const pos = project._entity3D.position.getValue(Cesium.JulianDate.now());
                if (!pos) return;
                const hpr = new Cesium.HeadingPitchRoll(
                    Cesium.Math.toRadians(h),
                    Cesium.Math.toRadians(p),
                    Cesium.Math.toRadians(r)
                );
                project._entity3D.orientation = Cesium.Transforms.headingPitchRollQuaternion(pos, hpr);
            });
        };

        ['heading', 'pitch', 'roll'].forEach(id => {
            document.getElementById('slider-' + id).addEventListener('input', updateModel);
        });

        document.getElementById('copy-orientation').addEventListener('click', () => {
            const h = document.getElementById('slider-heading').value;
            const p = document.getElementById('slider-pitch').value;
            const r = document.getElementById('slider-roll').value;
            const code = `headingDeg: ${h},\npitchDeg: ${p},\nrollDeg: ${r},`;
            navigator.clipboard.writeText(code).then(() => {
                document.getElementById('orientation-output').textContent = '✅ ' + code;
            });
        });
    }

    // ==================== ПРЕВЬЮ ====================
    updatePreviewsVisibility() {
        const cfg = this.config.previews;
        if (!cfg || !cfg.enabled) return;

        const camHeight = this.viewer.camera.positionCartographic.height;

        let shouldShow = this._previewsVisible;
        if (!shouldShow && camHeight < cfg.showHeight) shouldShow = true;
        if (shouldShow && camHeight > cfg.hideHeight) shouldShow = false;

        if (shouldShow !== this._previewsVisible) {
            this._previewsVisible = shouldShow;
            if (shouldShow) this.projects.forEach(p => this.showPreviews(p));
            else this.projects.forEach(p => this.hidePreviews(p));
        }

        if (this._previewsVisible) {
            this.updatePreviewsScale(camHeight);
        }
    }

    updatePreviewsScale(camHeight) {
        const cfg = this.config.previews;

        let t;
        const farH = cfg.showHeight;
        const nearH = cfg.nearHeight;
        if (farH <= nearH) t = 0;
        else {
            t = (farH - camHeight) / (farH - nearH);
            t = Math.max(0, Math.min(1, t));
        }

        const curve = cfg.sizeCurve ?? 1.0;
        t = Math.pow(t, curve);

        const radius = cfg.radiusFar + (cfg.radiusNear - cfg.radiusFar) * t;
        const baseSize = cfg.sizeFar + (cfg.sizeNear - cfg.sizeFar) * t;

        for (const project of this.projects) {
            if (!project._previewEls) continue;
            for (const item of project._previewEls) {
                const { wrap, img, angle } = item;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                wrap.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;

                const aspect = parseFloat(wrap.dataset.aspect) || 1;
                let w, h;
                if (aspect >= 1) { w = baseSize; h = baseSize / aspect; }
                else { h = baseSize; w = baseSize * aspect; }
                img.style.width = w + 'px';
                img.style.height = h + 'px';
            }
        }
    }

    showPreviews(project) {
        if (project._previewEls) return;
        const cfg = this.config.previews;
        const images = project.previewImages || [];
        if (images.length === 0) return;

        const count = Math.min(images.length, cfg.maxCount);
        const els = [];

        for (let i = 0; i < count; i++) {
            const angle = cfg.startAngle + (i / count) * cfg.angleSpread;

            const wrap = document.createElement('div');
            wrap.className = 'globe-preview-wrap';
            wrap.style.cssText = `
                position: absolute;
                pointer-events: none;
                opacity: 0;
                transition: opacity ${cfg.transitionMs}ms ease;
                z-index: 5;
            `;

            const img = document.createElement('div');
            img.className = 'globe-preview';
            img.style.cssText = `
                position: relative;
                width: ${cfg.sizeFar}px;
                height: ${cfg.sizeFar}px;
                border-radius: ${cfg.borderRadius}px;
                overflow: hidden;
                pointer-events: auto;
                cursor: pointer;
                border: 1px solid rgba(255, 255, 255, 0.15);
                transition: border-color 0.2s ease;
            `;

            const inner = document.createElement('img');
            inner.src = images[i];
            inner.style.cssText = `width:100%;height:100%;object-fit:cover;display:block;`;
            img.appendChild(inner);

            const lineTop = document.createElement('div');
            lineTop.className = 'globe-preview-line';
            lineTop.style.cssText = `
                position: absolute; left: 50%; top: ${-cfg.hoverLineGap}px;
                height: ${cfg.hoverLineThickness}px; width: 0;
                background: ${cfg.hoverLineColor}; border-radius: 999px;
                transform: translateX(-50%); transition: width 0.25s ease;
                pointer-events: none;
            `;

            const lineBot = document.createElement('div');
            lineBot.className = 'globe-preview-line';
            lineBot.style.cssText = `
                position: absolute; left: 50%; bottom: ${-cfg.hoverLineGap}px;
                height: ${cfg.hoverLineThickness}px; width: 0;
                background: ${cfg.hoverLineColor}; border-radius: 999px;
                transform: translateX(-50%); transition: width 0.25s ease;
                pointer-events: none;
            `;

            wrap.appendChild(lineTop);
            wrap.appendChild(img);
            wrap.appendChild(lineBot);

            img.addEventListener('mouseenter', () => {
                if (this._navigating) return;
                img.style.borderColor = cfg.hoverBorderColor;
                const w = img.offsetWidth * cfg.hoverLineLength;
                lineTop.style.width = w + 'px';
                lineBot.style.width = w + 'px';
            });

            img.addEventListener('mouseleave', () => {
                img.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                lineTop.style.width = '0px';
                lineBot.style.width = '0px';
            });

            img.addEventListener('click', (e) => {
                e.stopPropagation();
                if (performance.now() < this._suppressClickUntil) return;
                const originalIndex = this.resolveOriginalIndex(project, i);
                this.openProjectCarousel(project, originalIndex);
            });

            img.addEventListener('wheel', (e) => {
                this.forwardWheelToCanvas(e);
            }, { passive: true });

            wrap.addEventListener('wheel', (e) => {
                this.forwardWheelToCanvas(e);
            }, { passive: true });

            img.addEventListener('pointerdown', (e) => {
                if (this._navigating) {
                    e.preventDefault();
                    e.stopPropagation();
                }
            }, { passive: false });

            this.galleryContainer.appendChild(wrap);

            const probe = new Image();
            probe.onload = () => {
                const aspect = probe.naturalWidth / probe.naturalHeight;
                wrap.dataset.aspect = aspect;
                const rect = img.getBoundingClientRect();
                let w, h;
                if (aspect >= 1) { w = rect.width; h = rect.width / aspect; }
                else { h = rect.height; w = rect.height * aspect; }
                img.style.width = w + 'px';
                img.style.height = h + 'px';
            };
            probe.src = images[i];

            els.push({ wrap, img, lineTop, lineBot, angle });
        }

        project._previewEls = els;

        requestAnimationFrame(() => {
            els.forEach(({ wrap }) => { wrap.style.opacity = cfg.opacity; });
        });
    }

    hidePreviews(project) {
        if (!project._previewEls) return;
        const cfg = this.config.previews;
        const els = project._previewEls;

        els.forEach(({ wrap }) => { wrap.style.opacity = 0; });

        setTimeout(() => {
            els.forEach(({ wrap }) => wrap.remove());
        }, cfg.transitionMs);

        project._previewEls = null;
    }

    // ==================== ИНДЕКС КАРТИНКИ ====================
    resolveOriginalIndex(project, previewIndex) {
        const previews = project.previewImages || [];
        const originals = project.originalImages || [];
        const previewPath = previews[previewIndex];
        if (!previewPath) return 0;

        let idx = originals.indexOf(previewPath);
        if (idx !== -1) return idx;

        const normalized = previewPath.replace('/preview/', '/');
        idx = originals.indexOf(normalized);
        if (idx !== -1) return idx;

        const filename = previewPath.split('/').pop();
        idx = originals.findIndex(p => p.endsWith('/' + filename) || p === filename);
        if (idx !== -1) return idx;

        return 0;
    }

    // ==================== DEBUG AXES ====================
    createDebugAxes(project) {
        const mc = this.config.models;
        if (!mc.debugAxes) return;

        const height = mc.heightMeters ?? 0;
        const len = mc.debugAxesLength ?? 100000;
        const color = mc.debugAxesColor ?? Cesium.Color.RED;

        const pos = Cesium.Cartesian3.fromDegrees(project.lng, project.lat, height);

        this.viewer.entities.add({
            position: pos,
            point: {
                pixelSize: 12, color: Cesium.Color.RED,
                outlineColor: Cesium.Color.WHITE, outlineWidth: 2,
                disableDepthTestDistance: Number.POSITIVE_INFINITY,
            }
        });

        this.viewer.entities.add({
            polyline: {
                positions: [pos, Cesium.Cartesian3.fromDegrees(project.lng + 1, project.lat, height)],
                width: 4, material: color, arcType: Cesium.ArcType.NONE,
            }
        });
        this.viewer.entities.add({
            polyline: {
                positions: [pos, Cesium.Cartesian3.fromDegrees(project.lng, project.lat + 1, height)],
                width: 4, material: color, arcType: Cesium.ArcType.NONE,
            }
        });
        this.viewer.entities.add({
            polyline: {
                positions: [pos, Cesium.Cartesian3.fromDegrees(project.lng, project.lat, height + len)],
                width: 4, material: color, arcType: Cesium.ArcType.NONE,
            }
        });
    }

    // ==================== 3D-МОДЕЛИ ====================
    create3DMarker(project) {
        if (!project.modelUrl) return;

        const mc = this.config.models;
        const path = mc.basePath + project.modelUrl;
        const heightMeters = mc.heightMeters ?? 0;

        const position = Cesium.Cartesian3.fromDegrees(project.lng, project.lat, heightMeters);

        this.createDebugAxes(project);

        const entity = this.viewer.entities.add({
            name: project.name,
            position: position,
            model: {
                uri: path,
                scale: mc.scale ?? 1.0,
                minimumPixelSize: mc.minimumPixelSize ?? 0,
                maximumScale: mc.maximumScale ?? 20000,
                heightReference: Cesium.HeightReference.NONE,
                disableDepthTestDistance: mc.disableDepthTestDistance
                    ? Number.POSITIVE_INFINITY : 0,
            },
            description: project.name,
        });

        project._entity3D = entity;

        const model = entity.model;
        if (model && model.readyPromise) {
            model.readyPromise
                .then(() => {
                    console.log(`[3D] ✅ Модель загружена: ${path}`);
                })
                .catch((err) => {
                    console.error(`[3D] ❌ Ошибка: ${path}`, err);
                });
        }
    }

    recreateMarker(project) {
        this.createMarkerElement(project);
        if (project.modelUrl) {
            this.create3DMarker(project);
        }
    }

    // ==================== МАРКЕРЫ (HTML) ====================
    updateMarkerPositions() {
        if (!this.projects.length) return;
        const scene = this.viewer.scene;
        const camera = scene.camera;

        for (const project of this.projects) {
            if (!project._domEl) continue;

            const position = Cesium.Cartesian3.fromDegrees(project.lng, project.lat, 0);
            const occluder = new Cesium.EllipsoidalOccluder(Cesium.Ellipsoid.WGS84, camera.position);
            const isVisible = occluder.isPointVisible(position);

            if (!isVisible) {
                project._domEl.classList.add('hidden');
                if (project._previewEls) project._previewEls.forEach(({ wrap }) => wrap.style.display = 'none');
                continue;
            }

            const screenPos = Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, position);
            if (!screenPos) {
                project._domEl.classList.add('hidden');
                if (project._previewEls) project._previewEls.forEach(({ wrap }) => wrap.style.display = 'none');
                continue;
            }

            project._domEl.classList.remove('hidden');
            project._domEl.style.left = screenPos.x + 'px';
            project._domEl.style.top = (screenPos.y + (this.config.previews.markerOffsetY || 0)) + 'px';

            if (project._previewEls) {
                project._previewEls.forEach(({ wrap }) => {
                    wrap.style.display = 'block';
                    wrap.style.left = screenPos.x + 'px';
                    wrap.style.top = screenPos.y + 'px';
                });
            }
        }

        this.resolveMarkerCollisions();
    }

    resolveMarkerCollisions() {
        const cfg = this.config.markerSpacing;
        if (!cfg || !cfg.enabled) return;

        const items = [];
        for (const project of this.projects) {
            const el = project._domEl;
            if (!el || el.classList.contains('hidden')) continue;
            const rect = el.getBoundingClientRect();
            if (rect.width === 0 || rect.height === 0) continue;

            const curLeft = parseFloat(el.style.left) || 0;
            const curTop = parseFloat(el.style.top) || 0;

            items.push({
                project, el, x: curLeft, y: curTop,
                hw: rect.width / 2 + cfg.padding,
                hh: rect.height / 2 + cfg.padding,
                homeX: curLeft, homeY: curTop,
            });
        }

        if (items.length < 2) return;

        for (let iter = 0; iter < cfg.iterations; iter++) {
            for (let i = 0; i < items.length; i++) {
                for (let j = i + 1; j < items.length; j++) {
                    const a = items[i], b = items[j];
                    const dx = b.x - a.x, dy = b.y - a.y;
                    const overlapX = a.hw + b.hw - Math.abs(dx);
                    const overlapY = a.hh + b.hh - Math.abs(dy);
                    if (overlapX <= 0 || overlapY <= 0) continue;

                    let signX = dx >= 0 ? 1 : -1;
                    let signY = dy >= 0 ? 1 : -1;
                    if (Math.abs(dx) < 0.001 && Math.abs(dy) < 0.001) {
                        signX = Math.random() < 0.5 ? -1 : 1;
                        signY = Math.random() < 0.5 ? -1 : 1;
                    }

                    const pushX = (overlapX / 2 + 0.5) * cfg.strength * signX;
                    const pushY = (overlapY / 2 + 0.5) * cfg.strength * signY;
                    a.x -= pushX; b.x += pushX;
                    a.y -= pushY; b.y += pushY;
                }
            }
        }

        const returnStrength = cfg.returnStrength ?? 0.15;
        for (const it of items) {
            it.x += (it.homeX - it.x) * returnStrength;
            it.y += (it.homeY - it.y) * returnStrength;
            it.el.style.left = it.x + 'px';
            it.el.style.top = it.y + 'px';
            if (it.project._previewEls) {
                it.project._previewEls.forEach(({ wrap }) => {
                    wrap.style.left = it.x + 'px';
                    wrap.style.top = it.y + 'px';
                });
            }
        }
    }

    createMarkerElement(project) {
        const styles = this.config.markerStyles;
        const base = styles.base;
        const hoverColor = styles.hover[project.platform] || styles.hover.default;

        const el = document.createElement('div');
        el.className = 'globe-marker';
        el.setAttribute('data-platform', project.platform);
        el.textContent = project.name;

        el.style.backgroundColor = base.bgColor;
        el.style.color = base.textColor;
        el.style.border = `1px solid ${base.borderColor}`;
        el.style.display = 'block';

        el.addEventListener('mouseenter', () => {
            if (this._navigating) return;
            if (hoverColor.startsWith('linear-gradient')) el.style.background = hoverColor;
            else el.style.backgroundColor = hoverColor;
            el.style.color = styles.hoverTextColor;
            el.style.borderColor = 'rgba(255, 255, 255, 0.5)';
            el.style.transform = 'translate(-50%, -50%) scale(1.08)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.background = base.bgColor;
            el.style.backgroundColor = base.bgColor;
            el.style.color = base.textColor;
            el.style.borderColor = base.borderColor;
            el.style.transform = 'translate(-50%, -50%) scale(1)';
        });
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            if (performance.now() < this._suppressClickUntil) return;

            if (project.url) {
                window.open(project.url, '_blank', 'noopener,noreferrer');
            } else {
                this.openProjectCarousel(project, 0);
            }
        });

        el.addEventListener('wheel', (e) => {
            this.forwardWheelToCanvas(e);
        }, { passive: true });

        el.addEventListener('pointerdown', (e) => {
            if (this._navigating) {
                e.preventDefault();
                e.stopPropagation();
            }
        }, { passive: false });

        this.galleryContainer.appendChild(el);
        project._domEl = el;
        project._previewEls = null;
    }

    // ==================== КАМЕРА ====================
    applyCameraSettings(cam) {
        const controller = this.viewer.scene.screenSpaceCameraController;
        controller.minimumZoomDistance = cam.minZoomDistance;
        controller.maximumZoomDistance = cam.maxZoomDistance;
        controller.inertiaZoom = cam.inertiaZoom;
        controller.inertiaSpin = cam.inertiaSpin;
        controller.inertiaTranslate = cam.inertiaTranslate;

        if (cam.zoomFactor !== 1.0) {
            const canvas = this.viewer.scene.canvas;
            canvas.addEventListener('wheel', (e) => {
                e.deltaY = e.deltaY / cam.zoomFactor;
            }, { passive: true });
        }
    }

    // ==================== СОХРАНЕНИЕ / ВОССТАНОВЛЕНИЕ КАМЕРЫ ====================
    _captureCameraState() {
        if (!this.viewer) return null;
        try {
            const camera = this.viewer.camera;
            return {
                position: Cesium.Cartesian3.clone(camera.positionWC),
                direction: Cesium.Cartesian3.clone(camera.directionWC),
                up: Cesium.Cartesian3.clone(camera.upWC),
            };
        } catch (e) {
            return null;
        }
    }

    _restoreCameraState(state) {
        if (!this.viewer || !state) return;
        try {
            const camera = this.viewer.camera;
            camera.setView({
                destination: state.position,
                orientation: {
                    direction: state.direction,
                    up: state.up,
                },
            });
            this.viewer.scene.requestRender();
        } catch (e) {}
    }

    // ==================== РАЗБРОС КООРДИНАТ ====================
    getRandomOffset(radiusKm, lat) {
        const latDegPerKm = 1 / 111.32;
        const lngDegPerKm = 1 / (111.32 * Math.cos(lat * Math.PI / 180));

        const angle = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * radiusKm;

        return {
            dLat: r * Math.cos(angle) * latDegPerKm,
            dLng: r * Math.sin(angle) * lngDegPerKm,
        };
    }

    // ==================== ПРОЕКТЫ ====================
    addProject(projectData) {
        const { name, url, imagesGallery = [], images = [] } = projectData;
        const lat = projectData.lat ?? (Math.random() - 0.5) * 120;
        const lng = projectData.lng ?? (Math.random() - 0.5) * 360;
        const platform = this.getPlatformFromUrl(url);
        const preview = imagesGallery.length > 0 ? imagesGallery : images;

        let finalLat = lat;
        let finalLng = lng;

        const jitterCfg = this.config.coordinateJitter;
        if (jitterCfg && jitterCfg.enabled) {
            const { dLat, dLng } = this.getRandomOffset(jitterCfg.radiusKm || 10, lat);
            finalLat = lat + dLat;
            finalLng = lng + dLng;
        }

        const project = {
            name, url, platform,
            lat: finalLat,
            lng: finalLng,
            modelUrl: projectData.modelUrl || null,
            previewImages: preview,
            originalImages: images,
            _domEl: null,
            _previewEls: null,
            _entity3D: null,
        };

        this.recreateMarker(project);
        this.projects.push(project);
        return project;
    }

    // ==================== ВСПОМОГАТЕЛЬНОЕ ====================
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

    openProjectCarousel(project, imageIndex) {
        const allImages = project.originalImages || [];
        if (allImages.length === 0) return;
        const params = new URLSearchParams({
            name: project.name,
            url: project.url,
            images: encodeURIComponent(JSON.stringify(allImages)),
            start: imageIndex.toString(),
        });
        window.open(`project.html?${params.toString()}`, '_blank');
    }
}