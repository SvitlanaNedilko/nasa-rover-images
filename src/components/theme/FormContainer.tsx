import { styled } from '@mui/material'

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

export default FormContainer
