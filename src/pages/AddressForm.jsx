import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Container } from '../components/ui/container';
import { Button } from '@/components/ui/button';
import logo from '../assets/tradeway blue 1.png';
import { Check } from 'lucide-react';
import axios from 'axios';

const AddressForm = () => {
  const [addressComplete, setAddressComplete] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);  // State to track order completion

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

  // Save the address information asynchronously using localStorage
  const handleSaveAddress = (e) => {
    e.preventDefault();
    const { firstName, lastName, phoneNumber, address, region, city } = formData;

    if (firstName && lastName && phoneNumber && address && region && city) {
      try {
        // Save address data asynchronously in localStorage
        localStorage.setItem('userAddress', JSON.stringify(formData));
        setAddressComplete(true);  // Mark address as complete in frontend
      } catch (error) {
        console.error('Error saving address:', error);
        alert('Error saving address. Please try again.');
      }
    } else {
      alert('Please fill out all required fields.');
    }
  };

  // Handle Confirm Order (send address to backend)
  const handleConfirmOrder = async () => {
    const { address } = formData;

    if (addressComplete) {
      try {
        const response = await axios.post('https://tradeway.onrender.com/v1/payments/checkout', {
          address: address
        });

        if (response.status === 201) {
          console.log('Checkout initialized:', response.data);
          setOrderComplete(true);  // Enable the order completion
        } else {
          console.warn('Unexpected response:', response);
          alert('Something went wrong. Please try again.');
        }
      } catch (error) {
        console.error('Axios error:', error);
        alert('Error initializing checkout. Please try again.');
      }
    } else {
      alert('Please complete the address information before confirming the order.');
    }
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
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <form onSubmit={handleSaveAddress}>
            {/* SECTION 1: CUSTOMER ADDRESS */}
            <div className="mb-6 border rounded-md">
              <div className="p-4 flex items-center gap-2 border-b">
                <div className={`rounded-full w-4 h-4 flex items-center justify-center ${addressComplete ? 'bg-green-500' : 'bg-gray-600'}`}>
                  <Check width={10} color='white'/>
                </div>
                <h2 className="text-lg">1. CUSTOMER ADDRESS</h2>
              </div>
              <div className="p-4">
                <h3 className="font-bold mb-4">ADD NEW ADDRESS</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1">First Name</label>
                    <Input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="w-full border rounded-md p-2" required />
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Last Name</label>
                    <Input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="w-full border rounded-md p-2" required />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1">Phone Number</label>
                    <div className="flex">
                      <div className="px-2 py-2 text-sm font-bold">+234</div>
                      <Input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} className="w-full border rounded-r-md p-2" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Additional Phone Number</label>
                    <Input type="text" name="additionalPhoneNumber" value={formData.additionalPhoneNumber} onChange={handleChange} className="w-full border rounded-r-md p-2" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Address</label>
                  <Input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full border rounded-md p-2" required />
                </div>

                <div className="mb-4">
                  <label className="block text-sm mb-1">Additional Information</label>
                  <Input type="text" name="additionalInformation" value={formData.additionalInformation} onChange={handleChange} className="w-full border rounded-md p-2" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm mb-1">Region</label>
                    <select name="region" value={formData.region} onChange={handleChange} className="w-full border rounded-md p-2" required>
                      <option value="">Please select</option>
                      <option value="north">North</option>
                      <option value="south">South</option>
                      <option value="east">East</option>
                      <option value="west">West</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm mb-1">City</label>
                    <select name="city" value={formData.city} onChange={handleChange} className="w-full border rounded-md p-2" required>
                      <option value="">Please select</option>
                      <option value="lagos">Lagos</option>
                      <option value="abuja">Abuja</option>
                      <option value="port-harcourt">Port Harcourt</option>
                      <option value="kano">Kano</option>
                    </select>
                  </div>
                </div>

                <div className="flex justify-end gap-2 mt-8">
                  <Button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Save</Button>
                </div>
              </div>
            </div>
          </form>
        </div>

        {/* Order Summary */}
        <div className="w-full lg:w-1/3 order-last">
          <div className="rounded-md p-4">
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
                <span className="inline-block  rounded px-2 py-1 text-xs">You will be able to add a voucher <br /> when selecting your payment method</span>
              </div>
              <Button 
                onClick={handleConfirmOrder}
                className={`w-full ${orderComplete ? 'bg-blue-600' : 'bg-gray-400'} text-white`} 
                disabled={!addressComplete}  // Enable/Disable based on addressComplete
              >
                Confirm Order
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default AddressForm;
