import { Container, Input, Button } from './styles'
import { ChangeEvent, useState } from 'react'
import axios from 'axios'
import NavBar from '../../components/nav/nav-bar'
import { Config } from '../../config'

function FileToUpload() {
  const [file, setFile] = useState<File>()
  const [buttonBlock, setButtonBlock] = useState<boolean>(false)
  const [isUpload, setIsUpload] = useState<boolean>(false)
  const [messageUpload, setMessageUpload] = useState<string>('')

  const handleFileChanged = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0])
    }
  }

  const handleUploadClicked = async (): Promise<void> => {
    if (!file) {
      return
    }

    try {
      setButtonBlock(true)
      const formData = new FormData()
      formData.append('file', file)
      const response = await axios({
        url: Config.API_URL,
        method: 'post',
        headers: {
          'content-type': file.type,
          'content-length': `${file.size}`,
        },
        data: formData,
      }).then((r) => r)

      console.log(file)
      console.log(await response)
      setMessageUpload('Upload do arquivo feito com sucesso')
    } catch (error) {
      console.error(error)
      setMessageUpload('Erro ao fazer o upload do arquivo')
    }
    setButtonBlock(false)
    setIsUpload(true)
  }

  return (
    <>
      <NavBar />
      <Container>
        {isUpload ? (
          <h2>{messageUpload}</h2>
        ) : (
          <>
            <h1>Escolha o arquivo para fazer o upload</h1>
            <Input>
              <input type="file" onChange={handleFileChanged} />
            </Input>
            <Button>
              <button onClick={handleUploadClicked} disabled={buttonBlock}>
                {buttonBlock ? 'Uploading' : 'Upload'}
              </button>
            </Button>
          </>
        )}
      </Container>
    </>
  )
}

export default FileToUpload
