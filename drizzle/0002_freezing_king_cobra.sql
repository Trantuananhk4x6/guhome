CREATE TABLE "project_styles" (
	"project_id" uuid NOT NULL,
	"style_id" uuid NOT NULL,
	"order" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "styles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"name" text NOT NULL,
	"name_en" text,
	"tagline" text,
	"description" text,
	"cover_media_id" uuid,
	"seo" jsonb,
	"order" integer DEFAULT 0 NOT NULL,
	"enabled" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "project_styles" ADD CONSTRAINT "project_styles_project_id_projects_id_fk" FOREIGN KEY ("project_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "project_styles" ADD CONSTRAINT "project_styles_style_id_styles_id_fk" FOREIGN KEY ("style_id") REFERENCES "public"."styles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "styles" ADD CONSTRAINT "styles_cover_media_id_media_id_fk" FOREIGN KEY ("cover_media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "project_styles_pair_key" ON "project_styles" USING btree ("project_id","style_id");--> statement-breakpoint
CREATE INDEX "project_styles_style_idx" ON "project_styles" USING btree ("style_id");--> statement-breakpoint
CREATE UNIQUE INDEX "styles_slug_key" ON "styles" USING btree ("slug");--> statement-breakpoint
CREATE INDEX "styles_order_idx" ON "styles" USING btree ("order");