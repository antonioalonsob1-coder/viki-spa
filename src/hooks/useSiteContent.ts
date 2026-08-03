import { createApiObjectStoreHook, createApiListStoreHook } from './useContentStore'
import { DEFAULT_CONTACTO, type Contacto } from '../data/config'
import { telas as telasDefault, type Tela } from '../data/telas'
import { testimonios as testimoniosDefault, type Testimonio } from '../data/testimonios'

export const useContacto = createApiObjectStoreHook<Contacto>('/api/contacto', DEFAULT_CONTACTO)
export const useTelasStore = createApiListStoreHook<Tela>('/api/telas', telasDefault)
export const useTestimoniosStore = createApiListStoreHook<Testimonio>('/api/testimonios', testimoniosDefault)

export type { Contacto, Tela, Testimonio }
