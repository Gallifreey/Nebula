export const STORAGE_AUTHORIZE_KEY = 'Authorization'
export const STORAGE_USER_ID_KEY = 'id'

export const useAuthorization = createGlobalState(() => useStorage<null | string>(STORAGE_AUTHORIZE_KEY, null))

export const useUserID = createGlobalState(() => useStorage<null | number>(STORAGE_USER_ID_KEY, null))
