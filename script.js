document.addEventListener("DOMContentLoaded", () => {
    // Elementos principales
    const toggleAboutButton = document.getElementById("toggle-about");
    const aboutMeSection = document.getElementById("about-me");
    const menuToggle = document.querySelector(".menu-toggle");
    const nav = document.querySelector("nav");
    const navLinks = document.querySelectorAll("nav a");
    const header = document.querySelector("header");

    // Efecto de scroll en el header
    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    });

    // Toggle del menú móvil
    menuToggle?.addEventListener("click", () => {
        nav.classList.toggle("active");
        menuToggle.innerHTML = nav.classList.contains("active") ? "✕" : "☰";
    });

    // Cerrar menú al hacer clic en un enlace (móvil)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768) {
                nav.classList.remove("active");
                menuToggle.innerHTML = "☰";
            }
        });
    });

    // Toggle de la sección "Acerca de mí"
    toggleAboutButton?.addEventListener("click", (event) => {
        event.preventDefault();
        
        const isVisible = aboutMeSection.classList.contains("visible");
        
        if (isVisible) {
            aboutMeSection.classList.remove("visible");
            setTimeout(() => {
                aboutMeSection.style.display = "none";
                toggleAboutButton.textContent = "Ver más sobre mí";
            }, 500);
        } else {
            aboutMeSection.style.display = "block";
            setTimeout(() => {
                aboutMeSection.classList.add("visible");
                toggleAboutButton.textContent = "Mostrar menos";
                aboutMeSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 10);
        }
    });

    // Scroll suave para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute("href");
            if (targetId === "#") {
                window.scrollTo({ top: 0, behavior: "smooth" });
                return;
            }
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({ 
                    behavior: "smooth", 
                    block: "start"
                });
            }
        });
    });

    // Observer para animaciones de la sección "Acerca de mí"
    const aboutMeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const elements = entry.target.querySelectorAll(
                    ".personal-info, .experience, .projects, .education, .skills"
                );
                
                elements.forEach((element, index) => {
                    setTimeout(() => {
                        element.classList.add("fade-in");
                    }, index * 150);
                });
                
                // Desconectar el observer después de la primera vez
                aboutMeObserver.unobserve(entry.target);
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    });

    if (aboutMeSection) {
        aboutMeObserver.observe(aboutMeSection);
    }
    // Mejora: Precarga de imágenes importantes
    window.addEventListener("load", () => {
        const heroImage = document.querySelector(".img-anim");
        if (heroImage && heroImage.dataset.src) {
            heroImage.src = heroImage.dataset.src;
        }
    });
});
