document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        // Toggle del menú móvil
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Cerrar menú al hacer clic en un enlace
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Cerrar menú al hacer clic fuera
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });

        // Navegación activa
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        navLinks.forEach(link => {
            if (link.getAttribute('href') === currentPage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
});

// Funcionalidad del formulario de contacto con jQuery
$(document).ready(function() {
    const $contactForm = $('#contactForm');
    
    if ($contactForm.length) {
        // Validación en tiempo real
        $('#name, #email, #subject, #message').on('blur', function() {
            validateField($(this));
        });
        
        $contactForm.on('submit', function(e) {
            e.preventDefault();
            
            // Remover mensajes de error previos
            $('.error-message').fadeOut().remove();
            $('.form-group').removeClass('has-error');
            
            // Obtener valores del formulario
            const name = $('#name').val().trim();
            const email = $('#email').val().trim();
            const subject = $('#subject').val().trim();
            const message = $('#message').val().trim();
            const priority = $('#priority').val();
            const newsletter = $('#newsletter').is(':checked');
            
            let isValid = true;
            
            // Validación de campos
            if (!name) {
                showFieldError('#name', 'El nombre es obligatorio.');
                isValid = false;
            }
            
            if (!email) {
                showFieldError('#email', 'El email es obligatorio.');
                isValid = false;
            } else if (!isValidEmail(email)) {
                showFieldError('#email', 'Por favor, ingresa un email válido.');
                isValid = false;
            }
            
            if (!subject) {
                showFieldError('#subject', 'El asunto es obligatorio.');
                isValid = false;
            }
            
            if (!message) {
                showFieldError('#message', 'El mensaje es obligatorio.');
                isValid = false;
            }
            
            if (!isValid) {
                // Animar scroll al primer error
                $('html, body').animate({
                    scrollTop: $('.has-error').first().offset().top - 100
                }, 500);
                return;
            }
            
            // Deshabilitar botón y mostrar loading
            const $submitBtn = $('.submit-btn');
            const originalText = $submitBtn.html();
            $submitBtn.prop('disabled', true).html('<i class="fas fa-spinner fa-spin"></i> Enviando...');
            
            // Simular envío del formulario
            showNotification('Enviando mensaje...', 'info');
            
            setTimeout(() => {
                // Aquí normalmente enviarías los datos a un servidor
                showNotification('¡Mensaje enviado exitosamente! Te responderé pronto.', 'success');
                
                // Resetear formulario con animación
                $contactForm.fadeOut(300, function() {
                    $contactForm[0].reset();
                    $contactForm.fadeIn(300);
                });
                
                // Restaurar botón
                $submitBtn.prop('disabled', false).html(originalText);
            }, 2000);
        });
    }
    
    // Función para validar campo individual
    function validateField($field) {
        const fieldId = $field.attr('id');
        const value = $field.val().trim();
        
        // Remover errores previos
        $field.closest('.form-group').removeClass('has-error').find('.error-message').fadeOut().remove();
        
        let errorMessage = '';
        
        switch(fieldId) {
            case 'name':
                if (!value) errorMessage = 'El nombre es obligatorio.';
                break;
            case 'email':
                if (!value) {
                    errorMessage = 'El email es obligatorio.';
                } else if (!isValidEmail(value)) {
                    errorMessage = 'Por favor, ingresa un email válido.';
                }
                break;
            case 'subject':
                if (!value) errorMessage = 'El asunto es obligatorio.';
                break;
            case 'message':
                if (!value) errorMessage = 'El mensaje es obligatorio.';
                break;
        }
        
        if (errorMessage) {
            showFieldError('#' + fieldId, errorMessage);
        }
    }
    
    // Función para mostrar error en campo específico
    function showFieldError(fieldSelector, message) {
        const $field = $(fieldSelector);
        const $formGroup = $field.closest('.form-group');
        
        $formGroup.addClass('has-error');
        
        const $error = $('<div class="error-message text-danger mt-1"><i class="fas fa-exclamation-circle"></i> ' + message + '</div>');
        $error.hide().insertAfter($field).fadeIn(300);
    }
});

// Validación de email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Sistema de notificaciones
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Agregar estilos
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        max-width: 400px;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    // Agregar al DOM
    document.body.appendChild(notification);
    
    // Mostrar notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Botón de cerrar
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        hideNotification(notification);
    });
    
    // Auto-ocultar después de 5 segundos
    setTimeout(() => {
        hideNotification(notification);
    }, 5000);
}

function hideNotification(notification) {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
}

function getNotificationIcon(type) {
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    return icons[type] || icons.info;
}

function getNotificationColor(type) {
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        warning: '#ffc107',
        info: '#17a2b8'
    };
    return colors[type] || colors.info;
}

// Animaciones de scroll
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos para animación
    const animateElements = document.querySelectorAll('.highlight-card, .info-item, .timeline-item, .education-item, .skill-item, .contact-item, .social-card');
    animateElements.forEach(el => {
        observer.observe(el);
    });
});

// Smooth scroll para enlaces internos
document.addEventListener('DOMContentLoaded', function() {
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    
    internalLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Lazy loading para imágenes
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Contador animado para estadísticas
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    }
    
    updateCounter();
}

// Inicializar contadores cuando sean visibles
document.addEventListener('DOMContentLoaded', function() {
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target.querySelector('.stat-number');
                if (counter && !counter.classList.contains('animated')) {
                    const target = parseInt(counter.textContent);
                    counter.classList.add('animated');
                    animateCounter(counter, target);
                }
            }
        });
    }, { threshold: 0.5 });
    
    const statCards = document.querySelectorAll('.summary-card');
    statCards.forEach(card => counterObserver.observe(card));
});

// Efectos de hover para tarjetas
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.highlight-card, .info-item, .contact-item, .social-card');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
});

// Filtro de habilidades por categoría (para futuras implementaciones)
function filterSkills(category) {
    const skillItems = document.querySelectorAll('.skill-item');
    
    skillItems.forEach(item => {
        if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
}

// Exportar funciones para uso global
window.CVApp = {
    showNotification,
    filterSkills,
    animateCounter
}; 