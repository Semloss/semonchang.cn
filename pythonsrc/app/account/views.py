# -*- coding:utf-8 -*-

from flask import Blueprint

app_account = Blueprint('app_account', __name__, url_prefix = '/account')

from . import login
