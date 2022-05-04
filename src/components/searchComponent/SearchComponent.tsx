import React, { ChangeEvent, useState } from 'react'
import {
  Button,
  TextField,
  Select,
  SelectChangeEvent,
  InputLabel,
  MenuItem,
  FormControl,
} from '@mui/material'
import * as yup from 'yup'

import FormContainer from '../theme/FormContainer'

const getSchema = (maxSol: number) =>
  yup
    .number()
    .typeError('enter valid number')
    .min(0, 'can not be less than 0')
    .max(maxSol, `can not be more than ${maxSol} `)

const camerasOfRover: Record<string, string[]> = {
  curiosity: ['FHAZ', 'RHAZ', 'MAST', 'CHEMCAM', 'MAHLI', 'MARDI', 'NAVCAM'],
  opportunity: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
  spirit: ['FHAZ', 'RHAZ', 'NAVCAM', 'PANCAM', 'MINITES'],
}

interface ISearchComponentProps {
  maxSol: number
  rover: string
  camera: string
  sol: string
  setRover: (rover: string) => void
  setCamera: (camera: string) => void
  setSol: (sol: string) => void
  getSol: VoidFunction
  getAllPhotos: VoidFunction
}

export const SearchComponent: React.FC<ISearchComponentProps> = ({
  maxSol,
  camera,
  sol,
  getSol,
  getAllPhotos,
  setCamera,
  setSol,
  rover,
  setRover,
}) => {
  const [error, setError] = useState<string>('')

  const handleChange = (event: SelectChangeEvent) => {
    setRover(event.target.value as string)
    getSol()
  }

  const handleChangeCamera = (event: SelectChangeEvent) => {
    setCamera(event.target.value as string)
  }

  const handleChangeSol = (event: ChangeEvent<HTMLInputElement>) => {
    setSol(event.target.value as string)
  }

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault()
      await getSchema(maxSol).validate(sol)
      setError('')
      getAllPhotos()
    } catch (error) {
      setError((error as yup.ValidationError).errors[0])
    }
  }

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormControl
        sx={{ width: { sm: 'calc((100% - 3 * (16px))/4)', xs: '100%' } }}
      >
        <InputLabel id="rover-label">Rover</InputLabel>
        <Select
          labelId="rover-label"
          id="rover"
          value={rover}
          label="Rover"
          onChange={handleChange}
          required
        >
          <MenuItem value={'curiosity'}>Curiosity</MenuItem>
          <MenuItem value={'opportunity'}>Opportunity</MenuItem>
          <MenuItem value={'spirit'}>Spirit</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        sx={{ width: { sm: 'calc((100% - 3 * (16px))/4)', xs: '100%' } }}
      >
        <InputLabel id="camera-label">Camera</InputLabel>
        <Select
          labelId="camera-label"
          id="camera"
          value={camera}
          label="Camera"
          onChange={handleChangeCamera}
          required
        >
          {rover &&
            camerasOfRover[rover].map((camera: string) => (
              <MenuItem key={camera} value={camera}>
                {camera}
              </MenuItem>
            ))}
        </Select>
      </FormControl>

      <TextField
        label="Sol"
        helperText={!!error ? error : `From 0 to ${maxSol}`}
        value={sol}
        onChange={handleChangeSol}
        sx={{ width: { sm: 'calc((100% - 3 * (16px))/4)', xs: '100%' } }}
        error={!!error}
        required
      />

      <Button
        variant="contained"
        type="submit"
        sx={{
          width: { sm: 'calc((100% - 3 * (16px))/4)', xs: '100%' },
          height: '56px',
        }}
      >
        Apply
      </Button>
    </FormContainer>
  )
}
