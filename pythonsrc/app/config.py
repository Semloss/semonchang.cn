# -*- coding:utf-8 -*-

class BaseConfig(object):
	'''
	common configration:
	suitable for these case:
		-common wording
		-databases connection
		必须使用大写 
	'''
	HOST = '127.0.0.1'
	PORT = 9001


class TestConfig(BaseConfig):
	'''
	configration for test:
	'''
	DEBUG = True

class ProductConfig(BaseConfig):
	'''
	configration for product
	'''
	DEBUG  = False
