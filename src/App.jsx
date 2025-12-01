import { useQuiz } from './hooks/useQuiz';
import Header from './components/Header';
import Loading from './components/Loading';
import QuestionCard from './components/QuestionCard';
import ScoreBox from './components/ScoreBox';

function App() {
  const {
    currentQuestion,
    currentIndex,
    selectedAnswer,
    isAnswered,
    score,
    loading,
    shuffledChoices,
    usingFallback,
    isRestored,
    isFirstQuestion,
    isLastQuestion,
    totalQuestions,
    selectAnswer,
    submitAnswer,
    goToPrevious,
    goToNext,
    restartQuiz
  } = useQuiz();

  if (loading) {
    return <Loading />;
  }

  if (!currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="parchment-bg p-8 rounded-lg text-center">
          <p className="font-serif text-xl text-renaissance-brown">
            No questions available. Please try again.
          </p>
          <button 
            onClick={restartQuiz}
            className="renaissance-btn mt-4 px-6 py-2 font-serif text-white rounded-lg"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <Header 
        currentIndex={currentIndex}
        totalQuestions={totalQuestions}
        usingFallback={usingFallback}
        isRestored={isRestored}
      />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-6 
                      items-start justify-center">
        
        {/* Question Card */}
        <div className="flex-1 max-w-2xl w-full">
          <QuestionCard
            question={currentQuestion}
            shuffledChoices={shuffledChoices}
            selectedAnswer={selectedAnswer}
            isAnswered={isAnswered}
            isFirstQuestion={isFirstQuestion}
            isLastQuestion={isLastQuestion}
            onSelectAnswer={selectAnswer}
            onSubmit={submitAnswer}
            onPrevious={goToPrevious}
            onNext={goToNext}
          />
        </div>

        {/* Score Box */}
        <div className="lg:w-64 w-full lg:sticky lg:top-8">
          <ScoreBox 
            score={score}
            totalQuestions={totalQuestions}
            onRestart={restartQuiz}
          />
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-12">
        <p className="font-serif text-renaissance-cream/60 text-sm italic">
          ✦ A tribute to the great masters of the Renaissance ✦
        </p>
      </footer>
    </div>
  );
}

export default App;
