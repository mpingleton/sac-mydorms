import React from 'react';
import { Button } from '@mui/material';
import { ContentLayout } from '@/components/layout';
// import { useAuth } from '@/lib/auth';
import { InspectionsList } from '../components/InspectionsList';
import { NewInspectionsDialog } from '../components/NewInspectionsDialog';

export const Inspections = () => {
  // const { user } = useAuth();

  const [isNewInspectionDialogOpen, setNewInspectionDialogOpen] = React.useState(false);
  // const [isViewInspectionsDialogOpen, setViewInspectionsDialogOpen] = React.useState(false);

  return (
    <ContentLayout title="Inspections">
      <NewInspectionsDialog
        modalOpen={isNewInspectionDialogOpen}
        onClose={() => {
          setNewInspectionDialogOpen(false);
          // window.location.reload();
        }}
      />
      <Button variant="contained" onClick={() => setNewInspectionDialogOpen(true)}>New</Button>
      <InspectionsList />
    </ContentLayout>
  );
};

export default Inspections;
