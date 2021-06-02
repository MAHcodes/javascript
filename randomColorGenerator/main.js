const colorTitle = document.getElementById("title");
const colorType = document.getElementById("type");
const generateBtn = document.getElementById("generate");
const favoriteBtn = document.getElementById("favorite");
const content = document.getElementById("content");
const colorPicker = document.getElementById("color");
const favoriteColors = document.getElementById("favorites");
let tag = Array.from(document.querySelectorAll(".tag"));
const favText = document.getElementById("favorite-text");
const trashIcon = document.getElementById("trash");
const trashContainer = document.querySelector(".trash-container");
const toast = document.getElementById("toast");
const timesIcon = document.getElementById("times");
const copiedTitle = document.getElementById("copied-title");
let color = ""


function updaeTagEvent() {
    tag.forEach(function(e) {
        e.addEventListener("click", copyColorToClipboard);
    })
};
updaeTagEvent();
generateBtn.addEventListener("click", generateRandomColor);
colorType.addEventListener("change", changeType)
colorPicker.addEventListener("change", generateCustomColor)
favoriteBtn.addEventListener("click", addToFavorites);
trashIcon.addEventListener("click", removeAllItems);
colorType.addEventListener("change", function(){
    if (colorType.value === "custom") {
        generateCustomColor();
    } else generateRandomColor();
});
timesIcon.addEventListener("click", removeToast);
colorType.value = "hex";

function copyColorToClipboard(e) {
    navigator.clipboard.writeText(e.target.textContent);
    toastShow(e);
}

function toastShow(e) {
    color = e.target.textContent;
    copiedTitle.textContent = color;

    toast.classList.remove("hide");
    setTimeout(() => {
        toast.classList.add("hide");
    }, 2000);
}

function removeToast() {
    toast.classList.add("hide");
}

function generateRandomColor () {
    if (colorType.value === "hex") {
        generateHexColor();
    } else if (colorType.value === "rgb") {
        generateRgbColor();
    } else if (colorType.value === "hsl") {
        generateHslColor();
    } else if (colorType.value === "css"){
        generateCssColor();
    }
    colorTitle.textContent = color; 
    content.style.backgroundColor = color;
}

function changeType(e) {
    if (e.target.value === "custom") {
        generateBtn.classList.add("hide");
        colorPicker.classList.remove("hide");
    } else {
        colorPicker.classList.add("hide");
        generateBtn.classList.remove("hide");
    }
}

function generateHexColor() {
    const hexColors = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F"];
    color = "#";

    for (i=0; i<6; i++) {
        color += hexColors[Math.floor(Math.random() * hexColors.length)];
    }
    return color;
}


function generateRgbColor () {
    color = "";
    for (i=0; i<3; i++) {
        color += Math.floor(Math.random()*255);
        if (i < 2) {
            color += ", "
        }
    } 
    return color = "rgb(" + color + ")";
}

function generateHslColor () {
    color = "";
    const h = Math.floor(Math.random()*360);
    const s = Math.floor(Math.random()*100);
    const l = Math.floor(Math.random()*100);

    return color = `hsl(${h}, ${s}%, ${l}%)`;
}

function generateCustomColor() {
    colorTitle.textContent = colorPicker.value.toUpperCase();
    content.style.backgroundColor = colorPicker.value;
    color = colorPicker.value;
}

function removeItem(e) {
    let favColorContainer = document.getElementsByClassName("favColorContainer");
    if (favColorContainer.length === 1) {
    trashContainer.classList.add("hide");
    favText.classList.remove("hide");
    }
    e.target.parentElement.remove();
    removeLocal(e.target.parentElement.lastElementChild.innerText);
}

function removeAllItems() {
    while (favoriteColors.lastElementChild.className === "favColorContainer") {
        favoriteColors.removeChild(favoriteColors.lastElementChild);
    };
    trashContainer.classList.add("hide");
    favText.classList.remove("hide");
    removeAllLocal();
}

