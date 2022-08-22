# BYU AppEng technical challenge Survey of club activity.

# General info

## Language

Node.js

## API

- Person v3
- clubs(v1)

## Purpose

In order to apply my learning, that is  Javascript, SQL. API and AWS,  I make this application. 

It is basically correct the information about what club activities in BYU  people are interested in.  Also, this coding can make tables in the database and edit them. 

## System

### m**ain part (Survey)**

 create table ⇒ get student information ⇒ show the club information. ⇒ correct more detailed information ⇒ saved student information and chosen clubs into the database.

### Subpart( edit database)

check the connection with the database. ⇒ show saved tables ⇒ choose a column and delete it. 

# How to use it

Before using this app, you have to install AWS to be able to access the Oracle database Username and Password.

Please visit the below link and follow the instruction.  

[AWS CLI](https://byu-oit.github.io/Web-Service-Manual-tutorial/tools/awscli.html)

Also, this app requires the token for the BYU API. 

Please visit: [https://tcm.byu.edu/index.html](https://tcm.byu.edu/index.html) and get token.

- Run node index and choose a number.  Number 1 is the survey about club activity. Number 2 is that you can see or delete the data that people saved it.

![Capture.PNG](BYU%20AppEng%20technical%20challenge%20Survey%20of%20club%20acti%20d76e3cc62ef643ffb2003e67d7fb33d3/Capture.png)

- If you choose, Number 1 coding will start to connect with the oracle database. Then if it shows Successful to connect, it is fine.  if not, and shows Unable to connect to the database, now it is impossible to use this program. please check your internet connection.
- After connecting with the database. you need to enter your BYU_ID. Although your BYU_ID is corrected if it shows that ID does not exist, the Token should be expired.

![Capture_2.PNG](BYU%20AppEng%20technical%20challenge%20Survey%20of%20club%20acti%20d76e3cc62ef643ffb2003e67d7fb33d3/Capture_2.png)

- After that, the club list will be shown. you can choose the pages, please enter numbers.  After choosing your favorite clubs, please enter ‘n’
    
    
    ![Capture_3.PNG](BYU%20AppEng%20technical%20challenge%20Survey%20of%20club%20acti%20d76e3cc62ef643ffb2003e67d7fb33d3/Capture_3.png)
    
    ![Capture_4.PNG](BYU%20AppEng%20technical%20challenge%20Survey%20of%20club%20acti%20d76e3cc62ef643ffb2003e67d7fb33d3/Capture_4.png)
    
- the program will ask you to enter your favorite club id, when you enter this number, it shows more detail. Then, if you are interested in this club, Please enter ‘y’ in the next question.  Then, your data about your interesting club is saved in the database.

![Capture_6.PNG](BYU%20AppEng%20technical%20challenge%20Survey%20of%20club%20acti%20d76e3cc62ef643ffb2003e67d7fb33d3/Capture_6.png)

- if you have more, you can see more than one club.

## Database

If you choose Number2,  you can see the previous data. please choose the ID  and delete it if you want. 

![Capture_7.PNG](BYU%20AppEng%20technical%20challenge%20Survey%20of%20club%20acti%20d76e3cc62ef643ffb2003e67d7fb33d3/Capture_7.png)

![Capture_8.PNG](BYU%20AppEng%20technical%20challenge%20Survey%20of%20club%20acti%20d76e3cc62ef643ffb2003e67d7fb33d3/Capture_8.png)

After choosing ID, if it shows Successfully deleted, it literally succeeded to delete it. If you would like to delete more, enter the ID. If not, enter ‘n’. Program will be stopped.

![Capture_9.PNG](BYU%20AppEng%20technical%20challenge%20Survey%20of%20club%20acti%20d76e3cc62ef643ffb2003e67d7fb33d3/Capture_9.png)