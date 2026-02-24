// ===============================
// 🔮 診断ページ用処理 (js/uranai.js)
// ===============================

// HTMLの「診断する」ボタンから直接呼び出される関数
function startUranai() {
  console.log("診断を開始します..."); // 動作確認用

  let answers = {};

  // 1. 全12問の回答を取得
  for (let i = 1; i <= 12; i++) {
    let selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      alert("すべての質問に答えてください！");
      return;
    }
    answers["q" + i] = parseInt(selected.value);
  }

  // 2. 軸計算
  let user = {
    E: answers.q1 + answers.q3 + answers.q11,
    A: answers.q2 + answers.q9 + answers.q12,
    S: answers.q4 + answers.q6 + answers.q7,
    C: answers.q5 + answers.q8 + answers.q10
  };

  // 3. データをブラウザに保存
  localStorage.setItem("uranaiScore", JSON.stringify(user));
  localStorage.setItem("uranaiAnswers", JSON.stringify(answers));

  // 4. 結果ページへ移動
  window.location.href = "uranai_kekka.html";
}