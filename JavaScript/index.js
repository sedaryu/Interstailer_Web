window.addEventListener('load', setPageSizeByWindowSize);
window.addEventListener('load', convertImageSVG);
window.addEventListener('load', animateIndexCanvas);
//window.addEventListener('load', getMemberData);
window.addEventListener('resize', setPageSizeByWindowSize);

//ウィンドウサイズに合わせてページサイズを調整
function setPageSizeByWindowSize() {

    //.parentのサイズ設定
    let element = document.querySelector('.parent');

    let width = window.innerWidth * 0.95;
    let height = window.innerHeight * 0.95;

    if(width >= height) //横幅の方が大きい画面の場合
    { width = 0.66666 * height; }
    else //縦幅の方が大きい画面の場合
    { height = 1.5 * width; }

    element.style.left = ((window.innerWidth * 0.5) - (width * 0.5)) + 'px';
    element.style.top = ((window.innerHeight * 0.5) - (height * 0.5)) + 'px';

    element.style.width = width + 'px';
    element.style.height = height + 'px';
}

//アイコンのIMGをSVG要素に変換
function convertImageSVG(){

    deSVG('.icon');
};

//キャンバスのアニメーションを実行
var widthPosList = ['0%','13.7%','25%','34.1%','41%','47.8%','52.2%','59%','65.9%','75%','86.3%','100%'];
var heightPosList = ['0%','14.8%','29%','43.2%','57.4%','71.6%','85.8%','100%'];
function animateIndexCanvas(){

    let canvas = document.querySelector('.index_Canvas');

    let eventPoint = function(){
        let element = document.createElement('div');
        element.setAttribute('class', 'point');
        canvas.appendChild(element);

        let x; let y;
        if(Math.floor(Math.random() * 2) == 0)
        {
            x = widthPosList[Math.floor( Math.random() * widthPosList.length )];
            y = Math.floor(Math.random() * 2) == 0 ? '-10%' : '110%';
        }
        else
        {
            x = Math.floor(Math.random() * 2) == 0 ? '-10%' : '110%';
            y = heightPosList[Math.floor( Math.random() * heightPosList.length )];
        }

        let dur = Math.random() * 1000 + 250;
        let scaleMin = Math.random() * 2.5;
        let scaleMax = Math.random() * 7.5 + 2.5;
        element.animate(
            [
                { offset: 0, left: '50%', top: '50%', width: scaleMin + 'px', height: scaleMin + 'px', opacity: 0 },
                { offset: 1, left: x, top: y, width: scaleMax + 'px', height: scaleMax + 'px', opacity: 1 }
            ],
            {
                duration: dur,
                easing: 'ease-in',
                fill: 'forwards'
            }
        );
        setTimeout(()=>{
            element.remove();
        }, dur);
    };
    
    let eventSide = function(){
        let element = document.createElement('div');
        element.setAttribute('style', 'position: absolute; border: solid 1px white;');
        canvas.appendChild(element);
        let dur = Math.random() * 5000 + 2500;
        element.animate(
            [
                { offset: 0, left: '50%', top: '50%', width: '0%', height: '0%', borderWidth: '0px', opacity: 0 },
                { offset: 1, left: '0%', top: '0%', width: '100%', height: '100%', borderWidth: '2.5px', opacity: 1 }
            ],
            {
                duration: dur,
                easing: 'ease-in',
                fill: 'forwards'
            }
        );
        setTimeout(()=>{
            element.remove();
        }, dur);

        setTimeout(()=>{
            eventSide();
        }, dur * 0.333);
    };

    setInterval(eventPoint, 25);
}

