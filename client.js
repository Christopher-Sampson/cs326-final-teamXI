
async function getProfile(Name) {
    const response = await fetch('/profile/name', {
        method: 'GET',
        body: JSON.stringify(Name),
    });
    const data = await response.json();
    return data;
};

async function NewProfile(profileObject) {
    
    const requestOptions = {
        method: 'POST',    
        body: JSON.stringify(profileObject),
    };   
    
    const response = await fetch('/profile/new', requestOptions);
    const data = await response.json();
    return data;
};

async function EditProfile(name, UpdateObject) {//Name is a string, UpdateObject is a object with the key to be updated
    
    const requestOptions = {
        method: 'PUT',
        name: JSON.stringify(name),
        body: JSON.stringify(UpdateObject),
    };   

    const response = await fetch('/profile/edit', requestOptions);
    const data = await response.json();
    //element.innderHTML = data; something like this
};

async function DeleteProfile(name) {
    const response = await fetch('/profile/delete', name);
    const data = await response.json();
    return "Success";
}

async function NewPost(postObject) {   

};

async function NewComment(commentObject) {

};

async function EditAtttributes(postObject) {

};

async function DeletePost(postObject) {

};

async function DeleteComment(commentObject) {

};

