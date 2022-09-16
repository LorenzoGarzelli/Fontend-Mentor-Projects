'use strict';
const navModal = document.querySelector('.modal');
const navButton = document.querySelector('.nav-toggle');

navButton.addEventListener('click', event => {
  const isNavActive = navButton.classList.toggle('active');

  if (isNavActive) return (navModal.style.display = 'block');
  navModal.style.display = 'none';
});
