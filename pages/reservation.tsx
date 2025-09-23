import React, { useState, useEffect } from 'react'
import Head from 'next/head'
import { useServices } from '../hooks/useServices'
import { supabase, ReservationInsert } from '../lib/supabase'
import ServiceList from '../components/ServiceList'
import BookingForm from '../components/BookingForm'

interface SelectedService {
  serviceId: number
  priceId: number
  serviceName: string
  time: number
  price: number
}

const ReservationPage: React.FC = () => {
  const { services, loading: servicesLoading, error: servicesError } = useServices()
  const [selectedService, setSelectedService] = useState<SelectedService | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // LIFF初期化の準備（後で実装）
  const [liffReady, setLiffReady] = useState(false)
  const [userLineId, setUserLineId] = useState<string | null>(null)

  useEffect(() => {
    // LIFF初期化をスキップしてテスト
    setUserLineId('dummy-line-user-id')
    setLiffReady(true)
    console.log('LIFF ready set to true')
  }, [])

  const handleServiceSelect = (
    serviceId: number, 
    priceId: number, 
    serviceName: string, 
    time: number, 
    price: number
  ) => {
    setSelectedService({ serviceId, priceId, serviceName, time, price })
    setSubmitError(null)
    setSubmitSuccess(false)
  }

  const handleBookingSubmit = async (bookingData: {
    dateTime: string
    customerName: string
    customerPhone?: string
    customerEmail?: string
    notes?: string
  }) => {
    if (!selectedService || !userLineId) return

    try {
      setSubmitting(true)
      setSubmitError(null)

      // 1. ユーザープロフィールを作成または取得
      let userId: number
      
      const { data: existingUser, error: userFetchError } = await supabase
        .from('user_profiles')
        .select('id')
        .eq('user_line_id', userLineId)
        .single()

      if (existingUser) {
        userId = existingUser.id
      } else {
        // 新規ユーザー作成
        const { data: newUser, error: userCreateError } = await supabase
          .from('user_profiles')
          .insert({
            user_line_id: userLineId
          })
          .select('id')
          .single()

        if (userCreateError) {
          throw userCreateError
        }

        userId = newUser.id
      }

      // 2. 予約を作成
      const reservationData: ReservationInsert = {
        user_id: userId,
        service_price_id: selectedService.priceId,
        date_and_time: bookingData.dateTime
      }

      const { error: reservationError } = await supabase
        .from('reservations')
        .insert(reservationData)

      if (reservationError) {
        throw reservationError
      }

      // 成功
      setSubmitSuccess(true)
      setSelectedService(null)

      // TODO: LINEメッセージ送信
      
    } catch (error) {
      console.error('Booking error:', error)
      setSubmitError(
        error instanceof Error 
          ? error.message 
          : '予約の送信に失敗しました。再度お試しください。'
      )
    } finally {
      setSubmitting(false)
    }
  }

  if (!liffReady) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">アプリを初期化しています...</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Head>
        <title>予約システム | ヒーリングサロン</title>
        <meta name="description" content="ヒーリングサロンの予約システム" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-6 max-w-2xl">
          {/* ヘッダー */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              ヒーリングサロン予約
            </h1>
            <p className="text-gray-600">
              お好みのサービスと日時を選択してください
            </p>
          </div>

          {/* 成功メッセージ */}
          {submitSuccess && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg 
                  className="w-5 h-5 text-green-600 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="text-green-800 font-medium">
                  予約が正常に送信されました！
                </span>
              </div>
              <p className="text-green-700 text-sm mt-1">
                LINEにて確認メッセージをお送りいたします。
              </p>
            </div>
          )}

          {/* エラーメッセージ */}
          {(servicesError || submitError) && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <div className="flex items-center">
                <svg 
                  className="w-5 h-5 text-red-600 mr-2" 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path 
                    fillRule="evenodd" 
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" 
                    clipRule="evenodd" 
                  />
                </svg>
                <span className="text-red-800 font-medium">エラーが発生しました</span>
              </div>
              <p className="text-red-700 text-sm mt-1">
                {servicesError || submitError}
              </p>
            </div>
          )}

          {/* ローディング */}
          {servicesLoading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">サービス情報を読み込んでいます...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* サービス選択 */}
              <ServiceList
                services={services}
                onServiceSelect={handleServiceSelect}
                selectedServicePriceId={selectedService?.priceId}
              />

              {/* 予約フォーム */}
              <BookingForm
                selectedService={selectedService}
                onSubmit={handleBookingSubmit}
                loading={submitting}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ReservationPage