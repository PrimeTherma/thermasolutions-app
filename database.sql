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
	"procedure_id" integer references "user",
	"interval_time" interval,
	"avg_temp" NUMERIC (5, 3),
	"interval_htu" NUMERIC (5, 3),
	"t1" NUMERIC (5, 3),
	"t2" NUMERIC (5, 3),
	"t3" NUMERIC (5, 3),
	"t4" NUMERIC (5, 3),
	"t5" NUMERIC (5, 3),
	"t6" NUMERIC (5, 3),
	"t7" NUMERIC (5, 3)
);