'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

interface Member {
  id: number;
  name: string;
  role: string;
  image: string;
  description?: string;
  email?: string;
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] as const
    }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

interface TeamSectionProps {
  members: Member[];
}

export default function TeamSection({ members }: TeamSectionProps) {
  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="mb-4 sm:mb-6">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Vårt Team
            </h2>
            {/* Red accent line under title */}
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-kliv-red to-transparent mx-auto"></div>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Vi är styrelsen för Kliv Idrottsförening. Om du har några frågor eller funderingar är du välkommen att {' '}
            <span className="text-kliv-red font-semibold">kontakta oss</span>!
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6"
        >
          {members.map((member) => (
            <motion.div
              key={member.id}
              variants={fadeInUp}
              className="bg-card rounded-xl overflow-hidden shadow-sm border transition-all duration-300 group md:hover:scale-105 md:hover:shadow-lg md:hover:border-kliv-red/30"
            >
              <div className="aspect-[4/5] bg-muted/40 relative">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 20vw"
                />
              </div>
              <div className="p-4 sm:p-6 text-center">
                <h3 className="text-base sm:text-lg font-semibold mb-1 text-foreground group-hover:text-kliv-red transition-colors">
                  {member.name}
                </h3>
                <span className={`inline-block px-3 py-1 mb-2 rounded-full text-xs sm:text-sm font-semibold ${
                  member.role === 'Ordförande' 
                    ? 'bg-kliv-red/10 text-kliv-red border border-kliv-red/20' 
                    : 'bg-secondary text-secondary-foreground'
                }`}>
                  {member.role}
                </span>
                {member.description && (
                  <p className="text-muted-foreground mb-2 text-xs sm:text-sm">{member.description}</p>
                )}
                {member.email && (
                  <Link
                    href={`mailto:${member.email}`}
                    className="inline-block mt-1 text-sm text-kliv-red hover:text-kliv-red-light transition-colors focus-visible:ring-2 focus-visible:ring-kliv-red focus-visible:ring-offset-2 rounded px-2 py-1 hover:bg-kliv-red/5"
                    aria-label={`Email ${member.name}`}
                  >
                    {member.email}
                  </Link>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}