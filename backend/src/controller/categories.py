from flask import jsonify, request, abort
from flask_cors import cross_origin
from src.auth import PERMISSIONS, requires_auth

from model import Category
from . import routes
from .errors_handling import not_found, server_err


def mappingCategories(categories):
    res = []
    for category in categories:
       res.append(category.format())

    return res

@routes.route('/categories')
@cross_origin()
def all_categories():
    try:
        all_categories  = Category.query.all()
        categories = mappingCategories(all_categories)
        return {'categories': categories}
    except Exception as e:
        abort(500)

# create new category - 'manage:categories' permission
@routes.route('/categories', methods=['POST'])
@cross_origin()
@requires_auth(PERMISSIONS["MANAGE_CATEGORIES"])
def create_category(payload):
    try:
        body = request.get_json()
        new_name = body.get("name")
        new_image_link = body.get("image_link")
        category = Category(name=new_name, image_link=new_image_link)

        category.insert()
        return jsonify({
                "success": True,
                "status": 201,
                "message": 'Created'
            }
        )
    except Exception as e:
        abort(500)

# update category - 'manage:categories' permission
@routes.route("/categories/<int:category_id>", methods=['PATCH'])
@cross_origin()
@requires_auth(PERMISSIONS["MANAGE_CATEGORIES"])
def update_category(payload, category_id):
    try:
        body = request.get_json()
        new_name = body.get("name")
        new_image_link = body.get("image_link")
        category = Category.query.filter(Category.id == category_id).one_or_none()
        if category is None:
            return not_found()
        category.name = new_name
        category.image_link = new_image_link

        category.update()
       
        return jsonify({
                "success": True,
                "drinks": category.format(),
                "status": 200,
            }
        )

    except Exception as e:
        abort(500)

# delete category - 'manage:categories' permission
@routes.route('/categories/<int:category_id>', methods=['DELETE'])
@cross_origin()
@requires_auth(PERMISSIONS["MANAGE_CATEGORIES"])
def delete_category(payload, category_id):
    try:
        category = Category.query.filter(Category.id == category_id).one_or_none()
        if category is None:
            return not_found()

        category.delete()

        return jsonify({
                "success": True,
                "message": 'deleted'
            }
        )
    except Exception as e:
        abort(500)