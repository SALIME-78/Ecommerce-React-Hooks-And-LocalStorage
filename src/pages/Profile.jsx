function Profile() { 

  const user = JSON.parse(localStorage.getItem('user'))
  
    return (
        user && <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <div className="flex justify-between items-center mb-8 space-y-4 sm:space-y-0">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">Home</span>
              <span className="text-gray-500">/</span>
              <span className="text-gray-900">My Account</span>
            </div>
            <div className="flex items-center gap-2 mt-6">
              <span className="text-gray-600">Welcome!</span>
              <span className="text-red-500">{user.name}</span>
            </div>
          </div>
    
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* Sidebar */}
            <div className="w-full lg:w-64 flex-shrink-0">
              <h2 className="font-medium text-lg mb-4">Manage My Account</h2>
              <div className="space-y-3">
                <div className="text-red-500 cursor-pointer">My Profile</div>
                <div className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">Address Book</div>
                <div className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">My Payment Options</div>
              </div>
    
              <h2 className="font-medium text-lg mt-8 mb-4">My Orders</h2>
              <div className="space-y-3">
                <div className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">My Returns</div>
                <div className="text-gray-600 cursor-pointer hover:text-gray-800 transition-colors">My Cancellations</div>
              </div>
    
              <h2 className="font-medium text-lg mt-8 mb-4">My Wishlist</h2>
            </div>
    
            {/* Form Section */}
            <div className="flex-1">
              <h2 className="text-red-500 text-xl font-medium mb-6">Edit Your Profile</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    defaultValue={user.name}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    defaultValue={user.lastName}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    defaultValue={user.address}
                    className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  />
                </div>
              </div>
    
              <h2 className="text-gray-900 font-medium mt-8 mb-6">Password Changes</h2>
              <div className="space-y-4">
                <input
                  type="password"
                  placeholder="Current Password"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="password"
                  placeholder="New Password"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                />
              </div>
    
              <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
                <button className="w-full sm:w-auto px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors">
                  Cancel
                </button>
                <button className="w-full sm:w-auto px-6 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }


export default Profile;