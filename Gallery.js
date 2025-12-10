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
        ["Pictures/K.jpg", "Pictures/L.jpg", "Pictures/M.jpg", "Pictures/N.jpg", "Pictures/O.jpg"],
        ["Pictures/P.jpg", "Pictures/P.jpg", "Pictures/P.jpg", "Pictures/P.jpg", "Pictures/P.jpg"],
        ["Pictures/S.png", "Pictures/T.jpg", "Pictures/U.jpg", "Pictures/R.jpg", "Pictures/Q.jpg"],
        ["Pictures/X.jpg", "Pictures/W.jpg", "Pictures/V.jpg", "Pictures/Y.jpg", "Pictures/Z.jpg"],
        ["Pictures/ZA.jpg", "Pictures/ZB.jpg", "Pictures/ZC.jpg" ],
        ["Pictures/A.jpg", "Pictures/B.jpg", "Pictures/C.jpg"],
        ["Pictures/F.jpg", "Pictures/G.jpg", "Pictures/H.jpg", "Pictures/I.jpg", "Pictures/J.jpg"],
        ["Pictures/ZD.jpg", "Pictures/ZH.jpg", "Pictures/ZF.jpg", "Pictures/ZG.jpg", "Pictures/ZE.jpg"],
        ["Pictures/ZJ.jpg", "Pictures/ZM.jpg", "Pictures/ZK.jpg", "Pictures/ZI.jpg", "Pictures/ZL.jpg"],
        ["Pictures/ZN.jpg", "Pictures/ZO.jpg", "Pictures/ZP.jpg", "Pictures/ZQ.jpg", "Pictures/ZR.jpg"],
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
