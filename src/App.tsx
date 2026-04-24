/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Activity, 
  Users, 
  Database, 
  ChevronRight, 
  RefreshCcw, 
  MapPin, 
  Award, 
  Info,
  Globe,
  HeartPulse,
  BookOpen,
  Briefcase
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Radar, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis 
} from 'recharts';
import { questions, Question } from './data/questions';

// Constants for rarity calculation
const WORLD_POPULATION = 8000000000;

export default function App() {
  const [step, setStep] = useState<'intro' | 'quiz' | 'results'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [transitionDirection, setTransitionDirection] = useState(1);

  const currentQuestion = questions[currentQuestionIndex];

  // Calculate scores using a Cumulative Reduction Model (Funnel)
  const stats = useMemo(() => {
    const answeredEntries = Object.entries(answers);
    const totalQuestions = answeredEntries.length;
    
    if (totalQuestions === 0) return { rarity: 100, prevRarity: 100, vital: 100, social: 100, material: 100 };

    let categories = { Vital: [] as number[], Social: [] as number[], Material: [] as number[] };
    let factors: number[] = [];

    answeredEntries.forEach(([qid, percentage]) => {
      const q = questions.find(q => q.id === qid);
      if (q) {
        categories[q.category as keyof typeof categories].push(percentage as number);
        factors.push(percentage / 100);
      }
    });

    const alpha = 0.20;
    
    const calculateRarity = (f: number[]) => {
      if (f.length === 0) return 100;
      let prob = f[0];
      for (let i = 1; i < f.length; i++) {
        prob *= Math.pow(f[i], alpha);
      }
      return Math.max(prob * 100, 0.0000001);
    };

    const finalRarity = calculateRarity(factors);
    const prevRarity = calculateRarity(factors.slice(0, -1));

    const getCatAvg = (arr: number[]) => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 100;

    return {
      rarity: finalRarity,
      prevRarity: prevRarity,
      vital: getCatAvg(categories.Vital),
      social: getCatAvg(categories.Social),
      material: getCatAvg(categories.Material)
    };
  }, [answers]);

  // History for the chart (Population decay)
  const [history, setHistory] = useState<{ name: string; score: number }[]>([]);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      setHistory(prev => [...prev, { name: `Q${Object.keys(answers).length}`, score: stats.rarity }]);
    }
  }, [stats.rarity, answers]);

  const handleAnswer = (percentage: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: percentage }));
    if (currentQuestionIndex < questions.length - 1) {
      setTransitionDirection(1);
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setStep('results');
    }
  };

  const reset = () => {
    setStep('intro');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setHistory([]);
  };

  const formatPopulation = (percentage: number) => {
    const count = (percentage / 100) * WORLD_POPULATION;
    if (count >= 1000000000) return `${(count / 1000000000).toFixed(2)} Mrd`;
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)} M`;
    if (count < 10) return Math.max(Math.round(count), 1).toLocaleString();
    return Math.round(count).toLocaleString();
  };

  const radarData = [
    { subject: 'Vital', value: 100 - stats.vital, fullMark: 100 },
    { subject: 'Social', value: 100 - stats.social, fullMark: 100 },
    { subject: 'Matériel', value: 100 - stats.material, fullMark: 100 },
  ];

  const peopleExcluded = useMemo(() => {
    const prevPop = (stats.prevRarity / 100) * WORLD_POPULATION;
    const currentPop = (stats.rarity / 100) * WORLD_POPULATION;
    return Math.max(Math.round(prevPop - currentPop), 0);
  }, [stats.rarity, stats.prevRarity]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans p-4 md:p-8 flex flex-col gap-6">
      <header className="flex justify-between items-end border-b border-slate-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white flex items-center gap-3">
            <Database className="w-8 h-8 text-cyan-400" />
            Human Rarity Index <span className="text-cyan-400 text-sm font-mono mt-2 transition-pulse animate-pulse">v1.3</span>
          </h1>
          <p className="text-slate-400 text-xs mt-1 uppercase tracking-widest font-semibold font-mono">
            Analyse Multidimensionnelle (Données ONU / Banque Mondiale)
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <div className="text-[10px] text-slate-500 font-mono tracking-tighter">POPULATION ESTIMÉE : 8,081,311,447</div>
          <div className="text-[10px] text-slate-500 font-mono tracking-tighter">DERNIÈRE MAJ : {new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }).toUpperCase()}</div>
        </div>
      </header>

      {step === 'intro' ? (
        <main className="flex-grow flex items-center justify-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl text-center flex flex-col items-center gap-8"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 text-cyan-400 rounded-full text-[10px] font-bold uppercase tracking-widest border border-cyan-500/20">
              <Globe className="w-3 h-3" />
              <span>Project Alpha: Global Statistical Mapping</span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black leading-none uppercase italic tracking-tighter text-white">
              Saisissez votre <span className="text-cyan-400">unicité</span>.
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed max-w-xl">
              Comparez votre existence aux 8 milliards de trajectoires humaines à travers une série de filtres critiques. 
              Une immersion statistique anonyme.
            </p>
            <button 
              onClick={() => setStep('quiz')}
              className="px-12 py-5 bg-white text-black text-xs font-bold uppercase tracking-[0.3em] hover:bg-cyan-400 transition-colors group flex items-center gap-4 rounded-sm shadow-2xl"
            >
              Initialiser l'analyse
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </main>
      ) : (
        <main className="grid grid-cols-1 md:grid-cols-12 auto-rows-min gap-4 flex-grow">
          {/* Main Module (Question or Summary) */}
          <div className="col-span-12 lg:col-span-7 lg:row-span-3 bg-slate-900/50 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden backdrop-blur-sm shadow-xl min-h-[400px]">
            {step === 'quiz' ? (
              <AnimatePresence mode="wait">
                <motion.div 
                  key={currentQuestionIndex}
                  initial={{ opacity: 0, x: 20 * transitionDirection }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 * transitionDirection }}
                  className="flex flex-col h-full"
                >
                  <div>
                    <div className="flex items-center gap-3 mb-8">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        currentQuestion.category === 'Vital' ? 'bg-rose-500/20 text-rose-400' :
                        currentQuestion.category === 'Social' ? 'bg-cyan-500/20 text-cyan-400' :
                        'bg-blue-500/20 text-blue-400'
                      }`}>
                        Dimension {currentQuestion.category}
                      </span>
                      <span className="text-slate-500 font-mono text-xs underline underline-offset-4 decoration-slate-700">
                        Module {currentQuestionIndex + 1} / {questions.length}
                      </span>
                    </div>
                    <h2 className="text-2xl md:text-4xl font-medium leading-tight text-white mb-4">
                      {currentQuestion.text}
                    </h2>
                    {currentQuestion.hint && (
                      <div className="flex items-start gap-2 p-4 bg-slate-950/50 border border-slate-800 rounded-xl text-slate-400 text-xs leading-relaxed italic">
                        <Info className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{currentQuestion.hint}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                    {currentQuestion.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(opt.populationPercentage)}
                        className="py-6 px-8 bg-slate-800/80 hover:bg-white hover:text-black border border-slate-700 rounded-2xl text-left transition-all group relative overflow-hidden active:scale-95 shadow-lg"
                      >
                        <span className="block text-[10px] text-slate-500 mb-2 font-mono group-hover:text-black/50 uppercase tracking-widest">CHOIX 0{i+1}</span>
                        <span className="text-lg font-semibold block">{opt.label}</span>
                        <div className="absolute top-0 right-0 p-2 opacity-0 group-hover:opacity-100 italic font-mono text-[9px] uppercase">
                          {opt.populationPercentage}% de la population
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            ) : (
              <div className="flex flex-col h-full justify-center items-center text-center py-12">
                <Award className="w-16 h-16 text-cyan-400 mb-6" />
                <h2 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Profil Consolidé</h2>
                <p className="text-slate-400 max-w-sm mb-8">
                  Votre configuration de vie a été isolée au sein de la base de données mondiale.
                </p>
                <button 
                  onClick={reset}
                  className="px-8 py-4 border border-slate-700 hover:bg-white hover:text-black transition-all text-xs font-bold uppercase tracking-widest flex items-center gap-3 rounded-xl shadow-lg"
                >
                  <RefreshCcw className="w-4 h-4" />
                  Mise à jour des paramètres
                </button>
              </div>
            )}
          </div>

          {/* Rarity Bento Score */}
          <div className="col-span-12 lg:col-span-5 lg:row-span-4 bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-8 flex flex-col items-center justify-center relative shadow-[0_0_50px_-12px_rgba(99,102,241,0.2)] overflow-hidden">
            <div className="absolute top-6 left-6 text-[10px] font-bold text-indigo-400 uppercase tracking-widest font-mono">
              Population Résiduelle (%)
            </div>
            
            <div className="flex flex-col items-center w-full">
              <motion.div 
                key={stats.rarity}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`${stats.rarity < 0.001 ? 'text-4xl md:text-6xl' : 'text-6xl md:text-8xl'} font-black leading-none text-white tracking-tighter drop-shadow-2xl text-center`}
              >
                {stats.rarity < 0.01 ? stats.rarity.toFixed(5) : stats.rarity.toFixed(2)}<span className="text-2xl md:text-4xl text-indigo-400">%</span>
              </motion.div>
              {Object.keys(answers).length > 0 && (
                <div className="flex flex-col items-center mt-6 w-full">
                  <div className="text-slate-500 text-[10px] uppercase font-mono tracking-widest mb-1 opacity-50">Co-habitants estimés</div>
                  <p className="text-white text-center text-4xl font-bold tracking-tighter">
                    {formatPopulation(stats.rarity)}
                  </p>
                  <div className="mt-4 px-4 py-2 bg-white text-black text-[10px] font-bold uppercase tracking-widest rounded-full shadow-xl">
                    TOP {stats.rarity < 0.01 ? stats.rarity.toFixed(4) : stats.rarity.toFixed(2)}% MONDIAL
                  </div>
                  {peopleExcluded > 0 && step === 'quiz' && (
                    <motion.div 
                      key={peopleExcluded}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 0.6, y: 0 }}
                      className="mt-6 text-rose-400 font-mono text-[9px] uppercase tracking-tighter"
                    >
                      - {peopleExcluded.toLocaleString()} personnes exclues au dernier filtre
                    </motion.div>
                  )}
                </div>
              )}
            </div>

            <div className="mt-12 w-full">
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-500 shadow-[0_0_15px_rgba(99,102,241,0.6)]"
                  initial={{ width: '100%' }}
                  animate={{ width: `${Math.max(stats.rarity, 0.1)}%` }}
                />
              </div>
              <div className="flex justify-between w-full mt-3 text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                <span className="text-indigo-400">Rareté Extrême</span>
                <span>Normalité Statistique</span>
              </div>
            </div>
          </div>


          {/* Categories Bento */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-3 row-span-3 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col justify-between">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
              <Activity className="w-3 h-3" /> Performances Sectorielles
            </h3>
            <div className="space-y-6">
              {[
                { label: 'Vitale', val: stats.vital, color: 'bg-emerald-500', icon: HeartPulse },
                { label: 'Sociale', val: stats.social, color: 'bg-cyan-400', icon: BookOpen },
                { label: 'Matérielle', val: stats.material, color: 'bg-blue-500', icon: Briefcase }
              ].map((c, i) => (
                <div key={i}>
                  <div className="flex justify-between text-[11px] mb-2 items-center">
                    <span className="text-slate-300 italic flex items-center gap-1.5">
                      <c.icon className="w-3 h-3 opacity-50" /> {c.label}
                    </span>
                    <span className="font-mono text-white">{c.val.toFixed(1)}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <motion.div 
                      className={`h-full ${c.color} rounded-full`}
                      initial={{ width: 0 }}
                      animate={{ width: `${c.val}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chart Bento */}
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 row-span-3 bg-slate-900/50 border border-slate-800 rounded-3xl p-6 flex flex-col">
            <div className="flex justify-between items-start mb-6">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-slate-500 italic">Courbe de Décroissance Démographique</h3>
              <span className="text-[9px] bg-slate-800 px-2 py-1 rounded border border-slate-700 font-mono text-indigo-400">REDUCTION LOG</span>
            </div>
            <div className="flex-grow min-h-[120px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={history.length > 0 ? history : [{ name: 'INIT', score: 100 }]}>
                  <XAxis dataKey="name" hide />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px', fontSize: '10px' }}
                    itemStyle={{ color: '#818cf8' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#6366f1" 
                    fill="#6366f1" 
                    fillOpacity={0.1} 
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-[9px] text-slate-500 mt-4 leading-relaxed font-mono uppercase tracking-tighter">
              Axe Y: Log(Population). <br/>
              Axe X: Filtres successifs appliqués.
            </p>
          </div>

          {/* Progress / Meta Bento */}
          <div className="col-span-12 lg:col-span-5 row-span-2 bg-slate-900/80 border border-slate-800 rounded-3xl p-6 flex items-center gap-6">
            <div className="flex-grow">
              <div className="flex justify-between text-[10px] font-mono mb-3 uppercase tracking-widest">
                <span className="text-slate-500 italic">Progression Matrice</span>
                <span className="text-white">{Math.round(((currentQuestionIndex + (step === 'results' ? 1 : 0)) / questions.length) * 100)}%</span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white opacity-20"
                  animate={{ width: `${((currentQuestionIndex + (step === 'results' ? 1 : 0)) / questions.length) * 100}%` }}
                />
              </div>
            </div>
            <div className="w-px h-10 bg-slate-800" />
            <div className="text-right">
              <span className="text-[9px] block text-slate-500 uppercase font-mono mb-1">Status</span>
              <span className="text-lg font-bold font-mono text-cyan-400">
                {step === 'quiz' ? 'ACTIVE' : 'LOCKED'}
              </span>
            </div>
          </div>
        </main>
      )}

      <footer className="flex flex-col sm:flex-row justify-between items-center gap-4 text-slate-600 font-mono text-[9px] uppercase tracking-[0.2em] pt-4">
        <div className="flex gap-6 overflow-hidden max-w-full italic">
          <span>GDPR Compliant: Local Computation Only</span>
          <span className="hidden sm:inline opacity-30">•</span>
          <span className="hidden sm:inline">Engine: deterministic-multichannel-rarity-model</span>
        </div>
        <div className="flex items-center gap-3">
          <MapPin className="w-3 h-3 text-cyan-400" />
          <span>Global Node</span>
        </div>
      </footer>
    </div>
  );
}
