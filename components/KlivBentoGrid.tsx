"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Heart, Shield, Sparkles } from "lucide-react";
import Image from "next/image";

// Young Leadership Animation
function YoungLeadership() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const members = [
    { id: 1, label: "Styrelse" },
    { id: 2, label: "Ledare" },
    { id: 3, label: "Ungdomar" }
  ];

  return (
    <div className="flex items-center justify-center h-full gap-3">
      {members.map((member, idx) => (
        <motion.div
          key={member.id}
          className={`flex flex-col items-center gap-2 ${
            idx === active ? "opacity-100" : "opacity-40"
          }`}
          animate={{ 
            scale: idx === active ? 1.1 : 1,
            opacity: idx === active ? 1 : 0.4
          }}
          transition={{ duration: 0.5 }}
        >
          <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
            idx === active ? "bg-kliv-red/20 border-2 border-kliv-red" : "bg-white/10 border border-white/20"
          }`}>
            <Users className={`w-8 h-8 ${idx === active ? "text-kliv-red" : "text-white/60"}`} />
          </div>
          <span className={`text-xs font-medium ${idx === active ? "text-white" : "text-white/60"}`}>
            {member.label}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// Sports Discovery Animation
function SportsDiscovery() {
  const [discovered, setDiscovered] = useState([false, false, false, false]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDiscovered(prev => {
        const nextIndex = prev.findIndex(d => !d);
        if (nextIndex === -1) {
          return [false, false, false, false];
        }
        return prev.map((d, i) => i === nextIndex ? true : d);
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  const sports = ["🏀", "🤸", "🥋"];

  return (
    <div className="flex items-center justify-center h-full">
      <div className="grid grid-cols-3 gap-2">
        {sports.map((sport, idx) => (
          <motion.div
            key={idx}
            className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${
              discovered[idx] ? "bg-kliv-red/20 border-2 border-kliv-red" : "bg-white/10 border border-white/20"
            }`}
            animate={{ 
              scale: discovered[idx] ? 1.1 : 1,
              rotateY: discovered[idx] ? 360 : 0
            }}
            transition={{ duration: 0.6 }}
          >
            {sport}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// Safe Space Pulse
function SafeSpace() {
  const [pulses] = useState([0, 1, 2]);

  return (
    <div className="flex items-center justify-center h-full relative">
      <Shield className="w-16 h-16 text-kliv-red z-10" />
      {pulses.map((pulse) => (
        <motion.div
          key={pulse}
          className="absolute w-16 h-16 border-2 border-kliv-red/40 rounded-full"
          initial={{ scale: 0.8, opacity: 1 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 2.5,
            repeat: Infinity,
            delay: pulse * 0.8,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
}

// Spontaneous Sports Animation
function SpontaneousSports() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newParticle = {
        id: Date.now(),
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50
      };
      setParticles(prev => [...prev.slice(-5), newParticle]);
    }, 600);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center h-full relative overflow-hidden">
      <Sparkles className="w-12 h-12 text-kliv-red z-10" />
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 bg-kliv-red rounded-full"
          initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
          animate={{ 
            scale: [0, 1, 0],
            x: particle.x,
            y: particle.y,
            opacity: [1, 1, 0]
          }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        />
      ))}
    </div>
  );
}

export function KlivBentoGrid() {
  return (
    <section className="py-16 md:py-24 bg-background relative">
      {/* Red accent gradient backgrounds */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-linear-to-br from-kliv-red/10 to-transparent blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-linear-to-tl from-kliv-red/10 to-transparent blur-3xl"></div>
      
      <div className="container mx-auto px-2 sm:px-4 relative z-10">
        <div className="text-center mb-10 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-foreground">Vår Vision</h2>
          {/* Red accent line under title */}
          <div className="w-24 h-1 bg-linear-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-4 auto-rows-[200px] max-w-7xl mx-auto">
          
          {/* 1. Young Leadership - Tall (2x2) */}
          <motion.div
            className="md:col-span-2 md:row-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col hover:border-kliv-red/50 transition-all duration-300 cursor-pointer overflow-hidden group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02, backgroundColor: "rgba(39, 39, 42, 1)" }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/sportstruck-06-25-25/Landscape/DSC00562.webp"
                alt="Background"
                fill
                className="object-cover opacity-30 group-hover:opacity-40 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-zinc-900/70"></div>
            </div>
            <div className="absolute inset-0 bg-linear-to-br from-kliv-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex-1 relative z-10">
              <YoungLeadership />
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="font-serif text-xl text-white font-medium mb-2">Styrs av unga för unga</h3>
              <p className="text-gray-400 text-sm">Kliv har till skillnad från traditionella föreningar en ung styrelse som leder föreningens arbete med den unga målgruppen.</p>
            </div>
          </motion.div>

          {/* 2. Sports Discovery - Standard (2x1) */}
          <motion.div
            className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col hover:border-kliv-red/50 transition-all duration-300 cursor-pointer overflow-hidden group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 0.98 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/judo/judo3.webp"
                alt="Background"
                fill
                className="object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-300"
              />
              {/* Base darken */}
              <div className="absolute inset-0 bg-zinc-900/80"></div>
              {/* Focused gradient to lift text */}
              <div className="absolute inset-0 bg-linear-to-b from-zinc-900/0 via-zinc-900/75 to-zinc-950/85" />
            </div>
            <div className="absolute inset-0 bg-linear-to-br from-kliv-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex-1 relative z-10">
              <SportsDiscovery />
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="font-serif text-xl text-white font-medium mb-2">Hjälper barn hitta sin idrott</h3>
              <p className="text-gray-400 text-sm">Kostnadsfria lovaktiviteter där barn kan prova på nya idrotter.</p>
            </div>
          </motion.div>

          {/* 3. Activity Image - Tall (2x3 to fill right column) */}
          <motion.div
            className="md:col-span-2 md:row-span-3 bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-kliv-red/50 transition-all duration-300 cursor-pointer group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="relative h-full w-full">
              <Image
                src="/images/sportstruck-06-25-25/Landscape/DSC00706.webp"
                alt="Barn som spelar fotboll under Kliv lovaktivitet"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-zinc-900/70"></div>
              <div className="absolute inset-0 bg-linear-to-b from-zinc-900/0 via-zinc-900/70 to-zinc-950/85"></div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
              <h3 className="font-serif text-xl text-white font-medium mb-2">Trygga & kostnadsfria aktiviteter</h3>
              <p className="text-gray-300 text-sm">Våra kostnadsfria lovverksamheter fungerar även som en trygg plats för barn i området att vända sig till under loven. Lovaktiviteterna är alltid kravlösa, kostnadsfria och bemannade med utbildade idrottsledare.</p>
            </div>
          </motion.div>

          {/* 4. Safe Space - Standard (2x1) */}
          <motion.div
            className="md:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex flex-col hover:border-kliv-red/50 transition-all duration-300 cursor-pointer overflow-hidden group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            whileHover={{ scale: 0.98 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/sportstruck-06-25-25/Landscape/DSC00488.webp"
                alt="Background"
                fill
                className="object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-zinc-900/75"></div>
            </div>
            <div className="absolute inset-0 bg-linear-to-br from-kliv-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="flex-1 relative z-10">
              <SafeSpace />
            </div>
            <div className="mt-4 relative z-10">
              <h3 className="font-serif text-xl text-white font-medium mb-2 flex items-center gap-2">
                <Heart className="w-5 h-5 text-kliv-red" />
                En trygg plats
              </h3>
              <p className="text-gray-400 text-sm">En säker miljö för barn att vända sig till under loven.</p>
            </div>
          </motion.div>

          {/* 5. Spontaneous Sports - Wide (4x1) */}
          <motion.div
            className="md:col-span-4 bg-zinc-900 border border-zinc-800 rounded-xl p-6 flex items-center gap-6 hover:border-kliv-red/50 transition-all duration-300 cursor-pointer overflow-hidden group relative"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            whileHover={{ scale: 0.98 }}
          >
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src="/images/sportstruck-06-25-25/Landscape/DSC00601.webp"
                alt="Background"
                fill
                className="object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-zinc-900/75"></div>
            </div>
            <div className="absolute inset-0 bg-linear-to-br from-kliv-red/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <div className="shrink-0 w-24 h-24 relative z-10">
              <SpontaneousSports />
            </div>
            <div className="flex-1 relative z-10">
              <h3 className="font-serif text-xl text-white font-medium mb-2">Spontanidrott</h3>
              <p className="text-gray-400 text-sm">I nuläget väljer många barn och ungdomar att tidigt lämna idrotten på grund av krav som ställs av den traditionella förenings strukturen. På Kliv strävar vi efter att erbjuda spontanidrott för ungdomar - utan krav som träningsnärvaro och matcher under helger</p>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
