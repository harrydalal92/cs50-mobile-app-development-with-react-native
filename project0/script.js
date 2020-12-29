const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

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
