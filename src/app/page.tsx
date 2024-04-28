'use client';
import {
  Button,
  Dropdown,
  DropdownSection,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@nextui-org/react';

import {
  AddNoteBulkIcon,
  CopyDocumentBulkIcon,
  EditDocumentBulkIcon,
  DeleteDocumentBulkIcon,
} from '@nextui-org/shared-icons';
import clsx from 'clsx';

const iconClasses = 'text-2xl text-default-500 pointer-events-none flex-shrink-0';

const Home = () => {
  return (
    <Dropdown className='shadow-xl' placement='bottom'>
      <DropdownTrigger>
        <Button color='success' variant='flat'>
          Actions
        </Button>
      </DropdownTrigger>
      <DropdownMenu closeOnSelect aria-label='Actions' color='default' variant='flat'>
        <DropdownSection title='Actions'>
          <DropdownItem
            key='new'
            description='Create a new file'
            shortcut='⌘N'
            startContent={<AddNoteBulkIcon className={iconClasses} />}
          >
            New file
          </DropdownItem>
          <DropdownItem
            key='copy'
            description='Copy the file link'
            shortcut='⌘C'
            startContent={<CopyDocumentBulkIcon className={iconClasses} />}
          >
            Copy link
          </DropdownItem>
          <DropdownItem
            key='edit'
            description='Allows you to edit the file'
            shortcut='⌘⇧E'
            startContent={<EditDocumentBulkIcon className={iconClasses} />}
          >
            Edit file
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title='Danger zone'>
          <DropdownItem
            key='delete'
            className='text-danger'
            color='danger'
            description='Permanently delete the file'
            shortcut='⌘⇧D'
            startContent={<DeleteDocumentBulkIcon className={clsx(iconClasses, '!text-danger')} />}
          >
            Delete file
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default Home;
