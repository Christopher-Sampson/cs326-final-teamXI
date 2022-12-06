## **DataBase Structure:**
Refering to Database representation(image in docs), on heroku we have 4 tables each connected via relation on the specific id of each table.
**The tables are as follows:**
* Accounts/Profiles:
  * id| int| The unique identifier of the account.
  * username| text| The username of the account.
  * password| text| The password of the account.
  * name| text| profile name.
  * instagram| text| Instagram of user.
  * twiiter| text| Twitter of user.
  * description| text| description of coach/player.
  * isCoach| boolean| Profile is either coach or  player.
  * phone| int| Phone number of user.
  * address| text| Address of user.
* Comments:
  *  id| int| Identifier of the comment.
  * commentator_id| int| The account id of the user who posted the comment.
  * post_id| int| The post id that this comment is linked to.
  * timeposted| datetime| time/date the comment was made. 
* Posts:
  * id| int| The posts id.
  * profile_id| int| The id of the profile who made the post.
  * title| text| The title of the post.
  * description| text| The actual post.
  * timeposted| date/time| The time of when posted.
* Attributes:
  * att1-6| int| A number for the specific skill referenced by att1 through att6.
  * id| int| The id of the attribute set.
  * profile_id| int| The id of the profile this is attached too.


## Labor Divsions:##
 Databse Logic and Server implemntation: All
 Rendering to html: Thompson
 Documentation: Chris S.
 Planning of Database: All


