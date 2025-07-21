import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
  const { user, loading } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();

  const {
    data: role,
    isLoading: isRoleLoading,
    refetch,
  } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/user/role/${user?.email}`);
      return data;
    },
  });

  console.log(role);

  return [role?.role, isRoleLoading, refetch];
};

export default useRole;
