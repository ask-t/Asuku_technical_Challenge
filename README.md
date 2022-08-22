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

1. Run node index and choose a number.  Number 1 is the survey about club activity. Number 2 is that you can see or delete the data that people saved it. 
2. If you choose, Number 1 coding will start to connect with the oracle database. Then if it shows Successful to connect, it is fine.  if not, and shows Unable to connect to the database, now it is impossible to use this program. please check your internet connection.
3. After connecting with the database. you need to enter your BYU_ID. Although your BYU_ID is corrected if it shows that ID does not exist, the Token should be expired.  After that, the club list will be shown. you can choose the pages, please enter numbers.  After choosing your favorite clubs, please enter ‘n’ 
4. the program will ask you to enter your favorite club id, when you enter this number, it shows more detail. Then, if you are interested in this club, Please enter ‘y’ in the next question. 
5. if you have more, you can see more than one club. 

## database

If you choose Number2,  you can see the previous data. please choose the ID  and delete it if you want.
