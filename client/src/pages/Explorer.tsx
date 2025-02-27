import React from 'react';
import BlockchainExplorer from '@/components/BlockchainExplorer';

export default function Explorer() {
  return (
    <div className="px-4 py-6 md:px-8">
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white">Blockchain Explorer</h1>
        <p className="text-muted-foreground mt-1">
          Explore quantum blocks and transactions on the Bitcoin blockchain
        </p>
      </div>
      
      {/* Main Content */}
      <div className="space-y-8">
        <BlockchainExplorer />
      </div>
    </div>
  );
}