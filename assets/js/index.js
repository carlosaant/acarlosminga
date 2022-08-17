'use strict';

let developmentIsVisible = false;
const btn_mobile = document.getElementById('btn-mobile');

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('scroll', onScroll);
  btn_mobile.addEventListener('click', toggleMenu);
  btn_mobile.addEventListener('touchstart', toggleMenu);
});

function toggleMenu(event) {
  if (event.type === 'touchstart') {
    event.preventDefaut();
  }
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
}

function onScroll() {
  if (!developmentIsVisible) {
    activateSectionAnimationBars(skills);
  }
}

function activateSectionAnimationBars(section) {
  const targetLine = scrollY + innerHeight / 2;

  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionEndsAt = sectionTop + sectionHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;
  if (sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine) {
    animationBarsSkill(section);
    developmentIsVisible = true;
  }
}

function animationBarsSkill(section) {
  // document.getElementById('skills')
  section.querySelectorAll('li').forEach(liItem => {
    let barContainer = liItem.querySelector('.bar-container');
    let dataPercent = parseInt(barContainer.dataset.percent);
    let elemento = liItem.querySelector('.progressbar');
    let percent = liItem.querySelector('.percent');
    let width = 0;

    let interval = setInterval(() => {
      if (width >= dataPercent) {
        clearInterval(interval);
      } else {
        width++;
        elemento.style.width = width + '%';
        percent.textContent = width + '%';
      }
    }, 20);
  });
}
