ALTER TABLE "trips" ALTER COLUMN "startDate" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ALTER COLUMN "endDate" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "image" text;--> statement-breakpoint
ALTER TABLE "trips" ADD COLUMN "destination" text;--> statement-breakpoint
ALTER TABLE "trips" DROP COLUMN IF EXISTS "description";