# ANY CHANGE IN THE MODEL MUST BE NOTED AND THE APPROPRIATE CHANGES REFLECTED IN THE MIGRATION > VERSIONS FOR DEPLOYMENT

from .db import db, environment, SCHEMA, add_prefix_for_prod
from app.models import User

class Transaction(db.Model):
    __tablename__ = "transactions"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('wallets.user_id')))
    receiver_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('wallets.user_id')))
    request_amount = db.Column(db.Integer)
    note = db.Column(db.String())
    is_Pending = db.Column(db.Boolean)
    transaction_state = db.Column(db.String()) #pending, approved, declined, cancelled, request
    author = db.Column(db.Integer, nullable=False)

    # May need to add a decline Column(boolean) to take into account if a user wants to deny the request or the payment

    # wallet_transaction = db.relationship("Wallet", back_populates="transaction")
    sender = db.relationship("Wallet", foreign_keys=[sender_id])
    receiver = db.relationship("Wallet", foreign_keys=[receiver_id])

    def request_to_dict(self):
        return {
            'id': self.id,
            'sender_id': self.sender_id,
            'receiver_id': self.receiver_id,
            'request_amount': self.request_amount,
            'is_Pending': self.is_Pending,
            'transaction_state': self.transaction_state,
            'note': self.note,
            'author': self.author
        }

    def username_to_dict(self):
        sender = User.query.get(self.sender_id)
        author = User.query.get(self.author)
        print(sender)
        print(sender.username)
        sender = sender.username
        receiver = User.query.get(self.receiver_id)
        print(receiver)
        print(receiver.username)
        receiver = receiver.username

        
        return {
            'id': self.id,
            'sender_id': sender,
            'receiver_id': receiver,
            'request_amount': self.request_amount,
            'is_Pending': self.is_Pending,
            'transaction_state': self.transaction_state,
            'note' : self.note,
            'author': author.username
        }
