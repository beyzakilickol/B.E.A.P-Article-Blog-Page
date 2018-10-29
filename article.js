
         let articles = document.getElementById('articles');

         const database = firebase.database()
         const usersRef = database.ref("users")
         let userRef = null
         let list = [];
         let articleContent = [];


        //Get Query String article Id
         const urlParams = new URLSearchParams(window.location.search);
         const myParam = urlParams.get('articleId');
         console.log(myParam)//Gives me variable = article Id




         firebase.auth().onAuthStateChanged(function(user){
             if(user) {
                 userRef = usersRef.child(user.uid)
                 userRef.on('value', function(snapshot){
                     let articles = snapshot.val().articles
                     for (var article in articles){
                         if(article == myParam){
                            let title = articles[article].title
                            let description = articles[article].description
                            let dateTime = articles[article].publishedDate
                            let image = articles[article].img
                            let art = articles[article].article
                            let newObj = {
                                title,
                                image,
                                description,
                                publishedDate: dateTime,
                                art
                                        }
                                list.push(newObj)
                         }
                     }


    //  -------------------------------------------------------------------------------

            let articleContentList = list.map((item) => {
                return `


						<div class="image fit flush">
							<img src="${item.image}"/>
						</div>
						<header class="special">
							<h2>${item.title}</h2>
							<p>${item.description}</p>
							<p>${item.publishedDate}</p>
						</header>
						<div class="content">
							<p>${item.art}</p>
						</div>
					`;
            })
            one.innerHTML = articleContentList.join('');
        })
    } else {
        console.log("No user signed in")
    }
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


//     const ref = new Firebase("https://radiant-torch-3037.firebaseio.com/");
// const form = document.querySelector("form");

// form.addEventListener("submit", postComment);

// const timeStamp = () => {
//   let options = {
//     month: '2-digit',
//     day: '2-digit',
//     year: '2-digit',
//     hour: '2-digit',
//     minute:'2-digit'
//   };
//   let now = new Date().toLocaleString('en-US', options);
//   return now;
// };

// function postComment(e) {
//   e.preventDefault();
//   let name = document.getElementById("name").value;
//   let comment = document.getElementById("comment").value;

//   if (name && comment) {
//     ref.push({
//       name: name,
//       comment: comment,
//       time: timeStamp()
//     });
//   }

//   document.getElementById("name").value = '';
//   document.getElementById("comment").value = '';
// };

// ref.on("child_added", function(snapshot) {
//   let comment = snapshot.val();
//   addComment(comment.name, comment.comment, comment.time);
// });

// const addComment = (name, comment, timeStamp) => {
//   let comments = document.getElementById("comments");
//   comments.innerHTML = `<hr><h4>${name} says<span>${timeStamp}</span></h4><p>${comment}</p>${comments.innerHTML}`;
// }
