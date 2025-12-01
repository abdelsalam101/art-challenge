import { useState, useEffect, useCallback } from 'react';
import { shuffleArray } from '../utils/helpers';
import { fallbackQuestions } from '../data/fallbackQuestions';

const API_URL = 'https://opentdb.com/api.php?amount=20&category=25&type=multiple';
const STORAGE_KEY = 'artQuizState';

// Load state from localStorage
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Check if data is less than 24 hours old
      const isValid = parsed.timestamp && 
        (Date.now() - parsed.timestamp) < 24 * 60 * 60 * 1000;
      if (isValid) {
        return parsed;
      }
    }
  } catch (error) {
    console.error('Error loading from localStorage:', error);
  }
  return null;
};

// Save state to localStorage
const saveToStorage = (state) => {
  try {
    const dataToSave = {
      ...state,
      timestamp: Date.now()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// Clear storage
const clearStorage = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

export const useQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const [score, setScore] = useState({ correct: 0, incorrect: 0 });
  const [loading, setLoading] = useState(true);
  const [shuffledChoices, setShuffledChoices] = useState([]);
  const [usingFallback, setUsingFallback] = useState(false);
  const [isRestored, setIsRestored] = useState(false);

  // Fetch new questions from API
  const fetchNewQuestions = useCallback(async () => {
    try {
      const response = await fetch(API_URL);
      
      if (response.status === 429) {
        console.log('API rate limited, using fallback questions');
        return { questions: shuffleArray(fallbackQuestions), isFallback: true };
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.response_code === 0) {
        return { questions: data.results, isFallback: false };
      }
      throw new Error('Invalid API response');
    } catch (err) {
      console.log('Fetch failed, using fallback:', err.message);
      return { questions: shuffleArray(fallbackQuestions), isFallback: true };
    }
  }, []);

  // Initialize - load from storage or fetch new
  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      
      const savedState = loadFromStorage();
      
      if (savedState && savedState.questions?.length > 0) {
        // Restore from localStorage
        setQuestions(savedState.questions);
        setCurrentIndex(savedState.currentIndex || 0);
        setAnsweredQuestions(savedState.answeredQuestions || {});
        setScore(savedState.score || { correct: 0, incorrect: 0 });
        setUsingFallback(savedState.usingFallback || false);
        setIsRestored(true);
        console.log('Quiz state restored from localStorage');
      } else {
        // Fetch new questions
        const { questions: newQuestions, isFallback } = await fetchNewQuestions();
        setQuestions(newQuestions);
        setUsingFallback(isFallback);
      }
      
      setLoading(false);
    };

    initialize();
  }, [fetchNewQuestions]);

  // Save to localStorage whenever important state changes
  useEffect(() => {
    if (questions.length > 0) {
      saveToStorage({
        questions,
        currentIndex,
        answeredQuestions,
        score,
        usingFallback
      });
    }
  }, [questions, currentIndex, answeredQuestions, score, usingFallback]);

  // Shuffle choices when question changes
  useEffect(() => {
    if (questions.length > 0 && questions[currentIndex]) {
      const currentQ = questions[currentIndex];
      
      // Check if we have saved shuffled choices for this question
      const savedAnswer = answeredQuestions[currentIndex];
      
      if (savedAnswer?.shuffledChoices) {
        // Use saved shuffle order
        setShuffledChoices(savedAnswer.shuffledChoices);
      } else {
        // Create new shuffle
        const allChoices = [
          currentQ.correct_answer,
          ...currentQ.incorrect_answers
        ];
        setShuffledChoices(shuffleArray(allChoices));
      }
      
      // Restore answered state
      if (savedAnswer) {
        setSelectedAnswer(savedAnswer.selected);
        setIsAnswered(true);
      } else {
        setSelectedAnswer(null);
        setIsAnswered(false);
      }
    }
  }, [currentIndex, questions, answeredQuestions]);

  const selectAnswer = (answer) => {
    if (!isAnswered) {
      setSelectedAnswer(answer);
    }
  };

  const submitAnswer = () => {
    if (selectedAnswer && !isAnswered) {
      setIsAnswered(true);
      const isCorrect = selectedAnswer === questions[currentIndex].correct_answer;
      
      // Save answered state with shuffled choices
      setAnsweredQuestions(prev => ({
        ...prev,
        [currentIndex]: {
          selected: selectedAnswer,
          isCorrect,
          shuffledChoices // Save the shuffle order
        }
      }));

      setScore(prev => ({
        correct: isCorrect ? prev.correct + 1 : prev.correct,
        incorrect: !isCorrect ? prev.incorrect + 1 : prev.incorrect
      }));
    }
  };

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  const restartQuiz = async () => {
    // Clear localStorage
    clearStorage();
    
    // Reset all state
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAnsweredQuestions({});
    setScore({ correct: 0, incorrect: 0 });
    setIsRestored(false);
    
    // Fetch new questions
    setLoading(true);
    const { questions: newQuestions, isFallback } = await fetchNewQuestions();
    setQuestions(newQuestions);
    setUsingFallback(isFallback);
    setLoading(false);
  };

  return {
    questions,
    currentIndex,
    currentQuestion: questions[currentIndex],
    selectedAnswer,
    isAnswered,
    score,
    loading,
    shuffledChoices,
    usingFallback,
    isRestored,
    isFirstQuestion: currentIndex === 0,
    isLastQuestion: currentIndex === questions.length - 1,
    totalQuestions: questions.length,
    selectAnswer,
    submitAnswer,
    goToPrevious,
    goToNext,
    restartQuiz
  };
};
