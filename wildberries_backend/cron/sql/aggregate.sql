CREATE TABLE if not EXISTS orders_aggrigation_data (
    dt date NOT NULL,
    office_id bigint NOT NULL,
    orders_count double precision NOT NULL,
    items_count bigint NOT NULL,
    total_money double precision NOT NULL,
    created_at timestamp DEFAULT NOW()
);

insert into
    orders_aggrigation_data
select
    dt,
    office_id,
    count(DISTINCT id) as orders_count,
    count(*) items_count,
    sum(price :: int) as total_money
from
    (
        select
            created_at :: date as dt,
            office_id,
            id,
            e.value -> 'price' as price
        from
            orders_conveyor_order,
            jsonb_array_elements(items) e
        where
            orders_conveyor_order.issuing_time is not null
            and created_at :: date = (now() at TIME ZONE 'Europe/Moscow') :: date - 1
    ) dmt
group by
    dt,
    office_id;