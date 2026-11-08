import fs from "fs/promises";
import path from "path";
import { Project, ProfileInfo } from "@/types/portfolio";

const dataDir = path.join(process.cwd(), "src", "data");
const projectsFile = path.join(dataDir, "projects.json");
const skillsFile = path.join(dataDir, "skills.json");
const profileFile = path.join(dataDir, "profile.json");
const designFile = path.join(dataDir, "design.json");

export async function getProjects(): Promise<Project[]> {
  try {
    const raw = await fs.readFile(projectsFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export async function saveProjects(projects: Project[]): Promise<void> {
  await fs.writeFile(projectsFile, JSON.stringify(projects, null, 2), "utf-8");
}

export async function getSkills(): Promise<Record<string, string[]>> {
  try {
    const raw = await fs.readFile(skillsFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {};
  }
}

export async function getProfile(): Promise<ProfileInfo> {
  try {
    const raw = await fs.readFile(profileFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return {
      name: "Sinchana",
      role: "Full-Stack & AI Software Developer",
      bioHeadline: "Sinchana, Full-Stack & AI Software Developer and CSE undergrad based in Bengaluru, India.",
      bioExtended: "Building intuitive, high-impact web and AI systems from first principles.",
      location: "Bengaluru, India",
      email: "sinchana.sn.2007@gmail.com",
      github: "https://github.com/sinchanasn",
      linkedin: "#",
      resume: "#",
    };
  }
}

export async function getDesign(): Promise<[string, string][]> {
  try {
    const raw = await fs.readFile(designFile, "utf-8");
    return JSON.parse(raw);
  } catch {
    return [];
  }
}
