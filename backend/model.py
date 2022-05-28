import os
from sqlalchemy import Column, String, Integer
from flask_sqlalchemy import SQLAlchemy
database_path = os.getenv('DATABASE_PATH')

db = SQLAlchemy()


def setup_db(app, database_path=database_path):
    app.config['basedir'] = os.path.abspath(os.path.dirname(__file__))
    app.config["SQLALCHEMY_DATABASE_URI"] = database_path
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["DEBUG"] = True
    db.app = app
    db.init_app(app)
    db.create_all()

class inheritedClassName(db.Model):
   __abstract__ = True
   def insert(self):
      db.session.add(self)
      db.session.commit()

   def delete(self):
      db.session.delete(self)
      db.session.commit()

   def update(self):
      db.session.commit()

"""
Category
"""
class Category(inheritedClassName):
    __tablename__ = 'categories'

    id = Column(Integer, primary_key=True)
    name = Column(String, unique = True, nullable=False)
    image_link = Column(String)
    def __init__(self, name, image_link):
        self.name = name
        self.image_link = image_link

    def format(self):
        return {
            'id': self.id,
            'name': self.name,
            'image_link': self.image_link,
        }

    def __repr__(self):
        return self.name

    
"""
Post
"""
class Post(inheritedClassName):
    __tablename__ = 'posts'

    id = Column(Integer, primary_key=True)
    title = Column(String, unique = True, nullable=False)
    description = Column(String)
    content = Column(String, nullable=False)
    image_link = Column(String)
    posted_by =  Column(String)
    category_id = Column(db.Integer, db.ForeignKey('categories.id', ondelete="cascade"),
                         nullable=False)

    category = db.relationship("Category",
                    backref=db.backref("post", cascade="all")
                )
    created_at = db.Column(db.DateTime)
    user_id = Column(db.String)

    def __init__(self, title, content, category_id, image_link, posted_by, description, user_id, created_at):
        self.title = title
        self.content = content
        self.category_id = category_id
        self.image_link = image_link
        self.posted_by = posted_by
        self.description = description
        self.user_id = user_id
        self.created_at = created_at

    def format_short(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'category_id': self.category_id,
            'created_at': self.created_at.strftime("%b %d %Y "),
        }

    def format_long(self):
        return {
            'id': self.id,
            'title': self.title,
            'posted_by': self.posted_by,
            'description': self.description,
            'category_id': self.category_id,
            'content': self.content,
            'image_link': self.image_link,
            'created_at': self.created_at.strftime("%b %d %Y "),
            'user_id': self.user_id,
        }

    def __repr__(self):
        return self.title

"""
Comment
"""
