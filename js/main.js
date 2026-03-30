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

    setTimeout(() => {
        initPage4(); // страница 4
    }, 300);
});

function initPage3() {
    window.page3Manager = new Page3Manager();
}

function initPage4() {
    window.page4Manager = new Page4Manager();
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
            name: 'AI',
            url: 'https://www.pinterest.com/axyelIlIo/',
            images: [
                'images/projects/O_OU/1.webp',
                'images/projects/O_OU/2.webp',
                'images/projects/O_OU/3.webp',
                'images/projects/O_OU/4.webp',
                'images/projects/O_OU/5.webp',
                'images/projects/O_OU/6.webp',
                'images/projects/O_OU/7.webp',
                'images/projects/O_OU/8.webp',
                'images/projects/O_OU/9.webp',
                'images/projects/O_OU/10.webp',
                'images/projects/O_OU/11.webp',
                'images/projects/O_OU/12.webp',
                'images/projects/O_OU/13.webp',
                'images/projects/O_OU/14.webp',
                'images/projects/O_OU/15.webp',
                'images/projects/O_OU/16.webp',
                'images/projects/O_OU/17.webp',
                'images/projects/O_OU/18.webp',
                'images/projects/O_OU/19.webp',
                'images/projects/O_OU/20.webp',
                'images/projects/O_OU/21.webp',
                'images/projects/O_OU/22.webp',
                'images/projects/O_OU/23.webp',
                'images/projects/O_OU/24.webp',
                'images/projects/O_OU/25.webp',
                'images/projects/O_OU/26.webp',
                'images/projects/O_OU/27.webp',
                'images/projects/O_OU/28.webp',
                'images/projects/O_OU/29.webp',
                'images/projects/O_OU/30.webp',
                'images/projects/O_OU/31.webp',
                'images/projects/O_OU/32.webp',
                'images/projects/O_OU/33.webp',
                'images/projects/O_OU/34.webp',
                'images/projects/O_OU/35.webp',
                'images/projects/O_OU/36.webp',
                'images/projects/O_OU/37.webp',
                'images/projects/O_OU/38.webp',
                'images/projects/O_OU/39.webp',
                'images/projects/O_OU/40.webp',
                'images/projects/O_OU/41.webp',
                'images/projects/O_OU/42.webp',
                'images/projects/O_OU/43.webp',
                'images/projects/O_OU/44.webp',
                'images/projects/O_OU/45.webp',
                'images/projects/O_OU/46.webp',
                'images/projects/O_OU/47.webp',
                'images/projects/O_OU/48.webp',
                'images/projects/O_OU/49.webp',
                'images/projects/O_OU/50.webp',
                'images/projects/O_OU/51.webp',
                'images/projects/O_OU/52.webp',
                'images/projects/O_OU/53.webp',
                'images/projects/O_OU/54.webp',
                'images/projects/O_OU/55.webp',
                'images/projects/O_OU/56.webp',
                'images/projects/O_OU/57.webp',
                'images/projects/O_OU/58.webp',
                'images/projects/O_OU/59.webp',
                'images/projects/O_OU/60.webp',
                'images/projects/O_OU/61.webp',
                'images/projects/O_OU/62.webp',
                'images/projects/O_OU/63.webp',
                'images/projects/O_OU/64.webp',
                'images/projects/O_OU/65.webp',
                'images/projects/O_OU/66.webp',
                'images/projects/O_OU/67.webp',
                'images/projects/O_OU/68.webp',
                'images/projects/O_OU/69.webp',
                'images/projects/O_OU/70.webp',
                'images/projects/O_OU/71.webp',
                'images/projects/O_OU/72.webp',
                'images/projects/O_OU/73.webp',
                'images/projects/O_OU/74.webp',
                'images/projects/O_OU/75.webp',
                'images/projects/O_OU/76.webp',
                'images/projects/O_OU/77.webp',
                'images/projects/O_OU/78.webp',
                'images/projects/O_OU/79.webp',
                'images/projects/O_OU/80.webp',
                'images/projects/O_OU/81.webp',
                'images/projects/O_OU/82.webp',
                'images/projects/O_OU/83.webp',
                'images/projects/O_OU/84.webp',
                'images/projects/O_OU/85.webp',
                'images/projects/O_OU/86.webp',
                'images/projects/O_OU/87.webp',
                'images/projects/O_OU/88.webp',
                'images/projects/O_OU/89.webp',
                'images/projects/O_OU/90.webp',
                'images/projects/O_OU/91.webp',
                'images/projects/O_OU/92.webp',
                'images/projects/O_OU/93.webp',
                'images/projects/O_OU/94.webp',
                'images/projects/O_OU/95.webp',
                'images/projects/O_OU/96.webp',
                'images/projects/O_OU/97.webp',
                'images/projects/O_OU/98.webp',
                'images/projects/O_OU/99.webp',
                'images/projects/O_OU/100.webp',
                'images/projects/O_OU/101.webp',
                'images/projects/O_OU/102.webp',
                'images/projects/O_OU/103.webp',
                'images/projects/O_OU/104.webp',
                'images/projects/O_OU/105.webp',
                'images/projects/O_OU/106.webp',
                'images/projects/O_OU/107.webp',
                'images/projects/O_OU/108.webp',
                'images/projects/O_OU/109.webp',
                'images/projects/O_OU/110.webp',
                'images/projects/O_OU/111.webp',
                'images/projects/O_OU/112.webp',
                'images/projects/O_OU/113.webp',
                'images/projects/O_OU/114.webp',
                'images/projects/O_OU/115.webp',
                'images/projects/O_OU/116.webp',
                'images/projects/O_OU/117.webp',
                'images/projects/O_OU/118.webp',
                'images/projects/O_OU/119.webp',
                'images/projects/O_OU/120.webp',
                'images/projects/O_OU/121.webp',
                'images/projects/O_OU/122.webp',
                'images/projects/O_OU/123.webp',
                'images/projects/O_OU/124.webp',
                'images/projects/O_OU/125.webp',
                'images/projects/O_OU/126.webp',
                'images/projects/O_OU/127.webp'
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
        } ,
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
        },
        {
            name: 'HOTEL - Love, Death & Robots EDIT',
            url: 'https://youtu.be/DpeKJaiLOd0?si=_2VfZz1Ee1K-YLTj',
            images: [
                'images/projects/HOTEL_LDR/1.webp'
            ]
        },
        {
            name: 'Ergo Proxy',
            url: 'https://www.youtube.com/watch?v=WwaHwI6gaf0&t=855s',
            images: [
                'images/projects/Ergo_Proxy/1.webp'
            ]
        },
        {
            name: 'Luxgoth YT Attribute',
            url: 'https://www.youtube.com/@luxgoth',
            images: [
                'images/projects/Luxgoth_YT_Attribute/1.webp',
                'images/projects/Luxgoth_YT_Attribute/2.webp',
                'images/projects/Luxgoth_YT_Attribute/3.webp'
            ]
        },
        {
            name: 'To bb - irreplaceability',
            url: 'https://dribbble.com/shots/27022663-to-bb',
            images: [
                'images/projects/Tattoo/1.webp'
            ]
        },
        {
            name: 'Rare Nights',
            url: 'https://vt.tiktok.com/ZSuoTGC26/',
            images: [
                'images/projects/RARE_NIGHTS/1.webp',
                'images/projects/RARE_NIGHTS/2.webp',
                'images/projects/RARE_NIGHTS/3.webp'
            ]
        },
        {
            name: 'LTZ',
            url: 'https://vt.tiktok.com/ZSuowFoVk/',
            images: [
                'images/projects/LTZ/1DlyaZhivih.webp',
                'images/projects/LTZ/2LOVERS.webp',
                'images/projects/LTZ/3Trip.webp'
            ]
        },
        {
            name: 'TRIGANA',
            url: 'https://www.instagram.com/nansjova',
            images: [
                'images/projects/TRIGANA/1.webp',
                'images/projects/TRIGANA/2.webp',
                'images/projects/TRIGANA/3.webp',
                'images/projects/TRIGANA/4.webp',
                'images/projects/TRIGANA/5.webp',
                'images/projects/TRIGANA/6.webp',
                'images/projects/TRIGANA/7.webp',
                'images/projects/TRIGANA/8.webp',
                'images/projects/TRIGANA/9.webp',
                'images/projects/TRIGANA/10.webp',
                'images/projects/TRIGANA/11.webp'
            ]
        },
        {
            name: 'Luxgoth Logo',
            url: 'https://dribbble.com/shots/27034499-Logo-for-motion-designer-Luxgoth',
            images: [
                'images/projects/Luxgoth_Logo/1.webp'
            ]
        },
        {
            name: 'Candy',
            url: 'https://www.behance.net/constantchoice',
            images: [
                'images/projects/Candy/1.webp',
                'images/projects/Candy/2.webp'
            ]
        },
        {
            name: 'hero in',
            url: 'https://www.behance.net/constantchoice',
            images: [
                'images/projects/hero_in/1.webp',
                'images/projects/hero_in/2.webp',
                'images/projects/hero_in/3.webp',
                'images/projects/hero_in/4.webp',
                'images/projects/hero_in/5.webp',
                'images/projects/hero_in/6.webp',
                'images/projects/hero_in/7.webp'
            ]
        },
        {
            name: 'Lizard Tail',
            url: 'https://www.behance.net/constantchoice',
            images: [
                'images/projects/Lizard_Tail/1.webp',
                'images/projects/Lizard_Tail/2.webp'
            ]
        },
        {
            name: 'Blow Up',
            url: 'https://www.behance.net/constantchoice',
            images: [
                'images/projects/BLOW_UP/1.webp',
                'images/projects/BLOW_UP/2.webp',
                'images/projects/BLOW_UP/3.webp',
                'images/projects/BLOW_UP/4.webp',
                'images/projects/BLOW_UP/5.webp',
                'images/projects/BLOW_UP/6.webp',
                'images/projects/BLOW_UP/7.webp',
                'images/projects/BLOW_UP/8.webp',
                'images/projects/BLOW_UP/9.webp',
                'images/projects/BLOW_UP/10.webp',
                'images/projects/BLOW_UP/11.webp',
                'images/projects/BLOW_UP/12.webp',
                'images/projects/BLOW_UP/13.webp',
                'images/projects/BLOW_UP/14.webp',
                'images/projects/BLOW_UP/15.webp',
                'images/projects/BLOW_UP/16.webp',
                'images/projects/BLOW_UP/17.webp',
                'images/projects/BLOW_UP/18.webp',
                'images/projects/BLOW_UP/19.webp',
                'images/projects/BLOW_UP/20.webp',
                'images/projects/BLOW_UP/21.webp',
                'images/projects/BLOW_UP/22.webp'
            ]
        },
        {
            name: 'Unpublished',
            url: 'https://www.instagram.com/constantchoice/',
            images: [
                'images/projects/unpublished/1.webp',
                'images/projects/unpublished/2.webp',
                'images/projects/unpublished/3.webp',
                'images/projects/unpublished/4.webp',
                'images/projects/unpublished/5.webp',
                'images/projects/unpublished/6.webp',
                'images/projects/unpublished/7.webp',
                'images/projects/unpublished/8.webp',
                'images/projects/unpublished/9.webp',
                'images/projects/unpublished/10.webp',
                'images/projects/unpublished/11.webp'
            ]
        },
        {
            name: 'DUBSTEP SCRIPT',
            url: 'https://github.com/constantchoice/DUBSTEP-SCRIPT',
            images: [
                'images/projects/DUBSTEP_SCRIPT/1.webp',
                'images/projects/DUBSTEP_SCRIPT/2.webp'
            ]
        },
        {
            name: 'SOON',
            url: 'https://www.behance.net/constantchoice',
            images: [
                'images/projects/HUI/1.webp',
                'images/projects/HUI/2.webp',
                'images/projects/HUI/3.webp',
                'images/projects/HUI/4.webp',
                'images/projects/HUI/5.webp',
                'images/projects/HUI/6.webp',
                'images/projects/HUI/7.webp',
                'images/projects/HUI/8.webp',
                'images/projects/HUI/9.webp',
                'images/projects/HUI/10.webp',
                'images/projects/HUI/11.webp'
            ]
        } 
        
/*         ,
        {
            name: 'Luxgoth YT Covers',
            url: 'https://www.youtube.com/@luxgoth',
            images: [
                'images/projects/Luxgoth_YT_Covers/1.webp',
                'images/projects/Luxgoth_YT_Covers/2.webp',
                'images/projects/Luxgoth_YT_Covers/3.webp',
                'images/projects/Luxgoth_YT_Covers/4.webp'
            ]
        } */
    ];
    
    // Добавляем проекты в галерею
    projects.forEach(project => {
        gallery.addProject(project);
    });
    
    // Сохраняем галерею в глобальную область для отладки
    window.projectGallery = gallery;
}