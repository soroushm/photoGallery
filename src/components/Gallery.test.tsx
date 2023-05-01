import React from 'react';
import {render, waitFor, fireEvent} from '@testing-library/react-native';
import {Gallery} from './Gallery';
import {usePhotosQuery} from '../query/usePhotosQuery';
import {wrapper} from '../utils/testUtitlity';

jest.mock('../query/usePhotosQuery');

describe('Gallery', () => {
  const mockData = [
    {
      id: '1',
      thumbnailUrl: 'https://example.com/thumbnail/1.jpg',
    },
    {
      id: '2',
      thumbnailUrl: 'https://example.com/thumbnail/2.jpg',
    },
  ];

  beforeEach(() => {
    (usePhotosQuery as jest.Mock).mockReturnValue({
      data: {pages: mockData},
      fetchNextPage: jest.fn(),
      isFetching: false,
      refetch: jest.fn(),
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the Gallery component and handle interactions', async () => {
    const {getByTestId, queryByTestId, getByText, queryByText} = render(
      <Gallery />,
      {wrapper},
    );

    // Check if the gallery images are rendered
    mockData.forEach(album => {
      expect(getByTestId(`image-${album.id}`)).toHaveProp('source', {
        uri: album.thumbnailUrl,
      });
    });

    // Press on the first image and check if the AlbumDetails is visible
    fireEvent.press(getByTestId(`image-${mockData[0].id}`));
    await waitFor(() => expect(queryByTestId('AlbumDetails')).toBeTruthy());

    // Close the AlbumDetails by calling onRequestClose
    fireEvent.press(getByText('Hide'));
    await waitFor(() => expect(queryByText('AlbumDetails')).toBeNull());
  });
});
