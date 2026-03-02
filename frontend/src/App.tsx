import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Landing from './pages/Landing'
import StudentForm from './pages/StudentForm'
import Assessment from './pages/Assessment'
import Results from './pages/Results'
import type { AssessmentResult, StudentFormData } from './types'
import './index.css'

function AppContent() {
  const [studentId, setStudentId] = useState<string | null>(null)
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)
  const navigate = useNavigate()

  const handleStart = () => {
    navigate('/student-form')
  }

  const handleStudentSubmit = async (formData: StudentFormData) => {
    try {
      // Convert age to number for backend
      const submissionData = {
        ...formData,
        age: parseInt(formData.age.toString())
      }

      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/session`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (!response.ok) throw new Error('Failed to create session')

      const student = await response.json()
     
      setStudentId(student.id)
      navigate('/assessment')
    } catch (error) {
      console.error('Error creating student session:', error)
      alert('Failed to start assessment. Please try again.')
    }
  }

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setAssessmentResult(result)
    navigate('/results')
  }

  const handleRestart = () => {
   
    setStudentId(null)
    setAssessmentResult(null)
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-secondary-50">
      <Routes>
        <Route path="/" element={<Landing onStart={handleStart} />} />
        <Route path="/student-form" element={<StudentForm onSubmit={handleStudentSubmit} />} />
        <Route path="/assessment" element={<Assessment studentId={studentId} onComplete={handleAssessmentComplete} />} />
        <Route path="/results" element={<Results result={assessmentResult} onRestart={handleRestart} />} />
      </Routes>
    </div>
  )
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
