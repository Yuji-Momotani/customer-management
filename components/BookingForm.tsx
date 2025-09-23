import React, { useState } from 'react'

interface BookingFormProps {
  selectedService: {
    serviceId: number
    priceId: number
    serviceName: string
    time: number
    price: number
  } | null
  onSubmit: (data: {
    dateTime: string
    customerName: string
    customerPhone?: string
    customerEmail?: string
    notes?: string
  }) => void
  loading?: boolean
}

const BookingForm: React.FC<BookingFormProps> = ({ 
  selectedService, 
  onSubmit, 
  loading = false 
}) => {
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    notes: ''
  })

  const [errors, setErrors] = useState<{[key: string]: string}>({})

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {}

    if (!formData.date) {
      newErrors.date = '予約日を選択してください'
    }
    if (!formData.time) {
      newErrors.time = '予約時間を選択してください'
    }
    if (!formData.customerName.trim()) {
      newErrors.customerName = 'お名前を入力してください'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    const dateTime = `${formData.date}T${formData.time}:00`
    
    onSubmit({
      dateTime,
      customerName: formData.customerName,
      customerPhone: formData.customerPhone || undefined,
      customerEmail: formData.customerEmail || undefined,
      notes: formData.notes || undefined
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // エラーをクリア
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!selectedService) {
    return (
      <div className="text-center text-gray-500 py-8">
        サービスを選択してください
      </div>
    )
  }

  // 今日以降の日付のみ選択可能
  const today = new Date().toISOString().split('T')[0]

  // 営業時間（例：9:00-18:00）
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
  ]

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        予約情報を入力してください
      </h3>

      {/* 選択したサービスの確認 */}
      <div className="bg-blue-50 rounded-lg p-4 mb-6">
        <h4 className="font-medium text-blue-800 mb-2">選択したサービス</h4>
        <div className="text-blue-700">
          <p className="font-semibold">{selectedService.serviceName}</p>
          <p>{selectedService.time}分 - ¥{selectedService.price.toLocaleString()}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* 予約日 */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            予約日 <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="date"
            min={today}
            value={formData.date}
            onChange={(e) => handleInputChange('date', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.date ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        {/* 予約時間 */}
        <div>
          <label htmlFor="time" className="block text-sm font-medium text-gray-700 mb-1">
            予約時間 <span className="text-red-500">*</span>
          </label>
          <select
            id="time"
            value={formData.time}
            onChange={(e) => handleInputChange('time', e.target.value)}
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.time ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">時間を選択してください</option>
            {timeSlots.map((time) => (
              <option key={time} value={time}>
                {time}
              </option>
            ))}
          </select>
          {errors.time && <p className="text-red-500 text-sm mt-1">{errors.time}</p>}
        </div>

        {/* お名前 */}
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
            お名前 <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="customerName"
            value={formData.customerName}
            onChange={(e) => handleInputChange('customerName', e.target.value)}
            placeholder="山田太郎"
            className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
              errors.customerName ? 'border-red-500' : 'border-gray-300'
            }`}
          />
          {errors.customerName && <p className="text-red-500 text-sm mt-1">{errors.customerName}</p>}
        </div>

        {/* 電話番号 */}
        <div>
          <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
            電話番号（任意）
          </label>
          <input
            type="tel"
            id="customerPhone"
            value={formData.customerPhone}
            onChange={(e) => handleInputChange('customerPhone', e.target.value)}
            placeholder="090-1234-5678"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* メールアドレス */}
        <div>
          <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
            メールアドレス（任意）
          </label>
          <input
            type="email"
            id="customerEmail"
            value={formData.customerEmail}
            onChange={(e) => handleInputChange('customerEmail', e.target.value)}
            placeholder="example@example.com"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 備考 */}
        <div>
          <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
            備考・ご要望（任意）
          </label>
          <textarea
            id="notes"
            rows={3}
            value={formData.notes}
            onChange={(e) => handleInputChange('notes', e.target.value)}
            placeholder="ご質問やご要望がありましたらご記入ください"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-colors ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500'
          } text-white`}
        >
          {loading ? '予約中...' : '予約を送信'}
        </button>
      </form>
    </div>
  )
}

export default BookingForm