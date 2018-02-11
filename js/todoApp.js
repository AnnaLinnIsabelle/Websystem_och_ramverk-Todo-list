/**
 * App for making a simple todo list
 * Author:
 *
 * @requires jQuery
 * @version 0.0.1
 */
var TodoApp = (function () {
    // Properties
    var i;
    var $list = $('#list'),
        $addButton = $('#addButton'),
        $saveButton = $('#saveButton'),
        $clearButton = $('#clearButton'),
        $inputField = $('#inputField');
    var todoIds = [];

    // Methods
    function removeRow(event) {
        var todoId = event.data.todoId;
        $('#' + todoId).remove();
        localStorage.removeItem(todoId);
        var index = todoIds.indexOf(todoId);
        todoIds.splice(index, 1);
    }

    function addTodo(todo=' ') {
        var inputTodo = ($inputField.val() ? $inputField.val() : todo);
            i++;
            id = 'todo-' + i;
            todoIds.push(id);
        var newTodo = $('<li></li>', {
            id: id
        });
        $('<span></span>', {
            contenteditable: "true"
        }).html(inputTodo).appendTo(newTodo);
        $('<a>&times;</a>').on('click', {todoId: id}, removeRow).appendTo(newTodo);
        $list.append(newTodo);
        $inputField.val('');
    }

    function saveList() {
        localStorage.setItem('todoIds', JSON.stringify(todoIds));
        localStorage.setItem('i', i);
        todoIds.forEach(function (todoId) {
            localStorage.setItem(todoId, $('#'+todoId).find('span').html())
        });
    }

    function loadList() {
        i = localStorage.getItem('i');
        todoIds = JSON.parse(localStorage.getItem('todoIds'));
        todoIds.forEach(function(id) {
            addTodo(localStorage.getItem(id),id);
        })
    }

    function clearList() {
        todoIds.forEach(function(id) {
            $('#'+id).find('span').html("   ");
        });
        localStorage.clear();
    }

    function init() {
        // Application init code
        if(localStorage.getItem('todoIds')) {
            loadList();
        } else {
            i = 0;
        }
        $addButton.on('click', addTodo);
        $saveButton.on('click', saveList);
        $clearButton.on('click', clearList);
    }

    return {
        init: init
    };

})();

TodoApp.init(); // Run application