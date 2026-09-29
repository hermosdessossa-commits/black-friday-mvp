export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gray-900 overflow-hidden pt-16">
      <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-5" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <span className="inline-block px-4 py-1.5 rounded-full bg-red-600/20 text-red-400 text-sm font-medium mb-6 border border-red-600/30">
          BLACK FRIDAY • Jusqu&apos;à -50%
        </span>
        <h1 className="text-5xl sm:text-7xl font-black text-white tracking-tight mb-6 leading-tight">
          Les meilleures offres<br />
          <span className="text-red-500">de l&apos;année</span>
        </h1>
        <p className="text-xl sm:text-2xl text-gray-300 max-w-2xl mx-auto mb-10">
          Profitez de réductions exceptionnelles sur une sélection de produits high-tech, sport et maison.
        </p>
        <a
          href="#products"
          className="inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-colors"
        >
          Voir les offres
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </a>
      </div>
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <svg className="w-6 h-6 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}