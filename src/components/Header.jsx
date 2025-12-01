const Header = ({ currentIndex, totalQuestions, usingFallback, isRestored }) => {
  return (
    <header className="text-center mb-8">
      <h1 className="font-cursive text-4xl md:text-5xl text-renaissance-gold mb-2 
                     drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
        ✦ The Art Connoisseur's Challenge ✦
      </h1>
      <p className="font-serif text-xl text-renaissance-cream italic">
        A Renaissance Journey Through Art History
      </p>
      
      <div className="flex justify-center gap-4 mt-2">
        {usingFallback && (
          <p className="font-serif text-sm text-renaissance-gold/70">
            ⚜ Using curated collection ⚜
          </p>
        )}
        {isRestored}
      </div>

      <div className="mt-6">
        <p className="font-serif text-lg text-renaissance-gold">
          ❦ Question {currentIndex + 1} of {totalQuestions} ❦
        </p>
      </div>
    </header>
  );
};

export default Header;
