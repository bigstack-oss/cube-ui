import { useState } from 'react'
import { CubeOverflowMenu } from '@components/CubeOverflowMenu/CubeOverflowMenu'
import { OverflowMenuTrigger } from './OverflowMenuTrigger'

const adminValues = [1, 2, 3] as const
const memberValues = [4, 5, 6] as const

export const CheckMarkOverflowMenu = () => {
  const [adminValue, setAdminValue] = useState<(typeof adminValues)[number]>(1)

  const [memberValue, setMemberValue] =
    useState<(typeof memberValues)[number]>(4)

  return (
    <CubeOverflowMenu triggerElement={<OverflowMenuTrigger />}>
      <CubeOverflowMenu.Title>Admin</CubeOverflowMenu.Title>
      {adminValues.map((value) => (
        <CubeOverflowMenu.Item
          key={value}
          type="check-mark"
          title={`Option Title ${value}`}
          boldTitle={adminValue === value}
          isChecked={adminValue === value}
          disabled={value === 3}
          onClick={() => setAdminValue(value)}
        />
      ))}
      <CubeOverflowMenu.Title>Member</CubeOverflowMenu.Title>
      {memberValues.map((value) => (
        <CubeOverflowMenu.Item
          key={value}
          type="check-mark"
          title={`Option Title ${value}`}
          boldTitle={memberValue === value}
          isChecked={memberValue === value}
          disabled={value === 6}
          onClick={() => setMemberValue(value)}
        />
      ))}
    </CubeOverflowMenu>
  )
}
