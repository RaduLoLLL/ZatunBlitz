/*
  Warnings:

  - You are about to drop the `_BookingToUser` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "_BookingToUser_B_index";

-- DropIndex
DROP INDEX "_BookingToUser_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_BookingToUser";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "starts_at" DATETIME NOT NULL,
    "ends_at" DATETIME NOT NULL,
    "intrare_complex" INTEGER NOT NULL,
    "loc_parcare" INTEGER NOT NULL,
    "loc_pescuit" INTEGER NOT NULL,
    "casuta" INTEGER NOT NULL,
    "sezlong" INTEGER NOT NULL,
    "sedinta_foto" BOOLEAN NOT NULL,
    "petrecere_privata" BOOLEAN NOT NULL,
    "total_price" INTEGER NOT NULL,
    "userId" INTEGER,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("casuta", "ends_at", "id", "intrare_complex", "loc_parcare", "loc_pescuit", "petrecere_privata", "sedinta_foto", "sezlong", "starts_at", "total_price") SELECT "casuta", "ends_at", "id", "intrare_complex", "loc_parcare", "loc_pescuit", "petrecere_privata", "sedinta_foto", "sezlong", "starts_at", "total_price" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
