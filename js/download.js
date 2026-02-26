// 「画像で保存」ボタンの処理
document.getElementById('save-image').addEventListener('click', function() {
    const target = document.getElementById('captureRegion'); 

    if (!target || document.getElementById('resultArea').innerHTML.trim() === "") {
        alert("診断を完了させてから保存してください。");
        return;
    }

    // 保存したくない要素（長い説明や相性診断）を一時的に隠す
    const longText = target.querySelector('.longText');
    const compatibility = target.querySelector('.compatibilityArea');
    
    if (longText) longText.style.display = 'none';
    if (compatibility) compatibility.style.display = 'none';

    html2canvas(target, {
        backgroundColor: "#cfe1fd", 
        scale: 2,
        useCORS: true 
    }).then(canvas => {
        const image = canvas.toDataURL("image/png");
        const link = document.createElement('a');
        link.href = image;
        link.download = '17Elements_鑑定書.png';
        link.click();

        // 保存が終わったら表示を戻す
        if (longText) longText.style.display = 'block';
        if (compatibility) compatibility.style.display = 'block';
        
    }).catch(err => {
        console.error("保存失敗:", err);
        alert("画像の保存に失敗しました。");
        if (longText) longText.style.display = 'block';
        if (compatibility) compatibility.style.display = 'block';
    });
});

// 「結果をコピー」ボタンの処理
document.getElementById('copy-result').addEventListener('click', function() {
    const h2Element = document.querySelector('#resultArea h2');
    const characterName = h2Element ? h2Element.innerText : "レアアース";

    const text = `私の元素は【${characterName}】でした！\n#元素診断 #レアアース性格診断\nhttps://17rareearth.github.io/17character/index_uranai.html`;
    
    // コピー機能のチェックと実行
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(() => {
            alert(`【${characterName}】の結果をコピーしました！SNSに貼り付けてね。`);
        }).catch(err => {
            console.error("コピー失敗:", err);
            alert("コピーに失敗しました。");
        });
    } else {
        // サポートされていないブラウザ用のアラート
        alert("お使いのブラウザではコピー機能がサポートされていません。手動でコピーしてください。");
    }
});