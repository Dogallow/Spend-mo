from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Transaction
from app.forms import RequestTransactionForm

transaction_routes = Blueprint('transaction', __name__)

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
            "request_amount": form.data['request_amount']
        }

        req = Transaction(**params)

        db.session.add(req)
        db.session.commit(req)

        return {'request' : req.request_to_dict()}
