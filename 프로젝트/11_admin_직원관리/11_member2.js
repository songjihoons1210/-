const employees = JSON.parse(localStorage.getItem('employees')) || [];
let ecode = employees.length > 0 ? Math.max(...employees.map(e => Number(e.ecode))) + 1 : 50001;

// 페이지 로드시 기존 데이터 출력
window.addEventListener('DOMContentLoaded', () => {
  employees.forEach(emp => renderRow(emp));
});

// 직원 등록 버튼 클릭 시 새로운 직원 추가
const newMemberBtn = document.querySelector('.newmember');
newMemberBtn.addEventListener('click', () => {
  const employee = {
    ecode: ecode++,
    ename: '이름',
    ebirth: '생년월일',
    edept: '부서',
    eposition: '직급',
    ephone: '연락처',
    eemail: '이메일'
  };
  employees.push(employee);
  saveToLocalStorage();
  renderRow(employee);
});

// 로컬스토리지 저장 함수
function saveToLocalStorage() {
  localStorage.setItem('employees', JSON.stringify(employees));
}

// 직원 한 명의 행 생성
function renderRow(emp) {
  const tbody = document.querySelector('tbody');
  const tr = document.createElement('tr');
  tr.innerHTML = `
    <td>${emp.ecode}</td>
    <td>${emp.ename}</td>
    <td>${emp.ebirth}</td>
    <td>${emp.edept}</td>
    <td>${emp.eposition}</td>
    <td>${emp.ephone}</td>
    <td>${emp.eemail}</td>
    <td>
      <button type="button" class="btn btn-primary btn-sm" onclick="editEmployee(${emp.ecode}, this)">수정</button>
      <button type="button" class="btn btn-danger btn-sm" onclick="deleteEmployee(${emp.ecode}, this)">삭제</button>
    </td>
  `;
  tbody.appendChild(tr);
}

// 직원 삭제
function deleteEmployee(code, btn) {
  const index = employees.findIndex(e => e.ecode == code);
  if (index != -1) {
    employees.splice(index, 1);
    saveToLocalStorage();
    btn.closest('tr').remove();
  }
}

// 직원 수정
function MemberListView(code, btn) {
  const index = member.findIndex(e => e.member == code);
  if (index == -1) return;
  const member = member[index];
  const tr = btn.closest('tr');
  tr.innerHTML = `
    <td><input class="form" value="${member.memberID}"/></td>
    <td><input class="form" value="${member.Name}"/></td>
    <td><input class="form" value="${member.Birthday}"/></td>
    <td><input class="form" value="${member.departID}"/></td>
    <td><input class="form" value="${member.posiID}"/></td>
    <td><input class="phone" value="${member.Call}"/></td>
    <td><input class="email" value="${member.Email}"/></td>
    <td>
      <button type="button" class="btn btn-success btn-sm" onclick="saveEmployee(${member.memberID}, this)">저장</button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="cancelEdit(${member.memberID}, this)">취소</button>
    </td>} 
  `;

  tbody.innerHTML = html;
}





MemberListView()
function MemberListView() {
    let tbody = document.querySelector('.tbody')
    let html = ``;
    const MemberList = getMemberList()
    for (let i = 0; i<= MemberList.length - 1; i++) {
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


// 직원 저장
function saveMember(code, btn) {
  const index = member.findIndex(e => e.member == code);
  if (index == -1) return;
  const tr = btn.closest('tr');
  const inputs = tr.querySelectorAll('input');
  member[index] = {
    ecode: inputs[0].value,
    ename: inputs[1].value,
    ebirth: inputs[2].value,
    edept: inputs[3].value,
    eposition: inputs[4].value,
    ephone: inputs[5].value,
    eemail: inputs[6].value
  };
  saveToLocalStorage();
  tr.remove();
  renderRow(employees[index]);
}

// 수정 취소 시 원래 데이터로 다시 표시
function cancelEdit(code, btn) {
  const emp = employees.find(e => e.ecode === code);
  if (!emp) return;
  const tr = btn.closest('tr');
  tr.remove();
  renderRow(emp);
}