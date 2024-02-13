export default function CustomTable({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'table'>) {
  return (
    <div className="my-[2.5rem] max-w-full overflow-x-auto">
      <table {...props}>{children}</table>
    </div>
  );
}
