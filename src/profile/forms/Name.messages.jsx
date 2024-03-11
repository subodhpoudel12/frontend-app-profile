import { defineMessages } from '@edx/frontend-platform/i18n';

const messages = defineMessages({
  'profile.phone.label': {
    id: 'profile.phone.label',
    defaultMessage: 'Phone Number',
    description: 'A section of a user profile for the phone number',
  },
  'profile.phone.details': {
    id: 'profile.phone.details',
    defaultMessage: 'This is the phone number associated with your account.',
    description: 'Describes the area for a user to update their phone number.',
  },
  'profile.phone.empty': {
    id: 'profile.phone.empty',
    defaultMessage: 'Add phone number',
    description: 'The affordance to add a phone number to a user’s profile.',
  },
});

export default messages;
