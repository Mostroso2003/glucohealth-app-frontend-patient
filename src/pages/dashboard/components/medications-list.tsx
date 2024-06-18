import {
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
} from '@ionic/react'
import { Fragment } from 'react'
/* import { MedicationCard } from './medication-card' */
import { getPaginatedPatients } from '~/features/patients/services/get-paginated'
import { useInfiniteQuery } from '@tanstack/react-query'
import { QUERY_KEYS } from '~/features/patients/constants'

const INITIAL_PAGE = 1
const ITEMS_PER_PAGE = 5

export function PatientsList() {
  //const { data, isError, fetchNextPage } = useInfiniteQuery({
  //  queryKey: [QUERY_KEYS.PATIENTS_LIST],
  //   queryFn: ({ pageParam }) => {
  //     console.log('pageParam', pageParam)
  //     return getPaginatedPatients({
  //       pageIndex: pageParam,
  //       itemsPerPage: ITEMS_PER_PAGE,
  //     })
  //   },
  //  initialPageParam: INITIAL_PAGE,
  //  getNextPageParam: lastPage => lastPage.pageIndex + 1,
  //})

  //if (isError) {
  //  return <h1>Error listando las medicaciones.</h1>
  //}

  const data = ['a', 'b']
  
  return (
    <>
      <IonList className="overflow-y-scroll max-w-xl gap-5 w-full">
        {/* {data.map(medication => (
          <MedicationCard key={medication} medication={medication} />
        ))} */}
      </IonList>
    </>
  )
}
