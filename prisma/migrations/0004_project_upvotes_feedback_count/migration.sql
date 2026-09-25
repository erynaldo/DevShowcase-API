ALTER TABLE "projects" ADD COLUMN "upvotes" INTEGER NOT NULL DEFAULT 0;
ALTER TABLE "projects" ADD COLUMN "total_feedbacks" INTEGER NOT NULL DEFAULT 0;

UPDATE "projects" project
SET "total_feedbacks" = (
  SELECT COUNT(*)
  FROM "feedbacks" feedback
  WHERE feedback."projetoId" = project."id"
);

ALTER TABLE "projects" DROP COLUMN "curtidas";
ALTER TABLE "projects" DROP COLUMN "estrelas";