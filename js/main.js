// Точка входа в приложение
window.addEventListener('load', () => {
    // Создаем менеджер линий
    window.lineManager = new LineManager();
    
    // Создаем галерею для страницы 2
    setTimeout(() => {
        initGallery();
    }, 100);
    
    // Создаем менеджер для страницы 3
    setTimeout(() => {
        initPage3();
    }, 200);
});

function initPage3() {
    window.page3Manager = new Page3Manager();
}

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
                'images/projects/to_bb/11.webp',
                'images/projects/to_bb/12.webp',
                'images/projects/to_bb/13.webp',
                'images/projects/to_bb/14.webp',
                'images/projects/to_bb/15.webp',
                'images/projects/to_bb/16.webp',
                'images/projects/to_bb/17.webp',
                'images/projects/to_bb/18.webp',
                'images/projects/to_bb/19.webp',
                'images/projects/to_bb/20.webp',
                'images/projects/to_bb/21.webp',
                'images/projects/to_bb/22.webp',
                'images/projects/to_bb/23.webp',
                'images/projects/to_bb/24.webp',
                'images/projects/to_bb/25.webp',
                'images/projects/to_bb/26.webp',
                'images/projects/to_bb/27.webp',
                'images/projects/to_bb/28.webp',
                'images/projects/to_bb/29.webp',
                'images/projects/to_bb/30.webp',
                'images/projects/to_bb/31.webp',
                'images/projects/to_bb/32.webp',
                'images/projects/to_bb/33.webp',
                'images/projects/to_bb/34.webp',
                'images/projects/to_bb/35.webp',
                'images/projects/to_bb/36.webp',
                'images/projects/to_bb/37.webp',
                'images/projects/to_bb/38.webp',
                'images/projects/to_bb/39.webp',
                'images/projects/to_bb/40.webp',
                'images/projects/to_bb/41.webp',
                'images/projects/to_bb/42.webp',
                'images/projects/to_bb/43.webp',
                'images/projects/to_bb/44.webp',
                'images/projects/to_bb/45.webp',
                'images/projects/to_bb/46.webp',
                'images/projects/to_bb/47.webp',
                'images/projects/to_bb/48.webp',
                'images/projects/to_bb/49.webp',
                'images/projects/to_bb/50.webp',
                'images/projects/to_bb/51.webp',
                'images/projects/to_bb/52.webp',
                'images/projects/to_bb/53.webp',
                'images/projects/to_bb/54.webp',
                'images/projects/to_bb/55.webp',
                'images/projects/to_bb/56.webp',
                'images/projects/to_bb/57.webp',
                'images/projects/to_bb/58.webp',
                'images/projects/to_bb/59.webp',
                'images/projects/to_bb/60.webp',
                'images/projects/to_bb/61.webp',
                'images/projects/to_bb/62.webp',
                'images/projects/to_bb/63.webp',
                'images/projects/to_bb/64.webp',
                'images/projects/to_bb/65.webp',
                'images/projects/to_bb/66.webp',
                'images/projects/to_bb/67.webp',
                'images/projects/to_bb/68.webp',
                'images/projects/to_bb/69.webp',
                'images/projects/to_bb/70.webp',
                'images/projects/to_bb/71.webp',
                'images/projects/to_bb/72.webp',
                'images/projects/to_bb/73.webp',
                'images/projects/to_bb/74.webp',
                'images/projects/to_bb/75.webp',
                'images/projects/to_bb/76.webp',
                'images/projects/to_bb/77.webp'
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
                'images/projects/cartoons/5.webp',
                'images/projects/cartoons/6.webp',
                'images/projects/cartoons/7.webp',
                'images/projects/cartoons/8.webp',
                'images/projects/cartoons/9.webp',
                'images/projects/cartoons/10.webp',
                'images/projects/cartoons/11.webp',
                'images/projects/cartoons/12.webp',
                'images/projects/cartoons/13.webp',
                'images/projects/cartoons/14.webp',
                'images/projects/cartoons/15.webp',
                'images/projects/cartoons/16.webp',
                'images/projects/cartoons/17.webp',
                'images/projects/cartoons/18.webp',
                'images/projects/cartoons/19.webp'
            ]
        },
        {
            name: 'Drunken ecstasy 2',
            url: 'https://www.behance.net/gallery/237677261/Drunken-ecstasy-2',
            images: [
                'images/projects/de2/1.webp',
                'images/projects/de2/2.webp',
                'images/projects/de2/3.webp',
                'images/projects/de2/4.webp',
                'images/projects/de2/5.webp',
                'images/projects/de2/6.webp',
                'images/projects/de2/7.webp',
                'images/projects/de2/8.webp',
                'images/projects/de2/9.webp',
                'images/projects/de2/10.webp',
                'images/projects/de2/11.webp',
                'images/projects/de2/12.webp',
                'images/projects/de2/13.webp',
                'images/projects/de2/14.webp',
                'images/projects/de2/15.webp',
                'images/projects/de2/16.webp',
                'images/projects/de2/17.webp',
                'images/projects/de2/18.webp',
                'images/projects/de2/19.webp',
                'images/projects/de2/20.webp',
                'images/projects/de2/21.webp',
                'images/projects/de2/22.webp',
                'images/projects/de2/23.webp',
                'images/projects/de2/24.webp',
                'images/projects/de2/25.webp',
                'images/projects/de2/26.webp',
                'images/projects/de2/27.webp',
                'images/projects/de2/28.webp',
                'images/projects/de2/29.webp'
            ]
        },
        {
            name: 'Drunken ecstasy',
            url: 'https://www.behance.net/gallery/132798515/Drunken-ecstasy',
            images: [
                'images/projects/de/1.webp',
                'images/projects/de/2.webp',
                'images/projects/de/3.webp',
                'images/projects/de/4.webp',
                'images/projects/de/5.webp',
                'images/projects/de/6.webp',
                'images/projects/de/7.webp'
            ]
        },
        {
            name: 'Walking with a friend',
            url: 'https://www.behance.net/gallery/132755409/Walking-with-a-friend',
            images: [
                'images/projects/Walking_with_a_friend/1.webp'
            ]
        },
        {
            name: 'Spring and summer',
            url: 'https://www.behance.net/gallery/132763995/Spring-and-summer',
            images: [
                'images/projects/Spring_and_summer/1.webp',
                'images/projects/Spring_and_summer/2.webp',
                'images/projects/Spring_and_summer/3.webp',
                'images/projects/Spring_and_summer/4.webp',
                'images/projects/Spring_and_summer/5.webp',
                'images/projects/Spring_and_summer/6.webp',
                'images/projects/Spring_and_summer/7.webp',
                'images/projects/Spring_and_summer/8.webp',
                'images/projects/Spring_and_summer/9.webp',
                'images/projects/Spring_and_summer/10.webp'
            ]
        },
        {
            name: 'Call me with you',
            url: 'https://www.behance.net/gallery/132798025/Call-me-with-you',
            images: [
                'images/projects/Call_me_with_you/1.webp',
                'images/projects/Call_me_with_you/2.webp',
                'images/projects/Call_me_with_you/3.webp',
                'images/projects/Call_me_with_you/4.webp',
                'images/projects/Call_me_with_you/5.webp',
                'images/projects/Call_me_with_you/6.webp',
                'images/projects/Call_me_with_you/7.webp',
                'images/projects/Call_me_with_you/8.webp',
                'images/projects/Call_me_with_you/9.webp'
            ]
        },
        {
            name: 'Blood on the canvas',
            url: 'https://www.behance.net/gallery/133009905/Blood-on-the-canvas',
            images: [
                'images/projects/Blood_on_the_canvas/1.webp',
                'images/projects/Blood_on_the_canvas/2.webp',
                'images/projects/Blood_on_the_canvas/3.webp',
                'images/projects/Blood_on_the_canvas/4.webp',
                'images/projects/Blood_on_the_canvas/5.webp'
            ]
        },
        {
            name: 'Raskolnikov\'s dreams',
            url: 'https://www.behance.net/gallery/133683461/Raskolnikov-s-dreams',
            images: [
                'images/projects/Raskolnikov_dreams/1.webp',
                'images/projects/Raskolnikov_dreams/2.webp',
                'images/projects/Raskolnikov_dreams/3.webp',
                'images/projects/Raskolnikov_dreams/4.webp',
                'images/projects/Raskolnikov_dreams/5.webp',
                'images/projects/Raskolnikov_dreams/6.webp',
                'images/projects/Raskolnikov_dreams/7.webp',
                'images/projects/Raskolnikov_dreams/8.webp',
                'images/projects/Raskolnikov_dreams/9.webp',
                'images/projects/Raskolnikov_dreams/11.webp',
                'images/projects/Raskolnikov_dreams/12.webp',
                'images/projects/Raskolnikov_dreams/13.webp',
                'images/projects/Raskolnikov_dreams/14.webp',
                'images/projects/Raskolnikov_dreams/15.webp',
                'images/projects/Raskolnikov_dreams/16.webp',
                'images/projects/Raskolnikov_dreams/17.webp',
                'images/projects/Raskolnikov_dreams/18.webp',
                'images/projects/Raskolnikov_dreams/19.webp',
                'images/projects/Raskolnikov_dreams/20.webp',
                'images/projects/Raskolnikov_dreams/21.webp',
                'images/projects/Raskolnikov_dreams/22.webp',
                'images/projects/Raskolnikov_dreams/23.webp',
                'images/projects/Raskolnikov_dreams/24.webp',
                'images/projects/Raskolnikov_dreams/25.webp',
                'images/projects/Raskolnikov_dreams/26.webp',
                'images/projects/Raskolnikov_dreams/27.webp',
                'images/projects/Raskolnikov_dreams/28.webp'
            ]
        },
        {
            name: 'Self portrait',
            url: 'https://www.behance.net/gallery/133754213/Self-portrait',
            images: [
                'images/projects/Self_portrait/1.webp'
            ]
        },
        {
            name: 'From love to hate',
            url: 'https://www.behance.net/gallery/133780161/From-love-to-hate',
            images: [
                'images/projects/From_love_to_hate/1.webp'
            ]
        },
        {
            name: 'I wanted to show you!',
            url: 'https://www.behance.net/gallery/180461029/I-wanted-to-show-you',
            images: [
                'images/projects/I_wanted_to_show_you/1.webp',
                'images/projects/I_wanted_to_show_you/2.webp',
                'images/projects/I_wanted_to_show_you/3.webp',
                'images/projects/I_wanted_to_show_you/4.webp',
                'images/projects/I_wanted_to_show_you/5.webp',
                'images/projects/I_wanted_to_show_you/6.webp',
                'images/projects/I_wanted_to_show_you/7.webp',
                'images/projects/I_wanted_to_show_you/8.webp'
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