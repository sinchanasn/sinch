import { NextResponse } from "next/server";
import { getProjects, saveProjects } from "@/lib/data";
import { Project } from "@/types/portfolio";
import { revalidatePath } from "next/cache";

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(req: Request) {
  try {
    const newProject: Project = await req.json();
    if (!newProject.t) {
      return NextResponse.json({ error: "Title (t) is required" }, { status: 400 });
    }

    const projects = await getProjects();
    const id = newProject.id || newProject.t.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const projectWithId: Project = { ...newProject, id };

    const updated = [projectWithId, ...projects];
    await saveProjects(updated);
    revalidatePath("/");

    return NextResponse.json({ success: true, project: projectWithId });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to create project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    const updatedProject: Project = await req.json();
    if (!updatedProject.id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const projects = await getProjects();
    const index = projects.findIndex((p) => p.id === updatedProject.id);

    if (index === -1) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    projects[index] = updatedProject;
    await saveProjects(projects);
    revalidatePath("/");

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to update project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Project ID is required" }, { status: 400 });
    }

    const projects = await getProjects();
    const filtered = projects.filter((p) => p.id !== id);
    await saveProjects(filtered);
    revalidatePath("/");

    return NextResponse.json({ success: true, deletedId: id });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Failed to delete project";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
