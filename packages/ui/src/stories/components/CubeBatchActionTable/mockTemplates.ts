import { GetCubeBatchActionTable } from '@components/CubeBatchActionTable'

export type MockTemplate = {
  id: string
  template: string
  description: string
}

export const TemplateTable = GetCubeBatchActionTable<MockTemplate>()

export const mockTemplates: MockTemplate[] = [
  {
    id: 'template-1',
    template: 'Administrative Level Notification',
    description: `Configure how you are going to be notified for system events and host alerts, including levels 'warning', 'error', and 'critical'.`,
  },
  {
    id: 'template-2',
    template: 'User Account Alert',
    description:
      'Receive notifications when user accounts are created, deleted, or have login failures exceeding the threshold.',
  },
  {
    id: 'template-3',
    template: 'System Maintenance Reminder',
    description:
      'Set up periodic notifications for upcoming system maintenance, including scheduled downtime and required updates.',
  },
]
