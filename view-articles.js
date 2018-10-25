

let articles = document.getElementById('articles');

const database = firebase.database()
const usersRef = database.ref("users")
let myUserId = firebase.auth().currentUser.uid;


let list = [];

usersRef.on('value', function(snapshot){
    snapshot.forEach(function(item){
            if (item.val().articles){
                let obj = Object.values(item.val().articles)
                // console.log(obj, "this is working")
                for (let key in obj) {
                    //console.log(obj[key])
                    let description = obj[key]['description']
                    let title = obj[key]['title']
                    let dateTime = obj[key]['publishedDate']
    
                    let newObj = {
                        title: title,
                        description : description ,
                        publishedDate : dateTime
                    }
    
                    list.push(newObj);
                }
            }
    
                let articleList = list.map((item) => {
                    return `
                    <div>
                    <h5>${item.title}</h5>
                    <p>${item.description}</p>
                    <p id="dateTime">${item.publishedDate}</p>
                    </div>`;
                })
    
                articles.innerHTML = articleList.join('');
        })
    })




