/*
  Warnings:

  - You are about to drop the column `personnel_id` on the `RoomInspections` table. All the data in the column will be lost.
  - You are about to drop the `DormManagerAssignments` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `base_id` to the `Buildings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_id` to the `CommonAreaPosts` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_id` to the `Events` table without a default value. This is not possible if the table is not empty.
  - Added the required column `base_id` to the `Personnel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `is_dorm_manager` to the `Personnel` table without a default value. This is not possible if the table is not empty.
  - Added the required column `resident_id` to the `RoomInspections` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subject` to the `WorkOrders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DormManagerAssignments" DROP CONSTRAINT "DormManagerAssignments_building_id_fkey";

-- DropForeignKey
ALTER TABLE "DormManagerAssignments" DROP CONSTRAINT "DormManagerAssignments_personnel_id_fkey";

-- DropForeignKey
ALTER TABLE "RoomInspections" DROP CONSTRAINT "RoomInspections_personnel_id_fkey";

-- AlterTable
ALTER TABLE "Buildings" ADD COLUMN     "base_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "CommonAreaPosts" ADD COLUMN     "base_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Events" ADD COLUMN     "base_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Personnel" ADD COLUMN     "base_id" INTEGER NOT NULL,
ADD COLUMN     "is_dorm_manager" BOOLEAN NOT NULL;

-- AlterTable
ALTER TABLE "RoomInspections" DROP COLUMN "personnel_id",
ADD COLUMN     "resident_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "WorkOrders" ADD COLUMN     "subject" TEXT NOT NULL;

-- DropTable
DROP TABLE "DormManagerAssignments";

-- CreateTable
CREATE TABLE "PendingEnrollments" (
    "id" SERIAL NOT NULL,
    "personnel_id" INTEGER NOT NULL,
    "registration_code" TEXT NOT NULL,

    CONSTRAINT "PendingEnrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventResponses" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "personnel_id" INTEGER NOT NULL,
    "response_code" INTEGER NOT NULL,

    CONSTRAINT "EventResponses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Messages" (
    "id" SERIAL NOT NULL,
    "sender_id" INTEGER NOT NULL,
    "recipient_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "subject" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "Messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bases" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Bases_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PendingEnrollments_personnel_id_key" ON "PendingEnrollments"("personnel_id");

-- CreateIndex
CREATE UNIQUE INDEX "PendingEnrollments_registration_code_key" ON "PendingEnrollments"("registration_code");

-- AddForeignKey
ALTER TABLE "Buildings" ADD CONSTRAINT "Buildings_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "Bases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Personnel" ADD CONSTRAINT "Personnel_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "Bases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PendingEnrollments" ADD CONSTRAINT "PendingEnrollments_personnel_id_fkey" FOREIGN KEY ("personnel_id") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomInspections" ADD CONSTRAINT "RoomInspections_resident_id_fkey" FOREIGN KEY ("resident_id") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "Bases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventResponses" ADD CONSTRAINT "EventResponses_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventResponses" ADD CONSTRAINT "EventResponses_personnel_id_fkey" FOREIGN KEY ("personnel_id") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonAreaPosts" ADD CONSTRAINT "CommonAreaPosts_base_id_fkey" FOREIGN KEY ("base_id") REFERENCES "Bases"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_sender_id_fkey" FOREIGN KEY ("sender_id") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Messages" ADD CONSTRAINT "Messages_recipient_id_fkey" FOREIGN KEY ("recipient_id") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