//各ボタンにカーソルが乗った際アニメーションを実行
function animateIndexIconOnCursor(target){

    if (!target.hasAttribute('data-isAnimating')){
        target.setAttribute('data-isAnimating', 'false');
    }

    if (target.dataset.isAnimating == 'true'){
        return;
    }

    // if(target.id == 'summary'){
        
    //     target.animate(
    //         [
    //             { offset: 0, transform: 'translate(0, 0)'},
    //             { offset: 0.25, transform: 'translate(-2.5%, 0)'},
    //             { offset: 0.5, transform: 'translate(2.5%, 0)'},
    //             { offset: 1, transform: 'translate(0, 0)'}
    //         ],
    //         {
    //             duration: 100,
    //             iterations: Infinity
    //         }
    //     );
    // }
    // else if(target.id == "member"){
        
    //     let face = document.querySelector('.Face');
    //     let head = document.querySelector('.Head');
    //     let left_Shoulder = document.querySelector('.Left_Shoulder');
    //     let right_Shoulder = document.querySelector('.Right_Shoulder');
    //     let left_Hand = document.querySelector('.Left_Hand');
    //     let right_Hand = document.querySelector('.Right_Hand');
    //     let heart = document.querySelector('.Heart');
    //     let body = document.querySelector('.Body');

    //     face.animate(
    //         [
    //             { offset: 0, transform: 'translate(0, 0)'},
    //             { offset: 0.5, transform: 'translate(0, -2.5%)'},
    //             { offset: 1, transform: 'translate(0, 0)'}
    //         ],
    //         {
    //             duration: 250,
    //             iterations: Infinity
    //         }
    //     );

    //     head.animate(
    //         [
    //             { offset: 0, transform: 'translate(0, 0)'},
    //             { offset: 0.5, transform: 'translate(0, -1%)'},
    //             { offset: 1, transform: 'translate(0, 0)'}
    //         ],
    //         {
    //             duration: 250,
    //             iterations: Infinity
    //         }
    //     );

    //     left_Shoulder.animate(
    //         [
    //             { offset: 0, transform: 'translate(0, 0)'},
    //             { offset: 0.5, transform: 'translate(-2.5%, 0.5%)'},
    //             { offset: 1, transform: 'translate(0, 0)'}
    //         ],
    //         {
    //             duration: 250,
    //             iterations: Infinity
    //         }
    //     );

    //     right_Shoulder.animate(
    //         [
    //             { offset: 0, transform: 'translate(0, 0)'},
    //             { offset: 0.5, transform: 'translate(2.5%, 0.5%)'},
    //             { offset: 1, transform: 'translate(0, 0)'}
    //         ],
    //         {
    //             duration: 250,
    //             iterations: Infinity
    //         }
    //     );

    //     left_Hand.animate(
    //         [
    //             { offset: 0, transform: 'translate(0, 0)'},
    //             { offset: 0.5, transform: 'translate(-2.5%, 1%)'},
    //             { offset: 1, transform: 'translate(0, 0)'}
    //         ],
    //         {
    //             duration: 250,
    //             iterations: Infinity
    //         }
    //     );

    //     right_Hand.animate(
    //         [
    //             { offset: 0, transform: 'translate(0, 0)'},
    //             { offset: 0.5, transform: 'translate(2.5%, 1%)'},
    //             { offset: 1, transform: 'translate(0, 0)'}
    //         ],
    //         {
    //             duration: 250,
    //             iterations: Infinity
    //         }
    //     );

    //     heart.animate(
    //         [
    //             { offset: 0, transform: 'translate(0, 0)'},
    //             { offset: 0.5, transform: 'translate(0, 1%)'},
    //             { offset: 1, transform: 'translate(0, 0)'}
    //         ],
    //         {
    //             duration: 250,
    //             iterations: Infinity
    //         }
    //     );

    //     body.animate(
    //         [
    //             { offset: 0, transform: 'translate(0, 0)'},
    //             { offset: 0.5, transform: 'translate(0, 1%)'},
    //             { offset: 1, transform: 'translate(0, 0)'}
    //         ],
    //         {
    //             duration: 250,
    //             iterations: Infinity
    //         }
    //     );
    // }
    // else if(target.id == "backnumber"){

    //     let page = target.querySelector('#IconPart');
    //     page.animate(
    //         [
    //             { offset: 0, transform: 'translate(0, 0) rotateY(0deg)'},
    //             { offset: 0.25, transform: 'translate(-2.5%, -1%) rotateY(-22.5deg)'},
    //             { offset: 0.5, transform: 'translate(-2.5%, -2%) rotateY(-90deg)'},
    //             { offset: 0.75, transform: 'translate(1%, -1%) rotateY(-157.5deg)'},
    //             { offset: 1, transform: 'translate(0, 0) rotateY(-180deg)'}
    //         ],
    //         {
    //             duration: 400,//150,
    //             iterations: Infinity
    //         }
    //     );
    // }
    // else if(target.id == "event"){
        
    //     let line = target.querySelector('#IconPart');
    //     line.animate(
    //         [
    //             { offset: 0, transform: 'rotateZ(0deg)'},
    //             { offset: 1, transform: 'rotateZ(360deg)'}
    //         ],
    //         {
    //             duration: 2500,
    //             iterations: Infinity
    //         }
    //     );
    // }
    // else if(target.id == "information"){

    //     let waves = [];
    //     waves.push(target.querySelector('.Wave_0'));
    //     waves.push(target.querySelector('.Wave_1'));
    //     waves.push(target.querySelector('.Wave_2'));
    //     waves.push(target.querySelector('.Wave_3'));
    //     waves.push(target.querySelector('.Wave_4'));

    //     for(let i = 0;  i < 5;  i++){ 
    //         waves[i].animate(
    //             [
    //                 { offset: 0, opacity: 1 },
    //                 { offset: 0.2 * i, opacity: 0 },
    //                 { offset: 1, opacity: 1 }
    //             ],
    //             {
    //                 duration: 750,
    //                 iterations: Infinity
    //             }
    //         );
    //     }

    // }
    // else if(target.id == "link"){
        
    //     let links = [];
    //     links.push(target.querySelector('.Linq_0'));
    //     links.push(target.querySelector('.Linq_1'));

    //     links[0].style.strokeDasharray = 150;
    //     links[1].style.strokeDasharray = 150;
    //     links[0].animate(
    //         [
    //             { offset: 0, strokeDashoffset: 0 },
    //             { offset: 0.25, strokeDashoffset: 150 },
    //             { offset: 0.5, strokeDashoffset: 150 },
    //             { offset: 0.75, strokeDashoffset: 0 },
    //             { offset: 1, strokeDashoffset: 0 }
    //         ],
    //         {
    //             duration: 1500,
    //             iterations: Infinity
    //         }
    //     );
    //     links[1].animate(
    //         [
    //             { offset: 0, strokeDashoffset: 0 },
    //             { offset: 0.25, strokeDashoffset: 0 },
    //             { offset: 0.5, strokeDashoffset: 150 },
    //             { offset: 0.75, strokeDashoffset: 150 },
    //             { offset: 1, strokeDashoffset: 0 }
    //         ],
    //         {
    //             duration: 1500,
    //             iterations: Infinity
    //         }
    //     );
    // }
    // else if(target.id == "contact"){

    //     let phone = target.querySelector('#IconPart');
    //     phone.animate(
    //         [
    //             { offset: 0, transform: 'translate(0, 0) rotateZ(0deg)' },
    //             { offset: 0.05, transform: 'translate(0, -5%) rotateZ(20deg)' },
    //             { offset: 0.1, transform: 'translate(0, -10%) rotateZ(0deg)' },
    //             { offset: 0.15, transform: 'translate(0, -9.5%) rotateZ(-20deg)' },
    //             { offset: 0.2, transform: 'translate(0, -9%) rotateZ(0deg)' },
    //             { offset: 0.25, transform: 'translate(0, -8.5%) rotateZ(20deg)' },
    //             { offset: 0.3, transform: 'translate(0, -8%) rotateZ(0deg)' },
    //             { offset: 0.35, transform: 'translate(0, -6%) rotateZ(-20deg)' },
    //             { offset: 0.4, transform: 'translate(0, -4%) rotateZ(0deg)' },
    //             { offset: 0.45, transform: 'translate(0, -2%) rotateZ(20deg)' },
    //             { offset: 0.5, transform: 'translate(0, 0) rotateZ(0deg)' },
    //             { offset: 0.55, transform: 'translate(0, -5%) rotateZ(-20deg)' },
    //             { offset: 0.6, transform: 'translate(0, -10%) rotateZ(0deg)' },
    //             { offset: 0.65, transform: 'translate(0, -9.5%) rotateZ(20deg)' },
    //             { offset: 0.7, transform: 'translate(0, -9%) rotateZ(0deg)' },
    //             { offset: 0.75, transform: 'translate(0, -8.5%) rotateZ(-20deg)' },
    //             { offset: 0.8, transform: 'translate(0, -8%) rotateZ(0deg)' },
    //             { offset: 0.85, transform: 'translate(0, -6%) rotateZ(20deg)' },
    //             { offset: 0.9, transform: 'translate(0, -4%) rotateZ(0deg)' },
    //             { offset: 0.95, transform: 'translate(0, -2%) rotateZ(-20deg)' },
    //             { offset: 1, transform: 'translate(0, 0) rotateZ(0deg)' }
    //         ],
    //         {
    //             duration: 1000,
    //             iterations: Infinity
    //         }
    //     );
    // }
    // else if(target.id == "pleasure"){

    //     let joker = target.querySelector('.Joker');
    //     let ace = target.querySelector('.A');
    //     let eight = target.querySelector('.Eight');
    //     joker.animate(
    //         [
    //             { offset: 0, transform: 'rotateZ(0deg)' },
    //             { offset: 0.5, transform: 'rotateZ(10deg)' },
    //             { offset: 1, transform: 'rotateZ(0deg)' },
    //         ],
    //         {
    //             duration: 500,
    //             iterations: Infinity
    //         }
    //     );
    //     ace.animate(
    //         [
    //             { offset: 0, transform: 'translate(0, 0) rotateZ(0deg)' },
    //             { offset: 0.5, transform: 'translate(-20%, 0) rotateZ(-22.5deg)' },
    //             { offset: 1, transform: 'translate(0, 0) rotateZ(0deg)' }
    //         ],
    //         {
    //             duration: 500,
    //             iterations: Infinity
    //         }
    //     );
    //     eight.animate(
    //         [
    //             { offset: 0, transform: 'translate(0, 0) rotateZ(0deg)' },
    //             { offset: 0.5, transform: 'translate(20%, 0) rotateZ(22.5deg)' },
    //             { offset: 1, transform: 'translate(0, 0) rotateZ(0deg)' }
    //         ],
    //         {
    //             duration: 500,
    //             iterations: Infinity
    //         }
    //     );
    // }

    // target.dataset.isAnimating = 'true';
}

