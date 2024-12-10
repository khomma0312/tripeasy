ALTER TABLE "verification_tokens" ALTER COLUMN "email" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "verification_tokens" ALTER COLUMN "token" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "verification_tokens" ALTER COLUMN "expires" SET NOT NULL;