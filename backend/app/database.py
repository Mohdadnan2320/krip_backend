# import os
# from sqlalchemy import create_engine
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()

# # Fetch DATABASE_URL
# DATABASE_URL = os.getenv("DATABASE_URL")
# if DATABASE_URL is None:
#     raise ValueError("DATABASE_URL is not set in the environment variables.")
# else: 
#     print("Using database URL:", DATABASE_URL)

# # Create engine and session
# engine = create_engine(DATABASE_URL)
# SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
# Base = declarative_base()

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Fetch DATABASE_URL
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL is None:
    raise ValueError("DATABASE_URL is not set in the environment variables.")
else:
    print("Using database URL:", DATABASE_URL)

# Create engine and session
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Corrected declarative_base import
Base = declarative_base()
