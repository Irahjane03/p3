document.addEventListener("DOMContentLoaded", () => {
    // ===== HAMBURGER MENU & FREEZE BUTTON =====
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");
    const freezeBtn = document.querySelector(".freeze-btn");

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        freezeBtn.style.color = navLinks.classList.contains("active") ? "black" : "white";
    });

    let frozen = localStorage.getItem("backgroundFrozen") === "true";

    const splineIframe = document.getElementById("spline-bg");
    const splineStatic = document.getElementById("spline-static");

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

    window.addEventListener("resize", () => {
        if (window.innerWidth >= 900) freezeBtn.style.color = "white";
        else if (navLinks.classList.contains("active")) freezeBtn.style.color = "black";
    });

    // ===== GALLERY STACK FUNCTION =====
    const stacks = document.querySelectorAll(".card-stack-wrapper");

    const galleryImages = [
        ["Pictures/AI.png", "Pictures/1 (174).jpg", "Pictures/1 (175).jpg", "Pictures/1 (176).jpg", "Pictures/1 (177).jpg"],
        ["Pictures/6.jpg", "Pictures/7.jpg", "Pictures/8.jpg", "Pictures/9.jpg", "Pictures/10.jpg"],
        ["Pictures/11.jpg", "Pictures/12.jpg", "Pictures/13.jpg", "Pictures/14.jpg", "Pictures/15.jpg"],
        ["Pictures/16.jpg", "Pictures/17.jpg", "Pictures/18.jpg", "Pictures/19.jpg", "Pictures/20.jpg"],
        ["Pictures/21.jpg", "Pictures/22.jpg", "Pictures/23.jpg", "Pictures/24.jpg", "Pictures/25.jpg"],
        ["Pictures/26.jpg", "Pictures/27.jpg", "Pictures/28.jpg", "Pictures/29.jpg", "Pictures/30.jpg"],
        ["Pictures/31.jpg", "Pictures/32.jpg", "Pictures/33.jpg", "Pictures/34.jpg", "Pictures/35.jpg"],
        ["Pictures/36.jpg", "Pictures/37.jpg", "Pictures/38.jpg", "Pictures/39.jpg", "Pictures/40.jpg"]
    ];

    stacks.forEach((stack, index) => {
        const cardStack = stack.querySelector(".card-stack");
        const prevBtn = stack.querySelector(".stack-btn.prev");
        const nextBtn = stack.querySelector(".stack-btn.next");
        let currentIndex = 0;

        const cards = galleryImages[index].map(src => {
            const div = document.createElement("div");
            div.classList.add("stack-card");
            div.style.backgroundImage = `url(${src})`;
            cardStack.appendChild(div);
            return div;
        });

        const update = () => {
            cards.forEach((card, i) => {
                card.classList.remove("active", "next", "next-2", "offscreen-left");
                if (i === currentIndex) card.classList.add("active");
                else if (i === (currentIndex + 1) % cards.length) card.classList.add("next");
                else if (i === (currentIndex + 2) % cards.length) card.classList.add("next-2");
                else card.classList.add("offscreen-left");
            });
        };

        prevBtn.addEventListener("click", () => {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            update();
        });

        nextBtn.addEventListener("click", () => {
            currentIndex = (currentIndex + 1) % cards.length;
            update();
        });

        update();
    });

    // ===== ENSURE MODAL IS COMPLETELY HIDDEN ON PAGE LOAD =====
    const fullscreenModal = document.getElementById("fullscreenModal");
    const fullscreenImg = document.getElementById("fullscreenImg");
    if (fullscreenModal) fullscreenModal.style.display = "none";
    if (fullscreenImg) fullscreenImg.src = ""; // clear any previous image


    fullscreenModal.style.display = "none";

    document.querySelectorAll(".card-stack-wrapper").forEach(stackWrapper => {
        const cards = stackWrapper.querySelectorAll(".stack-card");

        cards.forEach(card => {
            card.addEventListener("click", () => {
                if (!card.classList.contains("active")) return;

                const rect = card.getBoundingClientRect();
                const bg = card.style.backgroundImage;
                const url = bg.slice(5, -2);
                fullscreenImg.src = url;

                fullscreenImg.style.width = rect.width + "px";
                fullscreenImg.style.height = rect.height + "px";
                fullscreenImg.style.position = "absolute";
                fullscreenImg.style.top = rect.top + "px";
                fullscreenImg.style.left = rect.left + "px";

                fullscreenModal.style.display = "flex";

                gsap.to(fullscreenImg, {
                    duration: 0.5,
                    top: "50%",
                    left: "50%",
                    xPercent: -50,
                    yPercent: -50,
                    width: "80vw",
                    height: "80vh",
                    ease: "power2.out"
                });
            });
        });
    });

    closeFullscreenModal.addEventListener("click", () => {
        const activeCard = Array.from(document.querySelectorAll(".stack-card"))
            .find(c => c.style.backgroundImage.slice(5, -2) === fullscreenImg.src && c.classList.contains("active"));

        if (!activeCard) {
            fullscreenModal.style.display = "none";
            return;
        }

        const rect = activeCard.getBoundingClientRect();
        gsap.to(fullscreenImg, {
            duration: 0.5,
            top: rect.top,
            left: rect.left,
            xPercent: 0,
            yPercent: 0,
            width: rect.width,
            height: rect.height,
            ease: "power2.in",
            onComplete: () => {
                fullscreenModal.style.display = "none";
            }
        });
    });

    fullscreenModal.addEventListener("click", (e) => {
        if (e.target === fullscreenModal) closeFullscreenModal.click();
    });
});
