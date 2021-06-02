const text = document.getElementById("text");
const root = document.querySelector("html");
const black = document.getElementById("black");
const blue = document.getElementById("dark-blue");
const purple = document.getElementById("dark-purple");
const white = document.getElementById("white");
const wpmText = document.getElementById("wpm");
const cpmText = document.getElementById("cpm");
const againBtn = document.getElementById("again");
const highScore = document.getElementById("best");
const blackTheme = ["#0f0f0f", "#1e1e1e", "hsl(0, 0%, 25%)", "#f1f1f1"];
const whiteTheme = ["hsl(0, 0%, 75.6%)", "hsl(0, 0%, 94.1%)", "hsl(0, 0%, 98.4%)", "#2d2d2d"];
const blueTheme = ["hsl(236, 53%, 16%)", "hsl(236, 44%, 22%)", "hsl(234, 30%, 35%)", "#f1f1f1"];
const purpleTheme = ["hsl(282.4, 37.8%, 16.6%)", "hsl(282.4, 28.3%, 23.5%)", "hsl(279, 20%, 33%)", "#f1f1f1"];
againBtn.addEventListener("click", generateQuote);


let qoute; 
function generateQuote() {
    fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data =>  quote = data.content)
    .then(generateText);
};

generateQuote();

black.addEventListener("click", () => {
    document.documentElement.style.setProperty("--main-background", blackTheme[0]);
    document.documentElement.style.setProperty("--sec-background", blackTheme[1]);
    document.documentElement.style.setProperty("--thd-background", blackTheme[2]);
    document.documentElement.style.setProperty("--main-color", blackTheme[3]);
})

white.addEventListener("click", () => {
    document.documentElement.style.setProperty("--main-background", whiteTheme[0]);
    document.documentElement.style.setProperty("--sec-background", whiteTheme[1]);
    document.documentElement.style.setProperty("--thd-background", whiteTheme[2]);
    document.documentElement.style.setProperty("--main-color", whiteTheme[3]);
})

blue.addEventListener("click", () => {
    document.documentElement.style.setProperty("--main-background", blueTheme[0])
    document.documentElement.style.setProperty("--sec-background", blueTheme[1]);
    document.documentElement.style.setProperty("--thd-background", blueTheme[2]);
    document.documentElement.style.setProperty("--main-color", blueTheme[3]);
})

purple.addEventListener("click", () => {
    document.documentElement.style.setProperty("--main-background", purpleTheme[0]);
    document.documentElement.style.setProperty("--sec-background", purpleTheme[1]);
    document.documentElement.style.setProperty("--thd-background", purpleTheme[2]);
    document.documentElement.style.setProperty("--main-color", purpleTheme[3]);
})

function generateText(qoute) {
    text.innerHTML = "";
    wpmText.innerText = "00";
    cpmText.innerText = "00";
    againBtn.classList.add("hidden");
    const characters = qoute.split("").map((char) => {
        const span = document.createElement("span");
        span.innerText = char;
        text.appendChild(span);
        return span;
    });

    let cursorIndex = 0;
    let cursorChar = characters[0];
    cursorChar.classList.add("cursor");
    let startTime = null;
    let endTime = null;


    const keydown = (e) => {
        if (e.key === cursorChar.innerText && !startTime) {
            startTime = new Date();
        };
        if (e.key === cursorChar.innerText) {
            cursorChar.classList.remove("cursor");
            cursorChar.classList.add("completed");
            cursorChar = characters[++cursorIndex];
        };
        if (cursorIndex >=  characters.length) {
            againBtn.classList.remove("hidden");
            endTime = new Date();
            const delta = endTime - startTime;
            const min = (delta / 1000) / 60;
            const numOfWords = qoute.split(" ").length; 
            const numOfChar = qoute.split("").length;
            const wpm = numOfWords / min;
            const cpm = numOfChar / min;
            wpmText.innerText = Math.floor(wpm);
            cpmText.innerText = Math.floor(cpm);
            checkBest(Math.floor(wpm));
            againBtn.focus();
            document.removeEventListener("keydown", keydown);
            return;
        };
        cursorChar.classList.add("cursor");
    };

    document.addEventListener("keydown", keydown);

    function checkBest(e) {
        if (e > Number(highScore.innerText)) {
            highScore.innerText = e;
            save2Local(e);
        };
    };
};

function save2Local(best) {
    let local;
    if (localStorage.getItem("local") === null) {
        local = 0;
    } else {
        local = JSON.parse(localStorage.getItem("local"));
    } local = best;
    localStorage.setItem("local", JSON.stringify(local));
};

window.addEventListener("load", restoreLocal);
function restoreLocal() {
    if (localStorage.getItem("local") !== null){
    let best = JSON.parse(localStorage.getItem("local"));
        highScore.innerText = best;
    };
};