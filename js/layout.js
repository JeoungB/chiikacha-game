window.addEventListener("load", () => {
  // getElementsByTagName : 모든 엘리먼트 가져오기.
  const allElements = document.getElementsByTagName("*");
  Array.prototype.forEach.call(allElements, (el) => {
    // include-html 이름의 속성값을 찾는다.
    let includePath = el.dataset.includePath;
    if (includePath) {
      fetch(includePath)
        .then((response) => {
          if (response.ok) {
            return response.text();
          } else {
            return null;
          }
        })
        .then((data) => {
          if (data) {
            // outerHTML : 전체적인 HTML코드를 문자열로 리턴.
            el.outerHTML = data;
          }
        });
    }
  });
});
