import React from 'react';

const AdminDashboard = () => {
  const stats = [
    { title: 'Users', value: '1 M', icon: '👥' },
    { title: 'Total Earnings', value: '2.1 M', icon: '💰' },
    { title: 'Employees', value: '10K', icon: '👤' },
    { title: 'Bookings', value: '12 K', icon: '📚' },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex">
        
        <div className="w-64 p-6 fixed left-0 h-screen">
        <div className="mb-6 left-4 right-3 ">
            <img
              src='https://i.ibb.co/YP4SSWR/image-2.png'
              alt="sltravellogo"
              className="rounded w-30 h-20"
            />
          </div>
        
          {['Home', 'Destination Management', 'Ticket Management', 'Guide Management',
            'Event Management', 'Hotel Management', 'Rentals Management', 'Logout'].map((item) => (
            <button key={item} className="w-full mb-2 py-3 px-4 bg-yellow-300 rounded-lg text-left hover:bg-yellow-400">
              {item}
            </button>
          ))}
        </div>

        <div className="ml-70 p-6 ">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <img
                  src="data:image/png;base64,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"
                  alt="SL Travel Logo"
                  className="mr-2 w-15 h-10 rounded-full"
                />
                <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              </div>
              <input
                type="search"
                placeholder="Search"
                className="px-4 py-2 rounded-lg border w-1/3"
              />
            </div>

            <div className="flex gap-14 mb-6">
              {stats.map((stat) => (
                <div key={stat.title} className="p-9 bg-yellow-300 rounded-lg shadow w-60">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm">{stat.title}</div>
                    </div>
                    <div className="text-2xl">{stat.icon}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-6 mb-6">
              <div className="bg-white p-4 rounded-lg shadow w-1/2">
                <h2 className="font-bold mb-4">Latest Hotel Bookings</h2>
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex gap-4">
                      <img
                        src={`https://i.ibb.co/ZxLXxb4/image-1.png`}
                        alt={`Colombo Resort ${i}`}
                        className="rounded w-30 h-20"
                      />
                      <div>
                        <h3 className="font-semibold">Colombo-resort</h3>
                        <p className="text-sm text-gray-600">Luxury stay with ocean view</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white p-4 rounded-lg shadow w-1/2">
                <h2 className="font-bold mb-4">Earning state on all bookings</h2>
                <img
                  src="https://www.syncfusion.com/blogs/wp-content/uploads/2021/02/Line-chart-showing-the-past-three-years-of-monthly-income-and-expenses-in-separate-line-series..jpg"
                  alt="Earnings Graph"
                  className="w-full h-80 rounded-lg"
                />
              </div>
            </div>

            <div className="flex gap-6">
              <div className="bg-white p-4 rounded-lg shadow w-1/3">
                <h2 className="font-bold mb-4">Top Valued Clients</h2>
                <img
                  src="https://img.freepik.com/free-vector/sample-call-center-avatars_23-2147941926.jpg"
                  alt="Clients"
                  className="w-full h-80 rounded-lg"
                />
              </div>

              <div className="bg-white p-4 rounded-lg shadow w-1/3">
                <h2 className="font-bold mb-4">Reach</h2>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStMjr9wb6f1I3XMgPm9VgBmplkx8yNWfqD7Q&s"
                  alt="Reach Chart"
                  className="w-full h-70 rounded-lg"
                />
              </div>

              <div className="bg-white p-4 rounded-lg shadow w-1/3">
                <h2 className="font-bold mb-4">Help Desk</h2>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc1RsQR0YTTeKdW7JXixcTBu_R9t9weiBTMw&s"
                  alt="Help Desk"
                  className="w-full h-70 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
