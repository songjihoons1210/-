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
                    <td scope="row">${attendace.memberID}</td>`

        let member = memberInfo(attendace.memberID)
        // console.log(member)
        html += `<td>${member.Name}</td>
                        <td>${changeDepartName(member.departID)}</td>
                        <td>${changePositionName(member.posiID)}</td>
                        <td>${attendace.date}</td>
                        <td>${attendace.attentTime}</td>
                        <td>${attendace.leaveTime}</td>
                        <td style='color : red; font-weight:500'>${lateness(attendace.attentTime)}</td>
                        <td style='color : red; font-weight:500'>${absence(attendace.attentTime)}</td>
                        <td>
                            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">수정</button>
                        </td>
                    </tr>`
    };
    tbody.innerHTML = html;
};

// 사번을 매개변수로 하여, 이름, 부서, 직급을 조회하는 함수
function memberInfo(memberID) {
    // console.log('memberInfo exe')
    const memberList = getMemberList()
    // console.log(memberList)        
    for (let i = 0; i < memberList.length; i++) {
        let member = memberList[i]
        // console.log(member)
        if (member.memberID == memberID) {
            // console.log(member)
            return member
        }
    }
}

// 지각여부 판단 함수

function lateness(attentTime) {
    let lateness = ''
    if (attentTime > "09:10") {
        lateness = '지각'
    } else {
        lateness = ''
    }
    return lateness
};

// 결근여부 판단 함수
function absence(attentTime) {
    let absence = ''
    if (attentTime == '') {
        absence = "결근";
    }
    return absence
}

// 1.3. 직급id <-> 직급 이름 변환 함수
function changePositionName(input) {
    const positionList = getPositionList();
    let posi = '';
    for (let i = 0; i < positionList.length; i++) {
        let position = positionList[i];
        if (position.posiID == input) {
            posi = position.posiName
        }
        else if (position.posiName == input) {
            posi = position.posiID
        };
    };
    return posi
};

// 2.3. 부서id <-> 부서 이름 변환 함수
function changeDepartName(input) {
    const departmentList = getDepartmentList()
    let dapart = '';
    for (let i = 0; i < departmentList.length; i++) {
        let department = departmentList[i];
        if (department.departID == input) {
            dapart = department.departName
        }
        else if (department.departName == input) {
            dapart = department.departID
        };
    };
    return dapart
};
