
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

document.getElementById("edit").addEventListener("click", x =>{

    window.location.href= "edit.html";

});

document.getElementById("homepage").addEventListener("click", x =>{

    window.location.href= "homePage.html";

});

document.getElementById("logout").addEventListener("click", x =>{

    localStorage.clear();
    window.location.href= "index.html";

});

document.getElementById("deleteAcc").addEventListener("click", async x =>{
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