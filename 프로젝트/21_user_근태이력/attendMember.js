
function getmemberList() {
   
    let memberList = localStorage.getItem('memberList');
    if (memberList == null) {
        memberList = [];
    } else {
        memberList = JSON.parse(memberList);
    }; return memberList;

}

function setmemberList(memberList) {
    localStorage.setItem('memberList', JSON.stringify(memberList))
}

usercode();
function usercode() { 
    //가져오기
    const url = new URLSearchParams(location.search);
    const employee = url.get('memberID');
    let memberList = getmemberList();
    for(let i = 0; i<memberList.length; i++){
        const member = memberList[i];
        if(member.memberID == employee) {
            document.querySelector('.employee').value = member.memberID;
            document.querySelector('.staffname').value = member.Name;
            document.querySelector('.birthdate').value = member.Birthday;
            document.querySelector('.position').value = member.posiID;
            document.querySelector('.post').value = member.departID;
            document.querySelector('.email').value = member.Email; 
            document.querySelector('.phonenum').value = member.call;
            break;
        }
    }
}

function gotowork() { console.log('출근');
    const url = new URLSearchParams(location.search);
    const employee = url.get('memberID');
    let memberList = getmemberList();
    for(let i = 0 ; i < memberList.length; i++){
        const member = memberList[i];
        if(member.memberID == employee) {
            document.querySelector('.staffname').value = member.Name;
            document.querySelector('.position').value = member.posiID;
            document.querySelector('.post').value = member.departID;
            let year = new Date().getFullYear(); // 연도 구함
            let month = new Date().getMonth() + 1; // 달
            month = month < 10 ? `0${month}` : month ; //한자리수면 0붙여서 10< 이런식
            let day = new Date().getDate(); // 일 반환
            day = day < 10 ? `0${day}` : day;    //한자리수면 0붙여서 10< 이런식
            let equals = `${year}-${month}-${day}`; // 달 12년-12-월-12일
            document.querySelector('.date').value = equals;

            break;
        }
    }

    alert('출근완료');

}