const ScoreBox = ({ score, totalQuestions, onRestart }) => {
  const answeredCount = score.correct + score.incorrect;
  const isComplete = answeredCount === totalQuestions;

  return (
    <div className="score-box rounded-lg p-6 text-center">
      <h3 className="font-cursive text-2xl text-renaissance-gold mb-6">
        ❧ Thy Score ❧
      </h3>
      
      <div className="space-y-4">
        <div className="bg-gradient-to-r from-green-900/50 to-green-800/50 
                      rounded-lg p-4 border border-green-600">
          <p className="font-serif text-renaissance-cream text-sm mb-1">
            Correct Answers
          </p>
          <p className="font-cursive text-4xl text-green-400">
            {score.correct}
          </p>
        </div>
        
        <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 
                      rounded-lg p-4 border border-red-600">
          <p className="font-serif text-renaissance-cream text-sm mb-1">
            Incorrect Answers
          </p>
          <p className="font-cursive text-4xl text-red-400">
            {score.incorrect}
          </p>
        </div>

        <div className="pt-4 border-t border-renaissance-gold/30">
          <p className="font-serif text-renaissance-cream text-sm mb-1">
            Progress
          </p>
          <p className="font-serif text-xl text-renaissance-gold">
            {answeredCount} / {totalQuestions}
          </p>
          
          {/* Progress bar */}
          <div className="mt-3 h-2 bg-renaissance-brown/50 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-renaissance-gold to-renaissance-darkGold 
                        transition-all duration-500"
              style={{ width: `${(answeredCount / totalQuestions) * 100}%` }}
            />
          </div>
        </div>

        {isComplete && (
          <div className="pt-4">
            <p className="font-serif text-renaissance-cream mb-3">
              🎨 Quest Complete! 🎨
            </p>
            <p className="font-cursive text-2xl text-renaissance-gold mb-4">
              {Math.round((score.correct / totalQuestions) * 100)}% Mastery
            </p>
            <button
              onClick={onRestart}
              className="renaissance-btn px-6 py-2 font-serif text-white rounded-lg w-full"
            >
              Begin Anew
            </button>
          </div>
        )}
      </div>

      <div className="mt-6 text-renaissance-gold opacity-60">
        ═══════════
      </div>
      <p className="font-serif text-xs text-renaissance-cream/60 mt-2 italic">
        "Art is never finished, only abandoned."
        <br />— Leonardo da Vinci
      </p>
    </div>
  );
};

export default ScoreBox;
