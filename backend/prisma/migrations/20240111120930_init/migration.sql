/*
  Warnings:

  - You are about to drop the `Ticket` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Ticket";

-- CreateTable
CREATE TABLE "ticket" (
    "id" SERIAL NOT NULL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "handled_at" TIMESTAMP(3),
    "done_at" TIMESTAMP(3),
    "email" TEXT NOT NULL,
    "category" "Category" NOT NULL,
    "description" TEXT NOT NULL,
    "priority" "PriorityLevel" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'submitted',

    CONSTRAINT "ticket_pkey" PRIMARY KEY ("id")
);
