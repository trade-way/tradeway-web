import { Container } from "@/components/ui/container"
import {   MapPin, ChevronRight, ChevronLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import DeliveryImg from '../components/DeliveryImage';



export default function DeliveryMethod() {
  return (
    <Container className="w-full mx-auto p-4">


      {/* Main Content */}
        <div className="flex-1 space-y-6">

      

          {/* Delivery Details */}
          <div className="border rounded-md p-4">
       
            <div className="flex justify-between items-center mt-2">
              <div className="flex items-center gap-2">
                <input 
                  type="radio" 
                  name="deliveryMethod" 
                  className="w-4 h-4 text-blue-500 border-gray-300 focus:ring-blue-500"
                />
                <div>
                  <p className="text-sm">Pick-up Station (from ₦24,200)</p>
                  <p className="text-xs text-gray-500">Delivery between 09 April and 14 April.</p>
                </div>
              </div>
            </div>

            <div className="border mt-4 p-4 rounded-md">
              <div className="p-2 border-b flex items-center gap-2">
                <p>Pick Up Station</p>
               
                <a href="#" className="text-blue-500 text-sm flex ml-auto">Select pickup station <ChevronRight /></a>
              
              </div>
              <div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-blue-500 mt-4 " />
                <p className="text-sm p-2">No Pick-up Station Selected</p>
              </div>
              <p className="text-xs text-gray-500 mt-1 ml-9 ">
                To use this option you will need to add a pick-up station near your location
              </p>
              </div>
            
            
            </div>

           

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {[1, 2].map((shipment) => (
                  <div key={shipment}>
                    <h3 className="text-sm mb-1">Shipment {shipment}/2</h3>
                    <div className="border rounded-md p-4">
                      <p className="text-sm text-gray-600">Pick up Station</p>
                      <p className="text-xs text-gray-500 mb-2">Delivery between 09 April and 14 April.</p>
                      {[1, 2].map((item) => (
                        <div key={item} className="flex items-center gap-2 mb-2">
                          <img
                            src={DeliveryImg}
                            alt="Product"
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="text-xs">
                            <p>Triomphe Metal Celine sunglasses</p>
                            <p>Variation: Rose Gold</p>
                            <p>QTY: 1</p>
                            <p className="text-blue-500">Tradeway @Express</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

            <div className="flex justify-end">
              <Button disabled className="mt-4 w-45 bg-gray-400 text-white cursor-not-allowed h-14">
                Confirm delivery details
              </Button>
            </div>

          </div>

          
         

          <a href="#" className="text-blue-500 text-sm flex"> <ChevronLeft /> Go back and continue shopping</a>
        </div>
      
    </Container>
  )
}
