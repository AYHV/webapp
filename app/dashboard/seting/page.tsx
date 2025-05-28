import React from 'react';

const SettingsPage = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="space-y-4">
          <section>
            <h2 className="text-xl font-semibold mb-3">Account Settings</h2>
            {/* Add your settings form or controls here */}
          </section>
          
          <section>
            <h2 className="text-xl font-semibold mb-3">Preferences</h2>
            {/* Add your preferences controls here */}
          </section>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;