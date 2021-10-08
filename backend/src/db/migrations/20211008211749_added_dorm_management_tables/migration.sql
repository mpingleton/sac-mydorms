-- CreateTable
CREATE TABLE "Buildings" (
    "id" SERIAL NOT NULL,
    "building_number" TEXT NOT NULL,
    "building_name" TEXT NOT NULL,
    "address" TEXT NOT NULL,

    CONSTRAINT "Buildings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rooms" (
    "id" SERIAL NOT NULL,
    "building_id" INTEGER NOT NULL,
    "room_number" TEXT NOT NULL,
    "status" INTEGER NOT NULL,

    CONSTRAINT "Rooms_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Personnel" (
    "id" SERIAL NOT NULL,
    "rank" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "middle_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Personnel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Enrollments" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "personnel_id" INTEGER NOT NULL,

    CONSTRAINT "Enrollments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomAssignments" (
    "id" SERIAL NOT NULL,
    "personnel_id" INTEGER NOT NULL,
    "room_id" INTEGER NOT NULL,

    CONSTRAINT "RoomAssignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DormManagerAssignments" (
    "id" SERIAL NOT NULL,
    "personnel_id" INTEGER NOT NULL,
    "building_id" INTEGER NOT NULL,

    CONSTRAINT "DormManagerAssignments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrders" (
    "id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "creator_remarks" TEXT NOT NULL,
    "created_by" INTEGER NOT NULL,
    "created_timestamp" TIMESTAMP(3) NOT NULL,
    "status" INTEGER NOT NULL,
    "status_timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WorkOrderComments" (
    "id" SERIAL NOT NULL,
    "work_order_id" INTEGER NOT NULL,
    "personnel_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "WorkOrderComments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomInspections" (
    "id" SERIAL NOT NULL,
    "room_id" INTEGER NOT NULL,
    "personnel_id" INTEGER NOT NULL,
    "dorm_manager_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "inspector_name" TEXT NOT NULL,
    "inspector_remarks" TEXT NOT NULL,

    CONSTRAINT "RoomInspections_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "created_by" INTEGER NOT NULL,
    "scheduled" TIMESTAMP(3) NOT NULL,
    "location" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonAreaPosts" (
    "id" SERIAL NOT NULL,
    "posted_by" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "comments_enabled" BOOLEAN NOT NULL,

    CONSTRAINT "CommonAreaPosts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommonAreaPostComments" (
    "id" SERIAL NOT NULL,
    "post_id" INTEGER NOT NULL,
    "commenter_id" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "text" TEXT NOT NULL,
    "is_visible" BOOLEAN NOT NULL,

    CONSTRAINT "CommonAreaPostComments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Rooms" ADD CONSTRAINT "Rooms_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "Buildings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Enrollments" ADD CONSTRAINT "Enrollments_personnel_id_fkey" FOREIGN KEY ("personnel_id") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomAssignments" ADD CONSTRAINT "RoomAssignments_personnel_id_fkey" FOREIGN KEY ("personnel_id") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomAssignments" ADD CONSTRAINT "RoomAssignments_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DormManagerAssignments" ADD CONSTRAINT "DormManagerAssignments_personnel_id_fkey" FOREIGN KEY ("personnel_id") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DormManagerAssignments" ADD CONSTRAINT "DormManagerAssignments_building_id_fkey" FOREIGN KEY ("building_id") REFERENCES "Buildings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrders" ADD CONSTRAINT "WorkOrders_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrders" ADD CONSTRAINT "WorkOrders_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderComments" ADD CONSTRAINT "WorkOrderComments_work_order_id_fkey" FOREIGN KEY ("work_order_id") REFERENCES "WorkOrders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkOrderComments" ADD CONSTRAINT "WorkOrderComments_personnel_id_fkey" FOREIGN KEY ("personnel_id") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomInspections" ADD CONSTRAINT "RoomInspections_room_id_fkey" FOREIGN KEY ("room_id") REFERENCES "Rooms"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomInspections" ADD CONSTRAINT "RoomInspections_personnel_id_fkey" FOREIGN KEY ("personnel_id") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomInspections" ADD CONSTRAINT "RoomInspections_dorm_manager_id_fkey" FOREIGN KEY ("dorm_manager_id") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonAreaPosts" ADD CONSTRAINT "CommonAreaPosts_posted_by_fkey" FOREIGN KEY ("posted_by") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonAreaPostComments" ADD CONSTRAINT "CommonAreaPostComments_post_id_fkey" FOREIGN KEY ("post_id") REFERENCES "CommonAreaPosts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommonAreaPostComments" ADD CONSTRAINT "CommonAreaPostComments_commenter_id_fkey" FOREIGN KEY ("commenter_id") REFERENCES "Personnel"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
