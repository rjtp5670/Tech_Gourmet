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
});

// Make home slowly fade to transparent as the window scrolls down.home__contact. 

const home = document.querySelector(".home__container");
const homeheight = home.getBoundingClientRect().height;

document.addEventListener("scroll", () => { 
console.log("Home Height: " + homeheight);
home.style.opacity = 1 - window.scrollY/homeheight;
});

//show "Arrow Up" button when scrolling down

const arrowUp = document.querySelector(".arrow-up");

document.addEventListener("scroll", () => {
  if (window.scrollY > homeheight/2){
  arrowUp.classList.add("visible");
  }else{
    arrowUp.classList.remove("visible");
  }
})

//Handle click on the "arrow-up" button

arrowUp.addEventListener("click", ()=>{
  scrollIntoView("#home");
})

// Projects
const workBtnContainer = document.querySelector(".work__categories");
const projectContainer = document.querySelector(".work__projects");
const projects = document.querySelectorAll(".project");

workBtnContainer.addEventListener("click", (e) => {

const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter; // 이벤트 발생 (e) 타겟 (e.target)의 데이터 필터(e.target.dataset.filter)에서 Null 값이 나오면 부모노드 (ParentNode)의 데이터 셋 값을 집어넣음.

if (filter == null)
{
  return; 
}
/* console.log(filter); */

projectContainer.classList.add('anim-out');

setTimeout(()=> { // 해당 코드 실행후, 300 ms를 기다린후 다음 코드를 실행한다. 아래 projects.forEach()가 setTimeout 함수 외부에서 선언 될 경우, 코드가 "동기적" 으로 업데이트 된다. 

  projects.forEach((project) => { // Projects안에서 project라는 변수 (let으로 내부에서 "자동으로" 선언됨)에 projects 배열안의 배열값을 project에 각각 저장. 
  console.log("project.dataset.type: "+ project.dataset.type);
  if(filter === "*" || filter === project.dataset.type)
  {
    /* console.log("filter:"+ filter); */
    project.classList.remove("invisible");
  }else {
    project.classList.add("invisible");
  }
  });  

  projectContainer.classList.remove('anim-out');

}


, 300);

// foreach와 동일한 문법. 
/* 
console.log("-----------");

for(let project of projects) {
  console.log(project);
}

console.log("-----------");

let project;
for(let i = 0; i > projects.length; i++){
  project = projects[i];
  console.log(project);
} */

}

);

function scrollIntoView(selector) {
  const scroll = document.querySelector(selector);
  scroll.scrollIntoView({behavior: 'smooth'});
}