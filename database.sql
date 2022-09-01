CREATE DATABASE "therma_solutions";

CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL,
    "access_level" INT DEFAULT 0
);

CREATE TABLE "procedure" (
	"id" SERIAL PRIMARY KEY,
	"user_id" integer references "user",
	"total_time" time DEFAULT NULL,
	"total_htu" NUMERIC(6, 3) DEFAULT NULL,
	"date" date DEFAULT CURRENT_DATE,
	"notes" varchar(600) DEFAULT NULL
);

CREATE TABLE "diagnostics" (
	"id" SERIAL PRIMARY KEY,
	"procedure_id" integer references "user"
	,"interval_time" time  NOT NULL
	,"avg_temp"      NUMERIC(5,2) NOT NULL
	,"interval_htu"  NUMERIC(12,10) NOT NULL
	,"t1"            NUMERIC(5,2) NOT NULL
	,"t2"            NUMERIC(5,2) NOT NULL
	,"t3"            NUMERIC(5,2) NOT NULL
	,"t4"            NUMERIC(5,2) NOT NULL
	,"t5"            NUMERIC(5,2) NOT NULL
	,"t6"            NUMERIC(5,2) NOT NULL
	,"t7"            NUMERIC(5,2) NOT NULL
);

CREATE TABLE "device"(
	"id"            SERIAL PRIMARY KEY
	,"procedure_id"  INT  NOT NULL
	,"interval_time" time  NOT NULL
	,"avg_temp"      NUMERIC(5,2) NOT NULL
	,"interval_htu"  NUMERIC(12,10) NOT NULL
	,"t1"            NUMERIC(5,2) NOT NULL
	,"t2"            NUMERIC(5,2) NOT NULL
	,"t3"            NUMERIC(5,2) NOT NULL
	,"t4"            NUMERIC(5,2) NOT NULL
	,"t5"            NUMERIC(5,2) NOT NULL
	,"t6"            NUMERIC(5,2) NOT NULL
	,"t7"            NUMERIC(5,2) NOT NULL
);