
let information = [];
function gotowork() {
    const staffnameInput = document.querySelector('.staffname');
    const employeeInput = document.querySelector('.employee');
    const birthdateInput = document.querySelector('.birthdate');
    const positionInput = document.querySelector('.position');
    const postInput = document.querySelector('.post');
    const emailInput = document.querySelector('.email');
    const phonenumInput = document.querySelector('.phonenum');

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

    information.push(obj);
    alert('일단 출근');

    attendMem();
}

function attendMem() {
    const attendance = document.querySelector('.attendance');
    let html = [];
}