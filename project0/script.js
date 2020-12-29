const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let totalTodosCount = 0
let totalUncheckedTodos = 0
let id = 0

function newTodo() {
  let textOfNewTodo = prompt("Title of you New Todo: ")

  if (textOfNewTodo.length > 0) {
  	totalTodosCount++
    totalUncheckedTodos++
    itemCountSpan.innerHTML = totalTodosCount
    uncheckedCountSpan.innerHTML = totalUncheckedTodos
    
    createTodo(textOfNewTodo)
  }
}

function createTodo(text) {
	let todoListItem = document.createElement('li')
  id++
	todoListItem.id = "todo"+id
	todoListItem.innerHTML = '<input type="checkbox" id="'+id+'" onClick="checkTodo('+id+')" /> <span>'+text+'</span> <button onClick="deleteTodo('+id+')">Delete</button>'
	list.appendChild(todoListItem)
}

function checkTodo(id) {
  var currCheckBox = document.getElementById(id)
  if (currCheckBox.checked) {
    totalUncheckedTodos = totalUncheckedTodos - 1
  } else {
    totalUncheckedTodos = totalUncheckedTodos + 1
  }
  uncheckedCountSpan.innerHTML = totalUncheckedTodos
}

function deleteTodo(id) {

  var currTodoListItem = document.getElementById("todo"+id)
  var currCheckBox = document.getElementById(id)

  totalTodosCount = totalTodosCount -1
  itemCountSpan.innerHTML = totalTodosCount

  if (!currCheckBox.checked) {
    totalUncheckedTodos = totalUncheckedTodos - 1
    uncheckedCountSpan.innerHTML = totalUncheckedTodos
  }

  list.removeChild(currTodoListItem)
}
