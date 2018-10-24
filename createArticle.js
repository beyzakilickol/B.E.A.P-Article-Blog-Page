let articleDescription = document.getElementById('articleDescription')
let articleUrl = document.getElementById('articleUrl')
let articleTitle = document.getElementById('articleTitle')
let articleBody = document.getElementById('articleBody')
let submitButton = document.getElementById('submitButton')
let userContainer3 = document.getElementById('userContainer3')
let articleForm = document.getElementById('articleForm')

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
 articleForm.reset()

 const database = firebase.database()
 let currentUser = firebase.auth().currentUser

 let userRef = database.ref("users").child(currentUser.uid).child("articles").push()
 .set({
   title : title,
   img : url,
   description : description,
   article : body,
   publishedDate : dateTimeNow()

})
alertAfterPost()
})
