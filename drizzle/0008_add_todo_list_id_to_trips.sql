ALTER TABLE "todo_lists" DROP CONSTRAINT "todo_lists_tripId_trips_id_fk";
--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "userId" text NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "todoListId" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trips" ADD CONSTRAINT "trips_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trips" ADD CONSTRAINT "trips_todoListId_todo_lists_id_fk" FOREIGN KEY ("todoListId") REFERENCES "public"."todo_lists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "todo_lists" DROP COLUMN IF EXISTS "tripId";--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN IF EXISTS "user_id";