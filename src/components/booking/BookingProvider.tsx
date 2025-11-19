import { ReactNode, createContext, useCallback, useContext, useMemo, useState } from 'react'
import { SafariBookingDialog } from './SafariBookingDialog'
import { ScheduleViewingDialog } from './ScheduleViewingDialog'
import type { PropertySummary, SafariSummary } from './types'

type BookingContextValue = {
  viewing: { open: boolean; property?: PropertySummary }
  safari: { open: boolean; safari?: SafariSummary | null; mode: 'book' | 'custom' }
  openViewing: (property?: PropertySummary) => void
  openSafariBooking: (safari?: SafariSummary) => void
  openCustomItinerary: () => void
  closeViewing: () => void
  closeSafari: () => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [viewingState, setViewingState] = useState<{ open: boolean; property?: PropertySummary }>({ open: false })
  const [safariState, setSafariState] = useState<{ open: boolean; safari?: SafariSummary | null; mode: 'book' | 'custom' }>({
    open: false,
    safari: null,
    mode: 'book'
  })

  const openViewing = useCallback((property?: PropertySummary) => {
    setViewingState({ open: true, property })
  }, [])

  const openSafariBooking = useCallback((safari?: SafariSummary) => {
    setSafariState({ open: true, safari: safari ?? null, mode: 'book' })
  }, [])

  const openCustomItinerary = useCallback(() => {
    setSafariState({ open: true, safari: null, mode: 'custom' })
  }, [])

  const closeViewing = useCallback(() => {
    setViewingState((prev) => ({ ...prev, open: false, property: undefined }))
  }, [])

  const closeSafari = useCallback(() => {
    setSafariState((prev) => ({ ...prev, open: false, safari: null }))
  }, [])

  const value = useMemo(
    () => ({
      viewing: viewingState,
      safari: safariState,
      openViewing,
      openSafariBooking,
      openCustomItinerary,
      closeViewing,
      closeSafari
    }),
    [closeSafari, closeViewing, openCustomItinerary, openSafariBooking, openViewing, safariState, viewingState]
  )

  return (
    <BookingContext.Provider value={value}>
      {children}
      <ScheduleViewingDialog
        open={viewingState.open}
        property={viewingState.property}
        onOpenChange={(next) => {
          if (!next) closeViewing()
        }}
      />
      <SafariBookingDialog
        open={safariState.open}
        mode={safariState.mode}
        safari={safariState.safari ?? undefined}
        onOpenChange={(next) => {
          if (!next) closeSafari()
        }}
      />
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) {
    throw new Error('useBooking must be used within a BookingProvider')
  }
  return ctx
}
