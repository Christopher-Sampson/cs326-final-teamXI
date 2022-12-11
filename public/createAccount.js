
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
    if (document.getElementById("iscoach").checked){
        profile.iscoach = true;
    }else{
        profile.iscoach = false;
    }
    /*const divImage = document.getElementById("imgGrid");
    for (i = 1; i < 11; i++){
        const img = document.createElement(i.toString());
        img.setAttribute("src", "public/images/" + i.toString());
        img.setAttribute("height", "100");
        img.setAttribute("width", "100");
        divImage.appendChild(img);
        console.log("hi");

    }*/


    if(profile.phone.length > 10 ){
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
    
    console.log(response.status);
    if(response.status == 200){
        localStorage.setItem('username', profile.username);
        window.location.href= "profilePage.html";
    }
    else{
        alert("Invalid parameter");
    }

    }
});