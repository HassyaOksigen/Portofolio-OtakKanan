import React from 'react'
import HeroSection from './components/HeroSection'
import AboutSection from './components/AboutSection'
import ProjectsSection from './components/ProjectsSection'
import TechStackSection from './components/TechStackSection'
import FooterSection from './components/FooterSection'
import InteractiveCursor from './components/InteractiveCursor'

export default function App() {
  return (
    <main className="w-full min-h-screen bg-[#F5F4F0] text-neutral-900 selection:bg-neutral-900 selection:text-[#F5F4F0]">
      {/* Global Minimalist Single Dot Cursor (Auto Invert on Dark/Light) */}
      <InteractiveCursor />

      {/* 1. Lando Norris Inspired Hero Section */}
      <HeroSection 
        profileImageSrc="/profile.png"
        name="HASSYA"
        roleTag="DEV // 05"
        role="Full-Stack / Backend Developer"
        location="Indonesia"
        semester="Semester 5"
        email="hassya.dev@gmail.com"
        githubUrl="https://github.com"
        linkedinUrl="https://linkedin.com"
      />

      {/* 2. Transition Section: About & Quote Section */}
      <AboutSection 
        signatureSrc="/signature.png"
        quote="ENGINEERED FOR VELOCITY. BUILT FOR SCALE."
        subquote="Turning complex backend architecture into seamless, high-impact digital experiences."
        name="HASSYA"
        role="Full-Stack / Backend Engineer"
        location="Indonesia"
        semester="Semester 5"
      />

      {/* 3. Projects Showcase: Helmet Gallery Inspired Asymmetric Grid */}
      <ProjectsSection />

      {/* 4. Technical Stack & System Architecture Section */}
      <TechStackSection />

      {/* 5. Footer Section: Statement, Dual Navigation, Tech Suite, & Telemetry */}
      <FooterSection 
        signatureSrc="/signature.png"
        name="HASSYA"
        semester="Semester 5"
        email="hassya.dev@gmail.com"
        githubUrl="https://github.com"
        linkedinUrl="https://linkedin.com"
        instagramUrl="https://instagram.com"
      />
    </main>
  )
}
