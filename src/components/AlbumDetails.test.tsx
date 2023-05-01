import React from 'react';
import {render} from '@testing-library/react-native';
import {AlbumDetails} from './AlbumDetails';
import {generateMockAlbum} from '../mocks/albums';
import {wrapper} from '../utils/testUtitlity';
describe('AlbumDetails', () => {
  const album = generateMockAlbum();

  it.skip('renders album title', () => {
    const {getByText} = render(<AlbumDetails album={album} visible={true} />, {
      wrapper,
    });
    const albumTitle = getByText(album.title);
    expect(albumTitle).toBeDefined();
  });
});
