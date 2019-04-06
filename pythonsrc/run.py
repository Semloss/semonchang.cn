# -*- coding:utf-8 -*-

import sys
sys.path.insert(0, '/home/www/src/semonchang/pythonsrc/app')
from app.init import create_app
from flup.server.fcgi import WSGIServer

app_ins = create_app()

if __name__ == "__main__":
	WSGIServer(app_ins, bindAddress = ('127.0.0.1', 5000)).run()
