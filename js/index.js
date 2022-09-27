'use strict';

let developmentIsVisible = false;
let experienseTimelineIsVisible = false;
let backToTopButton = document.getElementById('backToTopButton');
const btn_mobile = document.getElementById('btn-mobile');

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('scroll', onScroll);
  btn_mobile.addEventListener('click', toggleMenu);
  btn_mobile.addEventListener('touchstart', toggleMenu);
});

function toggleMenu(event) {
  if (event.type === 'touchstart') {
    event.preventDefault();
  }
  const nav = document.getElementById('nav');
  nav.classList.toggle('active');
  // caso esteja ativo
  if (nav.classList.contains('active')) {
    event.currentTarget.setAttribute('aria-expanded', true);
    event.currentTarget.setAttribute('aria-label', 'Fechar Menu');
  } else {
    event.currentTarget.setAttribute('aria-expanded', false);
    event.currentTarget.setAttribute('aria-label', 'Abrir Menu');
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
  if (scrollY > 500) {
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
