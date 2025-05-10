import Page from "../animations/Page.tsx";
import { useNavigate } from "react-router-dom";
import AnimatedButton from "../components/button/AnimatedButton.tsx";
import {
  HiOutlineFire,
  HiOutlineUserGroup,
  HiOutlineLockClosed,
  HiOutlineSparkles,
} from "react-icons/hi2";
import { motion } from "framer-motion";

const features = [
  {
    icon: <HiOutlineFire className="size-8" />,
    title: "Instant Connections",
    description:
      "Connect with like-minded individuals in seconds with our advanced matching algorithm.",
  },
  {
    icon: <HiOutlineUserGroup className="size-8" />,
    title: "Vibrant Community",
    description:
      "Join thousands of users sharing interests, experiences, and meaningful conversations.",
  },
  {
    icon: <HiOutlineLockClosed className="size-8" />,
    title: "Privacy First",
    description:
      "Your data is secure with our state-of-the-art encryption and privacy controls.",
  },
  {
    icon: <HiOutlineSparkles className="size-8" />,
    title: "Personalized Experience",
    description:
      "Enjoy a tailored platform that adapts to your preferences and interaction patterns.",
  },
];

const testimonials = [
  {
    name: "Sarah K.",
    role: "Designer",
    content:
      "FlameLink transformed how I network with other creatives. The interface is intuitive and the connections are meaningful.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Michael T.",
    role: "Developer",
    content:
      "I've tried many platforms, but FlameLink stands out with its unique approach to building genuine connections.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Jessica R.",
    role: "Entrepreneur",
    content:
      "The quality of interactions on FlameLink is unmatched. It's become an essential tool for my professional growth.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
];

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Page className="w-full min-h-screen bg-black-100 text-white">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="py-6 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <HiOutlineFire className="size-8 text-pink-200" />
            <h1 className="text-2xl font-bold text-gradient">FlameLink</h1>
          </div>
          <div className="flex gap-4">
            <AnimatedButton
              onClick={() => navigate("/sign-in")}
              className="bg-transparent border-2 border-gray-300 text-white font-medium px-6 py-2 rounded-xl"
              hoverBackgroundColor="transparent"
              hoverBorderColor="#FE5487"
              hoverTextColor="#FE5487"
            >
              Sign In
            </AnimatedButton>
            <AnimatedButton
              onClick={() => navigate("/sign-up/step/1")}
              className="bg-pink-100 text-black-100 font-medium px-6 py-2 rounded-xl"
            >
              Sign Up
            </AnimatedButton>
          </div>
        </header>

        <section className="py-20 flex flex-col md:flex-row items-center gap-12">
          <div className="flex-1 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-5xl md:text-6xl font-bold leading-tight">
                Connect with <span className="text-gradient">Passion</span>,{" "}
                <br />
                Link with <span className="text-gradient">Purpose</span>
              </h2>
              <p className="mt-6 text-xl text-gray-300 max-w-2xl">
                FlameLink brings people together through meaningful connections
                that ignite conversations and build lasting relationships.
              </p>
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <AnimatedButton
                onClick={() => navigate("/sign-up/step/1")}
                className="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 text-black-100 font-bold px-8 py-4 rounded-xl text-lg"
              >
                Get Started
              </AnimatedButton>
              <AnimatedButton
                onClick={() => navigate("/about")}
                className="bg-transparent border-2 border-gray-300 text-white font-bold px-8 py-4 rounded-xl text-lg"
                hoverBackgroundColor="transparent"
                hoverBorderColor="#FE5487"
                hoverTextColor="#FE5487"
              >
                Learn More
              </AnimatedButton>
            </motion.div>
          </div>

          <motion.div
            className="flex-1 flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <img
              src="/placeholder.svg?height=500&width=500"
              alt="FlameLink Platform Preview"
              className="rounded-2xl border-4 border-pink-100 max-w-full h-auto"
            />
          </motion.div>
        </section>

        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              Why Choose <span className="text-gradient">FlameLink</span>?
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our platform is designed to create meaningful connections that
              last, with features that prioritize quality interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-100 p-6 rounded-xl border-2 border-gray-200 hover:border-pink-100 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <div className="text-pink-200 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              How <span className="text-gradient">FlameLink</span> Works
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Getting started is easy. Follow these simple steps to begin your
              journey.
            </p>
          </div>

          <div className="relative">
            {/* Connection line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-pink-100 hidden md:block transform -translate-x-1/2"></div>

            <div className="space-y-24 relative">
              {/* Step 1 */}
              <motion.div
                className="flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="md:w-1/2 flex justify-end">
                  <div className="bg-gray-100 p-6 rounded-xl border-2 border-pink-100 max-w-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-pink-100 text-black-100 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                        1
                      </div>
                      <h3 className="text-2xl font-bold">
                        Create Your Profile
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Sign up and build your personalized profile highlighting
                      your interests, goals, and what you're looking for in
                      connections.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 hidden md:block">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Create profile"
                    className="rounded-xl"
                  />
                </div>
              </motion.div>

              {/* Step 2 */}
              <motion.div
                className="flex flex-col md:flex-row-reverse items-center gap-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="md:w-1/2 flex justify-start">
                  <div className="bg-gray-100 p-6 rounded-xl border-2 border-pink-100 max-w-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-pink-100 text-black-100 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                        2
                      </div>
                      <h3 className="text-2xl font-bold">
                        Discover Connections
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Our algorithm matches you with people who share your
                      interests and goals, creating opportunities for meaningful
                      interactions.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 hidden md:block">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Discover connections"
                    className="rounded-xl"
                  />
                </div>
              </motion.div>

              {/* Step 3 */}
              <motion.div
                className="flex flex-col md:flex-row items-center gap-8"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="md:w-1/2 flex justify-end">
                  <div className="bg-gray-100 p-6 rounded-xl border-2 border-pink-100 max-w-md">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="bg-pink-100 text-black-100 font-bold rounded-full w-10 h-10 flex items-center justify-center">
                        3
                      </div>
                      <h3 className="text-2xl font-bold">Engage & Connect</h3>
                    </div>
                    <p className="text-gray-300">
                      Start conversations, join groups, and participate in
                      events that align with your interests and help you build
                      your network.
                    </p>
                  </div>
                </div>
                <div className="md:w-1/2 hidden md:block">
                  <img
                    src="/placeholder.svg?height=200&width=300"
                    alt="Engage and connect"
                    className="rounded-xl"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-20 bg-gray-100 rounded-2xl my-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">What Our Users Say</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied users who have transformed their
              social and professional networks with FlameLink.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-200 p-6 rounded-xl border-2 border-gray-300 hover:border-pink-100 transition-all"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <p className="text-gray-300 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar || "/placeholder.svg"}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full border-2 border-pink-100"
                  />
                  <div>
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-gray-300">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        <section className="py-20 text-center">
          <motion.div
            className="bg-gradient-to-r from-pink-400 via-pink-300 to-pink-200 p-12 rounded-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-4xl font-bold text-black-100 mb-4">
              Ready to Ignite Your Connections?
            </h2>
            <p className="text-xl text-black-200 max-w-3xl mx-auto mb-8">
              Join FlameLink today and experience a new way to connect with
              people who share your passions and interests.
            </p>
            <AnimatedButton
              onClick={() => navigate("/sign-up/step/1")}
              className="bg-black-100 text-white font-bold px-8 py-4 rounded-xl text-lg inline-block"
              hoverBackgroundColor="#141414"
              hoverBorderColor="#141414"
              hoverTextColor="white"
            >
              Get Started Now
            </AnimatedButton>
          </motion.div>
        </section>
      </div>
    </Page>
  );
};

export default LandingPage;
