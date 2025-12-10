const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

const freezeBtn = document.querySelector(".freeze-btn");
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

        localStorage.setItem("backgroundFrozen", "true"); // save state
    } else {
        splineIframe.style.display = "block";
        splineStatic.style.display = "none";
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");

        localStorage.setItem("backgroundFrozen", "false"); // save state
    }
});

// --- 2. NEW EDUCATIONAL TOUR STACK ---
(() => {
    // UPDATED DATA with your real images & titles
    const tourData = [
        {
            title: "UP CEBU",
            date: "NOVEMBER 13, 2025",
            img: "Pictures/UP.png",
            link: "Journal.html"
        },
        {
            title: "DYNATA PHILIPPINES INC.",
            date: "NOVEMBER 13, 2025",
            // Note: The googleusercontent link you had might be temporary/broken. 
            // I set it to use your local file pattern as a fallback if you have it.
            img: "https://lh3.googleusercontent.com/gps-cs-s/AG0ilSyBWAWcPH96R6lGdyi2nOOORxSwJAg4U3eJ1IlQ7GQL8ooygVM26ArHLl_jKKqWOlLZ78XD12FU5lhc7BVHtJ4oXy8f-eV1LkTUlmI7THJMHo_FAmuT12p-Kyc9S_hautja48tZnA=s1360-w1360-h1020-rw",
            link: "Journal.html"
        },
        {
            title: "RIVAN IT CEBU",
            date: "NOVEMBER 13, 2025",
            img: "https://scontent.fdvo2-1.fna.fbcdn.net/v/t39.30808-6/326506013_698502161739337_2955712506411277808_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGHpHjPm8wKNVrmPv-xtjmW9jbCQNRhgrz2NsJA1GGCvFJl1sBHONiyoTPnnGFyDaRqOBvHqz_UTLgxmREklawL&_nc_ohc=oozy2iR4GpIQ7kNvwF29qtD&_nc_oc=AdlsmJOU3QsHvNpMcw-egOyOPzJVWDmKcrtxfrngbcndV-VPsJ_eZ1AJakYhvoM79lM&_nc_zt=23&_nc_ht=scontent.fdvo2-1.fna&_nc_gid=D42ONSfnsbQESxeJS66llQ&oh=00_AfmU2HDZIbAvDMIJYWyDPEVlUq3ndmBipPyqfDuYDHGCbA&oe=693F50A4",
            link: "Journal.html"
        },
        {
            title: "MATA TECHNOLOGY, INC.",
            date: "NOVEMBER 14, 2025",
            img: "https://scontent.fdvo2-1.fna.fbcdn.net/v/t39.30808-6/373328334_691518339668332_6075932851142572698_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeFD2fcW_cLZRazf7vB95g7Q_KkiqngkYqb8qSKqeCRipkO317jiZ-HAdlkZa02-Lisdkt_KOzdXSNzXstYcXTiA&_nc_ohc=5IzoCU7xev8Q7kNvwHReVrU&_nc_oc=AdkzWycmhpAQI0lyqOJ_WUK7bzuAYxsKm6IEsvRj0OMUfusGS7O7mkRtIYCfpuSoJCk&_nc_zt=23&_nc_ht=scontent.fdvo2-1.fna&_nc_gid=Qt-DmZpN2qUNngxzCbpW5w&oh=00_Afle0MU_urUkDnofHI8tD2seIso1JQLU0EOaxvsDKraUIg&oe=693F591A",
            link: "Journal.html"
        },
        {
            title: "T.A.R.S.I.E.R. 117",
            date: "NOVEMBER 15, 2025",
            img: "https://pbs.twimg.com/media/DsWQaCZU0AAzhjP.jpg",
            link: "Journal.html"
        }
    ];

    const stackContainer = document.getElementById("cardStack");
    const titleEl = document.getElementById("tourTitle");
    const dateEl = document.getElementById("tourDate");
    const linkBtn = document.getElementById("tourLinkBtn");
    const nextBtn = document.getElementById("stackNext");
    const prevBtn = document.getElementById("stackPrev");

    if (!stackContainer) return;

    let currentIndex = 0;

    // Initialize DOM
    function init() {
        // Create Cards
        stackContainer.innerHTML = "";
        tourData.forEach((item, index) => {
            const card = document.createElement("div");
            card.classList.add("stack-card");
            card.style.backgroundImage = `url('${item.img}')`;
            stackContainer.appendChild(card);
        });

        updateDisplay();
    }

    function updateDisplay() {
        const cards = document.querySelectorAll(".stack-card");

        // Update Text
        const currentData = tourData[currentIndex];

        // Animate Text Change (GSAP)
        if (typeof gsap !== 'undefined') {
            gsap.fromTo([titleEl, dateEl],
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.3 }
            );
        }

        if (titleEl) titleEl.textContent = currentData.title;
        if (dateEl) dateEl.textContent = currentData.date;
        if (linkBtn) linkBtn.onclick = () => window.location.href = currentData.link;

        // Update Cards classes for stacking effect
        cards.forEach((card, idx) => {
            // Reset classes
            card.className = "stack-card";

            // Determine position relative to current index
            let diff = idx - currentIndex;
            if (diff < 0) diff += tourData.length;

            if (idx === currentIndex) {
                card.classList.add("active");
            } else if (diff === 1) {
                card.classList.add("next");
            } else if (diff === 2) {
                card.classList.add("next-2");
            }
        });
    }

    function goNext() {
        currentIndex = (currentIndex + 1) % tourData.length;
        updateDisplay();
    }

    function goPrev() {
        currentIndex = (currentIndex - 1 + tourData.length) % tourData.length;
        updateDisplay();
    }

    if (nextBtn) nextBtn.addEventListener("click", goNext);
    if (prevBtn) prevBtn.addEventListener("click", goPrev);

    init();
})();