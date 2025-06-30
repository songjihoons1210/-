// 4.1. get 직원 리스트 
function getMemberList() {
    let memberList = localStorage.getItem('memberList')

    if (memberList == null) {
        memberList = [];
    } else {
        memberList = JSON.parse(memberList);
    };
    return memberList;
};

// 4.2. set 직원 리스트
function setMemberList(memberList) {
    localStorage.setItem('memberList', JSON.stringify(memberList));
};

// 5.1. get 근태 리스트 
function getAttendaceList() {
    let attendaceList = localStorage.getItem('attendaceList')

    if (attendaceList == null) {
        attendaceList = [];
    } else {
        attendaceList = JSON.parse(attendaceList);
    };
    return attendaceList;
};

// 5.2. set 근태 리스트
function setAttendaceList(attendaceList) {
    localStorage.setItem('attendaceList', JSON.stringify(attendaceList));
};

//===========================================================

AttendaceListView()
// js가 실행되면 근태이력 AttendaceList view 실행

function AttendaceListView() {
    // console.log('AttendaceListView exe')
    memberInfo();

    let tbody = document.querySelector('.tbody')
    let html = ``;
    const attendaceList = getAttendaceList()
    for (let i = attendaceList.length - 1; i >= 0; i--) {
        let attendace = attendaceList[i]
        html += `<tr>
                    <th scope="row">${attendace.memberID}</th>`
        let member = memberInfo(attendace.memberID)

        html += `<td>${member.name}</td>
                        <td>영업부</td>
                        <td>이사</td>`
        html += `<td>${attendace.date}</td>
                        <td>${attendace.attentTime}</td>
                        <td>${attendace.leaveTime}</td>
                        <td>${lateness(attendace.attentTime)}</td>
                        <td>함수 만들어</td>
                        <td>
                            <button type="button" class="btn btn-dark">수정</button>
                            <button type="button" class="btn btn-danger">삭제</button>
                        </td>
                    </tr>`
    };
    tbody.innerHTML = html;
};

// 사번을 매개변수로 하여, 이름, 부서, 직급을 조회하는 함수 @@@@@@
function memberInfo(memberID) {
    console.log('memberInfo exe')
    const memberList = getMemberList()
    console.log(memberList)    

    for (let i = 0; i < memberList.length; i++) {
        let member = memberList[i]
        console.log(member)

        if (member.memberID = memberID) {
            console.log(member)
            return member
        }
    }
}


// 지각여부 판단 함수
lateness()
function lateness(attentTime) {
    let lateness = ''
    if (attentTime > "09:10") {
        lateness = '지각'
    } else {
        lateness = 'X'
    }
    return lateness
};

// 결근여부 판단 함수
function absence() { }