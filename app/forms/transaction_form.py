from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, BooleanField, IntegerField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Transaction

class RequestTransactionForm(FlaskForm):
    sender_username = StringField("sender", validators=[DataRequired()])
    sender_id = StringField("sender")
    receiver_id = StringField("receiver")
    
    request_amount = DecimalField("Request Amount")
    pay_amount = DecimalField("Pay Amount")
    is_Pending = BooleanField("Pending")

class SendTransactionForm(FlaskForm):
    sender_username = StringField("sender")
    sender_id = StringField("sender")
    receiver_id = StringField("receiver")
    receiver_username = StringField("receiver", validators=[DataRequired()])
    request_amount = DecimalField("Request Amount")
    pay_amount = DecimalField("Pay Amount")
    is_Pending = BooleanField("Pending")
