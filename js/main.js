// Точка входа в приложение
window.addEventListener('load', () => {
    // ===== constantchoice =====
    initSignature();

    // Создаем менеджер линий
    window.lineManager = new LineManager();
    
    // Создаем галерею для страницы 2
    setTimeout(() => {
        initGallery();
    }, 50);
    
    setTimeout(() => {
        initPage4(); // страница 4
    }, 300);

    // Создаем менеджер для страницы 3
    setTimeout(() => {
        initPage3();
    }, 600);
});

// ===== constantchoice =====
async function initSignature() {
    const container = document.querySelector('#page1 .page-content');
    if (!container) return;
    
    // Контейнер для SVG
    const signatureContainer = document.createElement('div');
    signatureContainer.className = 'signature-container';
    container.appendChild(signatureContainer);
    
    // ===== НАСТРОЙКИ =====
    const signature = new AnimatedSignature({
        duration: 22,              // Время рисования (сек)
        delay: 0.5,                // Задержка перед началом (сек)
        fillColor: '#999999',      
        pointCount: 1500,          // Количество точек
        easing: 'ease-in-out',
        scale: 1,                 
        
        // ===== ПОЗИЦИОНИРОВАНИЕ =====
        position: {
            top: '41.5%',
            left: '49.334%',
            transform: 'translate(-50%, -50%)',
            width: '80%',
            maxWidth: '900px'
        }
    });
    
    // ===== ЗАГРУЗКА SVG =====
    try {
        const svgPath = 'images/svg/constantchoice.svg';
        await signature.loadFromURL(svgPath);
        
        // ===== ЗАПУСК АНИМАЦИИ =====
        signature.start(signatureContainer, () => {
            console.log('✅ constantchoice');
        });
        
    } catch (error) {
        console.error('Ошибка загрузки SVG:', error);
    }
    
    // Сохраняем в глобальную область
    window.signature = signature;
}

function initPage3() {
    window.page3Manager = new Page3Manager();
}

function initPage4() {
    window.page4Manager = new Page4Manager();
}

