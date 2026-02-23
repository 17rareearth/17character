// ===============================
// 🔮 診断ページ用処理
// ===============================

document.addEventListener("DOMContentLoaded", function() {

  const form = document.getElementById("uranaiForm");

  if (!form) return;

  form.addEventListener("submit", function(e) {
    e.preventDefault(); // 再読み込み防止

    let answers = {};

    for (let i = 1; i <= 12; i++) {
      let selected = document.querySelector(`input[name="q${i}"]:checked`);
      if (!selected) {
        alert("すべての質問に答えてください！");
        return;
      }
      answers["q" + i] = parseInt(selected.value);
    }

    // ===== 軸計算 =====
    let user = {
      E: answers.q1 + answers.q3 + answers.q11,
      A: answers.q2 + answers.q9 + answers.q12,
      S: answers.q4 + answers.q6 + answers.q7,
      C: answers.q5 + answers.q8 + answers.q10
    };

    localStorage.setItem("uranaiScore", JSON.stringify(user));

    // 結果ページへ
    window.location.href = "uranai_kekka.html";
  });

});