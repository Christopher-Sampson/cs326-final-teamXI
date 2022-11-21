**Breakdown**
The website uses a relational database of username | password | profile object | post objects | attributes objects. The website runs on a live server that
is connected to the Horoku database, so any jquery from the client would get passed through the live server and then sent to database, and the data is returned to the client. Database.js modifies any information in the database. Server.js is an API that executes any queries by calling the relevant database.js functions.
The website is tested by running server.js (while having Node.js installed and the express package), and connecting to localhost:8000. The Horoku database must also be running. Any data that is imputted will be synced to the database that is passed through the server.

**Participation BreakDown**
Thomas Lombardi - server.js, createAccount.js
Christopher Velazquez - server.js, database.js, secrets.json, client.js
Christopher Sampson - milestone3.md

