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

  // 2. 軸計算（過集中を正しく判定し、根性キャラへの誤解を防ぐ）
  let user = {
    // E軸（外向）：Q1(承認欲求) + Q11(対人エネルギー)
    E: (answers.q1 + answers.q11) / 2,

    // A軸（行動・爆発力）：Q2(ひらめき) + Q3(即行動) + Q6(過集中) + Q10(挑戦) + Q12(即決)
    // ※過集中(Q6)を「忍耐」ではなく「行動の勢い」としてカウントします
    A: (answers.q2 + answers.q3 + answers.q6 + answers.q10 + answers.q12) / 5,

    // S軸（こだわり）：Q5(ハマり) + Q8(独自性)
    S: (answers.q5 + answers.q8) / 2,

    // C軸（分析・周囲・持続）：Q4(違和感) + Q7(空気読解) + Q9(信念)
    // ※Q6(集中)をここから外すことで、サマリウム(根性派)への判定を厳しくします
    C: (answers.q4 + answers.q7 + answers.q9) / 3
  };

  // 3. データをブラウザに保存
  localStorage.setItem("uranaiScore", JSON.stringify(user));
  localStorage.setItem("uranaiAnswers", JSON.stringify(answers));

  // 4. 結果ページへ移動
  window.location.href = "uranai_kekka.html";
}