from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Wallet

wallet_routes = Blueprint('wallet', __name__)

@wallet_routes.routes('/')
@login_required
def check_balance():

    wallet = Wallet.query.filter(Wallet.id == current_user.id).first()

    return {'wallet': [x.to_dict() for x in wallet]}
