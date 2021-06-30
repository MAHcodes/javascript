const countries = document.getElementById("countries");
const flag = document.getElementById("flag");
const user = document.getElementById("country-name");
const fireBtn = document.getElementById("fire");
const score = document.getElementById("score");
const hintBtn = document.getElementById("hint");
const skipBtn = document.getElementById("skip");
const fbBtn = document.getElementById("share-facebook");
const wpBtn = document.getElementById("share-whatsapp");
const twBtn = document.getElementById("share-twitter");
const toast = document.getElementById("toast");
const xBtn  = document.getElementById("x");
const taostCountryName = document.getElementById("toast-country-name");
const taostCountryCapital = document.getElementById("toast-country-capital");

let allCountries = null;
let theCountry = null;
let scoreValue = 5;
let ifNewCountry = true;
let ifWP = true;
let ifFB = true;
let ifTW =  true;

window.addEventListener("load", restoreLocal);
fireBtn.addEventListener("click", checkInput);
hintBtn.addEventListener("click", getHint);
skipBtn.addEventListener("click", skipFlag);
wpBtn.addEventListener("click", shareWhatsapp);
fbBtn.addEventListener("click", shareFacebook);
twBtn.addEventListener("click", shareTwitter);
xBtn.addEventListener("click", () => toast.classList.remove("show"));
user.addEventListener("keypress", (e) => {
    if (e.keyCode === 13 && e.key == "Enter") {
        fireBtn.click();
    };
});

fetch("./response.json")
.then(response => response.json())
.then(data => {
    allCountries = data;
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
            if (!confirm("Get Hint For 1 Point?")) {return;}
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
        win();   
    } else {
        user.style.border = "2px solid red";
    };
    user.value = "";
};

function win() {
    taostCountryName.innerText = allCountries[randomNum].name;
    taostCountryCapital.innerText = allCountries[randomNum].capital;

    user.style.border = "none";
    showToast();
    scoreValue++;
    score.innerText = scoreValue;
    ifNewCountry = true;
    generateRandomFlag();
    save2Local();
    updateUrl();
};

function showToast() {
    toast.classList.add("show");
    toast.addEventListener("transitionend", () => {
        setTimeout(() => {
            toast.classList.remove("show")
        }, 2000)
    });
};

function save2Local() {
    localStorage.setItem("flagScore", scoreValue);
};

function saveShares() {
    localStorage.setItem("flagShares", [ifFB, ifWP, ifTW]);
};

function restoreLocal() {
    if (localStorage.getItem("flagScore") == null) {
        scoreValue = 5;
    } else {
        scoreValue = localStorage.getItem("flagScore");
        score.innerText = scoreValue;
        updateUrl();
    };
    if (localStorage.getItem("flagShares") == null) {
        flagShares = [true, true, true];
    } else {
        let flagShares = localStorage.getItem("flagShares").split(",");
        ifFB = flagShares[0];
        ifWP = flagShares[1];
        ifTW = flagShares[2];
    }; 
};

function shareWhatsapp() {
    checkIfOnce(ifWP);
    ifWP = false;
    saveShares();
};

function shareFacebook() {
    checkIfOnce(ifFB);
    ifFB = false;
    saveShares();
};

function shareTwitter() {
    checkIfOnce(ifTW);
    ifTW = false;
    saveShares();
};

function checkIfOnce(e) {
    if (e == true || e == "true") {
        scoreValue = parseInt(scoreValue, 10) + 4;
        score.innerText= scoreValue;
        save2Local();
    };
};

function updateUrl() {
    wpBtn.href = `whatsapp://send?text=I got ${scoreValue} point(s) in the Flag Quiz Game. Try to beat me! https://bit.ly/3A8yQxd`;
    fbBtn.href = `https://www.facebook.com/share.php?u=https://bit.ly/3A8yQxd&quote=I got ${scoreValue} point(s) in the Flag Quiz Game. Try to beat me! https://bit.ly/3A8yQxd`;
    twBtn.href = `https://twitter.com/share?text=I got ${scoreValue} point(s) in the Flag Quiz Game. Try to beat me! https://bit.ly/3A8yQxd`;
};