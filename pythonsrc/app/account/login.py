# -*- coding:utf-8 -*-

from .views import app_account

@app_account.route('/login', methods = ['GET'])
def login():
	return 'hello login 11111'
