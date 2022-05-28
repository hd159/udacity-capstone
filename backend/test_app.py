import datetime
import os
import unittest
import json
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from model import setup_db
from src.controller import *

DATABASE_TEST_PATH = os.getenv('DATABASE_TEST_PATH')
MANAGER_TOKEN = os.getenv('MANAGER_TOKEN')

class CapstoneTestCase(unittest.TestCase):

    def setUp(self):
        # """Define test variables and initialize app."""
        self.app = Flask(__name__)
        self.client = self.app.test_client
        self.database_path = DATABASE_TEST_PATH
        setup_db(self.app, self.database_path)
        self.app.register_blueprint(routes)
        # # binds the app to the current context
        with self.app.app_context():
            self.db = SQLAlchemy()
            self.db.init_app(self.app)
            # create all tables
            self.db.create_all()

    # test get categories
    def test_get_categories(self):
        res = self.client().get("/categories")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])

        pass

    # test create new category fail with no token
    def test_create_new_category_fail(self):
        new_category = {
            "name": "test22",
            "image_link": "fake"
        }
        res = self.client().post("/categories", json=new_category)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data["success"], False)

        pass

    # test create new category pass with manage:categories permission
    def test_create_new_category_success(self):
        new_category = {
            "name": f"Anansi Boys {datetime.datetime.now()}",
            "image_link": "fake"
        }
        headers = {'Authorization': MANAGER_TOKEN}
        res = self.client().post("/categories", json=new_category, headers=headers)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)

        pass

    # test update category fail with no token
    def test_update_category_fail(self):
        new_category = {
            "name": "test22",
            "image_link": "fake"
        }
        res = self.client().patch("/categories/1", json=new_category)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data["success"], False)

        pass

    # test update category pass with manage:categories permission
    # def test_update_category_success(self):
    #     new_category = {
    #         "image_link": "fake",
    #         "name": f"Anansi Boys {datetime.datetime.now()}"
    #     }
    #     headers = {'Authorization': MANAGER_TOKEN}
    #     res = self.client().patch("/categories/1", json=new_category, headers=headers)
    #     data = json.loads(res.data)

    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(data["success"], True)

    #     pass

    # test update category fail if category doesn't exist
    def test_update_post_not_exist(self):
        category = {
            "image_link": "fake",
            "name": f"Anansi Boys {datetime.datetime.now()}"
        }
        headers = {'Authorization': MANAGER_TOKEN}
        res = self.client().delete("/categories/999", json=category, headers=headers)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"], False)
        pass

    # test delete category fail with no token
    def test_delete_category_fail(self):
        
        res = self.client().delete("/categories/1")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data["success"], False)

        pass

     # test delete category pass with manage:categories permission
    # def test_delete_category_success(self):
    #     headers = {'Authorization': MANAGER_TOKEN}
    #     res = self.client().delete("/categories/3", headers=headers)
    #     data = json.loads(res.data)

    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(data["success"], True)

    #     pass

     # test delete category fail if category doesn't exist
    def test_update_post_not_exist(self):
        headers = {'Authorization': MANAGER_TOKEN}
        res = self.client().delete("/categories/999", headers=headers)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"], False)
        pass

    # test get posts
    def test_get_posts(self):
        res = self.client().get("/posts")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertTrue(data["success"])

        pass

    # test get posts by category
    def test_get_question_by_categories(self):
        res = self.client().get("/posts?category=8")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        pass
    
    
    # test create post fail with no token
    def test_create_new_post_fail(self):
        new_post = {
            "title": "test role creator 1",
            "content": "test",
        }
        res = self.client().post("/posts", json=new_post)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data["success"], False)
        pass


    # test create post pass with post:post permission
    def test_create_new_post_success(self):
        new_post = {
            "title": f"Anansi Boys {datetime.datetime.now()}",
            "content": "test",
            "image_link": "ssssssssssssssss",
            "posted_by": "test",
            "category_id": 8,
            "created_at": "2022-05-24T13:49:56.331Z"
        }
        headers = {'Authorization': MANAGER_TOKEN}
        res = self.client().post("/posts", json=new_post, headers=headers)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 200)
        self.assertEqual(data["success"], True)
        pass

    # test create fail if already post 
    def test_create_post_exist_fail(self):
        post_exist = {
            "title": "test",
            "content": "test",
            "image_link": "ssssssssssssssss",
            "posted_by": "test",
            "category_id": 8,
            "created_at": "2022-05-24T13:49:56.331Z"
        }
        headers = {'Authorization': MANAGER_TOKEN}
        res = self.client().post("/posts", json=post_exist, headers=headers)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 500)
        self.assertEqual(data["success"], False)
        pass

    # test update post fail with no token
    def test_update_post_fail(self):
        body = {
            "title": "test role creator 1",
            "content": "test",
        }
        res = self.client().patch("/posts/1", json=body)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data["success"], False)
        pass

    # test update post pass with patch:post permission (make sure we have post id 1)
    # def test_update_post_success(self):
    #     post = {
    #         "title": f"Anansi Boys {datetime.datetime.now()}",
    #         "content": "test-body22222222222222",
    #         "image_link": "ssssssssssssssss",
    #         "posted_by": "test",
    #         "category_id": 8
    #     }
    #     headers = {'Authorization': MANAGER_TOKEN}
    #     res = self.client().patch("/posts/1", json=post, headers=headers)
    #     data = json.loads(res.data)

    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(data["success"], True)
    #     pass

    # test update post fail if post doesn't exist
    def test_update_post_not_exist(self):
        body = {
            "title": "test role creator 1",
            "content": "test",
        }
        headers = {'Authorization': MANAGER_TOKEN}
        res = self.client().delete("/posts/1", json=body, headers=headers)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"], False)
        pass

    # test delete post fail with no token
    def test_delete_post_fail(self):
        
        res = self.client().delete("/posts/1")
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 401)
        self.assertEqual(data["success"], False)
        pass

    # test delete post pass with delete:post permission (make sure we have post id 1)
    # def test_delete_post_success(self):
    #     headers = {'Authorization': MANAGER_TOKEN}
    #     res = self.client().delete("/posts/1", headers=headers)
    #     data = json.loads(res.data)

    #     self.assertEqual(res.status_code, 200)
    #     self.assertEqual(data["success"], True)
    #     pass

    # test delete post fail if post doesn't exist
    def test_delete_post_not_exist(self):
        headers = {'Authorization': MANAGER_TOKEN}
        
        res = self.client().delete("/posts/1", headers=headers)
        data = json.loads(res.data)

        self.assertEqual(res.status_code, 404)
        self.assertEqual(data["success"], False)
        pass



# Make the tests conveniently executable
if __name__ == "__main__":
    unittest.main()