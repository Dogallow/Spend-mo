from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Transaction

class WalletTransfer(FlaskForm):
    amount = IntegerField('amount', validators=[DataRequired()])
