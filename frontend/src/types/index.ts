export interface StudentData {
  id: string
  name: string
  age: string | number
  education: string
  preferredSubjects?: string
}

export interface AssessmentResult {
  id: string
  student: StudentData
  scores: {
    analytical: number
    creative: number
    social: number
    practical: number
    business: number
  }
  personality: string
  description: string
  careers: string[]
  createdAt: string
}

export interface StudentFormData {
  name: string
  age: string
  education: string
  preferredSubjects: string
}
