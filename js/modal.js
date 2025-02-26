// 모달 닫기.
const closeMoalHandlerClick = () => {
  const $modalMenu = document.querySelector(".menu-container .menu");
  const $modal = document.querySelector(".menu-container");

  $modalMenu.style.transform = "translate(0, -450px)";
  let time = setTimeout(() => {
    $modal.style.display = "none";
  }, 400);
};

const closeMoalHandlerEnter = (e) => {
  if(e.key === 'Enter') {
    closeMoalHandlerClick();
  }
}
