# How to Run the ADS Guide Chatbot

The "ADS Guide" chatbot requires a backend server to handle secure communication with OpenAI and user authentication.

## Prerequisites
1.  **Node.js**: You need Node.js installed on your computer.
    - Download and install from: [https://nodejs.org/](https://nodejs.org/) (LTS version recommended).
    - Verify installation by opening a terminal and running: `node -v`

## Setup Instructions

1.  **Open the Server Directory**:
    Open your terminal (Command Prompt or PowerShell) and navigate to the server folder:
    ```bash
    cd "c:\Users\almoa\OneDrive\Attachments\A.D.S Islam\ali.dir.so-1\server"
    ```

2.  **Install Dependencies**:
    Run the following command to install the necessary libraries:
    ```bash
    npm install
    ```

3.  **Configure Environment**:
    - You will find a file named `.env.example`.
    - Rename it to `.env` (or create a new file named `.env`).
    - Open it and paste your OpenAI API Key:
      ```env
      PORT=3000
      JWT_SECRET=my-super-secret-key-123
      OPENAI_API_KEY=sk-proj-YOUR_ACTUAL_API_KEY_HERE
      ```

4.  **Start the Server**:
    Run the server:
    ```bash
    npm start
    ```
    You should see: `Server running on http://localhost:3000`

## Using the Guide
1.  Go back to the main folder and open `guide.html` in your browser (or use the "AI Guide" link on the homepage).
2.  Click **Log In** -> **Sign Up** to create a new account (this is local to your computer).
3.  Once logged in, you can start chatting!
