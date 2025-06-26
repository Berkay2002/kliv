import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Villkor | Kliv Idrottsförening',
  description: 'Läs våra allmänna villkor för medlemskap och deltagande i Kliv Idrottsförenings aktiviteter.',
}

export default function VillkorPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 sm:px-6 py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            Allmänna villkor
          </h1>
          <div className="w-24 h-1 bg-kliv-red mb-8"></div>
          
          <div className="prose prose-lg max-w-none dark:prose-invert space-y-8">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Senast uppdaterad: {new Date().toLocaleDateString('sv-SE')}
              </p>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Dessa allmänna villkor gäller för medlemskap och deltagande i aktiviteter inom 
                Kliv Idrottsförening Botkyrka (org.nr 802509-8842).
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                1. Om föreningen
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>Kliv Idrottsförening Botkyrka</strong><br />
                  Organisationsnummer: 802509-8842<br />
                  Adress: Tomtbergavägen 370A, 145 71 Norsborg<br />
                  E-post: info@kliv.se<br />
                  Registrerad: 2017-06-29
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                2. Kontaktinformation
              </h2>
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                <p className="text-gray-700 dark:text-gray-300">
                  För frågor om dessa villkor, kontakta:<br />
                  Kliv Idrottsförening Botkyrka<br />
                  E-post: info@kliv.se<br />
                  Adress: Tomtbergavägen 370A, 145 71 Norsborg
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
