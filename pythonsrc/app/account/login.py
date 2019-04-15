# -*- coding:utf-8 -*-

from .views import app_account
from util import rsp
from util.logger import loggerobj
from flask import request, g
import hashlib

'''
官方文档中：
    获取get方法中的参数(url中携带的参数)：用request.args
    获取post或者put表单中的参数：         用request.from
    获取上传文件接口中的文件参数：        用request.files
'''

@app_account.route('/login', methods = ['POST'])
def login():
	'''
	登录接口
	'''
	loggerobj.error(request)
	username = request.values.get('id', '')
	passwd = request.values.get('passwd', '')
	if username == '' or passwd == '':
		return failed(2000)
	return check_login(username, passwd)



def check_login(username = '', passwd = ''):
	dbobj = g.dbpool.open()
	sql = "select id, passwd from account where id = '%s'" % (username)
	result = dbobj.getquery(dbobj, sql)
	if len(result) == 0:
		return Flase(2001)
	md5 = hashlib.md5()
	md5.update(passwd.encode("utf-8"))
	if md5.hexdigest() == result[0][1]:
		return success()
	else:
		return failed(2002)
