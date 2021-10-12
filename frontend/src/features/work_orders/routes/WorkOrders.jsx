import React from 'react';

import { Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { WorkOrderList } from '../components/WorkOrderList';

export const WorkOrders = () => {
  const [currentWorkOrderListSelection, setWorkOrderListSelection] = React.useState([]);

  return (
    <ContentLayout title="Work Orders">
      <Stack direction="column" spacing={1}>
        {`Current selection: ${currentWorkOrderListSelection}.`}
        <WorkOrderList onSelectionChange={setWorkOrderListSelection} />
      </Stack>
    </ContentLayout>
  );
};

export default WorkOrders;
