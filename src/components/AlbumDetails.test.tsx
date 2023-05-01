import React from 'react';
import {render} from '@testing-library/react-native';
import {AlbumDetails} from './AlbumDetails';
import {createMockAlbum} from '../mocks/albums';
import {wrapper} from '../utils/testUtitlity';
describe('AlbumDetails', () => {
  const album = createMockAlbum();

  it('renders album title', async () => {
    const {getByText} = render(<AlbumDetails album={album} visible />, {
      wrapper,
    });
    const albumTitle = getByText(album.title);
    expect(albumTitle).toBeDefined();
  });
});
