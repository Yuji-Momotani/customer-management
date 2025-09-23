import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// 型定義のエクスポート
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type TablesInsert<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type TablesUpdate<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// 各テーブルの型
export type UserProfile = Tables<'user_profiles'>
export type MService = Tables<'m_services'>
export type MServicePrice = Tables<'m_service_prices'>
export type Reservation = Tables<'reservations'>

// Insert用の型
export type UserProfileInsert = TablesInsert<'user_profiles'>
export type MServiceInsert = TablesInsert<'m_services'>
export type MServicePriceInsert = TablesInsert<'m_service_prices'>
export type ReservationInsert = TablesInsert<'reservations'>

// Update用の型
export type UserProfileUpdate = TablesUpdate<'user_profiles'>
export type MServiceUpdate = TablesUpdate<'m_services'>
export type MServicePriceUpdate = TablesUpdate<'m_service_prices'>
export type ReservationUpdate = TablesUpdate<'reservations'>

// サービスと料金を結合した型
export type ServiceWithPrices = MService & {
  m_service_prices: MServicePrice[]
}

// 予約と関連データを結合した型
export type ReservationWithDetails = Reservation & {
  user_profiles: UserProfile
  m_service_prices: MServicePrice & {
    m_services: MService
  }
}