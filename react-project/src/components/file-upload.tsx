import { Container, Input, Button } from './styles'
import { ChangeEvent, useState } from 'react'

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
      const response = await fetch('http://localhost:3001', {
        method: 'GET',
        // body: file,
        // headers: {
        //   'content-type': file.type,
        //   'content-length': `${file.size}`,
        // },
      })
      console.log(await response.json())
      setMessageUpload('Upload do arquivo feito com sucesso')
    } catch (error) {
      console.error(error)
      setMessageUpload('Erro ao fazer o upload do arquivo')
    }
    setButtonBlock(false)
    setIsUpload(true)
  }

  return (
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
  )
}

export default FileToUpload
