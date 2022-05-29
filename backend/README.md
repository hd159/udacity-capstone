# Blog shareing Backend 
# This is a blog app. Where every one can share knowledge of technologies
# Demo: https://capstone-udacity-ddc.herokuapp.com/
## Getting Started

### Installing Dependencies

#### Python 3.7

Follow instructions to install the latest version of python for your platform in the [python docs](https://docs.python.org/3/using/unix.html#getting-and-installing-the-latest-version-of-python)

#### Initialize and activate a virtualenv using:
```
python -m virtualenv env
source env/bin/activate
```
>**Note** - In Windows, the `env` does not have a `bin` directory. Therefore, you'd use the analogous command shown below:
```
source env/Scripts/activate

```
#### PIP Dependencies

Once you have your virtual environment setup and running, install dependencies by naviging to the `/backend` directory and running:

```bash
pip install -r requirements.txt
```


##### Key Dependencies

- [Flask](http://flask.pocoo.org/) is a lightweight backend microservices framework. Flask is required to handle requests and responses.

- [SQLAlchemy](https://www.sqlalchemy.org/) and [Flask-SQLAlchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/) are libraries to handle the lightweight sqlite database. Since we want you to focus on auth, we handle the heavy lift for you in `./src/database/models.py`. We recommend skimming this code first so you know how to interface with the Drink model.

- [jose](https://python-jose.readthedocs.io/en/latest/) JavaScript Object Signing and Encryption for JWTs. Useful for encoding, decoding, and verifying JWTS.

### Configure Environment Variables
Open `.env` file and change each variable appropriately to your desired environment
## Running the server

Each time you open a new terminal session, run:

```bash
export FLASK_APP=app.py;
```

To run the server, execute:

```bash
flask run --reload
```

The `--reload` flag will detect file changes and restart the server automatically.


### Permissions

1. App API permissions:
   - `post:post - create a new post` 
   - `patch:post - update a new post only if user is author`
   - `delete:post - delete a new post only if user is author`
   - `manage:categories - including create, update, delete category`
2. Create new roles for:
   - Creator
     - can `post:post`
     - can `patch:post`
     - can `delete:post`
   - Manager
     - can perform all actions
3. Test your endpoints with [Postman](https://getpostman.com).
   - Register 2 users - assign the Creator role to one and Manager role to the other.
   - Sign into each account and make note of the JWT.
   - Import the postman collection `.final-udacity.postman_collection.json`
   - Right-clicking the collection folder for creator and admin, navigate to the authorization tab, and including the JWT in the token field (you should have noted these JWTs).
   - Run the collection and correct any errors.
