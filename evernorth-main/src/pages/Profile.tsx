import { useState, useEffect } from 'react';
import { UserProfile, ValidationErrors } from '../types/types';
import ProfileHeader from '../components/profile/ProfileHeader';
import ContactCard from '../components/profile/ContactCard';
import PaymentMethods from '../components/profile/PaymentCard';
import AddressSection from '../components/profile/AddressCard';
import HealthSection from '../components/profile/HealthCard';
import DependentSection from '../components/profile/DependentCard';
import { Save, X, Phone, CreditCard, MapPin, Heart, Users } from 'lucide-react';
import { validateProfile } from '../utils/validation';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('contact');
  const [profile, setProfile] = useState<UserProfile>({
    memberId: 'MEM123456',
    fullName: '',
    dateOfBirth: '',
    contact: {
      mobileNumber: '',
      email: '',
      preferredContact: 'mobile',
    },
    paymentMethods: [],
    addresses: [],
    healthInfo: {
      conditions: [],
      allergies: [],
      descriptions: {},
    },
    dependents: [],
  });

  const [originalProfile, setOriginalProfile] = useState<UserProfile>(profile);
  const [, setErrors] = useState<ValidationErrors>({});
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    setHasUnsavedChanges(JSON.stringify(profile) !== JSON.stringify(originalProfile));
  }, [profile, originalProfile]);

  const calculateProgress = () => {
    const fields = [
      !!profile.fullName,
      !!profile.dateOfBirth,
      !!profile.contact.email,
      !!profile.contact.mobileNumber,
      profile.paymentMethods.length > 0,
      profile.addresses.length > 0,
      profile.healthInfo.conditions.length > 0 || profile.healthInfo.allergies.length > 0,
    ];

    const completedFields = fields.filter(Boolean).length;
    return (completedFields / fields.length) * 100;
  };

  const handleSave = async () => {
    const validationErrors = validateProfile(profile);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the validation errors');
      return;
    }

    try {
      // TODO: Implement API call to save profile
      console.log('Saving profile:', profile);
      setOriginalProfile(profile);
      setHasUnsavedChanges(false);
      toast.success('Profile saved successfully');
    } catch (error) {
      toast.error('Failed to save profile');
    }
  };

  const handleCancel = () => {
    setProfile(originalProfile);
    setHasUnsavedChanges(false);
    setErrors({});
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'contact':
        return (
          <ContactCard
            contact={profile.contact}
            onChange={(contact) => setProfile({ ...profile, contact })}
          />
        );
      case 'payment':
        return (
          <PaymentMethods
            methods={profile.paymentMethods}
            onChange={(paymentMethods) => setProfile({ ...profile, paymentMethods })}
          />
        );
      case 'address':
        return (
          <AddressSection
            addresses={profile.addresses}
            onChange={(addresses) => setProfile({ ...profile, addresses })}
          />
        );
      case 'health':
        return (
          <HealthSection
            healthInfo={profile.healthInfo}
            onChange={(healthInfo) => setProfile({ ...profile, healthInfo })}
          />
        );
      case 'dependents':
        return (
          <DependentSection
            dependents={profile.dependents}
            onChange={(dependents) => setProfile({ ...profile, dependents })}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <ProfileHeader 
        profile={profile}
        progress={calculateProgress()}
        hasUnsavedChanges={hasUnsavedChanges}
      />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-6">
          {/* Left Sidebar - Navigation */}
          <div className="w-56 flex-shrink-0">
            <div className="bg-white shadow rounded-lg overflow-hidden sticky top-8">
              <nav className="flex flex-col">
                {[
                  { id: 'contact', icon: Phone, label: 'Contact' },
                  { id: 'payment', icon: CreditCard, label: 'Payment' },
                  { id: 'address', icon: MapPin, label: 'Address' },
                  { id: 'health', icon: Heart, label: 'Health' },
                  { id: 'dependents', icon: Users, label: 'Dependents' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`
                      flex items-center px-4 py-3 text-sm font-medium w-full transition-colors
                      ${activeTab === item.id
                        ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-700'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }
                    `}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1">
            <div className="bg-white shadow rounded-lg">
              {renderActiveTab()}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        {hasUnsavedChanges && (
          <div className="fixed bottom-6 right-6 flex space-x-4">
            <button
              onClick={handleCancel}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <X className="h-4 w-4 mr-2" />
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}