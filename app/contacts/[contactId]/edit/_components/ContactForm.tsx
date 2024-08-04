'use client';

import React, { useActionState } from 'react';
import Input from '@/components/ui/Input';
import LinkButton from '@/components/ui/LinkButton';
import SubmitButton from '@/components/ui/SubmitButton';
import TextArea from '@/components/ui/TextArea';
import { updateContact } from '@/lib/actions/updateContact';
import type { ContactSchemaErrorType } from '@/validations/contactSchema';
import type { Contact } from '@prisma/client';

export default function ContactForm({ contact }: { contact: Contact }) {
  const updateContactById = updateContact.bind(null, contact.id);

  const [state, updateContactAction] = useActionState(updateContactById, {
    data: {
      avatar: contact.avatar || '',
      email: contact.email || '',
      first: contact.first || '',
      github: contact.github || '',
      last: contact.last || '',
      notes: contact.notes || '',
      position: contact.position || '',
    },
    errors: {} as ContactSchemaErrorType,
  });

  return (
    <form className="flex max-w-[40rem] flex-col gap-4 @container" action={updateContactAction}>
      <div className="grip-rows-6 grid grid-cols-1 gap-2 @sm:grid-cols-[1fr_4fr] @sm:gap-4">
        <span className="flex">Name</span>
        <div className="flex gap-4">
          <Input
            error={state.errors?.fieldErrors?.first}
            defaultValue={state.data?.first || undefined}
            aria-label="First name"
            name="first"
            type="text"
            placeholder="First"
          />
          <Input
            error={state.errors?.fieldErrors?.last}
            aria-label="Last name"
            defaultValue={state.data?.last || undefined}
            name="last"
            placeholder="Last"
            type="text"
          />
        </div>
        <label htmlFor="position">Position</label>
        <Input
          error={state.errors?.fieldErrors?.position}
          defaultValue={state.data?.position || undefined}
          name="position"
          placeholder="Konsulent"
          type="text"
        />
        <label htmlFor="email">Email</label>
        <Input
          error={state.errors?.fieldErrors?.email}
          defaultValue={state.data?.email || undefined}
          name="email"
          placeholder="moa@inmeta.no"
          type="text"
        />
        <label htmlFor="github">Github</label>
        <Input
          error={state.errors?.fieldErrors?.github}
          defaultValue={state.data?.github || undefined}
          name="github"
          placeholder="@moa"
          type="text"
        />
        <label htmlFor="avatar">Avatar URL</label>
        <Input
          error={state.errors?.fieldErrors?.avatar}
          defaultValue={state.data?.avatar || undefined}
          name="avatar"
          placeholder="https:// media.licdn.com/dms/image/example"
          type="text"
        />
        <label htmlFor="notes">Notes</label>
        <TextArea
          error={state.errors?.fieldErrors?.notes}
          className="grow"
          defaultValue={state.data?.notes || undefined}
          name="notes"
          rows={6}
        />
      </div>
      <div className="flex gap-2 self-end">
        <LinkButton theme="secondary" href={`/contacts/${contact.id}`}>
          Cancel
        </LinkButton>
        <SubmitButton theme="primary">Save</SubmitButton>
      </div>
    </form>
  );
}
