import React from 'react';

import { Button, Stack } from '@mui/material';

import { ContentLayout } from '@/components/layout';

import { MessageList } from '../components/MessageList';

export const Messages = () => (
  <ContentLayout title="Messages">
    <Stack direction="column" spacing={1} sx={{ width: '100%', height: '100%' }}>
      <Stack direction="row" spacing={1}>
        <Button variant="contained" onClick={() => {}}>New</Button>
      </Stack>
      <MessageList />
    </Stack>
  </ContentLayout>
);

export default Messages;
