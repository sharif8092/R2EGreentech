import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Download as DownloadIcon,
  CheckCircle,
  Quote,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";

const API = "https://r2egreentech.in/backend/";

/* ================================
   Type Definitions
================================ */

interface Promoter {
  id: number;
  name: string;
  image: string;
  bio?: string;
  quote?: string;
  imagePosition?: string;
  specialties?: string[];
}

interface DocumentProfile {
  id: number;
  name: string;
  file_path: string;
  location: string;
  size: string;
  active: number;
}

/* ================================
   Component
================================ */

const Download: React.FC = () => {
  const [team, setTeam] = useState<Promoter[]>([]);
  const [profileDoc, setProfileDoc] = useState<DocumentProfile | null>(null);
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState<number>(0);

  /* ================================
     Initial Load
  ================================= */

  useEffect(() => {
    document.title = "Download Corporate Profile | R2E Greentech";
    fetchPromoters();
    fetchProfileDoc();
  }, []);

  /* ================================
     Fetch Promoters
  ================================= */

  const fetchPromoters = async () => {
    try {
      const res = await axios.get<Promoter[]>(
        API + "promoters/get-promoters.php"
      );
      setTeam(res.data);
    } catch (error) {
      console.error("Promoter fetch error:", error);
    }
  };

  /* ================================
     Fetch Document
  ================================= */

  const fetchProfileDoc = async () => {
    try {
      const res = await axios.get<DocumentProfile>(
        API + "documents/get-profile.php"
      );
      setProfileDoc(res.data);
    } catch (error) {
      console.error("Document fetch error:", error);
    }
  };

  /* ================================
     Quote Auto Rotation
  ================================= */

  useEffect(() => {
    if (team.length === 0) return;

    const timer = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % team.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [team]);

  /* ================================
     Download Handler
  ================================= */

  const handleDownload = () => {
    if (profileDoc && profileDoc.file_path) {
      window.open(
        API + "uploads/" + profileDoc.file_path,
        "_blank"
      );
    } else {
      alert("No active corporate profile available.");
    }
  };

  const currentPromoter =
    team.length > 0 ? team[currentQuoteIndex] : null;

  return (
    <div className="pt-20 pb-16 bg-slate-50 min-h-screen">
      
      {/* HEADER */}
      <section className="bg-slate-900 py-16 text-white">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-black uppercase">
            Technical{" "}
            <span className="text-emerald-500">
              Capability Framework
            </span>
          </h1>
        </div>
      </section>

      {/* MAIN SECTION */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* PROMOTER QUOTE CARD */}
          <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
            {currentPromoter ? (
              <>
                <img
                  src={API + "uploads/" + currentPromoter.image}
                  alt={currentPromoter.name}
                  className="w-28 h-28 mx-auto rounded-2xl object-cover mb-6"
                />

                <Quote className="mx-auto text-emerald-500 mb-4" />

                <p className="italic font-semibold text-lg mb-4">
                  "{currentPromoter.quote ??
                    "Engineering excellence drives sustainable growth."}"
                </p>

                <h4 className="font-bold text-emerald-700">
                  {currentPromoter.name}
                </h4>
              </>
            ) : (
              <p className="text-slate-500">Loading leadership insights...</p>
            )}
          </div>

          {/* DOWNLOAD SECTION */}
          <div>
            <h2 className="text-2xl font-black mb-6 uppercase">
              Industrial Capability Document
            </h2>

            <button
              onClick={handleDownload}
              className="px-10 py-5 bg-emerald-700 hover:bg-emerald-600 text-white rounded-xl font-bold flex items-center transition-all"
            >
              <DownloadIcon className="mr-3" />
              {profileDoc
                ? `Download ${profileDoc.name}`
                : "Access Company Profile"}
            </button>

            {profileDoc && (
              <p className="mt-3 text-sm text-emerald-600 font-bold flex items-center">
                <CheckCircle className="mr-2" />
                Live Version • {profileDoc.size}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-slate-900 text-white text-center">
        <h2 className="text-3xl font-black uppercase">
          Custom Proposal Required?
        </h2>

        <a
          href="/contact"
          className="inline-flex mt-6 px-10 py-4 bg-emerald-600 hover:bg-emerald-500 rounded-xl font-bold items-center transition-all"
        >
          Schedule Site Audit
          <ArrowRight className="ml-2" />
        </a>
      </section>
    </div>
  );
};

export default Download;