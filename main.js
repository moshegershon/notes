var title = `<div id="title">
</div>`
var addbox = `<div class="addbox">
<form class="inputsform">
    <div class="whattodo">
    <lable> What to do:
    <input type="text" id="todo" placeholder="What to do? ">
    </lable> 
</div>
<div class="date">
    <lable> *date:
    <input type="text" id="date" placeholder="mm/dd/yyyy">
    </lable> 
</div>
<div class="time">
<lable class="timelable"> time:
<input type="time" id="time">
</lable>
<br>
<button onclick="add(event);return false;" class="addbutton">Update</button>
</form>
</div>`

var todotamplate = `<div class="col-xs-4 col-sm-4 col-md-4 fadeIn  asigment" id="asigment{{id}}">
<i class="fas fa-times" onclick='deleteTask(event,{{id}})'></i> 
<div class="tododiv" readonly>{{whattodo}}</div>
<p>{{date}}<br>{{time}}</p>
</div>`
// this regerx will exept the following  dates (01-31)and(01-12)and(0001-9999)
var regex = /([0-2][0-9]|3[0-1])(\/|\.|\-)(1[0-2]|0[1-9])(\/|\.|\-)([1-9][0-9][0-9][0-9]|[0-2][0-9][0-9][1-9]|[0-2][0-9][1-9][0-9]|[0-2][1-9][0-9][0-9]|[0-9][0-9])/g
var listsarr = [];
function init() {
    if (localStorage.getItem('taskArray') != null) {
        listsarr = JSON.parse(localStorage.getItem('taskArray'));
    }
    else {
        localStorage.setItem("taskArray", JSON.stringify([]));
    }
    Build(JSON.parse(localStorage.getItem('taskArray')));
}
init();

function add(e) {
    e.preventDefault();
    const found = document.getElementById('date').value.match(regex);
    if (found) {
        listsarr.push({
            do: document.getElementById('todo').value,
            date: document.getElementById('date').value,
            time: document.getElementById('time').value
        })
    }
    else {
        alert('plase enter a corect date')
    }
    localStorage.setItem("taskArray", JSON.stringify(listsarr));
    Build(listsarr);
}



function Build(arr) {
    document.getElementById('content1').innerHTML = '';
    for (var i = 0; i < arr.length; i++) {
        var temp = todotamplate;
        temp = temp.replace('{{whattodo}}', arr[i].do)
        temp = temp.replace('{{date}}', arr[i].date)
        temp = temp.replace('{{time}}', arr[i].time)
        temp = temp.replace(/{{id}}/g, i);
        document.getElementById('content1').innerHTML += temp;
    }
}
function fadeout(id) {
    document.getElementById('asigment' + id).className += " hide";
}

function deleteTask(e, id) {
    e.preventDefault();
    const arr = JSON.parse(localStorage.getItem('taskArray'));
    fadeout(id);
    setTimeout(() => {
        document.getElementById('asigment' + id).remove();
        init();
    }, 1000);
    arr.splice(id, 1);
    localStorage.setItem("taskArray", JSON.stringify(arr));

}

document.getElementById('content2').innerHTML = addbox;
document.getElementById('content3').innerHTML = title;


