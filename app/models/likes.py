# ANY CHANGE IN THE MODEL MUST BE NOTED AND THE APPROPRIATE CHANGES REFLECTED IN THE MIGRATION > VERSIONS FOR DEPLOYMENT

from .db import db, environment, SCHEMA, add_prefix_for_prod
from app.models import User
from flask_login import current_user
 

class Like(db.Model):
    __tablename__ = 'likes'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("users.id")))
    post_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod("transactions.id")))

    user = db.relationship("User", back_populates="liked")

    def to_dict(self):
        # print('----------USER ID', self.user_id)
        user = User.query.get(self.user_id)
        user = user.username

        return {
            'id': self.id,
            'user': user,
            'post': self.post_id
        }
        
