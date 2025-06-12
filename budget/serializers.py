from rest_framework import serializers
from .models import User, Job, Expense, Goal

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        if (validated_data.pop('expense')): 
            expense_data = validated_data.pop('expense')
            expense = Expense.objects.create(**expense_data)
            
        return User.objects.create(**validated_data)
    
    
class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'


class ExpenseSerializer(serializers.ModelSerializer):           
    class Meta:
        model = Expense
        fields = '__all__'


class GoalSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'