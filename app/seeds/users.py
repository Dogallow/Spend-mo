from app.models import db, User, environment, SCHEMA
import random


colors = ['#53D8FB', '#66c3ff', '#dce1e9', '#d4afb9', '#F9EBE0', '#8dbbc7', '#624cab', '#a0ddff', '#C78283']
# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', first_name='Demo', last_name='Lition', email='demo@aa.io', password='password', profile_img_url='https://i.etsystatic.com/34879050/c/2160/1716/0/27/il/c68327/4103130020/il_500x500.4103130020_pn4v.jpg', color=random.choice(colors)
    )
    demo2 = User(
        username='Demo2', first_name='Test', last_name='User', email='test@aa.io', password='password', profile_img_url='https://i.etsystatic.com/35513472/r/il/c291aa/4133067317/il_340x270.4133067317_3zrj.jpg', color=random.choice(colors)
    )
    demo3 = User(
        username='Shane', first_name='Shane', last_name='Gallant', email='newb@aa.io', password='password', profile_img_url='https://i.etsystatic.com/35513472/r/il/c291aa/4133067317/il_340x270.4133067317_3zrj.jpg', color=random.choice(colors)
    )
    demo4 = User(
        username='Caleb', first_name='Caleb', last_name='Green', email='caleb3@aa.io', password='password', profile_img_url='https://i.etsystatic.com/35513472/r/il/c291aa/4133067317/il_340x270.4133067317_3zrj.jpg', color=random.choice(colors)
    )
    demo5 = User(
        username='Joyner', first_name='Joyner', last_name='Haans', email='joyner4@aa.io', password='password', profile_img_url='https://i.etsystatic.com/35513472/r/il/c291aa/4133067317/il_340x270.4133067317_3zrj.jpg', color=random.choice(colors)
    )
    demo6 = User(
        username='Joy', first_name='Joy', last_name='Taylor', email='joy5@aa.io', password='password', profile_img_url='https://i.etsystatic.com/35513472/r/il/c291aa/4133067317/il_340x270.4133067317_3zrj.jpg', color=random.choice(colors)
    )
    demo7 = User(
        username='Shiloh', first_name='Shiloh', last_name='Anderson', email='shiloh6@aa.io', password='password', profile_img_url='https://i.etsystatic.com/35513472/r/il/c291aa/4133067317/il_340x270.4133067317_3zrj.jpg', color=random.choice(colors)
    )
    demo8 = User(
        username='Anthony', first_name='Anthony', last_name='Armstrong', email='anthony7@aa.io', password='password', profile_img_url='https://i.etsystatic.com/35513472/r/il/c291aa/4133067317/il_340x270.4133067317_3zrj.jpg', color=random.choice(colors)
    )
    demo9 = User(
        username='Bruce', first_name='Bruce', last_name='Covington', email='bruce8@aa.io', password='password', profile_img_url='https://i.etsystatic.com/35513472/r/il/c291aa/4133067317/il_340x270.4133067317_3zrj.jpg', color=random.choice(colors)
    )
    demo10 = User(
        username='Darius', first_name='Darius', last_name='Smith', email='darius9@aa.io', password='password', profile_img_url='https://i.etsystatic.com/35513472/r/il/c291aa/4133067317/il_340x270.4133067317_3zrj.jpg', color=random.choice(colors)
    )
    demo10 = User(
        username='Abigail', first_name='Abigail', last_name='Schumer', email='abigail10@aa.io', password='password', profile_img_url='https://i.etsystatic.com/35513472/r/il/c291aa/4133067317/il_340x270.4133067317_3zrj.jpg', color=random.choice(colors)
    )
    demo11 = User(
        username='Amanda', first_name='Amanda', last_name='Tine', email='amanda11@aa.io', password='password', profile_img_url='https://i.etsystatic.com/35513472/r/il/c291aa/4133067317/il_340x270.4133067317_3zrj.jpg', color=random.choice(colors)
    )



    db.session.add(demo)
    db.session.add(demo2)
    db.session.add(demo3)
    db.session.add(demo4)
    db.session.add(demo5)
    db.session.add(demo6)
    db.session.add(demo7)
    db.session.add(demo8)
    db.session.add(demo9)
    db.session.add(demo10)
    db.session.add(demo11)
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
