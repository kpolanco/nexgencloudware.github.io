document.addEventListener('DOMContentLoaded', () => {
    // Menú de Hamburguesa
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navList = document.querySelector('.main-nav .nav-list');

    if (hamburgerMenu && navList) {
        hamburgerMenu.addEventListener('click', () => {
            navList.classList.toggle('active');
            hamburgerMenu.classList.toggle('active'); // Opcional: para animar el icono de hamburguesa
        });

        // Cierra el menú al hacer clic en un enlace (para móviles)
        document.querySelectorAll('.main-nav .nav-list a').forEach(item => {
            item.addEventListener('click', () => {
                if (navList.classList.contains('active')) {
                    navList.classList.remove('active');
                    hamburgerMenu.classList.remove('active');
                }
            });
        });
    }

    // Animación de scroll para secciones
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.2 // Cuando el 20% de la sección es visible
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                // No unobserve aquí si quieres que la animación se repita al hacer scroll
                // Si quieres que solo se active una vez, descomenta la siguiente línea:
                // observer.unobserve(entry.target);
            } else {
                // Opcional: Quitar la clase si sale de la vista para que se pueda animar de nuevo
                // entry.target.classList.remove('is-visible');
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Acordeón para FAQs
    const faqItems = document.querySelectorAll('.faq-item h3');
    faqItems.forEach(header => {
        header.addEventListener('click', () => {
            const parentItem = header.parentElement;
            parentItem.classList.toggle('active'); // Alterna la clase 'active'
        });
    });

    // Smooth scroll para enlaces de anclaje
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.sticky-header').offsetHeight || 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
	
	const form = document.getElementById('contact-form');
    const successMessage = document.getElementById('form-success');

    form.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent default form submission

        // Collect form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        // Send email using EmailJS
        emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formData)
            .then(() => {
                // Show success message
                successMessage.classList.add('active');
                // Reset form
                form.reset();
                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.classList.remove('active');
                }, 5000);
            }, (error) => {
                console.error('Error sending email:', error);
                alert('Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.');
            });
    });
});