var database = firebase.database().ref('/');
var input = document.getElementById('input')
var unOrderList = document.getElementById('list')

function add() {
    var todo = {
        item: input.value,
        todo: 'DONE'
    }
    database.child('todo').push(todo);
    input.value = '';
    input.focus();
}

database.child('todo').on("child_added", function (snapshot) {
    var demo = snapshot.val()
    demo.id = snapshot.key;
    render(demo)

});
function render(todo) {
    
    var list = document.createElement('LI')
    var tagText = document.createTextNode(todo.item);
    list.setAttribute('class', 'list-group-item');
    list.appendChild(tagText);      
    list.setAttribute('id',todo.id)

    // Span For delete button
    var spanNode = document.createElement('span');
    spanNode.setAttribute('class', 'glyphicon glyphicon-trash');
    spanNode.setAttribute('title', 'Delete');

    // remove function
    spanNode.onclick = function() {
        remove(todo.id);
    }
    list.appendChild(spanNode);
    unOrderList.appendChild(list);


    // span for Edit
    var edit = document.createElement('SPAN');
    edit.setAttribute('class', 'glyphicon glyphicon-edit');
    edit.setAttribute('title', 'Edit');


    // Edit function
    edit.onclick = function() {
        editTxt(todo.item, todo.id)
    }
    list.appendChild(edit);
    unOrderList.appendChild(list);
}
function remove(key) {
    database.child('todo/'+ key).remove();
}

database.child('todo').on('child_removed', function(data) {
    var deletedLi = document.getElementById(data.key);
    deletedLi.remove();
});

function editTxt(txt,key) {
    var prom = prompt('Rewrite your todo text');
    database.child('todo').child(key).update({
        item: prom
    });
}
database.child('todo/').on('child_changed', function(data){
    var changedLi = document.getElementById(data.key);
    
    // console.log(data.key);
// console.log(changedLi.firstChild.nodeValue)
    changedLi.firstChild.nodeValue = data.val().item;



})