export class Student {
  constructor(
    id: number, firstName: string, lastName: string,
    creationTime: Date, lastUpdated: Date, currentMagicSkills: string[],
    desiredMagicSkills: string[], interestedInCourse: string[]
  ) {
    id = id
    firstName = firstName
    lastName = lastName
    creationTime = creationTime
    lastUpdated = lastUpdated
    currentMagicSkills = currentMagicSkills
    desiredMagicSkills = desiredMagicSkills
    interestedInCourse = interestedInCourse
  }
}