# ANY CHANGE IN THE MODEL MUST BE NOTED AND THE APPROPRIATE CHANGES REFLECTED IN THE MIGRATION > VERSIONS FOR DEPLOYMENT

from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


# follows = db.Table(
#     "follows", 
#     db.Model.metadata,
#     db.Column("follower_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),primary_key=True ),
#     db.Column("followed_id", db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")),primary_key=True )
# )



class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    first_name = db.Column(db.String(100), nullable=False)
    last_name = db.Column(db.String(100), nullable=False)
    profile_img_url = db.Column(db.String)
    color = db.Column(db.String())

    wallet = db.relationship("Wallet", back_populates="user", cascade="all, delete-orphan")

    

    # followers = db.relationship(
    #     "User", 
    #     secondary=follows,
    #     primaryjoin=(follows.c.follower_id == id),
    #     secondaryjoin=(follows.c.followed_id == id),
    #     backref=db.backref("following", lazy="dynamic"),
    #     lazy="dynamic"
    # )
    

    post = db.relationship("Post", back_populates="user", cascade="all, delete-orphan")

    liked = db.relationship("Like", back_populates="user", cascade="all, delete-orphan")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'color': self.color
        }
