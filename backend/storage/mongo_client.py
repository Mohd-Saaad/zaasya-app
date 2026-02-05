from pymongo import MongoClient
from bson import ObjectId
from config import settings
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    # Initialize MongoDB Client
    client = MongoClient(settings.MONGO_URI)
    
    # Select Database
    db = client[settings.MONGO_DB]
    
    # Test connection
    client.admin.command('ping')
    logger.info(f"Successfully connected to MongoDB database: {settings.MONGO_DB}")

except Exception as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    raise e

# Helper to handle ObjectId conversion if needed
def str_to_id(id_str):
    return ObjectId(id_str) if isinstance(id_str, str) else id_str
