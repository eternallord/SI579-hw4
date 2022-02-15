function addTask(description, dueTime){
    var task_list = document.querySelector('#task_list');
    var li = document.createElement('li');
    var btn = document.createElement('button');
    li.innerText = description;
    btn.innerText = 'Done';
    btn.setAttribute("class", "btn btn-sm btn-outline-danger done");
    btn.setAttribute("type", "button");
    task_list.appendChild(li);
    if (dueTime){
        var span = document.createElement('span');
        var date = new Date(dueTime);
        span.innerText = 'due ' + date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        span.setAttribute("class", "due");
        li.appendChild(span);
    }
    li.appendChild(btn);
    btn.addEventListener("click", function(){
        li.remove();
    });
}

function dateAndTimeToTimestamp(dateInputElement, timeInputElement) {
    const dueDate = dateInputElement.valueAsNumber; // Returns the timestamp at midnight for the given date
    const dueTime = timeInputElement.valueAsNumber; // Returns the number of milliseconds from midnight to the time

    if(dueDate && dueTime) { // The user specified both a due date & due time
        //Add the timezone offset to account for the fact that timestamps are specified by UTC
        const timezoneOffset =  (new Date()).getTimezoneOffset() * 60 * 1000;
        return dueDate + dueTime + timezoneOffset;
    } else {
        // if the user did not specify both a due date and due time, return false
        return false;
    }
}

var add_btn = document.querySelector("#add_task");
var description = document.querySelector("#task_description_input");
var date_element = document.querySelector("#duedate_input");
var time_element = document.querySelector("#duetime_input");

add_btn.addEventListener("click",function (){
    addTask(description.value, dateAndTimeToTimestamp(date_element, time_element));
    date_element.value = '';
    time_element.value = '';
});

description.addEventListener("keydown", function(event){
    if (event.key === "Enter") {
        addTask(description.value, dateAndTimeToTimestamp(date_element, time_element));
        date_element.value = '';
        time_element.value = '';
    }
});
