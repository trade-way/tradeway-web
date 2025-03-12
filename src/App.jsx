import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Home } from "lucide-react"

function App() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center min-h-svh">
        <Home size={64} />
        <Button>Click me</Button>
      </div>
    </Container>
  )
}

export default App;
