import { createLocalStoreHook } from './useContentStore'
import { DEFAULT_CONTACTO, type Contacto } from '../data/config'
import { telas as telasDefault, type Tela } from '../data/telas'
import { testimonios as testimoniosDefault, type Testimonio } from '../data/testimonios'

export const useContacto = createLocalStoreHook<Contacto>('viki-admin-contacto', DEFAULT_CONTACTO)
export const useTelasStore = createLocalStoreHook<Tela[]>('viki-admin-telas', telasDefault)
export const useTestimoniosStore = createLocalStoreHook<Testimonio[]>(
  'viki-admin-testimonios',
  testimoniosDefault,
)

export type { Contacto, Tela, Testimonio }
