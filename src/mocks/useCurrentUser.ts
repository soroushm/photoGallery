import {faker} from '@faker-js/faker';
import {useMemo} from 'react';

// @TODO mock #issueNumber
export const useCurrentUser = () =>
  useMemo(
    () => ({
      userId: faker.datatype.uuid(),
      name: faker.name.fullName(),
    }),
    [],
  );
