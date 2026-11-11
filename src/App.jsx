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
        role="Full-Stack Developer"
        location="Indonesia, Surabaya"
        semester="Semester 5"
        email="hassyaoksigen20@gmail.com"
        githubUrl="https://github.com/HassyaOksigen"
        linkedinUrl="https://www.linkedin.com/in/hassyaoksigen"
      />

      {/* 2. Transition Section: About & Quote Section */}
      <AboutSection 
        quote="DESIGNED WITH PRECISION. BUILT FOR PERFORMANCE."
        subquote="Crafting robust backend architectures, real-time data pipelines, and seamless web applications."
      />

      {/* 3. Projects Showcase: Helmet Gallery Inspired Asymmetric Grid */}
      <ProjectsSection />

      {/* 4. Technical Stack & System Architecture Section */}
      <TechStackSection />

      {/* 5. Footer Section: Statement, Centered CTA, & Telemetry */}
      <FooterSection 
        semester="Semester 5"
        email="hassyaoksigen20@gmail.com"
        githubUrl="https://github.com/HassyaOksigen"
        linkedinUrl="https://www.linkedin.com/in/hassyaoksigen"
      />
    </main>
  )
}
