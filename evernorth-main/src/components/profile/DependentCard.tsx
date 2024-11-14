import { useState } from 'react';
import { Dependent } from '../../types/types';
import { Users, Plus, Trash2, Phone, Mail, AlertCircle } from 'lucide-react';

interface Props {
  dependents: Dependent[];
  onChange: (dependents: Dependent[]) => void;
}

export default function DependentSection({ dependents, onChange }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [newDependent, setNewDependent] = useState<Partial<Dependent>>({});

  const handleAdd = () => {
    if (!newDependent.name || !newDependent.relation || !newDependent.dateOfBirth || 
        !newDependent.mobileNumber || !newDependent.email) return;
    
    if (dependents.length >= 4) {
      alert('Maximum 4 dependents allowed');
      return;
    }

    onChange([
      ...dependents,
      {
        ...newDependent,
        id: Date.now().toString(),
        isEmergencyContact: false
      } as Dependent,
    ]);
    setShowForm(false);
    setNewDependent({});
  };

  const handleDelete = (id: string) => {
    onChange(dependents.filter((dependent) => dependent.id !== id));
  };

  const toggleEmergencyContact = (id: string) => {
    onChange(
      dependents.map(dep => ({
        ...dep,
        isEmergencyContact: dep.id === id
      }))
    );
  };

  const handleEmergencySOS = () => {
    const emergencyContact = dependents.find(dep => dep.isEmergencyContact);
    if (emergencyContact) {
      // In a real application, this would trigger an emergency notification
      alert(`Sending emergency alert to ${emergencyContact.name} at ${emergencyContact.mobileNumber}`);
    } else {
      alert('Please set an emergency contact first');
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center">
          <Users className="h-8 w-8 text-blue-500 mr-3" />
          <h2 className="text-2xl font-semibold text-gray-900">Dependents</h2>
        </div>
        {!showForm && dependents.length < 4 && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Dependent
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-8 p-6 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Add New Dependent</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                value={newDependent.name || ''}
                onChange={(e) =>
                  setNewDependent({ ...newDependent, name: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter full name"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Relation
              </label>
              <select
                value={newDependent.relation || ''}
                onChange={(e) =>
                  setNewDependent({ ...newDependent, relation: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select Relation</option>
                <option value="spouse">Spouse</option>
                <option value="child">Child</option>
                <option value="parent">Parent</option>
                <option value="sibling">Sibling</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Date of Birth
              </label>
              <input
                type="date"
                value={newDependent.dateOfBirth || ''}
                onChange={(e) =>
                  setNewDependent({ ...newDependent, dateOfBirth: e.target.value })
                }
                className="w-full rounded-lg border border-gray-300 shadow-sm py-3 px-4 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Mobile Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="tel"
                  value={newDependent.mobileNumber || ''}
                  onChange={(e) =>
                    setNewDependent({ ...newDependent, mobileNumber: e.target.value })
                  }
                  className="pl-10 w-full rounded-lg border border-gray-300 shadow-sm py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter mobile number"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={newDependent.email || ''}
                  onChange={(e) =>
                    setNewDependent({ ...newDependent, email: e.target.value })
                  }
                  className="pl-10 w-full rounded-lg border border-gray-300 shadow-sm py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
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
              Add Dependent
            </button>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {dependents.map((dependent) => (
          <div
            key={dependent.id}
            className="p-6 border rounded-lg hover:shadow-md transition-shadow"
          >
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <div className="flex items-center">
                  <h3 className="text-lg font-medium text-gray-900">{dependent.name}</h3>
                  {dependent.isEmergencyContact && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Emergency Contact
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-500">
                  {dependent.relation.charAt(0).toUpperCase() + dependent.relation.slice(1)}
                </p>
                <p className="text-sm text-gray-500">
                  Born: {new Date(dependent.dateOfBirth).toLocaleDateString()}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Phone className="h-4 w-4 mr-1" />
                    {dependent.mobileNumber}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Mail className="h-4 w-4 mr-1" />
                    {dependent.email}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleEmergencyContact(dependent.id)}
                  className={`p-2 rounded-md ${
                    dependent.isEmergencyContact
                      ? 'text-red-600 hover:text-red-700'
                      : 'text-gray-400 hover:text-gray-500'
                  }`}
                  title={dependent.isEmergencyContact ? 'Remove as emergency contact' : 'Set as emergency contact'}
                >
                  <AlertCircle className="h-5 w-5" />
                </button>
                <button
                  onClick={() => handleDelete(dependent.id)}
                  className="p-2 text-gray-400 hover:text-red-600 rounded-md"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Emergency SOS Button */}
      {dependents.length > 0 && (
        <div className="mt-8 text-center">
          <button
            onClick={handleEmergencySOS}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 shadow-lg"
          >
            <AlertCircle className="h-5 w-5 mr-2" />
            Emergency SOS
          </button>
          <p className="mt-2 text-sm text-gray-500">
            {dependents.find(d => d.isEmergencyContact)
              ? 'Click to alert your emergency contact'
              : 'Set an emergency contact to enable SOS alerts'}
          </p>
        </div>
      )}
    </div>
  );
}