"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { HeartHandshake } from "lucide-react";

function DonationForm() {
  const [donationType, setDonationType] = useState<'cash' | 'inkind'>('cash');
  const [description, setDescription] = useState('');
  const [postalAccount, setPostalAccount] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

 

  const bankDetails = {
    bank: 'Equity Bank',
    accountNumber: '0250178755271',
  };

  function copy(text: string) {
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setMessage('Copied to clipboard!');
      setTimeout(() => setMessage(''), 2000);
    }
  }

  // Set NEXT_PUBLIC_FORMSPREE_ENDPOINT to your Formspree form URL, e.g.
  // https://formspree.io/f/yourFormId
  const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || '';

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);

    if (donationType !== 'inkind') {
      setMessage('To submit, please select "In-Kind" and provide donation details.');
      return;
    }

    if (!description.trim()) {
      setMessage('Please describe what you intend to donate.');
      return;
    }

    setLoading(true);

    try {
      if (endpoint) {
        // Use Formspree-friendly submission: FormData + Accept header
        const formData = new FormData();
        formData.append('donationType', donationType);
        formData.append('description', description);
        formData.append('postalAccount', postalAccount);
        formData.append('timestamp', new Date().toISOString());

        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: formData,
        });

        if (!res.ok) {
          // try to read JSON error from Formspree if present
          let errText = 'Failed to submit';
          try {
            const json = await res.json();
            if (json && json.error) errText = json.error;
          } catch {
            /* ignore parse error */
          }
          throw new Error(errText);
        }

        setSubmitted(true);
        setMessage('Thank you! Your in-kind donation details were sent. We will contact you soon.');
      } else {
        // endpoint not configured — simulate submit for now
        await new Promise((r) => setTimeout(r, 700));
        setSubmitted(true);
        setMessage('Demo submit successful — the form is ready to be connected to Formspree.');
      }
    } catch {
      setError(true);
      setMessage('Submission failed. Please try again later.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-5 md:space-y-6">
      <fieldset className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <legend className="sr-only">Donation type</legend>

        <label className={`inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 rounded-full border transition font-medium text-sm md:text-base cursor-pointer ${donationType === 'cash' ? 'bg-yellow-100 border-yellow-300' : 'border-gray-200 hover:border-gray-300'}`}>
          <input
            type="radio"
            name="donationType"
            value="cash"
            checked={donationType === 'cash'}
            onChange={() => setDonationType('cash')}
            className="sr-only"
          />
          <span>💰 Cash</span>
        </label>

        <label className={`inline-flex items-center gap-2 px-4 md:px-5 py-2 md:py-3 rounded-full border transition font-medium text-sm md:text-base cursor-pointer ${donationType === 'inkind' ? 'bg-yellow-100 border-yellow-300' : 'border-gray-200 hover:border-gray-300'}`}>
          <input
            type="radio"
            name="donationType"
            value="inkind"
            checked={donationType === 'inkind'}
            onChange={() => setDonationType('inkind')}
            className="sr-only"
          />
          <span>🎁 In-Kind</span>
        </label>
      </fieldset>

      {donationType === 'cash' && (
        <div className="p-4 md:p-6 bg-yellow-50 border border-yellow-100 rounded-lg space-y-6">
          <div>
            <h4 className="font-semibold text-gray-800 text-base md:text-lg">Bank Transfer Details</h4>
            <p className="text-sm text-gray-600 mt-2">Send your donation via bank transfer. Use the <em>Copy</em> button for convenience.</p>

            <div className="mt-4 space-y-2">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                <div className="text-sm text-gray-700 flex-1">
                  <div><strong>Bank:</strong> {bankDetails.bank}</div>
                </div>
                <button type="button" onClick={() => copy(bankDetails.bank)} className="w-full sm:w-auto px-3 py-2 bg-yellow-600 text-white rounded-md text-sm hover:bg-yellow-700 transition font-medium">Copy</button>
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-4">
                <div className="text-sm text-gray-700 flex-1">
                  <div><strong>Account Number:</strong> <code className="bg-gray-200 px-2 py-1 rounded">{bankDetails.accountNumber}</code></div>
                </div>
                <button type="button" onClick={() => copy(bankDetails.accountNumber)} className="w-full sm:w-auto px-3 py-2 bg-yellow-600 text-white rounded-md text-sm hover:bg-yellow-700 transition font-medium">Copy</button>
              </div>
            </div>
          </div>

          <hr className="border-yellow-200" />

              </div>
            
          
       
      )}

      {donationType === 'inkind' && (
        <div className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-gray-700 block mb-2">Describe your donation</span>
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              placeholder="E.g. 20 school shirts, 5 boxes of books" 
              className="w-full border border-gray-300 rounded-md p-3 min-h-[90px] text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium text-gray-700 block mb-2">Postal / delivery account (optional)</span>
            <input 
              value={postalAccount} 
              onChange={(e) => setPostalAccount(e.target.value)} 
              placeholder="Postal account, courier reference or location" 
              className="w-full border border-gray-300 rounded-md p-3 text-base focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" 
            />
          </label>
        </div>
      )}

      <div className="flex flex-col gap-4 mt-6">
        <button
          type="submit"
          className={`w-full md:w-auto px-6 py-3 rounded-full font-semibold transition text-base ${donationType === 'inkind' ? 'bg-pink-500 hover:bg-pink-600 text-white' : 'bg-gray-200 text-gray-500 cursor-not-allowed'}`}
          disabled={donationType !== 'inkind' || loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {donationType !== 'inkind' && (
          <p className="text-sm text-gray-600 md:text-base">Switch to <strong>In-Kind</strong> to submit donation details.</p>
        )}
      </div>

      {message && <p className={`text-sm mt-2 ${error ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}

      {submitted && donationType === 'inkind' && (
        <div className="mt-4 p-3 bg-green-50 border border-green-100 rounded-md text-sm text-gray-700">
          Thanks — we&apos;ve noted your in-kind donation and will reach out with pickup/delivery details.
        </div>
      )}
    </form>
  );
}


export default function DonationSection() {
  return (
    <section
      id="donate"
      className="w-full py-16 md:py-20 bg-yellow-50/40"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-800">
            Support <span className="text-yellow-600">House of Hope</span>
          </h2>
          <p className="mt-3 md:mt-4 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Your support helps us provide shelter, education, love, and a brighter future
            for children in need. Every contribution—big or small—makes a real impact.
          </p>
        </div>

        {/* Donation Form */}
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-2xl shadow-lg p-6 md:p-8 border border-yellow-100 hover:shadow-xl transition"
          >
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 md:gap-4 mb-6">
              <div className="p-3 md:p-4 bg-yellow-200 rounded-xl flex-shrink-0">
                <HeartHandshake className="w-6 md:w-8 h-6 md:h-8 text-yellow-700" />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800">
                Support a Child — Quick Details
              </h3>
            </div>

              <p className="text-gray-600 text-sm md:text-base mb-6">
                Choose the type of support and follow the instructions below. For cash donations we show our bank details; for in-kind, describe what you&apos;ll give and we&apos;ll follow up with pickup/delivery instructions.
              </p>

            <DonationForm />

          </motion.div>
        </div>

        {/* CTA removed per request */}
      </div>
    </section>
  );
}
