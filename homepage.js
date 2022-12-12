const submit = document.getElementById('submit');
const container = document.getElementById('postcontainer');


submit.addEventListener('click', () =>{
        let postTitle = document.getElementById('postTitle').value;
        let postBody = document.getElementById('postBody').value;
        let time = getCurrentDateTime();
        createPost("tbd",postTitle, postBody, time);
        $(function () {
            $('#exampleModal').modal('toggle');
         });
        // this is where you can add post to the db
        /*
            tbd === user === profile-id
            postTitle === title
            postBody === description
            time === timeposted 
        */
        

});



function createPost(user,title,body,time){
    
    let temp = document.getElementsByClassName('emptypost')[0].cloneNode(true);

    // remove the hidden aspect and class name "emptypost" and add  "post" + how many posts currently;
    temp.style.display = 'block';
    temp.classList.remove('emptypost');
    temp.classList.add('post');

    container.insertBefore(temp, container.firstChild);

    // the index is 1 because of the template and you are insertBefore the new element
    document.getElementsByClassName("postuser")[1].innerHTML= user;
    document.getElementsByClassName("title")[1].innerHTML = title;
    document.getElementsByClassName("textbody")[1].innerHTML = body;
    document.getElementsByClassName("timeposted")[1].innerHTML = time;
    

    // fixes the collapsible part so that its unique to its post
    let num = document.getElementsByClassName("post").length;
    document.getElementsByClassName("collapse")[2].id = "post" + num;
    document.getElementsByClassName("collapse-button")[1].dataset.target  = "#post" + num;
    document.getElementsByClassName("collapse-button")[1].setAttribute("aria-controls","post" + num)
    


    let commentbutton = document.getElementsByClassName("comment-button")[1];
    commentbutton.id = "post"+num+"-comment-button";
    document.getElementsByClassName("comment-input")[1].id = "post"+num+"-comment-input";
    document.getElementsByClassName("comment-list")[1].id = "post"+num+"-comment-list";

    
    
    commentbutton.addEventListener("click", () => {
            let num  = document.getElementsByClassName("post").length;
            let text = document.getElementById("post"+num+"-comment-input").value;
            let time = getCurrentDateTime();
            createComment(num,"tbd", text,time);

            // this is where you can push this comment to db
            // num === postid
            // tbd === user === commenter username 
            // text === description 
            // time === timeposted (its a string in the format of 2022-12-11 19:14:46)
    });


}

function createComment(postnum, user,body,time){
    let temp = document.createElement("li");
    let parent = document.getElementById("post"+postnum+"-comment-list");
    temp.classList.add("comment-" + postnum + "" + document.getElementsByClassName("comment-" + postnum).length);
    temp.classList.add("comment-" + postnum );
    temp.innerHTML = time + " " + user + " : "  + body;
    parent.insertBefore(temp, parent.firstChild);

}


function getCurrentDateTime() {
    // Create a new date object
    var date = new Date();
  
    // Get the year, month, and day as numbers
    var year = date.getFullYear();
    var month = date.getMonth() + 1; // Months are zero-based in JavaScript
    var day = date.getDate();
  
    // Get the hours, minutes, and seconds as numbers
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
  
    // Pad the numbers with leading zeros, if necessary, so that they always have two digits
    month = month < 10 ? "0" + month : month;
    day = day < 10 ? "0" + day : day;
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
  
    // Return the date and time in the specified format
    return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;
  }