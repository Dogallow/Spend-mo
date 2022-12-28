from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import db, Like, Transaction, User

like_routes = Blueprint('like', __name__)

@like_routes.route('/', methods=['POST'])
def like_post():
    print('================= request_method', request.method)
    
    data = request.get_json()
    print('------- data', data)
    id = data['id']
    print('------- id', id)
    like = Like.query.filter(Like.post_id == id  and Like.user_id == current_user.id).first()
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
        
    # If a like does exist then we want to delete that like
    else :
        
        db.session.delete(like)
        db.session.commit()
        
    likes = Like.query.all()
    values = [x.to_dict() for x in likes]
    return {'likes': values}

@like_routes.route('/delete', methods=['POST'])
def unlike_post():
    data = request.get_json()
    print('------- data', data)
    id = data['id']
    print('------- id', id)
    
    like = Like.query.get(id)
    print('--------like', like)

    db.session.delete(like)
    db.session.commit()

    return like.to_dict()

@like_routes.route('/get/<id>', methods=['GET'])
def get_like():
    if request.method == 'GET':

        like = Like.query.filter(Like.user_id == current_user.id and Like.post_id == id).first()

        if like is None:
            return {'boolean':False}
        else:
            return {'boolean':True}
