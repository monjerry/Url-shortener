from sqlalchemy.pool import Pool
from sqlalchemy.orm import scoped_session
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import String, DateTime, Column, Integer
from sqlalchemy import create_engine

import creds

Base = declarative_base()
class Url(Base):
    __tablename__ = 'urls'
    id = Column(Integer, primary_key=True, autoincrement=True)
    full_url = Column(String)
    short_url = Column(String)

db_connection_string = "mysql://%s@%s/%s" % (creds.user, creds.host, creds.dbname)
_engine = create_engine(db_connection_string, pool_size=30, pool_recycle=3600)
DBsession = sessionmaker(bind=_engine)
session = DBsession()
