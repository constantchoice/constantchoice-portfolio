// Конфигурация приложения
const CONFIG = {
    // Общие параметры
    LINE_THICKNESS: 3,
    BASE_OFFSET: 20,
    LINE_SPACING: 15,
    CORNER_RADIUS: 20,
    
    // Длина линий по уровням
    WIDTH_LENGTH_1: 28,
    HEIGHT_LENGTH_1: 28,
    WIDTH_LENGTH_2: 28,
    HEIGHT_LENGTH_2: 28,
    WIDTH_LENGTH_3: 28,
    HEIGHT_LENGTH_3: 28,
    
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