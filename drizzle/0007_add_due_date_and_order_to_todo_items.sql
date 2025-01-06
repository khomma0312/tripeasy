ALTER TABLE "todo_items" ADD COLUMN "dueDate" timestamp;--> statement-breakpoint
ALTER TABLE "todo_items" ADD COLUMN "order" integer NOT NULL;