import { defaultConfigSetting } from '~@/config/default-config-setting'
import type { ConfigType } from '~@/types/config'

export const useConfigStore = defineStore('config', () => {
  const setting = reactive<ConfigType>(defaultConfigSetting)
  function set<K extends keyof ConfigType>(key: K, value: ConfigType[K]) {
    setting[key] = value
  }
  function get<K extends keyof ConfigType>(key: K) {
    return setting[key]
  }
  return {
    setting,
    set,
    get,
  }
})
