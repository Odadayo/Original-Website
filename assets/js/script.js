window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-fix');//固定したい要素を決める
    const topPosition = header.offsetTop;

    if (window.pageYOffset > topPosition) {
        header.classList.add('fixed');//固定する処理
    } else {
        header.classList.remove('fixed');//戻る時の処理ここを変更すれば良い
    }
});

// window.addEventListener('scroll', function() {
//     const header = document.querySelector('.header-fix');
//     const topPosition = header.offsetTop;
//     const returnPosition = header.offsetTop;

//     if (window.pageYOffset > topPosition) {
//         header.classList.add('fixed');
//     } else {
//         header.classList.remove('fixed');
//     }
// });

$('.slider').slick({
    autoplay: true,//自動的に動き出すか。初期値はfalse。
    infinite: true,//スライドをループさせるかどうか。初期値はtrue。
    speed: 500,//スライドのスピード。初期値は300。
    slidesToShow: 3,//スライドを画面に3枚見せる
    slidesToScroll: 1,//1回のスクロールで1枚の写真を移動して見せる
    prevArrow: '<div class="slick-prev"></div>',//矢印部分PreviewのHTMLを変更
    nextArrow: '<div class="slick-next"></div>',//矢印部分NextのHTMLを変更
    centerMode: true,//要素を中央ぞろえにする
    variableWidth: true,//幅の違う画像の高さを揃えて表示
    dots: true,//下部ドットナビゲーションの表示
});