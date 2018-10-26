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
let allClassDiv = document.getElementById("allClassDiv")
let allArticlesDiv = document.getElementById('allArticlesDiv')



//let body = document.getElementsByTagName("BODY")[0]
const database = firebase.database()
   configureObserver()
//--------------registration--------------------------
registerButton.addEventListener("click",function(){
  let email = emailTextBox.value
  let password = passwordTextBox.value
  userName = ''
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(user){
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
         console.log("User Signed In Successfully!!")
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
//currentUserId = firebase.auth().currentUser.uid
database.ref("users").on('value',function(snapshot){
  data = []
   snapshot.forEach(function(childSnapshot){
    data.push(childSnapshot.val());
    console.log(data);
    displayAllArticles()
   })
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
    dropdownMenuButton.innerHTML = "Welcome " + displayName
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
//----------------------------------------------------
//let dates=[]
function displayAllArticles(){
  //dates=[]
allArticlesDiv.innerHTML=''
data.map(function(each){
let article
   Object.values(each.articles).map(function(item){
    let postDates = item.publishedDate.slice(0,10)

     article = `

     <div class="container py-3">
        <div class="card leftSideBar">
          <div class="row ">
              <div class="col-md-8 px-3">
                <div class="card-body">
                  <h3 class="card-title categories" style="font-size:1.9vw ;">${item.category}</h3>

                  <p class="card-text" style="font-size:1.7vw ;"><strong>${item.title}</strong></p>

                  <p class="card-text" style="font-size:1.7vw ; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${item.description}</p>

                  <h6 class="homePageAuthor style="font-size:1.7vw ;">${item.userName}</h6>

                  <h6 class="homePageDate" style="font-size:1.5vw ; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">Posted Date : ${postDates}</h6>

                  <a href="#" class="leftSideButton" style="font-size:1.5vw ; "><u><i>Read More...</i></u></a>
                </div>
              </div>
              <div class="col-md-4">
                  <img style="width:75% !important; height:80% !important; margin-top: 10px;" src="${item.img}" class="w-100">
                </div>
                <hr>
            </div>
          </div>
        </div>

  `
         allArticlesDiv.insertAdjacentHTML('beforeend',article)

    })
})
}
