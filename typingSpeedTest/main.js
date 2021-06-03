const text = document.getElementById("text");
const root = document.querySelector("html");
const wpmText = document.getElementById("wpm");
const cpmText = document.getElementById("cpm");
const againBtn = document.getElementById("again");
const highScore = document.getElementById("best");
const theme = document.querySelectorAll(".colors span");
let themeColor = "";

againBtn.addEventListener("click", generateQuote);

let qoute; 
function generateQuote() {
    fetch("https://api.quotable.io/random")
    .then(response => response.json())
    .then(data =>  quote = data.content)
    .then(generateText);
};
generateQuote();

theme.forEach(element => {
   element.addEventListener("click", changeTheme); 
});

function changeTheme() {
    document.documentElement.style.setProperty("--main-background", this.dataset.mainBg);
    document.documentElement.style.setProperty("--sec-background", this.dataset.secBg);
    document.documentElement.style.setProperty("--thd-background", this.dataset.primaryBg);
    document.documentElement.style.setProperty("--main-color", this.dataset.mainColor);
    themeColor = this.id;
    save2Local();
};

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
            save2Local();
        };
    };
};

function save2Local() {
    let local;
    if (localStorage.getItem("local") === null) {
        local = [];
    } else {
        local = JSON.parse(localStorage.getItem("local"));
    } local = [highScore.innerText, themeColor];
    localStorage.setItem("local", JSON.stringify(local));
};

window.addEventListener("load", restoreLocal);
function restoreLocal() {
    if (localStorage.getItem("local") !== null){
    let local = JSON.parse(localStorage.getItem("local"));
        highScore.innerText = local[0];
        const id = document.getElementById(local[1]);
        id.click();
    };
};