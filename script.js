document.addEventListener("DOMContentLoaded", () => {
    // Preloader Logic
    const preloader = document.getElementById("preloader");

    // Simulate loading delay and hide the preloader
    setTimeout(() => {
        preloader.style.opacity = "0"; // Smooth fade-out
        preloader.style.pointerEvents = "none"; // Disable interactions
        setTimeout(() => preloader.remove(), 500); // Remove from DOM after fade-out
    }, 1000); // Adjust delay (in milliseconds) if needed

    // Theme Toggle
    const themeToggle = document.querySelector(".theme-toggle");
    const root = document.documentElement;

    // Check local storage for saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
        root.setAttribute("data-theme", savedTheme);
    }

    themeToggle.addEventListener("click", () => {
        // Toggle between light and dark themes
        const currentTheme = root.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        root.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme); // Save to local storage
    });

    // Scroll Animations
    const scrollReveal = () => {
        const revealElements = document.querySelectorAll(".reveal");
        revealElements.forEach((el) => {
            const elementTop = el.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (elementTop < windowHeight - 100) {
                el.classList.add("active"); // Trigger animation
            }
        });
    };

    // Trigger scrollReveal on page load and scroll
    scrollReveal();
    window.addEventListener("scroll", scrollReveal);

    // Smooth Scroll for Navigation Links
    const navLinks = document.querySelectorAll(".nav-links a");

    navLinks.forEach((link) => {
        link.addEventListener("click", (e) => {
            e.preventDefault(); // Prevent default behavior
            const targetId = link.getAttribute("href").slice(1);
            const targetElement = document.getElementById(targetId);

            // Smooth scroll to the target section
            targetElement.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        });
    });

    // Highlight Active Section in Navigation
    const highlightNav = () => {
        const sections = document.querySelectorAll("section");
        const scrollY = window.pageYOffset;

        sections.forEach((section) => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach((link) => link.classList.remove("active"));
                navLink.classList.add("active");
            }
        });
    };

    // Trigger highlightNav on scroll
    window.addEventListener("scroll", highlightNav);
});