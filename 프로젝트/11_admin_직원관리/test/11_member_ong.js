MemberListView()
const MemberList = getMemberList()
function MemberListView() {
    let tbody = document.querySelector('.tbody')
    let html = ``;    
    for (let i = 0; i <= MemberList.length - 1; i++) {
        let member = MemberList[i]
        html += `<tr>
                        <td scope="row">${member.memberID}</td>
                        <td>${member.Name}</td>
                        <td>${member.Birthday}</td>
                        <td>${member.departID}</td>
                        <td>${member.posiID}</td>
                        <td>${member.Call}</td>
                        <td>${member.Email}</td>
                        <td>
                        <button type="button" class="btn btn-primary btn-sm" onclick="editEmployee(${member.memberID}, this)">수정</button>
                        <button type="button" class="btn btn-danger btn-sm" onclick="deleteEmployee(${member.memberID}, this)">삭제</button>
                        </td>
                        </tr>`
    };
    tbody.innerHTML = html;
};

// 모달 내의 부서 선택 
let departSelect = document.querySelector('.departSelect')
const DepartmentList = getDepartmentList()
let html_depart = ``
for (let i = 1; i < DepartmentList.length; i++) {
    Department = DepartmentList[i]
    html_depart += `<option value=${Department.departID}>${Department.departName}</option>`
}
departSelect.innerHTML = html_depart

// 모달 내의 직급 선택
let posiSelect = document.querySelector('.posiSelect')
const PositionList = getPositionList()
let html_posi = ``
for (let i = 1; i < PositionList.length; i++) {
    position = PositionList[i]
    html_posi += `<option value=${position.posiID}>${position.posiName}</option>`
}
posiSelect.innerHTML = html_posi

// 신규직원 저장
function saveNewMember(){
    
    if (MemberList.length == 0) {
        memberID = 1
    } else (
        memberID = MemberList[MemberList.length - 1].memberID + 1
    )

    for (let i = 0 ; i < MemberList.length; i++){

    }
    // memberID	Name	Birthday	Call	Email	posiID	departID	pwd
}