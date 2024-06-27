# Login Page

## Environment Requirements
- Node.js v20.11.1
- npm v10.5.0

## Installation Instructions

1. **Clone the repository**
    ```bash
    git clone https://github.com/helloworld0606/interviewProjects.git
    ```

2. **Install dependencies**
    ```bash
    cd interviewProjects
    npm install
    ```

3. **Run the backend server**
    ```bash
    cd backend
    node server.js
    ```

4. **Run the frontend server** (open another cmd)
    ```bash
    cd ../frontend
    npm run serve
    ```

## The app will run at [http://localhost:8080/]

### Get account info in `db.json`
```bash
curl -X GET http://localhost:3000/users

>Test account info:
Account: alice123@gmail.com
Password: ABC123456

>The login info will be saved in session storage
To try a new login, open the inspect window —> go to Application —> SessionStorage —> clear all login records —> refresh the website
