let login = document.getElementById("login")
let logInCard = document.getElementById("logInCard")
let slideContainer = document.getElementById("carouselExampleIndicators")
let registerCard = document.getElementById("registerCard")
let getStarted =document.getElementById("get-started")
let loginCloseIcon = document.getElementById("loginCloseIcon")
let getStartedCloseIcon = document.getElementById("getStartedCloseIcon")
let emailTextBox = document.getElementById("emailTextBox")
let nameTextBox = document.getElementById("nameTextBox")
let passwordTextBox = document.getElementById("passwordTextBox")
let loginEmailTextBox = document.getElementById("loginEmailTextBox")
let loginPasswordTextBox = document.getElementById("loginPasswordTextBox")
let registerButton = document.getElementById("registerButton")
let signInButton = document.getElementById("signInButton")
let signOutButton = document.getElementById("signOutButton")
let dropdownMenuButton = document.getElementById("dropdownMenuButton")
let noAccount = document.getElementById("noAccount")
//let body = document.getElementsByTagName("BODY")[0]
const database = firebase.database()
let userName
//--------------registration--------------------------
registerButton.addEventListener("click",function(){
  let email = emailTextBox.value
  let password = passwordTextBox.value
  userName = ''
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(user){
     //userName = nameTextBox.value
     updateUserProfile()
     registerCard.style.display ="none"
     slideContainer.style.opacity ="1"
  })
  .catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorMessage)
    alert("Enter a valid email or password!")
})
})


function updateUserProfile() {

  let user = firebase.auth().currentUser

  let userName = nameTextBox.value

  user.updateProfile({
    displayName: userName
  }).then(function() {
  // Update successful.
  console.log(firebase.auth().currentUser.displayName)
   dropdownMenuButton.innerHTML = "Welcome " + user.displayName
  }).catch(function(error) {
  // An error happened.
});

}

//--------------------------------------------------------------------------
signInButton.addEventListener("click", function(){


  let email = loginEmailTextBox.value
  let password = loginPasswordTextBox.value
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then(function(user){
    logInCard.style.display = "none"
    slideContainer.style.opacity = "1"
    login.style.display = "none"
    getStarted.style.display = "none"
    dropdownMenuButton.style.display = "block"
         configureObserver()
         console.log("User Signed In Successfully!!")
       currentUserId = firebase.auth().currentUser.uid
      database.ref("users").child(currentUserId).set({
        userName : firebase.auth().currentUser.displayName
        })

})
  .catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert("Password or email address is incorrect! Please try again...")
    console.log(errorMessage)
})

})
//----------------------------------
signOutButton.addEventListener("click",function(){
firebase.auth().signOut().then(response => {
  dropdownMenuButton.style.display = "none"
  login.style.display = "block"
  getStarted.style.display = "block"
  console.log("User is signed out")

}).catch(function(error){console.log("There is a problem")})
})
//---------------------------------------------------------
  let data = []
function configureObserver(){
 data = []
currentUserId = firebase.auth().currentUser.uid
database.ref("users").on('value',function(snapshot){
   snapshot.forEach(function(childSnapshot){
    data.push(childSnapshot.val());
     console.log(data);
   })

// dropdownMenuButton.innerHTML = "Welcome " + snapshot.child(currentUserId).child('userName').val().toUpperCase()
   })

}

//--------------------------------------------------------
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    logInCard.style.display = "none"
    slideContainer.style.opacity = "1"
    login.style.display = "none"
    getStarted.style.display = "none"
    dropdownMenuButton.style.display = "block"
    currentUserId = firebase.auth().currentUser.uid
    dropdownMenuButton.innerHTML = "Welcome " + user.displayName
    //+ database.ref("users").child(currentUserId).child('userName').val().toUpperCase()
    // ...
  } else {
    // User is signed out.
    // ...
  }

});
//-------------------------------------------------------
dropdownMenuButton.style.display = "none"
logInCard.style.display ="none"
registerCard.style.display ="none"
login.addEventListener("click",function() {
  logInCard.style.display= "block"
  logInCard.style.position= "fixed"
  slideContainer.style.opacity = "0.1"
})
loginCloseIcon.addEventListener("click",function(){
  logInCard.style.display ="none"
  slideContainer.style.opacity = "1"
});
getStarted.addEventListener("click",function() {
  registerCard.style.display= "block"
  registerCard.style.position= "fixed"
  slideContainer.style.opacity = "0.1"
});
getStartedCloseIcon.addEventListener("click",function(){
    registerCard.style.display ="none"
    slideContainer.style.opacity = "1"
  })
noAccount.addEventListener("click", function(){
  logInCard.style.display="none"
  registerCard.style.display = "block"
  registerCard.style.position= "fixed"
}
)
