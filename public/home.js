
// Select the elements for navbar, menu button, and header
let navbar = document.querySelector('.header .flex .navbar');
let menuBtn = document.querySelector('#menu-btn');
let header = document.querySelector('.header');

// Toggle navbar and menu button on click
menuBtn.onclick = () => {
    navbar.classList.toggle('active'); // Toggle the visibility of navbar
    menuBtn.classList.toggle('fa-times'); // Toggle the "close" icon in the menu button
}

// Handle scroll behavior
window.onscroll = () => {
    // Remove 'active' class from navbar and menu button on scroll
    navbar.classList.remove('active');
    menuBtn.classList.remove('fa-times');
    
    // Add 'active' class to header when the page is scrolled down
    if (window.scrollY > 0) {
        header.classList.add('active'); // When the user scrolls down, add 'active' to header
    } else {
        header.classList.remove('active'); // Remove 'active' from header when at the top
    }
}

//Close menu when any navbar link is clicked
document.querySelectorAll('.header .navbar a').forEach(link => {
    link.onclick = () => {
        navbar.classList.remove('active');
        menuBtn.classList.remove('fa-times');
    };
});
