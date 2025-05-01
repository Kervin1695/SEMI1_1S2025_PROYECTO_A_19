class Expense:
    def __init__(self, user_id, expense_type, description, amount, date, bill=None):
        self.user_id = user_id
        self.type = expense_type
        self.description = description
        self.amount = amount
        self.date = date
        self.bill = bill

    def to_dict(self):
        return {
            'user_id': self.user_id,
            'type': self.type,
            'description': self.description,
            'amount': self.amount,
            'date': self.date,
            'bill': self.bill
        }