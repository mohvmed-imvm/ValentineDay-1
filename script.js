/* ELEMENTS */
/* 4U celebrations — Anniversary Template */

/* ELEMENTS */
const intro = document.getElementById("intro");
const number = document.getElementById("number");
const main = document.getElementById("main");
const giftArea = document.getElementById("giftArea");
const giftBox = document.getElementById("giftBox");
const giftText = document.getElementById("giftText");
const message = document.getElementById("message");
const music = document.getElementById("birthdayMusic");
const heartLayer = document.getElementById("heartLayer");

const siteHeader = document.getElementById("siteHeader");
const aboutButton = document.getElementById("aboutButton");
const aboutModal = document.getElementById("aboutModal");
const closeModal = document.getElementById("closeModal");
const modalOrderButton = document.getElementById("modalOrderButton");
const orderButton = document.getElementById("orderButton");
const headerOrder = document.getElementById("headerOrder");

const pageHeading = document.getElementById("pageHeading");
const subtitle = document.getElementById("subtitle");

const WHATSAPP_NUMBER = "201040275280";
const LANGUAGE_KEY = "4u-language";

let giftOpened = false;
let heartsInterval = null;
let lastFocusedElement = null;
let currentLanguage = "ar";

/* LANGUAGE */
function applyLanguage() {
    const savedLanguage = localStorage.getItem(LANGUAGE_KEY);
    currentLanguage = savedLanguage === "en" ? "en" : "ar";

    document.documentElement.lang = currentLanguage;
    document.documentElement.dir =
        currentLanguage === "ar" ? "rtl" : "ltr";

    document.querySelectorAll("[data-ar][data-en]").forEach(element => {
        element.textContent = element.dataset[currentLanguage];
    });

    if (giftBox) {
        giftBox.setAttribute(
            "aria-label",
            currentLanguage === "ar" ? "افتح الهدية" : "Open the gift"
        );
    }

    document.title = currentLanguage === "ar"
        ? "مفاجأة ذكرى زواج | 4U celebrations"
        : "Anniversary Surprise | 4U celebrations";

    const orderMessage = currentLanguage === "ar"
        ? "عايز أعمل صفحة مناسبة من 4U celebrations"
        : "I would like to order a custom occasion page from 4U celebrations";

    const whatsappURL =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(orderMessage)}`;

    [orderButton, headerOrder, modalOrderButton].forEach(link => {
        if (link) link.href = whatsappURL;
    });
}

applyLanguage();

/* Update language if the main website changes it in another tab */
window.addEventListener("storage", event => {
    if (event.key === LANGUAGE_KEY || event.key === null) {
        applyLanguage();
    }
});

/* ABOUT MODAL */
function openAboutModal(event) {
    if (event) event.preventDefault();
    if (!aboutModal) return;

    lastFocusedElement = document.activeElement;
    aboutModal.classList.add("active");
    aboutModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");

    if (closeModal) closeModal.focus();
}

function closeAboutModal() {
    if (!aboutModal) return;

    aboutModal.classList.remove("active");
    aboutModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");

    if (lastFocusedElement && lastFocusedElement.focus) {
        lastFocusedElement.focus();
    }
}

if (aboutButton) {
    aboutButton.addEventListener("click", openAboutModal);
}

if (closeModal) {
    closeModal.addEventListener("click", closeAboutModal);
}

if (aboutModal) {
    aboutModal.addEventListener("click", event => {
        if (event.target === aboutModal) closeAboutModal();
    });
}

document.addEventListener("keydown", event => {
    if (
        event.key === "Escape" &&
        aboutModal &&
        aboutModal.classList.contains("active")
    ) {
        closeAboutModal();
    }
});

/* CINEMATIC INTRO */
const introWords = ["Happy", "Anniversary", "To", "You", "♡"];
let wordIndex = 0;

function showNextWord() {
    if (!number || !intro || !main) return;

    if (wordIndex >= introWords.length) {
        setTimeout(() => {
            intro.classList.add("hide");
            main.classList.add("show");

            if (siteHeader) {
                siteHeader.classList.add("visible");
            }

            setTimeout(() => {
                intro.style.display = "none";
            }, 1300);

            startHearts();
        }, 600);

        return;
    }

    number.textContent = introWords[wordIndex++];

    number.style.animation = "none";
    void number.offsetWidth;
    number.style.animation = "numberIn .8s ease";

    setTimeout(showNextWord, 850);
}

showNextWord();

/* OPEN GIFT — BOX ONLY */
function openGift() {
    if (giftOpened || !giftBox || !giftArea) return;

    giftOpened = true;
    giftArea.classList.add("open");

    giftBox.setAttribute("aria-disabled", "true");
    giftBox.style.pointerEvents = "none";

    if (music) {
        music.volume = 0.7;
        music.play().catch(() => {});
    }

    setTimeout(() => {
        giftBox.style.display = "none";

        if (giftText) giftText.style.display = "none";
        if (pageHeading) pageHeading.style.display = "none";
        if (subtitle) subtitle.style.display = "none";

        if (message) message.classList.add("show");

        /* A gentle burst of decorative symbols */
        for (let i = 0; i < 18; i++) {
            setTimeout(createHeart, i * 180);
        }
    }, 1900);
}

/* Mouse / touch click works only on the gift box */
if (giftBox) {
    giftBox.addEventListener("click", openGift);

    /* Keyboard accessibility */
    giftBox.addEventListener("keydown", event => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openGift();
        }
    });
}

/* FLOATING DECORATIONS */
function createHeart() {
    if (!heartLayer) return;

    const heart = document.createElement("div");
    heart.className = "heart";

    const symbols = ["♡", "❤︎", "𝄞", "𝜗𝜚", "⋆"];
    heart.textContent =
        symbols[Math.floor(Math.random() * symbols.length)];

    heart.style.left = Math.random() * 96 + "%";
    heart.style.fontSize = (15 + Math.random() * 24) + "px";
    heart.style.animationDuration = (5 + Math.random() * 4) + "s";

    /* Keep decorations inside the background layer, behind the content */
    heartLayer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 9500);
}

/* CONTINUOUS HEARTS */
function startHearts() {
    if (heartsInterval !== null) return;

    heartsInterval = setInterval(createHeart, 950);
}




    heartsInterval = setInterval(createHeart, 650);
}
