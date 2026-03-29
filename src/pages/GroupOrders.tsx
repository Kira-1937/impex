import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, where, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { Users, Globe, ArrowRight, Plus, Loader2, Target } from 'lucide-react';
import { cn } from '../lib/utils';
import { toast } from 'sonner';
import { motion } from 'motion/react';

export default function GroupOrders() {
  const { user } = useAuth();
  const [groups, setGroups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [newGroup, setNewGroup] = useState({
    destinationCountry: '',
    targetWeight: '100'
  });

  useEffect(() => {
    const q = query(collection(db, 'groups'), where('status', '==', 'open'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setGroups(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleCreateGroup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    try {
      await addDoc(collection(db, 'groups'), {
        destinationCountry: newGroup.destinationCountry,
        targetWeight: parseFloat(newGroup.targetWeight),
        currentWeight: 0,
        status: 'open',
        members: [user.uid],
        createdAt: serverTimestamp()
      });
      toast.success("Group created successfully!");
      setIsCreating(false);
    } catch (error) {
      toast.error("Failed to create group.");
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight">Collaborative Buying</h1>
          <p className="text-gray-500 mt-1">Join a group in your country to save on international shipping.</p>
        </div>
        <button
          onClick={() => setIsCreating(true)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-2xl font-bold flex items-center hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
        >
          <Plus className="w-5 h-5 mr-2" />
          Create Group
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center py-32">
          <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
        </div>
      ) : groups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {groups.map((group) => (
            <motion.div
              key={group.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm hover:shadow-xl transition-all group"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Globe className="w-7 h-7" />
                </div>
                <span className="bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                  {group.status}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">{group.destinationCountry}</h3>
              <div className="flex items-center text-gray-400 text-sm mb-6">
                <Users className="w-4 h-4 mr-2" />
                {group.members.length} members joined
              </div>

              <div className="space-y-4">
                <div className="flex justify-between text-sm font-bold">
                  <span className="text-gray-400">Weight Progress</span>
                  <span className="text-indigo-600">{Math.round((group.currentWeight / group.targetWeight) * 100)}%</span>
                </div>
                <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-indigo-600 transition-all duration-1000"
                    style={{ width: `${Math.min(100, (group.currentWeight / group.targetWeight) * 100)}%` }}
                  />
                </div>
                <div className="flex justify-between text-xs text-gray-400 font-medium">
                  <span>{group.currentWeight}kg</span>
                  <span>Target: {group.targetWeight}kg</span>
                </div>
              </div>

              <button className="w-full mt-8 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-black transition-all flex items-center justify-center">
                Join Group <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="text-center py-32 bg-white rounded-[3rem] border border-dashed border-gray-200">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <Users className="w-10 h-10 text-gray-300" />
          </div>
          <h3 className="text-xl font-bold text-gray-900">No active groups</h3>
          <p className="text-gray-500 mt-2">Be the first to create a group for your country!</p>
        </div>
      )}

      {/* Create Group Modal */}
      {isCreating && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-[2.5rem] shadow-2xl w-full max-w-md p-10"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Create Group</h2>
            <form onSubmit={handleCreateGroup} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Destination Country</label>
                <input
                  required
                  type="text"
                  value={newGroup.destinationCountry}
                  onChange={(e) => setNewGroup({...newGroup, destinationCountry: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                  placeholder="e.g. United States"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Target Weight (kg)</label>
                <input
                  required
                  type="number"
                  value={newGroup.targetWeight}
                  onChange={(e) => setNewGroup({...newGroup, targetWeight: e.target.value})}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none"
                />
                <p className="mt-2 text-xs text-gray-400">Higher weight targets unlock better shipping rates.</p>
              </div>
              <div className="pt-4 flex gap-4">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="flex-1 px-6 py-4 rounded-2xl font-bold text-gray-500 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-6 py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100"
                >
                  Create
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}
