from os import getenv
from dotenv import load_dotenv
import redis

load_dotenv()

r = redis.Redis(host=getenv('HOST'), port=getenv('PORT'), password=getenv('PASS'))
r.set('hello', 'world')
print(r.get('hello'))
