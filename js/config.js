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
            RELATIVE_SCALE: 0.20,       // 15% от ширины контейнера (для relative)
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
            { url: 'WHY ME ANONYMOUS', image: 'images/floating/CANDY.webp' },
            { url: 'https://www.instagram.com/nansjova', image: 'images/floating/TRIGANA.webp' },
            { url: 'https://instagram.com/your-profile', image: 'images/floating/5.png' }
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
            right: { url: 'grigrinyouu@gmail.com', image: 'images/links/GMAIL.webp' },                  //
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
                        color: '#ffffff',      // цвет кнопки
                        textColor: '#999999'    // цвет текста
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
                        color: '#ffffff',      // цвет кнопки
                        textColor: '#999999'    // цвет текста
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
                        color: '#ffffff',      // цвет кнопки
                        textColor: '#999999'    // цвет текста
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
    }
};

// Названия углов
const CORNERS = ['tl', 'tr', 'br', 'bl'];