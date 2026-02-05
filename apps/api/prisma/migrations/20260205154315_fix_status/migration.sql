/*
  Warnings:

  - The values [OPEN,IN_PROGRESS] on the enum `TaskStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TaskStatus_new" AS ENUM ('TODO', 'DOING', 'DONE');
ALTER TABLE "public"."Task" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Task" ALTER COLUMN "status" TYPE "TaskStatus_new" USING (
  CASE
    WHEN "status"::text = 'OPEN' THEN 'TODO'::text::"TaskStatus_new"
    WHEN "status"::text = 'IN_PROGRESS' THEN 'DOING'::text::"TaskStatus_new"
    ELSE "status"::text::"TaskStatus_new"
  END
);
ALTER TYPE "TaskStatus" RENAME TO "TaskStatus_old";
ALTER TYPE "TaskStatus_new" RENAME TO "TaskStatus";
DROP TYPE "public"."TaskStatus_old";
ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'TODO';
COMMIT;

-- AlterTable
ALTER TABLE "Task" ALTER COLUMN "status" SET DEFAULT 'TODO';
