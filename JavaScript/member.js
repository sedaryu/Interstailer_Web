window.addEventListener('load', function() {
    setMemberData();
});
window.addEventListener('resize', function() {
    setPageSizeByWindowSize();
    setMemberSizeByPageSize();
});

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

    console.log("load_1");
}

//ページサイズに合わせてメンバーサイズを調整
function setMemberSizeByPageSize() {

    //.parentのサイズ取得
    let parent = document.querySelector('.parent');
    let width = Number(parent.style.width.replace("px", ""));
    let members = document.querySelectorAll('.member_member');
    for(let i = 0;  i < members.length;  i++)
    {
        members[i].style.width = width + 'px';
        members[i].style.height = 'auto';
        let icon = members[i].querySelector('.member_icon');
        icon.style.width = (width * 0.35) + 'px';
        icon.style.height = (width * 0.35) + 'px';
        //let member_height = Number(window.getComputedStyle(members[i]).height.replace("px", ""));
        let member_height = members[i].getBoundingClientRect().height;
        let icon_height = Number(icon.style.height.replace("px", ""));
        icon.style.top = ((member_height * 0.5) - (icon_height * 0.5)) + 'px';

        let text = members[i].querySelector('.member_text');
        text.style.width = (width * 0.65) + 'px';
    }

    console.log("load_2");
}

function setMemberData()
{
    const url = 'https://script.google.com/macros/s/AKfycbwmz8icfNpnAsf_Vvp-Xk9dfiNmD_Ct8AV0Wk-Df58AH4bgfiS8wVOBsnQCVnjCz2M/exec';

    fetch(url)
    .then((res) => res.json())
    .then((data) => {
        const dataStr = JSON.stringify(data);
        outputMemberData(data);
        setPageSizeByWindowSize();
        setMemberSizeByPageSize();
        setPageSizeByWindowSize();
        setMemberSizeByPageSize();
    });
}

function outputMemberData(data)
{
    let parent = document.querySelector('.parent');

    for(let i = 0; i < data.length; i++)
    {
        var member_member = document.createElement("div");
        member_member.setAttribute("class","member_member");
        parent.appendChild(member_member);
    
        var member_icon = document.createElement("div");
        member_icon.setAttribute("class","member_icon");
        member_member.appendChild(member_icon);
    
        var member_text_parent = document.createElement("div");
        member_text_parent.setAttribute("class","member_text_parent");
        member_member.appendChild(member_text_parent);
    
        var member_text = document.createElement("div");
        member_text.setAttribute("class","member_text");
        member_text_parent.appendChild(member_text);
    
        var text = [
            document.createTextNode('<名前>'), document.createElement('br'),
            document.createTextNode(data[i][1]), document.createElement('br'),
            document.createTextNode('<コメント>'), document.createElement('br'),
            document.createTextNode(data[i][2]), document.createElement('br'),
            document.createTextNode('<インフォ>'), document.createElement('br'),
            document.createTextNode(data[i][3]), document.createElement('br')
        ];

        for(let n = 0; n < text.length; n++)
        {
            member_text.appendChild(text[n]);   
        }
    }

    console.log("load_0");
}