import { GetCubeBasicTable } from '@components/CubeBasicTable'

export type MockEvent = {
  id: string
  type: string
  eventId: string
  description: string
  host: string
  category: string
  service: string
  metadata: string
  time: string
}

export const EventTable = GetCubeBasicTable<MockEvent>()

export const mockEvents: MockEvent[] = Array.from(
  { length: 5 },
  (_, index) => ({
    id: String(index),
    type: 'Info',
    eventId: 'NET00003I',
    description:
      'instance "940c6a1f-1f42-4152-a87e-56c0309939df" at 192.0.2.8 is reachable',
    host: 'dell13',
    category: 'Net',
    service: 'neutron',
    metadata: 'id:940c6a1f-1f42-4152a87e-56c0309939df',
    time: 'yyyy/mm/dd 00:00',
  }),
)
