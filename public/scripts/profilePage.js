
const username = localStorage.getItem('username');

async function render(username){

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username })
    };
    const response = await fetch("/profile/name/",requestOptions);
    const data = await response.json();
    return data;

};

const profile = await render(username);

document.getElementById("fullname").innerHTML = profile.name;
document.getElementById("personLocation").innerHTML = profile.address;
document.getElementById("personPhoneNumber").innerHTML = profile.phone;
document.getElementById("twitter").innerHTML = profile.twitter;
document.getElementById("instagram").innerHTML = profile.instagram;
document.getElementById("personEmail").innerHTML = profile.email;
document.getElementById("personUsername").innerHTML = profile.username;
document.getElementById("desc").innerHTML = profile.description;

let number = 0;
if(profile.iscoach){
    number = Math.floor(Math.random() * 5) + 1;
    document.getElementById("profileImg").src = `images/${number}.jpg`;
}
else{
    number = Math.floor(Math.random() * 5) + 5;
    document.getElementById("profileImg").src = `images/${number}.jpg`;
}

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

document.getElementById("deleteAcc").addEventListener("click", async () =>{
    const result = confirm("Are you sure?");
    
    if(result){
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: username })
    };
    const response = await fetch("/profile/delete",requestOptions);

    if(response.ok){
        alert("Account has been deleted");
        localStorage.clear();
         window.location.href= "index.html";
    }
    }

});