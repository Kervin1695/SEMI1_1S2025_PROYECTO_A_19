class Bill:
    def __init__(self, id, user_id, type, description, amount, date, bill=None):
        self.id = id
        self.user_id = user_id
        self.type = type
        self.description = description
        self.amount = amount
        self.date = date
        self.bill = bill

    def __repr__(self):
        return f"<Bill {self.id} - {self.description}>"