import { useCallback, useEffect, useState } from 'react'
import { SearchComponent } from './components/searchComponent/SearchComponent'
import './App.css'
import { getMaxSol, getPlanat } from './servises/api'
import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'
import { PhotoList } from './components/photoList/PhotoList'
import { Button, CircularProgress } from '@mui/material'

function App() {
  const [photos, setPhotos] = useState<IPhoto[]>([])
  const [page, setPage] = useState<number>(1)
  const [rover, setRover] = useState<string>('')
  const [camera, setCamera] = useState<string>('')
  const [maxSol, setMaxSol] = useState<number>(0)
  const [sol, setSol] = useState<string>('')
  const [visibleButton, setVisibleButton] = useState<boolean>(false)
  const [status, setStatus] = useState('idle')

  const getSol = useCallback(async () => {
    try {
      if (rover) {
        const response: AxiosResponse = await getMaxSol(rover)
        setMaxSol(response.data.photo_manifest.max_sol)
      }
    } catch (error) {
      toast.error('Something went wrong, refresh the page or try again later')
    }
  }, [rover])

  const getAllPhotos = async (pageToLoad = 1) => {
    console.log(sol)
    setStatus('pending')
    try {
      const response: AxiosResponse = await getPlanat(
        pageToLoad,
        rover,
        sol,
        camera
      )

      setPhotos((prevState) =>
        pageToLoad === 1
          ? response.data.photos
          : [...prevState, ...response.data.photos]
      )

      setStatus('resolved')

      if (response.data.photos.length === 25) {
        setVisibleButton(true)
      }
    } catch (error) {
      toast.error('Something went wrong, refresh the page or try again later')
    }
  }

  const handlLoadMore = () => {
    getAllPhotos(page + 1)
    setPage((prevPage) => prevPage + 1)
  }

  useEffect(() => {
    getSol()
  }, [getSol])

  return (
    <>
      <SearchComponent
        maxSol={maxSol}
        getSol={getSol}
        rover={rover}
        camera={camera}
        sol={sol}
        setSol={setSol}
        setCamera={setCamera}
        setRover={setRover}
        getAllPhotos={getAllPhotos}
      />

      {status === 'idle' ? (
        <h2 style={{ textAlign: 'center' }}>Please, fill form.</h2>
      ) : (
        <PhotoList photos={photos} />
      )}

      {status === 'pending' ? (
        <CircularProgress
          color="info"
          sx={{ display: 'flex', margin: '32px auto' }}
        />
      ) : (
        visibleButton && (
          <Button
            variant="contained"
            onClick={handlLoadMore}
            sx={{ display: 'flex', margin: '32px auto' }}
          >
            Load more
          </Button>
        )
      )}
    </>
  )
}

export default App
