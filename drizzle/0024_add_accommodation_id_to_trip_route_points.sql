ALTER TABLE "trip_route_points" ALTER COLUMN "destination_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "trip_route_points" ADD COLUMN "accommodation_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trip_route_points" ADD CONSTRAINT "trip_route_points_accommodation_id_accommodations_id_fk" FOREIGN KEY ("accommodation_id") REFERENCES "public"."accommodations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
