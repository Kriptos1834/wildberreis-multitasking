# Generated by Django 4.1.3 on 2022-12-13 14:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders_conveyor', '0009_delete_historyorder'),
    ]

    operations = [
        migrations.CreateModel(
            name='HistoryOrder',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('office_id', models.IntegerField()),
                ('cell', models.IntegerField()),
                ('items', models.JSONField()),
                ('issuing_time', models.DateTimeField(null=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'db_table': 'order_history_view',
                'managed': (False,),
            },
        ),
    ]
