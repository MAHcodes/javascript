const countries = document.getElementById("countries");
const flag = document.getElementById("flag");
const user = document.getElementById("country-name");
const fireBtn = document.getElementById("fire");
const score = document.getElementById("score");
const hintBtn = document.getElementById("hint");
const skipBtn = document.getElementById("skip");

let allCountries = null;
let theCountry = null;
let scoreValue = 5;
let ifNewCountry = true;

window.addEventListener("load", restoreLocal);
fireBtn.addEventListener("click", checkInput);
hintBtn.addEventListener("click", getHint);
skipBtn.addEventListener("click", skipFlag);
user.addEventListener("keypress", (e) => {
    if (e.keyCode === 13 && e.key == "Enter") {
        fireBtn.click();
    };
});

fetch("./response.json")
.then(response => response.json())
.then(data => {
    allCountries = data;
    console.log(allCountries)
    allCountries.forEach(country => {
    const option = document.createElement("option");
    option.value = country.name;
    countries.appendChild(option);
    });
    generateRandomFlag();
})
.catch(err => console.error(err));

function generateRandomFlag() {
    randomNum = Math.floor(Math.random() * allCountries.length);
    flag.src = allCountries[randomNum].flag;
    theCountry = allCountries[randomNum].name;

    console.log(allCountries[randomNum]);  // DEBUGG;
};

function skipFlag() {
    if (scoreValue >= 3) {
        if (confirm("Skip Flag For 3 Points?")) {
            scoreValue -= 3;
            score.innerText = scoreValue;
            win();
        };
    } else {
        alert("You dont have enogh points.");
    };
};

function getHint() {
    if (scoreValue >= 1) {
        if (! ifNewCountry == false) {
            if (!confirm("Get Hint For 1 Points?")) {return;}
            scoreValue--;
            score.innerText = scoreValue;
            ifNewCountry = false;
        };
        alert(`Region: ${allCountries[randomNum].region}\nCapital: ${allCountries[randomNum].capital}\nCountry Starts With: ${allCountries[randomNum].name.substr(0, 2)}\nCountry name words count: ${allCountries[randomNum].name.split(" ").length}`)
        save2Local();
    } else {
        alert("You dont have enogh points.")
    };
};

function checkInput() {
    if (user.value.toLowerCase() == theCountry.toLowerCase()) {
        console.log("Win!");
        win();   
    } else {
        console.log("Lost!")       
    };
    user.value = "";
    user.focus();
};

function win() {
    scoreValue++;
score.innerText = scoreValue;
    ifNewCountry = true;
    generateRandomFlag();
    save2Local();
};

function save2Local() {
    localStorage.setItem("score", scoreValue);
};

function restoreLocal() {
    scoreValue = localStorage.getItem("score");
    score.innerText = scoreValue;
};