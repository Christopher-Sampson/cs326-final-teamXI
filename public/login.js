document.getElementById("login").addEventListener("click", async x =>{
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usersname: username, passwords: password })
    };
    const response = await fetch("/login/name",requestOptions);


    if(response.json != undefined){
    const data = await response.json();
    localStorage.setItem('username', data.username);
    window.location.href= "profilePage.html";

    document.getElementById("fullname").innerHTML = data.name;
    document.getElementById("personLocation").innerHTML = data.address;
    document.getElementById("personPhoneNumber").innerHTML = data.phone;
    document.getElementById("twitter").innerHTML = data.twitter;
    document.getElementById("instagram").innerHTML = data.instagram;
    document.getElementById("personEmail").innerHTML = data.email;
    document.getElementById("personUsername").innerHTML = data.username;
    }
    else { alert("Invalid Login");}
    
});