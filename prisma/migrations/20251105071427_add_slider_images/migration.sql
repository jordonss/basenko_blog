-- CreateTable
CREATE TABLE "SliderImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "altText" TEXT,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SliderImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "SliderImage_order_idx" ON "SliderImage"("order");
