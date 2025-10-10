# Edureka Fbook

***

## Features 🚀

* **Framework**: Angular 20
* **Styling**: Bootstrap 5
* **Mock API**: `json-server` running locally and file is in */json-server/db-json*
* **Development**: Uses a local, project-based installation of the Angular CLI

### User Roles

#### User
**this is a normal user and can:**
- Register
- Login
- forgot password reset
- on homepage, can see all the posts from all the user and create new posts, can edit, hide and delete his own post.
- on homepage, can create posts.
- on homepage posts, can click on any user name to go to specific user profile.
- on network page, can see friends, friend request, sent request and all user, can also manage the action like unfriend, send request, cancel request etc.
- side profile icon dropdown: my posts, can see all current user post and can perfor any action like homepage.
- side profile icon dropdown: setting , can edit profile details and can set new password.
- side profile icon dropdown: logout to sign off.

#### Admin User
**this is an admin user and can all the things which normal user can do + :**
- besides the dropdown icon, will see the role super admin.
- profile dropdown icon : All posts, can see all posts from all user (even if it is blocked or hidden) , same on homepage
- can block, delete and unblock any posts in homepage, user profile and all posts page.
- profile dropdown icon : users, can see all the users here even if any user is blocked.
- can block and unblock any user in netwrok, user profile and all users page.

## Prerequisites 📋

* **Node.js** (v18.x or later recommended)
* **npm** (v9.x or later)

***

## Installation & Setup ⚙️

1.  **Navigate to the project directory:**
    ```bash
    cd <your-project-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    This command will install all required packages from `package.json` locally, including Angular, Bootstrap, and `json-server`.

***

## Running the Application ▶️

To start both the Angular development server and the `json-server` mock API simultaneously, run the following command:

```bash
npm start
```
- The Angular application will be available at http://localhost:4200/.

- The mock API server will be available at http://localhost:3000/.

The npm start script will start the both angular and json server on local.

## Mock API Data 📦
The data for the mock API is stored in the /json-server/db.json file in the root of the project. You can edit this file to change the data that json-server provides to the application.

