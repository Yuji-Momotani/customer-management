import React from 'react'
import { ServiceWithPrices } from '../lib/supabase'
import ServiceCard from './ServiceCard'

interface ServiceListProps {
  services: ServiceWithPrices[]
  onServiceSelect: (serviceId: number, priceId: number, serviceName: string, time: number | null, price: number) => void
  selectedServicePriceId?: number
}

const ServiceList: React.FC<ServiceListProps> = ({ 
  services, 
  onServiceSelect, 
  selectedServicePriceId 
}) => {
  // 選択されたサービスがエネルギークリアリング以外かどうかを判定
  const selectedService = services.find(service => 
    service.m_service_prices.some(price => price.id === selectedServicePriceId)
  )
  const hasOtherServiceSelected = selectedService?.service_name !== 'エネルギークリアリング'
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* ヘッダーセクション */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full mb-4">
          <span className="text-2xl text-white">🌸</span>
        </div>
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          ヒーリングサービス
        </h1>
        <p className="text-gray-600">お好みのサービスをお選びください</p>
      </div>
      
      {/* サービスグリッド */}
      <div className="grid gap-6 md:gap-8">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onServiceSelect={onServiceSelect}
            selectedServicePriceId={selectedServicePriceId}
            hasOtherServiceSelected={hasOtherServiceSelected}
          />
        ))}
      </div>
      
      {/* フッターメッセージ */}
      {services.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">💫</div>
          <p className="text-gray-500 text-lg">サービスが見つかりません</p>
          <p className="text-gray-400 text-sm">しばらくお待ちください</p>
        </div>
      )}
    </div>
  )
}

export default ServiceList