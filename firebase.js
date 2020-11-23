
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyAHWfqX44IUkCTKhzIKTCjkHugfWDGYcek",
    authDomain: "cse405-e5995.firebaseapp.com",
    databaseURL: "https://cse405-e5995.firebaseio.com",
    projectId: "cse405-e5995",
    storageBucket: "cse405-e5995.appspot.com",
    messagingSenderId: "1086562884353",
    appId: "1:1086562884353:web:7304e7cd2dc1dd161f1900",
    measurementId: "G-6RT57RMFT0"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


  const auth = firebase.auth();

  function signUp(){
      var email = document.getElementById("email");
      var password = document.getElementById("password");

      const promise = auth.createUserWithEmailAndPassword(email.value, password.value);
      promise.catch(e => alert(e.message));
      alert("Signed Up");
  }

  function signIn(){
    var email = document.getElementById("email");
    var password = document.getElementById("password");

    const promise = auth.signInWithEmailAndPassword(email.value, password.value);
    promise.catch(e => alert(e.message));
    if (email.value.length < 6)
        return false;
    if (password.value.length < 6)
        return false;
    else
        alert("Signed In" + email.value);
        window.location = 'odds.html';
  }

  function signOut() {
    auth.signOut();
    alert("Signed Out");
    window.location = 'index.html';
  }

  auth.onAuthStateChanged(function(user){
    if(user){
      var email = user.email;
      alert("Active User" + email);
    }/* else{
      alert("No Active User");
    }*/
  });




  document.getElementById("form").addEventListener("submit",(e)=>{
    var task = document.getElementById("task").value;
    var description = document.getElementById("description").value;
    e.preventDefault();
    createTask(task,description);
    form.reset();
  });

  function createTask(taskName,description){

    var task={

      task: taskName,
      description:description
    }
    let db= firebase.firestore().collection("tasks/");
    db.add(task).then(()=>{
      Swal.fire(
        'Good job!',
        'Task Added!',
        'success'
      )
      document.getElementById("cardSection").innerHTML='';
    readTask();
    })

  }

  function readTask(){

     firebase.firestore().collection("tasks").onSnapshot(function(snapshot) {
      document.getElementById("cardSection").innerHTML='';
      snapshot.forEach(function(taskValue) {

        document.getElementById("cardSection").innerHTML+=`
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${taskValue.data().task}</h5>
            <p class="card-text">${taskValue.data().description}</p>
            <button type="submit" style="color:white" class="btn btn-warning" onclick="updateTask('${taskValue.id}','${taskValue.data().task}','${taskValue.data().description}')"><i class="fas fa-edit"></i> Edit Task</button>
            <button type="submit"  class="btn btn-danger" onclick="deleteTask('${taskValue.id}')"><i class="fas fa-trash-alt"></i> Delete Task</button>
          </div>
        </div>
    `
      });

  });

  }

  function reset(){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4 " id="form">

    <div class="form-group">
      <label >Task</label>
      <input type="text" class="form-control" id="task" placeholder="Enter task">
    </div>

    <div class="form-group">
      <label>Description</label>
      <input type="text" class="form-control" id="description" placeholder="Description">
    </div>

    <button type="submit"  id="button1" class="btn btn-primary"><i class="fas fa-plus"></i> ADD TASK</button>
    <button style="display: none" id="button2" class="btn btn-success"> Update Task</button>
    <button style="display: none" id="button3" class="btn btn-danger">Cancel</button>
  </form>
    `;

    document.getElementById("form").addEventListener("submit",(e)=>{
      var task = document.getElementById("task").value;
      var description = document.getElementById("description").value;
      e.preventDefault();
      createTask(task,description);
      form.reset();
    });
  }

  function updateTask(id,name,description){
    document.getElementById("firstSection").innerHTML=`
    <form class="border p-4 mb-4 " id="form2">

    <div class="form-group">
      <label >Task</label>
      <input type="text" class="form-control" id="task" placeholder="Enter task">
    </div>

    <div class="form-group">
      <label>Description</label>
      <input type="text" class="form-control" id="description" placeholder="Description">
    </div>

    <button style="display: none"  id="button1" class="btn btn-primary">ADD TASK</button>
    <button type="submit" style="display: inline-block" id="button2" class="btn btn-success"><i class="fas fa-sync"></i> Update Task</button>
    <button style="display: inline-block" id="button3" class="btn btn-danger"><i class="fas fa-ban"></i> Cancel</button>
  </form>
    `;
    document.getElementById("form2").addEventListener("submit",(e)=>{
      e.preventDefault();
    });
    document.getElementById("button3").addEventListener("click",(e)=>{
      reset();
    });
    document.getElementById("button2").addEventListener("click",(e)=>{
      updateTask2(id,document.getElementById("task").value,document.getElementById("description").value);
    });
    document.getElementById("task").value=name;
    document.getElementById("description").value=description;
  }

  function updateTask2(id,name,description){
    var taskUpdated={
      task:name,
      description:description
    }
    let db= firebase.firestore().collection("tasks").doc(id);
    db.set(taskUpdated).then(()=>{
      Swal.fire(
        'Good job!',
        'Task Updated!',
        'success'
      )
    })

    document.getElementById("cardSection").innerHTML='';
    readTask();
    reset();
  }
  function deleteTask(id){
    firebase.firestore().collection("tasks").doc(id).delete().then(()=>{
      Swal.fire(
        'Good job!',
        'Task Removed!',
        'success'
      )
    })
    reset();
    document.getElementById("cardSection").innerHTML='';
    readTask();
  }
