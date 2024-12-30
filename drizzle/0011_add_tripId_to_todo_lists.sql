ALTER TABLE "trips" DROP CONSTRAINT "trips_todoListId_todo_lists_id_fk";
--> statement-breakpoint
ALTER TABLE "todo_lists" ADD COLUMN "tripId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todo_lists" ADD CONSTRAINT "todo_lists_tripId_trips_id_fk" FOREIGN KEY ("tripId") REFERENCES "public"."trips"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN IF EXISTS "todoListId";