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
        
        bottomDiv.appendChild(metaDiv);
        
        if (data.contactCard) {
            const contactCardDiv = document.createElement('div');
            contactCardDiv.className = 'card-contact';
            
            const contactContainer = document.createElement('div');
            contactContainer.className = 'contact-container';
            
            // Ссылка на картинке (если есть)
            if (data.contactCard.imageUrl) {
                const imageLink = document.createElement('a');
                imageLink.href = data.contactCard.imageUrl;
                imageLink.target = '_blank';
                imageLink.className = 'contact-image-link';
                
                const img = document.createElement('img');
                img.src = data.contactCard.image;
                img.alt = 'Contact';
                img.className = 'contact-bg-image';
                img.loading = 'lazy';
                
                imageLink.appendChild(img);
                contactContainer.appendChild(imageLink);
            } else {
                const img = document.createElement('img');
                img.src = data.contactCard.image;
                img.alt = 'Contact';
                img.className = 'contact-bg-image';
                img.loading = 'lazy';
                contactContainer.appendChild(img);
            }
            
            // Кнопка поверх (если есть)
            if (data.contactCard.button && data.contactCard.button.text) {
                const button = document.createElement('a');
                button.href = data.contactCard.button.url || '#';
                button.target = '_blank';
                button.className = 'contact-button';
                button.textContent = data.contactCard.button.text;
                
                // Определяем платформу по URL кнопки
                const platform = this.getPlatformFromUrl(data.contactCard.button.url);
                button.setAttribute('data-platform', platform);
                
                contactContainer.appendChild(button);
            }
            
            contactCardDiv.appendChild(contactContainer);
            bottomDiv.appendChild(contactCardDiv);
        }
        
        card.appendChild(topDiv);
        card.appendChild(bottomDiv);
        
        return card;
    }
    
    alignRowHeights() {
        const grid = document.getElementById('itemsGrid');
        if (!grid) return;
        
        const cards = grid.querySelectorAll('.item-card');
        if (cards.length === 0) return;
        
        // Сначала сбрасываем высоты
        cards.forEach(card => {
            card.style.height = 'auto';
            const bottomPart = card.querySelector('.card-bottom');
            if (bottomPart) bottomPart.style.height = 'auto';
            const contactCard = card.querySelector('.card-contact');
            if (contactCard) contactCard.style.height = '0'; // временно
        });
        
        // Группируем по строкам (по 2 карточки)
        for (let i = 0; i < cards.length; i += 2) {
            const rowCards = [cards[i]];
            if (i + 1 < cards.length) rowCards.push(cards[i + 1]);
            
            let maxTopHeight = 0;
            let maxMetaHeight = 0;
            
            rowCards.forEach(card => {
                const topPart = card.querySelector('.card-top');
                const metaPart = card.querySelector('.card-meta');
                
                if (topPart) {
                    const topHeight = topPart.offsetHeight;
                    if (topHeight > maxTopHeight) maxTopHeight = topHeight;
                }
                
                if (metaPart) {
                    const metaHeight = metaPart.offsetHeight;
                    if (metaHeight > maxMetaHeight) maxMetaHeight = metaHeight;
                }
            });
            
            rowCards.forEach(card => {
                // Общая высота карточки
                card.style.height = (maxTopHeight + maxMetaHeight + 30) + 'px';
                
                // Нижняя часть
                const bottomPart = card.querySelector('.card-bottom');
                if (bottomPart) {
                    bottomPart.style.height = maxMetaHeight + 'px';
                }
                
                const contactCard = card.querySelector('.card-contact');
                if (contactCard) {
                    contactCard.style.height = maxMetaHeight + 'px';
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