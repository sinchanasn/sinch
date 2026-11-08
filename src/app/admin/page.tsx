"use client";

import React, { useState, useEffect } from "react";
import { Project } from "@/types/portfolio";
import { Radar } from "@/components/Radar";
import {
  Lock,
  KeyRound,
  Plus,
  Trash2,
  Edit3,
  Check,
  Eye,
  ArrowLeft,
  Save,
  LogOut,
  RefreshCw,
  FolderGit2,
  ExternalLink,
} from "lucide-react";
import Link from "next/link";

const PRESET_TECH = [
  "React",
  "TypeScript",
  "Node.js",
  "Express",
  "Next.js",
  "Tailwind CSS",
  "Python",
  "OpenCV",
  "PyTorch",
  "NumPy",
  "Web Audio API",
  "HTML5 Canvas",
  "SQLite",
  "RESTful APIs",
];

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  const [projects, setProjects] = useState<Project[]>([]);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingProject, setIsCreatingProject] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("sinchana_admin_auth");
    if (saved === "true") {
      setIsAuthenticated(true);
      fetchProjects();
    }
  }, []);

  const fetchProjects = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/projects");
      const data = await res.json();
      if (Array.isArray(data)) setProjects(data);
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });

      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        localStorage.setItem("sinchana_admin_auth", "true");
        fetchProjects();
      } else {
        setAuthError(data.error || "Incorrect passcode");
      }
    } catch {
      setAuthError("Authentication server error");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("sinchana_admin_auth");
    setIsAuthenticated(false);
    setPasscode("");
  };

  const startNewProject = () => {
    setEditingProject({
      id: `proj-${Date.now()}`,
      t: "New Project",
      s: "Short institutional subtitle",
      d: "A comprehensive description of what you designed, architected, and deployed.",
      tech: ["React", "TypeScript", "Tailwind CSS"],
      m: [
        ["1", "primary feature"],
        ["100%", "test coverage"],
        ["0", "latency overhead"],
      ],
      radar: false,
      radarData: [0.75, 0.65, 0.8, 0.6, 0.7, 0.65],
      demo: "https://example.com",
      repo: "https://github.com/sinchanasn",
    });
    setIsCreatingProject(true);
  };

  const toggleTech = (t: string) => {
    if (!editingProject) return;
    const exists = editingProject.tech.includes(t);
    const updated = exists
      ? editingProject.tech.filter((x) => x !== t)
      : [...editingProject.tech, t];
    setEditingProject({ ...editingProject, tech: updated });
  };

  const saveProject = async () => {
    if (!editingProject || !editingProject.t) return;
    setIsLoading(true);

    try {
      const method = isCreatingProject ? "POST" : "PUT";
      const res = await fetch("/api/projects", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingProject),
      });

      if (res.ok) {
        setSaveMessage("Project saved successfully!");
        setEditingProject(null);
        setIsCreatingProject(false);
        fetchProjects();
        setTimeout(() => setSaveMessage(""), 3000);
      }
    } catch {
      setSaveMessage("Failed to save project.");
    } finally {
      setIsLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    setIsLoading(true);

    try {
      const res = await fetch(`/api/projects?id=${id}`, { method: "DELETE" });
      if (res.ok) {
        fetchProjects();
      }
    } catch {
      // ignore
    } finally {
      setIsLoading(false);
    }
  };

  // Login view
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#160000] text-[#F1E7DF] flex items-center justify-center p-5 font-sans">
        <div className="w-full max-w-md border border-[rgba(241,231,223,0.22)] bg-[#1e0505] p-8 rounded-2xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-full border border-acc bg-acc/10 flex items-center justify-center mx-auto text-acc">
              <Lock className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-display font-extrabold tracking-tight">
              Sinchana Studio
            </h1>
            <p className="text-xs text-dim">
              Enter passcode to manage your projects and live content.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono uppercase tracking-wider text-dim block">
                Passcode / PIN:
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="e.g. sinchana2026"
                  required
                  autoFocus
                  className="w-full pl-10 pr-4 py-2.5 bg-[#160000] border border-[rgba(241,231,223,0.25)] rounded-full text-sm text-[#F1E7DF] outline-none focus:border-acc font-mono"
                />
                <KeyRound className="w-4 h-4 text-dim absolute left-3.5 top-3.5" />
              </div>
            </div>

            {authError && (
              <div className="p-3 bg-red-950/60 border border-red-500/50 rounded-lg text-xs font-mono text-red-300 text-center">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full py-2.5 bg-acc hover:opacity-90 text-[#160000] rounded-full font-semibold text-sm transition-opacity"
            >
              Unlock Studio
            </button>
          </form>

          <div className="pt-2 text-center">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-dim hover:text-fg font-mono transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Portfolio</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Dashboard view
  return (
    <div className="min-h-screen bg-[#160000] text-[#F1E7DF] flex flex-col font-sans">
      <header className="sticky top-0 z-30 border-b border-line bg-[#160000]/90 backdrop-blur px-5 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-1.5 hover:text-acc border border-line rounded-full transition-colors"
            title="Return to site"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="font-display font-extrabold text-lg tracking-tight">
              Sinchana Studio CMS
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {saveMessage && (
            <span className="text-xs font-mono text-acc bg-acc/10 border border-acc/30 px-3 py-1 rounded-full flex items-center gap-1">
              <Check className="w-3.5 h-3.5" />
              {saveMessage}
            </span>
          )}

          <button
            onClick={fetchProjects}
            title="Refresh projects"
            className="p-2 border border-line hover:border-acc rounded-full text-dim hover:text-acc transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
          </button>

          <button
            onClick={handleLogout}
            className="px-3 py-1 border border-line hover:border-red-400 text-dim hover:text-red-400 rounded-full text-xs font-mono transition-colors flex items-center gap-1.5"
          >
            <LogOut className="w-3 h-3" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto w-full p-5 sm:p-8 space-y-8 flex-1">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div>
            <h2 className="font-display text-2xl font-extrabold tracking-tight">
              Projects Management
            </h2>
            <p className="text-xs text-dim mt-1">
              Live updates to your expandable Work row items, metrics, and radar charts.
            </p>
          </div>

          <button
            onClick={startNewProject}
            className="px-5 py-2.5 bg-acc hover:opacity-90 text-[#160000] rounded-full font-semibold text-xs sm:text-sm transition-opacity flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>Add Project</span>
          </button>
        </div>

        {/* Project Editor Form with Live Radar Preview */}
        {editingProject && (
          <div className="border border-line bg-[#1e0505] p-6 rounded-2xl space-y-6 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-line pb-3">
              <h3 className="font-display text-lg font-extrabold text-acc">
                {isCreatingProject ? "Add New Project" : `Edit: ${editingProject.t}`}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="text-xs font-mono text-dim hover:text-fg"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Form inputs */}
              <div className="lg:col-span-7 space-y-4 text-xs font-sans">
                <div className="space-y-1">
                  <label className="font-mono text-dim block uppercase">Title:</label>
                  <input
                    type="text"
                    value={editingProject.t}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, t: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#160000] border border-line rounded-xl font-display font-bold text-base outline-none focus:border-acc"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-dim block uppercase">Subtitle:</label>
                  <input
                    type="text"
                    value={editingProject.s}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, s: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#160000] border border-line rounded-xl text-xs outline-none focus:border-acc"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-mono text-dim block uppercase">Description:</label>
                  <textarea
                    rows={3}
                    value={editingProject.d}
                    onChange={(e) =>
                      setEditingProject({ ...editingProject, d: e.target.value })
                    }
                    className="w-full p-2.5 bg-[#160000] border border-line rounded-xl text-xs leading-relaxed outline-none focus:border-acc resize-none"
                  />
                </div>

                {/* Tech Pills */}
                <div className="space-y-1.5">
                  <label className="font-mono text-dim block uppercase">
                    Technologies (Click to Toggle):
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {PRESET_TECH.map((t) => {
                      const active = editingProject.tech.includes(t);
                      return (
                        <button
                          key={t}
                          type="button"
                          onClick={() => toggleTech(t)}
                          className={`rounded-full border px-3 py-1 font-mono text-xs transition-colors ${
                            active
                              ? "border-acc bg-acc text-[#160000] font-semibold"
                              : "border-line text-dim hover:border-acc hover:text-fg"
                          }`}
                        >
                          {active ? `✓ ${t}` : `+ ${t}`}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Radar Chart Toggle */}
                <div className="pt-2 border-t border-line flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={!!editingProject.radar}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, radar: e.target.checked })
                      }
                      className="accent-[#FF5A3C] w-4 h-4 cursor-pointer"
                    />
                    <span className="font-mono text-xs text-dim">
                      Enable 6-Axis Risk Radar Visualization
                    </span>
                  </label>
                </div>

                {/* Links */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  <div className="space-y-1">
                    <label className="font-mono text-dim block uppercase">Live Demo URL:</label>
                    <input
                      type="url"
                      value={editingProject.demo || ""}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, demo: e.target.value })
                      }
                      className="w-full p-2 bg-[#160000] border border-line rounded-xl font-mono text-xs outline-none focus:border-acc"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="font-mono text-dim block uppercase">GitHub Repo URL:</label>
                    <input
                      type="url"
                      value={editingProject.repo || ""}
                      onChange={(e) =>
                        setEditingProject({ ...editingProject, repo: e.target.value })
                      }
                      className="w-full p-2 bg-[#160000] border border-line rounded-xl font-mono text-xs outline-none focus:border-acc"
                    />
                  </div>
                </div>

                {/* Save button */}
                <div className="pt-3 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={saveProject}
                    className="px-6 py-2.5 bg-acc hover:opacity-90 text-[#160000] rounded-full font-semibold text-xs transition-opacity flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Project</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    className="px-4 py-2.5 border border-line hover:border-fg rounded-full text-dim hover:text-fg text-xs transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              {/* Right: Live Preview */}
              <div className="lg:col-span-5 space-y-4 border border-line p-5 rounded-xl bg-[#160000]">
                <div className="flex items-center gap-2 text-xs font-mono text-dim">
                  <Eye className="w-4 h-4 text-acc" />
                  <span>Interactive Row Preview:</span>
                </div>

                <div className="space-y-3">
                  <h4 className="font-display text-3xl font-extrabold text-acc tracking-tight">
                    {editingProject.t || "Project Title"}
                  </h4>
                  <p className="text-xs text-dim font-medium">
                    {editingProject.s || "Subtitle..."}
                  </p>
                  <p className="text-sm text-fg/90 leading-relaxed">
                    {editingProject.d || "Description..."}
                  </p>

                  <ul className="flex flex-wrap gap-1.5 pt-1">
                    {editingProject.tech.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[11px] text-dim"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  {editingProject.radar && (
                    <div className="pt-3 border-t border-line">
                      <Radar data={editingProject.radarData} />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* List of Projects */}
        <div className="space-y-3">
          {projects.map((proj, idx) => (
            <div
              key={proj.id || proj.t}
              className="border border-line hover:border-acc/60 bg-[#1e0505]/40 p-5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-colors"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-dim">#{String(idx + 1).padStart(2, "0")}</span>
                  <h4 className="font-display text-xl font-extrabold text-fg">{proj.t}</h4>
                  {proj.radar && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono border border-acc/40 bg-acc/10 text-acc">
                      Radar
                    </span>
                  )}
                </div>
                <p className="text-xs text-dim max-w-xl">{proj.s}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {proj.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 font-mono text-[10px] text-dim border border-line/40 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => {
                    setEditingProject(proj);
                    setIsCreatingProject(false);
                  }}
                  className="px-3 py-1.5 border border-line hover:border-acc text-dim hover:text-acc rounded-full text-xs font-mono transition-colors flex items-center gap-1"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Edit</span>
                </button>

                <button
                  onClick={() => deleteProject(proj.id)}
                  className="p-1.5 text-dim hover:text-red-400 rounded-full transition-colors"
                  title="Delete project"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
