let currentYear = 2025;
let currentMonth = 6;

// 일정 데이터 예시
let contentArray = [
  { cno: 1, content: '어린이날,부처님오신날', date: '2025-5-5', color: 'red' },
  { cno: 2, content: '대체휴일', date: '2024-5-6', color: 'red' },
  { cno: 3, content: '제21대 대통령선거', date: '2025-6-3', color: 'red' },
  { cno: 4, content: '현충일', date: '2025-6-6', color: 'red' }
];

// 달력 출력 함수
function calPrint() {
  const h6 = document.getElementById('monthText');
  h6.textContent = `${currentYear}년 ${currentMonth.toString().padStart(2, '0')}월`;

  const calBottom = document.getElementById('calBottom');
  let html = `
    <div class="week sunday">일</div><div class="week">월</div><div class="week">화</div>
    <div class="week">수</div><div class="week">목</div><div class="week">금</div><div class="week thuday">토</div>`;

  const firstDay = new Date(currentYear, currentMonth - 1, 1).getDay();
  const lastDate = new Date(currentYear, currentMonth, 0).getDate();

  for(let i = 0; i < firstDay; i++) html += `<div></div>`;

  const monthlyData = getMonthlyData(currentYear, currentMonth);
  const 출근 = monthlyData.출근;
  const 지각 = monthlyData.지각;

  for(let day = 1; day <= lastDate; day++) {
    const dateStr = `${currentYear}-${currentMonth}-${day}`;
    const weekDay = new Date(currentYear, currentMonth - 1, day).getDay(); // 0:일, 6:토

    let dayContent = '';
    let isHoliday = false;

    // 공휴일 (contentArray에 있는 일정 확인)
    for (let plan of contentArray) {
      if (plan.date === dateStr) {
        isHoliday = true;
        dayContent += `<span style="color:${plan.color}; font-size:1.0em; font-weight:bold">${plan.content}</span>`;
        break;
      }
    }

    // ✅ 출근/지각 표시 조건: 평일 + 공휴일 아님
    if (weekDay !== 0 && weekDay !== 6 && !isHoliday) {
      const 출근값 = 출근[day - 1] ?? 0;
      const 지각값 = 지각[day - 1] ?? 0;

      dayContent += `<div style="color:black">출근: ${출근값}명</div>`;
      dayContent += `<div style="color:black">지각: ${지각값}명</div>`;
    }

    html += `<div class='dayEdit'>${day}<br>${dayContent}</div>`;
  }

  calBottom.innerHTML = html;
}


// 월별 출근/지각 데이터 생성 함수
function getMonthlyData(year, month) {
  const daysInMonth = new Date(year, month, 0).getDate();

  const 출근 = [];
  const 지각 = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day);
    const weekDay = date.getDay(); // 0:일, 6:토

    if (weekDay === 0 || weekDay === 6) {
      출근.push(0);
      지각.push(0);
    } else {
      // 예시 패턴 (월~금만 적용)
      const 출근값 = month === 5
        ? [5, 10, 3, 8, 2, 15, 20][(day - 1) % 7]
        : month === 6
          ? [20, 18, 22, 25, 27][(day - 1) % 5]
          : Math.floor(Math.random() * 30);

      const 지각값 = month === 5
        ? [2, 4, 6, 1, 0, 3, 2][(day - 1) % 7]
        : month === 6
          ? [0, 1, 2, 1, 0][(day - 1) % 5]
          : Math.floor(Math.random() * 10);

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
  data: { labels: [], datasets: [] },
  options: {
    responsive: true,
    scales: { y: { beginAtZero: true } }
  }
});

// 월 변경 함수 (캘린더 + 차트 모두 반영)
function monthChange(direction) {
  currentMonth += direction;
  if(currentMonth < 1) {
    currentMonth = 12;
    currentYear--;
  } else if(currentMonth > 12) {
    currentMonth = 1;
    currentYear++;
  }

  calPrint();

  const days = new Date(currentYear, currentMonth, 0).getDate();
  const newData = getMonthlyData(currentYear, currentMonth);

  myChart.data.labels = Array.from({length: days}, (_, i) => (i+1).toString());
  myChart.data.datasets = [
    { label: '출근', data: newData.출근, borderColor: 'blue', fill: false },
    { label: '지각', data: newData.지각, borderColor: 'red', fill: false }
  ];
  myChart.update();
}

// 초기 로드 시 캘린더와 차트 표시
window.onload = () => {
  calPrint();
  monthChange(0);
};