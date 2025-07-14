// components/project/ProjectCard.tsx
import Link from "next/link";

interface ProjectCardProps {
  id: string;
  title: string;
  createdAt: string;
}

export default function ProjectCard({ id, title, createdAt }: ProjectCardProps) {
  return (
    <Link href={`/project/${id}`}>
      <div className="p-4 rounded-xl border shadow-sm hover:shadow-md transition bg-white">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-sm text-muted-foreground">Created {createdAt}</p>
      </div>
    </Link>
  );
}
