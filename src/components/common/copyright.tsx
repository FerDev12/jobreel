export function Copyright() {
  const year = new Date().getFullYear();

  return (
    <p className='text-sm font-medium text-muted-foreground'>
      &copy; {year} Jobreel, Inc.
    </p>
  );
}
