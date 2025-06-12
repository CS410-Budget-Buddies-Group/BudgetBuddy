from rest_framework import serializers
from .models import User, Job, Expense  # , Goal


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


class UserSerializer(serializers.ModelSerializer):
    jobs = JobSerializer(many=True, read_only=True)
    expenses = ExpenseSerializer(many=True, read_only=True)
    goals = GoalSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        # if (validated_data.pop('expense')): 
        #     expense_data = validated_data.pop('expense')
        #     expense = Expense.objects.create(**expense_data)
        # if (validated_data.pop('job')):
        #     job_data = validated_data.pop('job')
        #     job = Job.objects.create(**job_data)

        return User.objects.create(**validated_data)
