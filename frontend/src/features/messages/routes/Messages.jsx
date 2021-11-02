import React from 'react';

import { Button, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { MessageList } from '../components/MessageList';
import { NewMessageDialog } from '../components/NewMessageDialog';

export const Messages = () => {
  const [isNewMessageDialogOpen, setNewMessageDialogOpen] = React.useState(false);

  return (
    <ContentLayout title="Messages">
      <NewMessageDialog
        modalOpen={isNewMessageDialogOpen}
        onClose={() => {
          setNewMessageDialogOpen(false);
        }}
      />
      <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
        <Stack direction="row" spacing={1}>
          <Button variant="contained" onClick={() => setNewMessageDialogOpen(true)}>New</Button>
        </Stack>
        <MessageList />
      </Stack>
    </ContentLayout>
  );
};

export default Messages;
