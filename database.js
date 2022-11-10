const faker = require("faker");
const {v4: uuidv4} = require('uuid');
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

var dataBase = {};
for(x=0; x < 20; x++){
    const uuid = uuidv4();
    dataBase[uuid] = MakeProfileDataBase();
}

const file = dataBase;
module.exports = {file};