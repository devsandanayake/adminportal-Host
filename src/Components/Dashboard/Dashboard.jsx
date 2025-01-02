import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchData } from "../../actions/postAction";
import { getUser } from "../../actions/userAction";
import { Line, Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend } from "chart.js";
import { FaPlane, FaUserFriends, FaMapMarkedAlt } from "react-icons/fa";
 
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, ArcElement, BarElement, Title, Tooltip, Legend);

export default function TravelDashboard() {
  const dispatch = useDispatch();
  const dataState = useSelector((state) => state.data);
  const userState = useSelector((state) => state.user);

  React.useEffect(() => {
    dispatch(fetchData());
    dispatch(getUser());
  }, [dispatch]);

  const destinationsCount = dataState.data.length;
  const userCount = userState.data.filter((user) => user.role !== "admin").length;

  const pieData = {
    labels: ["Pending", "Approved", "Rejected"],
    datasets: [
      {
        data: [
          dataState.data.filter((post) => post.status === 0).length,
          dataState.data.filter((post) => post.status === 1).length,
          dataState.data.filter((post) => post.status === 2).length,
        ],
        backgroundColor: ["#ff6384", "#36a2eb", "#ffcd56"],
      },
    ],
  };

  const chartData = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4"],
    datasets: [
      {
        label: "Sales",
        data: [100, 200, 150, 250],
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Travel Dashboard</h1>
        <p className="text-gray-600">Your gateway to managing trips and destinations</p>
      </header>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="p-6 bg-white shadow rounded-lg flex items-center space-x-4">
          <FaMapMarkedAlt className="text-blue-500 text-4xl" />
          <div>
            <h2 className="text-gray-700 text-xl font-semibold">Destinations</h2>
            <p className="text-2xl font-bold">{destinationsCount}</p>
          </div>
        </div>

        <div className="p-6 bg-white shadow rounded-lg flex items-center space-x-4">
          <FaUserFriends className="text-green-500 text-4xl" />
          <div>
            <h2 className="text-gray-700 text-xl font-semibold">Travelers</h2>
            <p className="text-2xl font-bold">{userCount}</p>
          </div>
        </div>

        <div className="p-6 bg-white shadow rounded-lg flex items-center space-x-4">
          <FaPlane className="text-red-500 text-4xl" />
          <div>
            <h2 className="text-gray-700 text-xl font-semibold">Upcoming Trips</h2>
            <p className="text-2xl font-bold">24</p>
          </div>
        </div>
      </div>

      {/* Charts and Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Overview */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sales Overview</h2>
          <Line data={chartData} />
        </div>

        {/* Destination Stats */}
        <div className="bg-white p-6 shadow rounded-lg">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Destination Status</h2>
          <Pie data={pieData} />
        </div>
      </div>

      {/* Popular Destinations */}
      <section className="mt-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Popular Destinations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img src='https://img.freepik.com/free-photo/beautiful_1203-2633.jpg?t=st=1735843717~exp=1735847317~hmac=ec7078e8999e4bcd92defa80cb82a098890f4fc55e7d116d04dd6acb8b1a1a4c&w=1800' alt="Beach" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Tropical Beach</h3>
              <p className="text-gray-600">Relax at pristine beaches with crystal clear waters.</p>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img src='https://img.freepik.com/free-photo/beautiful-scenery-summit-mount-everest-covered-with-snow-white-clouds_181624-21317.jpg?t=st=1735843933~exp=1735847533~hmac=d7e60d7d80473c31b89c0f8174475c4486a3c125e373b1e2f1b4213e53d669b5&w=1800' alt="Adventure" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Mountain Adventure</h3>
              <p className="text-gray-600">Experience the thrill of high-altitude trekking.</p>
            </div>
          </div>
          <div className="bg-white shadow rounded-lg overflow-hidden">
            <img src='https://img.freepik.com/free-photo/stylish-caucasian-woman-trendy-panama-waist-neon-bag-roof-bangkok_343596-92.jpg?t=st=1735843975~exp=1735847575~hmac=660f2f91d156fad5511c887e0fc936378e24f122104f1c999a3a5ff9e56e30a7&w=1800' alt="City" className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800">Urban Getaway</h3>
              <p className="text-gray-600">Explore the vibrant culture of metropolitan cities.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}