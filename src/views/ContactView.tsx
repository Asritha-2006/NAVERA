import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactView: React.FC = () => {
  const { showToast } = useShop();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Bespoke Consultation',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }
    setSubmitted(true);
    showToast('Your message has been dispatched to our senior styling concierge.', 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto pb-4 border-b border-slate-200">
        <span className="text-[11px] tracking-[0.25em] uppercase text-[#C6A867] font-semibold">
          ATELIER CONCIERGE
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#0B1B3D] mt-1">
          Contact NAVÉRA
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 mt-2 leading-relaxed">
          Whether you desire a private measurement appointment, bespoke wedding consultation, or order assistance, our stylists await your message.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Contact Form Left (7 cols) */}
        <div className="lg:col-span-7 bg-white border border-slate-200 p-6 sm:p-8 rounded-sm shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-[#0B1B3D] mb-6">
            Send an Atelier Inquiry
          </h2>

          {submitted ? (
            <div className="p-8 text-center bg-[#FAF9F5] border border-[#C6A867]/40 rounded-sm space-y-3">
              <CheckCircle2 className="w-12 h-12 text-[#C6A867] mx-auto" />
              <h3 className="font-serif text-xl font-bold text-[#0B1B3D]">
                Thank You, {form.name}
              </h3>
              <p className="text-xs text-slate-600 max-w-sm mx-auto">
                We have received your message regarding <strong>{form.subject}</strong>. A style concierge will respond within 4 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: '', email: '', phone: '', subject: 'Bespoke Consultation', message: '' });
                }}
                className="mt-4 px-6 py-2 bg-[#0B1B3D] text-[#FAF9F5] text-xs font-semibold uppercase tracking-wider"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Singhania"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    placeholder="patron@domain.com"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={e => setForm({ ...form, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 font-mono focus:outline-hidden focus:border-[#0B1B3D]"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Inquiry Subject
                  </label>
                  <select
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                  >
                    <option value="Bespoke Consultation">Bespoke Consultation</option>
                    <option value="Order & Dispatch Status">Order & Dispatch Status</option>
                    <option value="Bridal & Wedding Trousseau">Bridal & Wedding Trousseau</option>
                    <option value="Corporate / Bulk Acquisition">Corporate / Bulk Acquisition</option>
                    <option value="Garment Customization">Garment Customization</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Message / Requirements *
                </label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  placeholder="Detail your event date, fit requirements, fabric interests, or any questions..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 focus:outline-hidden focus:border-[#0B1B3D]"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="px-8 py-3.5 bg-[#0B1B3D] hover:bg-[#162B56] text-[#FAF9F5] text-xs font-bold tracking-widest uppercase transition-all shadow-md flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#C6A867]" />
                  <span>Transmit Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Atelier Locations & Contact Info Right (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Contact Cards */}
          <div className="bg-[#FAF9F5] border border-slate-200 p-6 rounded-sm space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-[#0B1B3D]">
              Direct Atelier Access
            </h3>

            <div className="flex items-start gap-3">
              <Mail className="w-4 h-4 text-[#C6A867] mt-0.5 shrink-0" />
              <div>
                <span className="text-slate-400 uppercase text-[10px] block font-mono">Email</span>
                <a href="mailto:concierge@navera.com" className="font-bold text-[#0B1B3D] hover:underline">
                  concierge@navera.com
                </a>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 text-[#C6A867] mt-0.5 shrink-0" />
              <div>
                <span className="text-slate-400 uppercase text-[10px] block font-mono">Toll-Free Concierge</span>
                <span className="font-bold text-[#0B1B3D] font-mono">+91 80 4920 1800</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Clock className="w-4 h-4 text-[#C6A867] mt-0.5 shrink-0" />
              <div>
                <span className="text-slate-400 uppercase text-[10px] block font-mono">Salon Business Hours</span>
                <p className="font-medium text-slate-700">Mon – Sat: 10:00 AM – 8:30 PM IST</p>
                <p className="text-slate-500">Sunday: 11:00 AM – 7:00 PM IST</p>
              </div>
            </div>
          </div>

          {/* Map-Style Atelier Locations Showcase */}
          <div className="bg-white border border-slate-200 p-6 rounded-sm space-y-4">
            <h3 className="font-serif text-lg font-bold text-[#0B1B3D] flex items-center gap-2">
              <MapPin className="w-5 h-5 text-[#C6A867]" />
              <span>Flagship Ateliers</span>
            </h3>

            {/* Stylized Atelier Map Card */}
            <div className="p-4 bg-[#0B1B3D] text-[#FAF9F5] rounded-xs space-y-2 relative overflow-hidden">
              <div className="text-[10px] text-[#C6A867] font-mono tracking-widest uppercase">
                FLAGSHIP SALON & TAILORING HOUSE
              </div>
              <h4 className="font-serif text-base font-bold">Bengaluru Atelier</h4>
              <p className="text-xs text-slate-300">
                Level 2, The Estate, 100 Feet Road, Indiranagar, Bengaluru, KA 560038
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xs space-y-1 text-xs">
              <span className="font-bold text-[#0B1B3D]">Mumbai Atelier</span>
              <p className="text-slate-600">
                Heritage Wing, Colaba Causeway, Near Gateway of India, Mumbai, MH 400001
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-xs space-y-1 text-xs">
              <span className="font-bold text-[#0B1B3D]">New Delhi Atelier</span>
              <p className="text-slate-600">
                The Courtyard, Kalka Das Marg, Mehrauli Heritage District, New Delhi 110030
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
