import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground text-center p-4">
      <h1 className="text-6xl font-bold text-kliv-red mb-4">404</h1>
      <h2 className="text-3xl font-semibold mb-6">Sidan hittades inte</h2>
      <p className="text-lg text-muted-foreground mb-8">
        Vi kunde inte hitta sidan du letade efter. Den kan ha flyttats eller tagits bort.
      </p>
      <Link href="/" className="px-6 py-3 bg-kliv-red hover:bg-kliv-red-dark text-white rounded-lg font-medium transition-colors duration-200">
        Tillbaka till Startsidan
      </Link>
    </div>
  );
} 