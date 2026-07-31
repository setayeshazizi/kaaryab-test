'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useOpportunityStore } from '@/store/opportunity-store';
import { Opportunity } from '@/types/opportunity';
import OpportunityCard from '@/components/opportunities/opportunity-card';
import EmptyState from '@/components/ui/empty-state';

export default function SavedPage() {
  const [savedOpportunities, setSavedOpportunities] = useState<Opportunity[]>([]);
  const [mounted, setMounted] = useState(false);
  
  const opportunities = useOpportunityStore((state) => state.opportunities);
  const savedIds = useOpportunityStore((state) => state.savedIds);

  useEffect(() => {
    setMounted(true);
    setSavedOpportunities(opportunities.filter((opp) => savedIds.includes(opp.id)));
  }, [opportunities, savedIds]);

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-slate-950">
        <div className="w-10 h-10 border-4 border-primary-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
         <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 dark:bg-primary-900/30 rounded-2xl mb-5">
  <Heart className="w-8 h-8 text-primary-600 dark:text-primary-400" />
</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-400 dark:to-primary-600 bg-clip-text text-transparent">
            Saved Opportunities
          </h1>
          <p className="text-gray-500 dark:text-gray-400 text-base max-w-md mx-auto">
            Your collection of saved opportunities. Come back anytime to apply.
          </p>
        </motion.div>

        {/* Content */}
        {savedOpportunities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedOpportunities.map((opp, i) => (
              <OpportunityCard key={opp.id} opportunity={opp} index={i} />
            ))}
          </div>
        ) : (
          <EmptyState type="no-saved" />
        )}
      </div>
    </div>
  );
}