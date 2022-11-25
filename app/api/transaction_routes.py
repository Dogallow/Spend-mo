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
    
    return {'transactions': [transaction.request_to_dict() for transaction in transaction_list]}


@transaction_routes.route('/', methods=['POST'])
# @login_required
def initiate_request_transaction():
    form = RequestTransactionForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        params = {
            "sender_id": form.data['sender_id'],
            "receiver_id": form.data['receiver_id'],
            "is_Pending": True,
            "request_amount": int(form.data['request_amount'])
        }
        print('--------------', params)
        req = Transaction(**params)

        db.session.add(req)
        db.session.commit()

        return {'request' : req.request_to_dict()}
        


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

    return {'transaction': transaction.request_to_dict()}
    
    
