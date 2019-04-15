# -*- coding:utf-8 -*-

import sys
import logging
import logging.handlers

loggerobj = logging.getLogger("loggerobj")
hdlr = logging.handlers.RotatingFileHandler("/home/www/log/semonchang.log", maxBytes=20*1024*1024, backupCount=20)
formatter = logging.Formatter('[%(asctime)s][%(filename)s %(lineno)d]%(levelname)s %(message)s')
hdlr.setFormatter(formatter)
loggerobj.addHandler(hdlr)
loggerobj.setLevel(logging.INFO)
