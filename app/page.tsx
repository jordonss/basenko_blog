import prisma from "./lib/prisma";

import HomePage from "@/components/home-page";
import PostsGridPage from "./posts/page";
import ImageSlider from "@/components/image-slider";
import Footer from "@/components/footer";

async function getSliderImages() {
  try {
    return await prisma.sliderImage.findMany({
      orderBy: { createdAt: "asc" },
    });
  } catch (error) {
    console.error("Error fetching slider images:", error);
    return [];
  }
}

export default async function Home() {
  const sliderImages = await getSliderImages();

  return (
    <div>
      <HomePage />
      <section id="blog" className="scroll-mt-20">
        <PostsGridPage />
      </section>
      <section id="gallery" className="scroll-mt-20">
        <ImageSlider images={sliderImages} />
      </section>
      <Footer />
    </div>
  );
}
