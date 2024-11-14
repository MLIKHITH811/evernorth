import { UserCircle } from 'lucide-react';
import { UserProfile } from '../../types/types';

interface Props {
  profile: UserProfile;
  progress: number;
  hasUnsavedChanges: boolean;
}

export default function ProfileHeader({ profile, progress, hasUnsavedChanges }: Props) {
  const calculateAge = (dateOfBirth: string) => {
    const today = new Date();
    const birthDate = new Date(dateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="pt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Profile Completion</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {hasUnsavedChanges && (
            <p className="mt-2 text-sm text-amber-600">You have unsaved changes</p>
          )}
        </div>

        {/* Profile Header */}
        <div className="py-6 flex items-center space-x-8">
          <div className="relative">
            {profile.photoUrl ? (
              <img 
                src={profile.photoUrl} 
                alt="Profile" 
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
            ) : (
              <UserCircle className="w-24 h-24 text-gray-400" />
            )}
            <button 
              className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 rounded-full shadow-lg hover:bg-blue-700 transition"
              aria-label="Change photo"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </button>
          </div>

          <div className="flex-1">
            <h1 className="text-2xl font-bold text-gray-900">
              {profile.fullName || 'Add Your Name'}
              {profile.dateOfBirth && (
                <span className="ml-3 text-lg font-normal text-gray-600">
                  ({calculateAge(profile.dateOfBirth)} years old)
                </span>
              )}
            </h1>
            <div className="mt-2 grid grid-cols-2 gap-4 text-sm text-gray-500">
              <div>
                <span className="font-medium text-gray-700">Member ID:</span> {profile.memberId}
              </div>
              <div>
                <span className="font-medium text-gray-700">Date of Birth:</span>{' '}
                {profile.dateOfBirth && new Date(profile.dateOfBirth).toLocaleDateString()}
              </div>
              <div>
                <span className="font-medium text-gray-700">Email:</span> {profile.contact.email}
              </div>
              <div>
                <span className="font-medium text-gray-700">Phone:</span> {profile.contact.mobileNumber}
              </div>
            </div>
          </div>

          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
            onClick={() => {
              // TODO: Implement edit profile functionality
            }}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
}