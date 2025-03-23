from rest_framework import serializers
from rest_framework.response import Response
from .models import User, Employee, Expenses, Inventory,  InventoryIssueLog, Invoice, Site, SiteExpenses, SiteProgressUpdate,Customer

# User Serializer
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['user_id', 'username', 'role', 'created_at']
        extra_kwargs={
            'password':{'write_only':True}
        }
    def create(self,validated_data):
        password = validated_data.pop('password',None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
            return instance

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

# Employee Serializer
class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'

# Expenses Serializer
class ExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expenses
        fields = '__all__'

# Inventory Serializer
class InventorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inventory
        fields = '__all__'



# Inventory Issue Log Serializer
class InventoryIssueLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryIssueLog
        fields = '__all__'

# Invoice Serializer
class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'

# Site Serializer
class SiteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Site
        fields = '__all__'

# Site Expenses Serializer
class SiteExpensesSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteExpenses
        fields = '__all__'

# Site Progress Update Serializer
class SiteProgressUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteProgressUpdate
        fields = '__all__'
