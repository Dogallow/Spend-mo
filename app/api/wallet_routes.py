from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Wallet, db
from app.forms import WalletTransfer

wallet_routes = Blueprint('wallet', __name__)

@wallet_routes.route('/')
# @login_required
def check_balance():

    wallet = Wallet.query.filter(Wallet.user_id == current_user.id).first()
    print('___________ current users wallet', wallet)
    return {'wallet': wallet.to_dict()}
    # return {'wallet': [x.to_dict() for x in wallet]}


@wallet_routes.route('/<action>', methods=['PUT'])
@login_required
def edit_balance(action):
    print('action')

    form = WalletTransfer()
    form['csrf_token'].data = request.cookies['csrf_token']
    
    print('+++++++++++++++++++++++++++++++++++++++',form.validate_on_submit())
    if form.validate_on_submit():
        wallet = Wallet.query.filter(Wallet.user_id == current_user.id).first()

        print('____current user wallet', wallet)

        if action == 'deposit':
            wallet.balance = wallet.balance + form.data['amount']
            db.session.commit()
            return {'wallet': wallet.to_dict()}
        elif action == 'withdraw':
            if form.data['amount'] > wallet.balance:
                return {'errors': 'Withdraw amount exceeded wallet balance'}
            wallet.balance = wallet.balance - form.data['amount']
            db.session.commit()
            return {'wallet': wallet.to_dict()}
