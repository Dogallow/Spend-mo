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
    transaction_8 = Transaction(
        author=6, is_Pending=False, note='This should be enough gas money for the week 👍👍', receiver_id=7, sender_id=6, request_amount=100, transaction_state='approved'
    )
    transaction_9 = Transaction(
        author=8, is_Pending=False, note='Happy Birthday Bro', receiver_id=3, sender_id=8, request_amount=200, transaction_state='approved'
    )
    transaction_10 = Transaction(
        author=9, is_Pending=False, note='Yaaaay, you did it congrats 🙌', receiver_id=10, sender_id=9, request_amount=25, transaction_state='approved'
    )
    transaction_11 = Transaction(
        author=4, is_Pending=False, note='There is plenty more where that came from 😁', receiver_id=1, sender_id=4, request_amount=55, transaction_state='approved'
    )
    transaction_12 = Transaction(
        author=5, is_Pending=False, note="Let's play again sometime 🏀", receiver_id=1, sender_id=5, request_amount=10, transaction_state='approved'
    )
    transaction_13 = Transaction(
        author=4, is_Pending=False, note="Haha you were on FIRE!", receiver_id=7, sender_id=4, request_amount=15, transaction_state='approved'
    )
    transaction_14 = Transaction(
        author=2, is_Pending=False, note="Hey Long time no see, let's meet over coffee!", receiver_id=7, sender_id=2, request_amount=25, transaction_state='approved'
    )
    transaction_15 = Transaction(
        author=11, is_Pending=False, note="Great job on the project, definitely can't wait to work with you in the future. Here is your half of the prize money!💲", receiver_id=10, sender_id=11, request_amount=1500, transaction_state='approved'
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
    db.session.add(transaction_8)
    db.session.add(transaction_9)
    db.session.add(transaction_10)
    db.session.add(transaction_11)
    db.session.add(transaction_12)
    db.session.add(transaction_13)
    db.session.add(transaction_14)
    db.session.add(transaction_15)
    db.session.commit()

def undo_transactions():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM transactions")

    db.session.commit()
