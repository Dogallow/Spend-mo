from flask_wtf import FlaskForm
from wtforms import StringField, DecimalField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import Transaction

class RequestTransactionForm(FlaskForm):
    sender_id = StringField("sender", validators=[DataRequired()])
    receiver_id = StringField("receiver", validators=[DataRequired()])
    request_amount = DecimalField("Request Amount")
    pay_amount = DecimalField("Pay Amount")
    is_Pending = BooleanField("Pending")
