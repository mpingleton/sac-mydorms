import React from 'react';

import { Button, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { WorkOrderList } from '../components/WorkOrderList';

export const WorkOrders = () => {
  const [currentWorkOrderListSelection, setWorkOrderListSelection] = React.useState([]);

  return (
    <ContentLayout title="Work Orders">
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={() => {}}
          >
            New
          </Button>
          <Button
            variant="contained"
            onClick={() => {}}
          >
            View
          </Button>
        </Stack>
        <WorkOrderList onSelectionChange={setWorkOrderListSelection} />
        {`Current selection: ${currentWorkOrderListSelection}.`}
      </Stack>
    </ContentLayout>
  );
};

export default WorkOrders;
