let mainNav = document.getElementById('navbar-list');

let navbarToggle = document.getElementById('navbar-toggle');

navbarToggle.addEventListener('click', () => {
  mainNav.classList.toggle('active');
});