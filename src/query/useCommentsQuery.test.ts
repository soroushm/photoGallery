import {renderHook} from '@testing-library/react-hooks';
import {useCommentsQuery} from './useCommentsQuery';
import {getComments} from '../api/getComments';
import {wrapper} from '../utils/testUtitlity';

jest.mock('../api/getComments');

const MOCK_DATA = [
  {id: 1, title: 'Comment 1'},
  {id: 2, title: 'Comment 2'},
];
describe('usePhotosQuery', () => {
  test('fetches photos correctly', async () => {
    getComments.mockResolvedValueOnce(MOCK_DATA);

    const {result, waitForNextUpdate} = renderHook(() => useCommentsQuery(), {
      wrapper,
    });

    // Wait for the initial data to be fetched
    await waitForNextUpdate();

    const {data} = result.current;
    expect(data.pages).toEqual(MOCK_DATA);

    expect(getComments).toHaveBeenCalledTimes(1);
  });
});
