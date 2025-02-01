# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractUser

class Employee(models.Model):
    eid = models.IntegerField(db_column='EID', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=255)  # Field name made lowercase.
    position = models.CharField(db_column='Position', max_length=255)  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'employee'


class Expenses(models.Model):
    expenseid = models.IntegerField(db_column='ExpenseID', primary_key=True)  # Field name made lowercase.
    date = models.DateField(db_column='Date')  # Field name made lowercase.
    amount = models.DecimalField(db_column='Amount', max_digits=10, decimal_places=2)  # Field name made lowercase.
    description = models.TextField(db_column='Description')  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'expenses'


class Inventory(models.Model):
    itemid = models.IntegerField(db_column='ItemID', primary_key=True)  # Field name made lowercase.
    itemname = models.CharField(db_column='ItemName', max_length=255)  # Field name made lowercase.
    itemquantity = models.IntegerField(db_column='ItemQuantity')  # Field name made lowercase.
    minimumstocklevel = models.IntegerField(db_column='MinimumStockLevel')  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'inventory'


class Inventoryexpense(models.Model):
    inventoryexpenseid = models.IntegerField(db_column='inventoryExpenseID', primary_key=True)  # Field name made lowercase.
    date = models.DateField(db_column='Date')  # Field name made lowercase.
    amount = models.DecimalField(db_column='Amount', max_digits=10, decimal_places=2)  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    itemid = models.ForeignKey(Inventory, models.DO_NOTHING, db_column='ItemID')  # Field name made lowercase.
    expenseid = models.ForeignKey(Expenses, models.DO_NOTHING, db_column='ExpenseID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'inventoryexpense'


class Inventoryissuelog(models.Model):
    logid = models.IntegerField(db_column='LogID', primary_key=True)  # Field name made lowercase.
    itemquantity = models.IntegerField(db_column='ItemQuantity')  # Field name made lowercase.
    description = models.TextField(db_column='Description', blank=True, null=True)  # Field name made lowercase.
    itemid = models.ForeignKey(Inventory, models.DO_NOTHING, db_column='ItemID')  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'inventoryissuelog'


class Invoice(models.Model):
    invoiceid = models.IntegerField(db_column='InvoiceID', primary_key=True)  # Field name made lowercase.
    percentage = models.DecimalField(db_column='Percentage', max_digits=5, decimal_places=2)  # Field name made lowercase.
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    pono = models.ForeignKey('Site', models.DO_NOTHING, db_column='pono')
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'invoice'


class Site(models.Model):
    pono = models.CharField(primary_key=True, max_length=50)
    sitename = models.CharField(db_column='SiteName', max_length=255)  # Field name made lowercase.
    poamount = models.DecimalField(db_column='POAmount', max_digits=10, decimal_places=2)  # Field name made lowercase.
    invoicestatus = models.CharField(db_column='InvoiceStatus', max_length=50)  # Field name made lowercase.
    deadline = models.DateField(db_column='Deadline')  # Field name made lowercase.


    class Meta:
        managed = False
        db_table = 'site'


class SiteExpenses(models.Model):
    site_expenseid = models.IntegerField(db_column='site_ExpenseID', primary_key=True)  # Field name made lowercase.
    date = models.DateField(db_column='Date')  # Field name made lowercase.
    amount = models.DecimalField(db_column='Amount', max_digits=10, decimal_places=2)  # Field name made lowercase.
    description = models.TextField(db_column='Description')  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    pono = models.ForeignKey(Site, models.DO_NOTHING, db_column='pono')
    expenseid = models.ForeignKey(Expenses, models.DO_NOTHING, db_column='ExpenseID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'site_expenses'


class SiteProgressupdate(models.Model):
    progressid = models.IntegerField(db_column='ProgressID', primary_key=True)  # Field name made lowercase.
    date = models.DateField(db_column='Date')  # Field name made lowercase.
    progressstatus = models.CharField(db_column='ProgressStatus', max_length=50)  # Field name made lowercase.
    userid = models.ForeignKey('User', models.DO_NOTHING, db_column='UserID')  # Field name made lowercase.
    pono = models.ForeignKey(Site, models.DO_NOTHING, db_column='pono')

    class Meta:
        managed = False
        db_table = 'site_progressupdate'


class User(AbstractUser):
    userid = models.AutoField(db_column='id', primary_key=True)  # Field name made lowercase.
    username = models.CharField(db_column='username', max_length=255,unique=True)  # Field name made lowercase.
    password = models.CharField(db_column='password', max_length=255)  # Field name made lowercase.
    
    class Meta:
        managed = False
        db_table = 'auth_user'
