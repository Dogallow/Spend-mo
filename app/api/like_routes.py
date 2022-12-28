from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Like, Transaction, User

like_routes = Blueprint('like', __name__)

@like_routes.route('/', methods=['POST'])
@login_required
def like_post():
    print('================= request_method', request.method)
    
    data = request.get_json()
    print('------- data', data)
    id = data['id']
    print('------- id', id)
    print('------- current_user', current_user.id)
    like = Like.query.filter(Like.post_id == id, Like.user_id == current_user.id ).first()
    
    print('--------like', like)

    # Check if the like exists
    # If it doesn't exist then we want to add a like
    if like is None:
        params = {
            "user_id": current_user.id,
            "post_id": id
        }
        new_like = Like(**params)
        db.session.add(new_like)
        db.session.commit()
        
    
        
        likes = Like.query.all()
        values = [x.to_dict() for x in likes]
        return {'likes': values}
    
    print('--------like', like)
    # print('--------like', like.post_id)
    # print('--------like', like.user_id)
    print('--------boolean value between user id of the post and the current user', like.user_id == current_user.id)
    
    return {'error': 'User already liked post'}

@like_routes.route('/delete', methods=['POST'])
@login_required
def unlike_post():
    data = request.get_json()
    print('------- data', data)
    id = data['id']
    print('------- id', id)
    
    like = Like.query.filter(Like.post_id == id  ,Like.user_id == current_user.id).first()
    print('--------like', like)

    db.session.delete(like)
    db.session.commit()

    return like.to_dict()

@like_routes.route('/get')
def get_like():

    likes = Like.query.all()
    values = [x.to_dict() for x in likes]
    return {'likes': values}
