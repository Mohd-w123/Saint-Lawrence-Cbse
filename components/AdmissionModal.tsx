"use client";

import Image from "next/image";
import { FormEvent, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { images } from "@/lib/images";

type AdmissionModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function AdmissionModal({ open, onClose }: AdmissionModalProps) {
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 z-10 rounded-full bg-gray-100 p-2 text-gray-600 hover:bg-gray-200"
          aria-label="Close"
        >
          <FaTimes />
        </button>

        <div className="relative h-32 overflow-hidden rounded-t-2xl">
          <Image
            src={images.admissionBanner}
            alt="Admissions open"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#003d78]/70" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white">
            <h3 className="text-xl font-bold">Admissions Are Now Open</h3>
            <p className="text-sm">Academic Year 2026-27 · Nursery to IX and XI</p>
          </div>
        </div>

        <div className="p-6">
          {submitted ? (
            <div className="py-8 text-center">
              <p className="text-lg font-semibold text-[#003d78]">
                Thank you for your enquiry!
              </p>
              <p className="mt-2 text-gray-600">
                Our admissions team will contact you shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-6 rounded bg-[#0b5699] px-6 py-2 text-white"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-center text-sm text-gray-500">
                CBSE Curriculum | Holistic Development | Safe Learning Environment
              </p>
              <input
                required
                type="text"
                placeholder="Parent / Guardian Name"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#0b5699]"
              />
              <input
                required
                type="email"
                placeholder="Email Address"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#0b5699]"
              />
              <input
                required
                type="tel"
                placeholder="Phone Number"
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#0b5699]"
              />
              <select
                required
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#0b5699]"
                defaultValue=""
              >
                <option value="" disabled>
                  Grade Applying For
                </option>
                <option>Early Year I (Nursery)</option>
                <option>Early Year II</option>
                <option>Early Year III</option>
                <option>Grade I</option>
                <option>Grade II - IX</option>
                <option>Grade XI</option>
              </select>
              <textarea
                placeholder="Message (optional)"
                rows={3}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-[#0b5699]"
              />
              <button
                type="submit"
                className="w-full rounded-lg bg-[#ffb300] py-3 font-semibold text-[#003d78] transition hover:bg-[#ffcc02]"
              >
                SEND MESSAGE
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
