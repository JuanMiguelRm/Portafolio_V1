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
        header.classList.toggle("scrolled", window.scrollY > 50);
    });

    // Toggle del menú móvil
    menuToggle?.addEventListener("click", () => {
        const isActive = nav.classList.toggle("active");
        menuToggle.setAttribute("aria-expanded", isActive);
        menuToggle.innerHTML = isActive ? "✕" : "☰";
    });

    // Cerrar menú al hacer clic en un enlace (solo en móvil)
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            if (window.innerWidth <= 768 && nav.classList.contains("active")) {
                nav.classList.remove("active");
                menuToggle.setAttribute("aria-expanded", "false");
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
            toggleAboutButton.textContent = "Ver más sobre mí";

            aboutMeSection.addEventListener("transitionend", function handler() {
                aboutMeSection.style.display = "none";
                aboutMeSection.removeEventListener("transitionend", handler);
            });
        } else {
            aboutMeSection.style.display = "block";
            requestAnimationFrame(() => {
                aboutMeSection.classList.add("visible");
                toggleAboutButton.textContent = "Mostrar menos";
                aboutMeSection.scrollIntoView({ behavior: "smooth", block: "start" });
            });
        }
    });

    // Scroll suave para todos los enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", function (e) {
            const targetId = this.getAttribute("href");

            if (targetId.length > 1) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    targetElement.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            } else if (targetId === "#") {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
            }
        });
    });

    // Observer para animaciones de la sección "Acerca de mí"
    const aboutMeObserver = new IntersectionObserver((entries, observer) => {
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

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: "0px 0px -100px 0px"
    });

    if (aboutMeSection) {
        aboutMeObserver.observe(aboutMeSection);
    }

    // Precarga de imágenes importantes al cargar la ventana
    window.addEventListener("load", () => {
        const heroImage = document.querySelector(".img-anim");
        if (heroImage && heroImage.dataset.src) {
            heroImage.src = heroImage.dataset.src;
        }
    });
});
