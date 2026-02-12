import React from "react";
import StatsChart from "../components/StatsChart";
import {
  Award,
  Zap,
  Users,
  FolderKanban,
  Calendar
} from "lucide-react";
import { FEATURES } from "../constants";
import CountUp from "react-countup";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

/* ================= DATA ================= */

const memberGrowth = [
  { year: "2022", members: 40 },
  { year: "2023", members: 85 },
  { year: "2024", members: 120 }
];

const projectStats = [
  { year: "2022", projects: 12 },
  { year: "2023", projects: 22 },
  { year: "2024", projects: 35 }
];

/* ================= ANIMATION ================= */

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 }
};

const About: React.FC = () => {
  return (
    <div className="pb-20 bg-white dark:bg-slate-950 transition-colors">

      {/* ================= HERO ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-24 text-center"
      >
        <div className="max-w-7xl mx-auto px-4">

          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full 
          bg-indigo-100 dark:bg-indigo-500/10 
          text-indigo-600 dark:text-indigo-400 
          text-xs font-bold mb-6">
            <Zap className="w-3 h-3" />
            Our Foundation
          </div>

          <h1 className="text-5xl md:text-7xl font-black mb-6 
          bg-gradient-to-r from-indigo-600 to-blue-500 
          bg-clip-text text-transparent">
            About DATUM
          </h1>

          <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            DATUM is a student-driven data science community focused on innovation,
            real-world learning, and building future-ready professionals.
          </p>

        </div>
      </motion.section>

      {/* ================= PREMIUM STATS ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {/* Members */}
          <div className="bg-gradient-to-br from-indigo-600 to-blue-500 
          text-white p-8 rounded-2xl shadow-xl">

            <Users className="mb-3 opacity-80" />
            <h3 className="text-4xl font-black">
              <CountUp end={120} duration={2} />+
            </h3>
            <p className="opacity-90 text-sm">
              Active Members
            </p>

          </div>

          {/* Projects */}
          <div className="bg-slate-900 dark:bg-slate-800 
          text-white p-8 rounded-2xl shadow-xl">

            <FolderKanban className="mb-3 text-indigo-400" />
            <h3 className="text-4xl font-black">
              <CountUp end={35} duration={2} />+
            </h3>
            <p className="text-slate-400 text-sm">
              Live Projects
            </p>

          </div>

          {/* Events */}
          <div className="bg-slate-900 dark:bg-slate-800 
          text-white p-8 rounded-2xl shadow-xl">

            <Calendar className="mb-3 text-indigo-400" />
            <h3 className="text-4xl font-black">
              <CountUp end={15} duration={2} />+
            </h3>
            <p className="text-slate-400 text-sm">
              Events Hosted
            </p>

          </div>

        </div>
      </motion.section>

      {/* ================= MINI DASHBOARD ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 bg-slate-100 dark:bg-slate-900/40"
      >
        <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">

          <StatsChart />

          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 shadow-xl">

            <p className="text-xs uppercase text-slate-400">
              Project Activity
            </p>

            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Live Velocity
            </h3>

            <div className="h-[120px] flex items-center justify-center 
            text-indigo-500 font-semibold">
              System Running Smooth ⚡
            </div>

          </div>

        </div>
      </motion.section>

      {/* ================= ANALYTICS ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 max-w-7xl mx-auto px-4"
      >
        <h2 className="text-3xl font-bold text-center mb-12 text-slate-900 dark:text-white">
          Community Growth Analytics
        </h2>

        <div className="grid md:grid-cols-2 gap-10">

          {/* Members Chart */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">

            <h3 className="font-bold mb-4 text-slate-900 dark:text-white">
              Members Growth
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={memberGrowth}>
                <CartesianGrid strokeDasharray="2 6" opacity={0.2} />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid #6366f1",
                    borderRadius: "10px",
                    color: "#fff"
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="members"
                  stroke="#6366f1"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                  activeDot={{ r: 7 }}
                />
              </LineChart>
            </ResponsiveContainer>

          </div>

          {/* Projects Chart */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-lg">

            <h3 className="font-bold mb-4 text-slate-900 dark:text-white">
              Projects Per Year
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={projectStats}>
                <CartesianGrid strokeDasharray="2 6" opacity={0.2} />
                <XAxis dataKey="year" stroke="#94a3b8" />
                <YAxis stroke="#94a3b8" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#020617",
                    border: "1px solid #6366f1",
                    borderRadius: "10px",
                    color: "#fff"
                  }}
                />
                <Bar
                  dataKey="projects"
                  fill="#6366f1"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>

          </div>

        </div>
      </motion.section>

      {/* ================= WHY DATUM ================= */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 max-w-7xl mx-auto px-4"
      >
        <div className="flex items-center gap-3 mb-10">
          <Award className="text-indigo-500" />
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Why DATUM?
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {FEATURES.map((feature, index) => (
            <div
              key={index}
              className="p-6 bg-white dark:bg-slate-800 rounded-2xl shadow 
              hover:scale-105 transition"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="font-bold mb-2 text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-300 text-sm">
                {feature.description}
              </p>
            </div>
          ))}

        </div>
      </motion.section>

    </div>
  );
};

export default About;
