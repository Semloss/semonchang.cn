# -*- coding:utf-8 -*-

from flask import Flask, current_app, g
'''
	current_app:  表示当前应用实例，全局
	g:            表示处理请求时的临时存储变量 / 0.10 版本之后从全局上下文成为请求的上下文
'''

from account.views import app_account
from . import config
from util import db

def register_blueprints(app):
	'''
	rsister for blueprint -- sub route for app instance
	everyone sub interface has a blueprint
	'''
	app.register_blueprint(app_account)


def create_app():
	'''
	create a instance of flask app.
	load configration.
	register blueprint.
	'''
	app = Flask(__name__)

	app.config.from_object(config.TestConfig)
	register_blueprints(app)
	print(app.config)

	#init db pool
	#with app.app_context():
	#	g.dbpool = db.DBPool(dbname = "semonchang")
	g.dbpool = db.DBPool(dbname = "semonchang")

	return app
