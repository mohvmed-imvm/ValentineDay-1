
/* 4U celebrations — Anniversary Template */

/* ELEMENT */
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

const customizationSection = document.getElementById("customizationSection");
const husbandName = document.getElementById("husbandName");
const wifeName = document.getElementById("wifeName");
const anniversaryDate = document.getElementById("anniversaryDate");
const personalMessage = document.getElementById("personalMessage");
const customizationDetails = document.getElementById("customizationDetails");

const orderReferenceElement = document.getElementById("orderReference");
const copyOrderDetailsButton = document.getElementById("copyOrderDetails");
const sendOrderWhatsAppButton = document.getElementById("sendOrderWhatsApp");

const WHATSAPP_NUMBER = "201040275280";
const LANGUAGE_KEY = "4u-language";
const ORDER_REFERENCE_KEY = "4u-anniversary-order-reference";

let giftOpened = false;
let heartsInterval = null;
let lastFocusedElement = null;
let currentLanguage = "ar";

/* ORDER REFERENCE */
function getOrderReference() {
    let reference = sessionStorage.getItem(ORDER_REFERENCE_KEY);

    if (!reference) {
        const randomPart = Math.random()
            .toString(36)
            .substring(2, 8)
            .toUpperCase();

        reference = "4U-ANN-" + randomPart;
        sessionStorage.setItem(ORDER_REFERENCE_KEY, reference);
    }

    return reference;
}

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
            currentLanguage === "ar"
                ? giftBox.dataset.arLabel
                : giftBox.dataset.enLabel
        );
    }

    const placeholderFields = [
        husbandName,
        wifeName,
        anniversaryDate,
        personalMessage,
        customizationDetails
    ];

    placeholderFields.forEach(field => {
        if (!field) return;

        const placeholder = currentLanguage === "ar"
            ? field.dataset.placeholderAr
            : field.dataset.placeholderEn;

        if (placeholder) {
            field.placeholder = placeholder;
        }
    });

    document.title = currentLanguage === "ar"
        ? "مفاجأة ذكرى زواج | 4U celebrations"
        : "Anniversary Surprise | 4U celebrations";

    if (orderReferenceElement) {
        orderReferenceElement.textContent = getOrderReference();
    }
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

/* ORDER CUSTOMIZATION */
function scrollToCustomization(event) {
    if (event) event.preventDefault();

    if (aboutModal && aboutModal.classList.contains("active")) {
        closeAboutModal();
    }

    if (customizationSection) {
        customizationSection.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });
    }
}

/* Header, modal, and bottom order buttons scroll to customization */
[headerOrder, modalOrderButton, orderButton].forEach(button => {
    if (button) {
        button.addEventListener("click", scrollToCustomization);
    }
});

/* BUILD ORDER MESSAGE */
function getOrderMessage() {
    const isArabic = currentLanguage === "ar";

    const valueOrDefault = (field, arabicDefault, englishDefault) => {
        const value = field ? field.value.trim() : "";
        return value || (isArabic ? arabicDefault : englishDefault);
    };

    const greeting = isArabic
        ? "أهلا 4U Celebrations,"
        : "Hello 4U Celebrations,";

    const orderLabel = isArabic ? "رقم الطلب:" : "Order number:";
    const templateLabel = isArabic ? "اسم القالب:" : "Template name:";
    const husbandLabel = isArabic ? "اسم الزوج:" : "Husband's name:";
    const wifeLabel = isArabic ? "اسم الزوجة:" : "Wife's name:";
    const dateLabel = isArabic
        ? "تاريخ ذكرى الزواج:"
        : "Anniversary date:";
    const messageLabel = isArabic
        ? "الرسالة الشخصية:"
        : "Personal message:";
    const detailsLabel = isArabic
        ? "ملاحظات إضافية:"
        : "Additional notes:";

    const templateName = isArabic
        ? "قالب ذكرى الزواج"
        : "Anniversary Template";

    const husband = valueOrDefault(
        husbandName,
        "لم يُذكر",
        "Not provided"
    );

    const wife = valueOrDefault(
        wifeName,
        "لم يُذكر",
        "Not provided"
    );

    const date = valueOrDefault(
        anniversaryDate,
        "لم يُذكر",
        "Not provided"
    );

    const personal = valueOrDefault(
        personalMessage,
        "لم تُذكر",
        "Not provided"
    );

    const details = valueOrDefault(
        customizationDetails,
        "لا توجد",
        "None"
    );

    return [
        greeting,
        "",
        `${orderLabel} ${getOrderReference()}`,
        `${templateLabel} ${templateName}`,
        "",
        `${husbandLabel} ${husband}`,
        `${wifeLabel} ${wife}`,
        `${dateLabel} ${date}`,
        `${messageLabel} ${personal}`,
        `${detailsLabel} ${details}`
    ].join("\n");
}

/* COPY ORDER DETAILS */
if (copyOrderDetailsButton) {
    copyOrderDetailsButton.addEventListener("click", async () => {
        const text = getOrderMessage();
        let copied = false;

        try {
            await navigator.clipboard.writeText(text);
            copied = true;
        } catch (error) {
            const temporaryTextarea = document.createElement("textarea");
            temporaryTextarea.value = text;
            temporaryTextarea.style.position = "fixed";
            temporaryTextarea.style.opacity = "0";

            document.body.appendChild(temporaryTextarea);
            temporaryTextarea.select();

            try {
                copied = document.execCommand("copy");
            } catch (copyError) {
                copied = false;
            }

            temporaryTextarea.remove();
        }

        if (!copied) {
            alert(
                currentLanguage === "ar"
                    ? "تعذر النسخ، حاول مرة أخرى"
                    : "Could not copy. Please try again."
            );
        }
    });
}

/* SEND ORDER THROUGH WHATSAPP */
if (sendOrderWhatsAppButton) {
    sendOrderWhatsAppButton.addEventListener("click", () => {
        const messageText = getOrderMessage();
        const whatsappURL =
            `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messageText)}`;

        window.open(whatsappURL, "_blank", "noopener,noreferrer");
    });
}

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
