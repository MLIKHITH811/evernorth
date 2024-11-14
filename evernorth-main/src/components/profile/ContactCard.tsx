import { ContactInfo } from '../../types/types';
import { Mail, Phone, MessageSquare } from 'lucide-react';

interface Props {
  contact: ContactInfo;
  onChange: (contact: ContactInfo) => void;
}

export default function ContactCard({ contact, onChange }: Props) {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-8">Contact Information</h2>
      
      <div className="max-w-2xl space-y-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Mobile Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="tel"
              value={contact.mobileNumber}
              onChange={(e) => onChange({ ...contact, mobileNumber: e.target.value })}
              className="pl-10 w-full rounded-lg border border-gray-300 shadow-sm py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your mobile number"
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
              value={contact.email}
              onChange={(e) => onChange({ ...contact, email: e.target.value })}
              className="pl-10 w-full rounded-lg border border-gray-300 shadow-sm py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your email address"
            />
          </div>
        </div>

        <div className="space-y-4 pt-4">
          <label className="block text-sm font-medium text-gray-700">
            Preferred Contact Method
          </label>
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: 'mobile', icon: Phone, label: 'Phone Call' },
              { value: 'email', icon: Mail, label: 'Email' },
              { value: 'text', icon: MessageSquare, label: 'Text Message' },
            ].map(({ value, icon: Icon, label }) => (
              <label
                key={value}
                className={`
                  flex flex-col items-center p-4 rounded-lg border-2 cursor-pointer transition-all
                  ${contact.preferredContact === value
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                  }
                `}
              >
                <input
                  type="radio"
                  name="contactMethod"
                  value={value}
                  checked={contact.preferredContact === value}
                  onChange={(e) =>
                    onChange({
                      ...contact,
                      preferredContact: e.target.value as ContactInfo['preferredContact'],
                    })
                  }
                  className="sr-only"
                />
                <Icon className={`h-6 w-6 mb-2 ${
                  contact.preferredContact === value ? 'text-blue-500' : 'text-gray-400'
                }`} />
                <span className={`text-sm font-medium ${
                  contact.preferredContact === value ? 'text-blue-700' : 'text-gray-700'
                }`}>
                  {label}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}