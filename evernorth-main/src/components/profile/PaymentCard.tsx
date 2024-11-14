import { useState } from 'react';
import { PaymentMethod } from '../../types/types';
import { CreditCard, Plus, Trash2 } from 'lucide-react';

interface Props {
  methods: PaymentMethod[];
  onChange: (methods: PaymentMethod[]) => void;
}

export default function PaymentMethods({ methods, onChange }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [newMethod, setNewMethod] = useState<Partial<PaymentMethod>>({
    type: 'credit',
  });

  const handleAdd = () => {
    if (newMethod.type === 'upi' && !newMethod.upiId) return;
    if (newMethod.type !== 'upi' && (!newMethod.cardNumber || !newMethod.nameOnCard)) return;

    onChange([
      ...methods,
      {
        ...newMethod,
        id: Date.now().toString(),
      } as PaymentMethod,
    ]);
    setShowForm(false);
    setNewMethod({ type: 'credit' });
  };

  const handleDelete = (id: string) => {
    onChange(methods.filter((method) => method.id !== id));
  };

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Payment Methods</h2>
        {!showForm && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Method
          </button>
        )}
      </div>

      {showForm && (
        <div className="mb-6 p-4 border rounded-lg bg-gray-50">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Type
              </label>
              <select
                value={newMethod.type}
                onChange={(e) =>
                  setNewMethod({ ...newMethod, type: e.target.value as PaymentMethod['type'] })
                }
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="credit">Credit Card</option>
                <option value="debit">Debit Card</option>
                <option value="upi">UPI</option>
              </select>
            </div>

            {newMethod.type !== 'upi' ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={newMethod.cardNumber || ''}
                    onChange={(e) =>
                      setNewMethod({ ...newMethod, cardNumber: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    placeholder="**** **** **** ****"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    value={newMethod.nameOnCard || ''}
                    onChange={(e) =>
                      setNewMethod({ ...newMethod, nameOnCard: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={newMethod.expiryDate || ''}
                      onChange={(e) =>
                        setNewMethod({ ...newMethod, expiryDate: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                      placeholder="MM/YY"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Card Type
                    </label>
                    <select
                      value={newMethod.cardType || ''}
                      onChange={(e) =>
                        setNewMethod({ ...newMethod, cardType: e.target.value })
                      }
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    >
                      <option value="">Select Type</option>
                      <option value="visa">Visa</option>
                      <option value="mastercard">Mastercard</option>
                    </select>
                  </div>
                </div>
              </>
            ) : (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={newMethod.upiId || ''}
                  onChange={(e) =>
                    setNewMethod({ ...newMethod, upiId: e.target.value })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  placeholder="username@upi"
                />
              </div>
            )}

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
        {methods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-3">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <div>
                {method.type === 'upi' ? (
                  <p className="font-medium">{method.upiId}</p>
                ) : (
                  <>
                    <p className="font-medium">
                      {method.nameOnCard} - **** {method.cardNumber?.slice(-4)}
                    </p>
                    <p className="text-sm text-gray-500">
                      Expires {method.expiryDate}
                    </p>
                  </>
                )}
              </div>
            </div>
            <button
              onClick={() => handleDelete(method.id)}
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