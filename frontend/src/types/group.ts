
// -----------------------------------------------------------------------------
// File: group.ts
// Description: TypeScript interfaces for Dhukuti group and member data models.
// Author: [Your Name]
// Created: [Date]
// -----------------------------------------------------------------------------

/**
 * Member interface
 * Represents a member of a Dhukuti group.
 */
export interface Member {
  name: string;
  avatar?: string;
}

/**
 * Group interface
 * Represents a Dhukuti group and its properties.
 */
export interface Group {
  id: number;
  name: string;
  members_list: Member[];
  frequency: string;
  members: number;
  description?: string;
  amount: number;
  start_date: string;
}
