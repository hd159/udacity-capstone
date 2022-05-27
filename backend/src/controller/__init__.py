from flask import Blueprint
routes = Blueprint('routes', __name__)

from .categories import *
from .posts import *
from .errors_handling import *