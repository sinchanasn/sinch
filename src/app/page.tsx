"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Strip } from "@/components/Strip";
import { About } from "@/components/About";
import { Work } from "@/components/Work";
import { Design } from "@/components/Design";
import { Skills } from "@/components/Skills";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import initialProjects from "@/data/projects.json";
import initialProfile from "@/data/profile.json";
import initialSkills from "@/data/skills.json";
import { Project, ProfileInfo } from "@/types/portfolio";

export default function PortfolioPage() {
  const [light, setLight] = useState(false);
  const [projects, setProjects] = useState<Project[]>(initialProjects as Project[]);
  const [profile] = useState<ProfileInfo>(initialProfile as ProfileInfo);
  const [skills] = useState<Record<string, string[]>>(initialSkills);

  // Sync theme attribute to <html> tag
  useEffect(() => {
    if (light) {
      document.documentElement.setAttribute("data-theme", "light");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [light]);

  // Sync latest updates from API if user just modified in /admin
  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div className="min-h-screen bg-bg text-fg transition-colors duration-300">
      <Header light={light} setLight={setLight} name={profile.name} />
      <main id="main">
        <Hero profile={profile} />
        <Strip seed={7} />
        <About />
        <Strip seed={31} />
        <Work projects={projects} />
        <Design />
        <Skills skillsData={skills} />
        <Contact profile={profile} />
      </main>
      <Footer name={profile.name} />
    </div>
  );
}
