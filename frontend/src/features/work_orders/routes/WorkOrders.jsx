import React from 'react';

import { Button, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { WorkOrderList } from '../components/WorkOrderList';
import { ViewWorkOrderDetailsDialog } from '../components/ViewWorkOrderDetailsDialog';

export const WorkOrders = () => {
  const [currentWorkOrderListSelection, setWorkOrderListSelection] = React.useState([]);
  const [isViewWorkOrderDialogOpen, setViewWorkOrderDialogOpen] = React.useState(false);

  return (
    <ContentLayout title="Work Orders">
      <ViewWorkOrderDetailsDialog
        modalOpen={isViewWorkOrderDialogOpen}
        onClose={() => setViewWorkOrderDialogOpen(false)}
        workOrderId={currentWorkOrderListSelection[0]}
      />
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
            onClick={() => setViewWorkOrderDialogOpen(true)}
            disabled={currentWorkOrderListSelection.length !== 1}
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
