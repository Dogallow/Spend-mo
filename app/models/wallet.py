from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Wallet(db.Model, UserMixin):
    __tablename__ = 'wallets'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    balance = db.Column(db.Integer)

    user = db.relationship("User", back_populates="wallet")

    # transaction = db.relationship("Transaction", back_populates="wallet_transaction", cascade='all, delete-orphan')
