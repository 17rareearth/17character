// 「画像で保存」ボタンの処理
document.getElementById('save-image').addEventListener('click', function() {
    // 1. 鑑定書全体が入っている枠を指定
    const target = document.getElementById('captureRegion'); 

    if (!target || document.getElementById('resultArea').innerHTML.trim() === "") {
        alert("診断を完了させてから保存してください。");
        return;
    }

    // 2. SNS用に「いらない部分」を徹底的に一時非表示にする
    // 説明文、相性エリア、下部のボタン類を取得
    const longText = target.querySelector('.longText');
    const compatibility = target.querySelector('.compatibilityArea');
    const score = target.querySelector('.scoreDisplay'); // スコアも消してスッキリさせるなら

    // 保存の瞬間だけ消す
    if (longText) longText.style.display = 'none';
    if (compatibility) compatibility.style.display = 'none';
    if (score) score.style.display = 'none';

    // 3. 画像化を実行
    html2canvas(target, {
        backgroundColor: "#cfe1fd", // 背景の水色を活かす
        scale: 2,                   // 画質を上げて文字を読みやすくする
        useCORS: true               // イラストが表示されない問題を防止
    }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = '17Elements_鑑定書.png';
        link.click();

        // 4. 保存が終わったらすぐに画面の表示を元に戻す
        if (longText) longText.style.display = 'block';
        if (compatibility) compatibility.style.display = 'block';
        if (score) score.style.display = 'block';
        
    }).catch(err => {
        console.error("保存失敗:", err);
        alert("画像の保存に失敗しました。");
        // エラー時も表示を戻す
        if (longText) longText.style.display = 'block';
        if (compatibility) compatibility.style.display = 'block';
    });
});

// 「結果をコピー」ボタンの処理（アラートの出し忘れを修正済）
document.getElementById('copy-result').addEventListener('click', function() {
    const h2Element = document.querySelector('#resultArea h2');
    const characterName = h2Element ? h2Element.innerText : "レアアース";
    const text = `私の元素は【${characterName}】でした！\n#元素診断 #レアアース性格診断\nhttps://17rareearth.github.io/17character/index_uranai.html`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert(`【${characterName}】の結果をコピーしました！SNSに貼り付けてね。`);
        }).catch(() => {
            alert("コピーに失敗しました。");
        });
    } else {
        alert("お使いのブラウザではコピー機能がサポートされていません。");
    }
});