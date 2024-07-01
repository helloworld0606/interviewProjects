# Login Page

## Environment Requirements
- Node.js v20.11.1
- npm v10.5.0
- Windows 10

## Installation Instructions

1. **Clone the repository**
    ```bash
    git clone https://github.com/helloworld0606/interviewProjects.git
    ```

2. **Run the backend server**
    ```bash
    cd interviewProjects/backend
    npm install
    npm audit  # find security vulnerabilities
    npm audit fix  # fix any security vulnerabilities
    node server.js
    ```

3. **Run the frontend server** (open another cmd)
    ```bash
    cd interviewProjects/frontend
    npm install
    npm audit  # find security vulnerabilities
    npm audit fix  # fix any security vulnerabilities
    npm run serve
    ```

4. **The app will run at [http://localhost:8080/](http://localhost:8080/)**



## Account info in db.json
(make sure backend is running)

Get account
```bash
curl -X GET http://localhost:3000/users
```
Add account
```
curl -X POST "http://localhost:3000/users" -H "Content-Type: application/json" -d "{\"id\": 2, \"name\": \"James\", \"account\": \"james123@gmail.com\", \"password\": \"DEF789\"}"
```
Login account
```
curl -X POST "http://localhost:3000/users/login" -H "Content-Type: application/json" -d "{\"account\": \"james123@gmail.com\", \"password\": \"DEF789\"}"
```

## Test account:
```
Account: alice123@gmail.com
Password: ABC123456
```

- The login info will be saved in session storage
- To try a new login, open the inspect window —> go to Application —> SessionStorage —> clear all login records —> refresh the website
