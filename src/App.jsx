import React from 'react'
import HeroSection from './components/HeroSection'

export default function App() {
  return (
    <main className="w-full min-h-screen bg-[#F5F4F0] text-neutral-900 selection:bg-neutral-900 selection:text-[#F5F4F0]">
      {/* Lando Norris Inspired Hero Section */}
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
    </main>
  )
}
