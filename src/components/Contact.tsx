import { toast } from "react-toastify";
import { useState } from "react";

import { FaSquareXTwitter, FaLinkedin } from "react-icons/fa6";

import { FaGithubSquare, FaXingSquare } from "react-icons/fa";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !email || !message || !phone) {
      toast.error("Email not sent, Please fill in all fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const response = await fetch("https://formspree.io/f/mjvqjwgj", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast.success("Email sent successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setTimeout(() => {
          setIsSubmitted(false);
          setName("");
          setEmail("");
          setPhone("");
          setMessage("");
        }, 3000);
      } else {
        toast.error("Failed to send email", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error sending email:", error.message);
        toast.error("Failed to send email", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        console.error("Unexpected error", error);
      }
    }
  };

  return (
    <>
      <section id="contact">
        <div className="flex  flex-col justify-center bg-[#F0F3F9] items-center relative mt-20">
          <h1 className="text-xl md:text-3xl text-[#7879F1] font-extrabold">
            Get in Touch
          </h1>
          <p className="italic text-md pt-3">
            We look forward to receiving your feedback.
          </p>
          <div className="w-full md:flex rounded-2xl  md:w-auto my-10 md:px-0 px-3">
            <div className="rounded-lg md:rounded-none bg-white p-8 shadow-lg lg:col-span-3 lg:p-12 border border-gray-300">
              <form
                action="#"
                className="md:space-y-4 space-y-2 z-50"
                onSubmit={sendEmail}
              >
                <div>
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:border-[#26313F]"
                    type="text"
                    id="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="sr-only" htmlFor="email">
                      Email
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:border-[#26313F]"
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="johndoe@gmail.com"
                    />
                  </div>

                  <div>
                    <label className="sr-only" htmlFor="phone">
                      Phone
                    </label>
                    <input
                      className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:border-[#26313F]"
                      placeholder="+43 600 000 000"
                      type="text"
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="message">
                    Message
                  </label>

                  <textarea
                    className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:outline-none focus:border-[#26313F]"
                    placeholder="Message"
                    rows={6}
                    id="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  ></textarea>
                </div>

                <div className="md:pt-0 flex flex-col items-center justify-center">
                  <button
                    type="submit"
                    className={`inline-block  w-auto  text-md rounded-lg px-3 py-2 md:px-5 md:py-3 font-bold sm:w-auto ${
                      isSubmitted
                        ? "bg-green-500 text-white"
                        : "bg-[#7879F1] text-white"
                    }`}
                  >
                    {isSubmitted ? "Message sent successfully" : "Send message"}
                  </button>
                </div>
              </form>
            </div>
          </div>
          {/* <div className="flex gap-3 mb-2  justify-center  ">
            <a
              href="https://github.com/Nimrod2022"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithubSquare className="size-7 text-[#9191F3] " />
            </a>

            <a
              href="https://www.linkedin.com/in/nimrod-kibet-b6b340115/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin className="size-7 text-[#9191F3]" />
            </a>
            <a
              href="https://www.xing.com/profile/Nimrod_Kibet"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaXingSquare className="size-7 text-[#9191F3]" />
            </a>

            <a
              href="https://twitter.com/MandelaGI?t=ejgoi2MMFnyuNXcdNoMXtA&s=09"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaSquareXTwitter className="size-7 text-[#9191F3]" />
            </a>
          </div> */}
        </div>
      </section>
    </>
  );
};

export default Contact;
