from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Transaction, User, Wallet
from app.forms import RequestTransactionForm, SendTransactionForm

transaction_routes = Blueprint('transaction', __name__)

#                       0           1           2               3           4
transaction_status = ['pending', 'approved', 'declined', 'cancelled', 'request']

def nameify(obj):
    sender = User.query.get(obj['sender_id']).username
    receiver = User.query.get(obj['receiver_id']).username
    return {
        'id': obj['id'],
        'sender_id': sender,
        'receiver_id': receiver,
        'request_amount': obj['request_amount'],
        'is_Pending': obj['is_Pending']
    }


@transaction_routes.route('/')
@login_required
def get_sender_transactions():
    print('------------Current Logged in User', current_user.id)

    transaction_list = Transaction.query.all()
    print('############# List of transactions', transaction_list)

    dict_transactions = [transaction.username_to_dict() for transaction in transaction_list]
    
    print('$$$$$$$$$$$$ Dict Transactions', dict_transactions)



    
    
    
    
    return {'transactions': dict_transactions}


@transaction_routes.route('/requests')
@login_required
def get_all_request_transactions():
    print('------------Current Logged in User', current_user.id)

    transaction_list = Transaction.query.filter(Transaction.receiver_id == current_user.id).all()
    print('############# List of transactions where the current user is the one who requested the transaction', transaction_list)

    dict_transactions = [transaction.request_to_dict() for transaction in transaction_list if transaction.is_Pending == True]
    
    print('$$$$$$$$$$$$ Dict Transactions', dict_transactions)

    
    
    # print('$$$$$$$$$$$$ Dict Transactions', dict_transactions[0]['sender_id'])
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



# Post a request Transaction
@transaction_routes.route('/', methods=['POST'])
# @login_required
def initiate_request_transaction():
    """
    Post a request transaction
    """
    form = RequestTransactionForm()

    if form.data['request_amount'] is None:
        print('we entered this code block')
        return {'errors': 'Must Enter an amount'}
    # Find the user that we are requesting the payment from.
    user_to_pay = User.query.filter(User.username == form.data['sender_username'] ).first()
    print('!!!!!',user_to_pay)

    # A great spot to add validation for if user exists
    if user_to_pay is None:
        return {'errors': "User not Found"}

    if user_to_pay.id == current_user.id:
        return {'errors': "Cannot send money to yourself"}

    # form.data['sender_id'] = user_to_pay.id
    # form.data['receiver_id'] = current_user.id


    form['csrf_token'].data = request.cookies['csrf_token']
    print('++++++++++++++++++',form.validate_on_submit())
    if form.validate_on_submit():

        print('@@@@@@@@@@ user to pay ', user_to_pay.id)

        params = {
            "sender_id": user_to_pay.id,
            "receiver_id": current_user.id,
            "is_Pending": True,
            "request_amount": int(form.data['request_amount']),
            "transaction_state": transaction_status[4]
            
        }
        print('--------------', params)

        # We initiate a Transaction
        req = Transaction(**params)

        db.session.add(req)
        db.session.commit()

        
        return {'request' : req.request_to_dict()}
        # Is this ^^^^^^^^ where we want to end the initiation of a request transaction ^?
    print('++++++++++++++++++',form.errors)

    #  can add a better way to handle if the form does not submit correctly
    return {'errors': 'Form not submitting properly'}


# /////////////////////////////////////////////////////////////////////////////////////


