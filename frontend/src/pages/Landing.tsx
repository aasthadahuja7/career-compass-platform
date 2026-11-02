import { Link } from 'react-router-dom'
import { Brain, ArrowRight, Target, TrendingUp, MessageCircle } from 'lucide-react'

interface LandingProps {
  onStart: () => void
}

const Landing = ({ onStart }: LandingProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-primary-50 to-secondary-50">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239CA3AF' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Header */}
      <header className="relative z-10 flex items-center justify-between px-8 py-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg">
            <Brain className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold text-green-900">PathFinder</span>
        </div>

        {/* Navigation */}
        <nav className="flex items-center space-x-8">
          <Link to="/" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">Home</Link>
          <Link to="/assessment" className="text-gray-600 hover:text-primary-600 transition-colors font-medium">Assessment</Link>
          <button className="btn-primary">
            Start Now
          </button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-8 py-16 text-center min-h-[calc(100vh-80px)]">
        {/* Tag */}
        <div className="inline-flex items-center space-x-2 bg-primary-100 text-primary-700 px-4 py-2 rounded-full mb-8 shadow-md animate-fade-in">
          <div className="w-2 h-2 bg-primary-500 rounded-full animate-pulse-slow"></div>
          <span className="text-sm font-semibold">Science-backed Career Guidance</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight max-w-5xl mx-auto animate-slide-up">
          Discover a career designed
          <br />
          for{' '}
          <span className="gradient-text">
            who you are
          </span>
        </h1>

        {/* Description */}
        <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed animate-slide-up" style={{ animationDelay: '0.1s' }}>
          Stop guessing. Our comprehensive multi-dimensional assessment uncovers your unique psychological profile 
          to match you with careers where you'll thrive.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4 mb-16 animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <button
            onClick={onStart}
            className="btn-primary flex items-center space-x-2 text-lg px-8 py-4"
          >
            <span>Start Free Assessment</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          <Link to="/about" className="btn-secondary text-lg px-8 py-4">
            Learn How It Works
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16 animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Target className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Personalized Results</h3>
            <p className="text-gray-600">Get career suggestions based on your unique personality profile</p>
          </div>
          
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Brain className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Detailed Analysis</h3>
            <p className="text-gray-600">Understand your strengths across five key personality dimensions</p>
          </div>
          
          <div className="card text-center">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-primary-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Career Growth</h3>
            <p className="text-gray-600">Explore suitable career paths with actionable insights</p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-8 sm:space-y-0 sm:space-x-16 mb-16">
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">10K+</div>
            <div className="text-gray-600">Students Assessed</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">95%</div>
            <div className="text-gray-600">Success Rate</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold text-primary-600 mb-2">500+</div>
            <div className="text-gray-600">Career Paths</div>
          </div>
        </div>
      </main>

      {/* Chat Button */}
      <div className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:scale-110 transition-transform z-50">
        <MessageCircle className="w-8 h-8 text-white" />
      </div>
    </div>
  )
}

export default Landing
