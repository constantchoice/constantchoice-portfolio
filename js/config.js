const CONFIG = {
    // Общие параметры
    LINE_THICKNESS: 1,
    BASE_OFFSET: 20,
    LINE_SPACING: 15,
    CORNER_RADIUS: 25,
    
    // Длина линий по уровням - горизонтальные (ширина)
    WIDTH_LENGTH_1: 28,      // Level 1 - базовый размер
    WIDTH_LENGTH_2: 25.2,    // Level 2 - на 10% меньше (28 * 0.9)
    WIDTH_LENGTH_3: 22.68,   // Level 3 - на 10% меньше (25.2 * 0.9)
    
    // Длина линий по уровням - вертикальные (высота)
    HEIGHT_LENGTH_1: 28,      // Level 1 - базовый размер
    HEIGHT_LENGTH_2: 25.2,    // Level 2 - на 10% меньше (28 * 0.9)
    HEIGHT_LENGTH_3: 22.68,   // Level 3 - на 10% меньше (25.2 * 0.9)
    
    // Состояние линий по умолчанию
    INITIAL_STATE: {
        tl: [{ id: 'tl1', level: 1, corner: 'tl' }],
        tr: [{ id: 'tr1', level: 1, corner: 'tr' }],
        br: [
            { id: 'br1', level: 1, corner: 'br' },
            { id: 'br2', level: 2, corner: 'br' }
        ],
        bl: []
    },

    // Противоположные углы
    OPPOSITE_CORNERS: {
        'tl': 'br',
        'tr': 'bl',
        'br': 'tl',
        'bl': 'tr'
    },

    PAGE3: {
        LAYOUT: {
            BASE_HEIGHT: 1163,
            
            TOP_BLOCK: {
                TOP_OFFSET: 90,
                HEIGHT_PERCENT: 52.5,      // 610px при 1163
                POSITION_MODE: 'top',
                IS_FLEXIBLE: true            // Этот блок будет уменьшаться
            },
            MIDDLE_BLOCK: {
                BOTTOM_OFFSET_PERCENT: 24.2, // 374px от низа при 1163
                HEIGHT_PERCENT: 8.94,        // 104px
                POSITION_MODE: 'bottom',
                IS_FLEXIBLE: false            // Сохраняет размер
            },
            BOTTOM_BLOCK: {
                BOTTOM_OFFSET_PERCENT: 5.59, // 65px от низа
                HEIGHT_PERCENT: 14.1,         // 164px
                POSITION_MODE: 'bottom',
                IS_FLEXIBLE: false            // Сохраняет размер
            },
            SPACING_PERCENT: 5.59 // 65 / 1163 * 100 ≈ 5.59%
        },

        // Настройки для плавающих изображений
        FLOATING_SETTINGS: {
            SIZE_MODE: 'relative',      // 'relative' или 'fixed'
            RELATIVE_SCALE: 0.165,       // 20% от ширины контейнера (для relative)
            FIXED_WIDTH: 750,            // Фиксированная ширина в px (для fixed)
            MIN_WIDTH: 100,               // Минимальная ширина
            MAX_WIDTH: 500,               // Максимальная ширина
            SHADOW: false,                 // true = есть тень, false = нет тени
            SHADOW_SIZE: 4,                // Размер тени в px (если SHADOW = true)
            BORDER_RADIUS: 8,               // Скругление углов
            HOVER_SCALE: 1.02,               // Масштаб при наведении
            MIN_DISTANCE: 100                 // Мин. расстояние между изображениями
        },

        // Плавающие ссылки (верхний блок)
        FLOATING_LINKS: [
            { url: 'https://www.youtube.com/@luxgoth', image: 'images/floating/LUXGOTH.webp' },
            { url: 'ANONYMOUS', image: 'images/floating/LIZARD_TAIL.webp' },
            { url: 'https://www.behance.net/gallery/133009905/Blood-on-the-canvas', image: 'images/floating/CANDY.webp' },
            { url: 'https://www.instagram.com/nansjova', image: 'images/floating/TRIGANA.webp' },
            { url: 'https://www.instagram.com/emptai.vfx', image: 'images/floating/EMPTAI.webp' }
        ],
        
        // Иконки навыков (средний блок)
        SKILLS_ICONS: [
            { image: 'images/skills/TOPAZ.webp' },
            { image: 'images/skills/BLENDER.webp' },
            { image: 'images/skills/DaVinci_Resolve.webp' },
            { image: 'images/skills/PHOTOSHOP.webp' },
            { image: 'images/skills/AFTER_EFFECTS.webp' },
            { image: 'images/skills/ILLUSTRATOR.webp' },
            { image: 'images/skills/PREMIERE.webp' },
            { image: 'images/skills/CAPTURE_ONE.webp' },
            { image: 'images/skills/MIDJOURNEY.webp' },
            { image: 'images/skills/FIGMA.webp' }
        ],
        
        // Социальные ссылки (нижний блок)
        LINKS: {
            center: { url: 'https://www.behance.net/constantchoice', image: 'images/links/BEHANCE.webp' },
            left: { url: 'https://www.instagram.com/constantchoice', image: 'images/links/INSTAGRAM.webp' },
            right: { url: 'grigrinyouu@gmail.com', image: 'images/links/GMAIL.webp' },
            smallLeft: [
                { url: 'https://www.pinterest.com/axyelIlIo/', image: 'images/links/PINTEREST.webp' },
                { url: 'https://www.youtube.com/@constantchoice', image: 'images/links/YOUTUBE.webp' },
                { url: 'http://dribbble.com/constantchoice', image: 'images/links/DRIBBBLE.webp' },
                { url: 'https://kavyar.com/6qpn6bz7cjg6', image: 'images/links/KAVYAR.webp' },          //
                { url: 'https://www.tiktok.com/@constantchoice?_r=1&_t=ZS-94mKheynm9l', image: 'images/links/TIKTOK.webp' }
            ],
            smallRight: [
                { url: 'https://github.com/constantchoice', image: 'images/links/GITHUB.webp' },
                { url: 'https://constantchoice.gumroad.com/', image: 'images/links/GUMROAD.webp' },     //
                { url: 'https://t.me/iflbrkojdlzl', image: 'images/links/TELEGRAM.webp' },
                { url: 'https://twitter.com/constantchoice', image: 'images/links/X.webp' },
                { url: 'https://www.threads.com/@constantchoice?igshid=NTc4MTIwNjQ2YQ==', image: 'images/links/THREADS.webp' }
            ]
        },

        SKILLS_RING: {
            ENABLED: true,
            
            // ===== ГЕОМЕТРИЯ КОЛЬЦА =====
            RADIUS_X: 0.17,
            RADIUS_Y: 0.35,
            TILT_DEG: 0,
            OFFSET_Y_PX: -48,
            TILT_COMPENSATE: true,   // true = «перед» всегда в центре по X при наклоне
                                     // false = старое поведение (без компенсации)

            TILT_ANIMATION: {
                ENABLED: true,          // false → всегда TILT_DEG, без движения
                
                // Амплитуда: колеблется от (TILT_DEG - AMPLITUDE) до (TILT_DEG + AMPLITUDE)
                // Если хочешь ровно от -15 до +15 при TILT_DEG = 0 — ставь AMPLITUDE: 15
                // Если TILT_DEG = -15 и хочешь от -15 до +15 — ставь AMPLITUDE: 15 (центр 0) — 
                //   тогда лучше TILT_DEG: 0, AMPLITUDE: 15
                AMPLITUDE: 5,
                
                // Полный период туда-обратно, в секундах
                PERIOD_SEC: 16,
                
                // Фаза старта (0..1): 0 = крайнее левое (TILT_DEG - AMPLITUDE),
                //                     0.5 = центр, 1 = крайнее правое
                START_PHASE: 0,
                
                // ===== НЕЛИНЕЙНОСТЬ =====
                // 1 = чистый синус (плавно, симметрично)
                // < 1 = дольше у краёв (ease-in-out, «залипает» на крайних точках)
                // > 1 = дольше в центре (быстрый проход краёв, «толчок»)
                // Работает через smoothstep-подобную кривую на полупериоде
                EASE_POWER: 1.0,
                
                // Доп. асимметрия: 0 = одинаково в обе стороны,
                // > 0 = медленнее к правому краю, < 0 = медленнее к левому
                // (просто сдвигает фазу внутри ease, для «вкусности»)
                EASE_BIAS: 0
            },
            
            // ===== РАСПРЕДЕЛЕНИЕ ИКОНОК =====
            TOTAL_ITERATIONS: 1,
            
            // ===== МАСШТАБ =====
            CENTER_SCALE: 1.0,        // размер на переднем плане (depth = +1)
            EDGE_SCALE: 0.2,          // размер на заднем плане (depth = -1)
            
            // ===== НЕПРОЗРАЧНОСТЬ =====
            CENTER_OPACITY: 1.0,      // непрозрачность на переднем плане
            EDGE_OPACITY: 0.0,        // непрозрачность на заднем плане
            FULL_OPACITY_ZONE: 0.07,   // доля глубины (0..1), где opacity = CENTER_OPACITY
                                    // 0 = везде плавный спад
                                    // 0.3 = 30% кольца спереди и 30% сзади — плато
                                    // 1 = вся иконка одинаково непрозрачна
            
            // ===== ВРАЩЕНИЕ =====
            ROTATION_SPEED: 0.25,
            DIRECTION: 1,
            DEPTH_PHASE_DEG: 0,   // общий сдвиг (перед + зад)
            BACK_PHASE_DEG: 5,    // ДОП. сдвиг только для задней части (0 = как перед)

            // ===== СКОРОСТЬ =====
            SPEED_AMPLITUDE: -0.23,  // -0.99..0.99
                        // 0 = равномерно
                        // < 0 = сзади быстрее, спереди медленнее (то что надо)
                        // > 0 = наоборот
                        // |значение| ближе к 1 = сильнее эффект
            
            // ===== Z-INDEX =====
            Z_INDEX_BASE: 1,
            Z_INDEX_RANGE: 100
        }
    },

    PAGE4: {
        ITEMS: [
            {
                image: 'images/page4/item1/main.webp',
                title: 'SOON ITEM 1',
                description: 'There might be a description of your work, including all the important and interesting research that went into it',
                meta: [
                    { label: 'size    ', value: 'its size is, for example, M' },
                    { label: 'format  ', value: 'the format of your product' },
                    { label: 'author  ', value: '????' },
                    { label: 'article ', value: 'ART-????' }
                ],
                contactCard: {
                    image: 'images/page4/item1/contact-bg.webp',  // 500x500
                    imageUrl: 'https://www.behance.net/constantchoice',
                    button: {
                        text: 'CONTACT',
                        url: 'https://www.behance.net/constantchoice',
                        color: '#ffffff',      // BUTTON
                        textColor: '#999999'    // TEXT
                    }
                }
            },
            {
                image: 'images/page4/item2/main.webp',
                title: 'SOON ITEM 2',
                description: 'What do you want to show here?',
                meta: [
                    { label: 'size    ', value: '????' },
                    { label: 'format  ', value: '????' },
                    { label: 'author  ', value: 'Maybe you?' }
                ],
                contactCard: {
                    image: 'images/page4/item2/contact-bg.webp',  // 500x500
                    imageUrl: 'https://www.behance.net/constantchoice',
                    button: {
                        text: 'CONTACT',
                        url: 'https://www.instagram.com/constantchoice/',
                        color: '#ffffff',      // BUTTON
                        textColor: '#999999'    // TEXT
                    }
                }
            },
            {
                image: 'images/page4/item3/main.webp',
                title: 'SOON ITEM 3',
                description: 'WHY',
                meta: [
                    { label: 'size    ', value: '????' },
                    { label: 'format  ', value: 'HMM' },
                    { label: 'author  ', value: 'WHO' },
                    { label: 'article ', value: 'WHAT' },
                    { label: 'year    ', value: 'WHEN' }
                ],
                contactCard: {
                    image: 'images/page4/item3/contact-bg.webp',  // 500x500
                    imageUrl: 'https://www.behance.net/constantchoice',
                    button: {
                        text: 'CONTACT',
                        url: 'https://dribbble.com/constantchoice',
                        color: '#ffffff',      // BUTTON
                        textColor: '#999999'    // TEXT
                    }
                }
            },
            {
                image: 'images/page4/item4/main.webm',
                title: 'DUBSTEP SCRIPT',
                description: 'Automatic spark generation from bright flashes in After Effects. Real-time video analysis detects light impulses and creates animated null objects with particles synchronized to the light source movement\n\n' +
                    'OpenCV-powered tracking ensures high accuracy. Flexible threshold system (threshold, area, lifetime) gives full control over results. Python backend enables JSON data export for post-processing\n\n' +
                    'Perfect for VFX, music videos, and dynamic motion graphics',
                meta: [
                    { label: 'works with', value: 'After Effects 2020+ (Windows)' },
                    { label: 'UI language', value: 'English / Russian' },
                    { label: 'tech stack', value: 'ExtendScript (JSX) + Python 3 + OpenCV' },
                    { label: 'includes', value: 'Source code • Documentation' },
                    { label: 'version', value: 'v1.102.25' },
                    { label: 'author', value: 'constantchoice' }
                ],
                contactCard: {
                    image: 'images/page4/item4/contact-bg.webp',
                    imageUrl: 'https://www.behance.net/constantchoice',
                    button: {
                        text: 'REPOSITORY',
                        url: 'https://github.com/constantchoice/DUBSTEP-SCRIPT',
                        color: '#ffffff',
                        textColor: '#999999'
                    }
                }
            },
            {
                image: 'images/page4/item5/main.webp',
                title: 'MONUMENTAL',
                description: '3D cinematic — an animated architectural short in the brutalist aesthetic. Working with volume, light, and camera dynamics to convey the power and raw beauty of concrete structures\n\n' +
                    'Focused on monumental forms, stark geometry, and the dramaturgy of light. The camera reveals the scale of the structures through slow, weighty flyovers and abrupt shifts in perspective\n\n' +
                    'Full production cycle: from static compositing to final render and post-processing',
                meta: [
                    { label: 'type', value: '3D Cinematic / Brutalism' },
                    { label: 'status', value: 'Post-Production (2 weeks)' },
                    { label: 'tech stack', value: 'Blender • After Effects • Photoshop • Illustrator • DaVinci Resolve • Audition' },
                    { label: 'timeline', value: '2 months' },
                    { label: 'author', value: 'constantchoice' }
                ],
                contactCard: {
                    image: 'images/page4/item5/contact-bg.webp',
                    imageUrl: 'https://www.behance.net/constantchoice',
                    button: {
                        text: 'FOLLOW PROGRESS',
                        url: 'https://www.behance.net/constantchoice',
                        color: '#ffffff',
                        textColor: '#999999'
                    }
                }
            },
            {
                image: 'images/page4/item6/main.webp',
                title: 'ZAKHAR',
                description: 'A fashion series created using 3D scanning technology. The subject was digitized through photogrammetry — a sequence of multi-angle shots processed in COLMAP and Houdini via Gaussian Splatting\n\n' +
                    'The final renders are stylized as a fashion editorial — with emphasis on character, light, and volume. The result is a fusion of digital craftsmanship and human presence, where the scanned individual becomes both subject and artifact\n\n' +
                    'A case study in how photogrammetry can be applied to fashion, digital art, and commercial content production',
                meta: [
                    { label: 'type', value: '3D Fashion / Photogrammetry' },
                    { label: 'status', value: 'Completed' },
                    { label: 'tech stack', value: 'COLMAP • Houdini • Gaussian Splatting • Photoshop • Capture One' },
                    { label: 'timeline', value: '1 day' },
                    { label: 'author', value: 'constantchoice' }
                ],
                contactCard: {
                    image: 'images/page4/item6/contact-bg.webp',
                    imageUrl: 'https://www.behance.net/constantchoice',
                    button: {
                        text: 'OPEN PROJECT',
                        url: 'https://www.behance.net/gallery/253744551/Zakhar',
                        color: '#ffffff',
                        textColor: '#999999'
                    }
                }
            },
            {
                image: 'images/page4/item7/main.webp',
                title: '10 LETTERS, 150 HOURS',
                description: 'A complete typographic system built from scratch. Ten characters, each constructed individually — without a single pre-existing matrix\n\n' +
                    'Classical proportions serve only as a starting point: the final geometry is unique — stroke contrast is amplified, terminal cuts are refined, and optical spacing is calibrated with precision\n\n' +
                    'This is not a modified typeface. It is an original type family, designed to carry a brand\'s identity without borrowing from anyone else',
                meta: [
                    { label: 'type', value: 'Typography / Type Design' },
                    { label: 'status', value: 'Completed' },
                    { label: 'tech stack', value: 'Illustrator • Photoshop' },
                    { label: 'timeline', value: '3 weeks' },
                    { label: 'author', value: 'constantchoice' }
                ],
                contactCard: {
                    image: 'images/page4/item7/contact-bg.webp',
                    imageUrl: 'https://www.behance.net/constantchoice',
                    button: {
                        text: 'OPEN PROJECT',
                        url: 'https://dribbble.com/shots/27613495-10-Letters-150-Hours',
                        color: '#ffffff',
                        textColor: '#999999'
                    }
                }
            },
            {
                image: 'images/page4/item8/main.webp',
                title: 'PINK BLOOD',
                description: 'A raw, candid editorial capturing the authentic energy of a home tattoo session. Rejecting posed studio portraits, this series embraces a documentary snapshot aesthetic with intentional out-of-focus frames\n\n' +
                    'The visual language is built on an overexposed film look and cross-processed colors: blown-out highlights, vibrant pink undertones on the skin, and unnatural green shadows. Set against a striking candy-pink background, these gritty archive-style shots create a perfect, stylish contrast for the Halloween season\n\n' +
                    'This is not a staged shoot. It is pure action, lifestyle, and the raw, unfiltered vibe of real life',
                meta: [
                    { label: 'type', value: 'Photography / Editorial' },
                    { label: 'style', value: 'Candid • Overexposed Film • Cross-Process' },
                    { label: 'tech stack', value: 'Capture One • Photoshop' },
                    { label: 'status', value: 'Completed' },
                    { label: 'author', value: 'constantchoice' }
                ],
                contactCard: {
                    image: 'images/page4/item8/contact-bg.webp',
                    imageUrl: 'https://www.behance.net/constantchoice',
                    button: {
                        text: 'OPEN PROJECT',
                        url: 'https://www.behance.net/gallery/257741241/Pink-Blood',
                        color: '#ffffff',
                        textColor: '#999999'
                    }
                }
            },
                        {
                image: 'images/page4/item9/main.webp',
                title: 'SILVER ARCHIVE',
                description: 'A monochrome editorial focused on the raw energy of a home tattoo session, elevated by meticulous retouching. The post-processing plays a key role: soft-contrast silver-toned B&W, smooth tone curves, lifted shadows, and fine film grain to achieve an analog feel\n\n' +
                    'Captured in a candid, documentary style with intentional out-of-focus frames, the images feel like forgotten snapshots from a 90s underground party. There is no staging here — only pure action, lifestyle, and the intimate reality of the moment\n\n' +
                    'This project is a study in how careful retouching can transform a rough snapshot into a delicate, silver-toned piece of art',
                meta: [
                    { label: 'type', value: 'Photography / Retouching' },
                    { label: 'style', value: 'Soft-Contrast B&W • Silver Tone' },
                    { label: 'tech stack', value: 'Capture One • Photoshop' },
                    { label: 'status', value: 'Completed' },
                    { label: 'author', value: 'constantchoice' }
                ],
                contactCard: {
                    image: 'images/page4/item9/contact-bg.webp',
                    imageUrl: 'https://www.behance.net/constantchoice',
                    button: {
                        text: 'OPEN PROJECT',
                        url: 'https://www.behance.net/gallery/257746469/Silver-Archive',
                        color: '#ffffff',
                        textColor: '#999999'
                    }
                }
            }
        ],
        // Нижний баннер
        BOTTOM_IMAGE: {
            src: 'images/page4/bottom-banner.webp',
            alt: 'Bottom banner', 
            url: 'https://www.behance.net/constantchoice'
        }
    },

        // ===== OPEN PROJECT.HTML =====
    INTRO: {
        // ----- TITLE -----
        TITLE: {
            ENABLED: true,
            START_X_PX: -150,          
            START_SKEW_DEG: 0,         
            END_SKEW_DEG: -10,         
            START_OPACITY: 0.5,        
            END_OPACITY: 1,            
            DELAY_MS: 100,             // задержка перед стартом
            DURATION_MS: 1400,         // длительность анимации
            EASING: 'cubic-bezier(0.1, 0.4, 0.25, 1)' // ease-out
        },

        // ----- OVERLAY -----
        OVERLAY: {
            ENABLED: true,

            // Цвет заливки
            COLOR_RGB: [26, 26, 26],     // #1A1A1A

            // Затемнение
            START_BG_ALPHA: 1,         
            END_BG_ALPHA: 0,            

            // Размытие карусели
            START_BLUR_PX: 35,          
            END_BLUR_PX: 0,              

            // Тайминги
            DELAY_MS: 100,
            DURATION_MS: 1300,
            EASING: 'cubic-bezier(0.1, 0.4, 0.25, 1)'
        }
    }, 
    
    // ===== ПОДСВЕТКА РАМКИ НА PROJECT.HTML =====
    FRAME_HIGHLIGHT: {
        ENABLED: true,
        RADIUS_PX: 2000,      // радиус подсветки в пикселях
        OPACITY: 0.8,        // максимальная яркость в центре
        COLOR_RGB: [51, 51, 51]  // цвет подсветки (белый)
    }
};

// Названия углов
const CORNERS = ['tl', 'tr', 'br', 'bl'];