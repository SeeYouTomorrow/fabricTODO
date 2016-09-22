
var canvas = new fabric.Canvas('canvas');
canvas.selectionColor = 'rgba(60,255,150,0.3)';
canvas.selectionBorderColor = 'lightblue';
canvas.selectionLineWidth = 1;

canvas.setHeight(800);
canvas.setWidth(800);


canvas.on('object:modified', saveCanvas);

todos = [];

window.onload = init;

function init() {
    var inputField = document.getElementById('task');
    inputField.addEventListener('keypress', keyCheck);
    inputField.focus();
    getTodoItems();
}

function getTodoItems() {
  var myCanvas = JSON.parse(localStorage.getItem('canvasState'));
  canvas.loadFromJSON(myCanvas, canvas.renderAll.bind(canvas))
  // alert(myCanvas);

}


document.onkeydown = function(e) {
	if (46 === e.keyCode) {
    if(canvas.getActiveGroup()){
      canvas.getActiveGroup().forEachObject(function(o){ canvas.remove(o) });
      canvas.discardActiveGroup().renderAll();
    } else {
      canvas.remove(canvas.getActiveObject());
    }

    saveCanvas();
	}
};


function keyCheck(k) {
  if (k.charCode == 13) {
    getFormData();
  }
}

function Todo(id,task) {
  this.id = id;
  this.task = task;
}

function getFormData() {
  var task = document.getElementById('task').value;
  if (!task.match(/\S/)) {
    return alert('Nice try');
  } else {
    var id = (new Date()).getTime();
    var todoItem = new Todo(id,task);
    todos.push(todoItem);
    addTodoToPage();

  }
}

function addTodoToPage() {
  var latest = todos[todos.length-1].task;
  // var latest = latest.replace(/\"([^(\")"]+)\":/g,"$1:");

  posX = (canvas.width)*0.65 * Math.random();
  posY = (canvas.height)*0.65 * Math.random();

  var newTask = new fabric.IText(latest, {
    left:posX,
    top:posY,
    fontFamily: 'roboto'
  })
  newTask.setColor('white');
  canvas.add(newTask);
  saveCanvas();
  var inputField = document.getElementById('task');
  inputField.value = "";
}

function saveCanvas() {
  var json = JSON.stringify(canvas.toJSON());
  localStorage.setItem('canvasState',json);
  // alert(json);
}
