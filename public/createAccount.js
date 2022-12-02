document.getElementById("register").addEventListener("click", async()=>{
    const profile = {};
    profile.name = document.getElementById("fullname").value;
    profile.username = document.getElementById("username").value;
    profile.password =  document.getElementById("password").value;
    profile.email = document.getElementById("email").value;
    profile.phone = document.getElementById("phone").value;
    profile.twitter = document.getElementById("twitter").value;
    profile.instagram = document.getElementById("instagram").value;
    if (document.getElementById("iscoach").checked){
        profile.iscoach = true;
    }else{
        profile.iscoach = false;
    }
    //console.log(profile);

    const response = await fetch('/profile/new', {
        method: 'POST',
        headers: {
            'Content-Type': 'basketballsite/json;charset=utf-8'
        },
        body: JSON.stringify(profile)
    });

    if(response.ok){
        const data = await response.json();
        alert(data.status);
    }
    else{
        alert(response.status);
    }
    //return profile;
});