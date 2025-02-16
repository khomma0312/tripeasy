CREATE TABLE IF NOT EXISTS "destinations" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "destinations_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"address" text,
	"google_location_id" varchar(256),
	"lat_lng" "point",
	"user_id" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trip_day_segments" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "trip_day_segments_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"day_order" integer NOT NULL,
	"day_date" date NOT NULL,
	"description" text,
	"trip_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trip_route_points" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "trip_route_points_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"visit_order" integer NOT NULL,
	"arrival_time" time NOT NULL,
	"departure_time" time NOT NULL,
	"trip_day_segment_id" integer NOT NULL,
	"destination_id" integer NOT NULL,
	"user_id" text NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "destinations" ADD CONSTRAINT "destinations_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trip_day_segments" ADD CONSTRAINT "trip_day_segments_trip_id_trips_id_fk" FOREIGN KEY ("trip_id") REFERENCES "public"."trips"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trip_day_segments" ADD CONSTRAINT "trip_day_segments_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trip_route_points" ADD CONSTRAINT "trip_route_points_trip_day_segment_id_trip_day_segments_id_fk" FOREIGN KEY ("trip_day_segment_id") REFERENCES "public"."trip_day_segments"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trip_route_points" ADD CONSTRAINT "trip_route_points_destination_id_destinations_id_fk" FOREIGN KEY ("destination_id") REFERENCES "public"."destinations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trip_route_points" ADD CONSTRAINT "trip_route_points_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
