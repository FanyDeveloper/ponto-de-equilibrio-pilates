import { avaliacoes, empresa } from '../data/empresa'

/** JSON-LD do tipo ExerciseGym (subtipo de SportsActivityLocation / LocalBusiness). */
export function businessJsonLd() {
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'ExerciseGym',
    '@id': `${empresa.site}/#estudio`,
    name: empresa.nome,
    url: empresa.site,
    image: `${empresa.site}/og-image.jpg`,
    telephone: empresa.telefoneE164,
    priceRange: '$$', // [CONFIRMAR]
    address: {
      '@type': 'PostalAddress',
      streetAddress: empresa.endereco.rua,
      addressNeighborhood: empresa.endereco.bairro,
      addressLocality: empresa.endereco.cidade,
      addressRegion: empresa.endereco.uf,
      postalCode: empresa.endereco.cep,
      addressCountry: 'BR',
    },
    areaServed: { '@type': 'City', name: 'Florianópolis' },

    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: empresa.google.nota,
      reviewCount: empresa.google.avaliacoes,
      bestRating: 5,
    },
    review: avaliacoes.map((a) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: a.nome },
      reviewRating: { '@type': 'Rating', ratingValue: a.nota, bestRating: 5 },
      reviewBody: a.texto,
    })),
    founder: { '@type': 'Person', name: empresa.responsavel },
  }
  // [CONFIRMAR: coordenadas] — só entra no JSON-LD quando preenchidas em empresa.ts
  if (empresa.geo) {
    data.geo = { '@type': 'GeoCoordinates', latitude: empresa.geo.lat, longitude: empresa.geo.lng }
  }
  // [CONFIRMAR: horários] — só entra no JSON-LD quando preenchidos em empresa.ts
  if (empresa.horariosSchema.length) {
    data.openingHoursSpecification = empresa.horariosSchema.map((h) => ({ '@type': 'OpeningHoursSpecification', ...h }))
  }
  if (empresa.instagram) data.sameAs = [`https://instagram.com/${empresa.instagram.replace('@', '')}`]
  return data
}
