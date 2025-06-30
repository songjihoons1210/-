const employees = [];
let ecode = 50001;

// 직원 등록 버튼 클릭 시 새로운 직원 추가
const newMemberBtn = document.querySelector('.newmember');
newMemberBtn.addEventListener('click', () => {
  const employee = {
    ecode: ecode++,
    ename: '입력',
    ebirth: '입력',
    edept: '입력',
    eposition: '입력',
    ephone: '입력',
    eemail: '입력'
  };
  employees.push(employee);
  renderRow(employee);
});

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
  const index = employees.findIndex(e => e.ecode === code);
  if (index !== -1) {
    employees.splice(index, 1);
    btn.closest('tr').remove();
  }
}

// 직원 수정
function editEmployee(code, btn) {
  const index = employees.findIndex(e => e.ecode === code);
  if (index === -1) return;
  const emp = employees[index];
  const tr = btn.closest('tr');
  tr.innerHTML = `
    <td>${emp.ecode}</td>
    <td><input class="form-control" value="${emp.ename}"/></td>
    <td><input type="date" class="form-control" value="${emp.ebirth}"/></td>
    <td><input class="form-control" value="${emp.edept}"/></td>
    <td><input class="form-control" value="${emp.eposition}"/></td>
    <td><input class="form-control" value="${emp.ephone}"/></td>
    <td><input class="form-control" value="${emp.eemail}"/></td>
    <td>
      <button type="button" class="btn btn-success btn-sm" onclick="saveEmployee(${emp.ecode}, this)">저장</button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="cancelEdit(${emp.ecode}, this)">취소</button>
    </td>
  `;
}

// 직원 저장
function saveEmployee(code, btn) {
  const index = employees.findIndex(e => e.ecode === code);
  if (index === -1) return;
  const tr = btn.closest('tr');
  const inputs = tr.querySelectorAll('input');
  employees[index] = {
    ecode: code,
    ename: inputs[0].value,
    ebirth: inputs[1].value,
    edept: inputs[2].value,
    eposition: inputs[3].value,
    ephone: inputs[4].value,
    eemail: inputs[5].value
  };
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
