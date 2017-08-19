var database = firebase.database().ref('/');
var input = document.getElementById('input')
var unOrderList = document.getElementById('list')

function todo() {
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
    demo.id = snapshot.key

    var list = document.createElement('LI')
    var tagText = document.createTextNode(demo.item);
    list.setAttribute('class', 'list-group-item');
    list.appendChild(tagText);      

    var spanNode = document.createElement('span');
    spanNode.setAttribute('class', 'glyphicon glyphicon-trash');
    spanNode.setAttribute('id', 'delete');
    list.appendChild(spanNode);
    unOrderList.appendChild(list);
});
document.getElementById('delete').onclick = function() {
    database.child('todo').on("child_removed", function (snapshot) {
       remove(snapshot.val())
    });

}
