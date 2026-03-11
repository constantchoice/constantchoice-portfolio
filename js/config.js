const CONFIG = {
    // Общие параметры
    LINE_THICKNESS: 1,
    BASE_OFFSET: 20,
    LINE_SPACING: 15,
    CORNER_RADIUS: 20,
    
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
    }
};

// Названия углов
const CORNERS = ['tl', 'tr', 'br', 'bl'];