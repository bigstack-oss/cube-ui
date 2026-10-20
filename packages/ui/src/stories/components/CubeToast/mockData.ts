import type { CubeToastType } from '@components/CubeNotification/CubeToast/cubeToastUtils'

export const toastTitle = 'Notification Title'

export const toastMessage =
  'Subtitle text goes here. Subtitle text goes here. Subtitle text goes here.'

export const toastTime = 'yyyy/mm/dd 00:00'

export const toastLink = { text: 'Call to action', href: '/#toast' }

/**
 * Toasts the "Create Toast" button cycles through. The button adds a fresh
 * `id` each time, so a repeated toast never shares a key with one on screen.
 */
export const mockToasts: Omit<CubeToastType, 'id'>[] = [
  {
    type: 'neutral',
    title: 'Heads up!',
    message: 'This is a neutral notification with general info.',
    time: toastTime,
  },
  {
    type: 'positive',
    title: 'Success!',
    message: 'Your profile was updated successfully.',
    link: { text: 'View Profile', href: '/#profile' },
    time: toastTime,
  },
  {
    type: 'warning',
    title: 'Almost there!',
    message: 'You’re reaching your usage limit. Consider upgrading.',
    link: { text: 'Upgrade Now', href: '/#upgrade' },
    time: toastTime,
  },
  {
    type: 'error',
    title: 'Something went wrong',
    message: 'We couldn’t save your changes. Please try again later.',
    time: toastTime,
  },
  {
    type: 'neutral',
    message: 'Uploading your files…',
    time: toastTime,
  },
]
