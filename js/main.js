// Точка входа в приложение
window.addEventListener('load', () => {
    // Создаем менеджер линий
    window.lineManager = new LineManager();
    
    // Создаем галерею для страницы 2
    setTimeout(() => {
        initGallery();
    }, 100); // Небольшая задержка, чтобы страница успела активироваться
});

function initGallery() {
    const gallery = new ProjectGallery('page2');
    
    // Пример данных проектов
    const projects = [
        {
            name: 'to bb',
            url: 'https://www.behance.net/gallery/184928549/To-bb',
            images: [
                'images/projects/to_bb/1.webp',
                'images/projects/to_bb/2.webp',
                'images/projects/to_bb/3.webp',
                'images/projects/to_bb/4.webp',
                'images/projects/to_bb/5.webp',
                'images/projects/to_bb/6.webp',
                'images/projects/to_bb/7.webp',
                'images/projects/to_bb/8.webp',
                'images/projects/to_bb/9.webp',
                'images/projects/to_bb/10.webp'
            ]
        },
        {
            name: 'Cartoons',
            url: 'https://www.behance.net/gallery/185496395/Cartoons-STATIC',
            images: [
                'images/projects/cartoons/1.webp',
                'images/projects/cartoons/2.webp',
                'images/projects/cartoons/3.webp',
                'images/projects/cartoons/4.webp',
                'images/projects/cartoons/5.webp'
            ]
        }
    ];
    
    // Добавляем проекты в галерею
    projects.forEach(project => {
        gallery.addProject(project);
    });
    
    // Сохраняем галерею в глобальную область для отладки
    window.projectGallery = gallery;
}