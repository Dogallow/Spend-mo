from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Transaction, User, Wallet
from app.forms import RequestTransactionForm

transaction_routes = Blueprint('transaction', __name__)

@transaction_routes.route('/')
@login_required
def get_all_transactions():
    print('------------Current Logged in User', current_user.id)

    transaction_list = Transaction.query.filter(Transaction.sender_id == current_user.id).all()
    print('############# List of transactions', transaction_list)

    dict_transactions = [transaction.request_to_dict() for transaction in transaction_list]
    
    print('$$$$$$$$$$$$ Dict Transactions', dict_transactions)

    
    
    print('$$$$$$$$$$$$ Dict Transactions', dict_transactions[0]['sender_id'])
    new_dict = []
    for x in dict_transactions:
        
        new_dict.append({
            
            'id': x['id'],
            'sender_id': User.query.get(x['sender_id']).username,
            'receiver_id': User.query.get(x['receiver_id']).username,
            'request_amount': x['request_amount'],
            'is_Pending': x['is_Pending']
        
        })
    
    print('########## new dict', new_dict)
    
    return {'transactions': new_dict}


@transaction_routes.route('/', methods=['POST'])
# @login_required
def initiate_request_transaction():
    form = RequestTransactionForm()

    user_to_pay = User.query.filter(User.username == form.data['sender_username'] ).first()
    # form.data['sender_id'] = user_to_pay.id
    # form.data['receiver_id'] = current_user.id

    db.session.commit()

    form['csrf_token'].data = request.cookies['csrf_token']
    print('++++++++++++++++++',form.validate_on_submit())
    if form.validate_on_submit():

        print('@@@@@@@@@@ user to pay ', user_to_pay.id)

        params = {
            "sender_id": user_to_pay.id,
            "receiver_id": current_user.id,
            "is_Pending": True,
            "request_amount": int(form.data['request_amount'])
        }
        print('--------------', params)
        req = Transaction(**params)

        db.session.add(req)
        db.session.commit()

        return {'request' : req.request_to_dict()}
    print('++++++++++++++++++',form.errors)
    return {'hello': 'world'}

@transaction_routes.route('/approve/<int:id>')
@login_required
def approve_transaction(id):
    transaction = Transaction.query.get(id)
    print('^^^^^^^^^^^ transaction', transaction.request_to_dict())
    send_payment_wallet = Wallet.query.get(transaction.sender_id)
    receive_payment_wallet = Wallet.query.get(transaction.receiver_id)
    print('********** Wallet of user Who is sending the money', send_payment_wallet.to_dict())
    print('********** Wallet of user Who is receiving the money', receive_payment_wallet.to_dict())

    send_payment_wallet.balance = send_payment_wallet.balance - transaction.request_amount
    receive_payment_wallet.balance = receive_payment_wallet.balance + transaction.request_amount
    transaction.is_Pending = False

    print('$$$$$$$$$$$$$$$ transaction', transaction.request_to_dict())

    print('!!!!!!!!!!!!! Wallet of user Who is sending the money', send_payment_wallet.to_dict())
    print('!!!!!!!!!!!!! Wallet of user Who is receiving the money', receive_payment_wallet.to_dict())

    db.session.commit()

    return {'transaction': transaction.username_to_dict()}
    
    
