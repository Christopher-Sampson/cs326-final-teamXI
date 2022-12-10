
const username = localStorage.getItem('username');

async function render(username){

    const requestOptions = {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ usersname: username })
    };
    const response = await fetch("/profile/name",requestOptions);
    const data = await response.json();
    return data;

};

const profile = await render(username);
console.log(profile);

document.getElementById("fullname").innerHTML = profile.name;
document.getElementById("personLocation").innerHTML = profile.address;
document.getElementById("personPhoneNumber").innerHTML = profile.phone;
document.getElementById("twitter").innerHTML = profile.twitter;
document.getElementById("instagram").innerHTML = profile.instagram;
document.getElementById("personEmail").innerHTML = profile.email;
