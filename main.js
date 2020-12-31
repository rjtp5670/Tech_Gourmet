"use strict";

// Make navbar transparent when it is on the top.
const navbar = document.querySelector("#navbar");
const navbarHeight = navbar.getBoundingClientRect().height; // https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/Determining_the_dimensions_of_elements
document.addEventListener("scroll", () => {
  /* https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollY */
/*   console.log(window.scrollY);
  console.log(`navbarHeight: ${navbarHeight}`); */
  if (window.scrollY > navbarHeight) {
    navbar.classList.add("navbar--dark");
    /* console.log("true"); */
  } else {
    navbar.classList.remove("navbar--dark");
    /* console.log("Not true"); */
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector(".navbar__menu");
navbarMenu.addEventListener("click", (event)=> {
  console.log(event.target.dataset);
  const target = event.target;
  const link = target.dataset.link;

  if (link == null) {
    return; // 링크가 존재하지 않을경우, 곧바로 리턴후 종료되도록함. 
  }

  navbarMenu.classList.remove('open');
  scrollIntoView(link); 
  selectNavItem(target);
});

// Navbar toggle button for small screen

const navbarToggleBtn = document.querySelector(".navbar__toggle-btn");
navbarToggleBtn.addEventListener("click", () => {

  navbarMenu.classList.toggle('open');
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
// console.log("Home Height: " + homeheight);
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

//Remove selection from the previous item and select the next one. 

const active = document.querySelector(".category__btn.selected");

active.classList.remove("selected");

const target = 
e.target.nodeName === 'BUTTON' ? e.target : e.target.parentNode; // 'Condition' ? 'True' : 'False';

target.classList.add("selected");

// console.log("target :" + e.target.parentNode);

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
  active.classList.remove("active`");
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

/* 
메뉴 아이템 활성화 시키지. 

1. 모든 섹션 요소들과 메뉴아이템들을 가져온다.
2. IntersectionObserver 를 이용하여 모든 섹션들을 관찰한다. 
3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
 */

const sectionIds = [
  // 각각 문자열을 가지고있는 배열 아이템을 가지고, 각각의 ID를 새로운 Section DOM 요소로 변환하는 새로운 배열을 만들면 된다. 배열을 하나하나 돌면서 새로운것으로 만들수있는 API는 map 을 사용
  '#home', 
  '#about', 
  '#skills', 
  '#work', 
  '#testimonials', 
  '#contact',
]; 


// map 메소드는, forEach 와 유사하지만, 객체(Key,Value)든 무엇이든 배열을 return 시킨다. 

const sections = sectionIds.map(id => document.querySelector(id)); //sections라는 배열에 map함수를 이용하여, 각 아이템을 DOM트리에서 쿼리셀렉터로 찾아 리턴시킨다.
const navItems = sectionIds.map(id => 
  document.querySelector(`[data-link="${id}"]`)
);


let selectedNavIndex = 0;
let selectedNavItem = navItems[0];

function selectNavItem(selected){
        
  selectedNavItem.classList.remove("active");
  selectedNavItem = selected;
  selectedNavItem.classList.add("active");
}

function scrollIntoView(selector) {
  const scroll = document.querySelector(selector);
  scroll.scrollIntoView({behavior: 'smooth', block: 'start'});
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach(entry => {

    /* 빠져나갈때 */
    if (!entry.isIntersecting && entry.intersectionRatio > 0){
      
      //Entry 가 빠져나갈때, Entry의 타겟은 빠져나가는 섹션을 가리킨다. indexOf 메소드로, searchIds에서 인덱스 (주소값)를 추출 하여, 섹션 아이디값을 스크롤 방향 (Scroo Up/Down) 따라 네비게이션에 Border를 정할 아이템을 얻는다.
      const index = sectionIds.indexOf(`#${entry.target.id}`); 
      // console.log("Entry Out:"+ index + ":" + entry.target.id ); // * 주의: entry.target만 사용할 경우, 전체 오브젝트가 나온다. 즉 target.id 라고 명확하게 명시를 해야 내가 원하는 값을 콘솔 창에서 출력할수 있다.
      // In scrolling down and the entry goes up alowing with the scrolling down. 
      if (entry.boundingClientRect.y < 0){
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });

};

const observer = new IntersectionObserver(observerCallback, observerOptions);

sections.forEach(section => observer.observe(section)); // map 메소드로 받아온 인덱스의 배열 아이템을, 루프하면서 관찰함.

window.addEventListener("wheel", () => {
    if (window.scrollY === 0) { //처음에는 scrollY값이 0임
      selectedNavIndex = 0;
    } else if ( Math.round(window.scrollY + window.innerHeight) >= document.body.clientHeight) { // 맨 마지막은 사용자의 윈도우 y값 (clientHeight) 과 스크롤했을때 의 최 상단 y값 및 해당 윈도우의 Height 값을 더한 값이 같으면. 맨마지막의 Nav 메뉴 결정.
      console.log("window.scrollY + window.innerHeight:" + window.scrollY + window.innerHeight + " ?= document.body.clientHeight");
      /* selectNavItem(navItems[-1]); */
      selectedNavIndex = navItems.length - 1;
    } 
      selectNavItem(navItems[selectedNavIndex]);
    
  })