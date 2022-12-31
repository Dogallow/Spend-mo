from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    __tablename__ = "comments"
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}
    
    id = db.Column(db.Integer, primary_key=True)
    commenter = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    post = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('transactions.id')))
    comment = db.Column(db.String())

    def to_dict(self):
        return {
            'id': self.id,
            'commenter': self.commenter,
            'post': self.post,
            'comment': self.comment
        }
