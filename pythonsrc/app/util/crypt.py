# -*- coding:utf-8 -*-

import sys
from Crypto.Cipher import AES
from binascii import b2a_hex, a2b_hex

class prpcrypt():
	'''
	对称加密,用于id和openid之间转换
	'''
	def __init__(self, key):
		self.key = key.encode('utf-8')
		self.mode = AES.MODE_CBC

	def encrypt(self, text):
		'''
		加密函数， 如果text不足16位酒用空格补足16位
		如果大于16但不是16的整倍数，那就补足16的整倍数
		key必须长度大于16(AES-128)
		'''
		text = str(text).encode('utf-8')
		cryptor = AES.new(self.key, self.mode, b'0000000000000000')
		length, count = 16, len(text)
		if count < length:
			text = text + ('\0' * (length - count)).encode('utf-8')
		elif count > length:
			text = text + ('\0' * (length - (count % length))).encode('utf-8')
		return b2a_hex(cryptor.encrypt(text))

	def decrypt(self, text):
		#解密去掉多余的空格
		cryptor = AES.new(self.key, self.mode, b'0000000000000000')
		plain_text = cryptor.decrypt(a2b_hex(text))
		#return bytes.decode(plain_text.rstrip('\0'))
		return bytes.decode(plain_text).rstrip('\0')


if __name__ == "__main__":
	pc = prpcrypt('ccount;;;xxxxxxx')
	if sys.argv[1] == 'e':
		openid = pc.encrypt(int(sys.argv[2]))
		print(openid)
	if sys.argv[1] == 'd':
		uin = pc.decrypt(str(sys.argv[2]))
		print(int(uin))
