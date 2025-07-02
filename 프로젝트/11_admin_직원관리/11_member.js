    const member = JSON.parse(localStorage.getItem('member')) || [];
    let memberID = member.length > 0 ? Math.max(...member.map(m => Number(m.memberID))) + 1 : 50001;
    
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


    document.querySelector('.newmember').addEventListener('click', () => {
    const newMember = {
        memberID: memberID++,
        Name: '이름',
        Birthday: '생년월일',
        departID: '부서',
        posiID: '직급',
        Call: '연락처',
        Email: '이메일'
    };
    member.push(newMember);
    saveToLocalStorage();
    MemberListView_local();
    });

    function MemberListView_local() {
    const tbody = document.querySelector('tbody');
    let html = '';
    member.forEach(m => {
        html += `
        <tr>
            <td>${m.memberID}</td>
            <td>${m.Name}</td>
            <td>${m.Birthday}</td>
            <td>${m.departID}</td>
            <td>${m.posiID}</td>
            <td>${m.Call}</td>
            <td>${m.Email}</td>
            <td>
            <button class="btn btn-primary btn-sm" onclick="editMember(${m.memberID}, this)">수정</button>
            <button class="btn btn-danger btn-sm" onclick="deleteMember(${m.memberID}, this)">삭제</button>
            </td>
        </tr>
        `;
    });
    tbody.innerHTML = html;
    }

    function editMember(id, btn) {
    const index = member.findIndex(m => m.memberID === id);
    if (index == -1) return;

    const m = member[index];
    const tr = btn.closest('tr');
    tr.innerHTML = `
        <td>${m.memberID}</td>
        <td><input value="${m.Name}"></td>
        <td><input value="${m.Birthday}"></td>
        <td><input value="${m.departID}"></td>
        <td><input value="${m.posiID}"></td>
        <td><input value="${m.Call}"></td>
        <td><input value="${m.Email}"></td>
        <td>
        <button class="btn btn-success btn-sm" onclick="saveMember(${m.memberID}, this)">저장</button>
        <button class="btn btn-secondary btn-sm" onclick="cancelEdit(${m.memberID}, this)">취소</button>
        </td>
    `;
    }

    function saveMember(id, btn) {
    const index = member.findIndex(m => m.memberID === id);
    if (index === -1) return;

    const tr = btn.closest('tr');
    const inputs = tr.querySelectorAll('input');

    member[index] = {
        memberID: id,
        Name: inputs[0].value,
        Birthday: inputs[1].value,
        departID: inputs[2].value,
        posiID: inputs[3].value,
        Call: inputs[4].value,
        Email: inputs[5].value
    };
    saveToLocalStorage();
    MemberListView_local();
    }

    function cancelEdit(id, btn) {
    MemberListView_local();
    }

    function deleteMember(id, btn) {
    const index = member.findIndex(m => m.memberID === id);
    if (index !== -1) {
        member.splice(index, 1);
        saveToLocalStorage();
        MemberListView_local();
    }
    }

    function saveToLocalStorage() {
    localStorage.setItem('member', JSON.stringify(member));
    }

