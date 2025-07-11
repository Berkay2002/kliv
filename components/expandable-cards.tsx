"use client";

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

interface Card {
  description: string;
  title: string;
  src: string;
  ctaText: string;
  ctaLink: string;
  content: () => React.ReactNode;
}

const seasonalActivities: Card[] = [
  {
    description: "Februari",
    title: "Sportlovskul",
    src: "/images/sportstruck-06-25-25/Landscape/DSC00446.webp",
    ctaText: "Läs mer",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Under sportlovet erbjuder vi roliga och engagerande aktiviteter för barn och ungdomar. 
          Våra ledarledda program inkluderar olika idrotter och lekar som hjälper barn att hålla sig aktiva 
          under skollovet. <br /> <br /> 
          Alla aktiviteter är kostnadsfria och öppna för alla barn i området. Vi fokuserar på gemenskap, 
          fair play och att skapa positiva upplevelser som inspirerar till fortsatt idrottande.
        </p>
      );
    },
  },
  {
    description: "Mars-April",
    title: "Påsklovskul",
    src: "/images/sportstruck-06-25-25/Landscape/DSC00585.webp",
    ctaText: "Läs mer",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Påsklovet blir extra roligt med våra specialdesignade aktiviteter! Vi arrangerar äventyr och 
          idrottsaktiviteter som passar alla åldrar och färdighetsnivåer. <br /> <br /> 
          Från traditionella lekar till moderna idrotter - våra erfarna ledare ser till att alla känner 
          sig välkomna och får chansen att prova något nytt i en trygg miljö.
        </p>
      );
    },
  },
  {
    description: "Juni-Augusti",
    title: "Sportstruck & Sportoteket",
    src: "/images/sportstruck-06-25-25/Landscape/DSC00669.webp",
    ctaText: "Läs mer",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Sommaren är höjdpunkten för vår verksamhet! Sportstruck är vår mobila idrottsverksamhet som 
          kommer direkt till er. Sportoteket låter barn och familjer låna sportutrustning kostnadsfritt. <br /> <br /> 
          Vi besöker parker, skolgårdar och andra mötesplatser för att göra idrott tillgängligt för alla. 
          Kombination av Sportstruck och Sportoteket gör sommaren till en aktiv och minnesvärd tid för hela familjen.
        </p>
      );
    },
  },
  {
    description: "Oktober",
    title: "Höstlovskul",
    src: "/images/sportstruck-06-25-25/Landscape/DSC00490.webp",
    ctaText: "Läs mer",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Höstlovet bjuder på perfekta förhållanden för utomhusaktiviteter! Vi arrangerar aktiviteter som 
          passar årstiden och hjälper barn att hålla sig aktiva trots kortare dagar. <br /> <br /> 
          Våra höstaktiviteter kombinerar fysisk aktivitet med säsongens naturliga skönhet, och ger barn 
          möjlighet att uppleva glädje i rörelse året runt.
        </p>
      );
    },
  },
  {
    description: "December",
    title: "Jullovskul",
    src: "/images/sportstruck-06-25-25/Landscape/DSC00470.webp",
    ctaText: "Läs mer",
    ctaLink: "#",
    content: () => {
      return (
        <p>
          Avsluta året med festliga och roliga aktiviteter! Jullovet blir extra speciellt med våra 
          tematiska program som kombinerar julstämning med aktiv rörelse. <br /> <br /> 
          Vi erbjuder både inomhus- och utomhusaktiviteter beroende på väder, och ser till att alla 
          barn får en positiv och aktiv start på det nya året. Gemenskap och glädje står i centrum.
        </p>
      );
    },
  },
];

export function ExpandableCards() {
  const [active, setActive] = useState<Card | boolean | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={500}
                  height={300}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-center"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200 text-xl mb-2"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-kliv-red dark:text-kliv-red font-medium text-sm"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.button
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setActive(null)}
                    className="px-4 py-3 text-sm rounded-full font-bold bg-kliv-red hover:bg-kliv-red/90 text-white transition-colors duration-200"
                  >
                    {active.ctaText}
                  </motion.button>
                </div>
                <div className="pt-4 relative px-4">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start gap-4 overflow-auto dark:text-neutral-400 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-4xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start gap-6">
        {seasonalActivities.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-xl cursor-pointer transition-all duration-300 group border border-transparent hover:border-kliv-red/20"
          >
            <div className="flex gap-4 flex-col w-full">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={300}
                  height={200}
                  src={card.src}
                  alt={card.title}
                  className="h-48 w-full rounded-lg object-cover object-center group-hover:scale-105 transition-transform duration-300"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-bold text-neutral-800 dark:text-neutral-200 text-center text-lg mb-2 group-hover:text-kliv-red transition-colors duration-300"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="text-kliv-red dark:text-kliv-red text-center font-medium text-sm"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
}; 