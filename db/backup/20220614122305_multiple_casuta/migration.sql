/*
  Warnings:

  - The `loc_pescuit` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `casuta` column on the `Booking` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "loc_pescuit",
ADD COLUMN     "loc_pescuit" INTEGER[],
DROP COLUMN "casuta",
ADD COLUMN     "casuta" INTEGER[];
