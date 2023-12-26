const image = document.getElementById("image");
const labelsWrap = document.getElementById("imgs__labels");
//const labels = document.querySelectorAll(".label");

const bottomMenuElements = document.querySelector("#bottom-menu__elements");
//const bottomMenuDots = document.querySelectorAll(".bottom-menu__point");
const previosImage = document.getElementById("previos-img");
const nextImage = document.getElementById("next-img");

const appartmentCity = document.getElementById("appartment__city");
const appartmentArea = document.getElementById("appartment__area");
const appartmentRepairTime = document.getElementById("appartment__repair-time");
const appartmentRepairCost = document.getElementById("appartment__repair-cost");

let bottomMenuDots = [];
let labels = [];
let currentIndex = 0;


class Appartment {
    constructor (label, city, area, repairTime, repairCost, image){
        this.label = label;
        this.city = city;
        this.area = area;
        this.repairTime = repairTime;
        this.repairCost = repairCost;
        this.image = image;
    }
}

const appartments = [
    new Appartment(
        "Rostov-on-Don, Admiral",
        "Rostov-on-Don <br> LCD admiral",
        "81 m2",
        "3.5 months",
        "Upon request",
        "imgs/image 1.png"
    ),

    new Appartment(
        "Sochi Thieves",
        "Sochi <br> Thieves",
        "105 m2",
        "4 months",
        "Upon request",
        "imgs/image 2.png"
    ),

    new Appartment(
        "Rostov-on-Don Patriotic",
        "Rostov-on-Don <br> Patriotic",
        "93 m2",
        "3 months",
        "Upon request",
        "imgs/image 3.png"
    )
];

const loadElements = function() {
    //присвоение атрибутов квартиры
    appartmentCity.innerHTML = appartments[0].city;
    appartmentArea.innerHTML = appartments[0].area;
    appartmentRepairCost.innerHTML = appartments[0].repairCost;
    appartmentRepairTime.innerHTML = appartments[0].repairTime;
    //отрисовка bottomMenu
    let button;
    for (let i = 0; i < appartments.length; i++) {
        button = document.createElement('button');
        button.classList.add('bottom-menu__point');
        if (i != 0) {
            button.classList.add('not-choosed');
        }
        button.dataset.number = i;
        button.innerHTML = `<img src="imgs/point.svg">`;

        bottomMenuDots.push(button);
        bottomMenuElements.appendChild(button) ;
    }

    for (let el of bottomMenuDots) {
        el.addEventListener("click", () => changeImage(+el.dataset.number));
    }

    let label;
    //отрисовка labels
    for (let i = 0; i < appartments.length; i++) {
        label= document.createElement("h2")
        label.classList.add("label");
        label.dataset.number = i;
        label.innerHTML += appartments[i].label;

        labels.push(label);
        labelsWrap.appendChild(label);
    }
    labels[0].classList.add("label_active");

    for (let el of labels) {
        el.addEventListener("click", () => changeImage(+el.dataset.number));
    }

    previosImage.addEventListener("click", () => {
        if(currentIndex === 0) {
            changeImage(0);
        } else {
            changeImage(currentIndex - 1);
        }
    });

    nextImage.addEventListener("click", () => {
        if(currentIndex >= appartments.length - 1) {
            //currentIndex = appartments.length - 1;
            
            changeImage(currentIndex);
        } else {
            changeImage(currentIndex + 1);
        }
    });

    //отрисовка изображения
    image.src = `${appartments[0].image}`;
    image.alt = `${appartments[0].label}`;
}

loadElements();





function changeImage(number) {
    currentIndex = number;
    
    image.src = `${appartments[number].image}`;
    image.alt = `${appartments[number].label}`;
    
    for(el of labels) {
        el.classList.remove("label_active");
    }
    labels[number].classList.add("label_active");

    for(el of bottomMenuDots) {
        el.classList.add("not-choosed");
    }
    bottomMenuDots[number].classList.remove("not-choosed");

    appartmentCity.innerHTML = appartments[number].city;
    appartmentArea.innerHTML = appartments[number].area;
    appartmentRepairCost.innerHTML = appartments[number].repairCost;
    appartmentRepairTime.innerHTML = appartments[number].repairTime;
}