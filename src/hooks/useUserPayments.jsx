import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUserPayments = (email) => {
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading, refetch } = useQuery({
    queryKey: ['payments', email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/payments/${email}`);
      return res.data;
    },
    enabled: !!email // only fetch if email exists
  });

  return [payments, isLoading, refetch];
};

export default useUserPayments;
