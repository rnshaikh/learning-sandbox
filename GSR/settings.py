import os
from dotenv import load_dotenv

BASE_DIR = os.path.dirname(os.path.abspath("__file__"))
load_dotenv(os.path.join(BASE_DIR, '.env'))
TOKEN = os.environ.get('TOKEN', None)
URI = os.environ.get('URI', None)

HOST = os.environ.get("HOST", None)
USER = os.environ.get("USER", None)
PASS = os.environ.get("PASS", None)
DB = os.environ.get("DB", None)

