from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
import os
from dotenv import load_dotenv
from urllib.parse import quote_plus

load_dotenv()

# Get credentials and properly escape them
username = os.getenv("MONGO_USERNAME", "")
password = os.getenv("MONGO_PASSWORD", "")
cluster_url = os.getenv("MONGO_CLUSTER", "")
app_name = os.getenv("MONGO_DBNAME", "")

# Properly escape the password
escaped_password = quote_plus(password)

# Construct the URI with properly escaped credentials
uri = f"mongodb+srv://{username}:{escaped_password}@{cluster_url}/?appName={app_name}"

DATABASE_NAME = "diary_logger"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print("Error connecting to MongoDB:", e)
    # print(e)

database = client[DATABASE_NAME]

def get_database():
    return database
