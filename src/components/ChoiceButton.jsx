import { decodeHTML } from '../utils/helpers';

const ChoiceButton = ({ 
  choice, 
  index, 
  isSelected, 
  isAnswered, 
  isCorrect, 
  wasSelected,
  onClick 
}) => {
  const getChoiceClass = () => {
    if (!isAnswered) {
      return isSelected ? 'selected' : '';
    }
    if (isCorrect) return 'correct';
    if (wasSelected && !isCorrect) return 'incorrect';
    return 'opacity-60';
  };

  const letters = ['A', 'B', 'C', 'D'];

  return (
    <button
      onClick={() => onClick(choice)}
      disabled={isAnswered}
      className={`choice-btn w-full py-4 px-6 rounded-lg font-serif 
                 text-lg text-renaissance-brown text-left
                 ${getChoiceClass()}`}
    >
      <span className="font-bold text-renaissance-gold mr-3">
        {letters[index]}.
      </span>
      {decodeHTML(choice)}
    </button>
  );
};

export default ChoiceButton;
