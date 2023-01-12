from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Comment
from app.forms import CommentForm

comment_routes = Blueprint('comments', __name__)

@comment_routes.route('/')
def all_comments():
    comments = Comment.query.all()

    dict_comments = [x.to_dict() for x in comments]

    return {'comments': dict_comments}


@comment_routes.route('/<int:id>')
def get_post_comments(id):
    post_comments = Comment.query.filter(Comment.post == id).all()
    # print('----- post comments', post_comments)
    post_comments_dict = [x.to_dict() for x in post_comments]
    # print('----- post comments', post_comments_dict)

    return {'comments': post_comments_dict}


@comment_routes.route('/newComment', methods=['POST'])
def create_comment():
    form = CommentForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    # print('==== form comment', form.data['comment'])
    if form.validate_on_submit():
        params = {
            'comment': form.data['comment'],
            'post': form.data['post'],
            'commenter': current_user.id
        }

        new_comment = Comment(**params)
        # print('===== new comment', new_comment.to_dict())
        db.session.add(new_comment)
        db.session.commit()

        return new_comment.to_dict()

@comment_routes.route('/editComment', methods=['POST'])
def edit_comment():
    data = request.get_json()
    id = data['id']
    new_comment = data['comment']
    comment = Comment.query.get(id)

    comment.comment = new_comment

    db.session.commit()
    return comment.to_dict()


@comment_routes.route('/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = Comment.query.get(id)
    db.session.delete(comment)
    db.session.commit()
    return comment.to_dict()
