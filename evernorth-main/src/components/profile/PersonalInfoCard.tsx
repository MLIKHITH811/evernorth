import { UserProfile } from '../../types/types';
import { User, Calendar, AtSign, Phone } from 'lucide-react';

interface Props {
  profile: UserProfile;
  onChange: (updates: Partial<UserProfile>) => void;
  errors: Record<string, string>;
}

export default function PersonalInfoCard({ profile, onChange, errors }: Props) {
  return (
    <div className="bg-white shadow rounded-lg p-6 mb-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              value={profile.fullName || ''}
              onChange={(e) => onChange({ fullName: e.target.value })}
              className={`pl-10 w-full rounded-lg border ${
                errors.fullName ? 'border-red-500' : 'border-gray-300'
              } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your full name"
            />
          </div>
          {errors.fullName && (
            <p className="mt-1 text-sm text-red-600">{errors.fullName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date of Birth
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="date"
              value={profile.dateOfBirth || ''}
              onChange={(e) => onChange({ dateOfBirth: e.target.value })}
              className={`pl-10 w-full rounded-lg border ${
                errors.dateOfBirth ? 'border-red-500' : 'border-gray-300'
              } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
          </div>
          {errors.dateOfBirth && (
            <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <AtSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="email"
              value={profile.contact.email}
              onChange={(e) => 
                onChange({ 
                  contact: { ...profile.contact, email: e.target.value }
                })
              }
              className={`pl-10 w-full rounded-lg border ${
                errors.email ? 'border-red-500' : 'border-gray-300'
              } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your email"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="tel"
              value={profile.contact.mobileNumber}
              onChange={(e) =>
                onChange({
                  contact: { ...profile.contact, mobileNumber: e.target.value }
                })
              }
              className={`pl-10 w-full rounded-lg border ${
                errors.mobileNumber ? 'border-red-500' : 'border-gray-300'
              } p-3 focus:outline-none focus:ring-2 focus:ring-blue-500`}
              placeholder="Enter your phone number"
            />
          </div>
          {errors.mobileNumber && (
            <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>
          )}
        </div>
      </div>
    </div>
  );
}