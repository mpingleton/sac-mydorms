import React from 'react';

import {
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { WorkOrderList } from '../components/WorkOrderList';
import { NewWorkOrderDialog } from '../components/NewWorkOrderDialog';
import { ViewWorkOrderDetailsDialog } from '../components/ViewWorkOrderDetailsDialog';

export const WorkOrders = () => {
  const [currentWorkOrderListSelection, setWorkOrderListSelection] = React.useState([]);
  const [isNewWorkOrderDialogOpen, setNewWorkOrderDialogOpen] = React.useState(false);
  const [isViewWorkOrderDialogOpen, setViewWorkOrderDialogOpen] = React.useState(false);
  const [filterType, setFilterType] = React.useState('me');

  return (
    <ContentLayout title="Work Orders">
      <NewWorkOrderDialog
        modalOpen={isNewWorkOrderDialogOpen}
        onClose={() => {
          setNewWorkOrderDialogOpen(false);
          window.location.reload();
        }}
      />
      <ViewWorkOrderDetailsDialog
        modalOpen={isViewWorkOrderDialogOpen}
        onClose={() => setViewWorkOrderDialogOpen(false)}
        workOrderId={currentWorkOrderListSelection[0]}
      />
      <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
        <Stack direction="row" spacing={1}>
          <Button
            variant="contained"
            onClick={() => setNewWorkOrderDialogOpen(true)}
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
          <ToggleButtonGroup
            value={filterType}
            onChange={(event) => { setFilterType(event.target.value); }}
            sx={{ marginLeft: 'auto' }}
          >
            <ToggleButton value="me">Created By Me</ToggleButton>
            <ToggleButton value="base">All For Base</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <WorkOrderList
          listType={filterType}
          onSelectionChange={setWorkOrderListSelection}
        />
      </Stack>
    </ContentLayout>
  );
};

export default WorkOrders;
