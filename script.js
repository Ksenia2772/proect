// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navMobile = document.getElementById('navMobile');
const closeMenu = document.getElementById('closeMenu');
const mobileDropdownToggle = document.querySelector('.mobile-dropdown-toggle');
const mobileDropdown = document.querySelector('.mobile-dropdown');

// Открытие мобильного меню
menuToggle.addEventListener('click', () => {
    navMobile.classList.add('active');
    document.body.style.overflow = 'hidden';
});

// Закрытие мобильного меню
closeMenu.addEventListener('click', () => {
    navMobile.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Закрытие меню при клике на ссылку
const mobileLinks = document.querySelectorAll('.nav-mobile .nav-link:not(.mobile-dropdown-toggle span)');
mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMobile.classList.remove('active');
        document.body.style.overflow = 'auto';
    });
});

// Раскрывающееся меню в мобильной версии
if (mobileDropdownToggle) {
    mobileDropdownToggle.addEventListener('click', () => {
        mobileDropdown.classList.toggle('active');
        mobileDropdownToggle.classList.toggle('active');
    });
}

// Слайдер
const slider = document.getElementById('slider');
const sliderPrev = document.getElementById('sliderPrev');
const sliderNext = document.getElementById('sliderNext');
const sliderDots = document.getElementById('sliderDots');

let currentSlide = 0;
let slideInterval;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

// Создание точек для слайдера
function createSliderDots() {
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('button');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-slide', i);
        sliderDots.appendChild(dot);
        
        dot.addEventListener('click', () => {
            goToSlide(i);
            resetSlideInterval();
        });
    }
}

// Функция перехода к определенному слайду
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Обновление активной точки
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

// Кнопка "Назад"
sliderPrev.addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    goToSlide(currentSlide);
    resetSlideInterval();
});

// Кнопка "Вперед"
sliderNext.addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % totalSlides;
    goToSlide(currentSlide);
    resetSlideInterval();
});

// Автопереключение слайдов
function startSlideInterval() {
    slideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        goToSlide(currentSlide);
    }, 5000);
}

// Сброс интервала автопереключения
function resetSlideInterval() {
    clearInterval(slideInterval);
    startSlideInterval();
}

// Остановка автопереключения при наведении на слайдер
const sliderContainer = document.querySelector('.slider-container');
sliderContainer.addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});

sliderContainer.addEventListener('mouseleave', () => {
    startSlideInterval();
});

// Инициализация слайдера
createSliderDots();
startSlideInterval();

// Плавная прокрутка для ссылок навигации
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        // Для выпадающих меню не применяем плавную прокрутку
        if (this.classList.contains('dropdown-item') || 
            this.getAttribute('href') === '#') {
            return;
        }
        
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Закрываем мобильное меню, если оно открыто
            if (navMobile.classList.contains('active')) {
                navMobile.classList.remove('active');
                document.body.style.overflow = 'auto';
            }
            
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Изменение навигации при скролле
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Обработка формы через Formcarry
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
const submitBtn = document.getElementById('submitBtn');

// Ваш access_key от Formcarry (замените на свой)
// Получить можно на https://formcarry.com/
const FORMCARRY_ENDPOINT = 'https://formcarry.com/s/nT-W1IBxl0m'