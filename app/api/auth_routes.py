from flask import Blueprint, jsonify, session, request
from app.models import User, db, Wallet,environment, SCHEMA
from app.forms import LoginForm
from app.forms import SignUpForm
from flask_login import current_user, login_user, logout_user, login_required

auth_routes = Blueprint('auth', __name__)


def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field} : {error}')
    return errorMessages


@auth_routes.route('/')
def authenticate():
    """
    Authenticates a user.
    """
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {'errors': ['Unauthorized']}


@auth_routes.route('/login', methods=['POST'])
def login():
    """
    Logs a user in
    """
    form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # Add the user to the session, we are logged in!
        user = User.query.filter(User.email == form.data['email']).first()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@auth_routes.route('/logout')
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {'message': 'User logged out'}


@auth_routes.route('/signup', methods=['POST'])
def sign_up():
    """
    Creates a new user and logs them in
    """
    form = SignUpForm()
    print('///////////////////',form.data)
    print('///////////////////',form.data['username'])
    print('///////////////////',form.data['first_name'])
    # print('///////////////////',form.data('username'))
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print(form.data['first_name'])
        user = User(
            first_name=form.data['first_name'],
            last_name=form.data['last_name'],
            username=form.data['username'],
            email=form.data['email'],
            password=form.data['password']
        )

        
        db.session.add(user)
        
        db.session.commit()
        
        wallet = Wallet(
            user_id=user.id,
            balance=0
        )
        db.session.add(wallet)
        db.session.commit()
        login_user(user)
        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

    # @login_required
@auth_routes.route('/delete')
def delete_user():
    
    users = User.query.all()
    user = User.query.filter(User.id == current_user.id).first()
    alternate_user = User.query.get(current_user.id)
    print('----------------------this is the user',user)
    print('+++++++++++++++++++++this is the alternate user',alternate_user)
    ############### wallet= Wallet.query.filter(Wallet.user_id == user.id).first()
    if environment == "production":
        db.session.execute(f"DELETE FROM {SCHEMA}.users WHERE id = {alternate_user.id}")
        db.session.commit()
    else:
        db.session.delete(alternate_user)
        db.session.commit()
    # logout_user()
    
    
    # print('!!!!!!!!!!!this is the wallet', wallet) 
    ############## db.session.commit()
    return {'deleted': 'alternate_user.to_dict()'}


@auth_routes.route('/unauthorized')
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {'errors': ['Unauthorized']}, 401
