// 기존 카드.
let imgs = [
  "A-갑옷씨.webp",
  "SS-우사기.png",
  "SS-하치와레.png",
  "SS-치이카와.webp",
];
// 중복 카드.
let imgsClone = imgs;
// 뒤집은 2개의 카드(비교).
let cards = [];
// 카드 갯수.
let cardCount = 8;
// 뒤집은 카드 갯수.
let clearCardCount = 0;
// 카드 배열 + 중복 카드 배열.
let cardImgs = imgs.concat(imgsClone);
// 비교 후 다르면 다시 뒤집을(style적용)카드.
let firstCard = null;
let secondCard = null;
// 게임 시작 여부
let startGame = false;
// 게임 총 시간
let seconds = 20;
// 게임 시작 시간
let startTime = null;
// 플레이 시간
let currentTime = seconds;
// 게임 포인트(뽑기)
let gamePoint = 0;

// 카트 클릭시 뒤집기 이벤트.
const clickCard = (e) => {
  // 게임 시작이 되면.
  if (startGame) {
    let target = e.target;
    // 카드 2개 뒤집기 전.
    if (cards.length < 2) {
      // 클릭한(fron)요소의 부모(li)를 뒤집는다.
      target.parentElement.style.transform = "rotateY(180deg)";
      // 클릭한 요소(front)의 다음 요소(back)의 자식 요소(img) : 클릭한 뒷면 이미지.
      let clickCardSrc = target.nextElementSibling.firstElementChild.src;
      let clickCardName = clickCardSrc.replace(/^.*\//, "");

      // 뒤집은 카드 비교할 배열.
      cards.push(clickCardName);

      if (!firstCard) {
        firstCard = target;
      } else {
        secondCard = target;
        cardMatch();
      }
    }
  }

  // 카드 다 뒤집으면 게임 완.
  if(clearCardCount === 4) {
    finnishGame();
  }
};

// 게임 다시 시작
const replay = () => {
  location.reload(true);
}

// 카드 비교.
const cardMatch = () => {
  // 2개의 카드를 뒤집고 카드가 같다면.
  if (cards.length === 2 && cards[0] === cards[1]) {
    firstCard = null;
    secondCard = null;
    cards = [];
    clearCardCount += 1;
  }

  // 2개의 카드를 뒤집고 카드가 다르다면.
  if (cards.length === 2 && cards[0] !== cards[1]) {
    setTimeout(() => {
      firstCard.parentElement.style.transform = "rotateY(0deg)";
      secondCard.parentElement.style.transform = "rotateY(0deg)";

      firstCard = null;
      secondCard = null;
      cards = [];
    }, 1000);
  }
};

// 카드 배열 섞기.
const shuffleCards = () => {
  for (let i = cardImgs.length - 1; i > 0; i--) {
    // 0 ~ i + 1 까지의 랜덤한 숫자를 생성.
    const randomIndex = Math.floor(Math.random() * (i + 1));
    // 카드 순서 바꾸기.
    [cardImgs[i], cardImgs[randomIndex]] = [cardImgs[randomIndex], cardImgs[i]];
  }
};

// 카드 만들기.
const makeCards = () => {
  for (let i = 0; i < cardCount; i++) {
    const card = document.createElement("li");
    const front = document.createElement("div");
    const frontImg = document.createElement("img");
    const backImg = document.createElement("img");
    const back = document.createElement("div");

    card.setAttribute("class", "card");

    front.setAttribute("class", "front");
    frontImg.setAttribute("src", "./imgs/카드앞면.png");
    front.setAttribute("onclick", "clickCard(event)");
    front.appendChild(frontImg);

    back.setAttribute("class", "back");
    backImg.setAttribute("src", "./imgs/" + cardImgs[i]);
    back.appendChild(backImg);

    card.append(front, back);
    document.querySelector(".card-list").appendChild(card);
  }
};

// 게임 알림
const startAlert = () => {
  const $alert = document.querySelector(".game-alert");

  // 게임 시작 전
  if(!startGame) {
    let text = document.createElement("p");
    text.innerText = "시작!";
  
    $alert.classList.add("pointer");
    $alert.appendChild(text);
    $alert.setAttribute("onclick", "startGameclick(event)");
    $alert.setAttribute("onkeydown", "startGameEnter(event)");
  }
};

// 게임 종료 알림.
const finnishGame = () => {
  const $alert = document.querySelector(".game-alert");
  startGame = false;

  let text = document.createElement('p');
  let point = document.createElement('p');
  let replay = document.createElement('div');
  let playTime = Math.round(seconds - currentTime);
  gamePoint = Math.round(currentTime * 10) + (clearCardCount * 5);
  text.innerText = `${playTime}초 걸리셨습니다.`;
  point.innerText = `${gamePoint}p 획득!`;
  replay.innerText = "한번 더";
  
  replay.setAttribute('onclick', 'replay()');
  $alert.classList.remove('pointer');
  $alert.append(text, point, replay);
  $alert.setAttribute('onclick', '');
  $alert.setAttribute('onkeydown', '');
  $alert.style.transform = 'translate(-50%, 0)';

  // 게임 점수 스토리지에 저장.
  let localPoint = JSON.parse(window.localStorage.getItem('gamePoint'));
  localPoint += gamePoint;
  window.localStorage.setItem('gamePoint', localPoint);
}

// 게임 시작 (클릭)
const startGameclick = (e) => {
  e.target.style.transform = 'translate(-50%, 150%)';
  setTimeout(() => {
    const $alert = document.querySelector(".game-alert");
    $alert.removeChild($alert.firstChild);
    //e.target.style.display = 'none';
  }, 1000);
  startGame = true;
  requestAnimationFrame(timerHandler);
};

// 게임 시작 (엔터)
const startGameEnter = (e) => {
  if (e.key === "Enter") {
    startGameclick(e);
  }
};

// 타이머
const timerHandler = (timestamp) => {
  const $timeBar = document.querySelector(".cardGame #timer .time-bar");
  // timestamp : requestAnimationFrame 이 실행된 시간을 의미.
  if (!startTime) startTime = timestamp;
  // elapsedTime : 실행된 시간 - 시작 시간 ( 경과시간 )
  const elapsedTime = (timestamp - startTime) / 1000;
  // Math.max : 두 인자중 큰 값을 리턴.
  // 20초에서 -경과시간.
  currentTime = Math.max(seconds - elapsedTime, 0);
  // 정확한 경과시간을 구하고 난 뒤 넓이 구하기.
  let width = (currentTime / seconds) * 100;
  $timeBar.style.width = `${width}%`;

  if (currentTime > 0 && startGame) {
    // requestAnimationFrame는 한번만 실행 되서 재귀함수 써서 반복.
    requestAnimationFrame(timerHandler);
  }

  // 타임 오버 시 게임 종료.
  if(currentTime === 0) {
    finnishGame();
  }
};

shuffleCards();
makeCards();
startAlert();
