// 「画像で保存」ボタンをクリックした時の処理
// 「画像で保存」ボタンをクリックした時の処理
document.getElementById('save-image').addEventListener('click', function() {
    // HTMLのIDに合わせて「resultArea」に変更しました
    const target = document.getElementById('resultArea'); 

    // もし結果が表示される前なら警告を出す
    if (!target || target.innerHTML === "") {
        alert("診断を完了させてから保存してください。");
        return;
    }

    // html2canvasを実行
    html2canvas(target, {
        backgroundColor: "#ffffff", // 背景を白にする
        scale: 2, // 高画質化
        useCORS: true // 外部画像（キャラ絵など）がある場合の対策
    }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = '17Elements_鑑定書.png';
        link.click();
    });
});

// 「結果をコピー」ボタンをクリックした時の処理
document.getElementById('copy-result').addEventListener('click', function() {
    // 実際にはここをJavaScriptで動的に「ネオジム」などに書き換える処理が必要ですが
    // まずはベースの文章を設定します
    const text = "私の元素は【キャラクター名】でした！\n性格タイプ：BRIGHT\n#元素診断 #レアアース性格診断\nhttps://17rareearth.github.io/17character/index_uranai.html";
    
    navigator.clipboard.writeText(text).then(() => {
        alert("結果をコピーしました！SNSに貼り付けてね。");
    });
});

/* 画像化する範囲のスタイル */
#resultArea {
    padding: 30px; /* 保存した時に余白があるときれいに見えます */
    background-color: #ffffff; 
    border-radius: 15px;
    border: 1px solid #eeeeee; /* 薄い枠線 */
    margin-bottom: 20px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05); /* 画面上での立体感 */
}