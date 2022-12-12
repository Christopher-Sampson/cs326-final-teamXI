
const username = localStorage.getItem('username');

document.getElementById("profilepage").addEventListener("click",  () =>{

    window.location.href= `profilePage.html?username=${profile.username}`;

});
document.getElementById("edit").addEventListener("click", () =>{

    window.location.href= `edit.html?username=${profile.username}`;

});

document.getElementById("homepage").addEventListener("click", () =>{

    window.location.href= `homePage.html?username=${profile.username}`;

});

document.getElementById("logout").addEventListener("click", () =>{

    localStorage.clear();
    window.location.href= "index.html";

});