//import { IonAvatar, IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react'
//import { Patient } from '~/shared/types/patient'
//import avatar_svg from '~/shared/assets/avatar.svg'
//import { ROUTES } from '~/shared/constants/routes'

import { IonCard, IonCheckbox } from '@ionic/react'
import { Medication } from '~/shared/types/medication'

interface Props {
  medication: Medication
}

export function MedicationCard({ medication }: Props) {
  return (
    <IonCard className="bg-white rounded shadow-md">
      <div className="grid grid-cols-5 gap-1">
        <div className="col-span-1 p-2 flex flex-col justify-center items-center">
          <span className="text-text-color">{medication.time}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-pill h-9 w-9"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#050315"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />{' '}
            <path d="M4.5 12.5l8 -8a4.94 4.94 0 0 1 7 7l-8 8a4.94 4.94 0 0 1 -7 -7" />{' '}
            <path d="M8.5 8.5l7 7" />{' '}
          </svg>
        </div>
        <div className="col-span-3 p-2">
          <div>
            <h3 className="font-bold text-text-color mt-0 mb-0">{medication.medicament}</h3>
          </div>
          <span className="text-text-color">{medication.dosage}</span>
        </div>
        <div className="col-span-1 p-4 flex items-center justify-center">
          <IonCheckbox style={{ '--size': '40px' }} />
        </div>
      </div>
    </IonCard>
  )
}
