from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv
import os
load_dotenv()

class Database:
    def __init__(self) -> None:
        self.DATABASE_URL = f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASSWORD')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"
        print(self.DATABASE_URL)
        self.sessionLocal = None

    def connect(self):
        if not self.sessionLocal:
            try:
                engine = create_engine(self.DATABASE_URL)
                self.sessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
                Base = declarative_base()
                return self.sessionLocal
            except Exception as e:
                print(f"Failed to connect to the database: {e}")
                raise SystemExit(1)  # Terminate the program with a non-zero exit code

        return self.sessionLocal
