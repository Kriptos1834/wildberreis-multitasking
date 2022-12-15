import psycopg2

print('Connecing to database')
conn = psycopg2.connect(
    host="31.172.66.171",
    database="production",
    user="postgres",
    password="15893587max",
)
cursor = conn.cursor()

print('Executing script')
with open('../sql/aggregate.sql', 'r') as file:
    query = file.read()
    cursor.execute(query)

conn.close()
print('Successfuly aggregated data')