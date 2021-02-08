# This is a simple login app

### Run locally
#### Running the frontend
 - ```cd ui```
 - ```npm install```
 - ```npm build```
#### Running the backend
 - ```cd ..```
 - ```pip install -r requirements.txt```
 - ```cd server```
 - ```python server.py db``` to flush database or ```python server.py```

Go to `http://localhost:5000/` to run app.

### Run with Docker (well, almost... )
- ```docker build .```
- ```docker run -it -p 5000:5000 loginappgw:latest```

Go to `http://localhost:5000/` to run app. Oups. It doesn't work yet.

### Testing
One user is already created:
- email ```groot@yopmail.com```
- password ```gr00t```

You can also sign-up to create new user.
