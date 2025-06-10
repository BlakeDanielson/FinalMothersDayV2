export const getSourceBadgeColor = (source?: string) => {
  switch (source) {
    case 'PREDEFINED':
      return 'bg-blue-100 text-blue-800';
    case 'AI_GENERATED':
      return 'bg-purple-100 text-purple-800';
    case 'USER_CREATED':
      return 'bg-green-100 text-green-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}; 