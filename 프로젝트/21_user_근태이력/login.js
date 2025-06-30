
function testbtn() {
    const loginInput = document.querySelector('.login');
    const passwordInput = document.querySelector('.password');
    const login = loginInput.value;
    const pass = passwordInput.value;

    const obj = { login , pass : Number(pass) };
    
    let borlist = localStorage.getItem('borlist');
    if(borlist == null) {borlist =[] }
    else{ borlist = JSON.parse(borlist) ; }

    obj.no = borlist.length == 0 ? 1 : borlist[borlist.length-1].no +1;
    borlist.push(obj);
    localStorage.setItem('borlist' , JSON.stringify(borlist) );
    alert('테스트용');
    location.href = 'attendMember.html'
}