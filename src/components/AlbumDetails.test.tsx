import React from 'react';
import {render, fireEvent, waitFor} from '@testing-library/react-native';

import {AlbumDetails} from './AlbumDetails';
import {createMockAlbum} from '../mocks/albums';
import {wrapper} from '../utils/testUtitlity';
import * as commentQuery from '../query/useCommentsQuery';

describe('AlbumDetails', () => {
  const album = createMockAlbum();
  const fetchNextPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders album title', async () => {
    const {getByText} = render(<AlbumDetails album={album} visible />, {
      wrapper,
    });
    const albumTitle = getByText(album.title);
    expect(albumTitle).toBeDefined();
  });

  it('calls fetchNextPage when user scrolls to the end of the comments list', async () => {
    jest.spyOn(commentQuery, 'useCommentsQuery').mockReturnValueOnce({
      fetchNextPage,
      data: album,
      isFetching: false,
      refetch: jest.fn(),
    });
    const {getByTestId} = render(
      <AlbumDetails album={album} visible={true} />,
      {
        wrapper,
      },
    );
    const commentsFlatList = getByTestId('commentList');

    fireEvent.scroll(commentsFlatList, {
      nativeEvent: {
        contentSize: {height: 600, width: 400},
        contentOffset: {y: 600, x: 0},
        layoutMeasurement: {height: 100, width: 100}, // Dimensions of the device
      },
    });
    waitFor(() => expect(fetchNextPage).toHaveBeenCalledTimes(1));
  });
});
