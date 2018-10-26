let articleDescription = document.getElementById('articleDescription')
let articleUrl = document.getElementById('articleUrl')
let articleTitle = document.getElementById('articleTitle')
let articleBody = document.getElementById('articleBody')
let submitButton = document.getElementById('submitButton')
let userContainer3 = document.getElementById('userContainer3')
let articleForm = document.getElementById('articleForm')
let categoryTitle = document.getElementById('categoryTitle')

const articlesRef = database.ref("articleList")
//const database = firebase.database()
var currentUsername = null
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    console.log(user);
    // User is signed in.
    var displayName = user.displayName;
    currentUsername = displayName
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

function alertAfterPost() {
  setTimeout(function(){
    alert("Your Article has Been Submitted")
  });
}

function dateTimeNow() {
  var dateTime = new Date().toLocaleString()
  return dateTime
}

submitButton.addEventListener('click', function() {
  let category = categoryTitle.value
  let title = articleTitle.value
  let url = articleUrl.value
  let description = articleDescription.value
  let body = articleBody.value
  articleForm.reset()

  let articleRef = articlesRef.push()
  articleRef.set({
    category : category,
    title : title,
    img : url,
    description : description,
    article : body,
    userName : currentUsername,
    publishedDate : dateTimeNow()

  })
})

function alertAfterPost() {
 setTimeout(function(){
   alert("Your Article has Been Submitted")
 });
}

function dateTimeNow() {
 var dateTime = new Date().toLocaleString()
 return dateTime
}

submitButton.addEventListener('click', function() {
 let title = articleTitle.value
 let url = articleUrl.value
 let description = articleDescription.value
 let body = articleBody.value
 let category = categoryTitle.value

 articleForm.reset()

 let currentUser = firebase.auth().currentUser

let userRef = database.ref("users").child(currentUser.uid)
let articlesRef = userRef.child("articles")
let articleRef = articlesRef.push()
articleRef.set({
  userName : firebase.auth().currentUser.displayName,
  category: category,
  title : title,
  img : url,
  description : description,
  article : body,
  publishedDate : dateTimeNow(),

})


 let articleList = database.ref("articleList").push().set({
   userName : firebase.auth().currentUser.displayName,
   category: category,
   title : title,
   img : url,
   description : description,
   article : body,
   publishedDate : dateTimeNow(),
 })


 })
alertAfterPost()
})
