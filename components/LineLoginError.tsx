import React from 'react'

interface LineLoginErrorProps {
  error?: string | null
}

const LineLoginError: React.FC<LineLoginErrorProps> = ({ error }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        <div className="mb-6">
          <svg 
            className="w-16 h-16 text-red-500 mx-auto mb-4" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            アクセスエラー
          </h2>
          <p className="text-lg text-red-600 mb-4">
            LINEログイン後にアクセスしてください
          </p>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-700 text-sm">
                エラー詳細: {error}
              </p>
            </div>
          )}
        </div>
        
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            このアプリをご利用いただくには、LINEアプリから起動する必要があります。
          </p>
          
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => window.location.reload()}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              再読み込み
            </button>
            
            <div className="text-xs text-gray-500 space-y-1">
              <p>※ LINEアプリ内のブラウザからアクセスしてください</p>
              <p>※ 通常のWebブラウザでは利用できません</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LineLoginError