const faker = require("faker");

const Datastore = require('nedb');

function MakeProfileDataBase(){
    const randomName = faker.name.findName();
    const randomAddress = faker.address.streetAddress();
    const randomPhone = faker.phone.phoneNumber();
    const randomInsta = faker.internet.email();
    const randomTwitter = faker.internet.email();
    const randomDesc = faker.lorem.paragraph();
    const randomIsCoach = faker.datatype.boolean();

    return {"Name": randomName, "Instagram": randomInsta, "Twitter": randomTwitter,
    "About-Me": randomDesc, "IsCoach": randomIsCoach, "Phone": randomPhone , "Address": randomAddress
}

}

function MakePostDatabase(){
    const randomTitle = faker.lorem.sentence();
    const randomProfileID = faker.datatype.number();
    const randomDesc = faker.lorem.paragraph();
    const randomTimeposted = faker.datatype.datetime();

    return {"Title": randomTitle, "ProfileID": randomProfileID, "Description": randomDesc, "TimePosted": randomTimeposted}
}

function MakeCommentDatabase(){
    const randomComment_id = faker.datatype.number();
    const randomPostID = faker.datatype.number();
    const randomDesc = faker.lorem.paragraph();
    const randomTimeposted = faker.datatype.datetime();

    return {"CommentID": randomComment_id, "PostID": randomPostID, "Description": randomDesc, "TimePosted": randomTimeposted}

}

function MakeAttributes(){
    const att1 = faker.datatype.number();
    const att2 = faker.datatype.number();
    const att3 = faker.datatype.number();
    const att4 = faker.datatype.number();
    const att5 = faker.datatype.number();
    const att6 = faker.datatype.number();

    return {"Attribute1": att1, "Attribute2": att2, "Attribute3": att3, "Attribute4": att4, "Attribute5": att5, "Attribute6": att6}
}

const fakeProfileDataBase = new Datastore('databaseProfile.db');
fakeProfileDataBase.loadDatabase();

const fakePostDataBase = new Datastore('databasePost.db');
fakePostDataBase.loadDatabase();

const fakeCommentDataBase = new Datastore('databaseComment.db');
fakeCommentDataBase.loadDatabase();

const fakeAttributesDataBase = new Datastore('databaseAttributes.db');
fakeAttributesDataBase.loadDatabase();

for(x=0; x < 20; x++){
    fakeProfileDataBase.insert(MakeProfileDataBase());
    fakePostDataBase.insert(MakePostDatabase());
    fakeCommentDataBase.insert(MakeCommentDatabase());
    fakeAttributesDataBase.insert(MakeAttributes());
}
