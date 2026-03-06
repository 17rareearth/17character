// ===============================
// 🔮 診断ページ用処理 (js/uranai.js) - 3問×4要素・均等配分版
// ===============================

function startUranai() {
  console.log("診断を開始します...");

  let answers = {};
  const form = document.getElementById("uranaiForm");
  const formData = new FormData(form);

  // 1. 全12問の回答を取得し、未回答がないかチェック
  for (let i = 1; i <= 12; i++) {
    let val = formData.get("q" + i);
    if (val === null) {
      alert("すべての質問に答えてください！");
      return;
    }
    answers["q" + i] = parseInt(val);
  }

  // 2. 新しい質問構成に基づいた集計（各3問ずつの合計値）
  // 配点が -2 〜 2 なので、各項目の合計は -6 〜 6 の範囲になります。
  let user = {
    // E：活力・挑戦・行動（Q1, Q2, Q3）
    E: answers.q1 + answers.q2 + answers.q3,

    // A：承認・違和感・空気（Q4, Q5, Q6）
    A: answers.q4 + answers.q5 + answers.q6,

    // S：没頭・美学・信念（Q7, Q8, Q9）
    S: answers.q7 + answers.q8 + answers.q9,

    // C：ひらめき・即断・直感重視（Q10, Q11, Q12）
    C: answers.q10 + answers.q11 + answers.q12
  };

  // 3. データをlocalStorageに保存（本番サーバー用）
  try {
    localStorage.setItem("uranaiScore", JSON.stringify(user));
    localStorage.setItem("uranaiAnswers", JSON.stringify(answers));
  } catch(e) {
    // localStorageが使えない環境（file://など）では無視して続行
    console.log("localStorage使用不可。URLパラメータで渡します。");
  }

  // 4. URLパラメータにもスコアを埋め込んで結果ページへ移動。
  //    → ローカルファイル(file://)でも確実に動作する
  const params = new URLSearchParams({
    E: user.E,
    A: user.A,
    S: user.S,
    C: user.C
  });
  window.location.href = "uranai_kekka.html?" + params.toString();
}
