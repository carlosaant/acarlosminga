// $(document).ready(function () {
//   let $developmentWrapper = $('#skills');
//   let developmentIsVisible = false;

//   $(window).scroll(function () {
//     let bottom_of_window = $(window).scrollTop() + $(window).height();

//     /*###### SKILLS SECTION ######*/

//     let middle_of_developmentWrapper =
//       $developmentWrapper.offset().top + $developmentWrapper.outerHeight() / 2;

//     if (
//       bottom_of_window > middle_of_developmentWrapper &&
//       developmentIsVisible == false
//     ) {
//       $('.skills-bar-container li').each(function () {
//         let $barContainer = $(this).find('.bar-container');
//         let dataPercent = parseInt($barContainer.data('percent'));
//         let elem = $(this).find('.progressbar');
//         let percent = $(this).find('.percent');
//         let width = 0;

//         let id = setInterval(frame, 20);

//         function frame() {
//           if (width >= dataPercent) {
//             clearInterval(id);
//           } else {
//             width++;
//             elem.css('width', width + '%');
//             percent.html(width + ' %');
//           }
//         }
//       });
//       developmentIsVisible = true;
//     }
//   }); // -- End window scroll --
// });
'use strict';

let developmentIsVisible = false;

document.addEventListener('DOMContentLoaded', () => {
  document.addEventListener('scroll', onScroll);
});

function onScroll() {
  activateSectionAnimationBars(skills);
}

function activateSectionAnimationBars(section) {
  const targetLine = scrollY + innerHeight / 2;

  const sectionTop = section.offsetTop;
  const sectionHeight = section.offsetHeight;
  const sectionEndsAt = sectionTop + sectionHeight;

  const sectionTopReachOrPassedTargetLine = targetLine >= sectionTop;
  const sectionEndPassedTargetLine = sectionEndsAt <= targetLine;
  if (!developmentIsVisible)
    if (sectionTopReachOrPassedTargetLine && !sectionEndPassedTargetLine) {
      animationBarsSkill();
    }
}

function animationBarsSkill() {
  console.log(document.querySelector('.skills-bar-container'));
}
