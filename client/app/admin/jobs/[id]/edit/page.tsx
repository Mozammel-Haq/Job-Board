'use client';
import { useParams } from 'next/navigation';
import JobForm from '@/components/admin/JobForm';
export default function EditJobPage() { 
  const { id } = useParams();
  return <JobForm id={id as string} />; 
}
