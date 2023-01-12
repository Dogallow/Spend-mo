from app.models import db, Comment, environment, SCHEMA

def seed_comments():
    comment_1 = Comment(commenter=1,post=1,comment="Thanks my guy")
    comment_2 = Comment(commenter=2,post=5,comment="HAHA, Merry Christmas to you and the family bro!")
    comment_3 = Comment(commenter=1,post=6,comment="YOU TOO!😁🙌")
    comment_4 = Comment(commenter=7,post=8,comment="WOW! Thanks that is super helpful!")
    comment_5 = Comment(commenter=7,post=12,comment="Invite me next time😡")
    comment_6 = Comment(commenter=3,post=12,comment="I'm playing next time")
    comment_7 = Comment(commenter=2,post=12,comment="WOW NO INVITE IS CRAZY!💢")
    comment_8 = Comment(commenter=7,post=14,comment="Yea, we can set up a time and place👍")
    comment_9 = Comment(commenter=10,post=15,comment="THANKS, IT WAS A BLAST WORKING WITH YOU AS WELL🎉🥂")
    comment_10 = Comment(commenter=1,post=9,comment="happy birthday🎉")
    comment_11 = Comment(commenter=4,post=9,comment="HBD!")
    comment_12 = Comment(commenter=5,post=9,comment="🎊🎂")
    comment_13 = Comment(commenter=6,post=9,comment="HAPPY CAKE DAY!🎂")

    db.session.add(comment_1)
    db.session.add(comment_2)
    db.session.add(comment_3)
    db.session.add(comment_4)
    db.session.add(comment_5)
    db.session.add(comment_6)
    db.session.add(comment_7)
    db.session.add(comment_8)
    db.session.add(comment_9)
    db.session.add(comment_10)
    db.session.add(comment_11)
    db.session.add(comment_12)
    db.session.add(comment_13)

    db.session.commit()


def unseed_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
