'use client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { EyeIcon, EyeOffIcon } from 'lucide-react';

export function PasswordInput() {
  const [show, setShow] = useState(false);

  return (
    <div>
      <Input type='password' />
      <Button
        size='icon'
        variant='ghost'
        onClick={() => setShow((prev) => !prev)}
        className='text-muted-foreground'
      >
        {show ? (
          <EyeIcon className='w-4 h-4' />
        ) : (
          <EyeOffIcon className='w-4 h-4' />
        )}
      </Button>
    </div>
  );
}
