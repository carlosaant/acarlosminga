'use strict';

let developmentIsVisible = false;
let experienseTimelineIsVisible = false;
let backToTopButton = document.getElementById('backToTopButton');
const btn_mobile = document.getElementById('btn-mobile');
const nav = document.getElementById('nav');
const menu = document.getElementById('menu');

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('scroll', onScroll);
  btn_mobile.addEventListener('click', toggleMenu);
  btn_mobile.addEventListener('touchstart', toggleMenu);
});

function toggleMenu(event) {
  if (event.type === 'touchstart') {
    event.preventDefault();
  }
  event.stopPropagation();
  handleClickOutside(menu, () => {
    nav.classList.remove('active');
    setAriaMenu();
  });
  nav.classList.toggle('active');
  setAriaMenu();
}

function setAriaMenu() {
  const isActive = nav.classList.contains('active');
  btn_mobile.setAttribute('aria-expanded', isActive);
  if (isActive) {
    btn_mobile.setAttribute('aria-label', 'Fechar Menu');
  } else {
    btn_mobile.setAttribute('aria-label', 'Abrir Menu');
  }
}

function handleClickOutside(targetElement, callback) {
  const html = document.documentElement;
  function handleHTMLClick(event) {
    if (!targetElement.contains(event.target)) {
      targetElement.removeAttribute('data-target');
      html.removeEventListener('click', handleHTMLClick);
      html.removeEventListener('touchstart', handleHTMLClick);
      callback();
    }
  }
  if (!targetElement.hasAttribute('data-target')) {
    html.addEventListener('click', handleHTMLClick);
    html.addEventListener('touchstart', handleHTMLClick);
    targetElement.setAttribute('data-target', '');
  }
}

function onScroll() {
  showBackToTopButtonOnScroll();
  if (!developmentIsVisible) {
    activateSectionAnimationBars(skills);
  }
  if (!experienseTimelineIsVisible) {
    activateSectionAnimationTimeline(experience);
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
  section.querySelectorAll('.tech_item').forEach(liItem => {
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

function activateSectionAnimationTimeline(section) {
  const targetLine = scrollY + innerHeight / 2;

  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionEndsAt = sectionTop + sectionHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;
  if (sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine) {
    section.querySelectorAll('li').forEach(liItem => {
      // liItem.style.marginLeft = '5rem';
      let rem = 20;
      let interval = setInterval(() => {
        if (rem <= 2) {
          clearInterval(interval);
        }
        rem--;
        liItem.style.marginLeft = rem + 'rem';
      }, 20);
    });

    experienseTimelineIsVisible = true;
  }
}

function showBackToTopButtonOnScroll() {
  // tamanho da tela pra ativar
  if (scrollY > 500 && !nav.classList.contains('active')) {
    backToTopButton.classList.add('show');
  } else {
    backToTopButton.classList.remove('show');
  }
}

//
ScrollReveal({
  origin: 'top',
  distance: '30px',
  duration: 500
}).reveal(`
#about,
#about .text-content,
#about .resume-perfil,
#about .img-about,
#about .text-content p,
#skills,
#skills .header,
#skills .text-content,
#skills .content,
#skills .tools-skills,
#skills .tools-skills li,
#skills .tools-skills li p,
#experience,
#experience .header,
#experience .content,
#experience .content-link-cv,
#projects,
#projects .header,
#projects .content,
#projects .cards,
#projects .card,
#projects .card .techs`);
