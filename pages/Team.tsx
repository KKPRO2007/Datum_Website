import React, { useState, useEffect } from "react";
import { Linkedin, Github, Users, Search, X } from "lucide-react";
import { TEAM_MEMBERS } from "../constants";
import { motion } from "framer-motion";

/* ================= TYPES ================= */

interface Member {
  id: number;
  name: string;
  role: string;
  bio: string;
  photoUrl: string;
  skills: string[];
  linkedin: string;
  github: string;
}

/* ================= ANIMATIONS ================= */

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12 }
  }
};

const cardAnim = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 }
};

const Team: React.FC = () => {

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);

  const roles = ["All", "Technical", "Research", "Community"];

  /* ================= FILTER LOGIC ================= */

  const filteredMembers = TEAM_MEMBERS.filter((member: Member) => {
    const matchesSearch = member.name.toLowerCase().includes(search.toLowerCase());
    const matchesFilter =
      filter === "All" || member.role.toLowerCase().includes(filter.toLowerCase());

    return matchesSearch && matchesFilter;
  });

  /* ================= ESC KEY CLOSE ================= */

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelectedMember(null);
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* ================= BODY SCROLL LOCK ================= */

  useEffect(() => {
    document.body.style.overflow = selectedMember ? "hidden" : "auto";
  }, [selectedMember]);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors">

      {/* ================= HEADER ================= */}
      <section className="py-20 text-center border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
            bg-indigo-100 dark:bg-indigo-500/10 
            text-indigo-600 dark:text-indigo-400 
            text-xs font-bold mb-4">
            <Users className="w-3 h-3" />
            Core Collective
          </div>

          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-3">
            Meet The DATUM Team
          </h1>

          <p className="text-slate-600 dark:text-slate-300">
            Builders behind DATUM innovation.
          </p>

        </div>
      </section>

      {/* ================= SEARCH + FILTER ================= */}
      <section className="py-8 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 flex flex-col gap-4">

          {/* Search */}
          <div className="flex items-center bg-white dark:bg-slate-800 px-4 py-3 rounded-xl shadow border">
            <Search className="w-4 h-4 text-slate-400 mr-2" />
            <input
              placeholder="Search member..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>

          {/* Filters */}
          <div className="flex gap-2 flex-wrap justify-center">
            {roles.map(role => (
              <button
                key={role}
                onClick={() => setFilter(role)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition
                ${filter === role
                  ? "bg-indigo-600 text-white"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                }`}
              >
                {role}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* ================= TEAM GRID ================= */}
      <motion.section
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-16 bg-slate-50 dark:bg-slate-900"
      >
        <div className="max-w-7xl mx-auto px-4 
          grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 
          gap-6 md:gap-10">

          {filteredMembers.map((member: Member) => (

            <motion.div
              key={member.id}
              variants={cardAnim}
              className="flip-card perspective gradient-border tilt cursor-pointer"
              onClick={(e) => {

                // Mobile tap flip logic
                if (window.matchMedia("(hover: none)").matches) {

                  // First tap -> flip
                  if (!e.currentTarget.classList.contains("active")) {
                    e.currentTarget.classList.add("active");
                    return;
                  }

                  // Second tap -> open modal
                  setSelectedMember(member);
                }

              }}
            >

              <div className="flip-inner relative h-[420px]">

                {/* ================= FRONT ================= */}
                <div className="flip-front absolute inset-0 
                  bg-white dark:bg-slate-800 
                  rounded-3xl shadow-lg p-5 
                  text-center flex flex-col items-center">

                  <img
                    src={member.photoUrl}
                    alt={member.name}
                    className="w-24 h-24 rounded-xl object-cover shadow mb-3"
                  />

                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                    {member.name}
                  </h3>

                  <p className="text-indigo-600 dark:text-indigo-400 text-xs mb-2">
                    {member.role}
                  </p>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3">
                    {member.bio}
                  </p>

                  <span className="text-[11px] mt-auto text-slate-500">
                    Hover to flip • Tap on mobile
                  </span>

                </div>

                {/* ================= BACK ================= */}
                <div className="flip-back absolute inset-0 
                  bg-indigo-600 dark:bg-indigo-500 
                  text-white rounded-3xl shadow-lg p-5 
                  flex flex-col justify-center text-center">

                  <h3 className="font-bold mb-3 text-sm">
                    Skills
                  </h3>

                  <div className="flex flex-wrap justify-center gap-2">
                    {member.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="bg-white/20 px-3 py-1 rounded-full text-[11px]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Social Buttons */}
                  <div className="flex justify-center gap-4 mt-5">

                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-white/20 rounded-full active:scale-95"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>

                    <a
                      href={member.github}
                      target="_blank"
                      rel="noreferrer"
                      className="p-3 bg-white/20 rounded-full active:scale-95"
                    >
                      <Github className="w-4 h-4" />
                    </a>

                  </div>

                </div>

              </div>

            </motion.div>

          ))}

        </div>
      </motion.section>

      {/* ================= MODAL ================= */}
      {selectedMember && (

        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 w-full max-w-sm relative">

            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-3 right-3"
            >
              <X />
            </button>

            <img
              src={selectedMember.photoUrl}
              className="w-24 h-24 rounded-xl mx-auto mb-4"
            />

            <h3 className="text-center font-bold text-lg">
              {selectedMember.name}
            </h3>

            <p className="text-center text-indigo-600 mb-2">
              {selectedMember.role}
            </p>

            <p className="text-sm text-center">
              {selectedMember.bio}
            </p>

          </div>

        </div>
      )}

    </div>
  );
};

export default Team;
