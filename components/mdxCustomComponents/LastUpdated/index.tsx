interface LastUpdatedProps {
  updated: string;
}

export default function LastUpdated({ updated }: LastUpdatedProps) {
  return (
    <div className="mt-4 flex items-baseline gap-2">
      <h4 className="!m-0 !text-xs uppercase text-primary-300">
        Last Updated:
      </h4>
      <p className="!m-0 text-xs !font-bold">
        <time dateTime={updated.split('T')[0]}>
          {new Intl.DateTimeFormat('en-US', {
            dateStyle: 'long',
            timeZone: 'UTC',
          }).format(new Date(updated))}
        </time>
      </p>
    </div>
  );
}
