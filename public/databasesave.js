
var firebaseConfig = {
  apiKey: "AIzaSyAH4-89xzGhI1q1lmtKDEBIa5-Ys4eMeBw",
  authDomain: "form-658b2.firebaseapp.com",
  databaseURL: "https://form-658b2.firebaseio.com",
  projectId: "form-658b2",
  storageBucket: "form-658b2.appspot.com",
  messagingSenderId: "1051013261903",
  appId: "1:1051013261903:web:5e7991d3774a5300"
  };


  // grecaptcha.execute();
  // grecaptcha.render();

  firebase.initializeApp(firebaseConfig);





//   Old
  var messagesRef = firebase.database().ref('messages');


  document.getElementById('contact-form').addEventListener('submit', submitForm);

  function submitForm(e){
    e.preventDefault();
  
    //Get value
var Name = document.getElementById('user_name').value;
var Email = document.getElementById('user_email').value;
var Message = document.getElementById('message').value;


    
    saveMessage(Name, Email, Message);

    document.getElementById('contact-form').reset();
  }

  function saveMessage(Name, Email, Message){
    var newMessageRef = messagesRef.push();
    newMessageRef.set({
      Name: Name,
      Email: Email,
      Message: Message
    });
  }
  