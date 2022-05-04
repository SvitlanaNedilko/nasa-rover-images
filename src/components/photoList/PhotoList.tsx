import { Stack } from '@mui/material'

import { PhotoCard } from '../photoCard/PhotoCard'

interface IPhotoList {
  photos: IPhoto[]
}

export const PhotoList: React.FC<IPhotoList> = ({ photos }) => {
  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      gap={2}
      m={'0 auto'}
      p={0}
      flexWrap="wrap"
      maxWidth="calc(100% - 68px)"
    >
      {photos?.map((photo) => (
        <PhotoCard key={photo.id} photo={photo} />
      ))}
    </Stack>
  )
}
