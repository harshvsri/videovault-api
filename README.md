# VideoVault-Server

Backend API for the VideoVault platform, a dynamic video sharing and streaming platform inspired by YouTube. It handles video uploads, user authentication, comments, likes, and search functionality.

## Contribution Guide

If you're a beginner and want to contribute to this project, follow these steps:

1. **Fork the Repository**: Click on the fork button at the top right corner of this page and clone the forked repository to your local machine. This creates a copy of this repository in your account.

   ```bash
   git clone https://github.com/<your-username>/videovault-server.git
   ```

2. **Server Setup**: After setting up the client, you need to set up the server:

   - **Create a .env file**: Create a new file in the server directory of the project named `.env`. Inside the `.env` file, add the following lines:

     ```properties
     DB_URL = "mongodb://127.0.0.1:27017/kinetoDB"
     SESSION_SECRET = "this is a secret"
     ```

     These are environment variables that the server needs to run properly. Make sure to replace the values with your actual database URL and session secret.

   - **Install Dependencies**: Navigate to the server directory and install the necessary dependencies using npm:

     ```bash
     cd server
     npm install
     ```

   - **Install Nodemon Globally**: If you're planning to make changes in the server, it's recommended to install Nodemon globally. Nodemon is a utility that will monitor for any changes in your source and automatically restart your server. You can install it using npm:

     ```bash
     npm install -g nodemon
     ```

3. **Create a New Branch**: Use the `git checkout` command to create a new branch.

   ```bash
   git checkout -b <your-branch-name>
   ```

4. **Make Changes**: Make your changes in the new branch.

5. **Commit and Push Your Changes**: Once you have made your changes, use the `git add` command to stage your changes for commit. Then, use the `git commit` command to commit your changes.

   ```bash
   git add .
   git commit -m "<your-commit-message>"
   git push origin <your-branch-name>
   ```

6. **Create a Pull Request**: Go to your repository on GitHub, you will see a `Compare & pull request` button. Click on that button to create a pull request.

Thank you for your contribution! 🎉
