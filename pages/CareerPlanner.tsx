import React, { useState } from "react";
import {
  Sparkles,
  ChevronRight,
  RotateCcw,
  Code2,
  LineChart,
  Database,
  BrainCircuit,
  Trophy,
  BookOpen,
  Zap,
  Target,
  LucideIcon
} from "lucide-react";

interface Question {
  id: number;
  text: string;
  options: { label: string; value: string; icon: LucideIcon }[];
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    text: "What interests you most about data?",
    options: [
      { label: "Finding hidden patterns", value: "analyst", icon: LineChart },
      { label: "Building complex systems", value: "engineer", icon: Database },
      { label: "Teaching computers to think", value: "ml", icon: BrainCircuit },
      { label: "Predicting future trends", value: "scientist", icon: Sparkles }
    ]
  },
  {
    id: 2,
    text: "How comfortable are you with coding?",
    options: [
      { label: "I love it! Code is my language.", value: "engineer", icon: Code2 },
      { label: "I'm decent, but it's a tool.", value: "scientist", icon: Zap },
      { label: "I prefer visual tools or logic.", value: "analyst", icon: Target }
    ]
  },
  {
    id: 3,
    text: "What's your math comfort level?",
    options: [
      { label: "Calculus & Stats are my friends.", value: "scientist", icon: BrainCircuit },
      { label: "I understand the basics well.", value: "analyst", icon: BookOpen },
      { label: "I'd rather avoid heavy theory.", value: "engineer", icon: LineChart }
    ]
  },
  {
    id: 4,
    text: "Pick your ideal work environment.",
    options: [
      { label: "High-growth Tech Startup", value: "engineer", icon: Trophy },
      { label: "Fortune 500 Corporation", value: "analyst", icon: Database },
      { label: "Academic or Research Lab", value: "scientist", icon: BrainCircuit }
    ]
  },
  {
    id: 5,
    text: "Which project sounds most fun?",
    options: [
      { label: "Building a recommendation engine", value: "ml", icon: BrainCircuit },
      { label: "Designing a data warehouse", value: "engineer", icon: Database },
      { label: "Storytelling with visuals", value: "analyst", icon: LineChart },
      { label: "Optimizing business strategy", value: "scientist", icon: Target }
    ]
  }
];

const RESULTS_MAP = {
  ml: {
    role: "Machine Learning Engineer",
    description: "You design and deploy intelligent systems that learn from data.",
    skills: ["Python", "TensorFlow / PyTorch", "Model Deployment", "Linear Algebra"],
    roadmap: ["Master Python", "ML Fundamentals", "Deep Learning", "MLOps & Cloud"]
  },
  engineer: {
    role: "Data Engineer",
    description: "You build scalable pipelines and data infrastructure.",
    skills: ["SQL", "Spark", "Cloud Platforms", "ETL Pipelines"],
    roadmap: ["Advanced SQL", "Distributed Systems", "Data Pipelines", "Cloud Architecture"]
  },
  analyst: {
    role: "Data Analyst",
    description: "You turn raw data into insights and stories.",
    skills: ["SQL", "Power BI / Tableau", "Statistics", "Excel"],
    roadmap: ["Data Cleaning", "Visualization", "Business Analytics", "Storytelling"]
  },
  scientist: {
    role: "Data Scientist",
    description: "You combine math, code, and business to solve complex problems.",
    skills: ["Statistics", "Python / R", "ML Models", "Experiment Design"],
    roadmap: ["Statistics", "Machine Learning", "Advanced Analytics", "Domain Expertise"]
  }
};

const CareerPlanner: React.FC = () => {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const updated = [...answers, value];
    setAnswers(updated);

    if (step < QUESTIONS.length - 1) {
      setStep(step + 1);
    } else {
      setShowResult(true);
    }
  };

  const getResult = () => {
    const score = { ml: 0, engineer: 0, analyst: 0, scientist: 0 };

    answers.forEach(a => {
      if (score[a as keyof typeof score] !== undefined) {
        score[a as keyof typeof score]++;
      }
    });

    return RESULTS_MAP[
      Object.keys(score).reduce((a, b) =>
        score[a as keyof typeof score] > score[b as keyof typeof score] ? a : b
      ) as keyof typeof RESULTS_MAP
    ];
  };

  const reset = () => {
    setStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const result = getResult();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {!showResult ? (
          <div className="space-y-12">
            <div className="text-center">
              <span className="text-xs font-black tracking-widest text-indigo-600">
                STEP {step + 1} OF {QUESTIONS.length}
              </span>
              <h1 className="text-4xl md:text-5xl font-black mt-4">
                {QUESTIONS[step].text}
              </h1>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {QUESTIONS[step].options.map(opt => (
                <button
                  key={opt.value}
                  onClick={() => handleAnswer(opt.value)}
                  className="group relative p-8 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:shadow-2xl transition"
                >
                  <div className="mb-6 w-12 h-12 flex items-center justify-center rounded-2xl bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600">
                    <opt.icon />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-black">{opt.label}</span>
                    <ChevronRight className="opacity-40 group-hover:opacity-100" />
                  </div>
                </button>
              ))}
            </div>

            <div className="h-2 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 transition-all"
                style={{ width: `${((step + 1) / QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        ) : (
          <div className="text-center space-y-10 animate-in fade-in zoom-in-95">
            <BrainCircuit className="mx-auto w-16 h-16 text-indigo-600" />
            <h2 className="text-5xl font-black">{result.role}</h2>
            <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              {result.description}
            </p>

            <div className="grid md:grid-cols-2 gap-8 text-left">
              <div className="p-8 bg-white dark:bg-slate-900 rounded-3xl">
                <h3 className="font-black mb-4">Core Skills</h3>
                <ul className="space-y-2">
                  {result.skills.map((s: string) => (
                    <li key={s}>• {s}</li>
                  ))}
                </ul>
              </div>

              <div className="p-8 bg-indigo-600 text-white rounded-3xl">
                <h3 className="font-black mb-4">Learning Roadmap</h3>
                <ol className="space-y-2">
                  {result.roadmap.map((r: string, i: number) => (
                    <li key={r}>{i + 1}. {r}</li>
                  ))}
                </ol>
              </div>
            </div>

            <button
              onClick={reset}
              className="px-8 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-black flex items-center gap-2 mx-auto"
            >
              <RotateCcw />
              RETAKE QUIZ
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerPlanner;
