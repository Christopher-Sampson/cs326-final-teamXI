
document.getElementById("save").addEventListener("click", async x =>{

    const username = localStorage.getItem('username');
    const profile = {};
    profile.name = document.getElementById("editName").value;
    profile.email = document.getElementById("editEmail").value;
    profile.phone = document.getElementById("editPhone").value;
    profile.address = document.getElementById("editAddress").value;
    profile.username = username;
    /*if (document.getElementById("iscoach").checked){
        profile.iscoach = true;
    }else{
        profile.iscoach = false;
    }*/
    if(profile.phone.length > 10 || /{a-z}/.test(profile.phone)){
        alert("Phone number too long / or incorrect format.");
    }
    else{
    const response = await fetch('/profile/edit', {
        method: 'PUT',
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