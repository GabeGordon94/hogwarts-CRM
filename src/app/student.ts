export class Student {
  constructor(
    id: number, firstName: string, lastName: string,
    creationTime: Date, lastUpdated: Date, existingMagicSkills: string[],
    desiredMagicSkills: string[], interestedInCourse: string[]
  ) {
    id = id
    firstName = firstName
    lastName = lastName
    creationTime = creationTime
    lastUpdated = lastUpdated
    existingMagicSkills = existingMagicSkills
    desiredMagicSkills = desiredMagicSkills
    interestedInCourse = interestedInCourse
  }
}