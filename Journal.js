document.addEventListener("DOMContentLoaded", () => {
    // ===== NAVBAR & FREEZE LOGIC =====
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
    });

    const freezeBtn = document.querySelector(".freeze-btn");
    const splineIframe = document.getElementById("spline-bg");
    const splineStatic = document.getElementById("spline-static");

    let frozen = localStorage.getItem("backgroundFrozen") === "true";

    // Set initial state
    if (frozen) {
        splineIframe.style.display = "none";
        splineStatic.style.display = "block";
        freezeBtn.querySelector("i").classList.replace("fa-moon", "fa-sun");
    } else {
        splineIframe.style.display = "block";
        splineStatic.style.display = "none";
        freezeBtn.querySelector("i").classList.replace("fa-sun", "fa-moon");
    }

    freezeBtn.addEventListener("click", () => {
        frozen = !frozen;
        const icon = freezeBtn.querySelector("i");
        if (frozen) {
            splineIframe.style.display = "none";
            splineStatic.style.display = "block";
            icon.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("backgroundFrozen", "true");
        } else {
            splineIframe.style.display = "block";
            splineStatic.style.display = "none";
            icon.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("backgroundFrozen", "false");
        }
    });

    // ===== JOURNAL MODAL LOGIC =====
    const modal = document.getElementById("fullscreenModal");
    const modalImg = document.getElementById("fullscreenImg");
    const closeBtn = document.getElementById("closeFullscreenModal");
    const cards = document.querySelectorAll(".journal-card");

    // Open Modal
    cards.forEach(card => {
        card.addEventListener("click", () => {
            const img = card.querySelector("img");
            modal.style.display = "flex";
            modalImg.src = img.src; // Copy image source to modal
            
            // Optional GSAP animation for opening
            gsap.fromTo(modalImg, 
                { scale: 0.8, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.3, ease: "power2.out" }
            );
        });
    });

    // Close Modal Function
    const closeModal = () => {
        gsap.to(modalImg, {
            scale: 0.8, 
            opacity: 0, 
            duration: 0.2, 
            onComplete: () => {
                modal.style.display = "none";
            }
        });
    };

    closeBtn.addEventListener("click", closeModal);

    // Close if clicking outside the image
    modal.addEventListener("click", (e) => {
        if (e.target === modal) closeModal();
    });
});