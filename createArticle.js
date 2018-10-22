const database = firebase.database();

// root is database.ref

let articlesRef = database.ref("articles")

// child node of articlesRef (articles)
// and that child node will have a unique id
let articleRef = articlesRef.push()

articleRef.set({
  title : "Hello World",
  description : "Welcome to my article! "
  //publishedDate : Date.now().toString
})
