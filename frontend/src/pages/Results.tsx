import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Brain, 
  Star, 
  TrendingUp, 
  Download, 
  Share2, 
  Mail, 
  ArrowLeft,
  CheckCircle,
  Lightbulb,
  Users
} from 'lucide-react'
import type { AssessmentResult } from '../types'

interface ResultsProps {
  result: AssessmentResult | null
  onRestart: () => void
}

const Results = ({ result, onRestart }: ResultsProps) => {
  const [activeTab, setActiveTab] = useState('overview')

  if (!result) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-secondary-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Results Available</h2>
          <p className="text-gray-600 mb-8">Please complete the assessment to see your results.</p>
          <Link to="/" className="btn-primary">
            Start Assessment
          </Link>
        </div>
      </div>
    )
  }

  const studentName = result?.student?.name || "Student"
  const studentAge = result?.student?.age || 0
  const studentEducation = result?.student?.education || ""
  const preferredSubjects = result?.student?.preferredSubjects ? result.student.preferredSubjects.split(',').map((s: string) => s.trim()) : []

  // Use actual assessment data from API
  const personalityType = result?.personality || "Analytical Thinker"
  const actualScores = result?.scores || {
    analytical: 3.5,
    creative: 3.1,
    social: 3.5,
    practical: 3.8,
    business: 3.9
  }
  const actualCareers = result?.careers || [
    "Software Developer",
    "Product Manager", 
    "UX Designer"
  ]

  const getScoreColor = (score: number) => {
    if (score >= 4) return 'text-green-600'
    if (score >= 3) return 'text-blue-600'
    return 'text-gray-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 4) return 'bg-green-100'
    if (score >= 3) return 'bg-blue-100'
    return 'bg-gray-100'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <div className="flex items-center justify-center mb-4">
            <Brain className="w-8 h-8 text-primary-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Your Career Assessment Results</h1>
          </div>
          <p className="text-lg text-gray-600">
            Discover your unique personality type and ideal career paths
          </p>
        </div>

        {/* Success Message */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8 text-center">
          <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" />
          <h2 className="text-2xl font-bold text-green-800 mb-2">Assessment Complete!</h2>
          <p className="text-green-700">
            Congratulations! You've successfully completed your career assessment.
          </p>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex space-x-8">
            {['overview', 'personality', 'recommendations'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Student Information Card */}
            <div className="card">
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{studentName}'s Results</h2>
                <div className="text-lg text-gray-600 mb-6 space-y-2">
                  <p>Age: {studentAge} | Education: {studentEducation}</p>
                  {preferredSubjects.length > 0 && (
                    <p>Preferred Subjects: {preferredSubjects.join(', ')}</p>
                  )}
                </div>
                
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Assessment Overview</h3>
                    <p className="text-gray-600">
                      Based on your profile and preferences, we've analyzed your personality dimensions 
                      and career potential to provide personalized recommendations.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Personality Type</h3>
                    <p className="text-gray-600">
                      <span className="font-medium text-primary-600">{personalityType}</span> - 
                      Your unique approach to problem-solving and interaction with the world.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Score Overview */}
            <div className="card">
              <h3 className="text-xl font-semibold text-gray-900 mb-6">Your Personality Dimensions</h3>
              <div className="space-y-4">
                {Object.entries(actualScores).map(([category, score]) => {
                  const scoreNum = score as number
                  const maxScore = Math.max(...Object.values(actualScores) as number[])
                  const percentage = maxScore > 0 ? (scoreNum / maxScore) * 100 : 0
                  
                  return (
                    <div key={category} className="flex items-center">
                      <div className="w-32 capitalize text-gray-700">{category}</div>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              scoreNum >= 4 ? 'bg-green-500' : scoreNum >= 3 ? 'bg-blue-500' : 'bg-gray-400'
                            }`}
                            style={{ width: `${Math.min(percentage, 100)}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className={`w-12 text-right font-semibold ${getScoreColor(scoreNum)}`}>
                        {scoreNum}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'personality' && (
          <div className="card">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Detailed Personality Analysis</h3>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Cognitive Style</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Analytical Thinking</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(actualScores.analytical)} ${getScoreColor(actualScores.analytical)}`}>
                      {actualScores.analytical}/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Creative Problem Solving</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(actualScores.creative)} ${getScoreColor(actualScores.creative)}`}>
                      {actualScores.creative}/5
                    </span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Social Style</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Social Interaction</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(actualScores.social)} ${getScoreColor(actualScores.social)}`}>
                      {actualScores.social}/5
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Leadership Ability</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getScoreBgColor(actualScores.business)} ${getScoreColor(actualScores.business)}`}>
                      {actualScores.business}/5
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-blue-50 rounded-lg">
              <div className="flex">
                <Lightbulb className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-lg font-semibold text-blue-900 mb-2">Insight</h4>
                  <p className="text-blue-800">
                    Your personality type suggests you thrive in environments that value precision, analysis, and systematic thinking. 
                    You likely excel at breaking down complex problems and finding logical solutions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'recommendations' && (
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Career Recommendations</h3>
            
            {actualCareers.map((career: string, index: number) => (
              <div key={index} className="card">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center mb-2">
                      <h4 className="text-xl font-semibold text-gray-900 mr-3">{career}</h4>
                      <div className="flex items-center bg-green-100 text-green-800 px-3 py-1 rounded-full">
                        <Star className="w-4 h-4 mr-1" />
                        <span className="text-sm font-medium">Recommended</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-4">Based on your {personalityType} personality type</p>
                    
                    <div className="flex flex-wrap gap-2">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Technology</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Analysis</span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">Problem Solving</span>
                    </div>
                  </div>
                  
                  <div className="ml-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center">
                      <TrendingUp className="w-8 h-8 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <button className="btn-primary flex items-center justify-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Download Results</span>
          </button>
          <button className="btn-secondary flex items-center justify-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share Results</span>
          </button>
          <button className="btn-secondary flex items-center justify-center space-x-2">
            <Mail className="w-4 h-4" />
            <span>Email Results</span>
          </button>
          <button onClick={onRestart} className="btn-secondary flex items-center justify-center space-x-2">
            <ArrowLeft className="w-4 h-4" />
            <span>Retake Assessment</span>
          </button>
        </div>

        {/* Next Steps */}
        <div className="mt-12 bg-gradient-to-r from-primary-50 to-blue-50 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">What's Next?</h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Your assessment results are just the beginning. Explore our resources to learn more about your recommended careers 
            and take the next steps toward your professional journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/resources" className="btn-primary">
              Explore Career Resources
            </Link>
            <Link to="/counseling" className="btn-secondary">
              Schedule Career Counseling
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Results
