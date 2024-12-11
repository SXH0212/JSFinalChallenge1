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
  let array = {};
  array.todoText = inputTodo.value;
  array.isDone = false;
  todoData.push(array);
  renderData();
  inputTodo.value = '';
  willDoneCount++;
  listFooter.textContent = `${willDoneCount} 個待完成項目`;
})

// 全部
allTodo.addEventListener('click', function () {
  renderData();
})

// 待完成
willDone.addEventListener('click', function () {
  let str = '';
  todoData.forEach((item, index) => {
    if (item.isDone === false) {
      str += `<li>
      <label class="checkbox" for="">
        <input type="checkbox" data-index=${index}/>
        <span>${item.todoText}</span>
      </label>
      <a href="#" class="delete"></a>
    </li>`;
    }
  });
  todoList.innerHTML = str;
})

// 已完成
done.addEventListener('click', function () {
  let str = '';
  todoData.forEach((item, index) => {
    if (item.isDone === true) {
      str += `<li>
      <label class="checkbox" for="">
        <input type="checkbox" data-index=${index} checked/>
        <span>${item.todoText}</span>
      </label>
      <a href="#" class="delete"></a>
    </li>`;
    }
  });
  todoList.innerHTML = str;
})

// toggle是否完成
todoList.addEventListener('click', function (e) {
  if (e.target.getAttribute('type') === 'checkbox') {
    let dataIndex = parseInt(e.target.getAttribute('data-index'));
    todoData[dataIndex].isDone = e.target.checked;
    if (e.target.checked === false) {
      willDoneCount++;
    } else {
      willDoneCount--;
    }
  }
  listFooter.textContent = `${willDoneCount} 個待完成項目`;
})

function renderData() {
  let str = '';
  todoData.forEach((item, index) => {
    if (item.isDone === true) {
      str += `<li>
      <label class="checkbox" for="">
        <input type="checkbox" data-index=${index} checked/>
        <span>${item.todoText}</span>
      </label>
      <a href="#" class="delete"></a>
    </li>`;
    } else {
      str += `<li>
      <label class="checkbox" for="">
        <input type="checkbox" data-index=${index}/>
        <span>${item.todoText}</span>
      </label>
      <a href="#" class="delete"></a>
    </li>`;
    }
  });
  todoList.innerHTML = str;
}


// 切換頁籤active
// 遍歷每個 <li>，添加點擊事件
tabs.forEach(tab => {
  tab.addEventListener('click', (e) => {
    // 移除所有元素的 active 類名
    tabs.forEach(item => item.classList.remove('active'));

    // 為當前點擊的元素添加 active 類名
    e.target.classList.add('active');
  });
});


listFooterBtn.addEventListener('click', function () {
  const newTodoData = todoData.filter(function (item) {
    return item.isDone === false
  })
  todoData = newTodoData;
  renderData();
})