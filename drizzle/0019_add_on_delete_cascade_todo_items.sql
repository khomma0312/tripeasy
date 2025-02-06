ALTER TABLE "todo_items" DROP CONSTRAINT "todo_items_todoListId_todo_lists_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "todo_items" ADD CONSTRAINT "todo_items_todoListId_todo_lists_id_fk" FOREIGN KEY ("todoListId") REFERENCES "public"."todo_lists"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
