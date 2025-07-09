# Budget-Buddy
A budget tracking app!


## Setup/Installation
### Python Environment
To setup the local python environment run the follwing:
* `python -m venv venv`

Windows
* To activate it use `venv\scripts\activate`
* To deactivate it use `deactivate`

Linux/macOS
* To activate it use `source myenv/bin/activate`
* To deactivate it use `deactivate`


### Required Packages
Use `npm i` and `pip install -r requirements.txt` to install all required packages.

### Django AWS Connection
To setup the django AWS connection, add the following credentials and connection info into a local `.env.secret` file in the root directory.
```ini
DB_NAME=budgetbuddy
DB_USER=admin
DB_PASSWORD=<password>
DB_HOST=<host.rds.amazonaws.com>
DB_PORT=3306
```

## Running the apps
<b>*In the root directory:</b>

To run the local webserver, run `npm run dev`

To run the local django server, run `python manage.py runserver`
