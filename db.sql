-- database hirejob
-- level 1 = admin
-- level 2 = recruiter
-- level 3 = worker
create table users ( 
    user_id UUID PRIMARY KEY NOT NULL, 
    full_name varchar(64) not null, 
    email varchar(64) not null unique, 
    phone varchar(16) not null, 
    password varchar not null, 
    job_spec varchar,
    ig_account varchar,
    git_account varchar,
    level_user integer,
    company_recruiter varchar(100),
    linkedin_recruiter varchar(150),
    job_type varchar,
    gitlab_account varchar,
    avatar varchar,
    ava_public_id varchar,
    ava_url varchar,
    ava_secure_url varchar,
    job_desc varchar, 
    domisli varchar, 
    work_place varchar, 
    personal_desc varchar, 
    created_at timestamptz not null default now(), 
    updated_at timestamptz 
    );

insert into users (user_id, full_name, email, phone, password) 
values 
('8b65d7af-91c2-478f-8655-ddaabeb3fa80','Ainur Ridwan', 'ainur@mail.com', '08131239','123456');




CREATE TABLE public.skills
(
    skill_id uuid NOT NULL,
    name_skill character varying,
    user_id character varying,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone,
    PRIMARY KEY (skill_id)
);

ALTER TABLE IF EXISTS public.skills
    OWNER to postgres;


CREATE TABLE public.work_exp
(
    work_exp_id uuid NOT NULL,
    user_id uuid,
    "position" character varying,
    company_name character varying,
    month_year character varying,
    description character varying,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone,
    PRIMARY KEY (work_exp_id)
);

ALTER TABLE IF EXISTS public.work_exp
    OWNER to postgres;

insert into work_exp (work_exp_id, user_id, position, company_name, month_year, description) values 
(gen_random_uuid(), '8b65d7af-91c2-478f-8655-ddaabeb3fa80', 'web developer', 'PT Mencari Ridho Ilahi', 'Januari 2018', 'lorem ipsum sir amet selalu ceria walam ga bagus bagus amet');


CREATE TABLE public.portofolio
(
    portofolio_id uuid NOT NULL,
    user_id uuid,
    app_name character varying,
    link_repo character varying,
    portofolio_type character varying,
    portof_img character varying,
    portof_img_public_id character varying,
    portof_img_url character varying,
    portof_img_secure_url character varying,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone,
    PRIMARY KEY (portofolio_id)
);

ALTER TABLE IF EXISTS public.portofolio
    OWNER to postgres;

insert into portofolio (portofolio_id, user_id, app_name, link_repo, portofolio_type, portof_img) values
(gen_random_uuid(), '8b65d7af-91c2-478f-8655-ddaabeb3fa80', 'To do List', 'www.example-todolist.com', 'Web Application', 'todolist.jpg');







