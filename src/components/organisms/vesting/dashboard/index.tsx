import React from 'react';
import Claim from '@components/organisms/vesting/claim';
import Overview from '@components/organisms/vesting/overview';

const VestingDashboard = () => (
  <div className="row flex-column-reverse flex-md-row">
    <div className="col-md-6 mt-4 mt-md-0">
      <Overview />
    </div>
    <div className="col-md-6 blur-background">
      <Claim />
    </div>
  </div>
);

export default VestingDashboard;
