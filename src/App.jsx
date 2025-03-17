import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Home } from "lucide-react"
import { Input } from "./components/ui/input";

function App() {
  return (
    <Container>
      <div className="">
        <p>Forgot Password?</p>
        <p>Enter your email address, and we'll send you a link to reset your password.</p>
      </div>

      <div>
        <Input type="email" placeholder="Email" />
        <Button className="w-full">Button</Button>
      </div>
    </Container>
  )
}

export default App;
