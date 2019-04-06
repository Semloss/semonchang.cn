# -*- coding:utf-8 -*-

from flask import Flask

from account.views import app_account
from config import conf

def register_blueprints(app):
	'''
	rsister for blueprint -- sub route for app instance
	'''
	app.register_blueprint(app_account)


def create_app():
	app = Flask(__name__)

	app.config.from_object(conf['Test'])
	register_blueprints(app)
	
	return app
