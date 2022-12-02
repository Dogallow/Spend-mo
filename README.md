
# <img src="https://user-images.githubusercontent.com/95613961/205343045-45c3649d-9142-4e0e-8670-0319946e1be2.png" alt="Logo" /> 

Spend-mo is an application inspired by [Venmo](https://venmo.com/). Spend-mo, much like venmo, is a creative platform that solves the issue of convenient money transferring services and adds a fun twist of a social media landscape that helps users display their transactions and connect with other users in a fun and transparent manner.



<a href="https://spend-mo.onrender.com/" target="_blank">Link to live site</a>



## Built using:

  * <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" />
  * <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  * <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  * <img src="https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue" />
  * <img src="https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white" />
  * <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />

## Links to project Wiki:
 * [Database Schema](https://github.com/Dogallow/Spend-mo/wiki/Database-Schema)
 * [Feature List](https://github.com/Dogallow/Spend-mo/wiki/Feature-List)
 * [User Stories](https://github.com/Dogallow/Spend-mo/wiki/User-Story)
 * [Wireframe](https://github.com/Dogallow/Spend-mo/wiki/Wireframe)
 
 ## Getting Started
 
 If you want to clone to your local machine and add some changes yourself. Follow these simple steps:

1. Clone the repo
 - SSH Version:
 ``` 
 git@github.com:Dogallow/Spend-mo.git
 ```
 or
 -HTTPS Version:
 ```
 https://github.com/Dogallow/Spend-mo.git
 ```
 2. Install Packages:
 ```
 pipenv install
cd react-app
npm install
 ```
 3. Create a .env file and set the environment variables for SECRET_KEY and DATABASE_URL to your choosing.
 4. Migrate and seed the files.
 ```
 flask run db init
flask run migrate
flask seed all
 ```
 5. Run the server and start the react app
 ```
 pipenv run flask run
cd react-app
npm start
 ```
 
 # Usage
 
 ## Sign In or Sign Up
 Users can sign in to their existing account or create a new account. 
 
 ## Instructions
 If you are confused or don't know where to start the instructions page is a great place to get a better understanding of how to navigate the application.
 
 ## Landing Page
 Here are all the successful transactions that now are displayed to all users in the form of a post.
 
 ## Pay or Request
 Here users can initiate payment requests or automatically send payments.
 
 ## Deposit or Withdraw
 Here users can deposit funds or withdraw funds to/from their wallet.
 
 ## Incomplete / Notifications
  * Incomplete tab is where you can view all of your transactions that you have requested that are still in a pending state.
  * Notifications tab is where you can view all transactions that have been sent by you or transactions that need to be accepted or declined by you.

## Roadmap

- [x] Create CRUD features for Wallet
- [x] CRUD features for Posts
- [ ] CRUD features for Likes
- [ ] CRUD features for Comments
- [ ] CRUD features for Follows
- [ ] Implement AWS

Created By Donovan Galloway: [<img color="white" src='https://user-images.githubusercontent.com/95613961/205353832-83632c8d-1016-4263-ac50-16436e246fd8.svg' target='_blank' alt='Github Logo' width=30px height=27px />](https://github.com/Dogallow)[<img src='https://user-images.githubusercontent.com/95613961/205356256-82238182-71a7-4726-b470-52df7a52c87b.svg' target='_blank' alt='' width=30px height=30px/>](https://www.linkedin.com/in/donovan-galloway-927190233/)


