'use strict';



/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

// Sélectionnez tous les liens de navigation
const navLinks = document.querySelectorAll('.navbar-link');

// Ajoutez un gestionnaire d'événement de clic pour le défilement en douceur
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du lien

    // Obtenez la valeur de l'attribut href du lien
    const targetId = link.getAttribute('href').substring(1);

    // Obtenez la section cible en utilisant l'ID
    const targetSection = document.getElementById(targetId);

    // Défilez jusqu'à la section cible
    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Ajoutez un gestionnaire d'événement de défilement pour mettre à jour la classe "active"
window.addEventListener('scroll', () => {
  // Obtenez la position actuelle de défilement
  const scrollPosition = window.scrollY;

  // Parcourez les sections de votre page et déterminez laquelle est visible
  navLinks.forEach(link => {
    const targetId = link.getAttribute('href').substring(1);
    const targetSection = document.getElementById(targetId);
    
    if (targetSection) {
      const sectionTop = targetSection.offsetTop;
      const sectionHeight = targetSection.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        // La section est visible à l'écran, mettez à jour la classe "active"
        navLinks.forEach(link => link.classList.remove('active'));
        link.classList.add('active');
      }
    }
  });
});




/*
 * NAVBAR
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});


// Slides des supermarkets  de la Duphine  //

// Supermarché Bonjour-minamadou 
const images1 = [
    "./assets/images/photo site/supermarche/bonjour-minamadou/BM1.jpg",
    "./assets/images/photo site/supermarche/bonjour-minamadou/BM4.jpg",
    "./assets/images/photo site/supermarche/bonjour-minamadou/BM6.jpg",
   
];

let currentImageIndex1 = 0;
const slideshowImage1 = document.getElementById('slideshow-image1');

function changeImage1() {
    slideshowImage1.style.opacity = 0; // Réduit l'opacité de l'image actuelle
    setTimeout(() => {
        slideshowImage1.src = images1[currentImageIndex1];
        currentImageIndex1 = (currentImageIndex1 + 1) % images1.length;
        slideshowImage1.style.opacity = 1; // Augmente l'opacité de la nouvelle image
    }, 1000); // La transition dure 1 seconde (1000 ms)
}

setInterval(changeImage1, 10000);

//Supermarché Bonjour-Total Port 

const images2 = [
  "./assets/images/photo site/supermarche/bonjour-totalport/BPORT (10).jpg",
  "./assets/images/photo site/supermarche/bonjour-totalport/BPORT (6).jpg",
  "./assets/images/photo site/supermarche/bonjour-totalport/BPORT (3).jpg",
 
];

let currentImageIndex2 = 0;
const slideshowImage2 = document.getElementById('slideshow-image2');

function changeImage2() {
  slideshowImage2.style.opacity = 0; // Réduit l'opacité de l'image actuelle
  setTimeout(() => {
      slideshowImage2.src = images2[currentImageIndex2];
      currentImageIndex2 = (currentImageIndex2 + 1) % images2.length;
      slideshowImage2.style.opacity = 1; // Augmente l'opacité de la nouvelle image
  }, 1000); // La transition dure 1 seconde (1000 ms)
}

setInterval(changeImage2, 10000);

//Supermarché CM Akodessewa 


const images3 = [
  "./assets/images/photo site/supermarche/cm -akodessewa/CM0.jpg",
  "./assets/images/photo site/supermarche/cm -akodessewa/CM3.jpg",
  "./assets/images/photo site/supermarche/cm -akodessewa/CM5.jpg",
 
];

let currentImageIndex3 = 0;
const slideshowImage3 = document.getElementById('slideshow-image3');

function changeImage3() {
  slideshowImage3.style.opacity = 0; // Réduit l'opacité de l'image actuelle
  setTimeout(() => {
      slideshowImage3.src = images3[currentImageIndex3];
      currentImageIndex3 = (currentImageIndex2 + 1) % images3.length;
      slideshowImage3.style.opacity = 1; // Augmente l'opacité de la nouvelle image
  }, 1000); // La transition dure 1 seconde (1000 ms)
}

setInterval(changeImage3, 10000);


//Supermarché Dauphine FASTAR  


const images4 = [
  "./assets/images/photo site/supermarche/dauph-fastar/FA1.jpg",
  "./assets/images/photo site/supermarche/dauph-fastar/FA4.jpg",
  "./assets/images/photo site/supermarche/dauph-fastar/FA5.jpg",
 
];

let currentImageIndex4 = 0;
const slideshowImage4 = document.getElementById('slideshow-image4');

function changeImage4() {
  slideshowImage4.style.opacity = 0; // Réduit l'opacité de l'image actuelle
  setTimeout(() => {
      slideshowImage4.src = images4[currentImageIndex4];
      currentImageIndex4 = (currentImageIndex4 + 1) % images4.length;
      slideshowImage4.style.opacity = 1; // Augmente l'opacité de la nouvelle image
  }, 1000); // La transition dure 1 seconde (1000 ms)
}

setInterval(changeImage4, 10000);




//Supermarché Dauphine Adidogomé


const images5 = [
  "./assets/images/photo site/supermarche/dauphine-adidogome/DA.jpg",
  "./assets/images/photo site/supermarche/dauphine-adidogome/DA4.jpg",
  "./assets/images/photo site/supermarche/dauphine-adidogome/DA7.jpg",
 
];

let currentImageIndex5 = 0;
const slideshowImage5 = document.getElementById('slideshow-image5');

function changeImage5() {
  slideshowImage5.style.opacity = 0; // Réduit l'opacité de l'image actuelle
  setTimeout(() => {
      slideshowImage5.src = images5[currentImageIndex5];
      currentImageIndex5 = (currentImageIndex5 + 1) % images5.length;
      slideshowImage5.style.opacity = 1; // Augmente l'opacité de la nouvelle image
  }, 1000); // La transition dure 1 seconde (1000 ms)
}

setInterval(changeImage5, 10000);



//Supermarché Dauphine Avédji 


const images6 = [
  "./assets/images/photo site/supermarche/dauphine-avedji/DAV1.jpg",
  "./assets/images/photo site/supermarche/dauphine-avedji/DAV2.jpg",
  "./assets/images/photo site/supermarche/dauphine-avedji/DAV3.jpg",
 
];

let currentImageIndex6 = 0;
const slideshowImage6 = document.getElementById('slideshow-image6');

function changeImage6() {
  slideshowImage6.style.opacity = 0; // Réduit l'opacité de l'image actuelle
  setTimeout(() => {
      slideshowImage6.src = images6[currentImageIndex6];
      currentImageIndex6 = (currentImageIndex6 + 1) % images6.length;
      slideshowImage6.style.opacity = 1; // Augmente l'opacité de la nouvelle image
  }, 1000); // La transition dure 1 seconde (1000 ms)
}

setInterval(changeImage6, 10000);



//Supermarché Dauphine Hédrzanawoé


const images7 = [
  "./assets/images/photo site/supermarche/dauphine-hedrza/DH1.jpg",
  "./assets/images/photo site/supermarche/dauphine-hedrza/DH4.jpg",
  "./assets/images/photo site/supermarche/dauphine-hedrza/DH5.jpg",
 
];

let currentImageIndex7 = 0;
const slideshowImage7 = document.getElementById('slideshow-image7');

function changeImage7() {
  slideshowImage7.style.opacity = 0; // Réduit l'opacité de l'image actuelle
  setTimeout(() => {
      slideshowImage7.src = images7[currentImageIndex7];
      currentImageIndex7 = (currentImageIndex7 + 1) % images7.length;
      slideshowImage7.style.opacity = 1; // Augmente l'opacité de la nouvelle image
  }, 1000); // La transition dure 1 seconde (1000 ms)
}

setInterval(changeImage7, 10000);



//Supermarché Dauphine Port


const images8 = [
  "./assets/images/photo site/supermarche/dauphine-port/DP1.jpg",
  "./assets/images/photo site/supermarche/dauphine-port/DP5.jpg",
  "./assets/images/photo site/supermarche/dauphine-port/DP7.jpg",
 
];

let currentImageIndex8 = 0;
const slideshowImage8 = document.getElementById('slideshow-image8');

function changeImage8() {
  slideshowImage8.style.opacity = 0; // Réduit l'opacité de l'image actuelle
  setTimeout(() => {
      slideshowImage8.src = images8[currentImageIndex8];
      currentImageIndex8 = (currentImageIndex8 + 1) % images8.length;
      slideshowImage8.style.opacity = 1; // Augmente l'opacité de la nouvelle image
  }, 1000); // La transition dure 1 seconde (1000 ms)
}

setInterval(changeImage8, 10000);


//Supermarché Dauphine Totsi


const images9 = [
  "./assets/images/photo site/supermarche/dauphine-totsi/DT1.jpg",
  "./assets/images/photo site/supermarche/dauphine-totsi/DT4.jpg",
  "./assets/images/photo site/supermarche/dauphine-totsi/DT5.jpg",
 
];

let currentImageIndex9 = 0;
const slideshowImage9 = document.getElementById('slideshow-image9');

function changeImage9() {
  slideshowImage9.style.opacity = 0; // Réduit l'opacité de l'image actuelle
  setTimeout(() => {
      slideshowImage9.src = images9[currentImageIndex8];
      currentImageIndex9 = (currentImageIndex9 + 1) % images9.length;
      slideshowImage9.style.opacity = 1; // Augmente l'opacité de la nouvelle image
  }, 1000); // La transition dure 1 seconde (1000 ms)
}

setInterval(changeImage9, 10000);



//Supermarché T-express Victoire 


const images10 = [
  "./assets/images/photo site/supermarche/t-express -victoire/TV.jpg",
  "./assets/images/photo site/supermarche/t-express -victoire/TV2.jpg",
  "./assets/images/photo site/supermarche/t-express -victoire/TV3.jpg",
 
];

let currentImageIndex10 = 0;
const slideshowImage10 = document.getElementById('slideshow-image10');

function changeImage10() {
  slideshowImage10.style.opacity = 0; // Réduit l'opacité de l'image actuelle
  setTimeout(() => {
      slideshowImage10.src = images10[currentImageIndex10];
      currentImageIndex10 = (currentImageIndex10 + 1) % images10.length;
      slideshowImage10.style.opacity = 1; // Augmente l'opacité de la nouvelle image
  }, 1000); // La transition dure 1 seconde (1000 ms)
}

setInterval(changeImage10, 10000);


//Supermarché Dauphine T-express Djablé


const images11 = [
  "./assets/images/photo site/supermarche/t-express-djagble/TD7.jpg",
  "./assets/images/photo site/supermarche/t-express-djagble/TD6.jpg",
  "./assets/images/photo site/supermarche/t-express-djagble/TD3.jpg",
 
];

let currentImageIndex11 = 0;
const slideshowImage11 = document.getElementById('slideshow-image11');

function changeImage11() {
  slideshowImage11.style.opacity = 0; // Réduit l'opacité de l'image actuelle
  setTimeout(() => {
      slideshowImage11.src = images11[currentImageIndex11];
      currentImageIndex11 = (currentImageIndex11 + 1) % images11.length;
      slideshowImage11.style.opacity = 1; // Augmente l'opacité de la nouvelle image
  }, 1000); // La transition dure 1 seconde (1000 ms)
}

setInterval(changeImage11, 10000);




//Diaporama des Restaurants 


const images12 = [
  "./assets/images/photo site/resto/rest-fastar/DF2.jpg",
  "./assets/images/photo site/resto/resto-port/DPRES1.jpg",
  "./assets/images/photo site/resto/resto-port/DPRES2.jpg",
  "./assets/images/photo site/resto/resto-port/DPRES4.jpg",
  "./assets/images/photo site/resto/t-resto-djagble/RESTOD2.jpg",
  "./assets/images/photo site/resto/t-resto-djagble/RESTOD3.jpg",
  "./assets/images/photo site/resto/t-resto-djagble/RESTOD4.jpg",
  
  

  
 
];

let currentImageIndex12 = 0;
const slidesShowDish = document.getElementById('slides-show-dish');

function changeImage12() {
  slidesShowDish.style.opacity = 0; // Réduit l'opacité de l'image actuelle
  setTimeout(() => {
    slidesShowDish.src = images12[currentImageIndex12];
      currentImageIndex12 = (currentImageIndex12 + 1) % images12.length;
      slidesShowDish.style.opacity = 1; // Augmente l'opacité de la nouvelle image
  }, 1000); // La transition dure 1 seconde (1000 ms)
}

setInterval(changeImage12, 3000);


