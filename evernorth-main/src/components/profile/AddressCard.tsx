import { useState } from 'react';
import { Address } from '../../types/types';
import { MapPin, Plus, Trash2 } from 'lucide-react';

interface Props {
  addresses: Address[];
  onChange: (addresses: Address[]) => void;
}

export default function AddressSection({ addresses, onChange }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState<Partial<Address>>({});

  const handleAdd = () => {
    if (!newAddress.line1 || !newAddress.city || !newAddress.state || !newAddress.zipCode) return;

    onChange([
      ...addresses,
      {
        ...newAddress,
        id: Date.now().toString(),
      } as Address,
    ]);
    setShowForm(false);
    setNewAddress({});
  };

  const handleDelete = (id: string) => {
    onChange(addresses.filter((address) => address.id !== id));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Delivery Addresses</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Address
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 1
              </label>
              <input
                type="text"
                value={newAddress.line1 || ''}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, line1: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Street address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                value={newAddress.line2 || ''}
                onChange={(e) =>
                  setNewAddress({ ...newAddress, line2: e.target.value })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Apartment, suite, etc."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={newAddress.city || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={newAddress.state || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ZIP Code
                </label>
                <input
                  type="text"
                  value={newAddress.zipCode || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zipCode: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Landmark (Optional)
                </label>
                <input
                  type="text"
                  value={newAddress.landmark || ''}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, landmark: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <MapPin className="h-5 w-5 text-gray-400" />
              <div>
                <p className="font-medium">
                  {address.line1}
                  {address.line2 && `, ${address.line2}`}
                </p>
                <p className="text-sm text-gray-500">
                  {address.city}, {address.state} {address.zipCode}
                </p>
                {address.landmark && (
                  <p className="text-sm text-gray-500">
                    Landmark: {address.landmark}
                  </p>
                )}
              </div>
            </div>
            <button
              onClick={() => handleDelete(address.id)}
              className="text-red-600 hover:text-red-700"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}