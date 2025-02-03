ALTER TABLE "accommodations" DROP CONSTRAINT "accommodations_tripId_trips_id_fk";
--> statement-breakpoint
ALTER TABLE "todo_lists" DROP CONSTRAINT "todo_lists_tripId_trips_id_fk";
--> statement-breakpoint
ALTER TABLE "todo_lists" ALTER COLUMN "tripId" DROP NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accommodations" ADD CONSTRAINT "accommodations_tripId_trips_id_fk" FOREIGN KEY ("tripId") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todo_lists" ADD CONSTRAINT "todo_lists_tripId_trips_id_fk" FOREIGN KEY ("tripId") REFERENCES "public"."trips"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
