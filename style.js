//..STEP-1........WORKING WITH MODAL WINDOW.......................

const btnShowModal=document.querySelectorAll('.btn--show-modal');
const btnCloseModal=document.querySelector('.btn--close-modal');
const modal=document.querySelector('.modal');
const overlay=document.querySelector('.overlay');

btnShowModal.forEach(x=>x.addEventListener('click',openModal))
btnCloseModal.addEventListener('click',closeModal);
overlay.addEventListener('click',closeModal)

function openModal(){
    modal.classList.remove("hidden");
    overlay.classList.remove("hidden");
}

function closeModal(){
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
}

document.addEventListener('keydown',function(e){
if(e.key==='Escape'&& !modal.classList.contains('hidden')){
    closeModal(); 
    console.log(e)
}
});

//.............STEP -2 -WORKING WITH LEARN MORE BUTTON.........................
const btnScrollTo=document.querySelector('.btn--scroll-to');
const section1=document.querySelector('#section-1');
btnScrollTo.addEventListener('click',function(e){
    // const s1Coords=section1.getBoundingClientRect();
    // console.log(s1Coords);
    // console.log('CURRENT SCROLL X/Y',window.pageXOffset,window.pageYOffset)
    // console.log('viewport height x/y',document.documentElement.clientWidth,document.documentElement.clientHeight);;
    section1.scrollIntoView({behavior:'smooth'})
   
});


//.......STEP-3 --CLICKING NAV MENU AND SCROLLING TO THEIR RESPECTIVE POSITION.......................
const section2=document.querySelector('#section-2')
const section3=document.querySelector('#section-3');


// const navLink=document.querySelectorAll('.nav__link');
// navLink.forEach(element=>element.addEventListener('click',function(e){
// e.preventDefault();
// const id=this.getAttribute('href');
// console.log(id);
// document.querySelector(id).scrollIntoView({behavior:'smooth'});
// }))


// This above method can create problem when we will have more list (eg- 1000 or more than that) - eg here we have only three list , so we will now select the 
// parent element and then will apply the method 

const list=document.querySelector('.list');
list.addEventListener('click',function(e){
    e.preventDefault();
//    console.log(e.target.getAttribute('href'));
  document.querySelector(e.target.getAttribute('href')).scrollIntoView({behavior:'smooth'})
});


//.......STEP-4......BUILDING A TABBED COMPONENT..............................

const btns=document.querySelectorAll('.operations__tab');
const container=document.querySelector('.operations__tab-container');
const tabsContent=document.querySelectorAll('.operations__content');


container.addEventListener('click',function(e){
    e.preventDefault();
    const clicked=e.target.closest('.operations__tab');;
    if(!clicked)return;

    //Adding and removing operations__tab--active class
    btns.forEach(e=>e.classList.remove('operations__tab--active'));
    clicked.classList.add('operations__tab--active');

//Adding and removing operations__content--active class
tabsContent.forEach(e=>e.classList.remove('operations__content--active'));

document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')
    
});

//......STEP 5--NAV MENU HOVERING AND FADE ANIMATION........................

const nav=document.querySelector('.navBar');

// nav.addEventListener('mouseover',function(e){
//     if(e.target.classList.contains('nav__link')){
//         const link=e.target;
//        const siblings=document.querySelectorAll('.nav__link');
//        const logo=document.querySelector('.logo');
//        siblings.forEach(e=>{if(e!==link)e.style.opacity=0.5});
//        logo.style.opacity='0.5';
//     }

// })

// nav.addEventListener('mouseout',function(e){
//     if(e.target.classList.contains('nav__link')){
//         const link=e.target;
//        const siblings=document.querySelectorAll('.nav__link');
//        const logo=document.querySelector('.logo');
//        siblings.forEach(e=>{if(e!==link)e.style.opacity=1});
//        logo.style.opacity='1';
//     }

// })

const handleHover=function(e){
    if(e.target.classList.contains('nav__link')){
        const link=e.target;
       const siblings=document.querySelectorAll('.nav__link');
       const logo=document.querySelector('.logo');
       siblings.forEach(e=>{if(e!==link)e.style.opacity=this});
       logo.style.opacity=this;
    }
};

nav.addEventListener('mouseover',handleHover.bind(0.5));
nav.addEventListener('mouseout',handleHover.bind(1));



//...........STEP - 6 --ADDING STICKY NAVBAR ........................................
const x=section1.getBoundingClientRect();

window.addEventListener('scroll',function(){
if(this.window.scrollY>x.top){
    nav.classList.add('sticky')
}
else{
    nav.classList.remove('sticky');
}
})

//.......STEP -7  ADDING SECTION HIDDEN PROPERTY TO SECTIONS.......................
//here this method is not working properly though , need to review it later
const allSections=document.querySelectorAll('.section');

const revealSection=function(enteries,observer){
const [entry]=enteries;
// console.log(entry);
if(!entry.isIntersecting) return ;
entry.target.classList.remove('section--hidden');
observer.unobserve(entry.target);
}

const sectionObserver=new IntersectionObserver(revealSection,
  {
  root:null,
threshold:0.15,
});

allSections.forEach(function(section){
  sectionObserver.observe(section);
//   section.classList.add('section--hidden');
})

//.............STEP -8 ...WORKING WITH LAZY IMAGES ................
const imgTarget=document.querySelectorAll('img[data-src]');
const loadImg=function(enteries,observer){
const [entry]=enteries;
if(!entry.isIntersecting)return;
//Replace srC with data src
entry.target.src=entry.target.dataset.src;
entry.target.addEventListener('load',function(){
  entry.target.classList.remove('lazy-img');
})
observer.unobserve(entry.target);
}

const imgObserver=new IntersectionObserver(loadImg,{root:null,threshold:0});

imgTarget.forEach(img=>imgObserver.observe(img));


//.......STEP -9 WORKING WITH SLIDING COMPONENT......

const slides=document.querySelectorAll('.slide');
// slides.forEach((s,i)=>s.style.transform=`translateX(${100*i}%)`);

const slider=document.querySelector('.slider');

// slider.style.overflow='visible'


const btnLeft=document.querySelector('.slider__btn--left');
const btnRight=document.querySelector('.slider__btn--right')

let curSlide=0;
const maxSlide=slides.length;

const goToSlide=function(slide){
    slides.forEach((s,i)=>s.style.transform=`translateX(${100*(i-slide)}%)`)
}
goToSlide(0);

const slideRight=function(){
    if(curSlide===maxSlide-1){
        curSlide=0
    }
    else{curSlide++;}
  goToSlide(curSlide)
};

const slideLeft=function(){
   if(curSlide===0){
    curSlide=maxSlide-1
   }
   else{
    curSlide--;
   }
   goToSlide(curSlide)
};

btnRight.addEventListener('click',slideRight);
btnLeft.addEventListener('click',slideLeft);


