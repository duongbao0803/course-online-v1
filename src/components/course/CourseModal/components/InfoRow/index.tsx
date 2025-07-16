const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className='flex items-center justify-between py-2 border-b border-gray-100'>
    <span className='text-sm text-gray-600'>{label}</span>
    <span className='font-semibold text-sm'>{value}</span>
  </div>
);
export default InfoRow;
