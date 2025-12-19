// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Документ загружен, инициализация скриптов...');
    
    // ========== МОБИЛЬНОЕ МЕНЮ ==========
    const menuToggle = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    const mobileMenuClose = document.getElementById('mobileMenuClose');

    // Открытие мобильного меню при клике на три полоски
    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('active');
        mobileMenuOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Функция закрытия мобильного меню
    function closeMobileMenu() {
        mobileMenu.classList.remove('active');
        mobileMenuOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    // Закрытие по кнопке "крестик"
    mobileMenuClose.addEventListener('click', closeMobileMenu);

    // Закрытие по клику на оверлей
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);

    // Выпадающее меню в мобильной версии
    const mobileToursToggle = document.querySelector('.mobile-nav-dropdown-toggle');
    const mobileToursItem = document.querySelector('.mobile-nav-item-dropdown');

    if (mobileToursToggle) {
        mobileToursToggle.addEventListener('click', (e) => {
            e.preventDefault();
            mobileToursItem.classList.toggle('active');
        });
    }

    // Закрытие меню при клике на ссылку
    const mobileLinks = document.querySelectorAll('.mobile-nav-link, .mobile-dropdown-link');
    mobileLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Не закрываем при клике на "Туры" (выпадающий список)
            if (!e.target.closest('.mobile-nav-dropdown-toggle')) {
                closeMobileMenu();
            }
        });
    });

    // Закрытие меню при нажатии Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && mobileMenu.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // ========== СЛАЙДЕР ==========
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
        sliderDots.innerHTML = '';
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

    // ========== FAQ ==========
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Закрываем все остальные вопросы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Открываем/закрываем текущий вопрос
            item.classList.toggle('active');
        });
    });

    // ========== ПЛАВНАЯ ПРОКРУТКА ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            // Для выпадающих меню не применяем плавную прокрутку
            if (this.classList.contains('dropdown-item') || 
                this.classList.contains('mobile-dropdown-link') ||
                this.getAttribute('href') === '#') {
                return;
            }
            
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Закрываем мобильное меню, если оно открыто
                closeMobileMenu();
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========== ИЗМЕНЕНИЕ НАВИГАЦИИ ПРИ СКРОЛЛЕ ==========
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

    // ========== ФОРМА ОБРАТНОЙ СВЯЗИ ==========
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    const submitBtn = document.getElementById('submitBtn');

    // Ваш access_key от Formcarry 
    const FORMCARRY_ENDPOINT = 'https://formcarry.com/s/nT-W1IBxl0m';

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Показываем состояние загрузки
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = "Отправка...";
        submitBtn.disabled = true;
        
        // Сбор данных формы
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            tour: document.getElementById('tour').value,
            message: document.getElementById('message').value,
            timestamp: new Date().toISOString()
        };
        
        try {
            // Отправка данных на Formcarry
            const response = await fetch(FORMCARRY_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            const result = await response.json();
            
            if (result.code === 200) {
                // Успешная отправка
                contactForm.reset();
                formMessage.textContent = '✅ Спасибо! Ваша заявка успешно отправлена. Мы свяжемся с вами в течение 24 часов.';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                
                // Скрыть сообщение через 5 секунд
                setTimeout(() => {
                    formMessage.classList.remove('success');
                    formMessage.textContent = '';
                }, 5000);
            } else {
                // Ошибка при отправке
                throw new Error(result.message || 'Ошибка при отправке формы');
            }
            
        } catch (error) {
            // Показать сообщение об ошибке
            formMessage.textContent = '❌ Произошла ошибка при отправке формы. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.';
            formMessage.classList.remove('success');
            formMessage.classList.add('error');
            
            console.error('Ошибка отправки формы:', error);
            
        } finally {
            // Восстанавливаем кнопку
            submitBtn.textContent = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    console.log('Все скрипты инициализированы');
});