
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
