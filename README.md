# !Limbo
### A professional networking platform

Our mission is to help expand user's professional network by generating
a common topic of discussion.

We begin engineers and other professionals together by offering providing
articles sourced using the HackerNews API. These articles serve as an
icebreaker. Users can read, comment, and connect with other users reading the
articles. New articles are replenished daily, and there is an option to
bookmark favorite articles. Users will also be able to share their contact information
(Github, Linkedin, Twitter, etc) on our platform to help expand their network.

## Usage
### Prerequisite 
- MySQL 5.7
- Node 11.X
There are two parts of this project: the web application and backend API. You will need both of them running.

API (located in `api/`):
1. Run the SQL script `scripts/sql/create_tables.sql` to setup the tables.
2. Go into the `api/` directory, run `sudo yarn install` to install dependencies.
3. In the same folder, run `node index.js` or other program of your preference to start the API.
4. Go to your browser, input url `localhost:4000`. If you see the message "Hello from port 4000", then the API is up and running.

Web Application (located in `ilimbo/`):
1. Go into the `ilimbo/` directory, run `sudo npm install`
2. In the same folder, run `npm start` to start the web application.
3. Go to your browser, input url `localhost:3000`, if you can see the default article on the landing page, then your application is running.
4. If you keep your API running, you will see a new article on the home page or landing page everyday.

## Live Website
[https://www.ilimbo.space]

## Authors
##### Sumin Yu
##### Rui Feng
##### Jian Huang
