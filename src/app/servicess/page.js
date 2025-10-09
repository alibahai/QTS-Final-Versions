"use client";

import DesignExperts from "../components/Experts/DesignExperts";
import ScrollingShowcase from "../components/Imagess/ScrollingShowcase";
import Service2 from "../components/Our-Services2/page";

export default function Service() {
  return (
    <main className="min-h-screen ">
      {/* Hero Banner */}
      <section
        id="hero" // ✅ lets Navbar detect hero
        className="relative h-[300px] w-full -mt-20" // ✅ pull up 80px so hero sits behind fixed navbar
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/services.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex h-full items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow">
            Our Services
          </h1>
        </div>
      </section>

 <section >
        <div >
          <Service2/>
        </div>
      </section>

      {/* Render your component here */}
      <section >
        <div >
          <DesignExperts />
        </div>
      </section>

        <section >
        <div >
          <ScrollingShowcase/>
        </div>
      </section>

    </main>
  );
}
