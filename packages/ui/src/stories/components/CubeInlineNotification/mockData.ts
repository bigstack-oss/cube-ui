import type { CubeNotificationLink } from '@components/CubeNotification/cubeNotificationTypes'

export const notificationTitle = 'Notification title goes here'

export const notificationContent = 'Content text goes here.'

export const longNotificationContent =
  'Lorem ipsum dolor sit amet consectetur. Metus velit tincidunt hendrerit lectus ornare sed. Et adipiscing scelerisque id posuere. Senectus gravida risus vitae est. Tortor laoreet molestie semper consectetur non mauris dui ut at. Risus egestas lectus euismod pretium volutpat donec. Sem mauris posuere risus et aliquet. Hendrerit sit sed dictum cras sed morbi. Vel nibh nisl sed et dolor rhoncus id gravida sit. Pulvinar lacinia viverra sed sed dolor.'

export const createLink = (): CubeNotificationLink => ({
  text: 'Go to the page',
  href: `/#${Math.random()}`,
})
