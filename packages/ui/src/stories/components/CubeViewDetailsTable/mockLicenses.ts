import { upperFirst } from 'lodash'
import { GetCubeViewDetailsTable } from '@components/CubeViewDetailsTable'
import type { CubeViewDetailsTableDetailItem } from '@components/CubeViewDetailsTable'

export type MockLicense = {
  id: string
  product: string
  name: string
  hosts: string[]
  issueDate: string
  expireDate: string
  expired: string
  type: string
  quantity: number
  supportPlan: string
  feature: string
}

export const LicenseTable = GetCubeViewDetailsTable<MockLicense>()

export const mockLicenses: MockLicense[] = [
  {
    id: '1',
    product: 'CubeCOS',
    name: 'License for COS',
    hosts: ['Dell01', 'Dell02', 'Dell03'],
    issueDate: '2025/04/17',
    expireDate: '2025/05/16',
    expired: 'in 30 days',
    type: 'Trial',
    quantity: 1,
    supportPlan: 'Plan A',
    feature: 'virtualization',
  },
  {
    id: '2',
    product: 'CubeCMP',
    name: 'License for CMP',
    hosts: ['Dell04', 'Dell05', 'Dell06'],
    issueDate: '2025/04/17',
    expireDate: '2025/05/16',
    expired: 'in 30 days',
    type: 'Trial',
    quantity: 2,
    supportPlan: 'Plan B',
    feature: 'kubernetes',
  },
]

export const isCmpLicense = (license: MockLicense): boolean => {
  return license.product.toLowerCase().includes('cmp')
}

export const getLicenseDetailItems = (
  license: MockLicense,
): CubeViewDetailsTableDetailItem[] => [
  { title: 'Quantity', value: license.quantity },
  { title: 'Support Plan', value: license.supportPlan },
  { title: 'Feature', value: upperFirst(license.feature) },
]

// CMP licenses get extra items, to show details that differ per row.
export const getDynamicDetailItems = (
  license: MockLicense,
): CubeViewDetailsTableDetailItem[] => {
  const items = getLicenseDetailItems(license)
  if (isCmpLicense(license)) {
    items.push(
      { title: 'CMP Item A', value: 'AAA' },
      { title: 'CMP Item B', value: 'BBB' },
      { title: 'CMP Item C', value: 'CCC' },
      { title: 'CMP Item D', value: 'DDD' },
    )
  }
  return items
}

export const getDynamicDetailTitle = (license: MockLicense): string => {
  let title = 'License Detail'
  if (isCmpLicense(license)) {
    title += ' (I have extra details)'
  }
  return title
}
