# Generated by Django 4.1.3 on 2022-12-12 18:08

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders_conveyor', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='created_at',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]