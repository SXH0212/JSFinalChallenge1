const inputTodo = document.querySelector('.input_text');
const btnAdd = document.querySelector('.btn_add');
const todoList = document.querySelector('.list');
const allTodo = document.querySelector('.allTodo');
const willDone = document.querySelector('.willDone');
const done = document.querySelector('.done');
const tabs = document.querySelectorAll('.tab li');
const listFooter = document.querySelector('.list_footer p');
const listFooterBtn = document.querySelector('.list_footer a');

let todoData = [];
let willDoneCount = 0;

// 新增待辦
btnAdd.addEventListener('click', function () {
  tabs.forEach(item => item.classList.remove('active'));
  allTodo.classList.add('active');
  let array = {};
  if (inputTodo.value === '') {
    alert('不得輸入為空資料');
    return;
  }
  array.todoText = inputTodo.value;
  array.isDone = false;
  todoData.push(array);
  renderData();
  inputTodo.value = '';
  willDoneCount++;
  listFooter.textContent = `${willDoneCount} 個待完成項目`;
})


// 切換頁籤active
// 遍歷每個 <li>，添加點擊事件
tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    // 移除所有元素的 active 類名
    tabs.forEach(item => item.classList.remove('active'));
    // 為當前點擊的元素添加 active 類名
    e.target.classList.add('active');

    if (e.target.classList.contains('allTodo')) {
      renderData();
    }
    else if (e.target.classList.contains('willDone')) {
      willDoneData();
    }
    else if (e.target.classList.contains('done')) {
      doneData();
    }
  });
});


// 渲染已完成頁面
function doneData() {
  let str = '';
  todoData.forEach((item, index) => {
    if (item.isDone === true) {
      str += `<li>
      <label class="checkbox" for="">
        <input type="checkbox" data-index=${index} checked/>
        <span>${item.todoText}</span>
      </label>
      <a href="#" class="delete" data-a=${index}></a>
    </li>`;
    }
  });
  todoList.innerHTML = str;
}

// 渲染未完成頁面
function willDoneData() {
  let str = '';
  todoData.forEach((item, index) => {
    if (item.isDone === false) {
      str += `<li>
      <label class="checkbox" for="">
        <input type="checkbox" data-index=${index}/>
        <span>${item.todoText}</span>
      </label>
      <a href="#" class="delete" data-a=${index}></a>
    </li>`;
    }
  });
  todoList.innerHTML = str;
}

// 渲染全部頁面
function renderData() {
  let str = '';
  todoData.forEach((item, index) => {
    if (item.isDone === true) {
      str += `<li>
      <label class="checkbox" for="">
        <input type="checkbox" data-index=${index} checked/>
        <span>${item.todoText}</span>
      </label>
      <a href="#" class="delete" data-a=${index}></a>
    </li>`;
    } else {
      str += `<li>
      <label class="checkbox" for="">
        <input type="checkbox" data-index=${index}/>
        <span>${item.todoText}</span>
      </label>
      <a href="#" class="delete" data-a=${index}></a>
    </li>`;
    }
  });
  todoList.innerHTML = str;
}

// toggle是否完成
todoList.addEventListener('click', function (e) {
  if (e.target.getAttribute('type') === 'checkbox') {
    let dataIndex = parseInt(e.target.getAttribute('data-index'));
    todoData[dataIndex].isDone = e.target.checked;
    // 取消勾選
    if (e.target.checked === false) {
      willDoneCount++;
      if (done.classList.contains('active')) {
        doneData();
      }
    } else if (e.target.checked === true) {
      willDoneCount--;
      if (willDone.classList.contains('active')) {
        willDoneData();
      }
    }
    listFooter.textContent = `${willDoneCount} 個待完成項目`;
  }

  // 用XX按鈕刪除項目
  if (e.target.getAttribute('class') === 'delete') {
    let dataIndex = parseInt(e.target.getAttribute('data-a'));
    if (todoData[dataIndex].isDone === false) {
      willDoneCount--;
      listFooter.textContent = `${willDoneCount} 個待完成項目`;
      if (willDone.classList.contains('active')) {
        todoData.splice(dataIndex, 1);
        willDoneData();
      } else if (done.classList.contains('active')) {
        todoData.splice(dataIndex, 1);
        doneData();
      } else {
        todoData.splice(dataIndex, 1);
        renderData();
      }
    } else {
      if (willDone.classList.contains('active')) {
        todoData.splice(dataIndex, 1);
        willDoneData();
      } else if (done.classList.contains('active')) {
        todoData.splice(dataIndex, 1);
        doneData();
      } else {
        todoData.splice(dataIndex, 1);
        renderData();
      }
    }
  }
})


// 清除已完成項目，在全部與待完成重新渲染todoData
listFooterBtn.addEventListener('click', function () {
  todoData = todoData.filter(function (item) {
    return item.isDone === false
  })
  if (allTodo.classList.contains('active')) {
    renderData();
  }
  else if (done.classList.contains('active')) {
    doneData();
  }
  willDoneCount = todoData.length;
  listFooter.textContent = `${willDoneCount} 個待完成項目`;
})