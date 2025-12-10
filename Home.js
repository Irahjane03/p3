// ===== GSAP Scroll Animation =====
window.addEventListener("scroll", () => {
  const heroImg = document.querySelector(".hero-img");
  const aboutSection = document.querySelector(".about-me");
  const scrollY = window.scrollY;
  const windowH = window.innerHeight;

  // Stop image animation on small screens
  if (window.innerWidth < 900) {
    gsap.to(heroImg, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "power2.out"
    });
    return;
  }

  // Desktop animation
  if (scrollY > 50) {
    gsap.to(heroImg, {
      x: -window.innerWidth / 2.3,
      y: 589,
      duration: 1,
      ease: "power2.out"
    });
  } else {
    gsap.to(heroImg, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "power2.out"
    });
  }

  // Fade in About Me section
  const aboutTop = aboutSection.getBoundingClientRect().top;
  if (aboutTop < windowH - 100) {
    gsap.to(aboutSection, {
      opacity: 1,
      x: 0,
      duration: 1,
      ease: "power2.out"
    });
  }
});

// ===== HAMBURGER MENU =====
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const freezeBtn = document.querySelector(".freeze-btn");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");

  // Force repaint to update freeze button color immediately
  freezeBtn.style.display = "none";
  void freezeBtn.offsetWidth; // trigger reflow
  freezeBtn.style.display = "inline-flex";

  // Change color based on menu state
  if (navLinks.classList.contains("active")) {
    freezeBtn.style.color = "black"; // visible inside menu
  } else {
    freezeBtn.style.color = "white"; // normal on desktop
  }
});

// ===== FREEZE BUTTON =====
const splineIframe = document.getElementById("spline-bg");
const splineStatic = document.getElementById("spline-static");

let frozen = false;

// Check localStorage on page load
if (localStorage.getItem("backgroundFrozen") === "true") {
    frozen = true;
    splineIframe.style.display = "none";
    splineStatic.style.display = "block";
    freezeBtn.querySelector("i").classList.remove("fa-moon");
    freezeBtn.querySelector("i").classList.add("fa-sun");
} else {
    frozen = false;
    splineIframe.style.display = "block";
    splineStatic.style.display = "none";
    freezeBtn.querySelector("i").classList.remove("fa-sun");
    freezeBtn.querySelector("i").classList.add("fa-moon");
}

// Toggle freeze on click
freezeBtn.addEventListener("click", () => {
    frozen = !frozen;
    const icon = freezeBtn.querySelector("i");

    if (frozen) {
        splineIframe.style.display = "none";
        splineStatic.style.display = "block";
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
        localStorage.setItem("backgroundFrozen", "true");
    } else {
        splineIframe.style.display = "block";
        splineStatic.style.display = "none";
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
        localStorage.setItem("backgroundFrozen", "false");
    }
});

// ===== RESPONSIVE FIX: Reset freeze button color on window resize =====
window.addEventListener("resize", () => {
  if (window.innerWidth >= 900) {
    freezeBtn.style.color = "white"; // desktop always white
  } else if (navLinks.classList.contains("active")) {
    freezeBtn.style.color = "black"; // hamburger open
  }
});
