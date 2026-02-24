// ===============================
// 🔮 診断ページ用処理 (js/uranai.js)
// ===============================

// HTMLの「診断する」ボタンから直接呼び出される関数
function startUranai() {
  console.log("診断を開始します...");

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

  // 2. 軸計算（4段階評価に合わせて調整）
  // 各軸、3問の合計（最大9点）を3で割り、0〜3の範囲に変換します
  let user = {
    E: (answers.q1 + answers.q11 + answers.q12) / 3, // 外向・交流・決断
    A: (answers.q2 + answers.q3 + answers.q10) / 3,  // ひらめき・行動・挑戦
    S: (answers.q4 + answers.q5 + answers.q8) / 3,   // 違和感・こだわり・レア感
    C: (answers.q6 + answers.q7 + answers.q9) / 3    // 集中・空気・信念
  };

  // 3. データをブラウザに保存
  localStorage.setItem("uranaiScore", JSON.stringify(user));
  localStorage.setItem("uranaiAnswers", JSON.stringify(answers));

  // 4. 結果ページへ移動
  window.location.href = "uranai_kekka.html";
}