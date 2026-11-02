import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { User, GraduationCap, ArrowLeft, ArrowRight } from 'lucide-react'
import type { StudentFormData } from '../types'

interface StudentFormProps {
  onSubmit: (formData: StudentFormData) => void
}

const StudentForm = ({ onSubmit }: StudentFormProps) => {
  const [formData, setFormData] = useState<StudentFormData>({
    name: '',
    age: '',
    education: '',
    preferredSubjects: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    } else {
      const nameWithoutSpaces = formData.name.replace(/\s/g, '')
      console.log('Name:', formData.name, 'Without spaces:', nameWithoutSpaces, 'Length:', nameWithoutSpaces.length)
      if (nameWithoutSpaces.length < 3) {
        newErrors.name = 'Name must be at least 3 characters long (excluding spaces)'
      }
    }

    if (!formData.age) {
      newErrors.age = 'Age is required'
    } else {
      const ageNum = parseInt(formData.age)
      if (isNaN(ageNum) || ageNum < 18) {
        newErrors.age = 'You must be 18 years or older to take this assessment'
      } else if (ageNum > 120) {
        newErrors.age = 'Please enter a valid age'
      }
    }

    if (!formData.education) {
      newErrors.education = 'Education level is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      })
    }
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsLoading(true)
    
    try {
      await onSubmit(formData)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-primary-50 to-secondary-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center text-gray-600 hover:text-primary-600 mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tell us about yourself
          </h1>
          <p className="text-lg text-gray-600">
            This information helps us personalize your career assessment
          </p>
        </div>

        {/* Form Card */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.name ? 'border-red-500 focus:border-red-500' : ''}`}
                  placeholder="John Doe"
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Age Field */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                Age
              </label>
              <input
                type="number"
                id="age"
                name="age"
                required
                min="18"
                max="120"
                value={formData.age}
                onChange={handleChange}
                className={`input-field ${errors.age ? 'border-red-500 focus:border-red-500' : ''}`}
                placeholder="25"
              />
              {errors.age && (
                <p className="mt-1 text-sm text-red-600">{errors.age}</p>
              )}
            </div>

            {/* Education Field */}
            <div>
              <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-2">
                Education Level
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <GraduationCap className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  id="education"
                  name="education"
                  required
                  value={formData.education}
                  onChange={handleChange}
                  className={`input-field pl-10 ${errors.education ? 'border-red-500 focus:border-red-500' : ''}`}
                >
                  <option value="">Select Education Level</option>
                  <option value="High School">High School</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Graduate">Graduate</option>
                  <option value="Postgraduate">Postgraduate</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              {errors.education && (
                <p className="mt-1 text-sm text-red-600">{errors.education}</p>
              )}
            </div>

            {/* Preferred Subjects Field */}
            <div>
              <label htmlFor="preferredSubjects" className="block text-sm font-medium text-gray-700 mb-2">
                Preferred Subjects (Optional)
              </label>
              <textarea
                id="preferredSubjects"
                name="preferredSubjects"
                rows={4}
                value={formData.preferredSubjects}
                onChange={handleChange}
                className="input-field"
                placeholder="List your preferred subjects separated by commas (e.g., Mathematics, Physics, Computer Science)"
              />
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-6">
              <Link
                to="/"
                className="btn-secondary"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isLoading}
                className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Processing..</span>
                  </>
                ) : (
                  <>
                    <span>Start Assessment</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Progress Indicator */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Progress</span>
            <span className="text-sm font-medium text-gray-700">Step 1 of 2</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-primary-600 h-2 rounded-full" style={{ width: '50%' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default StudentForm
