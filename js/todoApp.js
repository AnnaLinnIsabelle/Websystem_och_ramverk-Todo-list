/**
 * App for making a simple todo list
 * Author: 
 *
 * @requires jQuery
 * @version 0.0.1
 */
var TodoApp = ( function() {
    // Properties
    var i;
    var list = $('#list');
    var todoIds = [];

    // Methods


    function removeRow(event) {
        console.log(event.data.todoId);
        $('#'+event.data.todoId).remove();
    }

    function init() {
        // Application init code
        // The application is initialized with 12 "empty to-dos"
        i = 0;
        for (j=0; j<12; j++) {
            i++;
            var emptyTodo = $('<li></li>', {
                id: "todo-" + i
            });
            $('<a>&times;</a>', {
                href: "#"
            }).appendTo(emptyTodo);
            $('<span></span>').appendTo(emptyTodo);
            $(list).append(emptyTodo);
            todoIds.push("todo-"+i);
        }


        $(function(){
            todoIds.forEach(function(todoId){
                $('#'+todoId).find("a").click({todoId: todoId}, removeRow);
            });
        });



    }
    return {
        init : init
    };
  
} )();

TodoApp.init(); // Run application