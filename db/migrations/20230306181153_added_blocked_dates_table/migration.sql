-- CreateTable
CREATE TABLE "BlockedDates" (
    "id" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BlockedDates_pkey" PRIMARY KEY ("id")
);
