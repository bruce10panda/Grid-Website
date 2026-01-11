let slideIndex = 1; 
const slideRow = document.getElementById('slideRow');
const dots = document.getElementsByClassName("dot");
const slides = document.querySelectorAll('.mySlides');
const totalOriginalSlides = slides.length - 2; 

function showSlides(n, animated = true) {
    if (animated) {
        slideRow.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
    } else {
        slideRow.style.transition = 'none';
    }
    const percent = n * -100;
    slideRow.style.transform = `translateX(${percent}vw)`;
    updateDots(n);
}

function updateDots(n) {
    let displayIndex = n;
    if (n > totalOriginalSlides) displayIndex = 1;
    if (n < 1) displayIndex = totalOriginalSlides;

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    if (dots[displayIndex - 1]) {
        dots[displayIndex - 1].className += " active";
    }
}

// THE KEY UPDATE: Handling clicks specifically
function currentSlide(n) {
    slideIndex = n;
    showSlides(slideIndex);

    // Get the element that was actually clicked
    const clickedElement = window.event ? window.event.target : null;

    // Only update the color indicator if the user clicked a "color" div
    // This ignores clicks coming from "dot" spans or swipe actions
    if (clickedElement && clickedElement.classList.contains('color')) {
        const colorDivs = document.querySelectorAll('.color');
        colorDivs.forEach(div => div.classList.remove('active-color'));
        clickedElement.classList.add('active-color');
    }
}

// Infinite loop logic
slideRow.addEventListener('transitionend', () => {
    if (slideIndex > totalOriginalSlides) {
        slideIndex = 1;
        showSlides(slideIndex, false);
    }
    if (slideIndex < 1) {
        slideIndex = totalOriginalSlides;
        showSlides(slideIndex, false);
    }
});

// Navigation helpers
function plusSlides(n) { 
    slideIndex += n;
    showSlides(slideIndex); 
}

// Swipe Logic
let startX = 0;
let isDragging = false;
const dragStart = (e) => {
    isDragging = true;
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
};
const dragEnd = (e) => {
    if (!isDragging) return;
    let endX = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
    const threshold = 50;
    if (endX < startX - threshold) plusSlides(1);
    else if (endX > startX + threshold) plusSlides(-1);
    else showSlides(slideIndex);
    isDragging = false;
};

const container = document.querySelector('.slideshow-container');
container.addEventListener('mousedown', dragStart);
window.addEventListener('mouseup', dragEnd);
container.addEventListener('touchstart', dragStart, {passive: true});
container.addEventListener('touchend', dragEnd);
container.addEventListener('dragstart', (e) => e.preventDefault());

showSlides(slideIndex, false);

// Menu logic
const menuToggle = document.getElementById('menu-toggle');
const headerMenu = document.querySelector('.headermenu');
const header = document.querySelector('.header');
function closeMenu() {
    headerMenu.classList.remove('headermenuactive');
    header.classList.remove('menu-open');
}
menuToggle.addEventListener('click', () => {
    headerMenu.classList.toggle('headermenuactive');
    header.classList.toggle('menu-open');
});
headerMenu.addEventListener('click', (e) => { if (e.target === headerMenu) closeMenu(); });

// Select the elements
const specModal = document.querySelector('.modalbg1');
const openBtn = document.getElementById('spec-open');
const closeBtn = document.getElementById('spec-close');

// Function to open the modal
openBtn.addEventListener('click', () => {
    specModal.classList.add('modal-visible');
});

// Function to close the modal
closeBtn.addEventListener('click', () => {
    specModal.classList.remove('modal-visible');
});

// Optional: Close modal if you click the dark background (outside the box)
specModal.addEventListener('click', (e) => {
    if (e.target === specModal) {
        specModal.classList.remove('modal-visible');
    }
});