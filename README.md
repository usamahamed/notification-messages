# notification-messages
Angular.js module providing notifications used to display information which give the user a feedback and having following features: 
- it displays notifications as overlay in front of the page;
- they have different appearance depending on a category;
- support three different notification categories: "info", "warning" and "error";
- max 5(changeable number) notifications are displayed at the same time by dafault;
- If the max amount of notifications is reached, the notification module combine the oldest notification into one group, thus     the max amount is satisfied again.
- the notifications have a title and a body;
- created notifications are closable;
- closed automatically after 90 seconds(changeable number) by default;
- the service is able to display notifications with confirmations;
- the service can read data from backend side and can send data to it.
# How to Run
1- First git clone 
2- install dependances npm install
3- bower install
4- run grunt on terminal it will listen on port 9000
5- on browser go to this link http://localhost:9000/source/index.html
6- to see docs go to this link http://localhost:9000/docs/index.html#/api/notification-messages
# Test 
 i use protractor and to see test it's necessary to run the app server and the server with json-data on one terminal and 
 other terminal start server with json data :
```bash
cd test/
json-

