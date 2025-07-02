document.addEventListener('DOMContentLoaded', () => {
    // Esta función se ejecuta cuando todo el HTML ha sido cargado.

    // 1. Navegación Responsiva (Menú Hamburguesa)
    const navToggle = document.querySelector('.nav-toggle'); // El botón de hamburguesa
    const mainNav = document.querySelector('.main-nav');     // El menú de navegación
    const navLinks = document.querySelectorAll('.nav-list a'); // Todos los enlaces del menú

    // Cuando haces clic en el botón de hamburguesa
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active'); // Alterna la clase 'active' en el menú
        // Cambia el ícono del botón entre hamburguesa y 'X'
        navToggle.textContent = mainNav.classList.contains('active') ? '✖' : '☰';
    });

    // Cierra el menú cuando haces clic en un enlace (útil para móviles)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) { // Si el menú está abierto
                mainNav.classList.remove('active'); // Ciérralo
                navToggle.textContent = '☰'; // Restaura el ícono de hamburguesa
            }
        });
    });

    // 2. Highlight de Navegación al Scroll y Efecto de Header
    const sections = document.querySelectorAll('section[id]'); // Todas las secciones con un ID
    const header = document.querySelector('.main-header');     // El encabezado de la página

    // Observador para detectar qué sección está visible en la pantalla
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { // Si la sección está visible
                // Remueve la clase 'active' de cualquier enlace que la tenga
                const currentActive = document.querySelector('.nav-list a.active');
                if (currentActive) {
                    currentActive.classList.remove('active');
                }
                // Añade la clase 'active' al enlace correspondiente a la sección visible
                const newActive = document.querySelector(`.nav-list a[href="#${entry.target.id}"]`);
                if (newActive) {
                    newActive.classList.add('active');
                }
            }
        });
    }, {
        root: null, // El viewport es el elemento raíz
        rootMargin: '0px 0px -50% 0px', // Activa la intersección cuando la mitad de la sección está visible
        threshold: 0 // No necesitamos umbral específico, solo si está visible
    });

    // Comienza a observar cada sección
    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Efecto de cambio de color del header al hacer scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) { // Si el scroll es mayor a 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 3. Animación de Elementos al Hacer Scroll (Fade In)
    const scrollElements = document.querySelectorAll('.show-on-scroll');

    const elementInView = (el, dividend = 1) => {
        const elementTop = el.getBoundingClientRect().top;
        return (
            elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
        );
    };

    const displayScrollElement = (element) => {
        element.classList.add('is-visible');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('is-visible');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) { // Un poco más de la mitad visible
                displayScrollElement(el);
            } else {
                // Opcional: Si quieres que desaparezcan al volver a scrollear hacia arriba
                // hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', handleScrollAnimation);
    // Ejecuta la animación al cargar la página para elementos ya visibles
    handleScrollAnimation();

    // 4. Interacción de la Sección 'Contexto General' (Blur y Resaltado)
    const contextSection = document.getElementById('contexto-general');
    const contextItems = document.querySelectorAll('.context-item');

    contextItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Añade la clase 'blurred' a la sección principal
            contextSection.classList.add('blurred');

            // Quita la clase 'active' de cualquier otro item
            contextItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            // Añade la clase 'active' al item sobre el que está el ratón
            item.classList.add('active');
        });

        item.addEventListener('mouseleave', () => {
            // Remueve la clase 'blurred' de la sección principal
            contextSection.classList.remove('blurred');
            // Remueve la clase 'active' del item
            item.classList.remove('active');
        });
    });
});