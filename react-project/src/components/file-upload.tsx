import { Container, Input, Button} from './styles';
import { ChangeEvent, useState } from 'react'

function FileToUpload() {
  const [file, setFile] = useState<File>()

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
      const response = await fetch('https://httpbin.org/post', {
        method: 'POST',
        body: file,
        // 👇 Set headers manually for single file upload
        headers: {
          'content-type': file.type,
          'content-length': `${file.size}`, // 👈 Headers need to be a string
        },
      })
      console.log(await response.json())
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Container>
      <h1>Escolha o arquivo para fazer o upload</h1>
      <Input>
        <input type="file" onChange={handleFileChanged} />
      </Input> 
      <Button>
        <button onClick={handleUploadClicked}>Upload</button> 
      </Button>
    </Container>
  )
}

export default FileToUpload
