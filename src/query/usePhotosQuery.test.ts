import {renderHook} from '@testing-library/react-hooks';
import {usePhotosQuery} from './usePhotosQuery';
import {getAlbums} from '../api/getAlbums';
import {wrapper} from '../utils/testUtitlity';

jest.mock('../api/getAlbums');

const MOCK_DATA = [
  {id: 1, title: 'Photo 1'},
  {id: 2, title: 'Photo 2'},
];
describe('usePhotosQuery', () => {
  test('fetches photos correctly', async () => {
    getAlbums.mockResolvedValueOnce(MOCK_DATA);

    const {result, waitForNextUpdate} = renderHook(() => usePhotosQuery(), {
      wrapper,
    });

    // Wait for the initial data to be fetched
    await waitForNextUpdate();

    const {data} = result.current;
    expect(data.pages).toEqual(MOCK_DATA);

    expect(getAlbums).toHaveBeenCalledTimes(1);
  });
});
