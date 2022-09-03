from redis import Redis
from os import getenv
from dotenv import load_dotenv
from json import dumps

load_dotenv()
Cache = Redis(
            host=getenv('HOST'),
            port=getenv('PORT'),
            password=getenv('PASS')
        )
