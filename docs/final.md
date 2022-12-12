## **Team XI**

  

**Site Name**:

basketballsite

**Semester: Fall 2022**

**Overview:**

A basketball coach/player application linked style, that allows a user to create a profile application that shows their information, social medias, and a overview of there skill attributes and a description of them as a person. They can go into length about their strength as a whole and what position they want, similar to that of a job application. If they are a coach, then they can describe themselves as a coach and the team they coach for on their profile. This would be targeted towards amateur basketball players looking to find teams/players to practice/play with, and coaches who who want to scout new talent for their teams. Practice venues and events for tryouts can be hosted by coaches to scout players and they can follow forum posts from players they are interested in and see such a list on their profile.

**Team members:**

Bluboi404: Christopher Velazquez

Thomas-Lombardi: Thomas Lombardi

Christopher-Sampson: Christopher Sampson

**User Interface:**

  

## **Login Page:**
![Screenshot 2022-12-11 214113](https://user-images.githubusercontent.com/113072996/206961027-0e9afa0e-a9b7-45b8-89ef-7e1c5101f10b.png)

User will Login to either their Coach or Player profiles and then be moved to the general homepage. They can create an account on here as well.

## Home Page:

![Screenshot 2022-12-11 233330](https://user-images.githubusercontent.com/113072996/206961377-734b4561-9e59-48b6-8e0d-0dd7501e4aa8.png)


The image above is the application's home page. A general feed will appear in the center, about players and events that are being hosted by coaches. Users can go and check their profiles from here and create events if they are coaches. At the top users can search other players, coaches, events, etc in order to navigate the site.


## Profile Page:
  
![Screenshot 2022-12-11 233222](https://user-images.githubusercontent.com/113072996/206961285-59721a5e-3ef0-4ee5-b3c6-13a48bd2e445.png)


This is a persons profile page. They can put in their personal information, like location, phone number, and more. They also have a small text box to describe themselves in further detail.

  

## Edit Page:

![Screenshot 2022-12-11 233450](https://user-images.githubusercontent.com/113072996/206961540-d06a55e8-4841-427e-9977-a6958ba007d8.png)

Here user will be able to edit information about themselves. Such as location, phone number, email, and their socials.

  

## Create Account:

![Screenshot 2022-12-11 233528](https://user-images.githubusercontent.com/113072996/206961592-3623523d-ca6a-492e-b586-36d437864fb4.png)


Here users will be able to register for an account and log right into their profile.

 ## API:

Our aPI is organized around REST. Accepts from URLs, with encoded bodies, that will return JSON-encoded responses. We use standard HTTP response codes as well.

  

* Encryption: We use encryption to encrypts passwords to hide user data;

  

* Login: Clients can login or register for an account to use our site.

  

* Errors: Standard error reporting for login and creating accounts.

* We use pool/postgres in order to connect to our databases.
* 
* We use express and node.js for communications with servers and clients.
# Database:

## Accounts/Profiles:

* username| text| The username of the account / identifier of the account.

* password| text| The password of the account.

* name| text| User's name.

* instagram| text| Instagram of user.

* twiiter| text| Twitter of user.

* description| text| description of coach/player.

* isCoach| boolean| Profile is either coach or player. (t/f)

* phone| int| Phone number of user.

* address| text| Address of user.
* email|text| Email of user
* salt|text| The salt used to encrypt the user's password

##  Comments: 

* post_id| text| Identifier of the post.

* commentator_id| text| The account of the user who posted the  	comment.

* timeposted| datetime| time/date the comment was made.

## Posts:

* profile_id| text| The username of the profile who made the post.

* title| text| The title of the post.

* description| text| The actual post.

* timeposted| date/time| The time of when posted.


## URL Routes/Mappings:

/post/new : Create a new post with a time stamp and title. Links to the profile_id.

/post/comment/get: Gathers all posts and comments to load on the front page.

/comment/new: Create a comment with a time stamp and an id that connects it to the post.

/profile/name: Display a profile(via a object, read_only)

/profile/new : Create a profile

/login/name : Logs the user with a username and password

/profile/edit : Update/edits the profile

/profile/delete: Deletes profile(including anything linked to their profile id: comments, posts, etc) and user from system, executes an alert to warn user first.

##

  


## Division of Labor: 
Christopher Sampson - documentation, Client side, and some html work.
Christopher Velazquez - Backend work, little bit of Front/Client side end.
Thomas Lombardi - Html, CSS, and Client Side
## Conclusion:
  During the course of the project, our team learned how to design and implement username and password encryption, server storage, jquery, sql, navigation, css and html, node.js, and communication between client and server. Some difficulties we encountered were using heroku, and getting actual connecting to the database server. Another issue was some html/css work where formatting was difficult. I think knowing more about heroku and the libraries to create the project would of helped us later in the run.
