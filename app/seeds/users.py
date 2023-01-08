from app.models import db, User, environment, SCHEMA

# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo', last_name='Lition', email='demo@aa.io', password='password', profile_img_url='https://i.etsystatic.com/34879050/c/2160/1716/0/27/il/c68327/4103130020/il_500x500.4103130020_pn4v.jpg', color='#9f73ff'
    )
    demo2 = User(
        username='Test', first_name='Test', last_name='User', email='test@aa.io', password='password', profile_img_url='https://i.etsystatic.com/35513472/r/il/c291aa/4133067317/il_340x270.4133067317_3zrj.jpg', color='#b6fc03'
    )
    demo3 = User(
        username='Newb', first_name='Newb', last_name='B', email='newb@aa.io', password='password', profile_img_url='https://i.etsystatic.com/35513472/r/il/c291aa/4133067317/il_340x270.4133067317_3zrj.jpg', color='#03dffc'
    )

    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
