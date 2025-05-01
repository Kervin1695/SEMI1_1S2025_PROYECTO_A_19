from sqlalchemy import Column, Integer, String
from app.utils.db import Base

class User(Base):
    __tablename__ = 'Usuarios'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(50), nullable=False)
    lastname = Column(String(50), nullable=False)
    username = Column(String(50), nullable=False, unique=True)
    email = Column(String(100), nullable=False, unique=True)
    phone = Column(String(15), nullable=False)
    password = Column(String(255), nullable=False)
    photo = Column(String(255), nullable=False)