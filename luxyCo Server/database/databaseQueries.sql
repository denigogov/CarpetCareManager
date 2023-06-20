-- CREATE TABLE QUERYS!!!
------------------------------------------

create table department (
id int auto_increment primary key, 
department_name varchar(50)
);


create table user (
id int auto_increment primary key, 
department_id int,
first_name varchar(50) not null,
last_name varchar(50),
password varchar(50) not null,
street varchar(100),
phone_number int not null,
foreign key (department_id) REFERENCES department(id)
);


create table custumer (
id int auto_increment primary key, 
first_name varchar(50),
last_name varchar(50),
street varchar(100),
city varchar(50),
phone_number int not null unique
);

create table order_status (
id int auto_increment primary key, 
status_name varchar(50)
);

create table orders (
id int auto_increment primary key,
custumer_id int ,
user_id int,
order_status_id int,
order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
carpet_pieces int,
total_price decimal(10,2), 
m2 decimal(10,2),
delivery boolean, 
foreign key (custumer_id) references custumer(id),
foreign key (user_id) references user(id),
foreign key (order_status_id) references order_status(id)
);
create table prices (
id int auto_increment primary key,
service_name varchar(50),
service_price decimal(10,2)
)




-- insert into
-----------------------

insert into departments (department_name)  values('production'), ('owner')

insert into users (department_id, first_name, last_name, password, street, phone_number)  values(2 ,'Dejan', 'Gogov', 'dejan123', 'Mxj 12', '078 252 100'),(1 ,'David', 'Picaso', 'david123', 'Street unknow', '0052 543 3355') ,(1 ,'Jacob', 'hermes', 'jacob123', 'Hello 123, Strumica', '5512 333 223')

insert into custumers (first_name, last_name, street, city, phone_number) values('Viktorija', 'Georius' , 'Kliment Ohridski 44', 'Strumica', '095 223 23433 22'), ("George", "Hermes", 'Squere puble 23', 'Strumica', '211 005, 23232 2'), ('Markus', 'Delyrio', 'Public Place 22', 'Bretten', '0195 442 332 21'), ('Jason', "Stawaki", 'main boulevar 55', 'Bretten', '087 223 223') 

insert into order_status (status_name) values('Pending'), ("In Progress"), ('shipped'), ('delivered'), ('Cancelled'), ('Returned'), ('Refunded')

insert into orders (custumer_id, user_id, order_status_id, carpet_pieces, total_price, m2, delivery) values(4, 1, 1, 5, 4360, 60, false), (3, 2, 5, 3, 500, 29, true)
