CREATE TABLE IF NOT EXISTS "verification_tokens" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "verification_tokens_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(256),
	"token" text,
	"expires" timestamp,
	CONSTRAINT "verification_tokens_email_token_unique" UNIQUE("email","token")
);
