from app.models import db, Wallet, environment, SCHEMA

# Adds Wallet for demo users
def seed_wallets():
    demo_wallet = Wallet(user_id = 1, balance = 10000)
    test_wallet = Wallet(user_id = 2, balance = 5000)
    newb_wallet = Wallet(user_id = 3, balance = 1000)
    demo4_wallet = Wallet(user_id = 4, balance = 1000)
    demo5_wallet = Wallet(user_id = 5, balance = 1000)
    demo6_wallet = Wallet(user_id = 6, balance = 1000)
    demo7_wallet = Wallet(user_id = 7, balance = 1000)
    demo8_wallet = Wallet(user_id = 8, balance = 1000)
    demo9_wallet = Wallet(user_id = 9, balance = 1000)
    demo10_wallet = Wallet(user_id = 10, balance = 1000)
    demo11_wallet = Wallet(user_id = 11, balance = 1000)
    

    db.session.add(demo_wallet)
    db.session.add(test_wallet)
    db.session.add(newb_wallet)
    db.session.add(demo4_wallet)
    db.session.add(demo5_wallet)
    db.session.add(demo6_wallet)
    db.session.add(demo7_wallet)
    db.session.add(demo8_wallet)
    db.session.add(demo9_wallet)
    db.session.add(demo10_wallet)
    db.session.add(demo11_wallet)
    db.session.commit()


def undo_wallets():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.wallets RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM wallets")

    db.session.commit()
