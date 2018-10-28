

let articles = document.getElementById('articles');

const database = firebase.database()
const usersRef = database.ref("users")
let userRef = null
let list = [];
let articleContent = [];

let title = document.getElementById('title')



firebase.auth().onAuthStateChanged(function(user){
    if(user) {
        console.log("hey I'm working")
        console.log(user.uid)
        userRef = usersRef.child(user.uid)
        // console.log(userRef)


        userRef.on('value', function(snapshot){
            snapshot.forEach(function(item){

                item.forEach(function(attribute){
                    let article = attribute.val()
                    let title = article.title
                    let description = article.description
                    let dateTime = article.publishedDate
                    let articleId = attribute.key

                    let newObj = {
                        title,
                        description,
                        publishedDate: dateTime,

                        articleId
                    }
                    list.push(newObj)

                })
            })
            let articleList = list.map((item) => {
                return `
                <div>
                <a href="article.html?articleId=${item.articleId}"><h5 id="title">${item.title}</h5></a>
                <p>${item.description}</p>
                <p id="dateTime">${item.publishedDate}</p>
                </div> <hr/>`;
            })

            articles.innerHTML = articleList.join('');
        })
//-------------------------------------------------------------------------------

    } else {
        console.log("No user signed in")
    }
})
