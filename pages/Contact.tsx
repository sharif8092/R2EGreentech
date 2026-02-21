import React, { useState, useEffect } from "react";
import axios from "axios";
import { Mail, Phone, MapPin, Send, MessageSquare, Clock, ShieldCheck } from "lucide-react";

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    category: "HVAC Thermal Audit",
    message: "",
  });

  useEffect(() => {
    document.title = "Contact Us | Request Technical Audit | R2E Greentech";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc)
      metaDesc.setAttribute(
        "content",
        "Connect with our engineering hub in New Delhi. Schedule site visits or consult with our promoters."
      );
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "https://r2egreentech.in/backend/leads/add-lead.php",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status === "success") {
        setSubmitted(true);
        setFormData({
          name: "",
          company: "",
          email: "",
          category: "HVAC Thermal Audit",
          message: "",
        });

        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert("Submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      alert("Server error. Please try later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-20 pb-16 bg-slate-50">
      <section className="py-16 bg-slate-900 text-white">
        <div className="max-w-[1440px] mx-auto px-4">
          <h1 className="text-4xl font-black mb-4 uppercase tracking-tighter">
            Engineer Your <span className="text-emerald-500">Net-Zero Future</span>
          </h1>
          <p className="text-lg text-slate-400">
            Request a technical site audit or speak with our promoters.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="max-w-[1440px] mx-auto px-4">
          <div className="grid lg:grid-cols-12 gap-12">

            {/* LEFT INFO PANEL */}
            <div className="lg:col-span-5 space-y-8">
              <h3 className="text-xl font-bold text-slate-900 uppercase">
                Engineering Hub
              </h3>

              {[
                { icon: <Phone />, value: "+91 98828 96642", href: "tel:+919882896642" },
                { icon: <Mail />, value: "info@r2egreentech.com", href: "mailto:info@r2egreentech.com" },
                { icon: <MapPin />, value: "Plot 7, Sector 10 Dwarka, New Delhi", href: null },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3">
                  {item.icon}
                  {item.href ? (
                    <a href={item.href} className="text-slate-900 font-semibold">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-slate-900 font-semibold">{item.value}</p>
                  )}
                </div>
              ))}

              <div className="p-6 bg-white rounded-xl shadow">
                <Clock className="text-emerald-600 mb-3" />
                <p className="text-sm text-slate-600">
                  Expert availability on Tuesdays & Thursdays.
                </p>
              </div>

              <div className="flex items-center p-4 bg-emerald-50 rounded-xl">
                <ShieldCheck className="text-emerald-600 mr-2" />
                <span className="text-sm font-semibold text-emerald-800">
                  Secure Industrial Protocol Active
                </span>
              </div>
            </div>

            {/* RIGHT FORM PANEL */}
            <div className="lg:col-span-7">
              <div className="bg-white p-10 rounded-3xl shadow-xl relative">

                {submitted && (
                  <div className="absolute inset-0 bg-white flex flex-col items-center justify-center z-10">
                    <Send className="text-emerald-600 w-10 h-10 mb-3" />
                    <h3 className="text-xl font-bold">Submission Successful</h3>
                    <p className="text-slate-500">We will respond within 24 hours.</p>
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-6 flex items-center">
                  <MessageSquare className="mr-2 text-emerald-600" />
                  Industrial Inquiry
                </h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <input
                    required
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full p-3 border rounded-lg"
                  />

                  <input
                    required
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company"
                    className="w-full p-3 border rounded-lg"
                  />

                  <input
                    required
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Work Email"
                    className="w-full p-3 border rounded-lg"
                  />

                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 border rounded-lg"
                  >
                    <option>HVAC Thermal Audit</option>
                    <option>EPR & E-Waste Program</option>
                    <option>Solar Thermal Installation</option>
                    <option>Process Engineering</option>
                  </select>

                  <textarea
                    required
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe requirements..."
                    className="w-full p-3 border rounded-lg h-28"
                  ></textarea>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-emerald-700 text-white rounded-lg font-bold hover:bg-emerald-800 transition"
                  >
                    {loading ? "Submitting..." : "Submit Technical Brief"}
                  </button>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;