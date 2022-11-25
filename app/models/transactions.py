# ANY CHANGE IN THE MODEL MUST BE NOTED AND THE APPROPRIATE CHANGES REFLECTED IN THE MIGRATION > VERSIONS FOR DEPLOYMENT

from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transaction(db.Model):
    __tablename__ = "transactions"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('wallets.user_id')))
    receiver_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('wallets.user_id')))
    request_amount = db.Column(db.Integer)
    pay_amount = db.Column(db.Integer)
    is_Pending = db.Column(db.Boolean)

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
            'is_Pending': self.is_Pending
        }
