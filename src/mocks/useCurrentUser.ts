import {faker} from '@faker-js/faker';

const FAKE_USER = {
  userId: faker.datatype.uuid(),
  name: faker.name.fullName(),
};
// @TODO mock #issueNumber
export const useCurrentUser = () => FAKE_USER;
