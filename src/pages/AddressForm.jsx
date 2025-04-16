import { Input } from '@/components/ui/input';
import { Container } from '../components/ui/container';
import React, { useState } from 'react';
import { Label } from '@radix-ui/react-label';
import { Button } from '@/components/ui/button';
import logo from '../assets/tradeway blue 1.png';
// import { Checkbox } from '@radix-ui/react-checkbox';
import { Phone, RotateCcw, ShieldCheck, Check, Ticket, ChevronLeft, ChevronRight } from 'lucide-react';
import DeliveryMethod from '../pages/DeliveryMethod'; // update the path if needed



const AddressForm = () => {
const [showDeliveryMethod, setShowDeliveryMethod] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneNumber: '',
    additionalPhoneNumber: '',
    address: '',
    additionalInformation: '',
    region: '',
    city: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form data submitted:', formData);
  };

  return (
    <Container className="w-full mx-auto p-4">
  <div className="flex items-center justify-between mb-9 w-full">
    <div className="flex items-center w-full">
      <div className="flex-none">
        <img src={logo} alt="Tradeway" className="h-8 md:h-12" />
      </div>
      <div className="flex-grow text-center">
        <h1 className="text-2xl font-medium">Add New Address</h1>
      </div>
      <div className="flex-none">
        
      </div>
  {/* Desktop-only (large screens) */}
<div className="hidden lg:flex items-center gap-10 text-sm text-gray-600">
  <div className="flex gap-2 items-center">
    <Phone className="w-4 h-4" />
    <p>
      Need help? <br />
      <a href="#" className="text-blue-500">Contact us</a>
    </p>
  </div>
  <div className="flex gap-2 items-center">
    <RotateCcw className="w-4 h-4" />
    Easy Returns
  </div>
  <div className="flex gap-2 items-center">
    <ShieldCheck className="w-4 h-4" />
    Secure Payments
  </div>
</div>
 


<div className="lg:hidden mt-6 flex flex-col sm:flex-row sm:justify-between gap-4 text-sm text-gray-700 border-t pt-4">
  <div className="flex items-start gap-2">
    <Phone className="w-4 h-4 mt-1" />
    <p>
      Need help? <br />
      <a href="#" className="text-blue-500">Contact us</a>
    </p>
  </div>
  <div className="flex items-center gap-2">
    <RotateCcw className="w-4 h-4" />
    <span>Easy Returns</span>
  </div>
  <div className="flex items-center gap-2">
    <ShieldCheck className="w-4 h-4" />
    <span>Secure Payments</span>
  </div>
</div>
    </div>
  </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSubmit}>
            {/* SECTION 1: CUSTOMER ADDRESS */}
            <div className="mb-6 border rounded-md">
              <div className="p-4 flex items-center gap-2 border-b">
                <div className=" rounded-full w-4 h-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(51, 54, 63, 1)' }}>
                   <Check width={10} color='white'/></div>
                <h2 className="text-lg ">1. CUSTOMER ADDRESS</h2>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-4">ADD NEW ADDRESS</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1">First Name</label>
                    <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border rounded-md p-2" />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Last Name</label>
                    <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border rounded-md p-2" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="block text-sm mb-1">Phone Number</Label>
                    <div className="flex">
                      <div className=" px-2 py-2 text-sm font-bold">+234</div>
                      <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border rounded-r-md p-2" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Additional Phone Number</label>
                    <div className="flex">
                      <div className=" px-2 py-2 text-sm font-bold">+234</div>
                      <Input type="text" name="additionalPhoneNumber" value={formData.additionalPhoneNumber} onChange={handleChange} className="w-full border rounded-r-md p-2" />
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <Label className="block text-sm mb-1">Address</Label>
                  <Input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border rounded-md p-2" />
                </div>

                <div className="mb-4">
                  <Label className="block text-sm mb-1">Additional Information</Label>
                  <Input type="text" name="additionalInformation" value={formData.additionalInformation} onChange={handleChange} className="w-full border rounded-md p-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label className="block text-sm mb-1">Region</Label>
                    <select name="region" value={formData.region} onChange={handleChange} className="w-full border rounded-md p-2 appearance-none bg-white">
                      <option value="">Please select</option>
                      <option value="north">North</option>
                      <option value="south">South</option>
                      <option value="east">East</option>
                      <option value="west">West</option>
                    </select>
                  </div>
                  <div>
                    <Label className="block text-sm mb-1">City</Label>
                    <select name="city" value={formData.city} onChange={handleChange} className="w-full border rounded-md p-2 appearance-none bg-white">
                      <option value="">Please select</option>
                      <option value="lagos">Lagos</option>
                      <option value="abuja">Abuja</option>
                      <option value="port-harcourt">Port Harcourt</option>
                      <option value="kano">Kano</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-8">
                  <button type="button" className="px-4 py-2 text-blue-600">Cancel</button>
                  <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</Button>
                </div>
              </div>
            </div>

        <div className="mb-6 border rounded-md">
          <div 
            className="p-4 flex items-center justify-between gap-2 border-b cursor-pointer"
            onClick={() => setShowDeliveryMethod(prev => !prev)}
          >
            <div className="flex items-center gap-2">
              <div className="rounded-full w-4 h-4 flex items-center justify-center" style={{ backgroundColor: 'rgba(51, 54, 63, 1)' }}>
                <Check width={10} color='white' />
              </div>
              <h2 className="text-lg">2. DELIVERY DETAILS</h2>
            </div>
            {showDeliveryMethod ? <ChevronLeft/> : <ChevronRight />}
          </div>

          {showDeliveryMethod && (
            <div className="p-4">
              <DeliveryMethod />
            </div>
          )}
        </div>


            <div className="mb-6 border rounded-md">
              <div className="p-4 flex items-center gap-2 border-b">
                <div className=" rounded-full w-4 h-4 flex items-center justify-center"style={{ backgroundColor: 'rgba(51, 54, 63, 1)' }}><Check width={10} color='white'/></div>
                <h2 className="text-lg ">3. PAYMENT METHOD</h2>
              </div>
            </div>
        
          </form>
         
        </div>
        

        <div className="w-full lg:w-1/3 order-last">
          <div className=" rounded-md p-4">
       
            <div className="border rounded-md p-4 mt-4">
              <h2 className="font-bold mb-4">Order summary</h2>
              <div className="flex justify-between text-sm mb-2">
                <span>Item’s total(3)</span>
                <span className="font-medium">₦24,200</span>
              </div>
              <div className="flex justify-between text-base font-semibold border-t pt-2 mb-2">
                <span>Total</span>
                <span>₦24,200</span>
              </div>
              <div className=" flex items-center text-sm text-gray-600 mb-4 border-t border-b p-4">
              <Ticket color='blue'/>
                <span className="inline-block  rounded px-2 py-1 text-xs">You will be able to add a voucher <br /> when selecting your payment method</span>
              </div>
              <Button className="w-full bg-gray-400 text-white cursor-not-allowed" disabled>
                Confirm Order
              </Button>
              <p className="text-xs text-center text-gray-500 mt-2">(Complete the steps in order to proceed)</p>
              
            </div>
            <p className="text-xs text-center text-gray-500 mt-4">
                By proceeding, you are automatically accepting the <br />
                 <a href="#" className="text-blue-500 underline">Terms & Conditions</a>
              </p>
          </div>
        </div>
      </div>

    </Container>
  );
};

export default AddressForm;
