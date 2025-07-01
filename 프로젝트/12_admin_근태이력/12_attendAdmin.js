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
                            <button type="button" class="btn btn-dark" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="AttendaceViewModal(${attendace.attendID})">수정</button>
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

// 근태이력 수정 > 모달에 정보 표시
function AttendaceViewModal(attendID) {
    let html = ``;
    const attendaceList = getAttendaceList()
    for (let i = attendaceList.length - 1; i >= 0; i--) {
        let attendace = attendaceList[i]
        if (attendace.attendID == attendID) {
            let member = memberInfo(attendace.memberID);
            html += `<div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">근태이력 수정</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div>사번 <input type="number" value="${member.memberID}" disabled/> </div> 
                    <div>이름 <input type="text" value="${member.Name}" disabled/></div> 
                    <div>부서 <input type="text" value="${changeDepartName(member.departID)}" disabled/></div>
                    <div>직급 <input type="text" value="${changePositionName(member.posiID)}" disabled/></div>
                    <div>날짜 <input type="date" value="${attendace.date}" disabled/></div>
                    <div>출근시간 <input type="time" value="${attendace.attentTime}" /></div>
                    <div>퇴근시간<input type="time" value="${attendace.leaveTime}"/></div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
                    <button type="button" class="btn btn-primary" onclick="AttendaceUpdate(${attendID})" data-bs-dismiss="modal">저장</button>
                </div>`

            document.querySelector(".modal-content").innerHTML = html
        }
    }
}

// 근태 이력 수정 저정
function AttendaceUpdate(attendID) {
    const newAttentTime = document.querySelector(".modal-body > div:nth-child(6) >input").value
    const newLeaveTime = document.querySelector(".modal-body > div:nth-child(7) >input").value
    console.log(attendID)

    if( newAttentTime > "09:10" ){
        alert("수정 출근시간 09:10 이후이므로 지각처리됩니다.")
    }

    const attendaceList = getAttendaceList()
    for (let i = attendaceList.length - 1; i >= 0; i--) {
        let attendace = attendaceList[i]
        if (attendace.attendID == attendID) {
            attendace.attentTime = newAttentTime
            attendace.leaveTime = newLeaveTime
            attendaceList[i] = attendace
            setAttendaceList(attendaceList)
            AttendaceListView()
            return;
        };
    };
};

