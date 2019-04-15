# -*- coding:utf-8 -*-

import json
from .errorcode import error_code

def success(code = 0, data = {}):
	rsp = {}
	if code != 0:
		raise Exception("Code 0 do not mean success!")
	rsp['code'] = code
	rsp['data'] = data
	return json.dumps(rsp)

def failed(code, data = {}):
	rsp = {}
	if code == 0:
		raise Exception("Code 0 do not mean failed!")
	if code not in error_code:
		raise Exception("The code Not Define")
	rsp['code'] = code
	rsp['data'] = data
	return json.dumps(rsp)
