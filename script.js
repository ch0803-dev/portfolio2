// Intro loader with progress bar
window.addEventListener('load', function() {
  const loader = document.getElementById('introLoader');
  const mainSite = document.getElementById('mainSite');
  const progressBar = document.querySelector('.loader-progress');
  
  // Hide main site initially
  mainSite.style.opacity = '0';
  mainSite.style.visibility = 'hidden';
  
  // Simulate loading progress
  let progress = 0;
  const interval = setInterval(() => {
    progress += Math.random() * 20; // Slower progress
    if (progress >= 100) {
      progress = 100;
      clearInterval(interval);
      
      // Longer wait time
      setTimeout(() => {
        loader.classList.add('fade-out');
        
        setTimeout(() => {
          loader.style.display = 'none';
          mainSite.style.visibility = 'visible';
          mainSite.style.opacity = '1';
          document.body.style.overflow = 'auto';
        }, 1000); // Longer fade out
      }, 1500); // Longer initial wait
    }
    if (progressBar) {
      progressBar.style.width = progress + '%';
    }
  }, 300); // Slower updates
});

// Simple menu toggle
function toggleMenu() {
  document.querySelector('.lien').classList.toggle('active');
  document.querySelector('.menu-icon').classList.toggle('open');
}

// Simple smooth scroll
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({behavior: 'smooth'});
  
  if (window.innerWidth <= 900) {
    document.querySelector('.lien').classList.remove('active');
    document.querySelector('.menu-icon').classList.remove('open');
  }
}

// Show project images
function showProject(id) {
  document.querySelectorAll('.preview').forEach(img => img.style.display = 'none');
  const img = document.getElementById(id);
  if (img) img.style.display = 'block';
}

// Letter functions
function openLetter() {
  document.getElementById('letterEnvelope').classList.add('opened');
  setTimeout(() => {
    document.getElementById('letterContent').classList.add('show');
    startTimer();
  }, 600);
}

let timerInterval;

function startTimer() {
  let timeLeft = 25;
  const timerElement = document.getElementById('timerCountdown');
  
  timerInterval = setInterval(() => {
    timeLeft--;
    if (timerElement) {
      timerElement.textContent = timeLeft;
    }
    
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      closeLetter();
    }
  }, 1000);
}

function closeLetter() {
  clearInterval(timerInterval);
  document.getElementById('letterContent').classList.remove('show');
  setTimeout(() => {
    document.getElementById('letterEnvelope').classList.remove('opened');
  }, 400);
}

// Menu click handler
document.querySelector('.menu-icon').addEventListener('click', toggleMenu);

// Close menu when clicking outside on mobile
if (window.innerWidth <= 900) {
  document.getElementById('mainSite').addEventListener('click', function(e) {
    if (this.classList.contains('menu-open') && 
        !e.target.closest('.lien') && 
        !e.target.closest('.menu-icon')) {
      document.querySelector('.lien').classList.remove('active');
      document.querySelector('.menu-icon').classList.remove('open');
      this.classList.remove('menu-open');
    }
  });
}

// Click handlers for navigation
document.querySelectorAll('a').forEach(a => {
  a.onclick = function(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    
    if (href.startsWith('#')) {
      if (href === '#p1' || href === '#p2' || href === '#p3') {
        showProject(href.slice(1));
      } else {
        scrollToSection(href.slice(1));
      }
    }
  }
});

// Letter envelope click
document.getElementById('letterEnvelope').addEventListener('click', openLetter);