function generateCssColor() {
    const cssColors =["AliceBlue","AntiqueWhite","Aqua","Aquamarine","Azure","Beige","Bisque","Black","BlanchedAlmond","Blue","BlueViolet","Brown","BurlyWood","CadetBlue","Chartreuse","Chocolate","Coral","CornflowerBlue","Cornsilk","Crimson","Cyan","DarkBlue","DarkCyan","DarkGoldenRod","DarkGray","DarkGrey","DarkGreen","DarkKhaki","DarkMagenta","DarkOliveGreen","DarkOrange","DarkOrchid","DarkRed","DarkSalmon","DarkSeaGreen","DarkSlateBlue","DarkSlateGray","DarkSlateGrey","DarkTurquoise","DarkViolet","DeepPink","DeepSkyBlue","DimGray","DimGrey","DodgerBlue","FireBrick","FloralWhite","ForestGreen","Fuchsia","Gainsboro","GhostWhite","Gold","GoldenRod","Gray","Grey","Green","GreenYellow","HoneyDew","HotPink","IndianRed","Indigo","Ivory","Khaki","Lavender","LavenderBlush","LawnGreen","LemonChiffon","LightBlue","LightCoral","LightCyan","LightGoldenRodYellow","LightGray","LightGrey","LightGreen","LightPink","LightSalmon","LightSeaGreen","LightSkyBlue","LightSlateGray","LightSlateGrey","LightSteelBlue","LightYellow","Lime","LimeGreen","Linen","Magenta","Maroon","MediumAquaMarine","MediumBlue","MediumOrchid","MediumPurple","MediumSeaGreen","MediumSlateBlue","MediumSpringGreen","MediumTurquoise","MediumVioletRed","MidnightBlue","MintCream","MistyRose","Moccasin","NavajoWhite","Navy","OldLace","Olive","OliveDrab","Orange","OrangeRed","Orchid","PaleGoldenRod","PaleGreen","PaleTurquoise","PaleVioletRed","PapayaWhip","PeachPuff","Peru","Pink","Plum","PowderBlue","Purple","RebeccaPurple","Red","RosyBrown","RoyalBlue","SaddleBrown","Salmon","SandyBrown","SeaGreen","SeaShell","Sienna","Silver","SkyBlue","SlateBlue","SlateGray","SlateGrey","Snow","SpringGreen","SteelBlue","Tan","Teal","Thistle","Tomato","Turquoise","Violet","Wheat","White","WhiteSmoke","Yellow","YellowGreen"];

    color = cssColors[Math.floor(Math.random() * cssColors.length)];
}

function saveLocal(color) {
    let colors;
    if (localStorage.getItem("colors") === null) {
        colors = [];
    } else {
        colors = JSON.parse(localStorage.getItem("colors"));
    } colors.push(color);
    localStorage.setItem("colors", JSON.stringify(colors));
}

restoreLocal();
function restoreLocal() {
    let colors = JSON.parse(localStorage.getItem("colors"));
    colors.forEach(color => {
        let favColorContainer = document.getElementsByClassName("favColorContainer");
        if (favColorContainer.length === 0) {
            trashContainer.classList.remove("hide");
            favText.classList.add("hide");
        } 
        const div = document.createElement("div");
        const favTextColor = document.createElement("h2");
        const delIcon = document.createElement("div");
    
        delIcon.addEventListener("click", removeItem);
    
        div.setAttribute("class", "favColorContainer");
        favTextColor.setAttribute("class", "favTextColor");
        delIcon.setAttribute("class", "delIcon");
        favTextColor.classList.add("tag");
        favTextColor.setAttribute("title", "Copy to clipboard!");
    
        favTextColor.textContent = color;
        div.style.backgroundColor = color;
        delIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
        div.appendChild(delIcon);
        div.appendChild(favTextColor);
        favoriteColors.appendChild(div);
        tag = document.querySelectorAll(".tag");
        updaeTagEvent();
    });
}

function addToFavorites() {
    let favColorContainer = document.getElementsByClassName("favColorContainer");
    let color = colorTitle.textContent;
    if (favColorContainer.length === 0) {
    trashContainer.classList.remove("hide");
    favText.classList.add("hide");
    } const div = document.createElement("div");
    const favTextColor = document.createElement("h2");
    const delIcon = document.createElement("div");

    delIcon.addEventListener("click", removeItem);

    div.setAttribute("class", "favColorContainer");
    favTextColor.setAttribute("class", "favTextColor");
    delIcon.setAttribute("class", "delIcon");
    favTextColor.classList.add("tag");
    favTextColor.setAttribute("title", "Copy to clipboard!");

    favTextColor.textContent = color;
    div.style.backgroundColor = color;
    saveLocal(color);
    delIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
    div.appendChild(delIcon);
    div.appendChild(favTextColor);
    favoriteColors.appendChild(div);
    tag = document.querySelectorAll(".tag");
    updaeTagEvent();
}

function removeLocal(color) {
    let colors;
    if (localStorage.getItem("colors") === null) {
        colors = [];
    } else {
        colors = JSON.parse(localStorage.getItem("colors"));
    } colors.splice(colors.indexOf(color), 1);
    localStorage.setItem("colors", JSON.stringify(colors));
}


function removeAllLocal() {
    let colors;
    if (localStorage.getItem("colors") != null) {
        colors = JSON.parse(localStorage.getItem("colors"));
        colors = [];
        localStorage.setItem("colors", JSON.stringify(colors));
    }
}

