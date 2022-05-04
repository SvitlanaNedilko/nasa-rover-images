import { Box, CardMedia } from '@mui/material'

interface IPhotoCardProps {
  photo: IPhoto
}

export const PhotoCard: React.FC<IPhotoCardProps> = ({ photo }) => {
  return (
    <Box
      width={{
        xs: '100%',
        sm: 'calc((100% - 2 * (16px))/3)',
        md: 'calc((100% - 3 * (16px))/4)',
      }}
    >
      <CardMedia
        component="img"
        height={'260px'}
        image={photo.img_src}
        sx={{
          width: '100%',
          margin: 0,
        }}
      />
    </Box>
  )
}
