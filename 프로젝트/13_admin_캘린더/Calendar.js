// 현재 연도와 월 설정
let currentYear = 2025;
let currentMonth = 6;

// 공휴일 및 일정 데이터
let contentArray = [
  { cno: 1, content: '어린이날,부처님오신날', date: '2025-5-5', color: 'red' },
  { cno: 2, content: '대체휴일', date: '2024-5-6', color: 'red' },
  { cno: 3, content: '제21대 대통령선거', date: '2025-6-3', color: 'red' },
  { cno: 4, content: '현충일', date: '2025-6-6', color: 'red' }
];

// 달력 출력 함수
function calPrint() {
  // 상단에 년/월 텍스트 설정
  const h6 = document.getElementById('monthText');
  h6.textContent = `${currentYear}년 ${currentMonth.toString().padStart(2, '0')}월`;

  const calBottom = document.getElementById('calBottom');

  // 요일 표시 (일~토)
  let html = `
    <div class="week sunday">일</div><div class="week">월</div><div class="week">화</div>
    <div class="week">수</div><div class="week">목</div><div class="week">금</div><div class="week thuday">토</div>`;

  // 해당 월의 1일 요일 (0=일요일~6=토요일)
  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();

  // 해당 월의 마지막 날짜
  const lastDate = new Date(currentYear, currentMonth, 0).getDate();

  // 시작 요일 전까지 빈 칸 채우기
  for(let i = 0; i < firstDay; i++) html += `<div></div>`;

  // 출근/지각 데이터 가져오기
  const monthlyData = getMonthlyData(currentYear, currentMonth);
  const 출근 = monthlyData.출근;
  const 지각 = monthlyData.지각;

  // 날짜별 셀 생성
  for(let day = 1; day <= lastDate; day++) {
    const dateStr = `${currentYear}-${currentMonth}-${day}`;
    const weekDay = new Date(currentYear, currentMonth - 1, day).getDay(); // 0:일, 6:토

    let dayContent = '';
    let isHoliday = false;

    // contentArray에 해당 날짜가 있으면 공휴일로 간주
    for (let plan of contentArray) {
      if (plan.date === dateStr) {
        isHoliday = true;
        dayContent += `<span style="color:${plan.color}; font-size:1.0em; font-weight:bold">${plan.content}</span>`;
        break;
      }
    }

    // 평일이면서 공휴일이 아닐 경우 출근/지각 정보 표시
    if (weekDay !== 0 && weekDay !== 6 && !isHoliday) {
      const 출근값 = 출근[day - 1] ?? 0;
      const 지각값 = 지각[day - 1] ?? 0;

      dayContent += `<div style="color:black">출근: ${출근값}명</div>`;
      dayContent += `<div style="color:black">지각: ${지각값}명</div>`;
    }

    // 최종 HTML에 날짜 셀 추가
    html += `<div class='dayEdit'>${day}<br>${dayContent}</div>`;
  }

  // 달력 본문 출력
  calBottom.innerHTML = html;
}

// 월별 출근/지각 데이터 생성 함수
function getMonthlyData(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate(); // 월 마지막 일자

  const 출근 = [];
  const 지각 = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const weekDay = date.getDay(); // 0:일, 6:토

    if (weekDay === 0 || weekDay === 6) {
      // 주말은 출근/지각 0으로 설정
      출근.push(0);
      지각.push(0);
    } else {
      // 월~금에 대한 패턴별 데이터 생성
      const 출근값 = month === 5  // 5월달 출근 차트 값
        ? [5, 10, 3, 8, 2, 15, 20][(day - 1) % 7]
        : month === 6            // 6월달 출근 차트 값
          ? [20, 18, 22, 25, 27][(day - 1) % 5]
          : Math.floor(Math.random() * 30); // 5,6월 제외 한 나머지 출근 랜덤값

      const 지각값 = month === 5 // 5월달 지각 차트 값
        ? [2, 4, 6, 1, 0, 3, 2][(day - 1) % 7]
        : month === 6           // 6월달 지각 차트 값
          ? [0, 1, 2, 1, 0][(day - 1) % 5]
          : Math.floor(Math.random() * 10); // 5,6월 제외한 나머지 지각 랜덤값

      출근.push(출근값);
      지각.push(지각값);
    }
  }

  return { 출근, 지각 };
}

// 차트 초기화
const ctx = document.getElementById('myChart');
let myChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: [],     // x축 레이블 (날짜)
    datasets: []    // 데이터셋 (출근, 지각)
  },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: true } } // y축 0부터 시작
  }
});

// 월 변경 함수 (이전/다음 버튼 클릭 시 실행)
function monthChange(direction) {
  // 방향에 따라 월 변경 (1:다음월, -1:이전월)
  currentMonth += direction;

  // 월 범위를 벗어나면 연도도 조정
  if(currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  } else if(currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  }

  // 달력 다시 그리기
  calPrint();

  // 새로운 월의 출근/지각 데이터로 차트 갱신
  const days = new Date(currentYear, currentMonth, 0).getDate();
  const newData = getMonthlyData(currentYear, currentMonth);

  myChart.data.labels = Array.from({length: days}, (_, i) => (i+1).toString());
  myChart.data.datasets = [
    { label: '출근', data: newData.출근, borderColor: 'blue', fill: false },
    { label: '지각', data: newData.지각, borderColor: 'red', fill: false }
  ];
  myChart.update();
}

// 초기 로딩 시 캘린더와 차트 표시
window.onload = () => {
  calPrint();       // 달력 출력
  monthChange(0);   // 차트 초기화 (현재월 기준)
};


function chartEdit(){
  getAttendaceList()
};