import HeroVideo from "./components/HeroSection/HeroVideo";
import ServicesRail from "./components/Our-Services/ServicesRail";
import BackgroundWithRightImage from "./components/History/BackgroundWithRightImage";
import IntersectionObserver from "./components/We-Serve/IntersectionObserver";
import DesignExperts from "./components/Experts/DesignExperts";
import Page1 from "./components/Our-Projects/page1";   // ← add this
import Video from "./components/Vid/Video";
import ScrollingShowcase from "./components/Imagess/ScrollingShowcase";


export default function HomePage() {
          return (
              <main className="min-h-screen">
          <HeroVideo />

               <section className="py-24">
          <ServicesRail />
          </section>

          <BackgroundWithRightImage
              backgroundSrc="/images/background1.jpg"
              foregroundSrc="/images/new.jpg"
          />

          <IntersectionObserver />

          <DesignExperts />

             <section className="py-24">
          <Page1 />   {/* ← render it */}
          </section>

          <Video
              src="https://res.cloudinary.com/dyckgorsz/video/upload/v1759922310/4_v03fmy.mp4"           // place file at public/videos/your-video.mp4
              autoPlay={true}
              loop={true}
              muted={true}                            // keep true for autoplay on mobile
              controls={true}
          />

          <ScrollingShowcase />



          </main>
  );
}
