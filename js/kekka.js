// ===============================
// 🔮 レアアース診断結果ロジック
// ===============================

document.addEventListener("DOMContentLoaded", function(){

let user = JSON.parse(localStorage.getItem("uranaiScore"));

if (!user) {
  document.getElementById("mainName").textContent = "スコアが見つかりません";
  return;
}

// ===== 17元素データ =====
let elements = [

{ name:"スカンジウム", E:1, A:1, S:2, C:3, text:"信頼で強くする人。土台を支える安定型。" },
{ name:"イットリウム", E:1, A:1, S:3, C:2, text:"場を整えるつなぎ役。縁の下の力持ち。" },
{ name:"ランタン", E:3, A:2, S:1, C:1, text:"場を明るく回すまとめ役タイプ。" },
{ name:"セリウム", E:2, A:3, S:1, C:2, text:"効率重視の現場監督タイプ。" },
{ name:"プラセオジム", E:1, A:1, S:2, C:3, text:"感性派の静かな職人。" },
{ name:"プロメチウム", E:0, A:1, S:3, C:3, text:"希少な理論派。深く考える研究者型。" },
{ name:"ネオジム", E:3, A:3, S:1, C:1, text:"行動力と推進力を持つエース型。" },
{ name:"サマリウム", E:1, A:2, S:2, C:3, text:"高温でも崩れない耐久型。" },
{ name:"ユウロピウム", E:3, A:2, S:1, C:1, text:"光って輝くステージ型。" },
{ name:"ガドリニウム", E:1, A:1, S:3, C:2, text:"静かに人を助けるヒーロー型。" },
{ name:"テルビウム", E:0, A:2, S:2, C:3, text:"完璧を追い求める戦略家。" },
{ name:"ジスプロシウム", E:0, A:2, S:3, C:3, text:"壊れない守護者タイプ。" },
{ name:"ホルミウム", E:0, A:2, S:3, C:2, text:"一点集中のスペシャリスト。" },
{ name:"エルビウム", E:0, A:1, S:2, C:3, text:"静かな参謀。情報制御型。" },
{ name:"ツリウム", E:0, A:1, S:3, C:2, text:"控えめな実力者タイプ。" },
{ name:"イッテルビウム", E:0, A:1, S:3, C:2, text:"変化を察知する観測者。" },
{ name:"ルテチウム", E:1, A:3, S:2, C:3, text:"最終判断を下すまとめ役。" }

];

let maxDistance = Math.sqrt(9 + 9 + 13.5 + 9);

elements.forEach(el => {

  let distance = Math.sqrt(
    (user.E - el.E) ** 2 +
    (user.A - el.A) ** 2 +
    ((user.S - el.S) ** 2) * 1.5 +
    (user.C - el.C) ** 2
  );

  let score = (1 - distance / maxDistance) * 100;
  el.score = Math.min(Math.round(score), 99);
});

elements.sort((a,b)=> b.score - a.score);

let first = elements[0];
let second = elements[1];
let third = elements[2];

document.getElementById("mainName").textContent = "🧲 " + first.name;
document.getElementById("mainPercent").textContent = first.score + "%";
document.getElementById("mainText").textContent = first.text;
document.getElementById("subType").textContent =
"🧠 " + second.name + " " + second.score + "% の資質も強く持っています。";
document.getElementById("hiddenType").textContent =
"🌙 Hidden Rare：" + third.name + " " + third.score + "%";

});