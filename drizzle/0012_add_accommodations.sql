CREATE TABLE IF NOT EXISTS "accommodations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "accommodations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(256) NOT NULL,
	"image" text NOT NULL,
	"address" text,
	"checkIn" date NOT NULL,
	"checkOut" date NOT NULL,
	"reservationPrice" integer,
	"notes" text,
	"bookingUrl" text,
	"tripAdvisorUrl" text,
	"phoneNumber" varchar(256),
	"latLng" "point",
	"tripId" integer NOT NULL,
	"userId" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_tripId_trips_id_fk" FOREIGN KEY ("tripId") REFERENCES "public"."trips"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
