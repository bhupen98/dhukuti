import { User } from './auth'
import { Group } from './groups'

export interface Event {
  id: string
  title: string
  description: string
  organizerId: string
  groupId?: string
  startDate: Date
  endDate: Date
  location: string
  capacity: number
  currentAttendees: number
  ticketPrice: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

export interface EventAttendee {
  id: string
  eventId: string
  userId: string
  status: 'REGISTERED' | 'CONFIRMED' | 'ATTENDED' | 'CANCELLED'
  registeredAt: Date
  confirmedAt?: Date
  attendedAt?: Date
}

export type EventWithAttendees = Event & {
  organizer: User
  group?: Group
  attendees: EventAttendee[]
}
