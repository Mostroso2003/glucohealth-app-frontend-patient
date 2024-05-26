//import { IonAvatar, IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react'
//import { Patient } from '~/shared/types/patient'
//import avatar_svg from '~/shared/assets/avatar.svg'
//import { ROUTES } from '~/shared/constants/routes'

import { IonCard, IonCheckbox, IonIcon } from '@ionic/react'
import { Medication } from '~/shared/types/medication'
import pill_svg from '~/shared/assets/pill.svg'

interface Props {
  medication: Medication
}

export function MedicationCard({ medication }: Props) {
  let isDarkMode = matchMedia('(prefers-color-scheme: dark)').matches

  return (
    <IonCard className="rounded shadow-md">
      <div className="grid grid-cols-5 gap-1">
        <div className={`col-span-1 p-2 flex flex-col justify-center items-center ${isDarkMode ? 'bg-bg-datetime-customized-color-dark' : 'bg-bg-datetime-customized-color-light'}`}>
          <span className={`font-bold ${isDarkMode ? 'text-primary-color' : 'text-accent-color'}`}>{medication.time}</span>
          <div className=' rounded-full w-10'>
            <IonIcon className='ml-1 mt-1' icon={pill_svg} size="large" color={`${isDarkMode ? 'primary' : 'accent'}`}></IonIcon>
          </div>
        </div>
        <div className="col-span-3 p-2">
          <div>
            <h3 className="font-bold text-base text-text-color mt-0 mb-0">
              {medication.medicament}
            </h3>
          </div>
          <span className="text-text-color">{medication.dosage}</span>
        </div>
        <div className="col-span-1 p-4 flex items-center justify-center">
          <IonCheckbox style={{ '--size': '40px' }} mode="ios" />
        </div>
      </div>
    </IonCard>
  )
}
