import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Welcome to Your React + Tailwind App
          </h1>
          <p className="text-xl text-gray-600">
            Built with Vite, React, and Tailwind CSS
          </p>
        </header>
        
        <main className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  🚀 Features
                </h2>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-3"></span>
                    <span>Fast development with Vite</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-3"></span>
                    <span>Utility-first CSS with Tailwind</span>
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-500 rounded-full mr-3"></span>
                    <span>Hot Module Replacement</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  📁 Project Structure
                </h2>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm">
                  <div>my-react-app/</div>
                  <div className="ml-4">├── public/</div>
                  <div className="ml-4">├── src/</div>
                  <div className="ml-8">├── App.jsx</div>
                  <div className="ml-8">├── index.css</div>
                  <div className="ml-8">└── main.jsx</div>
                  <div className="ml-4">├── index.html</div>
                  <div className="ml-4">├── package.json</div>
                  <div className="ml-4">├── tailwind.config.js</div>
                  <div className="ml-4">└── vite.config.js</div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 mb-3">
                  🛠 Commands
                </h2>
                <div className="space-y-2">
                  <code className="block bg-gray-800 text-green-300 p-3 rounded-lg">
                    npm run dev
                  </code>
                  <p className="text-gray-600">Start development server</p>
                  
                  <code className="block bg-gray-800 text-green-300 p-3 rounded-lg">
                    npm run build
                  </code>
                  <p className="text-gray-600">Build for production</p>
                  
                  <code className="block bg-gray-800 text-green-300 p-3 rounded-lg">
                    npm run preview
                  </code>
                  <p className="text-gray-600">Preview production build</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 rounded-xl text-white">
                <h3 className="text-xl font-bold mb-2">Quick Start</h3>
                <p className="mb-4">Your project is ready! Start the development server:</p>
                <code className="block bg-black/30 p-3 rounded-lg">
                  cd my-react-app && npm run dev
                </code>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="text-center text-gray-500">
          <p>Created with ❤️ using Git Bash, Vite, React & Tailwind CSS</p>
        </footer>
      </div>
    </div>
  )
}

export default App