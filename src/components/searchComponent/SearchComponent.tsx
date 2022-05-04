import React, { ChangeEvent, useState } from 'react'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Button, TextField, styled } from '@mui/material'
import * as yup from 'yup'

const FormContainer = styled('form')`
  display: flex;
  margin: 32px auto;
  gap: 16px;
  width: 80%;
  ${({ theme }) => theme.breakpoints.down('md')} {
    width: 100%;
    padding: 0 32px;
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    width: 100%;
    margin: 32px 0;
    gap: 32px;
  }
`

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
  getAllPhotos: () => void
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
    const value: string = event.target.value
    setSol(value)
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
        <InputLabel id="demo-simple-select-label">Kinde of rover</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={rover}
          label="Kinde of camera"
          onChange={handleChange}
          required
        >
          <MenuItem value={'curiosity'}>curiosity</MenuItem>
          <MenuItem value={'opportunity'}>Opportunity</MenuItem>
          <MenuItem value={'spirit'}>Spirit</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        sx={{ width: { sm: 'calc((100% - 3 * (16px))/4)', xs: '100%' } }}
      >
        <InputLabel id="demo-simple-select-label">Camera</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={camera}
          label="Kinde of rover"
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
        id="outlined-error-helper-text"
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
