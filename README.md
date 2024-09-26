task_management_api

docker exec -it my-mysql bash
mysql -u root -p
password
update mysql.user set host='%' where user='root';
FLUSH PRIVILEGES;
