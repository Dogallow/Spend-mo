from app.models import db, Transaction, environment, SCHEMA

def seed_transactions():
    # transaction_1 = Transaction(
    #     author='Test', is_Pending=False, note='Here is the money I owe you.', receiver_id='Demo', sender_id='Test', request_amount=100, transaction_state='approved'
    # )
    transaction_1 = Transaction(
        author=2, is_Pending=False, note='Here is the money I owe you.', receiver_id=1, sender_id=2, request_amount=100, transaction_state='approved'
    )
    transaction_2 = Transaction(
        author=2, is_Pending=True, note='You lost the bet. Time to pay up!!!', receiver_id=2, sender_id=1, request_amount=25, transaction_state='pending'
    )
    transaction_3 = Transaction(
        author=1, is_Pending=False, note='Here is some money for you', receiver_id=2, sender_id=1, request_amount=15, transaction_state='approved'
    )
    transaction_4 = Transaction(
        author=1, is_Pending=True, note='Please! It is urgent!', receiver_id=1, sender_id=2, request_amount=15, transaction_state='pending'
    )
    transaction_5 = Transaction(
        author=3, is_Pending=False, note='Merry Christmas, ya filthy animal', receiver_id=2, sender_id=3, request_amount=150, transaction_state='approved'
    )
    transaction_6 = Transaction(
        author=3, is_Pending=False, note='Have a good day', receiver_id=1, sender_id=3, request_amount=50, transaction_state='approved'
    )
    transaction_7 = Transaction(
        author=3, is_Pending=False, note='Feeling extra generous', receiver_id=1, sender_id=3, request_amount=20, transaction_state='approved'
    )
    # transaction_1 = Transaction(
    #     author=2, is_Pending=False, note='Here is the money I owe you.', receiver_id=1, sender_id=2, request_amount=100, transaction_state='approved'
    # )
    # transaction_1 = Transaction(
    #     author=2, is_Pending=False, note='Here is the money I owe you.', receiver_id=1, sender_id=2, request_amount=100, transaction_state='approved'
    # )
    # transaction_1 = Transaction(
    #     author=2, is_Pending=False, note='Here is the money I owe you.', receiver_id=1, sender_id=2, request_amount=100, transaction_state='approved'
    # )

    db.session.add(transaction_1)
    db.session.add(transaction_2)
    db.session.add(transaction_3)
    db.session.add(transaction_4)
    db.session.add(transaction_5)
    db.session.add(transaction_6)
    db.session.add(transaction_7)
    db.session.commit()

def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM transactions")

    db.session.commit()
