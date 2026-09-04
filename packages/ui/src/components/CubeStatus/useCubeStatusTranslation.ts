import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'

export const useCubeStatusTranslation = (): Record<string, string> => {
  const { t } = useCubeUiTranslation()

  return {
    neutral: t('component.status.host.neutral'),
    'in-use': t('component.status.host.inUse'),
    finished: t('component.status.host.finished'),
    ok: t('component.status.host.ok'),
    success: t('component.status.host.success'),
    active: t('component.status.host.active'),
    available: t('component.status.host.available'),
    'powering on': t('component.status.host.poweringOn'),
    warning: t('component.status.host.warning'),
    error: t('component.status.host.error'),
    fail: t('component.status.host.fail'),
    failed: t('component.status.host.failed'),
    stopped: t('component.status.host.stopped'),
    'powering off': t('component.status.host.poweringOff'),
  }
}
