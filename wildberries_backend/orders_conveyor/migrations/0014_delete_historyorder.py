# Generated by Django 4.1.3 on 2022-12-13 14:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders_conveyor', '0013_historyorder'),
    ]

    operations = [
        migrations.DeleteModel(
            name='HistoryOrder',
        ),
    ]
