function main (){
  console.clear();

  { 
    const today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();

    function getCalendarHead() {
      const dates = [];
      const d = new Date(year, month, 0).getDate();
      const n = new Date(year, month, 1).getDay();

      for (let i = 0; i < n; i++) {
        dates.unshift({
          date: d - i,
          isToday: false,
          isDisabled: true,
        });
      }
      return dates;
    }

    function getCalendarTail() {
      const dates = [];
      const lastDay = new Date(year, month + 1, 0).getDay();

      for (let i = 1; i < 7 - lastDay; i++) {
        dates.push({
          date: i,
          isToday: false,
          isDisabled: true,
        });
      }
      
      return dates;
    }


    function getCalendarBody() {
      const dates =[];
      const lastDate = new Date(year, month + 1, 0).getDate();

      for(let i = 1; i <= lastDate; i++){
        dates.push({
          date: i,
          isToday: false,
          isDisabled: false,
        });
      }
      if (year === today.getFullYear() && month === today.getMonth()) {
        dates[today.getDate() - 1].isToday = true;
      }
      
      return dates;
    }
    function renderTitle() {
      const title = `${year}/${String(month + 1).padStart(2, '0')}`;
      document.getElementById('title').textContent = title;
    }

    function clearCalendar() {
      const tbody = document.querySelector('tbody');
      while (tbody.firstChild){
        tbody.removeChild(tbody.firstChild);
      }
    }

    function renderWeeks() {
      const dates = [
        ...getCalendarHead(),
        ...getCalendarBody(),
        ...getCalendarTail(),
      ];
      const weeks = [];
      const weeksCount = dates.length / 7;

      for( let i = 0; i < weeksCount; i++){
        weeks.push(dates.splice(0, 7))
      }
      weeks.forEach(week => {
        const tr = document.createElement('tr');
        week.forEach(date => {
          const td = document.createElement('td');

          td.textContent = date.date;
          if (date.isToday) {
            td.classList.add('today');
          }
          if (date.isDisabled) {
            td.classList.add('disabled');
          }

          tr.appendChild(td);
        });
        document.querySelector('tbody').appendChild(tr);
      });
    }

    function createCalendar() {
      clearCalendar();
      renderTitle();
      renderWeeks();
      getDays();
    }

    document.getElementById('prev').addEventListener('click', () => {
      month--;
      if(month < 0) {
        year--;
        month = 11;
      }
      createCalendar();
    });
    document.getElementById('next').addEventListener('click', () => {
      month++;
      if(month > 11) {
        year++;
        month = 0;
      }
      createCalendar();
    });
    
    createCalendar();

    function getDays() {
      let myTbl = document.getElementById('days');
      for (let i=0;i<myTbl.rows.length;i++){
        for(let j=0;j<myTbl.rows[i].cells.length; j++){
          let Cells=myTbl.rows[i].cells[j];
          Cells.onclick = function(){
            direction(this);
          }
        }
      } 
    }
    
    function direction(Cell){
      let nowClass = Cell.className;
      let rowINX = Cell.parentNode.rowIndex;
      let cellVal = Cell.innerHTML;
      let year_month = document.getElementById('title').innerHTML;
      let year = year_month.slice(0,4);
      let month = year_month.slice(5);
      let date_string = `${year}-${month}-${cellVal.padStart(2, '0')}`;
      if (nowClass != "disabled"){
        if (rowINX > 1 ){
          createHTML(date_string);
        }
      }
    }
    //HTML要素を作成して、追加するメソッド
    function createHTML (date_string) {
      const ParentNode = document.getElementById('select_days');

      //選択フォームを作成する元となるul要素を生成
      const SecondParentUl = document.createElement('ul');
      SecondParentUl.setAttribute('id', "add_date_style");
      let ulElementNum = document.querySelectorAll('#add_date_style').length;

      //inputの親となるli要素の生成
      const inputParentLi = document.createElement('li');
      inputParentLi.setAttribute('class', "date_input");

      //input要素の生成
      const inputHTML = document.createElement('input');
      inputHTML.setAttribute('id', `date_input_${ulElementNum}`);
      inputHTML.setAttribute('name', "date[date][]");
      inputHTML.setAttribute('value', date_string);
      inputHTML.setAttribute('type', 'date');
      inputHTML.setAttribute('style', 'width:150px;');
      inputHTML.setAttribute('style', 'font-size:12px;');

      //selectの親となるli要素の生成
      const selectParentLi = document.createElement('li');
      selectParentLi.setAttribute('class', "date_time");

      //select要素の生成
      const selectHTML = document.createElement('select');
      selectHTML.setAttribute('name', 'date[time][]');
      selectHTML.setAttribute('id', `time_select_${ulElementNum}`);
      selectHTML.setAttribute('style', `width:80px;`);
      
      
      //削除の親となるli要素の生成
      const deleteParentLi = document.createElement('li');
      deleteParentLi.setAttribute('class', 'delete');

      // 削除機能をつけるa要素の生成
      const deleteHTML = document.createElement('a');
      deleteHTML.setAttribute('href', '#');
      deleteHTML.innerText = "削除";
      // 要素を追加
      ParentNode.appendChild(SecondParentUl);
      SecondParentUl.appendChild(inputParentLi);
      SecondParentUl.appendChild(selectParentLi);
      SecondParentUl.appendChild(deleteParentLi);
      inputParentLi.appendChild(inputHTML);
      selectParentLi.appendChild(selectHTML);
      deleteParentLi.appendChild(deleteHTML);
      
      // option要素の追加

      // option要素の作成（下記オリジンを複製してループ内の要素を追加）
      const optionOriginHTML = document.createElement('option');
      for (let i=0;i<49;i++){
        let optionHTML = optionOriginHTML.cloneNode(true);
        //optionの選択肢の作成 i÷２をした時の商を時間、余りを分として表示させたい。例)12:00
        let selectHour = Math.floor(i/2);
        let selectMinute = Math.floor(i%2);
        let optionText = `${String(selectHour)}:${String(selectMinute*30).padStart(2, '0')} ~`;
        let optionValue = `${String(selectHour).padStart(2, '0')}:${String(selectMinute*30).padStart(2, '0')}`;
        
        if (i === 0){
          // 最初の未選択の場合の項目を作成
          optionHTML.innerText = "----";
          optionHTML.setAttribute('value', "---");
        } else if(i=== 39){
          // 反映した時に表示したい時刻を設定するため
          optionHTML.setAttribute('value', optionValue);
          optionHTML.setAttribute('selected', true);
          optionHTML.innerText = optionText;
        } else {
          // 通常状態の設定
          optionHTML.setAttribute('value', optionValue);
          optionHTML.innerText = optionText;
        }
        // select要素にoption要素を追加
        selectHTML.appendChild(optionHTML);
      }
      removeHTML();
    }

    // 削除ボタンの実装
    function removeHTML(){
      let targetList = document.querySelectorAll('.delete');
      let targetUl = document.querySelectorAll('#add_date_style');
      let targetNum = targetList.length;
      for (let i=0; i < targetNum; i++){
        targetList[i].onclick = function(){
          return targetUl[i].remove();
        };
      };
    }
  }
};

window.addEventListener("load", main);

