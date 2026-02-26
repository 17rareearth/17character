// 「画像で保存」ボタンの処理
document.getElementById('save-image').addEventListener('click', function() {
    // 1. 保存する範囲を「resultCard」に絞る（これで説明文をカットし、1画面サイズにします）
    const target = document.querySelector('.resultCard'); 

    // 2. 結果が表示されているかチェック
    const resultArea = document.getElementById('resultArea');
    if (!target || !resultArea || resultArea.innerHTML.trim() === "") {
        alert("診断を完了させてから保存してください。");
        return;
    }

    // 3. html2canvasを実行
    html2canvas(target, {
        backgroundColor: "#ffffff", // カード単体なので背景は白がおすすめ
        scale: 2,                   // 高画質化
        useCORS: true               // キャラ画像表示対策
    }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = '17Elements_鑑定書.png';
        link.click();
    }).catch(err => {
        console.error("保存失敗:", err);
        alert("画像の保存に失敗しました。");
    });
});

// 「結果をコピー」ボタンの処理
document.getElementById('copy-result').addEventListener('click', function() {
    // 画面上の <h2> タグからキャラクター名を取得
    const h2Element = document.querySelector('#resultArea h2');
    const characterName = h2Element ? h2Element.innerText : "レアアース";

    // 文章を組み立て（` ` バッククォートを使用）
    const text = `私の元素は【${characterName}】でした！\n#元素診断 #レアアース性格診断\nhttps://17rareearth.github.io/17character/index_uranai.html`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert(`【${characterName}】の結果をコピーしました！SNSに貼り付けてね。`);
        });
    } else {
        alert("お使いのブラウザではコピー機能がサポートされていません。");
    }
});