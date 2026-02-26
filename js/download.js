// 「画像で保存」ボタンの処理
document.getElementById('save-image').addEventListener('click', function() {
    // 1. 保存対象を取得
    const target = document.querySelector('.resultCard'); 

    if (!target) {
        alert("診断を完了させてから保存してください。");
        return;
    }

    // 2. 【重要】保存したくない要素（長い説明や相性）を一時的に非表示にする
    const longText = target.querySelector('.longText');
    const compatibility = target.querySelector('.compatibilityArea');
    
    if (longText) longText.style.display = 'none';
    if (compatibility) compatibility.style.display = 'none';

    // 3. html2canvasを実行
    html2canvas(target, {
        backgroundColor: "#ffffff", 
        scale: 2,
        useCORS: true 
    }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = '17Elements_鑑定書.png';
        link.click();

        // 4. 保存が終わったら画面上の表示を元に戻す
        if (longText) longText.style.display = 'block';
        if (compatibility) compatibility.style.display = 'block';
        
    }).catch(err => {
        console.error("保存失敗:", err);
        alert("画像の保存に失敗しました。");
        // エラー時も表示を元に戻す
        if (longText) longText.style.display = 'block';
        if (compatibility) compatibility.style.display = 'block';
    });
});

// 「結果をコピー」ボタンの処理
document.getElementById('copy-result').addEventListener('click', function() {
    const h2Element = document.querySelector('#resultArea h2');
    const characterName = h2Element ? h2Element.innerText : "レアアース";

    const text = `私の元素は【${characterName}】でした！\n#元素診断 #レアアース性格診断\nhttps://17rareearth.github.io/17character/index_uranai.html`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            alert(`【${characterName}】の結果をコピーしました！SNSに貼り付けてね。`);
        });
    } else {
        alert("コピー機能がサポートされていません。");
    }
});