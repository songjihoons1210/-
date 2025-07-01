
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
        
        
    }
    
}

