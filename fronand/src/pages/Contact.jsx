import React from "react";

const Contact = () => {
  return (
    <section className="bg-blue-50 dark:bg-slate-800" id="contact">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mb-4">
          <div className="mb-6 max-w-3xl text-center mx-auto">
            <p className="text-base font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-200">
              Contact
            </p>
            <h2 className="font-heading mb-4 font-bold tracking-tight text-gray-900 dark:text-white text-3xl sm:text-5xl">
              Get in Touch
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-xl text-gray-600 dark:text-slate-400">
              In hac habitasse platea dictumst
            </p>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Contact Info */}
            <div className="h-full pr-6">
              <p className="mt-3 mb-12 text-lg text-gray-600 dark:text-slate-400">
                Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
              </p>
              <ul className="space-y-6">
                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                    {/* Location Icon */}
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
                      <path d="M17.657 16.657l-4.243 4.243a2 2 0 0 1 -2.827 0l-4.244 -4.243a8 8 0 1 1 11.314 0z" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Our Address</h3>
                    <p className="text-gray-600 dark:text-slate-400">TIKRI KHURD NARELA NORTH WEST DELHI </p>
                    <p className="text-gray-600 dark:text-slate-400">NEW DELHI INDIA</p>
                  </div>
                </li>

                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                    {/* Phone Icon */}
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" />
                      <path d="M15 7a2 2 0 0 1 2 2" />
                      <path d="M15 3a6 6 0 0 1 6 6" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Contact</h3>
                    <p className="text-gray-600 dark:text-slate-400">Mobile: + (91) 7061805159</p>
                    <p className="text-gray-600 dark:text-slate-400">Mail: radigitalindai@gmail.com </p>
                  </div>
                </li>

                <li className="flex">
                  <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-900 text-gray-50">
                    {/* Clock Icon */}
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                      <path d="M12 7v5l3 3" />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Working hours</h3>
                    <p className="text-gray-600 dark:text-slate-400">Monday - Friday: 08:00 - 17:00</p>
                    <p className="text-gray-600 dark:text-slate-400">Saturday & Sunday: 08:00 - 12:00</p>
                  </div>
                </li>
              </ul>
            </div>

            {/* Contact Form */}
            <div className="card h-fit max-w-6xl p-5 md:p-12 bg-white dark:bg-slate-700 rounded-lg shadow">
              <h2 className="mb-4 text-2xl font-bold dark:text-white">Ready to Get Started?</h2>
              <form action="https://fabform.io/f/xxxxx" method="post">
                <div className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Your name"
                    className="w-full rounded-md border border-gray-400 py-2 px-4 shadow-md dark:text-gray-300"
                    autoComplete="given-name"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="Your email address"
                    className="w-full rounded-md border border-gray-400 py-2 px-4 shadow-md dark:text-gray-300"
                    autoComplete="email"
                  />
                  <textarea
                    name="textarea"
                    rows="5"
                    placeholder="Write your message..."
                    className="w-full rounded-md border border-gray-400 py-2 px-4 shadow-md dark:text-gray-300"
                  ></textarea>
                  <button
                    type="submit"
                    className="w-full bg-blue-800 text-white px-6 py-3 rounded-md font-medium hover:bg-blue-900 transition"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
