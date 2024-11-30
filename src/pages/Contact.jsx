import { Phone, Mail } from "lucide-react";

const Contact = () => {
  return (
    <div className="bg-white px-2 md:px-6 lg:px-8 ">
      
      <div className="max-w-7xl mx-auto px-4 md:px-12 lg:px-20 py-10">
        <h1 className="text-3xl font-bold mb-6">Contact</h1>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Contact Info Section */}
          <div className="bg-white shadow-md p-6 rounded-md md:w-1/3 w-full">
            <div className="mb-6">
              <div className="flex gap-3 text-xl font-semibold mb-2 items-center">
                <Phone size={38} className="text-white bg-red-500 mr-2 rounded-full p-2" />
                <span>Call To Us</span>
              </div>
              <p className="text-gray-600">
                We are available 24/7, 7 days a week.
              </p>
              <p className="text-gray-800 font-semibold mt-2">+88061112222</p>
            </div>
            <div>
              <hr className="mb-6"/>
            <div className="flex gap-3 text-xl font-semibold mb-2 items-center">
                <Mail size={38} className="text-white bg-red-500 mr-2 rounded-full p-2" />
                <span>Write To Us</span>
              </div>
              <p className="text-gray-600">
                Fill out our form and we will contact you within 24 hours.
              </p>
              <p className="text-gray-800 font-semibold mt-2">
                Emails: customer@exclusive.com
              </p>
              <p className="text-gray-800 font-semibold">
                Emails: support@exclusive.com
              </p>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white shadow-md p-6 rounded-md md:w-2/3 w-full">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Your Name *"
                  className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <input
                  type="email"
                  placeholder="Your Email *"
                  className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
                <input
                  type="text"
                  placeholder="Your Phone *"
                  className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-200"
                />
              </div>
              <textarea
                placeholder="Your Message"
                className="bg-gray-100 border border-gray-300 rounded-md p-2 w-full h-32 focus:outline-none focus:ring-2 focus:ring-gray-200 mb-4"
              ></textarea>
              <div className="flex justify-end">
              <button
                type="submit"
                className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition"
              >
                Send Message
              </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;