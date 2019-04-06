# -*- coding:utf-8 -*-

__all__ = ['conf']

class BaseConfig(object):
	'''
	common configration:
	suitable for these case:
		-common wording
		-databases connection
	'''
	host = '127.0.0.1'
	port = 9001


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

conf = {
		'Test': TestConfig,
		'Product': ProductConfig,
		}
