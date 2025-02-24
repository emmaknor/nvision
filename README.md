
# NVision Nutrition

<img width="1208" alt="Screen Shot 2021-04-09 at 3 55 04 PM" src="https://user-images.githubusercontent.com/73598239/114244553-f8298680-994b-11eb-94a8-e0807c6d9aa0.png">

## About

NVision Nutrition is a web and mobile-friendly nutrition tracking application that aims to encourage users on their weight loss journey. This app provides an easily accessible user interface to facilitate the key concept that fueling your body is a crucial element to living a healthy lifestyle.

A user will first sign up for an account where they are able to enter their calorie, macro, and water goals. Upon log in the user is able to submit entries and then will be updated on their progress and recieve motivation based on their daily activity. Our hope is to  support people in achieving their weight loss goals in a fun, motivational way.


## Contributors:

[Scott Guinn](https://github.com/Scott-Guinn) - Lead Software Architect

[Ciaddie Rutelionis](https://github.com/Ciaddie) - Product Manager

[Taylor Smart](https://github.com/taylorsmart) - UX Designer

[Dennis Mejia](https://github.com/dennismejia) - UI Designer

[Emma Knor](https://github.com/emmaknor) - UI Designer

[Mauricio Moreno](https://github.com/mmoren01) - Graphic Designer

[Oren Nelson](https://github.com/nohren) - Security Architect

[Ben Kennedy](https://github.com/benkennedy98) - Security Architect


## Tech Stack
NVision Nutrition utilizes the Next.js framework with React for the front-end library and Node serverless functions combined with PostgreSQL persistence for the back-end.  Chosen deployment method: Vercel and AWS (database).

| React  |  Node  | PostgreSQL | Next.js| NextAuth.js | Vercel |  Axios |
| :-------------------------:|:-------------------------: |:-------------------------: |:-------------------------: |:-------------------------:|:-------------------------:|:-------------------------: |
|<img src="https://user-images.githubusercontent.com/73598239/114254313-c7594980-996b-11eb-9839-d92245d85665.png" width="130" height="100">  |  <img src="https://user-images.githubusercontent.com/73598239/113373808-e7b05500-9328-11eb-8f31-38830ea4a3c8.png" width="130" height="100">  |  <img src="https://user-images.githubusercontent.com/73598239/114254174-118dfb00-996b-11eb-8221-46a413e9d01d.png" width="130" height="100"> |  <img src="https://user-images.githubusercontent.com/73598239/114254162-08049300-996b-11eb-854c-d71ed3c46be3.png" width="130" height="100"> |  <img src="https://user-images.githubusercontent.com/73598239/114254306-c1fbff00-996b-11eb-9213-aba771023111.png" width="130" height="100"> |  <img src="https://user-images.githubusercontent.com/73598239/114254311-c4f6ef80-996b-11eb-8854-891acaea90aa.png" width="130" height="100"> | <img src="https://user-images.githubusercontent.com/73598239/113373813-ebdc7280-9328-11eb-8a4e-dcee209e0861.png" width="130" height="100"> |



## Technical Challenges:

* Initially deploying to the free Heroku platform allowed for rapid development, but we soon encountered issues with the database connection limits on the Hobby-Dev plan of Heroku. A 20 connection max forced our team to pivot our database deployment to AWS which allowed for additional connections, and pooling connections, to satisfy the needs of our client MVP.
* Syncing the date between the front and back end frameworks proved unexpectedly challenging.  It was important from the user perspective, to keep the front end aligned with their local time zone.  The server, in contrast, had no local timezone up on deployment.  We debated several potential fixes for this and ultimately decided to pass the date values from the front end to the backend while standardizing our backend server to MST (the timezone of our client).
* Over the course of this project we were tasked with balancing client expectations and developing a fully functional app within our one week time constraint. Given the short timeframe, our team prioritized the basic foundational features of a nutrition app. Once basic features were met, we moved on to more accessory features.
* Adapting to the unique advantages and challenges presented by a serverless architecture, coupled with deployment to the Vercel network, forced us to utilize npm packages without native dependencies and adopt a git workflow that was optimized for feature branch additions and reviews.
* The security team utilized the Next-Auth API which required an understanding of JSON Web Tokens and how to add user data to them within the API flow.


## Client Deliverables:

User Stories
* As a user I should be able to create an account with NVision Nutrition with calorie, weight, and water goals.
* As a user, after creating an account I should be able to log into my account.
* As a user, I should be able to record my caloric consumption for a given day.
* As a user, I should be able to record water intake in ounces.
* As a user, I should be able to record my weight.
* As a user, I would like to receive progress reports after consumption input.
* As a user, I should be able to view daily and historical calorie counts, water consumed in ounces, and weight measurements.
* As a user, upon submitting health metrics I expect my dashboard to reflect my current intake in respect to my predefined goals.
* As a user, I should be able to recieve a motivational message when I am struggling to meet my daily goals.
* As a user, I expect to recieve a celebratory message when I have met my goals.


## MVP

Sign-up:

![](signup.gif)

Login and data entry:

![](meal-entry.gif)

Data charts:

![](charts.gif)


## Workflow:
![](git-workflow.gif)

Our team implemented an agile development methodology as well as a modern Git workflow over the course of this project. We established the roles for our team early on in order to facilitate efficient team dynamics. We utilized a main (production) branch, testing branch, and seperate feature branches. Each team member made pull requests to the testing branch and our code reviews consisted of approval from one person within a feature team as well as an outside team member.


[Ticketing System](https://app.asana.com/0/1200144939863904/board)

[Wireframe](https://www.figma.com/file/UlLnGihRrXrBesmVPPHJ1A/nVision-Nutrition?node-id=0%3A1)
