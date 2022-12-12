
document.getElementById("register").addEventListener("click", async x =>{
    const profile = {};
    profile.name = document.getElementById("fullname").value;
    profile.username = document.getElementById("username").value;
    profile.password =  document.getElementById("password").value;
    profile.email = document.getElementById("email").value;
    profile.phone = document.getElementById("phone").value;
    profile.twitter = document.getElementById("twitter").value;
    profile.instagram = document.getElementById("instagram").value;
    profile.address = document.getElementById("address").value;
    profile.description = document.getElementById("description").value;
    if (document.getElementById("iscoach").checked){
        profile.iscoach = true;
    }else{
        profile.iscoach = false;
    }

    if(profile.phone.length > 10 || /{a-z}/.test(profile.phone)){
        alert("Phone number too long.");
    }
    else if (profile.password.length < 12){
        alert("Password is too short.")
    }
    else{
    const response = await fetch('/profile/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
    });

    const data = await response.json();
    
    if(data.error){
        alert(data.error);
    }
    else if(response.status == 200){
        localStorage.setItem('username', profile.username);
        window.location.href= `profilePage.html?username=${profile.username}`;
    }
    else{
        alert("Invalid parameter");
    }

    }
});