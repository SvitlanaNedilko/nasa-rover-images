import axios from 'axios'

const apiServise = axios.create({
  baseURL: 'https://api.nasa.gov/mars-photos/api/v1',
})

export function getPlanat(
  page: number,
  kindeOfRover: string,
  sol: string,
  camera: string
) {
  return apiServise.get(
    `/rovers/${kindeOfRover}/photos?sol=${sol}?camera=${camera}&page=${page}&api_key=A2kQ5w9gW9kMUYitoNHhHnh6q97lSzPwrTVU7zUe`
  )
}

export function getMaxSol(kindeOfRover: string) {
  return apiServise.get(
    `/manifests/${kindeOfRover}?api_key=A2kQ5w9gW9kMUYitoNHhHnh6q97lSzPwrTVU7zUe`
  )
}

{
  /* {Array(maxSol)
              .fill(null)
              .map((_, index) => index.toString())
              .map((item: string) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))} */
}
