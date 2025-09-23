import React from 'react'
import { ServiceWithPrices } from '../lib/supabase'

interface ServiceCardProps {
  service: ServiceWithPrices
  onServiceSelect: (serviceId: number, priceId: number, serviceName: string, time: number | null, price: number) => void
  selectedServicePriceId?: number
  hasOtherServiceSelected?: boolean
}

const ServiceCard: React.FC<ServiceCardProps> = ({ 
  service, 
  onServiceSelect, 
  selectedServicePriceId,
  hasOtherServiceSelected = false
}) => {
  const isEnergyClearing = service.service_name === 'エネルギークリアリング'
  const isEnergyDisabled = isEnergyClearing && !hasOtherServiceSelected
  
  // サービスアイコンを取得
  const getServiceIcon = (serviceName: string) => {
    switch (serviceName) {
      case 'アクセスバース':
        return '✨'
      case '霊視オラクルリーディング':
        return '🔮'
      case 'エネルギークリアリング':
        return '🌟'
      default:
        return '💫'
    }
  }

  // サービスの色テーマを取得
  const getServiceTheme = (serviceName: string) => {
    switch (serviceName) {
      case 'アクセスバース':
        return {
          bg: 'bg-gradient-to-br from-purple-50 to-indigo-50',
          border: 'border-purple-200',
          accent: 'text-purple-600',
          button: 'hover:border-purple-300 focus:ring-purple-500'
        }
      case '霊視オラクルリーディング':
        return {
          bg: 'bg-gradient-to-br from-blue-50 to-cyan-50',
          border: 'border-blue-200',
          accent: 'text-blue-600',
          button: 'hover:border-blue-300 focus:ring-blue-500'
        }
      case 'エネルギークリアリング':
        return {
          bg: 'bg-gradient-to-br from-emerald-50 to-green-50',
          border: 'border-emerald-200',
          accent: 'text-emerald-600',
          button: 'hover:border-emerald-300 focus:ring-emerald-500'
        }
      default:
        return {
          bg: 'bg-gradient-to-br from-gray-50 to-slate-50',
          border: 'border-gray-200',
          accent: 'text-gray-600',
          button: 'hover:border-gray-300 focus:ring-gray-500'
        }
    }
  }

  const theme = getServiceTheme(service.service_name)
  
  return (
    <div className={`${theme.bg} rounded-xl shadow-lg p-6 ${theme.border} border-2 transition-all duration-200 hover:shadow-xl`}>
      {/* サービスヘッダー */}
      <div className="flex items-center mb-4">
        <span className="text-3xl mr-3">{getServiceIcon(service.service_name)}</span>
        <div>
          <h3 className={`text-xl font-bold ${theme.accent} mb-1`}>
            {service.service_name}
          </h3>
          <div className="flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
            <span className="text-sm text-gray-600">予約受付中</span>
          </div>
        </div>
      </div>
      
      {/* 料金オプション */}
      <div className="space-y-3">
        {service.m_service_prices.map((price) => {
          const isSelected = selectedServicePriceId === price.id
          const displayTime = price.time ? `${price.time}分` : '1回'
          
          return (
            <button
              key={price.id}
              onClick={() => {
                if (!isEnergyDisabled) {
                  onServiceSelect(
                    service.id, 
                    price.id, 
                    service.service_name, 
                    price.time, 
                    price.price
                  )
                }
              }}
              disabled={isEnergyDisabled}
              className={`w-full p-4 rounded-xl border-2 transition-all duration-200 ${
                isEnergyDisabled 
                  ? 'cursor-not-allowed opacity-50 bg-gray-100 border-gray-200'
                  : isSelected
                    ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-md transform hover:scale-[1.02]'
                    : `border-gray-200 bg-white ${theme.button} shadow-sm transform hover:scale-[1.02]`
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex flex-col items-start">
                    <span className="font-semibold text-lg">
                      {displayTime}
                    </span>
                    {price.time && (
                      <span className="text-xs text-gray-500">
                        {Math.floor(price.time / 60) > 0 && `${Math.floor(price.time / 60)}時間`}
                        {price.time % 60 > 0 && `${price.time % 60}分`}
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end">
                    <span className="text-2xl font-bold text-gray-800">
                      ¥{price.price.toLocaleString()}
                    </span>
                    {isSelected && (
                      <svg className="w-6 h-6 text-blue-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">税込価格</div>
                </div>
              </div>
            </button>
          )
        })}
      </div>
      
      {/* サービス説明 */}
      <div className="mt-4 p-3 bg-white/60 rounded-lg">
        <p className="text-sm text-gray-600 leading-relaxed">
          {service.service_name === 'アクセスバース' && 
            '意識の制限を解放し、新しい可能性にアクセスできるようになります。'
          }
          {service.service_name === '霊視オラクルリーディング' && 
            '直感とオラクルカードを使って、あなたの人生をガイダンスします。'
          }
          {service.service_name === 'エネルギークリアリング' && 
            '他のメニューと組み合わせて、エネルギーの浄化を行います。'
          }
        </p>
        
        {/* エネルギークリアリングの制限メッセージ */}
        {isEnergyClearing && !hasOtherServiceSelected && (
          <div className="mt-3 p-2 bg-amber-50 border border-amber-200 rounded-lg">
            <div className="flex items-center">
              <span className="text-amber-500 text-sm mr-2">⚠️</span>
              <p className="text-xs text-amber-700">
                他のサービスをお選びいただいてから追加できます
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceCard