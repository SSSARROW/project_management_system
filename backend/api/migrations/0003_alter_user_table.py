# Generated by Django 5.1.4 on 2025-01-14 11:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_alter_user_options'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='user',
            table='auth_user',
        ),
    ]
