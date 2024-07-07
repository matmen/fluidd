import type { SpoolmanState } from '@/store/spoolman/types'

export const defaultState = (): SpoolmanState => {
  return {
    availableSpools: [],
    activeSpool: undefined,
    connected: false,
    dialog: {
      show: false
    },
    settings: {
      extra_fields_vendor: {},
      extra_fields_filament: {},
      extra_fields_spool: {},
      currency: null
    }
  }
}

export const state = defaultState()