function initGallery() {
    const gallery = new ProjectGallery('page2');
    
    // Проекты
    const projects = [
        {
            name: 'to bb',
            url: 'https://www.behance.net/gallery/184928549/To-bb',
            lat: 35.189240, 
            lng: 136.902163,
            images: [
                'images/projects/to_bb/1.webp',
                'images/projects/to_bb/2.webp',
                'images/projects/to_bb/4.webp',
                'images/projects/to_bb/7.webp',
                'images/projects/to_bb/8.webp',
                'images/projects/to_bb/9.webp',
                'images/projects/to_bb/11.webp',
                'images/projects/to_bb/12.webp',
                'images/projects/to_bb/13.webp',
                'images/projects/to_bb/14.webp',
                'images/projects/to_bb/15.webp',
                'images/projects/to_bb/16.webp',
                'images/projects/to_bb/18.webp',
                'images/projects/to_bb/19.webp',
                'images/projects/to_bb/20.webp',
                'images/projects/to_bb/21.webp',
                'images/projects/to_bb/23.webp',
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
                'images/projects/to_bb/38.webp',
                'images/projects/to_bb/40.webp',
                'images/projects/to_bb/41.webp',
                'images/projects/to_bb/42.webp',
                'images/projects/to_bb/43.webp',
                'images/projects/to_bb/44.webp',
                'images/projects/to_bb/45.webp',
                'images/projects/to_bb/46.webp',
                'images/projects/to_bb/47.webp',
                'images/projects/to_bb/48.webp',
                'images/projects/to_bb/52.webp',
                'images/projects/to_bb/53.webp',
                'images/projects/to_bb/54.webp',
                'images/projects/to_bb/56.webp',
                'images/projects/to_bb/57.webp',
                'images/projects/to_bb/59.webp',
                'images/projects/to_bb/60.webp',
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
                'images/projects/to_bb/73.webp',
                'images/projects/to_bb/74.webp',
                'images/projects/to_bb/75.webp',
                'images/projects/to_bb/76.webp',
                'images/projects/to_bb/77.webp'
            ],
            imagesGallery: [
                'images/projects/to_bb/preview/2.webp',
                'images/projects/to_bb/preview/29.webp',
                'images/projects/to_bb/preview/35.webp'
            ],
            imageAlts: {
                'images/projects/to_bb/1.webp': 'Overlapping distorted handwritten letterforms with elongated horizontal strokes.',
                'images/projects/to_bb/2.webp': 'Dense abstract composition of interwoven curved lines forming an irregular oval shape.',
                'images/projects/to_bb/4.webp': 'Tall experimental letterforms layered vertically with stretched geometric strokes.',
                'images/projects/to_bb/7.webp': 'Minimal botanical line drawing of a wildflower with long leaves and sprawling stems.',
                'images/projects/to_bb/8.webp': 'Abstract angular lettering constructed from overlapping rectangular and curved strokes.',
                'images/projects/to_bb/9.webp': 'Ornamental calligraphic form with flowing curves and intertwined decorative strokes.',
                'images/projects/to_bb/11.webp': 'Experimental typography sheet filled with scattered handwritten numerals and distorted symbols.',
                'images/projects/to_bb/12.webp': 'Organic botanical line drawing of a tall curved stem with a curled flower bud.',
                'images/projects/to_bb/13.webp': 'Dense collage of overlapping irregular handwritten glyphs and abstract letterforms.',
                'images/projects/to_bb/14.webp': 'Minimal line drawing of a spider with a rounded body and long angular legs.',
                'images/projects/to_bb/15.webp': 'Large angular five-point star drawn with intersecting geometric lines.',
                'images/projects/to_bb/16.webp': 'Abstract arrangement of overlapping loops and elongated calligraphic strokes.',
                'images/projects/to_bb/18.webp': 'Fragmented handwritten lettering arranged in several horizontal bands.',
                'images/projects/to_bb/19.webp': 'Minimal elongated curved outline resembling a flattened organic shape.',
                'images/projects/to_bb/20.webp': 'Symmetrical flowing line composition with a central vertical form branching into curved strokes.',
                'images/projects/to_bb/21.webp': 'Expressive handwritten lettering made from tall irregular strokes and intersecting lines.',
                'images/projects/to_bb/23.webp': 'Vertical experimental typographic composition with overlapping angular and curved glyphs.',
                'images/projects/to_bb/25.webp': 'Large spiral symbol formed by a continuous sweeping curved line.',
                'images/projects/to_bb/26.webp': 'Minimal handwritten lettering spelling "one" with widely spaced irregular characters.',
                'images/projects/to_bb/27.webp': 'Intricate vertical assemblage of distorted letterforms and ornamental geometric strokes.',
                'images/projects/to_bb/28.webp': 'Elongated abstract figure-like composition with a small rounded top and flowing lower lines.',
                'images/projects/to_bb/29.webp': 'Loose distorted handwritten wordmark with sweeping curves and sharply extended strokes.',
                'images/projects/to_bb/30.webp': 'Four pairs of thin intersecting diagonal lines forming repeated angular cross shapes.',
                'images/projects/to_bb/31.webp': 'Irregular ornamental frame made of dense intertwined organic linework.',
                'images/projects/to_bb/32.webp': 'Minimal composition consisting of a long thin horizontal line with a short offset stroke.',
                'images/projects/to_bb/33.webp': 'Pair of symmetrical eye-shaped outlines drawn with rough expressive strokes.',
                'images/projects/to_bb/34.webp': 'Sparse typographic layout with two small clusters of handwritten symbols separated by a vertical line.',
                'images/projects/to_bb/35.webp': 'Layered angular line composition with interwoven geometric shapes and dense central detailing.',
                'images/projects/to_bb/36.webp': 'Three horizontal arrangements of fragmented experimental lettering and stretched strokes.',
                'images/projects/to_bb/38.webp': 'Glossy black curved triangular sculpture surrounding intertwined red and green organic forms.',
                'images/projects/to_bb/40.webp': 'Dense vertical composition of overlapping distorted calligraphic letterforms and extended horizontal lines.',
                'images/projects/to_bb/41.webp': 'Minimal pointed arch-shaped outline formed by two tall curved lines.',
                'images/projects/to_bb/42.webp': 'Complex abstract typographic composition made of overlapping angular and handwritten strokes.',
                'images/projects/to_bb/43.webp': 'Large angular triangular letterform drawn with long intersecting geometric strokes.',
                'images/projects/to_bb/44.webp': 'Two separate clusters of distorted experimental lettering arranged vertically.',
                'images/projects/to_bb/45.webp': 'Dense intertwined calligraphic forms arranged inside a large sweeping oval outline.',
                'images/projects/to_bb/46.webp': 'Stylized line drawing of a human bust beside several groups of fragmented handwritten lettering.',
                'images/projects/to_bb/47.webp': 'Dense cluster of expressive handwritten calligraphy layered into an irregular rectangular shape.',
                'images/projects/to_bb/48.webp': 'Abstract architectural composition of two tall curved arch-like forms.',
                'images/projects/to_bb/52.webp': 'Geometric typographic study with overlapping rectangular frames and angular letter-like structures.',
                'images/projects/to_bb/53.webp': 'Dense layered composition of handwritten glyphs and distorted geometric lettering.',
                'images/projects/to_bb/54.webp': 'Handwritten visual study combining numbered marks, arrows, curved strokes and diagram-like annotations.',
                'images/projects/to_bb/56.webp': 'Sparse abstract line study with several angular open outlines and curved fragments.',
                'images/projects/to_bb/57.webp': 'Spiky abstract calligraphic symbol formed from dense intersecting curved and angular strokes.',
                'images/projects/to_bb/59.webp': 'Layered experimental typography arranged in multiple horizontal bands of distorted lettering.',
                'images/projects/to_bb/60.webp': 'Collection of hand-drawn star shapes and irregular oval symbols connected by extended lines.',
                'images/projects/to_bb/62.webp': 'Large expressive handwritten monogram with elongated intersecting letter-like strokes.',
                'images/projects/to_bb/63.webp': 'Minimal handwritten lettering with widely spaced angular characters and an oval final form.',
                'images/projects/to_bb/64.webp': 'Loose handwritten typographic sketches arranged in several overlapping lines.',
                'images/projects/to_bb/65.webp': 'Complex architectural line composition with layered arches, angular structures and overlapping forms.',
                'images/projects/to_bb/66.webp': 'Large abstract curved outline resembling overlapping flowing ribbons.',
                'images/projects/to_bb/67.webp': 'Long expressive calligraphic signature formed from sweeping handwritten strokes.',
                'images/projects/to_bb/68.webp': 'Two horizontal lines of loose handwritten lettering and experimental typographic marks.',
                'images/projects/to_bb/69.webp': 'Vertical ornamental composition of intertwined calligraphic loops and curved strokes.',
                'images/projects/to_bb/70.webp': 'Organic line drawing with two large leaf-like loops branching from a central vertical form.',
                'images/projects/to_bb/71.webp': 'Large loose handwritten lettering with tall irregular strokes and intersecting curves.',
                'images/projects/to_bb/73.webp': 'Circular wreath-like composition made from dense intertwined ornamental letterforms.',
                'images/projects/to_bb/74.webp': 'Minimal geometric study of intersecting vertical and horizontal lines with rectangular divisions.',
                'images/projects/to_bb/75.webp': 'Sparse abstract arrangement of short horizontal bars and isolated linear marks.',
                'images/projects/to_bb/76.webp': 'Repeating sequence of curved triangular wave-like forms connected by flowing lines.',
                'images/projects/to_bb/77.webp': 'Long narrow leaf-like outline with several delicate parallel interior strokes.',

                'images/projects/to_bb/preview/2.webp': 'Dense abstract composition of interwoven curved lines forming an irregular oval shape.',
                'images/projects/to_bb/preview/29.webp': 'Loose distorted handwritten wordmark with sweeping curves and sharply extended strokes.',
                'images/projects/to_bb/preview/35.webp': 'Layered angular line composition with interwoven geometric shapes and dense central detailing.'
            }
        },
         {
            name: 'AI',
            url: 'https://www.pinterest.com/axyelIlIo/',
            lat: 59.945454, 
            lng: 30.370971,
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
                'images/projects/O_OU/13.webp',
                'images/projects/O_OU/14.webp',
                'images/projects/O_OU/15.webp',
                'images/projects/O_OU/16.webp',
                'images/projects/O_OU/21.webp',
                'images/projects/O_OU/24.webp',
                'images/projects/O_OU/25.webp',
                'images/projects/O_OU/26.webp',
                'images/projects/O_OU/28.webp',
                'images/projects/O_OU/29.webp',
                'images/projects/O_OU/30.webp',
                'images/projects/O_OU/31.webp',
                'images/projects/O_OU/32.webp',
                'images/projects/O_OU/33.webp',
                'images/projects/O_OU/34.webp',
                'images/projects/O_OU/35.webp',
                'images/projects/O_OU/37.webp',
                'images/projects/O_OU/38.webp',
                'images/projects/O_OU/39.webp',
                'images/projects/O_OU/40.webp',
                'images/projects/O_OU/42.webp',
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
                'images/projects/O_OU/82.webp',
                'images/projects/O_OU/83.webp',
                'images/projects/O_OU/84.webp',
                'images/projects/O_OU/85.webp',
                'images/projects/O_OU/86.webp',
                'images/projects/O_OU/87.webp',
                'images/projects/O_OU/88.webp',
                'images/projects/O_OU/89.webp',
                'images/projects/O_OU/91.webp',
                'images/projects/O_OU/93.webp',
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
                'images/projects/O_OU/106.webp',
                'images/projects/O_OU/107.webp',
                'images/projects/O_OU/108.webp',
                'images/projects/O_OU/110.webp',
                'images/projects/O_OU/113.webp',
                'images/projects/O_OU/116.webp',
                'images/projects/O_OU/117.webp',
                'images/projects/O_OU/120.webp',
                'images/projects/O_OU/121.webp',
                'images/projects/O_OU/122.webp',
                'images/projects/O_OU/123.webp',
                'images/projects/O_OU/126.webp',
                'images/projects/O_OU/127.webp'
            ],
            imagesGallery: [
                'images/projects/O_OU/preview/4.webp',
                'images/projects/O_OU/preview/38.webp',
                'images/projects/O_OU/preview/59.webp'
            ],
            imageAlts: {
                'images/projects/O_OU/1.webp': 'A dark-haired figure in a black outfit standing in a dim, overgrown urban setting.',
                'images/projects/O_OU/2.webp': 'A seated figure in a white shirt and pale trousers, with a distorted, shadowed face and paint-like textures.',
                'images/projects/O_OU/3.webp': 'A young figure in a white graphic T-shirt surrounded by shimmering, iridescent light.',
                'images/projects/O_OU/4.webp': 'A group of blurred figures beneath a glowing circular light in a dark, atmospheric scene.',
                'images/projects/O_OU/5.webp': 'A surreal scene of pale humanoid figures and distorted faces viewed through a curved architectural structure.',
                'images/projects/O_OU/6.webp': 'A desolate cemetery with dark crosses and a distant figure beneath dramatic beams of light.',
                'images/projects/O_OU/7.webp': 'A towering pale figure with long hair walking through a shadowy forest among smaller silhouettes.',
                'images/projects/O_OU/8.webp': 'A lone silhouette facing a group of figures inside a surreal pink-lit architectural space.',
                'images/projects/O_OU/9.webp': 'A pale-faced woman with tangled, flowing hair wearing a black outfit against a light background.',
                'images/projects/O_OU/10.webp': 'A ghostly humanoid figure emerging from a dark, misty and textured environment.',
                'images/projects/O_OU/13.webp': 'A dark-haired woman in black standing among a crowd beneath bright, sparkling lights.',
                'images/projects/O_OU/14.webp': 'A shadowy figure walking through a rain-soaked city street illuminated by blurred lights.',
                'images/projects/O_OU/15.webp': 'A surreal pale architectural form with a curved opening reflected on a dark, glossy floor.',
                'images/projects/O_OU/16.webp': 'A lone figure approaching a monumental organic structure in a bare, surreal landscape.',
                'images/projects/O_OU/21.webp': 'A dark-clothed figure seen from behind in a pale, sculptural corridor.',
                'images/projects/O_OU/24.webp': 'A distorted humanoid portrait with a smooth, reflective head and blurred facial features.',
                'images/projects/O_OU/25.webp': 'A translucent human figure suspended in a tall, shadowed architectural opening.',
                'images/projects/O_OU/26.webp': 'A fashion model in a white outfit with reflective embellishments and projected green light.',
                'images/projects/O_OU/28.webp': 'A pale-haired figure in black standing beneath a monumental arch in a dark, reflective setting.',
                'images/projects/O_OU/29.webp': 'A silhouetted person approaching a large coiled sculptural form inside a bright architectural space.',
                'images/projects/O_OU/30.webp': 'A pale-faced figure in a flowing black outfit standing in a mist-filled corridor.',
                'images/projects/O_OU/31.webp': 'A solitary figure in black beneath a vast organic, shell-like structure.',
                'images/projects/O_OU/32.webp': 'A dark humanoid figure standing in shallow water amid green and white reflections.',
                'images/projects/O_OU/33.webp': 'A shadowy figure at the end of a surreal forest passage as a bright stream of light spills forward.',
                'images/projects/O_OU/34.webp': 'A pale-faced figure in black standing before a large blue-toned abstract projection.',
                'images/projects/O_OU/35.webp': 'A sequence of overlapping fashion models in loose pale clothing against a monochrome background.',
                'images/projects/O_OU/37.webp': 'A dark silhouette framed by a large, flowing organic structure.',
                'images/projects/O_OU/38.webp': 'A small human silhouette beneath a towering dark plume of smoke and light.',
                'images/projects/O_OU/39.webp': 'A blurred humanoid figure between enormous textured organic forms against a black background.',
                'images/projects/O_OU/40.webp': 'An abstract close-up of glossy black sculptural forms with distorted reflections.',
                'images/projects/O_OU/42.webp': 'Several pale fashion models in translucent textured garments arranged in a dark, atmospheric space.',
                'images/projects/O_OU/44.webp': 'A ghostly double-exposed portrait of a dark-haired person against a dim background.',
                'images/projects/O_OU/45.webp': 'A pale-haired fashion figure in an oversized dark outfit beneath a dramatic organic structure.',
                'images/projects/O_OU/46.webp': 'A group of silhouettes moving through a hazy, illuminated interior.',
                'images/projects/O_OU/47.webp': 'A pale figure with red markings across the face wearing a loose white outfit in a smoky setting.',
                'images/projects/O_OU/48.webp': 'A pale figure in a flowing white garment surrounded by overlapping shadowy faces.',
                'images/projects/O_OU/49.webp': 'A dark-haired figure in white standing in a rain-soaked city scene with blurred neon lights.',
                'images/projects/O_OU/50.webp': 'A seated figure in black before a group of pale, distorted bodies behind a curtain of water.',
                'images/projects/O_OU/51.webp': 'A dark winged figure standing inside an ornate stone archway.',
                'images/projects/O_OU/52.webp': 'A figure in black with a reflective head covering reaching toward a dark wall.',
                'images/projects/O_OU/53.webp': 'A seated figure in white surrounded by layered green and blue translucent textures.',
                'images/projects/O_OU/54.webp': 'Two figures in dark clothing on wet stone steps beneath a red illuminated backdrop.',
                'images/projects/O_OU/55.webp': 'A seated figure in a dark outfit framed by pale columns and reflective surfaces.',
                'images/projects/O_OU/57.webp': 'A pale-faced figure in black standing behind a web-like translucent foreground.',
                'images/projects/O_OU/58.webp': 'A blurred architectural passage with a reflective central opening and dark tree-like forms above.',
                'images/projects/O_OU/59.webp': 'A pale sculptural figure in a garden installation surrounded by white walls and pink floral textures.',
                'images/projects/O_OU/60.webp': 'Three dark-clothed figures walking through a monochrome outdoor scene beneath drifting smoke.',
                'images/projects/O_OU/61.webp': 'A dark-clothed figure standing in an ornate arched doorway with one arm extended.',
                'images/projects/O_OU/62.webp': 'A pale skeletal humanoid figure posed inside a white architectural archway.',
                'images/projects/O_OU/63.webp': 'Silhouetted figures among cemetery crosses beneath a purple, star-like sky.',
                'images/projects/O_OU/64.webp': 'Two figures in pale clothing standing in a misty, reflective space.',
                'images/projects/O_OU/65.webp': 'An abstract dark organic form with a narrow bright opening and flowing translucent textures.',
                'images/projects/O_OU/66.webp': 'Three fashion figures in glossy black and white outfits with glowing red eyes.',
                'images/projects/O_OU/67.webp': 'A surreal cemetery scene with pale crosses and figures beneath a vertical stream of fire.',
                'images/projects/O_OU/68.webp': 'A dark, distorted humanoid figure in a flowing black garment against a pale background.',
                'images/projects/O_OU/69.webp': 'A pale figure in a textured white outfit leaning against a tree-like sculptural surface.',
                'images/projects/O_OU/70.webp': 'A pale-faced figure with dark hair partly covered by a textured white hood, wearing black.',
                'images/projects/O_OU/71.webp': 'A tiny silhouette facing a monumental abstract projection inside a dark gallery-like space.',
                'images/projects/O_OU/72.webp': 'A pale figure in a white shirt with an open mouth, framed by a cracked dark background.',
                'images/projects/O_OU/73.webp': 'A pale-haired fashion model in a translucent textured garment posing beside an ornate arch.',
                'images/projects/O_OU/74.webp': 'A white-clothed figure walking through a circular pavilion with reflective floors and columns.',
                'images/projects/O_OU/75.webp': 'A blurred white silhouette walking through a dark circular architectural interior.',
                'images/projects/O_OU/76.webp': 'A pale-haired model in a vivid blue oversized top posing before a surreal crowd.',
                'images/projects/O_OU/77.webp': 'A pale-haired figure in a translucent pink-toned top and black trousers beside an ornate arch.',
                'images/projects/O_OU/78.webp': 'A lone figure walking through a circular hall with distorted pink and white forms on the floor.',
                'images/projects/O_OU/79.webp': 'A blurred pale figure in a blue-lit environment surrounded by flowing organic textures.',
                'images/projects/O_OU/80.webp': 'A pale figure with long flowing hair leaning forward in a dark, wooded setting.',
                'images/projects/O_OU/82.webp': 'A pale-haired figure crouching in a reflective outdoor setting among other distorted silhouettes.',
                'images/projects/O_OU/83.webp': 'A blurred figure in white seated in a blue-lit architectural space.',
                'images/projects/O_OU/84.webp': 'A luminous figure in a translucent dress surrounded by shadowy silhouettes and sparkling particles.',
                'images/projects/O_OU/85.webp': 'Monochrome portrait of a pale, bald figure wearing a black sweater, with translucent material stretched across the eyes and a textured abstract background.',
                'images/projects/O_OU/86.webp': 'A pale-haired figure seated before a dark metal fence in a grainy, monochrome scene.',
                'images/projects/O_OU/87.webp': 'A dark silhouette facing a pale wall with several overlapping ghost-like figures.',
                'images/projects/O_OU/88.webp': 'A pale figure in a white shirt leaning over a dark railing amid blurred lights.',
                'images/projects/O_OU/89.webp': 'A long-haired figure in a flowing pale garment walking through a dense, surreal forest.',
                'images/projects/O_OU/91.webp': 'A figure in black with an elongated sculptural headpiece surrounded by bright, web-like light.',
                'images/projects/O_OU/93.webp': 'A pale figure seated above a display of portraits in a dark outdoor installation.',
                'images/projects/O_OU/95.webp': 'A dark-haired woman in black with a translucent floral form overlapping her face.',
                'images/projects/O_OU/96.webp': 'A monochrome portrait of a woman in black with tangled, smoke-like hair obscuring part of her face.',
                'images/projects/O_OU/97.webp': 'A group of young fashion models in reflective clothing, with a figure in a white graphic shirt in the foreground.',
                'images/projects/O_OU/98.webp': 'A pale-haired figure in white surrounded by layered reflections and translucent silhouettes.',
                'images/projects/O_OU/99.webp': 'A crowd of figures in translucent garments gathered in a dim, reflective space.',
                'images/projects/O_OU/100.webp': 'A pale-haired fashion figure in black standing behind a large dark foreground structure.',
                'images/projects/O_OU/101.webp': 'A pale-haired figure in a dark outfit leaning against a reflective wall.',
                'images/projects/O_OU/102.webp': 'A dark-haired figure in black reaching toward a rain-covered glass surface in a neon-lit setting.',
                'images/projects/O_OU/103.webp': 'A pale-haired figure in a translucent white outfit leaning over a dark railing.',
                'images/projects/O_OU/104.webp': 'A serene portrait of a pale woman with closed eyes, overlaid with large translucent white flowers.',
                'images/projects/O_OU/106.webp': 'A dark silhouette seated in a monumental pale architectural space beside a blurred figure.',
                'images/projects/O_OU/107.webp': 'A tall, elongated humanoid figure standing between pale columns in a dark, surreal interior.',
                'images/projects/O_OU/108.webp': 'A pale, sculptural figure standing before a dark forest-like backdrop and a textured wall.',
                'images/projects/O_OU/110.webp': 'A blurred white figure standing in a green, mist-filled outdoor setting.',
                'images/projects/O_OU/113.webp': 'Several translucent humanoid figures moving through a circular pavilion.',
                'images/projects/O_OU/116.webp': 'Two dark silhouettes in an abstract blue-lit space, one standing above the other.',
                'images/projects/O_OU/117.webp': 'A pale figure in a loose white outfit standing between columns in a softly lit architectural space.',
                'images/projects/O_OU/120.webp': 'Two translucent humanoid figures standing in a dark hall between tall columns.',
                'images/projects/O_OU/121.webp': 'A reflective humanoid figure in a white shirt walking through a dark, columned space.',
                'images/projects/O_OU/122.webp': 'A close-up of a reflective, translucent humanoid form with handwritten markings on a dark surface.',
                'images/projects/O_OU/123.webp': 'A pale figure in a white shirt and dark trousers standing in a shadowed architectural doorway.',
                'images/projects/O_OU/126.webp': 'A pale-haired figure in a black outfit standing in a misty arched passage.',
                'images/projects/O_OU/127.webp': 'A dark-haired woman in a pale dress and black jacket standing amid glowing mist.',

                'images/projects/O_OU/preview/4.webp': 'A group of blurred figures beneath a glowing circular light in a dark, atmospheric scene.',
                'images/projects/O_OU/preview/38.webp': 'A small human silhouette beneath a towering dark plume of smoke and light.',
                'images/projects/O_OU/preview/59.webp': 'A pale sculptural figure in a garden installation surrounded by white walls and pink floral textures.'
            }
        },
        {
            name: 'Cartoons',
            url: 'https://www.behance.net/gallery/185496395/Cartoons-STATIC',
            lat: 43.104446, 
            lng: 131.871184,
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
            ],
            imagesGallery: [
                'images/projects/cartoons/preview/1.webp',
                'images/projects/cartoons/preview/2.webp',
                'images/projects/cartoons/preview/3.webp'
            ],
            imageAlts: {
                'images/projects/cartoons/1.webp': 'Hooded figure holding both hands up toward the camera, photographed in monochrome.',
                'images/projects/cartoons/2.webp': 'White tree branches with sparse orange and yellow autumn leaves against a deep blue sky.',
                'images/projects/cartoons/3.webp': 'Dark silhouetted figure standing in front of a graffiti-covered brick wall at night.',
                'images/projects/cartoons/4.webp': 'Sailboat moored in a quiet marina, photographed in muted sepia tones.',
                'images/projects/cartoons/5.webp': 'Dark silhouette of a person facing a row of brightly lit screens indoors.',
                'images/projects/cartoons/6.webp': 'Abstract composition of vivid red geometric forms over a dark, grainy background with blue and green light.',
                'images/projects/cartoons/7.webp': 'Person wearing a black shirt with a large white graffiti-style graphic, standing beside shelves in a dim workspace.',
                'images/projects/cartoons/8.webp': 'Dark seascape at sunset with a glowing orange horizon and distant mountain silhouettes.',
                'images/projects/cartoons/9.webp': 'Abstract blurred close-up in vivid magenta, pink and violet tones.',
                'images/projects/cartoons/10.webp': 'Long-exposure photograph of a passing train or vehicle, with horizontal golden light trails and dark vegetation.',
                'images/projects/cartoons/11.webp': 'Glowing cyan geometric emblem displayed over a nighttime street scene.',
                'images/projects/cartoons/12.webp': 'Person in a teal hooded jacket and backpack standing inside a narrow concrete tunnel.',
                'images/projects/cartoons/13.webp': 'Blurry nighttime street scene with a small car and reflections of colorful neon lights on wet pavement.',
                'images/projects/cartoons/14.webp': 'Monochrome silhouette of a person holding their head beneath a bright streetlight at night.',
                'images/projects/cartoons/15.webp': 'Close-up of hands holding a small metal tool against another person’s forearm in a workshop.',
                'images/projects/cartoons/16.webp': 'High-contrast black-and-white distorted close-up of a human face with liquid-like reflections.',
                'images/projects/cartoons/17.webp': 'Abstract horizontal composition of pale blue and white forms against a dark red and black background.',
                'images/projects/cartoons/18.webp': 'Backlit silhouette of a person seen from behind, surrounded by intense white light.',
                'images/projects/cartoons/19.webp': 'Large red handwritten graffiti lettering layered over a monochrome landscape of water and distant hills.',

                'images/projects/cartoons/preview/1.webp': 'Hooded figure holding both hands up toward the camera, photographed in monochrome.',
                'images/projects/cartoons/preview/2.webp': 'White tree branches with sparse orange and yellow autumn leaves against a deep blue sky.',
                'images/projects/cartoons/preview/3.webp': 'Dark silhouetted figure standing in front of a graffiti-covered brick wall at night.'
            }
        },
        {
            name: 'Drunken ecstasy 2',
            url: 'https://www.behance.net/gallery/237677261/Drunken-ecstasy-2',
            lat: 43.116874, 
            lng: 131.923855,
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
                'images/projects/de2/12.webp',
                'images/projects/de2/13.webp',
                'images/projects/de2/14.webp',
                'images/projects/de2/15.webp',
                'images/projects/de2/16.webp',
                'images/projects/de2/19.webp',
                'images/projects/de2/21.webp',
                'images/projects/de2/24.webp',
                'images/projects/de2/29.webp'
            ],
            imagesGallery: [
                'images/projects/de2/preview/6.webp',
                'images/projects/de2/preview/8.webp',
                'images/projects/de2/preview/24.webp'
            ],
            imageAlts: {
                'images/projects/de2/1.webp': 'A blurred figure in black walking through a rain-soaked garden at night, surrounded by bright reflections and green foliage.',
                'images/projects/de2/2.webp': 'A blonde woman in black clothing and sunglasses standing beneath dense tree branches in a dark park.',
                'images/projects/de2/3.webp': 'Close-up portrait of a blonde woman wearing dark sunglasses beneath yellow autumn leaves at night.',
                'images/projects/de2/4.webp': 'A woman in a black dress reaching toward the branches of a tree in a brightly lit night garden.',
                'images/projects/de2/5.webp': 'A solitary figure in black standing on wet pavement in a dimly lit park at night.',
                'images/projects/de2/6.webp': 'A blonde woman in sunglasses and a black dress posing on outdoor steps beneath overhanging trees.',
                'images/projects/de2/7.webp': 'A dark silhouette of a woman standing on wet garden steps beneath a distant blue-white light.',
                'images/projects/de2/8.webp': 'Overexposed close-up of a blonde woman in reflective sunglasses and black clothing, extending both arms outward.',
                'images/projects/de2/9.webp': 'A blonde woman in a black outfit standing beneath a bright streetlight, with her arms folded against a dark background.',
                'images/projects/de2/10.webp': 'An extremely dark close-up portrait of a blonde woman wearing reflective sunglasses.',
                'images/projects/de2/12.webp': 'A blonde woman in a black dress and sunglasses standing with one arm extended beside a dark corrugated wall.',
                'images/projects/de2/13.webp': 'A solitary figure in black walking away along a foggy, dimly lit path at night.',
                'images/projects/de2/14.webp': 'A heavily overexposed figure walking through a garden path surrounded by bright white light and dark shrubs.',
                'images/projects/de2/15.webp': 'An empty rain-soaked city street at night, disappearing into thick fog beneath amber streetlights.',
                'images/projects/de2/16.webp': 'A dark wet street at night illuminated by intense red-orange streetlights and reflections.',
                'images/projects/de2/19.webp': 'A deserted night street with parked cars and glowing red-orange lights reflected on wet asphalt.',
                'images/projects/de2/21.webp': 'A dark nighttime parking area with parked cars, scattered streetlights and soft light trails.',
                'images/projects/de2/24.webp': 'A blurred rear view of a person looking toward distant lights through a foggy night landscape.',
                'images/projects/de2/29.webp': 'A blonde woman in black leaning forward and raising both middle fingers toward the camera in a dark outdoor setting.',

                'images/projects/de2/preview/6.webp': 'A blonde woman in sunglasses and a black dress posing on outdoor steps beneath overhanging trees.',
                'images/projects/de2/preview/8.webp': 'Overexposed close-up of a blonde woman in reflective sunglasses and black clothing, extending both arms outward.',
                'images/projects/de2/preview/24.webp': 'A blurred rear view of a person looking toward distant lights through a foggy night landscape.'
            }
        },
        {
            name: 'Drunken ecstasy',
            url: 'https://www.behance.net/gallery/132798515/Drunken-ecstasy',
            lat: 43.105329, 
            lng: 131.874435,
            images: [
                'images/projects/de/1.webp',
                'images/projects/de/2.webp',
                'images/projects/de/3.webp',
                'images/projects/de/4.webp',
                'images/projects/de/5.webp',
                'images/projects/de/6.webp',
                'images/projects/de/7.webp'
            ],
            imagesGallery: [
                'images/projects/de/preview/1.webp',
                'images/projects/de/preview/2.webp',
                'images/projects/de/preview/3.webp'
            ],
            imageAlts: {
                'images/projects/de/1.webp': 'Abstract long-exposure night photograph with warm amber light trails and blurred glowing shapes against a dark background.',
                'images/projects/de/2.webp': 'A blurred night scene with bright yellow-white light trails stretching across a dark green and amber background.',
                'images/projects/de/3.webp': 'Abstract green and white light trails captured in motion against a dark nighttime background.',
                'images/projects/de/4.webp': 'Bright white winding light trails crossing an intense amber and yellow abstract night scene.',
                'images/projects/de/5.webp': 'An abstract close-up of a glowing streetlight and curved white light trails against a warm orange night background.',
                'images/projects/de/6.webp': 'An overexposed golden-yellow abstract photograph filled with luminous handwritten-looking light trails.',
                'images/projects/de/7.webp': 'A blurred nighttime street scene with amber fog, glowing streetlights and distant light trails.',

                'images/projects/de/preview/1.webp': 'Abstract long-exposure night photograph with warm amber light trails and blurred glowing shapes against a dark background.',
                'images/projects/de/preview/2.webp': 'A blurred night scene with bright yellow-white light trails stretching across a dark green and amber background.',
                'images/projects/de/preview/3.webp': 'Abstract green and white light trails captured in motion against a dark nighttime background.'
            }
        },
        {
            name: 'Walking with a friend',
            url: 'https://www.behance.net/gallery/132755409/Walking-with-a-friend',
            lat: 43.106632, 
            lng: 131.877383,
            images: [
                'images/projects/Walking_with_a_friend/1.webp'
            ],
            imagesGallery: [
                'images/projects/Walking_with_a_friend/preview/1.webp'
            ],
            imageAlts: {
                'images/projects/Walking_with_a_friend/1.webp': 'Abstract textured collage of overlapping shadowy forms and warm yellow, green and pink light, crossed by a bright handwritten-looking light trail.',
                'images/projects/Walking_with_a_friend/preview/1.webp': 'Abstract textured collage of overlapping shadowy forms and warm yellow, green and pink light, crossed by a bright handwritten-looking light trail.'
            }
        },
        {
            name: 'Spring and summer',
            url: 'https://www.behance.net/gallery/132763995/Spring-and-summer', 
            lat: 43.115300, 
            lng: 131.885007,
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
            ],
            imagesGallery: [
                'images/projects/Spring_and_summer/preview/1.webp',
                'images/projects/Spring_and_summer/preview/3.webp',
                'images/projects/Spring_and_summer/preview/9.webp'
            ],
            imageAlts: {
                'images/projects/Spring_and_summer/1.webp': 'A dark burgundy fabric-like form draped into an abstract vertical shape against a smooth light gray background.',
                'images/projects/Spring_and_summer/2.webp': 'A white chalk-like geometric drawing of an irregular architectural form on a black textured background.',
                'images/projects/Spring_and_summer/3.webp': 'Dense monochrome abstract composition of tangled organic lines and layered textures with subtle cyan and red accents.',
                'images/projects/Spring_and_summer/4.webp': 'Flowing golden wireframe loops forming an abstract sculptural shape against a deep teal background.',
                'images/projects/Spring_and_summer/5.webp': 'A monochrome surreal composition featuring a large dark eye-like circular form surrounded by smoky organic shapes.',
                'images/projects/Spring_and_summer/6.webp': 'An abstract composition of tangled dark organic lines over a vivid red, magenta and cyan background.',
                'images/projects/Spring_and_summer/7.webp': 'Two vivid green butterflies positioned around a hand-drawn circular symbol on a dark green background.',
                'images/projects/Spring_and_summer/8.webp': 'A symmetrical dark red wing-like abstract form beneath a vertical beam of green and cyan light.',
                'images/projects/Spring_and_summer/9.webp': 'A thick black-and-white tangled line drawing over a vivid background of turquoise, yellow, orange and red.',
                'images/projects/Spring_and_summer/10.webp': 'A thin glossy black diagonal line on a dark charcoal textured surface with a subtle red reflection.',

                'images/projects/Spring_and_summer/preview/1.webp': 'A dark burgundy fabric-like form draped into an abstract vertical shape against a smooth light gray background.',
                'images/projects/Spring_and_summer/preview/3.webp': 'Dense monochrome abstract composition of tangled organic lines and layered textures with subtle cyan and red accents.',
                'images/projects/Spring_and_summer/preview/9.webp': 'A thick black-and-white tangled line drawing over a vivid background of turquoise, yellow, orange and red.'
            }
        },
        {
            name: 'Call me with you',
            url: 'https://www.behance.net/gallery/132798025/Call-me-with-you',
            lat: 43.104422,
            lng: 131.862552,
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
            ],
            imagesGallery: [
                'images/projects/Call_me_with_you/preview/1.webp',
                'images/projects/Call_me_with_you/preview/6.webp',
                'images/projects/Call_me_with_you/preview/8.webp'
            ],
            imageAlts: {
                'images/projects/Call_me_with_you/1.webp': 'Sepia-toned nighttime urban scene with a pedestrian stairway sign, vintage streetlamp, concrete wall and apartment building.',
                'images/projects/Call_me_with_you/2.webp': 'A person with shoulder-length dark hair and sunglasses standing in front of a brightly lit glass entrance, wearing a white and orange striped shirt.',
                'images/projects/Call_me_with_you/3.webp': 'A monochrome long-exposure portrait of a person in dark clothing and sunglasses, surrounded by bright points of light.',
                'images/projects/Call_me_with_you/4.webp': 'A small burst of golden sparks from a firework or handheld sparkler against a nearly black night sky.',
                'images/projects/Call_me_with_you/5.webp': 'A blurred nighttime portrait of a person in a white and orange striped shirt beside dark water, with horizontal city lights in the background.',
                'images/projects/Call_me_with_you/6.webp': 'An abstract close-up of dark fabric folds illuminated by a concentrated white beam of light.',
                'images/projects/Call_me_with_you/7.webp': 'A long-exposure nighttime cityscape with a tall illuminated building and radiating white and green light trails.',
                'images/projects/Call_me_with_you/8.webp': 'A tilted nighttime photograph of a building facade with glowing yellow-green windows and blurred light trails.',
                'images/projects/Call_me_with_you/9.webp': 'A monochrome view through an underground pedestrian passage with graffiti covering both walls.',

                'images/projects/Call_me_with_you/preview/1.webp': 'Sepia-toned nighttime urban scene with a pedestrian stairway sign, vintage streetlamp, concrete wall and apartment building.',
                'images/projects/Call_me_with_you/preview/6.webp': 'An abstract close-up of dark fabric folds illuminated by a concentrated white beam of light.',
                'images/projects/Call_me_with_you/preview/8.webp': 'A tilted nighttime photograph of a building facade with glowing yellow-green windows and blurred light trails.'
            }
        },
        {
            name: 'Blood on the canvas',
            url: 'https://www.behance.net/gallery/133009905/Blood-on-the-canvas', 
            lat: 43.104761, 
            lng: 131.871172,
            images: [
                'images/projects/Blood_on_the_canvas/1.webp',
                'images/projects/Blood_on_the_canvas/2.webp',
                'images/projects/Blood_on_the_canvas/3.webp',
                'images/projects/Blood_on_the_canvas/4.webp',
                'images/projects/Blood_on_the_canvas/5.webp'
            ],
            imagesGallery: [
                'images/projects/Blood_on_the_canvas/preview/1.webp',
                'images/projects/Blood_on_the_canvas/preview/2.webp',
                'images/projects/Blood_on_the_canvas/preview/5.webp'
            ],
            imageAlts: {
                'images/projects/Blood_on_the_canvas/1.webp': 'Handwritten preface on a dark burgundy background, introducing a collaborative art project and reflecting on friendship, creativity, and artistic influence.',
                'images/projects/Blood_on_the_canvas/2.webp': 'Continuation of a handwritten letter discussing artistic independence, creative development, friendship, and the process behind the collaboration.',
                'images/projects/Blood_on_the_canvas/3.webp': 'Handwritten artist statement describing the visual concept, personal perspectives, and symbolic ideas behind the collaborative artwork.',
                'images/projects/Blood_on_the_canvas/4.webp': 'Final handwritten page reflecting on the collaboration, its interpretation of a literary character, and the idea of expressing difficult themes through art.',
                'images/projects/Blood_on_the_canvas/5.webp': 'Dark surreal mixed-media illustration with a central distorted figure, dripping red and pink forms, black sketch-like details, and ghostly faces along the bottom.',

                'images/projects/Blood_on_the_canvas/preview/1.webp': 'Handwritten preface on a dark burgundy background, introducing a collaborative art project and reflecting on friendship, creativity, and artistic influence.',
                'images/projects/Blood_on_the_canvas/preview/2.webp': 'Continuation of a handwritten letter discussing artistic independence, creative development, friendship, and the process behind the collaboration.',
                'images/projects/Blood_on_the_canvas/preview/5.webp': 'Dark surreal mixed-media illustration with a central distorted figure, dripping red and pink forms, black sketch-like details, and ghostly faces along the bottom.'
            }
        },
        {
            name: 'Raskolnikov\'s dreams',
            url: 'https://www.behance.net/gallery/133683461/Raskolnikov-s-dreams',
            lat: 42.975101, 
            lng: 131.886262,
            images: [
                'images/projects/Raskolnikov_dreams/2.webp',
                'images/projects/Raskolnikov_dreams/4.webp',
                'images/projects/Raskolnikov_dreams/5.webp',
                'images/projects/Raskolnikov_dreams/7.webp',
                'images/projects/Raskolnikov_dreams/8.webp',
                'images/projects/Raskolnikov_dreams/9.webp',
                'images/projects/Raskolnikov_dreams/12.webp',
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
                'images/projects/Raskolnikov_dreams/26.webp',
                'images/projects/Raskolnikov_dreams/28.webp'
            ],
            imagesGallery: [
                'images/projects/Raskolnikov_dreams/preview/14.webp',
                'images/projects/Raskolnikov_dreams/preview/22.webp',
                'images/projects/Raskolnikov_dreams/preview/28.webp'
            ],
            imageAlts: {
                'images/projects/Raskolnikov_dreams/2.webp': 'A hand holds a glass above a sheet of paper scattered with matches in a dim amber-lit room.',
                'images/projects/Raskolnikov_dreams/4.webp': 'A bright flame rises from a glass as a hand reaches toward it in a dark, warm-toned still life.',
                'images/projects/Raskolnikov_dreams/5.webp': 'Black-and-white photograph of a hand and a bright flame above a glass on a table scattered with matches.',
                'images/projects/Raskolnikov_dreams/7.webp': 'Large orange flames spread across a glass and a sheet of paper in a dark room.',
                'images/projects/Raskolnikov_dreams/8.webp': 'A small red flame burns inside a glass, illuminating a hand and the surrounding dark room.',
                'images/projects/Raskolnikov_dreams/9.webp': 'Black-and-white double exposure of two overlapping glasses with flames and reflections in a dark interior.',
                'images/projects/Raskolnikov_dreams/12.webp': 'High-contrast abstract black-and-white photograph of curved translucent forms and blurred geometric reflections.',
                'images/projects/Raskolnikov_dreams/14.webp': 'Close-up black-and-white photograph of suspended faceted glass pendants with bright reflections and blurred letter-like shapes.',
                'images/projects/Raskolnikov_dreams/15.webp': 'Row of elongated faceted glass pendants hanging from metal hooks, photographed in black and white.',
                'images/projects/Raskolnikov_dreams/16.webp': 'Black-and-white close-up of overlapping angular faceted glass surfaces with sharp triangular reflections.',
                'images/projects/Raskolnikov_dreams/17.webp': 'Abstract monochrome photograph of intersecting faceted glass planes and geometric reflections.',
                'images/projects/Raskolnikov_dreams/18.webp': 'Soft-focus black-and-white close-up of a curved surface with a faint textured line and shadow.',
                'images/projects/Raskolnikov_dreams/19.webp': 'Blue-toned close-up portrait of a young man with dark hair looking downward against a blurred background.',
                'images/projects/Raskolnikov_dreams/20.webp': 'Dark monochrome close-up of a hand holding a small textured object near a partially obscured face.',
                'images/projects/Raskolnikov_dreams/21.webp': 'Out-of-focus dark silhouettes of two hands or figures against a rough grey pavement.',
                'images/projects/Raskolnikov_dreams/22.webp': 'Small spider suspended against a pale blue, softly blurred background.',
                'images/projects/Raskolnikov_dreams/23.webp': 'Red-tinted urban photograph of a classical building framed by dark apartment blocks and bare trees at dusk.',
                'images/projects/Raskolnikov_dreams/24.webp': 'High-key black-and-white portrait of a young man in a dark hood, with light hair falling across his forehead.',
                'images/projects/Raskolnikov_dreams/26.webp': 'Grainy, low-light photograph of a row of faceted glass pendants catching small pink and white highlights.',
                'images/projects/Raskolnikov_dreams/28.webp': 'Sunlight breaks through heavy clouds above a waterfront promenade with bare trees and distant buildings.',

                'images/projects/Raskolnikov_dreams/preview/14.webp': 'Close-up black-and-white photograph of suspended faceted glass pendants with bright reflections and blurred letter-like shapes.',
                'images/projects/Raskolnikov_dreams/preview/22.webp': 'Small spider suspended against a pale blue, softly blurred background.',
                'images/projects/Raskolnikov_dreams/preview/28.webp': 'Sunlight breaks through heavy clouds above a waterfront promenade with bare trees and distant buildings.'
            }
        },
        {
            name: 'Self portrait',
            url: 'https://www.behance.net/gallery/133754213/Self-portrait',
            lat: 43.117489, 
            lng: 131.899491,
            images: [
                'images/projects/Self_portrait/1.webp'
            ],
            imagesGallery: [
                'images/projects/Self_portrait/preview/1.webp'
            ],
            imageAlts: {
                'images/projects/Self_portrait/1.webp': 'Glitch-distorted self-portrait featuring a vertically stretched human figure against dense horizontal scan lines.',

                'images/projects/Self_portrait/preview/1.webp': 'Glitch-distorted self-portrait featuring a vertically stretched human figure against dense horizontal scan lines.'
            }
        },
        {
            name: 'From love to hate',
            url: 'https://www.behance.net/gallery/133780161/From-love-to-hate',
            lat: 43.127239, 
            lng: 131.910206,
            images: [
                'images/projects/From_love_to_hate/1.webp'
            ],
            imagesGallery: [
                'images/projects/From_love_to_hate/preview/1.webp'
            ],
            imageAlts: {
                'images/projects/From_love_to_hate/1.webp': 'Abstract monochrome composition of intertwined organic forms and distorted silhouettes, rendered in fine black outlines on a bright white background.',

                'images/projects/From_love_to_hate/preview/1.webp': 'Abstract monochrome composition of intertwined organic forms and distorted silhouettes, rendered in fine black outlines on a bright white background.'
            }
        },
        {
            name: 'I wanted to show you!',
            url: 'https://www.behance.net/gallery/180461029/I-wanted-to-show-you',
            lat: 43.117567, 
            lng: 131.882547,
            images: [
                'images/projects/I_wanted_to_show_you/1.webp',
                'images/projects/I_wanted_to_show_you/2.webp',
                'images/projects/I_wanted_to_show_you/3.webp',
                'images/projects/I_wanted_to_show_you/4.webp',
                'images/projects/I_wanted_to_show_you/5.webp',
                'images/projects/I_wanted_to_show_you/6.webp',
                'images/projects/I_wanted_to_show_you/7.webp',
                'images/projects/I_wanted_to_show_you/8.webp'
            ],
            imagesGallery: [
                'images/projects/I_wanted_to_show_you/preview/1.webp',
                'images/projects/I_wanted_to_show_you/preview/2.webp',
                'images/projects/I_wanted_to_show_you/preview/3.webp'
            ],
            imageAlts: {
                'images/projects/I_wanted_to_show_you/1.webp': 'Two people standing in a room illuminated by deep red and magenta light, with translucent abstract reflections layered over the scene.',
                'images/projects/I_wanted_to_show_you/2.webp': 'A well-used artist palette covered with dried black, grey, blue and pink paint.',
                'images/projects/I_wanted_to_show_you/3.webp': 'Two hands reaching toward each other beneath a chandelier, layered with translucent distorted reflections.',
                'images/projects/I_wanted_to_show_you/4.webp': 'A misty night park with illuminated street lamps and trees, overlaid with flowing translucent abstract forms.',
                'images/projects/I_wanted_to_show_you/5.webp': 'A hand holding a small paper collage with colorful cutout Russian lettering and a coin, photographed above a pavement.',
                'images/projects/I_wanted_to_show_you/6.webp': 'A handmade abstract painting with vertical magenta, purple and orange brushstrokes, displayed on a canvas indoors.',
                'images/projects/I_wanted_to_show_you/7.webp': 'A tilted view of an urban street and building facade, distorted by a dark reflective translucent surface.',
                'images/projects/I_wanted_to_show_you/8.webp': 'A laptop displaying a monochrome image of a winged stone sculpture, photographed in a dim room with a seated person’s feet visible behind it.',

                'images/projects/I_wanted_to_show_you/preview/1.webp': 'Two people standing in a room illuminated by deep red and magenta light, with translucent abstract reflections layered over the scene.',
                'images/projects/I_wanted_to_show_you/preview/2.webp': 'A well-used artist palette covered with dried black, grey, blue and pink paint.',
                'images/projects/I_wanted_to_show_you/preview/3.webp': 'Two hands reaching toward each other beneath a chandelier, layered with translucent distorted reflections.'
            }
        },
        {
            name: 'HOTEL - Love, Death & Robots EDIT',
            url: 'https://youtu.be/DpeKJaiLOd0?si=_2VfZz1Ee1K-YLTj',
            lat: 43.113805, 
            lng: 131.895952,
            images: [
                'images/projects/HOTEL_LDR/1.webp'
            ],
            imagesGallery: [
                'images/projects/HOTEL_LDR/preview/1.webp'
            ],
            imageAlts: {
                'images/projects/HOTEL_LDR/1.webp': 'High-contrast monochrome close-up of a surreal humanoid face with intricate organic details and intense highlights.',

                'images/projects/HOTEL_LDR/preview/1.webp': 'High-contrast monochrome close-up of a surreal humanoid face with intricate organic details and intense highlights.'
            }
        },
        {
            name: 'Ergo Proxy',
            url: 'https://www.youtube.com/watch?v=WwaHwI6gaf0&t=855s',
            lat: 43.115701, 
            lng: 131.900987,
            images: [
                'images/projects/Ergo_Proxy/1.webp'
            ],
            imagesGallery: [
                'images/projects/Ergo_Proxy/preview/1.webp'
            ],
            imageAlts: {
                'images/projects/Ergo_Proxy/1.webp': 'Dark surreal portrait of a pale woman with long black hair and red eyes, overlaid with branching black lines and surrounded by grotesque tooth-like organic forms.',

                'images/projects/Ergo_Proxy/preview/1.webp': 'Dark surreal portrait of a pale woman with long black hair and red eyes, overlaid with branching black lines and surrounded by grotesque tooth-like organic forms.'
            }
        },
        {
            name: 'Luxgoth YT Attribute',
            url: 'https://www.youtube.com/@luxgoth',
            lat: 59.965639, 
            lng: 30.311657,
            images: [
                'images/projects/Luxgoth_YT_Attribute/1.webp',
                'images/projects/Luxgoth_YT_Attribute/2.webp',
                'images/projects/Luxgoth_YT_Attribute/3.webp'
            ],
            imagesGallery: [
                'images/projects/Luxgoth_YT_Attribute/preview/1.webp',
                'images/projects/Luxgoth_YT_Attribute/preview/2.webp',
                'images/projects/Luxgoth_YT_Attribute/preview/3.webp'
            ],
            imageAlts: {
                'images/projects/Luxgoth_YT_Attribute/1.webp': 'Abstract golden mask-like emblem with fine ornamental linework, set against a dark textured wall covered in layered graffiti.',
                'images/projects/Luxgoth_YT_Attribute/2.webp': 'Faceless white mannequin head wrapped in black-and-white checkered fabric, illuminated by intense blue light against a dark background.',
                'images/projects/Luxgoth_YT_Attribute/3.webp': 'Neon-outlined portrait of a long-haired figure wearing a graphic of a winged creature, with the stylized LUXGOTH lettering above.',

                'images/projects/Luxgoth_YT_Attribute/preview/1.webp': 'Abstract golden mask-like emblem with fine ornamental linework, set against a dark textured wall covered in layered graffiti.',
                'images/projects/Luxgoth_YT_Attribute/preview/2.webp': 'Faceless white mannequin head wrapped in black-and-white checkered fabric, illuminated by intense blue light against a dark background.',
                'images/projects/Luxgoth_YT_Attribute/preview/3.webp': 'Neon-outlined portrait of a long-haired figure wearing a graphic of a winged creature, with the stylized LUXGOTH lettering above.'
            }
        },
        {
            name: 'To bb - irreplaceability',
            url: 'https://dribbble.com/shots/27022663-to-bb',
            lat: 43.115542,
            lng: 131.885494,
            images: [
                'images/projects/Tattoo/1.webp'
            ],
            imagesGallery: [
                'images/projects/Tattoo/preview/1.webp'
            ],
            imageAlts: {
                'images/projects/Tattoo/1.webp': 'Close-up of a forearm with a fine-line black tattoo featuring a stylized handwritten word, photographed beside a black graphic T-shirt.',

                'images/projects/Tattoo/preview/1.webp': 'Close-up of a forearm with a fine-line black tattoo featuring a stylized handwritten word, photographed beside a black graphic T-shirt.'
            }
        },
        {
            name: 'Rare Nights',
            url: 'https://vt.tiktok.com/ZSuoTGC26/',
            lat: 43.105726, 
            lng: 131.869408,
            images: [
                'images/projects/RARE_NIGHTS/1.webp',
                'images/projects/RARE_NIGHTS/2.webp',
                'images/projects/RARE_NIGHTS/3.webp'
            ],
            imagesGallery: [
                'images/projects/RARE_NIGHTS/preview/1.webp',
                'images/projects/RARE_NIGHTS/preview/2.webp',
                'images/projects/RARE_NIGHTS/preview/3.webp'
            ],
            imageAlts: {
                'images/projects/RARE_NIGHTS/1.webp': 'Person with a backpack standing on a riverside at night, with blurred city lights reflected on the water and illuminated trees along the shore.',
                'images/projects/RARE_NIGHTS/2.webp': 'Flash-lit tree and surrounding foliage beside a river at night, with illuminated buildings visible across the water.',
                'images/projects/RARE_NIGHTS/3.webp': 'Person with light hair standing with arms outstretched on a dark street at night, wearing a colorful textured sweater.',

                'images/projects/RARE_NIGHTS/preview/1.webp': 'Person with a backpack standing on a riverside at night, with blurred city lights reflected on the water and illuminated trees along the shore.',
                'images/projects/RARE_NIGHTS/preview/2.webp': 'Flash-lit tree and surrounding foliage beside a river at night, with illuminated buildings visible across the water.',
                'images/projects/RARE_NIGHTS/preview/3.webp': 'Person with light hair standing with arms outstretched on a dark street at night, wearing a colorful textured sweater.'
            }
        },
        {
            name: 'LTZ',
            url: 'https://vt.tiktok.com/ZSuowFoVk/',
            lat: 42.973370, 
            lng: 131.884590,
            images: [
                'images/projects/LTZ/1DlyaZhivih.webp',
                'images/projects/LTZ/2LOVERS.webp',
                'images/projects/LTZ/3Trip.webp'
            ],
            imagesGallery: [
                'images/projects/LTZ/preview/1DlyaZhivih.webp',
                'images/projects/LTZ/preview/2LOVERS.webp',
                'images/projects/LTZ/preview/3Trip.webp'
            ],
            imageAlts: {
                'images/projects/LTZ/1DlyaZhivih.webp': 'A dark-clothed figure standing in the doorway of an abandoned arched passage with peeling pink and green walls.',
                'images/projects/LTZ/2LOVERS.webp': 'An empty, shadow-filled arched passage in an abandoned building, framed by weathered pink and green walls.',
                'images/projects/LTZ/3Trip.webp': 'A pale, ghostlike figure in an arched doorway, surrounded by a darkened abandoned passage with peeling colorful walls.',

                'images/projects/LTZ/preview/1DlyaZhivih.webp': 'A dark-clothed figure standing in the doorway of an abandoned arched passage with peeling pink and green walls.',
                'images/projects/LTZ/preview/2LOVERS.webp': 'An empty, shadow-filled arched passage in an abandoned building, framed by weathered pink and green walls.',
                'images/projects/LTZ/preview/3Trip.webp': 'A pale, ghostlike figure in an arched doorway, surrounded by a darkened abandoned passage with peeling colorful walls.'
            }
        },
        {
            name: 'TRIGANA',
            url: 'https://www.instagram.com/nansjova',
            lat: 43.116614, 
            lng: 131.881437,
            images: [
                'images/projects/TRIGANA/1.webp',
                'images/projects/TRIGANA/2.webp',
                'images/projects/TRIGANA/3.webp',
                'images/projects/TRIGANA/4.webp',
                'images/projects/TRIGANA/5.webp',
                'images/projects/TRIGANA/7.webp',
                'images/projects/TRIGANA/9.webp',
                'images/projects/TRIGANA/10.webp',
                'images/projects/TRIGANA/11.webp'
            ],
            imagesGallery: [
                'images/projects/TRIGANA/preview/3.webp',
                'images/projects/TRIGANA/preview/9.webp',
                'images/projects/TRIGANA/preview/10.webp'
            ],
            imageAlts: {
                'images/projects/TRIGANA/1.webp': 'White graffiti lettering in an ornate calligraphic style on a black textured surface, surrounded by red and yellow paint splatters.',
                'images/projects/TRIGANA/2.webp': 'Close-up of a person in black shoes standing on pavement covered with red, yellow and white graffiti.',
                'images/projects/TRIGANA/3.webp': 'Blonde person in an oversized dark jacket walking through a dim graffiti-covered underground passage.',
                'images/projects/TRIGANA/4.webp': 'Blonde person seen from behind in a dark jacket, standing beside a graffiti-covered brick wall in a dim passage.',
                'images/projects/TRIGANA/5.webp': 'High-contrast black-and-white abstract photograph of a figure and layered graffiti, with ornate script lettering across the image.',
                'images/projects/TRIGANA/7.webp': 'Blonde person wearing dark sunglasses and a black outfit, posing against a yellow-lit graffiti-covered brick wall.',
                'images/projects/TRIGANA/9.webp': 'Blonde person wearing sunglasses and a black jacket with bright blue sleeves, standing with arms outstretched in front of an illuminated church at night.',
                'images/projects/TRIGANA/10.webp': 'Black-and-white flash photograph of a person seen from behind with arms outstretched, wearing a textured oversized sweater against a dark background.',
                'images/projects/TRIGANA/11.webp': 'Blonde person in a red textured sweater reaching toward a white classical statue holding a serpent-shaped object, with a red flower visible near the statue.',

                'images/projects/TRIGANA/preview/3.webp': 'Blonde person in an oversized dark jacket walking through a dim graffiti-covered underground passage.',
                'images/projects/TRIGANA/preview/9.webp': 'Blonde person wearing sunglasses and a black jacket with bright blue sleeves, standing with arms outstretched in front of an illuminated church at night.',
                'images/projects/TRIGANA/preview/10.webp': 'Black-and-white flash photograph of a person seen from behind with arms outstretched, wearing a textured oversized sweater against a dark background.'
            }
        },
        {
            name: 'Luxgoth Logo',
            url: 'https://dribbble.com/shots/27034499-Logo-for-motion-designer-Luxgoth',
            lat: 43.092750, 
            lng: 131.917228,
            images: [
                'images/projects/Luxgoth_Logo/1.webp'
            ],
            imagesGallery: [
                'images/projects/Luxgoth_Logo/preview/1.webp'
            ],
            imageAlts: {
                'images/projects/Luxgoth_Logo/1.webp': 'Ornate gold metallic LUXGOTH wordmark formed from elongated flowing calligraphic letters on a solid black background.',

                'images/projects/Luxgoth_Logo/preview/1.webp': 'Ornate gold metallic LUXGOTH wordmark formed from elongated flowing calligraphic letters on a solid black background.'
            }
        },
        {
            name: 'Candy',
            url: 'https://www.behance.net/constantchoice',
            lat: 42.966648, 
            lng: 131.899192,
            images: [
                'images/projects/Candy/1.webp'
            ],
            imagesGallery: [
                'images/projects/Candy/preview/1.webp'
            ],
            imageAlts: {
                'images/projects/Candy/1.webp': 'Close-up portrait of a person with long dark hair falling across their face and fingers resting against their cheek.',

                'images/projects/Candy/preview/1.webp': 'Close-up portrait of a person with long dark hair falling across their face and fingers resting against their cheek.'
            }
        },
        {
            name: 'hero in',
            url: 'https://www.behance.net/constantchoice',
            lat: 43.116305, 
            lng: 131.882652,
            images: [
                'images/projects/hero_in/2.webp',
                'images/projects/hero_in/4.webp',
                'images/projects/hero_in/6.webp',
                'images/projects/hero_in/7.webp'
            ],
            imagesGallery: [
                'images/projects/hero_in/preview/2.webp',
                'images/projects/hero_in/preview/4.webp',
                'images/projects/hero_in/preview/6.webp'
            ],
            imageAlts: {
                'images/projects/hero_in/2.webp': 'Abstract monochrome composition with a pale oval shape and a red-and-black graphic detail set inside a dark horizontal band.',
                'images/projects/hero_in/4.webp': 'White cat against a dark blue background with neon yellow lightning-like lines and a distorted graphic band across its eyes.',
                'images/projects/hero_in/6.webp': 'Distorted three-dimensional black lettering with red highlights against a dark red and black textured background.',
                'images/projects/hero_in/7.webp': 'Distorted black lettering with red highlights printed across a rough, pale textured surface.',

                'images/projects/hero_in/preview/2.webp': 'Abstract monochrome composition with a pale oval shape and a red-and-black graphic detail set inside a dark horizontal band.',
                'images/projects/hero_in/preview/4.webp': 'White cat against a dark blue background with neon yellow lightning-like lines and a distorted graphic band across its eyes.',
                'images/projects/hero_in/preview/6.webp': 'Distorted three-dimensional black lettering with red highlights against a dark red and black textured background.'
            }
        },
        {
            name: 'Lizard Tail',
            url: 'https://www.behance.net/constantchoice',
            lat: 43.167595, 
            lng: 131.914899,
            images: [
                'images/projects/Lizard_Tail/1.webp',
                'images/projects/Lizard_Tail/2.webp'
            ],
            imagesGallery: [
                'images/projects/Lizard_Tail/preview/1.webp',
                'images/projects/Lizard_Tail/preview/2.webp'
            ],
            imageAlts: {
                'images/projects/Lizard_Tail/1.webp': 'Glitch-style graphic featuring a pale gecko over repeated LIZARD TAIL lettering and vivid horizontal neon streaks.',
                'images/projects/Lizard_Tail/2.webp': 'Psychedelic digital collage with a seated person in a white cap against a distorted blue, orange and red textured background, overlaid with Lizard Tail lettering.',

                'images/projects/Lizard_Tail/preview/1.webp': 'Glitch-style graphic featuring a pale gecko over repeated LIZARD TAIL lettering and vivid horizontal neon streaks.',
                'images/projects/Lizard_Tail/preview/2.webp': 'Psychedelic digital collage with a seated person in a white cap against a distorted blue, orange and red textured background, overlaid with Lizard Tail lettering.'
            }
        },
        {
            name: 'Blow Up',
            url: 'https://www.behance.net/constantchoice',
            lat: 42.977902, 
            lng: 131.886927,
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
                'images/projects/BLOW_UP/14.webp',
                'images/projects/BLOW_UP/15.webp',
                'images/projects/BLOW_UP/16.webp',
                'images/projects/BLOW_UP/17.webp',
                'images/projects/BLOW_UP/18.webp',
                'images/projects/BLOW_UP/19.webp',
                'images/projects/BLOW_UP/20.webp',
                'images/projects/BLOW_UP/22.webp'
            ],
            imagesGallery: [
                'images/projects/BLOW_UP/preview/6.webp',
                'images/projects/BLOW_UP/preview/11.webp',
                'images/projects/BLOW_UP/preview/12.webp'
            ],
            imageAlts: {
                'images/projects/BLOW_UP/1.webp': 'Large white sailing ship with tall masts moored in a harbor, photographed against an urban waterfront.',
                'images/projects/BLOW_UP/2.webp': 'Soft-focus black-and-white close-up of thin hanging branches silhouetted against a bright blurred background.',
                'images/projects/BLOW_UP/3.webp': 'Black-and-white photograph of a forested headland extending into a calm sea, with a small rocky island on the horizon.',
                'images/projects/BLOW_UP/4.webp': 'Close-up of black fabric marked with bold hand-drawn white lettering, photographed against a dark blurred background.',
                'images/projects/BLOW_UP/5.webp': 'Surreal black-and-white composite of a human eye emerging among snow-covered trees in a winter forest.',
                'images/projects/BLOW_UP/6.webp': 'Wide landscape photograph of a forest-covered valley surrounding a dark lake beneath an overcast sky.',
                'images/projects/BLOW_UP/7.webp': 'Dense composition of overlapping green and yellow tropical leaves and fern fronds, surrounded by irregular white shapes.',
                'images/projects/BLOW_UP/8.webp': 'Silhouette of a leafless tree against a vivid blue and pink sunset sky.',
                'images/projects/BLOW_UP/9.webp': 'Black-and-white panoramic view of a city skyline and waterfront seen from an elevated rooftop.',
                'images/projects/BLOW_UP/10.webp': 'Black-and-white nighttime photograph of apartment buildings illuminated against a dark hillside.',
                'images/projects/BLOW_UP/11.webp': 'Nighttime panoramic view of a city and river, with warm lights reflecting across the water.',
                'images/projects/BLOW_UP/12.webp': 'Dark nighttime cityscape with apartment buildings, construction cranes and scattered illuminated windows.',
                'images/projects/BLOW_UP/14.webp': 'Calm sea at sunset with a small ship on the horizon beneath a soft peach-colored sky.',
                'images/projects/BLOW_UP/15.webp': 'Surreal floating rocky island suspended above a seaside promenade, with a vertical red light beam extending into the sky.',
                'images/projects/BLOW_UP/16.webp': 'Graphic architectural photograph of a telecommunications tower and antenna equipment framed by curved green sky shapes.',
                'images/projects/BLOW_UP/17.webp': 'Close-up of a large industrial ship hull and deck structures above dark water, rendered in warm distressed tones.',
                'images/projects/BLOW_UP/18.webp': 'Sailboat moored on calm water beneath a pale overcast sky, photographed in a muted vintage style.',
                'images/projects/BLOW_UP/19.webp': 'Black-and-white nighttime photograph of a large unfinished industrial building surrounded by cranes and freight tank cars.',
                'images/projects/BLOW_UP/20.webp': 'Tall modern building with vertical facade details illuminated in pink and blue light at dusk.',
                'images/projects/BLOW_UP/22.webp': 'Grainy black-and-white nighttime portrait of a silhouetted person holding both hands against their head beneath a bright streetlight.',
                
                'images/projects/BLOW_UP/preview/6.webp': 'Wide landscape photograph of a forest-covered valley surrounding a dark lake beneath an overcast sky.',
                'images/projects/BLOW_UP/preview/11.webp': 'Nighttime panoramic view of a city and river, with warm lights reflecting across the water.',
                'images/projects/BLOW_UP/preview/12.webp': 'Dark nighttime cityscape with apartment buildings, construction cranes and scattered illuminated windows.'
            }
        },
        {
            name: 'Unpublished',
            url: 'https://www.instagram.com/constantchoice/',
            lat: 43.028989, 
            lng: 131.894410,
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
            ],
            imagesGallery: [
                'images/projects/unpublished/preview/1.webp',
                'images/projects/unpublished/preview/3.webp',
                'images/projects/unpublished/preview/8.webp'
            ],
            imageAlts: {
                'images/projects/unpublished/1.webp': 'Grainy, high-contrast abstract close-up with a sweeping black organic form and a small warm orange highlight.',
                'images/projects/unpublished/2.webp': 'Vivid red and orange portrait-like silhouette with a bright yellow central shape and heavily textured edges.',
                'images/projects/unpublished/3.webp': 'Overexposed white vertical form glowing against a nearly black background with blue and violet light.',
                'images/projects/unpublished/4.webp': 'Abstract composition of broad diagonal color bands in muted gold, grey, red, and magenta.',
                'images/projects/unpublished/5.webp': 'Dense black ornamental lettering and calligraphic shapes arranged as an intricate vertical composition on a transparent background.',
                'images/projects/unpublished/6.webp': 'Large tangled structure of glossy black organic lines and irregular loops on a transparent background.',
                'images/projects/unpublished/7.webp': 'Minimal pale textured composition with a thin black pointed object extending inward from the right edge.',
                'images/projects/unpublished/8.webp': 'Surreal night-sky collage with a dark spherical form, glowing stars, mist, and clouds.',
                'images/projects/unpublished/9.webp': 'Blurred black typography reading "What a wonderful man" and "YOU!" over a pale cloudy background.',
                'images/projects/unpublished/10.webp': 'Abstract black-and-white gestural drawing made of layered sweeping strokes on a white background.',
                'images/projects/unpublished/11.webp': 'Glossy iridescent pink and violet organic form with flowing folds and hollow openings on a black background.',

                'images/projects/unpublished/preview/1.webp': 'Grainy, high-contrast abstract close-up with a sweeping black organic form and a small warm orange highlight.',
                'images/projects/unpublished/preview/3.webp': 'Overexposed white vertical form glowing against a nearly black background with blue and violet light.',
                'images/projects/unpublished/preview/8.webp': 'Surreal night-sky collage with a dark spherical form, glowing stars, mist, and clouds.'
            }
        },
        {
            name: 'DUBSTEP SCRIPT',
            url: 'https://github.com/constantchoice/DUBSTEP-SCRIPT',
            lat: 43.099517, 
            lng: 131.920213,
            images: [
                'images/projects/DUBSTEP_SCRIPT/1.webp',
                'images/projects/DUBSTEP_SCRIPT/2.webp'
            ],
            imagesGallery: [
                'images/projects/DUBSTEP_SCRIPT/preview/1.webp',
                'images/projects/DUBSTEP_SCRIPT/preview/2.webp'
            ],
            imageAlts: {
                'images/projects/DUBSTEP_SCRIPT/1.webp': 'Metallic silver lettering spelling "DUBSTEP SCRIPT" with a liquid, distorted surface on a white background.',
                'images/projects/DUBSTEP_SCRIPT/2.webp': 'Soft pink and iridescent liquid lettering spelling "DUBSTEP SCRIPT" on a white background.',

                'images/projects/DUBSTEP_SCRIPT/preview/1.webp': 'Metallic silver lettering spelling "DUBSTEP SCRIPT" with a liquid, distorted surface on a white background.',
                'images/projects/DUBSTEP_SCRIPT/preview/2.webp': 'Soft pink and iridescent liquid lettering spelling "DUBSTEP SCRIPT" on a white background.'
            }
        },
        {
            name: 'SOON',
            url: 'https://www.behance.net/constantchoice',
            lat: 18.169323, 
            lng: -76.972947,
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
            ],
            imagesGallery: [
                'images/projects/HUI/preview/1.webp',
                'images/projects/HUI/preview/2.webp',
                'images/projects/HUI/preview/7.webp'
            ],
            imageAlts: {
                'images/projects/HUI/1.webp': 'Large flowing white abstract shapes resembling distorted letterforms on a flat grey background.',
                'images/projects/HUI/2.webp': 'White ornamental graffiti-style lettering arranged across a vivid red horizontal banner.',
                'images/projects/HUI/3.webp': 'Blender workspace screenshot showing a geometric concrete structure in the render view, a 3D scene above, and an animation timeline below.',
                'images/projects/HUI/4.webp': 'Minimal 3D composition with a translucent white architectural structure beneath a black angular sculptural form.',
                'images/projects/HUI/5.webp': 'Wide irregular grey 3D surface covered with dense spikes and scattered glowing orange highlights, outlined in orange.',
                'images/projects/HUI/6.webp': 'Long pointed silver mesh-like form extending diagonally into darkness against a black background.',
                'images/projects/HUI/7.webp': 'Extreme close-up of a textured translucent grey surface with tiny reflective specks and soft highlights.',
                'images/projects/HUI/8.webp': 'Dark abstract 3D composition with a smooth central black form framed by rough, glittering textured surfaces.',
                'images/projects/HUI/9.webp': 'Close-up of angular grey concrete-like geometric planes surrounding a deep black vertical gap.',
                'images/projects/HUI/10.webp': 'Dark abstract architectural composition of rough concrete-like slabs and sharp intersecting geometric planes.',
                'images/projects/HUI/11.webp': 'Close-up of angular rough grey concrete-like forms with deep black negative spaces.',

                'images/projects/HUI/preview/1.webp': 'Large flowing white abstract shapes resembling distorted letterforms on a flat grey background.',
                'images/projects/HUI/preview/2.webp': 'White ornamental graffiti-style lettering arranged across a vivid red horizontal banner.',
                'images/projects/HUI/preview/7.webp': 'Extreme close-up of a textured translucent grey surface with tiny reflective specks and soft highlights.'
            }
        },
        {
            name: 'Zakhar',
            url: 'https://www.behance.net/gallery/253744551/Zakhar',
            lat: 59.927255, 
            lng: 30.322946,
            modelUrl: 'mirror_tag.glb',
            images: [
                'images/projects/Zakhar/1.webp',
                'images/projects/Zakhar/2.webp',
                'images/projects/Zakhar/3.webp',
                'images/projects/Zakhar/4.webp',
                'images/projects/Zakhar/5.webp',
                'images/projects/Zakhar/6.webp',
                'images/projects/Zakhar/7.webp',
                'images/projects/Zakhar/8.webp',
                'images/projects/Zakhar/9.webp',
                'images/projects/Zakhar/10.webp',
                'images/projects/Zakhar/11.webp',
                'images/projects/Zakhar/12.webp',
                'images/projects/Zakhar/13.webp',
                'images/projects/Zakhar/14.webp',
                'images/projects/Zakhar/15.webp',
                'images/projects/Zakhar/16.webp'
            ],
            imagesGallery: [
                'images/projects/Zakhar/preview/6.webp',
                'images/projects/Zakhar/preview/7.webp',
                'images/projects/Zakhar/preview/9.webp'
            ],
            imageAlts: {
                'images/projects/Zakhar/1.webp': 'Full-body portrait of a person with dark hair wearing an oversized black outfit, standing in a painterly, distorted urban courtyard.',
                'images/projects/Zakhar/2.webp': 'Distant full-body view of a dark-haired person in black clothing standing in a surreal courtyard with cobblestones and surrounding buildings.',
                'images/projects/Zakhar/3.webp': 'High-angle view of a person in an oversized black outfit standing on a pale cobblestone pavement amid fragmented pastel textures.',
                'images/projects/Zakhar/4.webp': 'Tilted overhead portrait of a dark-haired person in black clothing on a distorted cobblestone street.',
                'images/projects/Zakhar/5.webp': 'Overhead close view of a dark-haired person in black clothing standing beside a diagonal metal drainage channel on a pastel-toned street.',
                'images/projects/Zakhar/6.webp': 'Wide overhead view of a solitary person in black standing on a cobblestone path, surrounded by blurred blue, pink, and grey urban textures.',
                'images/projects/Zakhar/7.webp': 'Tilted wide-angle view of a surreal city courtyard with a small dark-clothed figure, bright blue light, and distorted buildings.',
                'images/projects/Zakhar/8.webp': 'Close portrait of a dark-haired person wearing a black jacket, standing against a softly distorted pale urban background.',
                'images/projects/Zakhar/9.webp': 'Waist-up portrait of a dark-haired person in black clothing, framed by warm blurred lights and fragmented urban architecture.',
                'images/projects/Zakhar/10.webp': 'Low-angle tilted portrait of a person in black clothing leaning across the frame against a blue-lit and distorted city background.',
                'images/projects/Zakhar/11.webp': 'Side view of a person in an oversized black outfit standing in a surreal urban courtyard with warm lights and blurred architecture.',
                'images/projects/Zakhar/12.webp': 'Tilted side view of a dark-clothed person against a fragmented city scene with a glowing red curved structure in the background.',
                'images/projects/Zakhar/13.webp': 'Full-body side view of a person in black clothing standing in a distorted courtyard with pale ground and warm architectural lights.',
                'images/projects/Zakhar/14.webp': 'Cropped side view of a person wearing a long black outfit, surrounded by blurred pastel pavement and distorted urban details.',
                'images/projects/Zakhar/15.webp': 'Overhead close-up of a person in black clothing leaning forward above a pale cobblestone pavement.',
                'images/projects/Zakhar/16.webp': 'Extreme wide-angle view of a solitary dark-clothed figure in the center of a distorted urban courtyard.',

                'images/projects/Zakhar/preview/6.webp': 'Wide overhead view of a solitary person in black standing on a cobblestone path, surrounded by blurred blue, pink, and grey urban textures.',
                'images/projects/Zakhar/preview/7.webp': 'Tilted wide-angle view of a surreal city courtyard with a small dark-clothed figure, bright blue light, and distorted buildings.',
                'images/projects/Zakhar/preview/9.webp': 'Waist-up portrait of a dark-haired person in black clothing, framed by warm blurred lights and fragmented urban architecture.'
            }
        },
        {
            name: '10 Letters, 150 Hours',
            url: 'https://dribbble.com/shots/27613495-10-Letters-150-Hours',
            lat: 60.000457, 
            lng: 30.299053,
            images: [
                'images/projects/10L150H/1.webp',
                'images/projects/10L150H/2.webp'
            ],
            imagesGallery: [
                'images/projects/10L150H/preview/1.webp',
                'images/projects/10L150H/preview/2.webp'
            ],
            imageAlts: {
                'images/projects/10L150H/1.webp': 'Oversized black serif letterforms arranged as an abstract typographic composition on a pale yellow background.',
                'images/projects/10L150H/2.webp': 'Typography layout showing the words "LOSHCHILIN’S FIRM" in large black serif letters, repeated in two arrangements on a pale yellow background.',

                'images/projects/10L150H/preview/1.webp': 'Oversized black serif letterforms arranged as an abstract typographic composition on a pale yellow background.',
                'images/projects/10L150H/preview/2.webp': 'Typography layout showing the words "LOSHCHILIN’S FIRM" in large black serif letters, repeated in two arrangements on a pale yellow background.'
            }
        },
        {
            name: 'Pink Blood',
            url: 'https://www.behance.net/gallery/257741241/Pink-Blood',
            lat: 59.924207, 
            lng: 30.243209,
            images: [
                'images/projects/Pink_Blood/1.webp',
                'images/projects/Pink_Blood/2.webp',
                'images/projects/Pink_Blood/3.webp',
                'images/projects/Pink_Blood/4.webp',
                'images/projects/Pink_Blood/5.webp',
                'images/projects/Pink_Blood/6.webp',
                'images/projects/Pink_Blood/7.webp',
                'images/projects/Pink_Blood/8.webp',
                'images/projects/Pink_Blood/9.webp',
                'images/projects/Pink_Blood/10.webp',
                'images/projects/Pink_Blood/11.webp',
                'images/projects/Pink_Blood/12.webp',
                'images/projects/Pink_Blood/13.webp',
                'images/projects/Pink_Blood/14.webp',
                'images/projects/Pink_Blood/15.webp',
                'images/projects/Pink_Blood/16.webp',
                'images/projects/Pink_Blood/17.webp',
                'images/projects/Pink_Blood/18.webp',
                'images/projects/Pink_Blood/19.webp',
                'images/projects/Pink_Blood/20.webp',
                'images/projects/Pink_Blood/21.webp',
                'images/projects/Pink_Blood/22.webp',
                'images/projects/Pink_Blood/23.webp',
                'images/projects/Pink_Blood/24.webp',
                'images/projects/Pink_Blood/25.webp',
                'images/projects/Pink_Blood/26.webp',
                'images/projects/Pink_Blood/27.webp',
                'images/projects/Pink_Blood/28.webp',
                'images/projects/Pink_Blood/29.webp',
                'images/projects/Pink_Blood/30.webp',
                'images/projects/Pink_Blood/31.webp',
                'images/projects/Pink_Blood/32.webp',
                'images/projects/Pink_Blood/33.webp',
                'images/projects/Pink_Blood/34.webp'
            ],
            imagesGallery: [
                'images/projects/Pink_Blood/preview/3.webp',
                'images/projects/Pink_Blood/preview/9.webp',
                'images/projects/Pink_Blood/preview/34.webp'
            ],
            imageAlts: {
                'images/projects/Pink_Blood/1.webp': 'Overexposed portrait of a bald person with a large ornamental green tattoo across the shoulder and upper chest, photographed against a green wall.',
                'images/projects/Pink_Blood/2.webp': 'Two people facing each other in a pink-lit room, with an ornamental green tattoo visible across the foreground person’s shoulder.',
                'images/projects/Pink_Blood/3.webp': 'Two people standing close together and holding hands, one wearing black and the other showing an elaborate green shoulder tattoo.',
                'images/projects/Pink_Blood/4.webp': 'Bright close-up portrait of a bald person with an ornamental green tattoo across the shoulder, photographed under green-tinted light.',
                'images/projects/Pink_Blood/5.webp': 'Side portrait of a bald person looking down, with a green ornamental shoulder tattoo against a pale green wall.',
                'images/projects/Pink_Blood/6.webp': 'Bald person leaning forward in a bathroom, wearing purple gloves and showing an intricate green tattoo across the shoulder and upper arm.',
                'images/projects/Pink_Blood/7.webp': 'Bathroom mirror composition showing a tattooed shoulder and back, toiletries on a glass shelf, and a reflection of a person leaning over the sink.',
                'images/projects/Pink_Blood/8.webp': 'Close-up of an ornamental green shoulder tattoo beside a brightly colored graphic textile with a cartoon-like face.',
                'images/projects/Pink_Blood/9.webp': 'Close-up of a pale pink embroidered collar, delicate necklace, and pink garment against a green background.',
                'images/projects/Pink_Blood/10.webp': 'Rear view of a person wearing a pale pink smock covered in black handwritten marks, with a green tattoo visible on the upper arm.',
                'images/projects/Pink_Blood/11.webp': 'Close-up of an extended arm with an intricate green ornamental tattoo beside a pale pink garment.',
                'images/projects/Pink_Blood/12.webp': 'Close portrait of a person in a pale pink ruffled garment, showing a large green shoulder tattoo against a pink tiled wall.',
                'images/projects/Pink_Blood/13.webp': 'Person with a shaved head, dark red theatrical makeup across the face, and an extended hand pointing toward the temple.',
                'images/projects/Pink_Blood/14.webp': 'Smiling bald person with theatrical red and black makeup across the face, holding both hands beside the temples.',
                'images/projects/Pink_Blood/15.webp': 'Cropped portrait of a person with dark red theatrical face makeup, a pale pink collar, and an elaborate green shoulder tattoo.',
                'images/projects/Pink_Blood/16.webp': 'Bald person with red and black face makeup, wearing a pale pink smock and holding blood-red painted hands together.',
                'images/projects/Pink_Blood/17.webp': 'Close overhead composition of a person in a pale pink garment, with an extended arm covered by an intricate green ornamental tattoo.',
                'images/projects/Pink_Blood/18.webp': 'Person with red theatrical makeup on the face pressing both hands against a tiled wall marked with red paint.',
                'images/projects/Pink_Blood/19.webp': 'Person with a shaved head and green shoulder tattoo painting a large expressive red figure on a tiled bathroom wall.',
                'images/projects/Pink_Blood/20.webp': 'Full frontal portrait of a bald person in a pale pink smock, with red theatrical face makeup and a large brush-painted wing-like shape behind them.',
                'images/projects/Pink_Blood/21.webp': 'Three-quarter portrait of a bald person with red and black theatrical face makeup, wearing a pale pink smock and showing a green shoulder tattoo.',
                'images/projects/Pink_Blood/22.webp': 'Close frontal portrait of a bald person with dramatic red and black face paint, a pale pink ruffled collar, and a green ornamental tattoo.',
                'images/projects/Pink_Blood/23.webp': 'Seated portrait of a person in a pale pink smock with red theatrical makeup, green shoulder tattoo, and painted wing-like forms on the tiled wall.',
                'images/projects/Pink_Blood/24.webp': 'Close-up of a raised tattooed arm in front of a red painted wall, with the person’s black-painted hand near their face.',
                'images/projects/Pink_Blood/25.webp': 'Rear three-quarter view of a person in a pale pink garment, showing an elaborate green tattoo covering the upper arm beside a red painted wall.',
                'images/projects/Pink_Blood/26.webp': 'Close portrait of a bald person with red and black face makeup, wearing a pale pink smock and displaying a large green shoulder tattoo.',
                'images/projects/Pink_Blood/27.webp': 'Red-lit close-up of a person’s tattooed upper arm and shoulder, with a hand and textured fabric in the background.',
                'images/projects/Pink_Blood/28.webp': 'Close-up of an intricate green ornamental tattoo across an upper arm, beside a pale pink garment and red-painted hands.',
                'images/projects/Pink_Blood/29.webp': 'Tilted overhead bathroom portrait of a person reclining in a bathtub, wearing a pale pink garment with painted hands and arms.',
                'images/projects/Pink_Blood/30.webp': 'Cropped portrait of a person in a pale pink smock with red face makeup, standing in front of a large red brush-painted mural.',
                'images/projects/Pink_Blood/31.webp': 'Frontal portrait of a bald person with red theatrical makeup across the face, wearing a pale pink smock against a painted tiled wall.',
                'images/projects/Pink_Blood/32.webp': 'Extreme close-up of a pale pink garment and an arm with a large green ornamental tattoo, with red paint visible on the skin.',
                'images/projects/Pink_Blood/33.webp': 'Close-up of a person with red theatrical face makeup holding a pale pink piece of fabric in front of a red painted mural.',
                'images/projects/Pink_Blood/34.webp': 'Close-up of a large green ornamental shoulder tattoo beside pale pink fabric and a red brush-painted mural.',

                'images/projects/Pink_Blood/preview/3.webp': 'Two people standing close together and holding hands, one wearing black and the other showing an elaborate green shoulder tattoo.',
                'images/projects/Pink_Blood/preview/9.webp': 'Close-up of a pale pink embroidered collar, delicate necklace, and pink garment against a green background.',
                'images/projects/Pink_Blood/preview/34.webp': 'Close-up of a large green ornamental shoulder tattoo beside pale pink fabric and a red brush-painted mural.'
            }
        },
        {
            name: 'Silver Archive',
            url: 'https://www.behance.net/gallery/257746469/Silver-Archive',
            lat: 52.516282, 
            lng: 13.376603,
            images: [
                'images/projects/Silver_Archive/1.webp',
                'images/projects/Silver_Archive/2.webp',
                'images/projects/Silver_Archive/3.webp',
                'images/projects/Silver_Archive/4.webp',
                'images/projects/Silver_Archive/5.webp',
                'images/projects/Silver_Archive/6.webp',
                'images/projects/Silver_Archive/7.webp',
                'images/projects/Silver_Archive/8.webp',
                'images/projects/Silver_Archive/9.webp',
                'images/projects/Silver_Archive/10.webp',
                'images/projects/Silver_Archive/11.webp',
                'images/projects/Silver_Archive/12.webp',
                'images/projects/Silver_Archive/13.webp',
                'images/projects/Silver_Archive/14.webp',
                'images/projects/Silver_Archive/15.webp',
                'images/projects/Silver_Archive/16.webp',
                'images/projects/Silver_Archive/17.webp',
                'images/projects/Silver_Archive/18.webp',
                'images/projects/Silver_Archive/19.webp',
                'images/projects/Silver_Archive/20.webp',
                'images/projects/Silver_Archive/21.webp',
                'images/projects/Silver_Archive/22.webp',
                'images/projects/Silver_Archive/23.webp',
                'images/projects/Silver_Archive/24.webp',
                'images/projects/Silver_Archive/25.webp',
                'images/projects/Silver_Archive/26.webp',
                'images/projects/Silver_Archive/27.webp',
                'images/projects/Silver_Archive/28.webp',
                'images/projects/Silver_Archive/29.webp'
            ],
            imagesGallery: [
                'images/projects/Silver_Archive/preview/13.webp',
                'images/projects/Silver_Archive/preview/15.webp',
                'images/projects/Silver_Archive/preview/21.webp'
            ],
            imageAlts: {
                'images/projects/Silver_Archive/1.webp': 'Black-and-white portrait of two people facing each other, with an intricate ornamental tattoo visible across the foreground person’s shoulder.',
                'images/projects/Silver_Archive/2.webp': 'Monochrome close-up portrait of a bald person with a large ornamental shoulder tattoo, wearing a chain necklace.',
                'images/projects/Silver_Archive/3.webp': 'Black-and-white photograph of two people standing close together and holding hands, one wearing black and the other showing an elaborate shoulder tattoo.',
                'images/projects/Silver_Archive/4.webp': 'Monochrome portrait of a bald person looking down, wearing a chain necklace and standing against patterned wallpaper.',
                'images/projects/Silver_Archive/5.webp': 'Black-and-white photograph of a tattooed person leaning over a bathroom sink, with bottles and toiletries arranged on a shelf.',
                'images/projects/Silver_Archive/6.webp': 'Monochrome portrait of a bald person leaning forward in a bathroom, with an ornamental tattoo across the shoulder and upper arm.',
                'images/projects/Silver_Archive/7.webp': 'Close-up of an elaborate shoulder and upper-arm tattoo, with a bathroom mirror reflecting toiletries and the person’s upper body.',
                'images/projects/Silver_Archive/8.webp': 'Black-and-white close-up of a bare torso with a large ornamental shoulder tattoo and a cross pendant necklace.',
                'images/projects/Silver_Archive/9.webp': 'Monochrome composition combining an ornamental shoulder tattoo with a bold graphic face printed on a nearby textile.',
                'images/projects/Silver_Archive/10.webp': 'Close-up of a pale embroidered collar with small decorative motifs and a delicate chain necklace.',
                'images/projects/Silver_Archive/11.webp': 'Rear view of a person wearing a pale smock covered in dark painted marks, with an ornamental tattoo visible on the upper arm.',
                'images/projects/Silver_Archive/12.webp': 'Close portrait of a person with dark theatrical makeup across the face, touching their chin while wearing a pale ruffled garment.',
                'images/projects/Silver_Archive/13.webp': 'Bald person looking down with dark theatrical makeup across the face, pointing toward the temple in a monochrome bathroom portrait.',
                'images/projects/Silver_Archive/14.webp': 'Monochrome portrait of a bald person with dark theatrical makeup, holding both painted hands together in front of the chest.',
                'images/projects/Silver_Archive/15.webp': 'Overhead close-up of a person in a pale smock, with a large ornamental tattoo extending along the raised arm.',
                'images/projects/Silver_Archive/16.webp': 'Rear three-quarter view of a bald person wearing a pale smock, showing an ornamental upper-arm tattoo beside a painted tiled wall.',
                'images/projects/Silver_Archive/17.webp': 'Side view of a tattooed person with a shaved head painting a large expressive mural on a tiled bathroom wall.',
                'images/projects/Silver_Archive/18.webp': 'Frontal monochrome portrait of a bald person with dark theatrical face paint, wearing a pale smock and holding both hands outward.',
                'images/projects/Silver_Archive/19.webp': 'Full-body frontal portrait of a person in a pale smock, with dark face makeup and a large brush-painted wing-like shape behind them.',
                'images/projects/Silver_Archive/20.webp': 'Three-quarter portrait of a bald person with dark theatrical makeup, wearing a pale smock and showing an ornamental shoulder tattoo.',
                'images/projects/Silver_Archive/21.webp': 'Close frontal portrait of a bald person with dark theatrical face paint, a pale ruffled collar, and a large ornamental shoulder tattoo.',
                'images/projects/Silver_Archive/22.webp': 'Seated monochrome portrait of a person in a pale smock with dark face paint, against a large expressive wall painting.',
                'images/projects/Silver_Archive/23.webp': 'Close-up of an extended arm with a large ornamental tattoo, positioned in front of a painted tiled wall.',
                'images/projects/Silver_Archive/24.webp': 'Rear three-quarter view of a person wearing a pale smock, with an intricate tattoo covering the upper arm and shoulder.',
                'images/projects/Silver_Archive/25.webp': 'Monochrome close portrait of a person with dark theatrical face makeup, wearing a pale smock and showing an elaborate shoulder tattoo.',
                'images/projects/Silver_Archive/26.webp': 'Frontal portrait of a bald person with dark paint across the face, wearing a pale ruffled smock against a painted tiled wall.',
                'images/projects/Silver_Archive/27.webp': 'Extreme close-up of an ornamental upper-arm tattoo emerging through a torn pale garment.',
                'images/projects/Silver_Archive/28.webp': 'Close-up of a person with dark theatrical face paint holding a pale piece of fabric, with an expressive mural in the background.',
                'images/projects/Silver_Archive/29.webp': 'Close-up of an ornamental shoulder tattoo and a hand holding pale fabric in front of a dark brush-painted mural.',

                'images/projects/Silver_Archive/preview/13.webp': 'Bald person looking down with dark theatrical makeup across the face, pointing toward the temple in a monochrome bathroom portrait.',
                'images/projects/Silver_Archive/preview/15.webp': 'Overhead close-up of a person in a pale smock, with a large ornamental tattoo extending along the raised arm.',
                'images/projects/Silver_Archive/preview/21.webp': 'Close frontal portrait of a bald person with dark theatrical face paint, a pale ruffled collar, and a large ornamental shoulder tattoo.'
            }
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

    // Прогрев спрайтов
    setTimeout(() => {
        gallery.warmUpSpritesBatch();
    }, 1000);
}