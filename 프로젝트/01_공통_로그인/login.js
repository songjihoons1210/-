function getMemberList() {
    let memberList = localStorage.getItem('memberList');

    if (memberList == null) {
        // localStorage에 없으면, 초기값인 배열을 반환할 수도 있음
        return [];
    } else {
        return JSON.parse(memberList);
    }
}

function testbtn() {
    const loginInput = document.querySelector('.login');
    const passwordInput = document.querySelector('.password');
    const login = loginInput.value.trim();
    const pass = passwordInput.value.trim();

    const members = getMemberList();

    // 숫자로 변환된 memberID와 비교
    const member = members.find(m => Number(m.memberID) === Number(login) && m.pwd === pass);

    if (!member) {
        alert('로그인 정보가 올바르지 않습니다.');
        return;
    }


    alert(`${member.Name}님, 출근!`);
    location.href = '../21_user_근태이력/attendMember.html';
}

