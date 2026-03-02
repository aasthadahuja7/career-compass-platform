import { useState, useEffect } from 'react'
import { Brain, CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react'

interface AssessmentProps {
  studentId: string | null
  onComplete: (result: any) => void
}

interface Question {
  id: number
  text: string
  category: string
  opposite: string
}

const Assessment = ({ studentId, onComplete }: AssessmentProps) => {
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, string>>({})
  const [isLoading, setIsLoading] = useState(false)
  const [isFetchingQuestions, setIsFetchingQuestions] = useState(true)

  // Likert scale options
  const likertOptions = [
    { value: 'Strongly Disagree', label: 'Strongly Disagree' },
    { value: 'Disagree', label: 'Disagree' },
    { value: 'Neutral', label: 'Neutral' },
    { value: 'Agree', label: 'Agree' },
    { value: 'Strongly Agree', label: 'Strongly Agree' }
  ]

  // Fetch questions from API
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/questions`)
        if (!response.ok) throw new Error('Failed to fetch questions')
        const data = await response.json()
        setQuestions(data)
      } catch (error) {
        console.error('Error fetching questions:', error)
      } finally {
        setIsFetchingQuestions(false)
      }
    }

    fetchQuestions()
  }, [])

  const handleAnswer = (questionId: number, value: string) => {
    setAnswers({
      ...answers,
      [questionId]: value
    })
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
    } else {
      handleSubmitAssessment()
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1)
    }
  }

  const handleSubmitAssessment = async () => {
    if (!studentId) return

    setIsLoading(true)
    
    try {
      // Convert answers to the format expected by backend
      const answersArray = questions.map(question => ({
        questionId: question.id,
        answer: answers[question.id] || 'Neutral'
      }))

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'}/api/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentId,
          answers: answersArray
        }),
      })

      if (!response.ok) throw new Error('Failed to submit assessment')

      const result = await response.json()
      onComplete(result)
    } catch (error) {
      console.error('Assessment submission error:', error)
      alert('Failed to submit assessment. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const progress = questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0

  if (!studentId) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Session Expired</h2>
          <p className="text-gray-600 mb-8">Please start the assessment again.</p>
          <button className="btn-primary" onClick={() => window.location.href = '/'}>
            Start Over
          </button>
        </div>
      </div>
    )
  }

  if (isFetchingQuestions) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Loading Assessment</h2>
          <p className="text-gray-600">Preparing your questions...</p>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Assessment Unavailable</h2>
          <p className="text-gray-600 mb-8">Unable to load questions. Please try again later.</p>
          <button className="btn-primary" onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">Career Assessment</h1>
          </div>
          <p className="text-lg text-gray-600">
            Answer these questions to discover your ideal career path
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Question {currentQuestion + 1} of {questions.length}
            </span>
            <span className="text-sm font-medium text-gray-700">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-primary-500 to-primary-600 h-3 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="card">
          <div className="mb-6">
            <div className="flex items-center mb-4">
              <span className="bg-primary-100 text-primary-700 text-sm font-medium px-3 py-1 rounded-full">
                {questions[currentQuestion].category}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {questions[currentQuestion].text}
            </h2>
          </div>

          {/* Likert Scale Options */}
          <div className="space-y-3">
            {likertOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                  answers[questions[currentQuestion].id] === option.value
                    ? 'border-primary-500 bg-primary-50'
                    : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-5 h-5 rounded-full border-2 mr-3 flex items-center justify-center ${
                    answers[questions[currentQuestion].id] === option.value
                      ? 'border-primary-500'
                      : 'border-gray-300'
                  }`}>
                    {answers[questions[currentQuestion].id] === option.value && (
                      <CheckCircle className="w-3 h-3 text-primary-500" />
                    )}
                  </div>
                  <span className="text-gray-900">{option.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="btn-secondary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>
            
            <button
              onClick={handleNext}
              disabled={!answers[questions[currentQuestion].id] || isLoading}
              className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>{currentQuestion === questions.length - 1 ? 'Complete' : 'Next'}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Brain className="h-5 w-5 text-blue-600" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">Tip</h3>
              <p className="text-sm text-blue-700 mt-1">
                Be honest with your answers. There are no right or wrong responses - this helps us find the best career fit for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Assessment
