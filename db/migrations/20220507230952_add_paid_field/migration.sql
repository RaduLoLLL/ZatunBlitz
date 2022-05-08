-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Booking" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
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
    "stripeSessionId" TEXT,
    "paid" BOOLEAN NOT NULL DEFAULT false,
    "userId" INTEGER,
    CONSTRAINT "Booking_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Booking" ("casuta", "createdAt", "ends_at", "id", "intrare_complex", "loc_parcare", "loc_pescuit", "petrecere_privata", "sedinta_foto", "sezlong", "starts_at", "stripeSessionId", "total_price", "userId") SELECT "casuta", "createdAt", "ends_at", "id", "intrare_complex", "loc_parcare", "loc_pescuit", "petrecere_privata", "sedinta_foto", "sezlong", "starts_at", "stripeSessionId", "total_price", "userId" FROM "Booking";
DROP TABLE "Booking";
ALTER TABLE "new_Booking" RENAME TO "Booking";
CREATE UNIQUE INDEX "Booking_stripeSessionId_key" ON "Booking"("stripeSessionId");
CREATE UNIQUE INDEX "Booking_userId_key" ON "Booking"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
