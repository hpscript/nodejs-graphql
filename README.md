# nodejs-graphql

### About
This is a demo that publishes MySQL data in GraphQL with Node.js.

### How to run
- prepare database
```
create database test;
use test;

create table idols (
	id int auto_increment primary key, 
	name varchar(255),
	label varchar(255),
	producer varchar(255),
	birth int,
	member int,
	song varchar(255)
);

insert into idols(name, label, producer, birth, member, song) values ('乃木坂46', '乃木坂46合同会社','秋元康', '2011','39', 'サヨナラの意味');
insert into idols(name, label, producer, birth, member, song) values ('AKB48', 'AKS','秋元康', '2005','596', '365日の紙飛行機');
insert into idols(name, label, producer, birth, member, song) values ('欅坂46', 'Sony Records','秋元康', '2015','21', 'BAN');
insert into idols(name, label, producer, birth, member, song) values ('モーニング娘。', 'URANEBA','つんく♂', '1997','14', 'LOVEマシーン');
insert into idols(name, label, producer, birth, member, song) values ('Perfume', 'もみじレーベル','中田ヤスタカ', '2000','3', 'FLASH');
```

- launch express server
$ npm install<br>
$ node server.js

### GraphQL sample
Query
```
query getSingleIdol($name: String!) {
  idol(name: $name) {
    label
    producer
    member
    song
  }
}
```
Variable
```
{
  "name": "AKB48"
}
```
