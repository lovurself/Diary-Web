const todoForm = document.querySelector('.todo_form');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('.todo_list');

const TODOS_KEY = 'todos';
let todos = []; // 원래 빈 배열이지만 저장소에 todos가 있다면 todos의 값이 바뀌어야 하므로 let으로 선언

const saveTodos = () => {
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos)); // JSON.stringify는 localStorage에 배열처럼 저장할 수 있게 함
}

const plusTodo = (newTodoObj) => {
    const todoItem = document.createElement('li');
    todoItem.id = newTodoObj.id;
    const todoDone = document.createElement('span');
    const todoItemText = document.createElement('span');
    const removeTodo = document.createElement('i');
    removeTodo.classList.add("fas", "fa-trash-alt")
    removeTodo.addEventListener('click', (e) => {
        const li = e.target.parentElement;
        todos = todos.filter(todo => todo.id !== parseInt(li.id));
        li.remove();
        saveTodos(); // localStorage의 데이터를 새롭게 저장
    })
    todoItem.appendChild(todoDone);
    todoItem.appendChild(todoItemText); // appendChild는 부모 노드의 마지막 자식 노드 다음에 넣어줄 것을 지정
    todoItem.appendChild(removeTodo);
    todoItemText.innerText = newTodoObj.text;
    todoList.appendChild(todoItem);

    // todo Done
    const checkedBtn = document.createElement('i');
    checkedBtn.classList.add('fas', 'fa-check');
    todoDone.appendChild(checkedBtn);

    const onTodoDone = (e) => {
        e.preventDefault();
        todoDone.classList.toggle('done');
    }
    todoDone.addEventListener('click', onTodoDone);
}

const todoSubmit = e => {
    e.preventDefault();
    const newTodo = todoInput.value;
    const newTodoObj = {
        id: Date.now(),
        text: newTodo
    }
    todoInput.value = '';
    todos.push(newTodoObj);
    plusTodo(newTodoObj);
    saveTodos();
}

todoForm.addEventListener('submit', todoSubmit);

const savedTodos = localStorage.getItem(TODOS_KEY);

if (savedTodos) {
    const parsedTodos = JSON.parse(savedTodos);
    todos = parsedTodos; // savedTodos가 있다면 빈 배열이었던 todos를 parsedTodos로 변경해서 저장된 todos를 가져옴
    parsedTodos.forEach(plusTodo);
}