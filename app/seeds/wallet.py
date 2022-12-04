from app.models import db, Wallet, environment, SCHEMA

# Adds Wallet for demo users
def seed_wallets():
    demo_wallet = Wallet(user_id = 1, balance = 10000)
    test_wallet = Wallet(user_id = 2, balance = 5000)
    newb_wallet = Wallet(user_id = 3, balance = 1000)

    db.session.add(demo_wallet)
    db.session.add(test_wallet)
    db.session.add(newb_wallet)
    db.session.commit()


def undo_wallets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wallets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM wallets")

    db.session.commit()
