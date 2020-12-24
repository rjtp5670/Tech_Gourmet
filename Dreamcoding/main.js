"use strict";

// Make navbar transparent when it is on the top.
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height; // https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
document.addEventListener("scroll", () => {
  /* https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY */
  console.log(window.scrollY);
  console.log(`navbarHeight: ${navbarHeight}`);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
    console.log("true");
  } else {
    navbar.classList.remove("navbar--dark");
    console.log("Not true");
  }
});


// Handle scrolling when tapping on the navbar menu

const navbaMenu = document.querySelector(".navbar__menu");
navbaMenu.addEventListener("click", (event)=> {
  console.log(event.target.dataset);
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return; // 링크가 존재하지 않을경우, 곧바로 리턴후 종료되도록함. 
  }
  console.log(link); // 링크가 존재 할경우 링크 출력. 
  scrollIntoView(link);
  
});

// Handle click on "contact me"

const homeContactBtn = document.querySelector(".home__contact");

homeContactBtn.addEventListener("click", (event)=> {

  const target = event.target;
  const link = target.dataset.link;
  console.log("Link:" + link); 
  scrollIntoView(link);


/*   const scroll2 = document.querySelector(link);
  
  console.log(scroll2); 
  
  scroll2.scrollIntoView({behavior: 'smooth'}); */

});

function scrollIntoView(selector) {
  const scroll = document.querySelector(selector);
  scroll.scrollIntoView({behavior: 'smooth'});
}