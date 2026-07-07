export interface Work {
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  tags: string[];
  year: string;
  embedUrl?: string;
}

export const works: Work[] = [
  {
    title: "Beeyond",
    slug: "beeyond",
    description:
      "A comprehensive brand identity and digital experience design for a next-generation travel agency, blending modern booking utility with an inspiring, visual-first narrative.",
    imageUrl: "/beeyond.png",
    tags: ["Branding", "Travel", "UI/UX"],
    year: "2025",
    embedUrl: "https://www.behance.net/embed/project/252113369?ilo0=1",
  },
  {
    title: "Uri",
    slug: "uri",
    description:
      "An interactive language learning application powered by generative AI, designed with a fluid interface that adapts dynamically to users' pronunciation and speed.",
    imageUrl: "/uri.png",
    tags: ["Product Design", "AI UX", "Mobile"],
    year: "2025",
    embedUrl: "https://www.behance.net/embed/project/251734227?ilo0=1",
  },
  {
    title: "Nook",
    slug: "nook",
    description:
      "A warm and tactile brand design for Nook, a specialty coffee brand focusing on local sourcing and community space, bringing a clean editorial style to the packaging and physical shop.",
    imageUrl: "/nook.png",
    tags: ["Brand Identity", "Packaging", "Coffee"],
    year: "2024",
    embedUrl: "https://www.behance.net/embed/project/251622009?ilo0=1",
  },
];
