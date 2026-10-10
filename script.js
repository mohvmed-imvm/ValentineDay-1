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

let count = 5;
let giftOpened = false;
let heartsInterval = null;

/* COUNTDOWN */

const countdown = setInterval(() => {
    count--;

    if (count > 0) {
        number.innerText = count;

        number.style.animation = "none";
        void number.offsetWidth;
        number.style.animation = "numberIn .8s ease";

    } else {
        clearInterval(countdown);

        number.innerText = "♡";

        number.style.animation = "none";
        void number.offsetWidth;
        number.style.animation = "numberIn .8s ease";

        setTimeout(() => {
            intro.classList.add("hide");
            main.classList.add("show");

            setTimeout(() => {
                intro.style.display = "none";
            }, 1300);

            startHearts();
        }, 700);
    }
}, 1000);

/* OPEN GIFT */

function openGift() {
    if (giftOpened) return;

    giftOpened = true;

    music.volume = 0.7;
    music.play().catch(() => {});

    giftArea.classList.add("open");
    giftBox.style.pointerEvents = "none";

    setTimeout(() => {
        giftBox.style.display = "none";
        giftText.style.display = "none";

        document.getElementById("pageHeading").style.display = "none";
        document.getElementById("subtitle").style.display = "none";

        message.classList.add("show");

        for (let i = 0; i < 70; i++) {
            setTimeout(createHeart, i * 35);
        }
    }, 1900);
}

/* CLICK ON BOX ONLY */

giftBox.addEventListener("click", openGift);

/* KEYBOARD ACCESS */

giftBox.addEventListener("keydown", function(event) {
    if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openGift();
    }
});

/* CREATE FLOATING HEARTS */

function createHeart() {
    const heart = document.createElement("div");
    heart.className = "heart";

    const hearts = ["♡", "❤︎","𝄞","𝜗𝜚","⋆"];

    heart.innerText = hearts[Math.floor(Math.random() * hearts.length)];

    /* Keep the hearts inside the clipped layer */
    heart.style.left = Math.random() * 96 + "%";

    heart.style.fontSize = (15 + Math.random() * 35) + "px";
    heart.style.animationDuration = (4 + Math.random() * 5) + "s";

    /* They cannot cover the message or make the page wider */
    heartLayer.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 9500);
}

/* CONTINUOUS HEARTS */

function startHearts() {
    if (heartsInterval !== null) return;

    heartsInterval = setInterval(createHeart, 650);
}