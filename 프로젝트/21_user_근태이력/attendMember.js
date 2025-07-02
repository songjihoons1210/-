
function getmemberList() {
    let memberList = localStorage.getItem('memberList');
    if (memberList == null) {
        memberList = [];
    } else {
        memberList.JSON.parse(memberList);
    }; return memberList;

}

function setmemberList(memberList) {
    localStorage.setItem('memberList', JSON.stringify(memberList))
}

function usercode() {
    //가져오기
    const url = new URLSearchParams(location.search);
    const staffnameInput = url.get('.staffname');
    /*
    const employeeInput = document.querySelector('.employee');
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
    const attendance = document.querySelector('.attendance');
    const memberList = getmemberList();
    let html = [];
    for (let i = 0; i < memberList.length; i++) {
        const membersList = memberList[i];
        html += `<tr>
                                <td>${membersList.employee}</td>
                                <td>${membersList.staffname}</td>
                                <td>9999년99월99일${membersList.birthdate}</td>
                                <td>영업부${membersList.position}</td>
                                <td>이사${membersList.post}}</td>
                                <td>010-1234-5678${membersList.phonenum}</td>
                                <td>jh.kim@example.com${membersList.email}</td>
                                <td><button onclick="gotowork()" class="goworkbtn">출근</button></td>
                                <td><button class="leaveworkbtn" onclick="leaveforwork()">칼퇴</button></td>
                            </tr>`
        // 로그인 기록 가져와야함 출퇴근해야하니  
    };
    attendance.innerHTML = html;

}