@transaction_routes.route('/sendPayment', methods=['POST'])
# @login_required
def initiate_and_send_payment():
    print('WE ENTERED THE CODE BLOCK')
    form = SendTransactionForm()

    user_to_receive_payment = User.query.filter(User.username == form.data['receiver_username']).first()
    if user_to_receive_payment is None:
        return {'errors': "User not Found"}

    if user_to_receive_payment.id == current_user.id:
        return {'errors': "Cannot send money to yourself"}
    print('------------------',user_to_receive_payment.to_dict())

    # # Get the sender and receivers wallet
    # # Possible error handle validation spot. Make sure both sender and receiver are registered users
    # send_payment_wallet = Wallet.query.get(transaction.sender_id)
    # receive_payment_wallet = Wallet.query.get(transaction.receiver_id)
    # print('********** Wallet of user Who is sending the money', send_payment_wallet.to_dict())
    # print('********** Wallet of user Who is receiving the money', receive_payment_wallet.to_dict())


    # # A great place to check if the sender has enough in their wallet balance to go through with the transaction.
    # # Handle different conditions for if the transaction is a success or failure.
    # if send_payment_wallet.balance < transaction.request_amount:
    #     return {'errors': 'You currently do not have enough funds to execute this transaction'}
    # send_payment_wallet.balance = send_payment_wallet.balance - transaction.request_amount
    # receive_payment_wallet.balance = receive_payment_wallet.balance + transaction.request_amount

    # # On success
    # # Set is_Pending to false (the transaction is no longer pending)
    # # Change the transaction state
    # transaction.is_Pending = False
    # transaction.transaction_state = transaction_status[1] # Approved

    # print('$$$$$$$$$$$$$$$ transaction', transaction.username_to_dict())

    # # print('!!!!!!!!!!!!! Wallet of user Who is sending the money', send_payment_wallet.to_dict())
    # # print('!!!!!!!!!!!!! Wallet of user Who is receiving the money', receive_payment_wallet.to_dict())

    # db.session.commit()
    # # Reminder: What you return will have an effect on your state
    # # Here we return the refined transaction object

    form['csrf_token'].data = request.cookies['csrf_token']
    print('++++++++++++++++++',form.validate_on_submit())

    print('-------', form.data['request_amount'] is None)
    if form.data['request_amount'] is None:
        print('we entered this code block')
        return {'errors': 'Must Enter an amount'}
    if form.validate_on_submit():
        # if (form.data['request_amount'] is None):
        #     return {'errors': 'Must Enter an amount'}





        params = {
            "sender_id": current_user.id,
            "receiver_id": user_to_receive_payment.id,
            "is_Pending": False,
            "request_amount": float(form.data['request_amount']),
            "transaction_state": transaction_status[1]
            
        }

        # We initiate a Transaction
        transaction = Transaction(**params)
        print('--------------', transaction)




        # Get the sender and receivers wallet
        # Possible error handle validation spot. Make sure both sender and receiver are registered users
        send_payment_wallet = Wallet.query.get(transaction.sender_id)
        receive_payment_wallet = Wallet.query.get(transaction.receiver_id)
        print('********** Wallet of user Who is sending the money', send_payment_wallet.to_dict())
        print('********** Wallet of user Who is receiving the money', receive_payment_wallet.to_dict())


        # A great place to check if the sender has enough in their wallet balance to go through with the    transaction.
        # Handle different conditions for if the transaction is a success or failure.
        if send_payment_wallet.balance < transaction.request_amount:
            return {'errors': 'You currently do not have enough funds to execute this transaction'}
        send_payment_wallet.balance = send_payment_wallet.balance - transaction.request_amount
        receive_payment_wallet.balance = receive_payment_wallet.balance + transaction.request_amount

    

        print('$$$$$$$$$$$$$$$ transaction', transaction.username_to_dict())

        # print('!!!!!!!!!!!!! Wallet of user Who is sending the money', send_payment_wallet.to_dict())
        # print('!!!!!!!!!!!!! Wallet of user Who is receiving the money', receive_payment_wallet.to_dict())

            
        # Reminder: What you return will have an effect on your state
        # Here we return the refined transaction object
























        

        db.session.add(transaction)
        db.session.commit()

        
        return {'sent' : transaction.request_to_dict()}
        # Is this ^^^^^^^^ where we want to end the initiation of a request transaction ^?
    print('++++++++++++++++++',form.errors)

    #  can add a better way to handle if the form does not submit correctly
    return {'errors': 'Form not submitting properly'}



# Handle a transaction that is approved from the sender of the payment
@transaction_routes.route('/approve/<int:id>')
@login_required
def approve_transaction(id):

    """
    Get request to reflect the approval of a transaction
    """
    #  Find a transaction
    transaction = Transaction.query.get(id)
    print('^^^^^^^^^^^ transaction', transaction.request_to_dict())



    # Get the sender and receivers wallet
    # Possible error handle validation spot. Make sure both sender and receiver are registered users
    send_payment_wallet = Wallet.query.get(transaction.sender_id)
    receive_payment_wallet = Wallet.query.get(transaction.receiver_id)
    print('********** Wallet of user Who is sending the money', send_payment_wallet.to_dict())
    print('********** Wallet of user Who is receiving the money', receive_payment_wallet.to_dict())


    # A great place to check if the sender has enough in their wallet balance to go through with the transaction.
    # Handle different conditions for if the transaction is a success or failure.
    if send_payment_wallet.balance < transaction.request_amount:
        return {'errors': 'You currently do not have enough funds to execute this transaction'}
    send_payment_wallet.balance = send_payment_wallet.balance - transaction.request_amount
    receive_payment_wallet.balance = receive_payment_wallet.balance + transaction.request_amount

    # On success
    # Set is_Pending to false (the transaction is no longer pending)
    # Change the transaction state
    transaction.is_Pending = False
    transaction.transaction_state = transaction_status[1] # Approved

    print('$$$$$$$$$$$$$$$ transaction', transaction.username_to_dict())

    # print('!!!!!!!!!!!!! Wallet of user Who is sending the money', send_payment_wallet.to_dict())
    # print('!!!!!!!!!!!!! Wallet of user Who is receiving the money', receive_payment_wallet.to_dict())

    db.session.commit()
    # Reminder: What you return will have an effect on your state
    # Here we return the refined transaction object
    return {'transaction': transaction.username_to_dict()}
    
    
    # Handle sender of the payment declining the request
@transaction_routes.route('/decline/<int:id>')
@login_required
def decline_transaction(id):
    """
        Get request for sender of the payment declining the request
    """

    # Get the transaction
    transaction = Transaction.query.get(id)


    # We want to update (PUT) the state of the transaction
    transaction.is_Pending = False
    transaction.transaction_state = transaction_status[2] # Declined

    db.session.commit()

    # Here we return the refined transaction object
    return {'transaction': transaction.username_to_dict()}


# Handle the user who requested the payment decides to cancel the transaction
@transaction_routes.route('/cancel/<int:id>')
@login_required
def cancel_transaction(id):
    """
    Get request to handle the user who requested the payment decides to cancel the transaction
    """

    # Grab the transaction
    transaction = Transaction.query.get(id)

    # We want to update (PUT) the state of the transaction
    transaction.is_Pending = False
    transaction.transaction_state = transaction_status[3] # Cancelled

    db.session.commit()

    # Here we return the refined transaction object
    return {'transaction': transaction.username_to_dict()}
