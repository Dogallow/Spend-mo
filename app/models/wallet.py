# ANY CHANGE IN THE MODEL MUST BE NOTED AND THE APPROPRIATE CHANGES REFLECTED IN THE MIGRATION > VERSIONS FOR DEPLOYMENT

from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin


class Wallet(db.Model, UserMixin):
    __tablename__ = 'wallets'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),unique=True)
    balance = db.Column(db.Integer)

    user = db.relationship("User", back_populates="wallet")

    def to_dict(self):
        return {
        'id': self.id,
        'user_id': self.user_id,
        'balance': self.balance
        }

    ####### transaction = db.relationship("Transaction", back_populates="wallet_transaction", cascade='all, delete-orphan')
    # transaction = db.relationship("Transaction", back_populates=['sender', 'receiver'], cascade='all, delete-orphan')
    sender_wallet = db.relationship('Transaction', foreign_keys='Transaction.sender_id', cascade='all, delete-orphan')
    receiver_wallet = db.relationship('Transaction', foreign_keys='Transaction.receiver_id', cascade='all, delete-orphan')
    
