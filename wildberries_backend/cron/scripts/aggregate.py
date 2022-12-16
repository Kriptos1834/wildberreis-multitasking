from utils.logging import log_errors, cout, get_logger

@log_errors(get_logger(), __file__)
def main():
    import os
    import psycopg2
    cout('[+] Connecing to database.', __file__)
    conn = psycopg2.connect(
        host="31.172.66.171",
        database="production",
        user="postgres",
        password="15893587max",
    )
    cursor = conn.cursor()


    cout('[+] Executing script.', __file__)
    work_dir = os.path.dirname(os.path.realpath(__file__))
    with open(os.path.join(work_dir, '..', 'sql', 'aggregate.sql'), 'r') as file:
        query = file.read()
        cursor.execute(query)

    conn.close()
    cout('[+] Successfuly aggregated data.', __file__)


if __name__ == '__main__':
    main()
