import { useCallback, useEffect, useState } from 'react'
import { SearchComponent } from './components/searchComponent/SearchComponent'
import './App.css'
import { getMaxSol, getPlanat } from './servises/api'
import { toast } from 'react-toastify'
import { AxiosResponse } from 'axios'
import { PhotoList } from './components/photoList/PhotoList'

function App() {
  const [photos, setPhotos] = useState<IPhoto[]>([])
  const [page, setPage] = useState<number>(1)
  const [rover, setRover] = useState<string>('')
  const [camera, setCamera] = useState<string>('')
  const [maxSol, setMaxSol] = useState<number>(0)
  const [sol, setSol] = useState<string>('')

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
    try {
      const response: AxiosResponse = await getPlanat(
        pageToLoad,
        rover,
        sol,
        camera
      )
      console.log(response.data.photos)

      setPhotos((prevState) =>
        pageToLoad === 1
          ? response.data.photos
          : [...prevState, ...response.data.photos]
      )
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
      <PhotoList photos={photos} />

      <button type="button" onClick={handlLoadMore} className="Button">
        Load more
      </button>
    </>
  )
}

export default App
