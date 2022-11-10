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

const fakeDataBase = new Datastore('database.db');
fakeDataBase.loadDatabase();
for(x=0; x < 20; x++){
    fakeDataBase.insert(MakeProfileDataBase());
}
