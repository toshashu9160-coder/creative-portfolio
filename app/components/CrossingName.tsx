"use client";

const ROLES = [
  "Graphic Designer",
  "UI/UX Designer",
  "Video Editor",
  "Motion Designer",
  "Brand Strategist",
  "Creative Director",
];

function RoleItems({ roles }: { roles: string[] }) {
  return (
    <>
      {roles.map((role, i) => (
        <span key={i}>
          <span className="role-item" data-cursor-hover>
            {role}
          </span>
          <span className="role-separator">◆</span>
        </span>
      ))}
    </>
  );
}

export default function CrossingName() {
  return (
    <section className="roles-marquee-section" aria-label="Roles marquee">
      {/* Row 1 — Left to Right */}
      <div className="roles-marquee-row">
        <div className="roles-marquee-track">
          <RoleItems roles={ROLES} />
          <RoleItems roles={ROLES} />
        </div>
      </div>

      {/* Row 2 — Right to Left (reversed order for visual variety) */}
      <div className="roles-marquee-row">
        <div className="roles-marquee-track-reverse">
          <RoleItems roles={[...ROLES].reverse()} />
          <RoleItems roles={[...ROLES].reverse()} />
        </div>
      </div>
    </section>
  );
}
