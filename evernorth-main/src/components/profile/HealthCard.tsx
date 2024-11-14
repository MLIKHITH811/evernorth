import { useState, useEffect } from 'react';
import { HealthInfo } from '../../types/types';
import { Heart, Plus, X, AlertCircle, Search } from 'lucide-react';

interface Props {
  healthInfo: HealthInfo;
  onChange: (healthInfo: HealthInfo) => void;
}

const commonConditions = [
  'Diabetes',
  'Hypertension',
  'Asthma',
  'Heart Disease',
  'Arthritis',
  'Thyroid Disorder',
  'Depression',
  'Anxiety',
  'Migraine',
  'Chronic Pain'
];

const commonAllergies = [
  'Peanuts',
  'Tree Nuts',
  'Milk',
  'Eggs',
  'Soy',
  'Wheat',
  'Fish',
  'Shellfish',
  'Dust',
  'Pollen'
];

export default function HealthSection({ healthInfo, onChange }: Props) {
  const [newCondition, setNewCondition] = useState('');
  const [newAllergy, setNewAllergy] = useState('');
  const [conditionSuggestions, setConditionSuggestions] = useState<string[]>([]);
  const [allergySuggestions, setAllergySuggestions] = useState<string[]>([]);
  const [showConditionDescription, setShowConditionDescription] = useState(false);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [conditionDescription, setConditionDescription] = useState('');

  useEffect(() => {
    if (newCondition.length > 0) {
      setConditionSuggestions(
        commonConditions.filter(condition =>
          condition.toLowerCase().includes(newCondition.toLowerCase())
        )
      );
    } else {
      setConditionSuggestions([]);
    }
  }, [newCondition]);

  useEffect(() => {
    if (newAllergy.length > 0) {
      setAllergySuggestions(
        commonAllergies.filter(allergy =>
          allergy.toLowerCase().includes(newAllergy.toLowerCase())
        )
      );
    } else {
      setAllergySuggestions([]);
    }
  }, [newAllergy]);

  const handleAddCondition = (condition: string) => {
    if (!condition.trim()) return;
    setSelectedCondition(condition.trim());
    setShowConditionDescription(true);
    setNewCondition('');
  };

  const handleAddConditionWithDescription = () => {
    const condition = selectedCondition;
    onChange({
      ...healthInfo,
      conditions: [...healthInfo.conditions, condition],
      descriptions: {
        ...healthInfo.descriptions,
        [condition]: conditionDescription
      }
    });
    setShowConditionDescription(false);
    setSelectedCondition('');
    setConditionDescription('');
  };

  const handleAddAllergy = (allergy: string) => {
    if (!allergy.trim()) return;
    onChange({
      ...healthInfo,
      allergies: [...healthInfo.allergies, allergy.trim()],
    });
    setNewAllergy('');
  };

  const handleRemoveCondition = (index: number) => {
    const condition = healthInfo.conditions[index];
    const { [condition]: _, ...restDescriptions } = healthInfo.descriptions;
    onChange({
      ...healthInfo,
      conditions: healthInfo.conditions.filter((_, i) => i !== index),
      descriptions: restDescriptions
    });
  };

  const handleRemoveAllergy = (index: number) => {
    onChange({
      ...healthInfo,
      allergies: healthInfo.allergies.filter((_, i) => i !== index),
    });
  };

  return (
    <div className="p-8">
      <div className="flex items-center mb-8">
        <Heart className="h-8 w-8 text-red-500 mr-3" />
        <h2 className="text-2xl font-semibold text-gray-900">
          Health Information
        </h2>
      </div>

      <div className="max-w-3xl space-y-8">
        {/* Health Conditions */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-6">
            Health Conditions
          </h3>
          <div className="space-y-6">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={newCondition}
                  onChange={(e) => setNewCondition(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 shadow-sm py-3 pl-10 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search or enter health condition"
                />
                {newCondition && (
                  <button
                    onClick={() => handleAddCondition(newCondition)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Condition Suggestions */}
              {conditionSuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 max-h-48 overflow-y-auto">
                  {conditionSuggestions.map((condition, index) => (
                    <button
                      key={index}
                      onClick={() => handleAddCondition(condition)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    >
                      {condition}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Existing Conditions */}
            <div className="flex flex-wrap gap-2">
              {healthInfo.conditions.map((condition, index) => (
                <div
                  key={index}
                  className="group relative inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-blue-50 text-blue-700 border border-blue-200"
                >
                  {condition}
                  {healthInfo.descriptions[condition] && (
                    <AlertCircle className="h-4 w-4 ml-1 text-blue-600" />
                  )}
                  <button
                    onClick={() => handleRemoveCondition(index)}
                    className="ml-2 text-blue-600 hover:text-blue-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  
                  {/* Description Tooltip */}
                  {healthInfo.descriptions[condition] && (
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                      {healthInfo.descriptions[condition]}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Allergies */}
        <div className="bg-white rounded-lg p-6 border border-gray-200">
          <h3 className="text-lg font-medium text-gray-900 mb-6">Allergies</h3>
          <div className="space-y-6">
            <div className="relative">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 shadow-sm py-3 pl-10 pr-12 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Search or enter allergy"
                />
                {newAllergy && (
                  <button
                    onClick={() => handleAddAllergy(newAllergy)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-blue-600 hover:text-blue-700"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                )}
              </div>

              {/* Allergy Suggestions */}
              {allergySuggestions.length > 0 && (
                <div className="absolute z-10 w-full mt-1 bg-white shadow-lg rounded-lg border border-gray-200 max-h-48 overflow-y-auto">
                  {allergySuggestions.map((allergy, index) => (
                    <button
                      key={index}
                      onClick={() => handleAddAllergy(allergy)}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                    >
                      {allergy}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Existing Allergies */}
            <div className="flex flex-wrap gap-2">
              {healthInfo.allergies.map((allergy, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium bg-red-50 text-red-700 border border-red-200"
                >
                  {allergy}
                  <button
                    onClick={() => handleRemoveAllergy(index)}
                    className="ml-2 text-red-600 hover:text-red-800"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Condition Description Modal */}
      {showConditionDescription && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h4 className="text-lg font-medium mb-4">
              Add details for {selectedCondition}
            </h4>
            <textarea
              className="w-full rounded-lg border border-gray-300 shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={4}
              value={conditionDescription}
              onChange={(e) => setConditionDescription(e.target.value)}
              placeholder="Add any specific details about this condition..."
            />
            <div className="flex justify-end space-x-3 mt-4">
              <button
                onClick={() => setShowConditionDescription(false)}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Cancel
              </button>
              <button
                onClick={handleAddConditionWithDescription}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                {conditionDescription ? 'Add with Details' : 'Add Without Details'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}