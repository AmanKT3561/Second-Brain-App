import './index.css'
import {Button} from "./componenents/ui/Buttons"
import { PlusIcon } from './componenents/ui/icons/PlusIcon'

function App() {
  return (
    <>
      <Button startIcon = {<PlusIcon size="sm" />} size = "lg" variant="Primary" text="Hello" />
      <Button size = "lg" variant="Secondary" text="World" />
    </>
  )
}

export default App
