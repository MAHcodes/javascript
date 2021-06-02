const choices = ['DYNAMITE', 'TORNADO', 'QUICKSAND', 'PIT', 'CHAIN', 'GUN', 'LAW', 'WHIP', 'SWORD', 'ROCK', 'DEATH', 'WALL', 'SUN', 'CAMERA', 'FIRE', 'CHAINSAW', 'SCHOOL', 'SCISSORS', 'POISON', 'CAGE', 'AXE', 'PEACE', 'COMPUTER', 'CASTLE', 'SNAKE', 'BLOOD', 'PORCUPINE', 'VULTURE', 'MONKEY', 'KING', 'QUEEN', 'PRINCE', 'PRINCESS', 'POLICE', 'WOMAN', 'BABY', 'MAN', 'HOME', 'TRAIN', 'CAR', 'NOISE', 'BICYCLE', 'TREE', 'TURNIP', 'DUCK', 'WOLF', 'CAT', 'BIRD', 'FISH', 'SPIDER', 'COCKROACH', 'BRAIN', 'COMMUNITY', 'CROSS', 'MONEY', 'VAMPIRE', 'SPONGE', 'CHURCH', 'BUTTER', 'BOOK', 'PAPER', 'CLOUD', 'AIRPLANE', 'MOON', 'GRASS', 'FILM', 'TOILET', 'AIR', 'PLANET', 'GUITAR', 'BOWL', 'CUP', 'BEER', 'RAIN', 'WATER', 'TV', 'RAINBOW', 'UFO', 'ALIEN', 'PRAYER', 'MOUNTAIN', 'SATAN', 'DRAGON', 'DIAMOND', 'PLATINUM', 'GOLD', 'DEVIL', 'FENCE', 'VIDEO GAME', 'MATH', 'ROBOT', 'HEART', 'ELECTRICITY', 'LIGHTNING', 'MEDUSA', 'POWER', 'LASER', 'NUKE', 'SKY', 'TANK', 'HELICOPTER'];
const resetBtn = document.getElementById("reset"); 
const userText = document.getElementById("user-text");
let userName = document.querySelector("#user-text span"); 
let userScoreText = document.getElementById("user-score"); 
let drawScoreText = document.getElementById("draw"); 
let pcScoreText = document.getElementById("computer-score");
const againBtn = document.getElementById("again");
const choice = document.querySelectorAll(".choice");

let userScore = 0;
let drawScore = 0;
let pcScore = 0;

resetBtn.addEventListener("click", function(){
    userScore = 0;
    drawScore = 0;
    pcScore = 0;

    document.querySelector(".result").classList.add("hide");
    updateScore();
    save2Local();
});

userText.addEventListener("click", function() {
    let name = "User";
    name = prompt("Enter Your Name: ");
    userName.innerText = name;
    save2Local();
})

function updateScore() {
    userScoreText.innerText = ("0" + userScore).slice(-2);
    drawScoreText.innerText = ("0" + drawScore).slice(-2);
    pcScoreText.innerText = ("0" + pcScore).slice(-2);
};

againBtn.addEventListener("click", function() {
    document.querySelector(".choices").scrollIntoView();
});

choice.forEach(element => {
    element.addEventListener("click", rps);  
});

function rps(e) {
    let userChoice = e.target;
    let winner = '';
    let color = "var(--dark-blue)"
    if (userChoice.tagName === 'H3') {
        userChoice = userChoice.innerText;
    } else if (userChoice.tagName === "DIV") {
        userChoice = userChoice.firstElementChild.alt;
    } else if (userChoice.tagName === "IMG") {
        userChoice = userChoice.alt;
    } else if (userChoice.tagName === "A") {
        return false;
    };

    let pcChoice = Math.floor(Math.random() * 101);

    if (choices.indexOf(userChoice) === pcChoice) {
        winner = "DRAW!";
        drawScore += 1;
    } else if (choices.indexOf(userChoice) < 52) {
        if (pcChoice <= (choices.indexOf(userChoice) + 50) && pcChoice > choices.indexOf(userChoice)) {
            winner = userName.innerText + " Win!";
            color = "#12a612";
            userScore += 1;
        } else {
            winner = "PC Win!";
            color = "#a61212";
            pcScore += 1;
        }
    } else if (choices.indexOf(userChoice) > 50) {
        if ((pcChoice > choices.indexOf(userChoice)) || (pcChoice < choices.indexOf(userChoice) - 50)) {
            winner = userName.innerText + " Win!";
            color = "#12a612";
            userScore += 1;
        } else {
            winner = "PC Win!"
            color = "#a61212";
            pcScore += 1;
        }
    };

    document.querySelector(".result").classList.remove("hide");
    document.querySelector("header").scrollIntoView();


    let userImg = document.createElement("img");
    userImg.setAttribute("src", `images/${userChoice}.png`);
    let userH3 = document.createElement("h3");
    userH3.innerText = userChoice;

    let userDiv = document.querySelector("#user-result > div .r-choice");
    userDiv.innerHTML = null;
    userDiv.appendChild(userImg);
    userDiv.appendChild(userH3);
    

    let resultText = document.getElementById("winner");
    resultText.innerHTML = null;
    resultText.style.color = color;
    resultText.innerText = winner;


    let pcImg = document.createElement("img");
    pcImg.setAttribute("src", "images/" + choices[pcChoice] + ".png");
    let pcH3 = document.createElement("h3");
    pcH3.innerText = choices[pcChoice];

    let pcDiv = document.querySelector("#computer-result > div .r-choice");
    pcDiv.innerHTML = null;
    pcDiv.appendChild(pcImg);
    pcDiv.appendChild(pcH3);

    console.log(choices.indexOf(userChoice), pcChoice);
    updateScore();
    save2Local();
}

function save2Local() {
    let score;
    if (localStorage.getItem("score") === null) {
        score = {};
    } else {
        score = JSON.parse(localStorage.getItem("score"));
    } score = [userScore, drawScore, pcScore, userName.innerText];
    localStorage.setItem("score", JSON.stringify(score));
}

function restoreLocal() {
    let score;
    if (localStorage.getItem("score") !== null){
        score = JSON.parse(localStorage.getItem("score"));
        userScore = score[0];
        drawScore = score[1];
        pcScore = score[2];
        userName.innerText = score[3];
        if (score[3] === "") {
            userName.innerText = "User";
        };
        updateScore();
    };
}
window.addEventListener("load", restoreLocal);
document.querySelector("header").scrollIntoView();