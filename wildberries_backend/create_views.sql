create
or replace view order_history_view as
select
    office_id,
    cell,
    orders_conveyor_order.items,
    max(issuing_time) as issuing_time,
    max(created_at) as created_at,
    max(id) as id
from
    orders_conveyor_order
where
    issuing_time is not null
    and created_at::date = now()::date
group by
    office_id,
    cell,
    orders_conveyor_order.items;

create
or replace view order_queue_view as
select
    s.*
from
    orders_conveyor_order s
    inner join (
        select
            office_id,
            cell,
            min(created_at) as min_date
        from
            orders_conveyor_order
        group by
            office_id,
            cell
    ) tmp on s.cell = tmp.cell
    and s.created_at = tmp.min_date
    and s.office_id = tmp.office_id
    and s.issuing_time is null;









