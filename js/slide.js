// 뽑기 포인트에 따라 가로폭이 늘어나는 함수. 
// point 부분 max-width 로 막아둠.
// const pointWidthHandle = () => {
//   const $point = document.getElementById("point");
//   const $pointText = document.querySelector("#point > p");
//   let pointCount = $pointText.textContent.length;
//   let pointBasicWidth = 33;

//   $point.style.setProperty("--pointWidth", `${pointBasicWidth * pointCount}px`);
// };

// loop slider
const $slider = document.querySelector(".slider")
const $slide = document.querySelectorAll(".slider li");
let currentIdx = 0; // 슬라이드 위치 파악.
let slideCount = $slide.length; // 슬라이드가 어디까지 움직였는지 파악.
let slideWidth = 200;
let slideMargin = 10;
let timer = undefined;

const makeClone = () => {
    // 슬라이드 뒤에 복사.
    for(let j = 0 ; j < 4 ; j++) {
        for(let i = 0 ; i < slideCount ; i++) {
            // a.cloneNode() : 요소 복사. ture 넣으면 해당 요소의 자식 요소모두 복사.
            let cloneSlide = $slide[i].cloneNode(true);
            cloneSlide.classList.add("clone");
            $slider.appendChild(cloneSlide);
        };
    }
    setInitialPos();
    $slider.classList.add("move");
};

// 초기 슬라이드 위치.
const setInitialPos = () => {
    let initialTranslateValue = -slideWidth * slideCount;
    $slider.style.transform = `translateX(${initialTranslateValue - 35}px)`;
};

// 슬라이드 움직임 범위.
const moveSlide = (num) => {
    $slider.style.left = -num * (slideWidth + slideMargin) + 'px';
    currentIdx = num;

    // 슬라이드가 마지막이면 다시 처음부터.
    if(currentIdx == slideCount) {
        setTimeout(() => {
            $slider.classList.remove("move");
            $slider.style.left = '0px';
            currentIdx = 0;
        }, 1000);

        setTimeout(() => {
            $slider.classList.add("move");
        }, 1100);
    };
};

// 자동 슬라이드 움직임.
const autoSlide = () => {
    if(timer === undefined) {
        timer = setInterval(() => {
            moveSlide(currentIdx + 1);
        }, 2000);
    };
};

makeClone();
autoSlide();