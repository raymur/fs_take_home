# Backend
* Framework: Flask
* Database: SQLite 

#### Running Backend
Dependencies: Python 3.10
```
cd backend
pip install -r requirements.txt
python run.py
```

#### Backend Notes
* This app works in developemnt, for a production environment a WSGI server should be used instead of the flask development server.  Gunicorn is an robust yet easy to use option.
* Flask Blueprint is used to add routes to the flask app.
* Server calls transer and recieve JSON to the front end.


# Frontend

* Framework: React
* HTTP calls: Axios (more robust than fetch & nice to work with promises)
* Components: Material UI

#### Running Frontend
Dependencies: node: 20.10.0 & npm 10.2.3 
```
cd frontend
npm install
npm start
```

#### Frontend Notes
* App.js is a bit large and monolithic.  In future iterations, it would be nice to break this down into different js files, escpecially for the axios calls.
* Material UI is very staightforward to use and makes the frontend feel responsive (ie clicks onto text input box).

