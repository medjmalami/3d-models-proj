CREATE TABLE "items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"category" varchar(50) NOT NULL,
	"model_url" varchar(255) NOT NULL,
	"thumbnail_url" varchar(255) NOT NULL,
	"date_added" timestamp DEFAULT now() NOT NULL
);
