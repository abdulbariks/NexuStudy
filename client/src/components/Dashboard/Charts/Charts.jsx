import { Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Loading";

export default function Charts() {
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const { data } = await axiosSecure("/stats");
      return data;
    },
  });
  console.log(data);

  const data01 = [
    { name: "Total Sessions", value: data.totalSession },
    { name: "Total Students", value: data.totalUser },
    { name: "Total Booking", value: data.totalBooking },
    { name: "Total Blogs", value: data.totalBlog },
  ];
  if (isLoading) return <Loading />;
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
        <Pie
          dataKey="value"
          isAnimationActive={false}
          data={data01}
          cx="50%"
          cy="50%"
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
