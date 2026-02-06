window.addEventListener('load', function() {
  const loader = document.getElementById('introLoader');
  const mainSite = document.getElementById('mainSite');
  
  mainSite.style.opacity = '0';
  mainSite.style.visibility = 'hidden';
  
  setTimeout(() => {
    loader.classList.add('fade-out');
    
    setTimeout(() => {
      loader.style.display = 'none';
      mainSite.style.visibility = 'visible';
      mainSite.style.opacity = '1';
      document.body.style.overflow = 'auto';
    }, 500);
  }, 1500);
});

function toggleMenu() {
  document.querySelector('.lien').classList.toggle('active');
  document.querySelector('.menu-icon').classList.toggle('open');
}

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({behavior: 'smooth'});
  
  if (window.innerWidth <= 900) {
    document.querySelector('.lien').classList.remove('active');
    document.querySelector('.menu-icon').classList.remove('open');
  }
}

function showProject(id) {
  document.querySelectorAll('.preview').forEach(img => img.style.display = 'none');
  const img = document.getElementById(id);
  if (img) img.style.display = 'block';
}

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

document.querySelector('.menu-icon').addEventListener('click', toggleMenu);

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

document.querySelectorAll('a').forEach(a => {
  a.onclick = function(e) {
    const href = this.getAttribute('href');
    
    if (href.startsWith('#')) {
      e.preventDefault();
      if (href === '#p1' || href === '#p2' || href === '#p3') {
        showProject(href.slice(1));
      } else {
        scrollToSection(href.slice(1));
      }
    }
  }
});

document.getElementById('letterEnvelope').addEventListener('click', openLetter);