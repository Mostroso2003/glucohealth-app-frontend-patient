export function isMedicationInTakingRange(takingTimestamp: Date): boolean {
  const currentDate = new Date()

  const upperTimestampBound = new Date(takingTimestamp)
  upperTimestampBound.setMinutes(upperTimestampBound.getMinutes() + 30)

  return takingTimestamp <= currentDate && currentDate <= upperTimestampBound
}
