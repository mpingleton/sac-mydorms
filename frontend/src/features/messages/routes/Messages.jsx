import React from 'react';

import { Button, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { MessageList } from '../components/MessageList';
import { NewMessageDialog } from '../components/NewMessageDialog';
import { ViewMessageDialog } from '../components/ViewMessageDialog';

export const Messages = () => {
  const [currentMessageSelection, setMessageSelection] = React.useState(1);
  const [isViewMessageDialogOpen, setViewMessageDialogOpen] = React.useState(false);
  const [isNewMessageDialogOpen, setNewMessageDialogOpen] = React.useState(false);

  return (
    <ContentLayout title="Messages">
      <NewMessageDialog
        modalOpen={isNewMessageDialogOpen}
        onClose={() => {
          setNewMessageDialogOpen(false);
        }}
      />
      <ViewMessageDialog
        modalOpen={isViewMessageDialogOpen}
        onClose={() => {
          setViewMessageDialogOpen(false);
        }}
        messageId={currentMessageSelection}
      />
      <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => setNewMessageDialogOpen(true)}>New</Button>
          <Button variant="contained" onClick={() => setViewMessageDialogOpen(true)}>View</Button>
        </Stack>
        <MessageList onSelectionChange={setMessageSelection} />
      </Stack>
    </ContentLayout>
  );
};

export default Messages;
