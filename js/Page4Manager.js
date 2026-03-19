class Page4Manager {
    constructor() {
        this.container = document.getElementById('page4');
        if (!this.container) return;
        
        // Загружаем данные из конфига
        this.items = CONFIG.PAGE4?.ITEMS || [];
        this.bottomImage = CONFIG.PAGE4?.BOTTOM_IMAGE || null;
        
        // Для выравнивания высоты карточек в строке
        this.rowHeights = new Map();
        
        this.init();
        window.addEventListener('resize', () => this.onResize());
    }
    
    init() {
        this.createItems();
        this.createBottomImage();
    }
    
    createItems() {
        const grid = document.getElementById('itemsGrid');
        if (!grid) return;
        
        grid.innerHTML = '';
        
        // Создаём карточки
        this.items.forEach((itemData, index) => {
            const card = this.createItemCard(itemData);
            card.dataset.index = index;
            grid.appendChild(card);
        });
        
        // После добавления всех карточек выравниваем высоты в строках
        setTimeout(() => this.alignRowHeights(), 100);
    }
    
    createItemCard(data) {
        const card = document.createElement('div');
        card.className = 'item-card';
        
        // Верхняя часть
        const topDiv = document.createElement('div');
        topDiv.className = 'card-top';
        
        // Левая часть - изображение
        const leftDiv = document.createElement('div');
        leftDiv.className = 'card-image-container';
        
        const imageDiv = document.createElement('div');
        imageDiv.className = 'card-image';
        
        const img = document.createElement('img');
        img.src = data.image;
        img.alt = data.title || 'Item';
        img.loading = 'lazy';
        
        imageDiv.appendChild(img);
        leftDiv.appendChild(imageDiv);
        
        // Правая часть - заголовок и описание
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
        
        // Нижняя часть
        const bottomDiv = document.createElement('div');
        bottomDiv.className = 'card-bottom';
        
        // Левая нижняя - метаданные
        const metaDiv = document.createElement('div');
        metaDiv.className = 'card-meta';
        
        // Строки метаданных
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
        
        // Правая нижняя - маленькие изображения
        const thumbnailsDiv = document.createElement('div');
        thumbnailsDiv.className = 'card-thumbnails';
        
        if (data.thumbnails && data.thumbnails.length > 0) {
            data.thumbnails.forEach((thumbData) => {
                const link = document.createElement('a');
                link.href = thumbData.url || '#';
                link.target = '_blank';
                link.className = 'thumbnail-link';
                
                const thumb = document.createElement('div');
                thumb.className = 'thumbnail';
                
                const thumbImg = document.createElement('img');
                thumbImg.src = thumbData.image;
                thumbImg.alt = 'Thumbnail';
                thumbImg.loading = 'lazy';
                
                thumb.appendChild(thumbImg);
                link.appendChild(thumb);
                thumbnailsDiv.appendChild(link);
            });
        }
        
        bottomDiv.appendChild(metaDiv);
        bottomDiv.appendChild(thumbnailsDiv);
        
        card.appendChild(topDiv);
        card.appendChild(bottomDiv);
        
        return card;
    }
    
    alignRowHeights() {
        const grid = document.getElementById('itemsGrid');
        if (!grid) return;
        
        const cards = grid.querySelectorAll('.item-card');
        if (cards.length === 0) return;
        
        // Сначала убираем фиксированные высоты и сбрасываем нормальное поведение
        cards.forEach(card => {
            card.style.height = 'auto';
            // Сбрасываем высоту нижней части
            const bottomPart = card.querySelector('.card-bottom');
            if (bottomPart) {
                bottomPart.style.height = 'auto';
            }
        });
        
        // Группируем по строкам (по 2 карточки)
        for (let i = 0; i < cards.length; i += 2) {
            const rowCards = [cards[i]];
            if (i + 1 < cards.length) rowCards.push(cards[i + 1]);
            
            // Находим максимальную высоту верхней части и нижней части отдельно
            let maxTopHeight = 0;
            let maxBottomHeight = 0;
            
            rowCards.forEach(card => {
                const topPart = card.querySelector('.card-top');
                const bottomPart = card.querySelector('.card-bottom');
                
                if (topPart) {
                    const topHeight = topPart.offsetHeight;
                    if (topHeight > maxTopHeight) maxTopHeight = topHeight;
                }
                
                if (bottomPart) {
                    const bottomHeight = bottomPart.offsetHeight;
                    if (bottomHeight > maxBottomHeight) maxBottomHeight = bottomHeight;
                }
            });
            
            // Устанавливаем одинаковую высоту для всех карточек в строке
            rowCards.forEach(card => {
                // Высота карточки = максимальная высота верхней части + максимальная высота нижней части
                card.style.height = (maxTopHeight + maxBottomHeight + 30) + 'px'; // +30 на отступы
                
                // Растягиваем нижнюю часть до максимальной высоты
                const bottomPart = card.querySelector('.card-bottom');
                if (bottomPart) {
                    bottomPart.style.height = maxBottomHeight + 'px';
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
            link.target = '_blank'; // Открывать в новой вкладке
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
            // Если нет url, просто показываем картинку
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