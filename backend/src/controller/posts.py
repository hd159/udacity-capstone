from flask import jsonify, request, abort
from flask_cors import cross_origin
from sqlalchemy import func
from src.auth import requires_auth, PERMISSIONS

from model import Post
from . import routes
from .errors_handling import not_found, server_err, unauthorized



def mappingPosts(posts):
    res = []
    for post in posts:
       res.append(post.format_short())

    return res

def get_payload_value(request):
    payload = {}
    body = request.get_json()
    payload['title'] = body.get("title")
    payload['content'] = body.get("content")
    payload['posted_by'] = body.get("posted_by")
    payload['category_id'] = body.get("category_id")
    payload['image_link'] = body.get("image_link")
    payload['description'] = body.get("description")
    payload['user_id'] = body.get("user_id")
    payload['created_at'] = body.get("created_at")
    return payload

# get all posts
@routes.route('/posts')
@cross_origin()
def all_posts():
    try:
        all_posts = []
        category_id = request.args.get("category", None)
        search_term = request.args.get("searchTerm", None)
        user_id = request.args.get("user_id", None)
        if bool(category_id):
            all_posts  = Post.query.filter(Post.category_id == category_id).all()
        elif  bool(search_term):
            filter_by_title = func.lower(Post.title).contains(func.lower(search_term))
            all_posts  = Post.query.filter(filter_by_title).all()
        elif bool(user_id):
            all_posts  = Post.query.filter(Post.user_id == user_id ).all()
        else:
            all_posts  = Post.query.all()

        posts = mappingPosts(all_posts)
        return jsonify({
                "success": True,
                "status": 200,
                "posts": posts
            }
        )
    except Exception as e:
        abort(500)


# create new post - 'post:post' permission
@routes.route('/posts', methods=['POST'])
@cross_origin()
@requires_auth(PERMISSIONS["CREATE_POST"])
def create_post(payload):
    try:
        body = get_payload_value(request)
        post = Post(
            title = body['title'], 
            content = body['content'], 
            category_id = body['category_id'], 
            posted_by = body['posted_by'],
            image_link = body['image_link'],
            description = body['description'],
            user_id = payload['sub'],
            created_at = body['created_at']
        )

        post.insert()
        return jsonify({
                "success": True,
                "status": 201,
                "message": 'Created'
            }
        )
    except Exception as e:
        abort(500)

# get post detail
@routes.route('/posts/<int:post_id>')
@cross_origin()
def get_post_detail(post_id):
    try:
        post = Post.query.filter(Post.id == post_id).one_or_none()
        if post is None:
            return not_found()
        return jsonify({
                "success": True,
                "status": 200,
                "post": post.format_long()
            }
        )
    except Exception as e:
        abort(500)

# update post - 'patch:post' permission
@routes.route("/posts/<int:post_id>", methods=['PATCH'])
@cross_origin()
@requires_auth(PERMISSIONS["UPDATE_POST"])
def update_post(payload, post_id):
    try:
        body = get_payload_value(request)

        post = Post.query.filter(Post.id == post_id).one_or_none()
        if post is None:
            return not_found()
        
        # only user create post can update post
        user_create_id =  payload['sub']
        if(post.user_id != user_create_id):
            abort(401)

        post.title =  body['title']
        post.content = body['content']
        post.category_id = body['category_id']
        post.posted_by = body['posted_by']
        post.image_link = body['image_link']

        post.update()
       
        return jsonify({
                "success": True,
                "post": post.format_long(),
                "status": 200,
            }
        )

    except Exception as e:
        if e.code == 401:
            abort(401)
        abort(500)

# delete post - 'delete:post' permission
@routes.route('/posts/<int:post_id>', methods=['DELETE'])
@cross_origin()
@requires_auth(PERMISSIONS["DELETE_POST"])
def delete_post(payload, post_id):
    try:
        post = Post.query.filter(Post.id == post_id).one_or_none()
        if post is None:
            return not_found()

        # only user create post can update post
        user_create_id =  payload['sub']
        if(post.user_id != user_create_id):
            abort(401)

        post.delete()

        return jsonify({
                "success": True,
                "message": 'deleted'
            }
        )
    except Exception as e:
        if e.code == 401:
            abort(401)
        abort(500)