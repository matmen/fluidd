import type { Macro } from '@/store/macros/types'

export interface Vendor {
  id: number;
  registered: Date;
  name: string;
  comment?: string;

  extra: SpoolmanExtraField;
}

export interface Filament {
  id: number;
  registered: Date;
  density: number;
  diameter: number;

  name?: string;
  vendor?: Vendor;
  material?: string;
  price?: number;
  weight?: number;
  spool_weight?: number;
  article_number?: string;
  comment?: string;
  settings_extruder_temp?: number;
  settings_bed_temp?: number;
  color_hex?: string;

  extra: SpoolmanExtraField;
}

export interface Spool {
  id: number;
  registered: Date;
  filament: Filament;
  used_weight: number;
  used_length: number;
  archived: boolean;

  remaining_weight?: number;
  remaining_length?: number;
  location?: string;
  lot_nr?: string;
  comment?: string;
  first_used?: Date;
  last_used?: Date;

  extra: SpoolmanExtraField;
}

export interface SpoolmanState {
  availableSpools: Spool[];
  activeSpool?: number;
  connected: boolean;
  dialog: SpoolSelectionDialogState;
  socket?: WebSocket;
  settings: SpoolmanSettings;
}

export interface SpoolSelectionDialogState {
  show: boolean;
  filename?: string;
  targetMacro?: string;
}

export interface WebsocketBasePayload {
  type: 'added' | 'updated' | 'deleted';
  resource: string;
  date: string;
  payload: Record<string, any>;
}

export interface WebsocketSpoolPayload extends WebsocketBasePayload {
  resource: 'spool';
  payload: Spool;
}

export interface WebsocketFilamentPayload extends WebsocketBasePayload {
  resource: 'filament';
  payload: Filament;
}

export interface WebsocketVendorPayload extends WebsocketBasePayload {
  resource: 'vendor';
  payload: Vendor;
}

export interface SpoolmanSettings {
  extra_fields_spool: { [key: string]: SpoolmanExtraFieldDefinition };
  extra_fields_filament: { [key: string]: SpoolmanExtraFieldDefinition };
  extra_fields_vendor: { [key: string]: SpoolmanExtraFieldDefinition };
  currency: string | null;
}

export interface MacroWithSpoolId extends Macro {
  variables: {
    spool_id: number | null;
    [key: string]: unknown;
  }
}

export type SpoolmanProxyResponse<T> = T | {
  response: T,
  error: null
} | {
  response: null,
  error: string | {
    message: string
  }
}

export interface SpoolmanExtraField { [key: string]: string | number | undefined }
export interface SpoolmanExtraFieldDefinition {
  key: string;
  name: string;
  order: number | null;
  unit: string | null;
  field_type: 'text' | 'integer' | 'integer_range' | 'float' | 'float_range' | 'datetime' | 'boolean' | 'choice';
  // more keys we don't care about as of now
}
