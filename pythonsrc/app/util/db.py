# -*- coding:utf-8 -*-

from DBUtils.PooledDB import PooledDB
import pymysql
import time

"""
def __init__(
self, creator, mincached=0, maxcached=0,
maxshared=0, maxconnections=0, blocking=False,
maxusage=None, setsession=None, reset=True,
failures=None, ping=1,
*args, **kwargs):

creator: either an arbitrary function returning new DB-API 2
	connection objects or a DB-API 2 compliant database module
mincached: initial number of idle connections in the pool
	(0 means no connections are made at startup)                   @最小的空闲连接数，如果空闲链接小于这个数字，pool会创建新的链接。
maxcached: maximum number of idle connections in the pool
	(0 or None means unlimited pool size)                          @最大的空闲连接数，如果空闲链接大于这个数字，pool会关闭链接。
maxshared: maximum number of shared connections
	(0 or None means all connections are dedicated)
	When this maximum number is reached, connections are
	shared if they have been requested as shareable.               @最大的共享链接，当链接达到这个数字，新的请求会分享已经分配出去的链接
maxconnections: maximum number of connections generally allowed
	(0 or None means an arbitrary number of connections)           @最大的链接数
blocking: determines behavior when exceeding the maximum
	(if this is set to true, block and wait until the number of
	connections decreases, otherwise an error will be reported)
maxusage: maximum number of reuses of a single connection
	(0 or None means unlimited reuse)
	When this maximum usage number of the connection is reached,
	the connection is automatically reset (closed and reopened).
setsession: optional list of SQL commands that may serve to prepare
	the session, e.g. ["set datestyle to ...", "set time zone ..."]
reset: how connections should be reset when returned to the pool
	(False or None to rollback transcations started with begin(),
	True to always issue a rollback for safety's sake)
failures: an optional exception class or a tuple of exception classes
	for which the connection failover mechanism shall be applied,
	if the default (OperationalError, InternalError) is not adequate
ping: determines when the connection should be checked with ping()
	(0 = None = never, 1 = default = whenever fetched from the pool,
	2 = when a cursor is created, 4 = when a query is executed,
	7 = always, and all other bit combinations of these values)
	args, kwargs: the parameters that shall be passed to the creator
	function or the connection constructor of the DB-API 2 module
"""

class DBPool(object):
	_pool = None
	_db_map = dict()
	
	def __init__(self, dbname, host = '172.27.200.3', user = 'root', passwd = 'zhangsong@',port = 3306, creator = pymysql, mincached = 50, maxcached = 100, maxconnections = 100):
		if self._pool == None:
			self._pool = PooledDB(creator, mincached = mincached, maxcached = maxcached, maxconnections = maxconnections, host = host, user = user, passwd = passwd, db = dbname, port = port)
			#self._pool = PooledDB(creator, mincached = mincached, maxcached = maxcached, maxconnections = maxconnections, host = '172.23.200.3', user = 'root', passwd = 'zhangsong@', db = 'semonchang', port = 3306)
			#self._pool = PooledDB(creator, mincached = mincached, maxcached = maxcached, maxconnections = maxconnections, host = '172.27.200.3', user = 'root', passwd = 'zhangsong@', db = "semonchang", port = 3306)
	
	def open(self):
		conn                     = self._pool.connection()
		cursor                   = conn.cursor()
		stamp                    = int(time.time() * 1000)
		self._db_map[stamp]      = (conn, cursor)
		return stamp
	
	def get_db(self, stamp):
		if stamp not in self._db_map:
			raise Exception("没有找到这个key")
		conn, cursor = self._db_map.pop(stamp)
		return conn, cursor

	def close(self, stamp):
		conn, cursor = self.get_db(stamp)
		cursor.close()
		conn.close()
	
	def getquery(self, stamp, sql):
		conn, cursor = self.get_db(stamp)
		ret = cursor.execute(sql)
		result = cursor.fetchall()
		return result

	def setquery(self, stamp, sql):
		conn, cursor = self.get_db(stamp)
		ret = cursor.execute(sql)
		return ret

	#def __del__(self):
	#	for key,value in self._db_map.items():
	#		value[0].close()
	#		value[1].close()

if __name__ == "__main__":
	dbpool = DBPool(dbname = "semonchang")
	dbobj = dbpool.open()
	result = dbpool.getquery(dbobj, "select * from account")
	print(result)
	'''
	pool = PooledDB(pymysql, 5, host = '172.27.200.3', user = 'root', passwd = 'zhangsong@', db = "semonchang", port = 3306)
	conn = pool.connection()
	'''
