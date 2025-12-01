const NavigationButtons = ({ 
  isFirstQuestion, 
  isLastQuestion, 
  onPrevious, 
  onNext 
}) => {
  return (
    <div className="flex justify-between items-center pt-4 border-t-2 
                    border-renaissance-darkGold">
      {!isFirstQuestion ? (
        <button
          onClick={onPrevious}
          className="renaissance-btn px-6 py-2 font-serif text-white rounded-lg
                     flex items-center gap-2"
        >
          <span>←</span> Previous
        </button>
      ) : (
        <div></div>
      )}
      
      {!isLastQuestion ? (
        <button
          onClick={onNext}
          className="renaissance-btn px-6 py-2 font-serif text-white rounded-lg
                     flex items-center gap-2"
        >
          Next <span>→</span>
        </button>
      ) : (
        <div className="font-serif text-renaissance-gold italic">
          ✦ Final Question ✦
        </div>
      )}
    </div>
  );
};

export default NavigationButtons;
