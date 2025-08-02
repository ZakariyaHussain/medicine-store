// import { useQuery } from '@tanstack/react-query';
// import useAxiosSecure from './useAxiosSecure';
// import useAuth from './useAuth';

// const useRole = () => {
//   const { user, loading } = useAuth();
//   const axiosSecure = useAxiosSecure();

//   const { data: role, isLoading: roleLoading } = useQuery({
//     queryKey: ['userRole', user?.email],
//     enabled: !!user?.email && !loading,
//     queryFn: async () => {
//       const res = await axiosSecure.get(`/users/${user.email}`); // You must have this endpoint
//       return res.data.role;
//     }
//   });

//   return [role, loading || roleLoading];
// };

// export default useRole;


// useRole.js
import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useRole = () => {
  const { user, loading } = useAuth(); // Auth context
  const axiosSecure = useAxiosSecure();

  const { data: role, isLoading } = useQuery({
    queryKey: ['userRole', user?.email],
    enabled: !!user?.email && !loading,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data?.role;
    },
  });

  return [role, isLoading];
};

export default useRole;

