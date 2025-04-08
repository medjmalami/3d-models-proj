CREATE TYPE "public"."category" AS ENUM('mobs', 'armor', 'weapon', 'food', 'misc');--> statement-breakpoint
CREATE TABLE "items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"category" "category" NOT NULL,
	"model_url" varchar(255) NOT NULL,
	"date_added" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "items_name_unique" UNIQUE("name")
);
