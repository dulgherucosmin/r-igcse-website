import Image from "next/image";
import { teamRoles } from "@/data/team";

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const initials =
    parts.length > 1 ? [parts[0], parts[parts.length - 1]] : [parts[0]];
  return initials
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
}

function MemberCard({
  name,
  title,
  avatar,
}: {
  name: string;
  title: string;
  avatar?: string;
}) {
  return (
    <div className="flex w-28 flex-col items-center text-center sm:w-32">
      <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border-2 border-red-500 bg-[#141417] sm:h-24 sm:w-24">
        {avatar ? (
          <Image
            src={avatar}
            alt=""
            width={96}
            height={96}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-lg font-bold text-zinc-300 sm:text-xl">
            {getInitials(name)}
          </span>
        )}
      </div>
      <p className="mt-3 text-sm font-semibold sm:text-base">{name}</p>
      <p className="text-xs text-zinc-400 sm:text-sm">{title}</p>
    </div>
  );
}

export default function Team() {
  return (
    <div className="min-h-screen bg-[#121010] px-6 pt-8 pb-20 text-white md:px-16">
      <h1 className="mb-12 text-center text-3xl font-bold underline decoration-red-500 decoration-2 underline-offset-8">
        The Team Behind r/IGCSE
      </h1>

      <div className="mx-auto flex max-w-6xl justify-center flex-col gap-10">
        {teamRoles.map((group) => (
          <section key={group.role} aria-labelledby={`${group.role}-heading`}>
            <h2
              id={`${group.role}-heading`}
              className="mb-2 text-center justify-center text-2xl font-bold sm:text-center"
            >
              {group.role}
            </h2>
            <p
                id={`${group.description}-heading`}
                className="mx-auto mb-6 max-w-xl text-center justify-center italic sm:text-center"
            >
              {group.description}  
            </p>
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-8 sm:justify-center">
              {group.members.map((member) => (
                <MemberCard key={`${group.role}-${member.name}`} {...member} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}