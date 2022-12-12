
const postbutton = document.getElementById('postbutton');
const container = document.getElementById('postcontainer');
const username = localStorage.getItem('username');

loadAllSavedposts();
async function  loadAllSavedposts() {
    const response = await fetch('/post/comment/get', { 
        method: 'GET' ,
        headers: {
            'Content-Type': 'application/json',
        }
    });
    let res  = await response.json();
    console.log(res);
    const posts = res.send[0].rows;
    const comments = res.send[1].rows;
    if (posts.length> 0){
    
        for (let i = 0; i < posts.length; i++){
            createPost(posts[i].profile_id, posts[i].title, posts[i].description, posts[i].timeposted);
        }
        for( let i = 0; i < comments.length; i++){
            createComment(comments[i].post_id, comments[i].commentor_id, comments[i].description, comments[i].timeposted);
        }
    
    }
};

postbutton.addEventListener('click', async () =>{
        let postTitle = document.getElementById('postTitle').value;
        let postBody = document.getElementById('postBody').value;
        let time = getCurrentDateTime();
        const post = {username: username, title: postTitle, description: postBody, timeposted: time};
        createPost(username,postTitle, postBody, time);

        $(function () {
            $('#exampleModal').modal('toggle');
         });
         
         const response = await fetch('/post/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(post),
            });

});



function createPost(user,title,body,time){
    
    let temp = document.getElementsByClassName('emptypost')[0].cloneNode(true);

    temp.style.display = 'block';
    temp.classList.remove('emptypost');
    temp.classList.add('post');

    container.insertBefore(temp, container.firstChild);

    document.getElementsByClassName("postuser")[1].innerHTML= user;
    document.getElementsByClassName("title")[1].innerHTML = title;
    document.getElementsByClassName("textbody")[1].innerHTML = body;
    document.getElementsByClassName("timeposted")[1].innerHTML = time;
    
    let num = document.getElementsByClassName("post").length;
    document.getElementsByClassName("collapse")[2].id = "post" + num;
    document.getElementsByClassName("collapse-button")[1].dataset.target  = "#post" + num;
    document.getElementsByClassName("collapse-button")[1].setAttribute("aria-controls","post" + num)
    


    let commentbutton = document.getElementsByClassName("comment-button")[1];
    commentbutton.id = "post"+num+"-comment-button";
    document.getElementsByClassName("comment-input")[1].id = "post"+num+"-comment-input";
    document.getElementsByClassName("comment-list")[1].id = "post"+num+"-comment-list";

    
    
    commentbutton.addEventListener("click", async () => {
            let num  = document.getElementsByClassName("post").length;
            let text = document.getElementById("post"+num+"-comment-input").value;
            let time = getCurrentDateTime();
            createComment(num,username, text,time);

            const comment = {};
            comment.post_id = num;
            comment.username = username;
            comment.description = text;
            comment.timeposted = time;

            const response = await fetch('/comment/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(comment),
            });
    });


}

function createComment(postnum, user,body,time){
    let temp = document.createElement("li");
    let parent = document.getElementById("post"+postnum+"-comment-list");
    temp.classList.add("comment-" + postnum + "" + document.getElementsByClassName("comment-" + postnum).length);
    temp.classList.add("comment-" + postnum );
    temp.innerHTML = time + ",  " + "<strong> " +user + " </strong>" + " : "  + body;
    parent.insertBefore(temp, parent.firstChild);

}


function getCurrentDateTime() {
    var date = new Date();
    
    var year = date.getFullYear();
    var month = date.getMonth() + 1; 
    var day = date.getDate();
  
   
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
  
    
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
  
    
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  }