//各ボタンからカーソルが離れた際アニメーションを停止
function stopAnimationIndexIconOnCursor(target){

    target.getAnimations().forEach(animation => animation.cancel());
    target.animate(
        [
            { offset: 0 },
            { offset: 1, transform: 'translate(0, 0)'}
        ],
        {
            duration: 50
        }
    );

    let children = target.querySelectorAll('#IconPart');
    for(let i = 0;  i < children.length;  i++)
    {
        children[i].getAnimations().forEach(animation => animation.cancel());
        children[i].animate(
            [
                { offset: 0 },
                { offset: 1, transform: 'translate(0, 0)'}
            ],
            {
                duration: 50
            }
        );
    }

    target.dataset.isAnimating = 'false';
}

function setMemberData()
{
    const url = 'https://script.google.com/macros/s/AKfycbwmz8icfNpnAsf_Vvp-Xk9dfiNmD_Ct8AV0Wk-Df58AH4bgfiS8wVOBsnQCVnjCz2M/exec';
    // const localData = localStorage.getItem('localData')
    // if (localData) {
    //     console.log(JSON.parse(localData))
    // }
 
    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        const dataStr = JSON.stringify(data);
        console.log(data);
        // if (dataStr !== localData) {
        //     console.log(data)
        //     localStorage.setItem('localData', dataStr)
        // }
    });
}