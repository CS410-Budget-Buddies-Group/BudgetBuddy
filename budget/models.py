from django.db import models


class User(models.Model):
    name = models.CharField(blank=False, max_length=25)
    email = models.EmailField(blank=False, unique=True, max_length=50)

    def __str__(self):
        return self.name


class Job(models.Model):
    name = models.CharField(max_length=25)
    monthly_income = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} job, monthly income: {self.monthly_income}"


class Expense(models.Model):
    name = models.CharField(max_length=25)
    expense = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        date_string = self.date.strftime('%Y-%m-%d')
        return f"{self.name}: ${self.expense} on {date_string}"


class Goal(models.Model):
    name = models.CharField(max_length=25)
    goal = models.FloatField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"Goal: {self.name} (User: {self.user.name})"
