import {
  Github,
  InstagramIcon,
  Linkedin,
  Mail,
  MapPin,
  Send,
  Youtube,
} from "lucide-react";
import React, { useState } from "react";
import { portfolioData } from "../data/portfolio";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, subject, message } = formData;

    const mailto = `mailto:veer.prakashwork@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    )}`;

    window.location.href = mailto;

    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: portfolioData.social.github,
      color: "hover:text-gray-900",
    },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: portfolioData.social.linkedin,
      color: "hover:text-blue-600",
    },
    {
      name: "Youtube",
      icon: Youtube,
      url: portfolioData.social.youtube,
      color: "hover:text-red-700",
    },
    {
      name: "Instgram",
      icon: InstagramIcon,
      url: portfolioData.social.instagram,
      color: "hover:text-pink-500",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gray-50 relative overflow-hidden"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Get In
            <span className="bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              {" "}
              Touch
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Let's work together to bring your ideas to life. I'm always excited
            to discuss new opportunities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Let's start a conversation
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8">
                Whether you have a project in mind, want to collaborate, or just
                want to say hello, I'd love to hear from you. Drop me a message
                and I'll get back to you as soon as possible.
              </p>
            </div>

            {/* Contact Details */}
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Mail
                    className="text-blue-600"
                    size={24}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Email
                  </p>
                  <a
                    href={`mailto:${portfolioData.personal.email}`}
                    className="text-gray-900 font-semibold hover:text-blue-600 transition-colors duration-200"
                  >
                    {portfolioData.personal.email}
                  </a>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <MapPin
                    className="text-orange-600"
                    size={24}
                  />
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">
                    Location
                  </p>
                  <p className="text-gray-900 font-semibold">
                    {portfolioData.personal.location}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-8 border-t border-gray-200">
              <p className="text-sm text-gray-500 font-medium mb-4">
                Follow me on social media
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600 ${social.color} transition-all duration-200 hover:scale-110 hover:shadow-lg`}
                  >
                    <social.icon size={24} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-colors duration-200"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-colors duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="subject"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-colors duration-200"
                  placeholder="What's this about?"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-900 placeholder-gray-500 transition-colors duration-200 resize-none"
                  placeholder="Tell me about your project or just say hello!"
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white font-semibold py-4 px-6 rounded-lg transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <Send size={20} />
                <span>Send Message</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;