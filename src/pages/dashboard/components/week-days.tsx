//import { IonAvatar, IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react'
//import { Patient } from '~/shared/types/patient'
//import avatar_svg from '~/shared/assets/avatar.svg'
//import { ROUTES } from '~/shared/constants/routes'

import { IonCard, IonCheckbox } from '@ionic/react'

export function WeekDays() {
  const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S']
  const date = new Date()
  const firstDay = date.getDate() - date.getDay()

  return (
    <div className="grid grid-cols-7 gap-1 p-4">
      {days.map((dia, index) => (
        <div
          key={index}
          className={
            index === date.getDay()
              ? 'col-span-1 bg-accent-color text-white rounded flex flex-col items-center p-2'
              : 'col-span-1 flex flex-col items-center p-2'
          }
        >
          <p className="text-bold mt-1 text-2xl">{dia}</p>
          <p>{firstDay + index}</p>
        </div>
      ))}
    </div>
  )
}
