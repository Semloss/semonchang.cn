# -*- coding:utf-8 -*-

from .views import app_account
import sys
sys.path.insert(0, "/home/www/src/semonchang/pythonsrc/app")
from util import rsp
from flask import request, g

'''
官方文档中：
    获取get方法中的参数(url中携带的参数)：用request.args
    获取post或者put表单中的参数：         用request.from
    获取上传文件接口中的文件参数：        用request.files
'''

@app_account.route('/login', methods = ['POST'])
def login():
    id = request.values.get('id', '')
    passwd = request.values.get('passwd', '')
    ret = check_login(id, passwd)



def check_login(id = '', passwd = ''):
    if id == '' or passwd = '':
        return False
    dbobj = db.
