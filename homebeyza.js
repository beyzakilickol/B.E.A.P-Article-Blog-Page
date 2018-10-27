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
let cardContainer=document.getElementById('card-container')
let cardContainer2=document.getElementById('card-container2')
let cardContainer3=document.getElementById('card-container3')
let sportsButton =document.getElementById('sportsButton')
let healthButton =document.getElementById('healthButton')
let techButton =document.getElementById('techButton')
let cultureButton =document.getElementById('cultureButton')
let educationButton =document.getElementById('educationButton')
let foodButton =document.getElementById("foodButton")
let othersButton =document.getElementById('othersButton')
let mainDiv= document.getElementById("mainDiv")
let containerAfterHeader=document.getElementById("containerAfterHeader")
let body = document.getElementsByTagName("BODY")[0]
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
    containerAfterHeader.style.opacity = "1"
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
  window.location = "indexbeyza.html"

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

//dropdownMenuButton.style.display = "none"
logInCard.style.display ="none"
registerCard.style.display ="none"
login.addEventListener("click",function() {
  logInCard.style.display= "block"
  logInCard.style.position= "fixed"
  slideContainer.style.opacity = "0.1"
  containerAfterHeader.style.opacity = "0.1"
})
loginCloseIcon.addEventListener("click",function(){
  logInCard.style.display ="none"
  slideContainer.style.opacity = "1"
});
getStarted.addEventListener("click",function() {
  registerCard.style.display= "block"
  registerCard.style.position= "fixed"
  slideContainer.style.opacity = "0.1"
  containerAfterHeader.style.opacity = "0.1"
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

function displayAllArticles(){

allArticlesDiv.innerHTML=''
data.map(function(each){

let article
   Object.values(each.articles).map(function(item){


     article = `

          <div class="container py-3">
            <div class="card leftSideBar">
              <div class="row ">

                  <div class="col-md-8 px-3">
                    <div class="card-block px-3">
                      <h3 class="card-title">${item.category}</h3>
                      <p class="card-text"><strong>${item.title}</strong></p>
                      <p class="card-text">${item.description}</p>
                      <h6 class="homePageAuthor">${item.userName}</h6>
                      <h6 class="homePageDate">${item.publishedDate}</h6>
                      <a href="#" onclick="displayWholeArticle2(this)" class="leftSideButton"><u><i>Read More...</i></u></a>
                    </div>
                  </div>

                  <div class="col-md-4">
                      <img style="width:100% !important;height:100%;" src="${item.img}" class="w-100">
                    </div>

                </div>
              </div>
            </div>
          `
         allArticlesDiv.insertAdjacentHTML('beforeend',article)

    })

})

}
//------------------------------------------------------

function displayWholeArticle2(button){

  body.removeChild(slideContainer)
  body.removeChild(mainDiv)
  body.removeChild(containerAfterHeader)
  let buttonPublishedDate = button.previousElementSibling.innerHTML
  //let buttonPublishedDate = button.parentElement.parentElement.children[1].children[2].innerHTML
  getWholeArticleInfo2(buttonPublishedDate)


        //
        // let buttonBack = `<a href="indexbeyza.html"><button style="margin-top:500px;">back</button></a>`
        // body.insertAdjacentHTML("beforeend",buttonBack)

}
//-----------------------------------------------------
var count2
function getCount2(button){


  count2++

  button.children[0].innerHTML= count2
  let buttonPublishedDate= button.parentElement.parentElement.parentElement.children[2].innerHTML
  database.ref("articleList").on("value",function(snapshot){
// lastArticles=[]
       snapshot.forEach(function(childSnapshot){
         let getDateForLikes = childSnapshot.val().publishedDate
         // lastArticles.push(childSnapshot.val())
         if (getDateForLikes == buttonPublishedDate) {
          // database.ref("articleList").child(childSnapshot.key).child("LikeCounts").set({count : count})
          database.ref("articleList").child(childSnapshot.key).child("LikeCounts").set({count : count2})

         }
       })

})

}
//---------------------------------------------------------
function getWholeArticleInfo2(buttonPublishedDate){
  lastArticles.map(function(each){
    if(each.publishedDate == buttonPublishedDate){
      let readWholeArticleAtHome = `
      <div class="articleTemplate">
     <h1>${each.title}</h1>
     <p style="text-transform:capitalize">by ${each.userName}</p>
     <p>${each.publishedDate}</p>
     <div class="wholeArticleImgContainer">
     <img style="margin-bottom: 30px" class="wholeArticleImg" src="${each.img}" />
     </div>
     <h5 style="margin-bottom:30px"><i>${each.description}</i></h5>
     <p>${each.article}</p>
     <div class="card">

  <div class="card-header">
    Leave a Comment
  </div>
  <div class="card-body likeContainer">
    <textarea style="width: 100%;margin-bottom:5px;" type="text" placeholder="Enter your comment here.." onfocus="this.placeholder=''"></textarea>
    <a href="#"  class="btn btn-primary">Submit </i></a>
    <a onclick="getCount2(this)" class="silentButton" href="#"><i style="margin-top:6px;" class="fas fa-thumbs-up fa-1.7x">${each.LikeCounts.count}</i></a>

  </div>
</div>
     </div>

      `
      body.insertAdjacentHTML("beforeend",readWholeArticleAtHome)
      count2= each.LikeCounts.count
    }
  })

  let articleTemplate = document.querySelector(".articleTemplate")
  login.addEventListener("click",function() {
     articleTemplate.style.opacity = "0.1"
    logInCard.style.display ="block"
    logInCard.style.position= "fixed"
    logInCard.style.zIndex = "1"



  })
  loginCloseIcon.addEventListener("click",function(){
    logInCard.style.display ="none"
    articleTemplate.style.opacity = "1"

  });
  getStarted.addEventListener("click",function() {
    articleTemplate.style.opacity = "0.1"
   registerCard.style.display ="block"
    registerCard.style.position= "fixed"

    registerCard.style.zIndex = "1"

  });
  getStartedCloseIcon.addEventListener("click",function(){
      registerCard.style.display ="none"
    articleTemplate.style.opacity = "1"

    })
    noAccount.addEventListener("click", function(){
      logInCard.style.display="none"
      registerCard.style.display = "block"
      registerCard.style.position= "fixed"
      registerCard.style.zIndex = "1"
    })
}


//-------------------------------------------------------
let lastArticles
function filteredArticleObserver(){
  database.ref("articleList").on("value",function(snapshot){

    lastArticles=[]
       snapshot.forEach(function(childSnapshot){
         lastArticles.push(childSnapshot.val())


 })
console.log(lastArticles)
  console.log(lastArticles.slice(lastArticles.length-3,lastArticles.length+1))
  console.log(lastArticles.slice(lastArticles.length-6,lastArticles.length-3))
  console.log(lastArticles.slice(lastArticles.length-9,lastArticles.length-6))
displayFilteredArticles()
//getWholeArticleInfo()
  })

}
filteredArticleObserver()
function displayFilteredArticles(){
  cardContainer.innerHTML = ''
  cardContainer2.innerHTML = ''
  cardContainer3.innerHTML = ''
  let firstThreeArticles = lastArticles.slice(lastArticles.length-3,lastArticles.length+1)
  firstThreeArticles.map(function(each){



   let lastItem=`
   <div class="card">
   <img class="card-img-top" src="${each.img}" alt="Card image cap">
   <div class="card-body">
     <h5 style="text-transform:capitalize" class="card-title">${each.title}</h5>
     <p style="text-transform:capitalize"><i>by ${each.userName}</i> </p><p>${each.publishedDate}</p>
     <p class="card-text">${each.description}</p>

   </div>
   <div style="display:flex; justify-content:center;">

   <button type="button" onclick="displayWholeArticle(this)" class="btn btn-secondary btn-sm readMore"><strong>Read more</strong></button>
     </div>
   <div class="card-footer">
     <small class="text-muted">Posted on :</small>
   </div>
   </div>
   `
   cardContainer.insertAdjacentHTML("afterbegin",lastItem)
   })
   let middleThreeArticles = lastArticles.slice(lastArticles.length-6,lastArticles.length-3)
   middleThreeArticles.map(function(each){



    let lastItem=`
    <div class="card">
    <img class="card-img-top" src="${each.img}" alt="Card image cap">
    <div class="card-body">
      <h5 style="text-transform:capitalize" class="card-title">${each.title}</h5>
      <p style="text-transform:capitalize"><i>by ${each.userName}</i> </p><p>${each.publishedDate}</p>
      <p class="card-text">${each.description}</p>

    </div>
    <div style="display:flex; justify-content:center;">

    <button type="button" onclick="displayWholeArticle(this)" class="btn btn-secondary btn-sm readMore"><strong>Read more</strong></button>
      </div>
    <div class="card-footer">
      <small class="text-muted">Posted on :</small>
    </div>
    </div>
    `
    cardContainer2.insertAdjacentHTML("afterbegin",lastItem)
    })
    let lastSlideArticles = lastArticles.slice(lastArticles.length-9,lastArticles.length-6)
    lastSlideArticles.map(function(each){



     let lastItem=`
     <div class="card">
     <img class="card-img-top" src="${each.img}" alt="Card image cap">
     <div class="card-body">
       <h5 style="text-transform:capitalize" class="card-title">${each.title}</h5>
       <p style="text-transform:capitalize"><i>by ${each.userName}</i> </p><p>${each.publishedDate}</p>
       <p class="card-text">${each.description}</p>

     </div>
     <div style="display:flex; justify-content:center;">

     <button type="button" onclick="displayWholeArticle(this)" class="btn btn-secondary btn-sm readMore"><strong>Read more</strong></button>
       </div>
     <div class="card-footer">
       <small class="text-muted">Posted on :</small>
     </div>
     </div>
     `
     cardContainer3.insertAdjacentHTML("afterbegin",lastItem)
     })
   }
// ------------------displayWholeArticle starts here------------------

let buttonTitle
function displayWholeArticle(button){

  body.removeChild(slideContainer)
  body.removeChild(mainDiv)
  body.removeChild(containerAfterHeader)
  //let buttonPublishedDate = button.previousElementSibling.innerHTML
  let buttonPublishedDate = button.parentElement.parentElement.children[1].children[2].innerHTML
  getWholeArticleInfo(buttonPublishedDate)


        //
        // let buttonBack = `<a href="indexbeyza.html"><button style="margin-top:500px;">back</button></a>`
        // body.insertAdjacentHTML("beforeend",buttonBack)

}
//---------------------------------------------------------

//---------------------------------------------------------
var count
function getCount(button){


  count++

  button.children[0].innerHTML= count
  let buttonPublishedDate= button.parentElement.parentElement.parentElement.children[2].innerHTML
  database.ref("articleList").on("value",function(snapshot){
// lastArticles=[]
       snapshot.forEach(function(childSnapshot){
         let getDateForLikes = childSnapshot.val().publishedDate
         // lastArticles.push(childSnapshot.val())
         if (getDateForLikes == buttonPublishedDate) {
          // database.ref("articleList").child(childSnapshot.key).child("LikeCounts").set({count : count})
          database.ref("articleList").child(childSnapshot.key).child("LikeCounts").set({count : count})
         }
       })

})

}

//---------------------------------------------------------
function getWholeArticleInfo(buttonPublishedDate){
  lastArticles.map(function(each){
    if(each.publishedDate == buttonPublishedDate){
      let readWholeArticleAtHome = `
      <div class="articleTemplate">
     <h1>${each.title}</h1>
     <p style="text-transform:capitalize">by ${each.userName}</p>
     <p>${each.publishedDate}</p>
     <div class="wholeArticleImgContainer">
     <img style="margin-bottom: 30px" class="wholeArticleImg" src="${each.img}" />
     </div>
     <h5 style="margin-bottom:30px"><i>${each.description}</i></h5>
     <p>${each.article}</p>
     <div class="card">

  <div class="card-header">
    Leave a Comment
  </div>
  <div class="card-body likeContainer">
    <textarea style="width: 100%;margin-bottom:5px;" type="text" placeholder="Enter your comment here.." onfocus="this.placeholder=''"></textarea>
    <a href="#" class="btn btn-primary">Submit </i></a>
    <a onclick ="getCount(this)" class="silentButton" href="#"><i style="margin-top:6px;" class="fas fa-thumbs-up fa-1.7x">${each.LikeCounts.count}</i></a>

  </div>
</div>
     </div>

      `
      body.insertAdjacentHTML("beforeend",readWholeArticleAtHome)
      count = each.LikeCounts.count
    }
  })

  let articleTemplate = document.querySelector(".articleTemplate")
  login.addEventListener("click",function() {
     articleTemplate.style.opacity = "0.1"
    logInCard.style.display ="block"
    logInCard.style.position= "fixed"
    logInCard.style.zIndex = "1"



  })
  loginCloseIcon.addEventListener("click",function(){
    logInCard.style.display ="none"
    articleTemplate.style.opacity = "1"

  });
  getStarted.addEventListener("click",function() {
    articleTemplate.style.opacity = "0.1"
   registerCard.style.display ="block"
    registerCard.style.position= "fixed"

    registerCard.style.zIndex = "1"

  });
  getStartedCloseIcon.addEventListener("click",function(){
      registerCard.style.display ="none"
    articleTemplate.style.opacity = "1"

    })
    noAccount.addEventListener("click", function(){
      logInCard.style.display="none"
      registerCard.style.display = "block"
      registerCard.style.position= "fixed"
      registerCard.style.zIndex = "1"
    })
}



//-------------Category Buttons-----------------------------------
sportsButton.addEventListener("click",function(){
  //-----------------
  login.addEventListener("click",function() {
    logInCard.style.display= "block"
    logInCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    logInCard.style.zIndex = "1"



  })
  loginCloseIcon.addEventListener("click",function(){
    logInCard.style.display ="none"
    slideContainer.style.opacity = "1"
    containerAfterHeader.style.opacity = "1"

  });
  getStarted.addEventListener("click",function() {
    registerCard.style.display= "block"
    registerCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    registerCard.style.zIndex = "1"

  });
  getStartedCloseIcon.addEventListener("click",function(){
      registerCard.style.display ="none"
      slideContainer.style.opacity = "1"
      containerAfterHeader.style.opacity = "1"

    })
  //--------------------
  containerAfterHeader.innerHTML=''
   slideContainer.style.display = "none"
   mainDiv.style.display = "none"

  configureObserver()
  allArticlesDiv.innerHTML=''
data.map(function(each){

  let article
     Object.values(each.articles).map(function(item){

       if(item.category == "Sports"){
       article = `

       <div class="container py-3">
     <div class="card leftSideBar">
       <div class="row ">
           <div class="col-md-8 px-3">
             <div class="card-body">
               <h3 class="card-title" style="font-size:1.7vw;">${item.category}</h3>
               <p class="card-text" style="font-size:3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><strong>${item.title}</strong></p>
               <p class="card-text" style="font-size:2vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${item.description}</p>
               <h6 class="homePageAuthor style="font-size:2vw;">${item.userName}</h6>
               <h6 class="homePageDate" style="font-size:1.1vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">Posted Date : ${item.publishedDate} </h6>
               <a href="#" class="leftSideButton" style="font-size:1.3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><u><i>Read More...</i></u></a>
             </div>
           </div>
           <div class="col-md-4">
               <img style="width:80% !important; height:80% !important" src="${item.img}" class="w-100">
             </div>
         </div>
       </div>
     </div>
            `
           containerAfterHeader.insertAdjacentHTML('beforeend',article)
         }

      })

  })

})
healthButton.addEventListener("click",function(){
  //-----------------
  login.addEventListener("click",function() {
    logInCard.style.display= "block"
    logInCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    logInCard.style.zIndex = "1"


  })
  loginCloseIcon.addEventListener("click",function(){
    logInCard.style.display ="none"
    slideContainer.style.opacity = "1"
    containerAfterHeader.style.opacity = "1"
  });
  getStarted.addEventListener("click",function() {
    registerCard.style.display= "block"
    registerCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    registerCard.style.zIndex = "1"
  });
  getStartedCloseIcon.addEventListener("click",function(){
      registerCard.style.display ="none"
      slideContainer.style.opacity = "1"
      containerAfterHeader.style.opacity = "1"
    })
  //--------------------
    containerAfterHeader.innerHTML=''
   slideContainer.style.display = "none"
   mainDiv.style.display = "none"

  configureObserver()
  allArticlesDiv.innerHTML=''
data.map(function(each){

  let article
     Object.values(each.articles).map(function(item){

       if(item.category == "Health"){
       article = `

       <div class="container py-3">
     <div class="card leftSideBar">
       <div class="row ">
           <div class="col-md-8 px-3">
             <div class="card-body">
               <h3 class="card-title" style="font-size:1.7vw;">${item.category}</h3>
               <p class="card-text" style="font-size:3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><strong>${item.title}</strong></p>
               <p class="card-text" style="font-size:2vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${item.description}</p>
               <h6 class="homePageAuthor style="font-size:2vw;">${item.userName}</h6>
               <h6 class="homePageDate" style="font-size:1.1vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">Posted Date : ${item.publishedDate} </h6>
               <a href="#" class="leftSideButton" style="font-size:1.3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><u><i>Read More...</i></u></a>
             </div>
           </div>
           <div class="col-md-4">
               <img style="width:80% !important; height:80% !important" src="${item.img}" class="w-100">
             </div>
         </div>
       </div>
     </div>
            `
           containerAfterHeader.insertAdjacentHTML('beforeend',article)
         }

      })

  })

})
techButton.addEventListener("click",function(){
  //-----------------
  login.addEventListener("click",function() {
    logInCard.style.display= "block"
    logInCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    logInCard.style.zIndex = "1"


  })
  loginCloseIcon.addEventListener("click",function(){
    logInCard.style.display ="none"
    slideContainer.style.opacity = "1"
    containerAfterHeader.style.opacity = "1"
  });
  getStarted.addEventListener("click",function() {
    registerCard.style.display= "block"
    registerCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    registerCard.style.zIndex = "1"
  });
  getStartedCloseIcon.addEventListener("click",function(){
      registerCard.style.display ="none"
      slideContainer.style.opacity = "1"
      containerAfterHeader.style.opacity = "1"
    })
  //--------------------
    containerAfterHeader.innerHTML=''
   slideContainer.style.display = "none"
   mainDiv.style.display = "none"

  configureObserver()
  allArticlesDiv.innerHTML=''
data.map(function(each){

  let article
     Object.values(each.articles).map(function(item){

       if(item.category == "Tech"){
       article = `

       <div class="container py-3">
     <div class="card leftSideBar">
       <div class="row ">
           <div class="col-md-8 px-3">
             <div class="card-body">
               <h3 class="card-title" style="font-size:1.7vw;">${item.category}</h3>
               <p class="card-text" style="font-size:3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><strong>${item.title}</strong></p>
               <p class="card-text" style="font-size:2vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${item.description}</p>
               <h6 class="homePageAuthor style="font-size:2vw;">${item.userName}</h6>
               <h6 class="homePageDate" style="font-size:1.1vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">Posted Date : ${item.publishedDate} </h6>
               <a href="#" class="leftSideButton" style="font-size:1.3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><u><i>Read More...</i></u></a>
             </div>
           </div>
           <div class="col-md-4">
               <img style="width:80% !important; height:80% !important" src="${item.img}" class="w-100">
             </div>
         </div>
       </div>
     </div>
            `
           containerAfterHeader.insertAdjacentHTML('beforeend',article)
         }

      })

  })

})
cultureButton.addEventListener("click",function(){
  //-----------------
  login.addEventListener("click",function() {
    logInCard.style.display= "block"
    logInCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    logInCard.style.zIndex = "1"


  })
  loginCloseIcon.addEventListener("click",function(){
    logInCard.style.display ="none"
    slideContainer.style.opacity = "1"
    containerAfterHeader.style.opacity = "1"
  });
  getStarted.addEventListener("click",function() {
    registerCard.style.display= "block"
    registerCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    registerCard.style.zIndex = "1"
  });
  getStartedCloseIcon.addEventListener("click",function(){
      registerCard.style.display ="none"
      slideContainer.style.opacity = "1"
      containerAfterHeader.style.opacity = "1"
    })
  //--------------------
    containerAfterHeader.innerHTML=''
   slideContainer.style.display = "none"
   mainDiv.style.display = "none"

  configureObserver()
  allArticlesDiv.innerHTML=''
data.map(function(each){

  let article
     Object.values(each.articles).map(function(item){

       if(item.category == "Culture"){
       article = `

       <div class="container py-3">
     <div class="card leftSideBar">
       <div class="row ">
           <div class="col-md-8 px-3">
             <div class="card-body">
               <h3 class="card-title" style="font-size:1.7vw;">${item.category}</h3>
               <p class="card-text" style="font-size:3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><strong>${item.title}</strong></p>
               <p class="card-text" style="font-size:2vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${item.description}</p>
               <h6 class="homePageAuthor style="font-size:2vw;">${item.userName}</h6>
               <h6 class="homePageDate" style="font-size:1.1vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">Posted Date : ${item.publishedDate} </h6>
               <a href="#" class="leftSideButton" style="font-size:1.3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><u><i>Read More...</i></u></a>
             </div>
           </div>
           <div class="col-md-4">
               <img style="width:80% !important; height:80% !important" src="${item.img}" class="w-100">
             </div>
         </div>
       </div>
     </div>
            `
           containerAfterHeader.insertAdjacentHTML('beforeend',article)
         }

      })

  })

})
educationButton.addEventListener("click",function(){
  //-----------------
  login.addEventListener("click",function() {
    logInCard.style.display= "block"
    logInCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    logInCard.style.zIndex = "1"


  })
  loginCloseIcon.addEventListener("click",function(){
    logInCard.style.display ="none"
    slideContainer.style.opacity = "1"
    containerAfterHeader.style.opacity = "1"
  });
  getStarted.addEventListener("click",function() {
    registerCard.style.display= "block"
    registerCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    registerCard.style.zIndex = "1"
  });
  getStartedCloseIcon.addEventListener("click",function(){
      registerCard.style.display ="none"
      slideContainer.style.opacity = "1"
      containerAfterHeader.style.opacity = "1"
    })
  //--------------------
    containerAfterHeader.innerHTML=''
   slideContainer.style.display = "none"
   mainDiv.style.display = "none"

  configureObserver()
  allArticlesDiv.innerHTML=''
data.map(function(each){

  let article
     Object.values(each.articles).map(function(item){

       if(item.category == "Education"){
       article = `

       <div class="container py-3">
     <div class="card leftSideBar">
       <div class="row ">
           <div class="col-md-8 px-3">
             <div class="card-body">
               <h3 class="card-title" style="font-size:1.7vw;">${item.category}</h3>
               <p class="card-text" style="font-size:3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><strong>${item.title}</strong></p>
               <p class="card-text" style="font-size:2vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${item.description}</p>
               <h6 class="homePageAuthor style="font-size:2vw;">${item.userName}</h6>
               <h6 class="homePageDate" style="font-size:1.1vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">Posted Date : ${item.publishedDate} </h6>
               <a href="#" class="leftSideButton" style="font-size:1.3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><u><i>Read More...</i></u></a>
             </div>
           </div>
           <div class="col-md-4">
               <img style="width:80% !important; height:80% !important" src="${item.img}" class="w-100">
             </div>
         </div>
       </div>
     </div>
            `
           containerAfterHeader.insertAdjacentHTML('beforeend',article)
         }

      })

  })

})
foodButton.addEventListener("click",function(){
  //-----------------
  login.addEventListener("click",function() {
    logInCard.style.display= "block"
    logInCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    logInCard.style.zIndex = "1"


  })
  loginCloseIcon.addEventListener("click",function(){
    logInCard.style.display ="none"
    slideContainer.style.opacity = "1"
    containerAfterHeader.style.opacity = "1"
  });
  getStarted.addEventListener("click",function() {
    registerCard.style.display= "block"
    registerCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    registerCard.style.zIndex = "1"
  });
  getStartedCloseIcon.addEventListener("click",function(){
      registerCard.style.display ="none"
      slideContainer.style.opacity = "1"
      containerAfterHeader.style.opacity = "1"
    })
  //--------------------
    containerAfterHeader.innerHTML=''
   slideContainer.style.display = "none"
   mainDiv.style.display = "none"

  configureObserver()
  allArticlesDiv.innerHTML=''
data.map(function(each){

  let article
     Object.values(each.articles).map(function(item){

       if(item.category == "Food"){
       article = `

       <div class="container py-3">
     <div class="card leftSideBar">
       <div class="row ">
           <div class="col-md-8 px-3">
             <div class="card-body">
               <h3 class="card-title" style="font-size:1.7vw;">${item.category}</h3>
               <p class="card-text" style="font-size:3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><strong>${item.title}</strong></p>
               <p class="card-text" style="font-size:2vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${item.description}</p>
               <h6 class="homePageAuthor style="font-size:2vw;">${item.userName}</h6>
               <h6 class="homePageDate" style="font-size:1.1vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">Posted Date : ${item.publishedDate} </h6>
               <a href="#" class="leftSideButton" style="font-size:1.3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><u><i>Read More...</i></u></a>
             </div>
           </div>
           <div class="col-md-4">
               <img style="width:80% !important; height:80% !important" src="${item.img}" class="w-100">
             </div>
         </div>
       </div>
     </div>
            `
           containerAfterHeader.insertAdjacentHTML('beforeend',article)
         }

      })

  })

})
othersButton.addEventListener("click",function(){
  //-----------------
  login.addEventListener("click",function() {
    logInCard.style.display= "block"
    logInCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    logInCard.style.zIndex = "1"


  })
  loginCloseIcon.addEventListener("click",function(){
    logInCard.style.display ="none"
    slideContainer.style.opacity = "1"
    containerAfterHeader.style.opacity = "1"
  });
  getStarted.addEventListener("click",function() {
    registerCard.style.display= "block"
    registerCard.style.position= "fixed"
    slideContainer.style.opacity = "0.1"
    containerAfterHeader.style.opacity = "0.1"
    registerCard.style.zIndex = "1"
  });
  getStartedCloseIcon.addEventListener("click",function(){
      registerCard.style.display ="none"
      slideContainer.style.opacity = "1"
      containerAfterHeader.style.opacity = "1"
    })
  //--------------------
    containerAfterHeader.innerHTML=''
   slideContainer.style.display = "none"
   mainDiv.style.display = "none"

  configureObserver()
  allArticlesDiv.innerHTML=''
data.map(function(each){

  let article
     Object.values(each.articles).map(function(item){

       if(item.category == "Others"){
       article = `

       <div class="container py-3">
     <div class="card leftSideBar">
       <div class="row ">
           <div class="col-md-8 px-3">
             <div class="card-body">
               <h3 class="card-title" style="font-size:1.7vw;">${item.category}</h3>
               <p class="card-text" style="font-size:3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><strong>${item.title}</strong></p>
               <p class="card-text" style="font-size:2vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">${item.description}</p>
               <h6 class="homePageAuthor style="font-size:2vw;">${item.userName}</h6>
               <h6 class="homePageDate" style="font-size:1.1vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">Posted Date : ${item.publishedDate} </h6>
               <a href="#" class="leftSideButton" style="font-size:1.3vw; text-overflow: ellipsis; white-space: nowrap; overflow: hidden;"><u><i>Read More...</i></u></a>
             </div>
           </div>
           <div class="col-md-4">
               <img style="width:80% !important; height:80% !important" src="${item.img}" class="w-100">
             </div>
         </div>
       </div>
     </div>
            `
           containerAfterHeader.insertAdjacentHTML('beforeend',article)
         }

      })

  })

})
