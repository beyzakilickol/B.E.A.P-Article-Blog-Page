let articlesContainer = document.getElementById("testing_articles")
let userArticles = []
let allArticles = []


let currentUsername = null

const articlesRef = database.ref("articleList")

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
  refreshArticles()
});


function refreshArticles() {


  articlesRef.on('value', function(snapshot){
    articlesContainer.innerHTML = ""

      snapshot.forEach(function(item){
              if (item.val()){

                  var article = item.val()
                  var articleKey = item.key
                  article.fbKey = articleKey
                  allArticles.push(article)

                  articlesContainer.innerHTML +=
                  `
                    <div>

                      <p>${article.title}</p>
                      <strong>${article.likes}</strong>
                      <button class="likeButton" id="${article.fbKey}">like</button>
                    </div>



                  `
                  var likeButton = document.getElementById(article.fbKey)


                  if (article.userName === currentUsername) {
                    userArticles.push(article)
                  }



                }
          })



          $( ".likeButton" ).on( "click", function( e ) {
            var key = e.target.id
            likeArticle(key)

          })


          // if(allArticles.length){
          //   likeArticle("-LPftXNUvsZ6RCTb1292")
          // }
  })






}


function likeArticle(firebase_key) {

  let selectedArticle = allArticles.find(function(article){

    if(article.fbKey === firebase_key){
      return article
    }
  })

  //console.log("hi");

  if(selectedArticle && selectedArticle.fbKey){
    //console.log("bye");
    selectedArticle.likes = selectedArticle.likes += 1
    var updated = {}
    updated['/' + selectedArticle.fbKey] = selectedArticle
    console.log(updated);
    articlesRef.update(updated)
  }

}
