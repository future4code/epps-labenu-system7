create table lbsystem_teachers (
  id int auto_increment primary key,
  name varchar(255) not NULL,
  email varchar(255) not null,
  birthDate date not null
);

create table lbsystem_class (
  id int auto_increment primary key,
  name varchar(255) not null,
  startdate date not null,
  enddate date not null,
  module varchar(255),
  id_teacher int unique not null
);
alter table lbsystem_class
add constraint fk_id_teacher_lbsystem_class
foreign key(id_teacher)
references lbsystem_teachers(id);

create table lbsystem_students (
  id int auto_increment primary key,
  name varchar(255) not null,
  email varchar(255) not null,
  birthDate date not null,
  id_class int
);
alter table lbsystem_students
add constraint fk_id_class_lbsystem_students
foreign key(id_class)
references lbsystem_class(id);

create table lbsystem_skills (
  id int auto_increment primary key,
  name enum(
    "React",
    "Redux",
    "CSS",
    "Testes",
    "Typescript",
    "POO",
    "Backend"
  ) not null
);

create table lbsystem_skillteachers(
  id_teacher int not null,
  id_skill int not null,
  primary key(id_teacher, id_skill)
);
alter table lbsystem_skillteachers
add constraint fk_id_teacher_lbsystem_skillteachers
foreign key (id_teacher)
references lbsystem_teachers(id); 
alter table lbsystem_skillteachers
add constraint fk_id_skill_lbsystem_skillteachers
foreign key (id_skill)
references lbsystem_skills(id); 

create table lbsystem_hobbies(
  id int auto_increment primary key,
  name varchar(255)
);
create table lbsystem_hobbiesstudents(
  id_student int,
  id_hobbie int,
  primary key (id_student,id_hobbie)
);
alter table lbsystem_hobbiesstudents 
add constraint fk_id_student_lbsystem_hobbiesstudents
foreign key(id_student)
references lbsystem_students(id); 
alter table lbsystem_hobbiesstudents 
add constraint fk_id_hobbie_lbsystem_hobbiesstudents
foreign key(id_hobbie)
references lbsystem_hobbies(id); 

insert into lbsystem_teachers values
(1,"Mateus Gesualdo","mateus@gmail.com","1980-01-01"),
(2,"Amanda Rangel","amanda@gmail.com","1990-01-01"),
(3,"Leticia Chijo","leticia@gmail.com","1985-01-01"),
(4,"Lais Petra","lais@gmail.com","1978-01-01"),
(5,"Darvas","darvas@gmail.com","1992-01-01"),
(6,"Bruno Movio","bruno@gmail.com","1995-01-01");

insert into lbsystem_class values
(1,"AAA","2020-01-01","2020-06-30",7,1),
(2,"BBB","2020-07-01","2020-12-31",7,2),
(3,"CCC","2021-01-01","2021-06-30",5,3),
(4,"DDD","2021-07-01","2021-12-31",6,4),
(5,"FFF","2022-01-01","2021-06-30",0,5),
(6,"GGG","2022-07-01","2022-12-31",0,6);

insert into lbsystem_skills values
(1, "React"),      
(2, "Redux"),      
(3, "CSS"),        
(4, "Testes"),     
(5, "Typescript"), 
(6, "POO"),        
(7, "Backend");    

insert into lbsystem_skillteachers values 
(1,4),
(1,5),
(1,6),
(1,7),
(2,1),
(2,2),
(2,3),
(3,1),
(3,2),
(3,3),
(4,1),
(4,3),
(5,4),
(5,6),
(5,7),
(6,7);

insert into lbsystem_students values 
(1,"joao","joao@gmail.com","1980-01-01",1),
(2,"maria","maria@gmail.com","1981-01-01",1),
(3,"roberto","roberto@gmail.com","1982-01-01",1),
(4,"osvaldo","osvaldo@gmail.com","1983-01-01",1),
(5,"peixe","peixe@gmail.com","1984-01-01",1),
(6,"wender","wender@gmail.com","1985-01-01",1),
(7,"camila","camila@gmail.com","1986-01-01",2),
(8,"stefany","stefany@gmail.com","1987-01-01",2),
(9,"luis","luis@gmail.com","1988-01-01",2),
(10,"adernam","adernam@gmail.com","1989-01-01",2),
(11,"cleiton","cleiton@gmail.com","1990-01-01",3),
(12,"ricardo","ricardo@gmail.com","1991-01-01",4),
(13,"marcos","marcos@gmail.com","1992-01-01",3),
(14,"rogerio","rogerio@gmail.com","1993-01-01",3),
(15,"aline","aline@gmail.com","1994-01-01",2),
(16,"barbara","barbara@gmail.com","1995-01-01",2),
(17,"wilson","wilson@gmail.com","1996-01-01",3),
(18,"tata","tata@gmail.com","1997-01-01",4),
(19,"wildegard","wildegard@gmail.com","1998-01-01",4),
(20,"valeria","valeria@gmail.com","1999-01-01",4),
(21,"emersom","emersom@gmail.com","2000-01-01",4),
(22,"julia","julia@gmail.com","2001-01-01",5),
(23,"susana","susana@gmail.com","2002-01-01",5),
(24,"querlen","querlen@gmail.com","2003-01-01",6),
(25,"karina","karina@gmail.com","2004-01-01",6);

insert into lbsystem_hobbies values
(1,"football"),
(2,"basket"),
(3,"develop"),
(4,"poker"),
(5,"chess"),
(6,"video-game"),
(7,"hacker"),
(8,"swin"),
(9,"sleep"),
(10,"nothing");

insert into lbsystem_hobbiesstudents values 
(1,1),
(1,2),
(1,5),
(1,7),
(1,10),
(2,7),
(2,3),
(2,1),
(3,4),
(3,9),
(3,8),
(4,6),
(4,8),
(4,9),
(5,7),
(5,2),
(5,4),
(6,9),
(7,5),
(7,3),
(7,8),
(8,6),
(8,7),
(8,8),
(9,9),
(9,10),
(9,8),
(9,2),
(10,3),
(10,4),
(10,5),
(11,1),
(11,2),
(11,3),
(12,4),
(12,5),
(12,6),
(13,7),
(13,8),
(13,9),
(14,10),
(14,1),
(14,2),
(15,3),
(15,4),
(15,5),
(16,6),
(16,7),
(16,8),
(17,9),
(17,10),
(17,1),
(18,2),
(18,3),
(18,4),
(19,5),
(19,6),
(19,7),
(20,8),
(20,9),
(20,10),
(21,1),
(21,2),
(21,3),
(22,4),
(22,5),
(22,6),
(23,7),
(23,8),
(23,9),
(24,10),
(24,1),
(24,2),
(25,3),
(25,4),
(25,5);
