
function getborlist() {
    let borlist = localStorage.getItem('borlist');
    return borlist ? JSON.parse(borlist) : [];
}

function getLastUser() {
    let borlist = localStorage.getItem('borlist');
    if (!borlist) return null;
    borlist = JSON.parse(borlist);
    if (borlist.length === 0) return null;
    return borlist[borlist.length - 1]; // 가장 최근 로그인한 사용자 정보

}
function usercode() { 
    //가져오기
    const staffnameInput = document.querySelector('.staffname');
    const employeeInput = document.querySelector('.employee');
    const birthdateInput = document.querySelector('.birthdate');
    const positionInput = document.querySelector('.position');
    const postInput = document.querySelector('.post');
    const emailInput = document.querySelector('.email');
    const phonenumInput = document.querySelector('.phonenum');
    // 초기
    const staffname = staffnameInput.value;
    const employee = employeeInput.value;
    const birthdate = birthdateInput.value;
    const position = positionInput.value;
    const post = postInput.value;
    const email = emailInput.value;
    const phonenum = phonenumInput.value;


    const obj = {
        staffname: staffname,
        employee: Number(employee),
        birthdate: birthdate,
        position: position,
        post: Number(post),
        email: email,
        phonenum: Number(phonenum),
    };

    borlist.push(obj);
    alert('일단 출근');
    setProducts(borlist)

    attendMem();
}

function attendMem() {
    const attendance = document.querySelector('.attendance');
    const borlist = getborlist();
    let html = [];
    for(let i = 0 ; i < borlist.length; i++){
            const bordlist = borlist[i];
        html += `<tr>
                                <td>${bordlist.employee}</td>
                                <td>${bordlist.staffname}</td>
                                <td>9999년99월99일${bordlist.birthdate}</td>
                                <td>영업부${bordlist.position}</td>
                                <td>이사${bordlist.post}}</td>
                                <td>010-1234-5678${bordlist.phonenum}</td>
                                <td>jh.kim@example.com${bordlist.em}</td>
                                <td><button onclick="gotowork()" class="goworkbtn">출근</button></td>
                                <td><button class="leaveworkbtn" onclick="leaveforwork()">칼퇴</button></td>
                            </tr>`
      // 로그인 기록 가져와야함 출퇴근해야하니  
    };
    attendance.innerHTML = html;
    
}