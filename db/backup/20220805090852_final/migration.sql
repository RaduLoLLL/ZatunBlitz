/*
  Warnings:

  - You are about to drop the column `foisor_mare` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `foisor_mic` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `petrecere_privata` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `sedinta_foto` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `sezlong` on the `Booking` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "foisor_mare",
DROP COLUMN "foisor_mic",
DROP COLUMN "petrecere_privata",
DROP COLUMN "sedinta_foto",
DROP COLUMN "sezlong";
