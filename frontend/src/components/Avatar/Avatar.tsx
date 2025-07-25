
// -----------------------------------------------------------------------------
// File: Avatar.tsx
// Description: Wrapper component for Boring Avatars to display user avatars.
// Author: [Your Name]
// Created: [Date]
// -----------------------------------------------------------------------------


import Avatar from "boring-avatars";

/**
 * UserAvatar Component
 * Renders a customizable avatar using the Boring Avatars library.
 * @param name - The name to generate the avatar from
 * @param size - The size of the avatar (default: 36)
 * @param round - The border radius for the avatar (default: 36)
 */

/**
 * Props for UserAvatar component
 */
interface UserAvatarProps {
  name: string;
  size?: number;
  round?: number;
}

/**
 * UserAvatar Component
 * Renders a customizable avatar using the Boring Avatars library.
 * @param name - The name to generate the avatar from
 * @param size - The size of the avatar (default: 36)
 * @param round - The border radius for the avatar (default: 36)
 */
export default function UserAvatar({ name, size = 36, round = 36 }: UserAvatarProps) {
  return <Avatar name={name} size={size} round={round} />;
}
