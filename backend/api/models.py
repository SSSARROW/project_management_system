# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.timezone import now


class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    designation = models.CharField(max_length=25)
    dob = models.DateField()
    email = models.CharField(max_length=50, unique=True)
    gender = models.CharField(max_length=6)
    address = models.CharField(max_length=225)
    join_date = models.DateField()
    salary = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'employee'


class Customer(models.Model):
    customer_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'customer'


class Site(models.Model):
    po_no = models.CharField(primary_key=True, max_length=50)
    site_name = models.CharField(max_length=255)
    po_amount = models.DecimalField(max_digits=10, decimal_places=2)
    payment_status = models.CharField(max_length=7)
    project_status = models.CharField(max_length=9)
    deadline = models.DateField()
    customer = models.ForeignKey(Customer, models.SET_NULL, null=True, blank=True, db_column='customer_id')

    class Meta:
        managed = False
        db_table = 'site'


class EmployeeSite(models.Model):
    id = models.AutoField(primary_key=True)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    site = models.ForeignKey(Site, on_delete=models.CASCADE, db_column='po_no')

    class Meta:
        managed = False
        db_table = 'employee_site'


class Expenses(models.Model):
    expense_id = models.AutoField(primary_key=True)
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    category = models.CharField(max_length=9)

    class Meta:
        managed = False
        db_table = 'expenses'


class Inventory(models.Model):
    item_id = models.AutoField(primary_key=True)
    item_name = models.CharField(max_length=255)
    item_quantity = models.IntegerField()
    minimum_stock_level = models.IntegerField()
    status = models.CharField(max_length=19)
    updated_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'inventory'


class InventoryIssueLog(models.Model):
    log_id = models.AutoField(primary_key=True)
    item_quantity = models.IntegerField()
    description = models.TextField(blank=True, null=True)
    item = models.ForeignKey(Inventory, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'inventory_issue_log'


class SiteExpenses(models.Model):
    site_expense_id = models.AutoField(primary_key=True)
    date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    expense = models.ForeignKey(Expenses, models.DO_NOTHING)
    site = models.ForeignKey(Site, models.DO_NOTHING, db_column='po_no')

    class Meta:
        managed = False
        db_table = 'site_expenses'


class SiteProgressUpdate(models.Model):
    progress_id = models.AutoField(primary_key=True)
    date = models.DateField()
    progress_details = models.TextField()
    site = models.ForeignKey(Site, models.DO_NOTHING, db_column='po_no')

    class Meta:
        managed = False
        db_table = 'site_progress_update'
        unique_together = (('date', 'site'),)


class User(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=150, unique=True)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=255)
    role = models.CharField(max_length=25, choices=[
        ('admin', 'Admin'),
        ('manager', 'Manager'),
        ('employee', 'Employee')
    ])

    class Meta:
        managed = True
        db_table = 'users'

    def save(self, *args, **kwargs):
        if not self.pk and not self.password.startswith(('pbkdf2_sha256$', 'bcrypt$', 'argon2')):  # Prevent double hashing
            self.set_password(self.password)
        super().save(*args, **kwargs)


class Invoice(models.Model):
    invoice_id = models.AutoField(primary_key=True)
    invoice_no = models.IntegerField()
    date = models.DateField()
    site = models.ForeignKey(Site, models.DO_NOTHING, db_column='site_name')
    sdn_no = models.CharField(max_length=50)
    address = models.TextField()
    percentage = models.DecimalField(max_digits=10, decimal_places=2)
    total = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'invoice'


class InvoiceItems(models.Model):
    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE)
    item_no = models.IntegerField()
    item_name = models.CharField(max_length=255)
    quantity = models.IntegerField()
    unit_price = models.DecimalField(max_digits=10, decimal_places=2)
    amount = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        managed = False
        db_table = 'invoice_items'

