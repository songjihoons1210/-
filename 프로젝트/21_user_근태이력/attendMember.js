
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
    for(let i = 0; i<=memberList.length-1; i++){
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

function gotowork() { console.log('출근')
    const url = new URLSearchParams(location.search);
    const employee = url.get('memberID');
    let memberList = getmemberList();
    for(let i = 0 ; i <= memberList.length-1; i++){
        const member = memberList[i];
        if(member.memberID == employee) {
            document.querySelector('.staffname').value = member.Name;
            document.querySelector('.position').value = member.posiID;
            document.querySelector('.post').value = member.departID;
        }
        
    }
}


  