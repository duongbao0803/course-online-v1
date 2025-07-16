const SectionTitle = ({ title }: { title: string }) => (
  <div className='flex items-center mb-4'>
    <div className='w-1 h-6 rounded-full mr-3 bg-green' />
    <h3 className='text-xl font-bold text-gray-900'>{title}</h3>
  </div>
);

export default SectionTitle;
