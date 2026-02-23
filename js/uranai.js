document.addEventListener("DOMContentLoaded", function() {

  const form = document.getElementById("uranaiForm");

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // 再読み込み防止

    let score = 0;

    for (let i = 1; i <= 12; i++) {
      let answer = document.querySelector(`input[name="q${i}"]:checked`);
      if (!answer) {
        alert("すべての質問に答えてください！");
        return;
      }
      score += parseInt(answer.value);
    }

    localStorage.setItem("totalScore", score);

    window.location.href = "uranai_kekka.html";
  });

});