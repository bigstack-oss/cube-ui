import { useCubeUiTranslation } from '@i18n/useCubeUiTranslation'
import type { CubeStatusReactionStatus } from './cubeStatusReactionUtils'

export const useCubeStatusReactionTranslation = (): Record<
  CubeStatusReactionStatus,
  string
> => {
  const { t } = useCubeUiTranslation()

  return {
    neutral: t('component.status.reaction.neutral'),
    success: t('component.status.reaction.success'),
    available: t('component.status.reaction.available'),
    done: t('component.status.reaction.done'),
    error: t('component.status.reaction.error'),
    duplicate: t('component.status.reaction.duplicate'),
    failed: t('component.status.reaction.failed'),
  }
}
