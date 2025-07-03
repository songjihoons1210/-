
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
    /*
    
    const birthdateInput = document.querySelector('.birthdate');
    const positionInput = document.querySelector('.position');
    const postInput = document.querySelector('.post');
    const emailInput = document.querySelector('.email');
    const phonenumInput = document.querySelector('.phonenum');

    const obj = {
        staffname: staffname,
        employee: Number(employee),
        birthdate: birthdate,
        position: position,
        post: Number(post),
        email: email,
        phonenum: Number(phonenum),
    };

    let memberList = getmemberList();

    // 초기
    const staffname = staffnameInput.value;
    const employee = employeeInput.value;
    const birthdate = birthdateInput.value;
    const position = positionInput.value;
    const post = postInput.value;
    const email = emailInput.value;
    const phonenum = phonenumInput.value;

    alert('일단 출근');
    memberList.push(obj);
    setmemberList(memberList);
    */
    attendMem();
}

function attendMem() {
    console.log('asd')
    const attendance = document.querySelector('.attendance');
    const memberList = getmemberList();
    let html = [];
    for (let i = 0; i < memberList.length; i++) {
        const membersList = memberList[i];
        html += `<tr>
                                <td>${membersList.employee}</td>
                                <td>${membersList.staffname}</td>
                                <td>${membersList.birthdate}</td>
                                <td>${membersList.position}</td>
                                <td>${membersList.post}}</td>
                                <td>${membersList.phonenum}</td>
                                <td>${membersList.email}</td>
                                <td><button onclick="gotowork()" class="goworkbtn">출근</button></td>
                                <td><button class="leaveworkbtn" onclick="leaveforwork()">칼퇴</button></td>
                            </tr>`
        // 로그인 기록 가져와야함 출퇴근해야하니  
    };
    attendance.innerHTML = html;

}