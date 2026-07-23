"use client";

import { useState } from "react";
import AdmissionModal from "@/components/AdmissionModal";
import AdmissionsCTA from "@/components/AdmissionsCTA";
import DirectorSection from "@/components/DirectorSection";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LeadersSection from "@/components/LeadersSection";
import Manifesto from "@/components/Manifesto";
import NewsSection from "@/components/NewsSection";
import StudentDevelopment from "@/components/StudentDevelopment";
import Testimonials from "@/components/Testimonials";
import VisionSection from "@/components/VisionSection";
import WhyChoose from "@/components/WhyChoose";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function HomePage() {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  return (
    <>
      <Header onApplyClick={openModal} />
      <main>
        <Hero onEnquireClick={openModal} />
        <WhyChoose />
        <DirectorSection />
        <NewsSection />
        <Testimonials />
        <WhyChooseUs />
        <AdmissionsCTA onApplyClick={openModal} />
        <VisionSection />
        <StudentDevelopment />
        <LeadersSection onApplyClick={openModal} />
        <Manifesto onApplyClick={openModal} />
        <FAQ />
      </main>
      <Footer />
      <AdmissionModal open={modalOpen} onClose={closeModal} />

      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 z-40 rounded-full bg-[#ffb300] px-5 py-3 text-sm font-bold text-[#003d78] shadow-lg transition hover:bg-[#ffcc02] md:bottom-8 md:right-8"
      >
        Admission Enquiry
      </button>
    </>
  );
}
