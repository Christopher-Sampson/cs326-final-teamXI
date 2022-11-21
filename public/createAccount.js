document.getElementById("register").addEventListener("click", ()=>{
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
    console.log(profile);
    return profile;
});