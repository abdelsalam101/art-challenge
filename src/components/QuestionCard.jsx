import { decodeHTML } from '../utils/helpers';
import ChoiceButton from './ChoiceButton';
import NavigationButtons from './NavigationButtons';

const QuestionCard = ({
  question,
  shuffledChoices,
  selectedAnswer,
  isAnswered,
  isFirstQuestion,
  isLastQuestion,
  onSelectAnswer,
  onSubmit,
  onPrevious,
  onNext
}) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-renaissance-brown';
    }
  };

  return (
    <div className="parchment-bg rounded-lg p-8 relative ornate-corner golden-border">
      {/* Difficulty Badge */}
      <div className="absolute top-4 right-4">
        <span className={`font-serif text-sm capitalize ${getDifficultyColor(question.difficulty)}`}>
          ⚜ {question.difficulty} ⚜
        </span>
      </div>

      {/* Question */}
      <div className="mb-8 pt-4">
        <h2 className="font-serif text-xl md:text-2xl text-renaissance-brown 
                     leading-relaxed text-center">
          {decodeHTML(question.question)}
        </h2>
      </div>

      {/* Choices */}
      <div className="space-y-4 mb-8">
        {shuffledChoices.map((choice, index) => (
          <ChoiceButton
            key={index}
            choice={choice}
            index={index}
            isSelected={selectedAnswer === choice}
            isAnswered={isAnswered}
            isCorrect={choice === question.correct_answer}
            wasSelected={selectedAnswer === choice}
            onClick={onSelectAnswer}
          />
        ))}
      </div>

      {/* Submit Button */}
      <div className="text-center mb-6">
        <button
          onClick={onSubmit}
          disabled={!selectedAnswer || isAnswered}
          className="renaissance-btn px-10 py-3 font-cursive text-xl 
                   text-white rounded-lg disabled:opacity-50
                   disabled:cursor-not-allowed"
        >
          {isAnswered ? '✓ Answered' : 'Submit Answer'}
        </button>
      </div>

      {/* Feedback Message */}
      {isAnswered && (
        <div className={`text-center mb-6 p-3 rounded-lg ${
          selectedAnswer === question.correct_answer 
            ? 'bg-green-900/20 border border-green-600' 
            : 'bg-red-900/20 border border-red-600'
        }`}>
          <p className={`font-serif text-lg ${
            selectedAnswer === question.correct_answer 
              ? 'text-green-400' 
              : 'text-red-400'
          }`}>
            {selectedAnswer === question.correct_answer 
              ? '✦ Excellent! Thou art correct! ✦' 
              : `✦ Alas! The answer was: ${decodeHTML(question.correct_answer)} ✦`
            }
          </p>
        </div>
      )}

      {/* Navigation */}
      <NavigationButtons
        isFirstQuestion={isFirstQuestion}
        isLastQuestion={isLastQuestion}
        onPrevious={onPrevious}
        onNext={onNext}
      />
    </div>
  );
};

export default QuestionCard;
