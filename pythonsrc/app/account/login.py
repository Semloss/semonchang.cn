# -*- coding:utf-8 -*-

from .views import app_account

@app_account.route('/login', methods = ['POST'])
def login():
	return 'hello login 11111'


def check_has
