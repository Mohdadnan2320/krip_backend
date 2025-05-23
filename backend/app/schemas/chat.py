from pydantic import BaseModel
from datetime import datetime

class MessageCreate(BaseModel):
    sender_id: int
    receiver_id: int
    order_id: int
    content: str

class MessageResponse(BaseModel):
    id: int
    sender_id: int
    receiver_id: int
    order_id: int
    content: str
    timestamp: datetime

    class Config:
        from_attributes = True
