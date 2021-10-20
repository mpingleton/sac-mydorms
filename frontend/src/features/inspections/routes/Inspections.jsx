import React from 'react';
import { Button } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { InspectionsList } from '../components/InspectionsList';
import { NewInspectionsDialog } from '../components/NewInspectionsDialog';
import { ViewInspectionDetailsDialog } from '../components/ViewInspectionDetailsDialog';

export const Inspections = () => {
  const [currentInspectionSelection, setInspectionSelection] = React.useState([]);
  const [isNewInspectionDialogOpen, setNewInspectionDialogOpen] = React.useState(false);
  const [isViewInspectionDetailsDialogOpen,
    setViewInspectionDetailsDialogOpen] = React.useState(false);

  return (
    <ContentLayout title="Inspections">
      <NewInspectionsDialog
        modalOpen={isNewInspectionDialogOpen}
        onClose={() => {
          setNewInspectionDialogOpen(false);
          window.location.reload();
        }}
      />
      <ViewInspectionDetailsDialog
        modalOpen={isViewInspectionDetailsDialogOpen}
        onClose={() => {
          setViewInspectionDetailsDialogOpen(false);
        }}
        inspectionId={currentInspectionSelection[0]}
      />
      <Button variant="contained" onClick={() => setNewInspectionDialogOpen(true)}>New</Button>
      <Button
        variant="contained"
        onClick={() => setViewInspectionDetailsDialogOpen(true)}
        disabled={currentInspectionSelection.length !== 1}
      >
        View
      </Button>
      <InspectionsList onSelectionChange={setInspectionSelection} />
    </ContentLayout>
  );
};

export default Inspections;
