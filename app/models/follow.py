# ANY CHANGE IN THE MODEL MUST BE NOTED AND THE APPROPRIATE CHANGES REFLECTED IN THE MIGRATION > VERSIONS FOR DEPLOYMENT

from .db import db, environment, SCHEMA, add_prefix_for_prod

# class Follow(db.Model):
#     __tablename__ = "follows"
#     if environment == "production":
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key=True)
#     follower = db.mapped_column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
#     followed = db.mapped_column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))

#     user = db.relationship("User", foreign_keys=[follower])
#     user_2 = db.relationship("User", foreign_keys=[followed])
    
follows = db.Table(
    "follows", 
    db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id"))),
    db.Column("followed_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
)
