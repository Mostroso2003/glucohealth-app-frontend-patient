//import { IonAvatar, IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react'
//import { Patient } from '~/shared/types/patient'
//import avatar_svg from '~/shared/assets/avatar.svg'
//import { ROUTES } from '~/shared/constants/routes'

import { IonCard, IonCheckbox } from '@ionic/react'

export function WeekDays() {
  let isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches

  const days = ['D', 'L', 'M', 'M', 'J', 'V', 'S']
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  const date = new Date()
  const firstDay = date.getDate() - date.getDay()

  return (
    <div className={`pt-5 ${isDarkMode ? 'bg-bg-datetime-customized-color-dark' : 'bg-bg-datetime-customized-color-light'}`}>
        <span className="ml-4 font-bold text-lg">
          {months[date.getMonth()]}
        </span>
      <div className="grid grid-cols-7 gap-1 p-4 mt-1 pt-0">
        {days.map((dia, index) => (
          <div
            key={index}
            className={
              index === date.getDay()
                ? 'col-span-1 bg-primary-color-shade text-white rounded flex flex-col items-center p-2'
                : 'col-span-1 flex flex-col items-center p-2'
            }
          >
            <p className="font-bold mt-1 text-2xl">{dia}</p>
            <p>{firstDay + index}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
