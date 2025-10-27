import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// Note: We keep these Lucide icons for the Features, Pricing, and CTA sections that still use Tailwind
import { ArrowRight, Search, Shield, DollarSign, CheckCircle, Phone } from 'lucide-react';
import blogImg1 from './gemni.png';
import blogImg2 from './3.png';
import blogImg3 from './2.png'; // <-- added import for third image
import carImg from './ca.png';
import managementDashImg from './management_dash.png';
import smartParkingImg from '../assets/smart.jpg';



// --- START: New How It Works Components and Data (Using custom CSS) ---

// Data for the 'How It Works' steps, using Font Awesome classes
const steps = [
  { icon: "fas fa-search", title: "Find Parking", description: "Search for available parking spots near your destination using our intuitive app." },
  { icon: "fas fa-credit-card", title: "Book & Pay", description: "Reserve your spot and pay securely online through our integrated payment gateway." },
  { icon: "fas fa-car-side", title: "Park & Go", description: "Show your booking confirmation and park with ease, knowing your spot is waiting." },
];

/**
 * Renders an individual step card, styled entirely by the embedded CSS block.
 */
const StepCard = ({ icon, title, description }) => (
  <div className="step-card">
    <div className="inner-highlight">
      <div className="content-wrapper">
        <div className="icon-container">
          {/* Using Font Awesome icon class */}
          <i className={icon}></i>
        </div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  </div>
);

/**
 * Renders the arrow separator between steps, styled by the embedded CSS block.
 */
const Arrow = () => (
  <div className="arrow">
    <i className="fas fa-arrow-right"></i>
  </div>
);


const HowItWorksSection = () => (
  <section className="how-it-works-section">
    {/* External Links for Font Awesome Icons and Open Sans Font (Required for the custom CSS to work) */}
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />

    {/* STYLE BLOCK: Contains the custom CSS for this section and the header components */}
    <style>{`
        /* The entire application should be wrapped in .smart-park-system */
        .smart-park-system {
            font-family: 'Open Sans', sans-serif;
            line-height: 1.6;
            background-color: #1a1e27;
            color: #e0e0e0;
            min-height: 100vh;
        }

        /* --- Navbar Styles --- */
        .navbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 15px 40px;
            background-color: #2b313b;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
        }

        .navbar .logo {
            font-size: 1.8em;
            font-weight: bold;
            color: #58a6ff;
            text-decoration: none;
            letter-spacing: 1.5px;
        }

        .navbar-links a {
            margin-left: 30px;
            text-decoration: none;
            color: #c9d1d9;
            font-size: 1em;
            font-weight: 500;
            transition: color 0.3s ease;
        }

        .navbar-links a:hover {
            color: #ffc107;
        }
        
        /* --- Top Features Bar Styles --- */
        .top-features-bar {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            background-color: #30363d;
            padding: 10px 20px;
            gap: 10px;
            box-shadow: inset 0 -3px 5px rgba(0, 0, 0, 0.3);
            margin-bottom: 50px; 
        }
        
        .feature-item {
            color: #90a4ae;
            font-size: 0.9em;
            padding: 5px 15px;
            border-radius: 20px;
            background-color: #444c56;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.5px;
        }
        
        /* --- SECTION: Why Choose Us --- */
        .why-choose-us {
          padding: 80px 20px;
          text-align: center;
          background-color: #1a1e27;
        }

        .why-choose-us h2 {
          font-size: 2.8em;
          color: #ffffff;
          margin-bottom: 10px;
          letter-spacing: 1px;
        }

        .why-choose-us .tagline { /* Added class for clarity */
          font-size: 1.2em;
          color: #c9d1d9;
          margin-bottom: 60px;
          display: block;
        }

        .feature-cards-container {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 30px;
        }

        .feature-card {
          background-color: #2b313b;
          border-radius: 12px;
          padding: 30px;
          width: 250px;
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          text-align: left;
          position: relative; 
          overflow: hidden; 
        }

        /* Hover Effect for the right side shape */
        .feature-card::after {
          content: '';
          position: absolute;
          top: 0;
          right: 0;
          width: 0; /* Starts hidden */
          height: 100%;
          background: linear-gradient(to right, rgba(88,166,255,0.3), rgba(56,189,248,0.3)); 
          transition: width 0.3s ease-out; 
          z-index: 0; 
          border-radius: 0 12px 12px 0; 
        }

        .feature-card:hover::after {
          width: 100%; /* Expands to full width on hover */
          left: 0; 
          border-radius: 12px; 
        }

        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 30px rgba(88, 166, 255, 0.5);
        }

        .feature-card .icon {
          font-size: 2.5em;
          margin-bottom: 15px;
          color: #58a6ff; 
          position: relative; 
          z-index: 1;
        }
        /* Custom icon colors */
        .feature-card .icon.save-time { color: #8b5cf6; } 
        .feature-card .icon.best-prices { color: #34d399; } 
        .feature-card .icon.secure-safe { color: #fbbf24; } 
        .feature-card .icon.easy-access { color: #ef4444; } 


        .feature-card h3 {
          font-size: 1.5em;
          color: #ffffff;
          margin-bottom: 10px;
          position: relative;
          z-index: 1;
        }

        .feature-card p {
          font-size: 0.95em;
          color: #c9d1d9;
          margin-bottom: 0;
          line-height: 1.5;
          position: relative;
          z-index: 1;
        }
        
        /* --- Media Queries --- */
        @media (max-width: 992px) {
          .navbar {
            flex-direction: column;
            padding: 15px 20px;
          }
          .navbar .logo {
            margin-bottom: 10px;
          }
          .navbar-links a {
            margin: 0 15px;
          }
          .feature-card {
            width: 45%; 
          }
        }
        
        @media (max-width: 576px) {
          .navbar-links {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 5px;
          }
          .navbar-links a {
            margin: 5px 0;
          }
          .feature-card {
            width: 90%; 
          }
        }

        /* --- How It Works Section --- (The user's core styling block) */
        .how-it-works-section {
          padding: 80px 20px;
          text-align: center;
          background-color: #1a1e27;
        }

        .how-it-works-section h2 { font-size: 2.8em; color: #ffffff; margin-bottom: 10px; letter-spacing: 1px; }
        .how-it-works-section p { font-size: 1.2em; color: #c9d1d9; margin-bottom: 60px; }

        .steps-container {
          display: flex;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        /* --- CORE CARD STYLES --- */
        .step-card {
          background-color: #2b313b;
          border-radius: 12px;
          padding: 15px;
          width: 300px;
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.4);
          transition: all 0.5s ease-in-out;
          border: 1px solid #30363d;
          position: relative;
          cursor: pointer;
          overflow: hidden;
          color: #e0e0e0;
          text-align: center;
          display: flex;
          flex-direction: column;
        }
        /* THE INNER HIGHLIGHT DIV */
        .inner-highlight {
          padding: 0;
          border-radius: 8px;
          background-color: #2b313b;
          flex-grow: 1;
          transition: all 0.5s ease-in-out;
          position: relative;
          z-index: 2;
          color: inherit;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }
        /* WRAPPER FOR CONTENT PADDING */
        .content-wrapper {
          padding: 30px 20px;
          color: inherit;
          text-align: center;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        /* The Card's Outer Glow on Hover */
        .step-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 15px 40px rgba(88,166,255,0.5);
          border-color: #58a6ff;
        }

        /* --- THE CLEAN INNER SHAPE EFFECT ON HOVER --- */
        .step-card:hover .inner-highlight {
          background: linear-gradient(135deg, #ffc107, #fd7e14);
          color: #1a1e27;
          box-shadow: 0 0 10px rgba(255, 193, 7, 0.7);
        }

        /* --- ICON/IMAGE CONTAINER STYLING --- */
        .icon-container {
          /* Base style for the circle background */
          font-size: 2em;
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: #58a6ff;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 0 auto 25px;
          box-shadow: 0 0 15px rgba(88, 166, 255, 0.7);
          transition: all 0.5s ease;
        }
        /* Adjust icon/image container colors for high contrast when INNER-HIGHLIGHT is active */
        .step-card:hover .icon-container {
          background-color: #1a1e27;
          box-shadow: none;
        }

        /* If using Font Awesome icon */
        .step-card:hover .icon-container i {
          color: #ffc107; /* Change the icon color to match the highlight */
        }

        .step-card h3 {
          font-size: 1.8em;
          color: inherit;
          margin-bottom: 15px;
          transition: color 0.5s ease;
        }
        .step-card p {
          font-size: 1em;
          color: inherit;
        }

        /* Arrow between steps */
        .arrow {
          color: #58a6ff;
          font-size: 2.5em;
          align-self: center;
          margin: 0 15px;
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100%;
        }

        /* --- Media Queries --- */
        @media (max-width: 992px) {
          .steps-container {
            flex-direction: column;
            align-items: center;
          }
          .arrow {
            transform: rotate(90deg);
            margin: 20px 0;
          }
          .step-card {
            width: 90%;
            max-width: 400px;
          }
        }
        @media (max-width: 576px) {
          .how-it-works-section h2 { font-size: 2em; }
          .how-it-works-section p { font-size: 1em; margin-bottom: 30px; }
        }
    `}</style>
    <h2>How It Works</h2>
    <p>Three simple steps to park hassle-free</p>
    <div className="steps-container">
      {/* Map over the steps array to render cards and arrows */}
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <StepCard {...step} />
          {/* Render arrow only between cards, not after the last one */}
          {index < steps.length - 1 && <Arrow />}
        </React.Fragment>
      ))}
    </div>
  </section>
);
// --- END: New How It Works Components and Data ---

// --- START: Blog News Section (fixed CSS + image src) ---
const BlogNewsSection = () => (
    <section className="blog-news-section">
        {/* Poppins Font Link (Required for this specific design) */}
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap" rel="stylesheet" />
        
        <style>{`
            /* Blog News Section Specific Styles */
            .blog-news-section {
                padding: 50px 0;
                text-align: center;
                background-color: #1f2127; /* Dark section background */
                color: #ffffff;
                font-family: Arial, sans-serif;
            }

            .latest-news-title {
                font-size: 0.9rem;
                font-weight: 500;
                color: #cccccc;
                letter-spacing: 2px;
                margin-bottom: 5px;
            }

            .section-title {
                font-size: 2.5rem;
                margin-top: 0;
                margin-bottom: 40px;
            }

            .blog-container {
                display: flex;
                justify-content: center;
                gap: 30px; 
                max-width: 1200px;
                margin: 0 auto;
                padding: 0 20px;
                flex-wrap: wrap;
            }

            .blog-card {
                flex: 1;
                max-width: 350px;
                background-color: #ffffff; 
                color: #333333; 
                padding: 20px;
                border-radius: 8px;
                text-align: left;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
                cursor: pointer; 
                transition: background-color 0.3s ease, color 0.3s ease, transform 0.3s ease;
                margin-bottom: 20px;
            }

            .card-image-wrapper {
                position: relative;
                width: 100%;
                height: 200px; 
                margin-bottom: 15px;
                border-radius: 4px;
                overflow: hidden; 
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .card-background-image {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                object-fit: cover; 
                z-index: 1;
                opacity: 0.2;
                filter: brightness(0.7);
                transition: opacity 0.5s ease, filter 0.5s ease; 
            }

            .image-label {
                position: relative;
                z-index: 2; 
                background-color: #ff0000; 
                color: white;
                padding: 5px 10px;
                font-size: 0.9rem;
                font-weight: bold;
                border-radius: 3px;
            }

            .blog-card:hover {
                background-color: #212121; 
                color: #ffffff; 
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.5);
            }

            .blog-card:hover .card-background-image {
                opacity: 1;
                filter: brightness(1);
            }

            .post-title {
                font-size: 1.4rem;
                margin-top: 0;
                color: #333333; 
                transition: color 0.3s ease;
            }

            .blog-card:hover .post-title {
                color: #ffffff; 
            }

            .post-meta {
                font-size: 0.8rem;
                color: #999999; 
                line-height: 1.5;
            }

            .post-snippet {
                font-size: 0.9rem;
                color: #555555;
                line-height: 1.4;
                margin-bottom: 15px; 
            }

            .blog-card:hover .post-meta,
            .blog-card:hover .post-snippet {
                color: #cccccc; 
            }

            .read-more-btn {
                position: relative;
                display: inline-block;
                margin-top: 15px;
                padding: 8px 14px;
                text-decoration: none;
                font-weight: 700;
                color: #ff3b3b; /* brighter red */
                border-radius: 8px;
                overflow: hidden;
                transition: color 0.25s ease, background-color 0.25s ease, transform 0.15s ease, box-shadow 0.2s ease;
            }

            /* sliding arrow (uses ::after) */
            .read-more-btn::after {
                content: "→";
                position: absolute;
                right: 14px;
                top: 50%;
                transform: translateX(-6px) translateY(-50%);
                opacity: 0;
                transition: transform 0.25s ease, opacity 0.25s ease;
                font-weight: 700;
            }

            /* subtle underline grow (uses ::before) */
            .read-more-btn::before {
                content: "";
                position: absolute;
                left: 12px;
                right: 12px;
                bottom: 6px;
                height: 2px;
                background: linear-gradient(90deg,#ff3b3b,#ff7b7b);
                transform: scaleX(0);
                transform-origin: left center;
                transition: transform 0.28s cubic-bezier(.2,.8,.2,1);
                border-radius: 2px;
                opacity: 0.9;
            }

            .read-more-btn:hover {
                color: #ffffff;
                background: rgba(255,59,59,0.08);
                transform: translateY(-3px);
                box-shadow: 0 8px 20px rgba(0,0,0,0.45);
            }

            .read-more-btn:hover::after {
                transform: translateX(4px) translateY(-50%);
                opacity: 1;
            }

            .read-more-btn:hover::before {
                transform: scaleX(1);
            }

            .read-more-btn:focus-visible {
                outline: 3px solid rgba(255,59,59,0.18);
                outline-offset: 4px;
            }

            @media (max-width: 992px) {
                .blog-container { flex-direction: column; align-items: center; }
                .blog-card { width: 90%; max-width: 400px; }
            }
        `}</style>

        <h5 className="latest-news-title">LATEST NEWS</h5>
        <h2 className="section-title">From Blog News</h2>

        <div className="blog-container">
            {/* Blog Post 1: Business */}
            <div className="blog-card">
                <div className="card-image-wrapper">
                    <img
                      src={blogImg1}
                      alt="India rocket launch"
                      className="card-background-image"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/350x200/4a4a4a/ffffff?text=BUSINESS+ARTICLE"; }}
                    />
                    <span className="image-label">Business</span>
                </div>
                <h3 className="post-title">Enhanced Security: Protection of a Strategic National Asset</h3>
                <p className="post-meta">
                    By admin | <span className="date">Date Dec 21, 2017</span> | In <span className="category">Business</span>
                </p>
                <p className="post-snippet">
                    The launch of India's GSLV Mk III—a crucial asset for national capability—required a multi-layered and enhanced security framework to safeguard the mission's success and the sensitive technology involved.
                </p>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="read-more-btn" onClick={(e) => e.preventDefault()}>READ MORE</a>
            </div>

            {/* Blog Post 2: Corporate */}
            <div className="blog-card">
                <div className="card-image-wrapper">
                    <img
                      src={blogImg2}
                      alt="Corporate office workers"
                      className="card-background-image"
                    />
                    <span className="image-label">Corporate</span>
                </div>
                <h3 className="post-title">Predictive Analysis of Threats</h3>
                <p className="post-meta">
                    By admin | <span className="date">Date Dec 28, 2017</span> | In <span className="category">Corporate</span>
                </p>
                <p className="post-snippet">
                    For a mission of national strategic importance like the GSLV Mk III launch, "enhanced security" is not just about perimeter defense; it is about anticipating and neutralizing potential failures and threats through a process known as Predictive Analysis or Threat Modeling.
                </p>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="read-more-btn" onClick={(e) => e.preventDefault()}>READ MORE</a>
            </div>

            {/* Blog Post 3: Life Style */}
            <div className="blog-card">
                <div className="card-image-wrapper">
                    <img
                      src={blogImg3}
                      alt="Couple embracing"
                      className="card-background-image"
                      onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/350x200/8a8a8a/ffffff?text=LIFESTYLE+GUIDE"; }}
                    />
                    <span className="image-label">Life Style</span>
                </div>
                <h3 className="post-title">Securing the Smart Parking Data Chain with Blockchain</h3>
                <p className="post-meta">
                    By admin | <span className="date">Date Dec 28, 2017</span> | In <span className="category">Life Style</span>
                </p>
                <p className="post-snippet">
                    Data Tampering & Fraud: Explain how smart contracts on the blockchain can create an immutable record of every parking transaction, preventing users or operators from
                </p>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a href="#" className="read-more-btn" onClick={(e) => e.preventDefault()}>READ MORE</a>
            </div>
        </div>
    </section>
);
// --- END: Blog News Section (fixed CSS + image src) ---


// --- Pricing Data and Component (The original 3-card logic) ---

// Define the data structure for all parking plans
const plans = [
  {
    name: "Hourly",
    tagline: "₹50 per hour",
    price: "₹50",
    unit: "per hour",
    features: [
      "Flexible timing",
      "Cancel anytime",
      "All locations",
      "Mobile app access",
    ],
    isFeatured: false,
  },
  {
    name: "Daily",
    tagline: "₹400 per day",
    price: "₹400",
    unit: "per day",
    features: [
      "24-hour access",
      "Priority support",
      "All locations",
      "Free cancellation",
      "Best value",
    ],
    isFeatured: true,
  },
  {
    name: "Monthly",
    tagline: "₹2,999 per month",
    price: "₹2,999",
    unit: "per month",
    features: [
      "Unlimited parking",
      "Reserved spot",
      "Premium locations",
      "24/7 support",
      "Save 50%",
    ],
    isFeatured: false,
  },
];

// Internal component for rendering a single pricing card
const PricingCard = ({ plan, onGetStarted }) => {
  const isFeatured = plan.isFeatured;

  const cardClasses = isFeatured
    ? "relative w-full max-w-sm pt-14 pb-8 px-8 flex flex-col rounded-xl border-2 border-sky-400 transform scale-[1.03] shadow-2xl shadow-sky-600/40 bg-slate-900 transition-all duration-300"
    : "relative w-full max-w-sm p-8 flex flex-col rounded-xl border-2 border-slate-700 bg-[#1a1e27] transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/30 hover:-translate-y-1 group overflow-hidden";

  const headerClasses = isFeatured ? "text-sky-400" : "text-blue-500";
  const priceColor = isFeatured ? "text-amber-400" : "text-white";
  const buttonClasses = isFeatured
    ? "bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/50"
    : "bg-blue-500 text-slate-950 hover:bg-blue-600";

  return (
    <div className={cardClasses}>
      {/* Background effect for non-featured card on hover */}
      {!isFeatured && (
        <div className="absolute inset-0 bg-[#101217] z-0 rounded-xl transition-transform duration-500 ease-out transform translate-x-full group-hover:translate-x-0"></div>
      )}

      {isFeatured && (
        <span className="absolute top-4 left-1/2 -translate-x-1/2 bg-violet-600 text-white px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-lg shadow-violet-500/50 z-20">
          Most Popular
        </span>
      )}

      {/* Content wrapper with z-index to overlay the background effect */}
      <div className="relative z-10 text-center mt-4">
        <h3 className={`text-3xl font-bold mb-1 ${headerClasses}`}>{plan.name}</h3>
        <p className="text-slate-400 mb-6">{plan.tagline}</p>
      </div>

      <div className="relative z-10 text-center mb-8">
        <span className={`text-6xl font-extrabold ${priceColor}`}>{plan.price}</span>
        <span className={`block text-lg font-medium mt-[-5px] ${priceColor}/80`}>{plan.unit}</span>
      </div>

      <ul className="relative z-10 flex-grow space-y-3 text-left mb-10">
        {plan.features.map((feature, index) => (
          <li key={index} className="flex items-center text-slate-200">
            <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
            <span className="text-base">{feature}</span>
          </li>
        ))}
      </ul>

      <button
        className={`relative z-10 mt-auto w-full py-4 text-lg font-bold uppercase tracking-wider rounded-lg transition-all duration-200 ${buttonClasses}`}
        onClick={onGetStarted}
      >
        Get Started
      </button>
    </div>
  );
};
// --- End Pricing Data and Component ---

// --- SPLIT PRICING SECTION COMPONENT ---
const SplitPricingSection = ({ navigate }) => {
    // Placeholder image data 
    const placeholderImageBottom = managementDashImg;
    // Screenshots/pages to show in place of the Management Dashboard box
    const dashboardPages = [smartParkingImg, smartParkingImg, smartParkingImg];
    const [pageIdx, setPageIdx] = useState(0);
    const nextPage = () => setPageIdx((p) => (p + 1) % dashboardPages.length);
    const prevPage = () => setPageIdx((p) => (p - 1 + dashboardPages.length) % dashboardPages.length);

    // 1. Setup Refs for the elements to observe
    const imageBottomRef = useRef(null);
    const imageTopRef = useRef(null);
    const cardRef = useRef(null);



    // 4. Helper function to calculate continuous Parallax Transform
    const getTransformStyle = (ref, factor = 0.1, scaleMin = 0.95) => {
        if (!ref.current) return {};

        // Get element's position relative to the viewport
        const rect = ref.current.getBoundingClientRect();
        
        // Use a position relative to the viewport height for the animation calculation
        const relativePosition = rect.top / window.innerHeight; // 0 (top) to 1 (bottom)
        
        let offset = 0;
        let scaleValue = 1;
        
        // Animation Zone: 0.1 (near top) to 1.0 (at bottom)
        if (relativePosition > 0 && relativePosition <= 1) {
            // Factor is based on how far the element is from the bottom of the viewport
            const progress = 1 - relativePosition; 
            
            // Vertical movement (moves faster than scroll, creating parallax)
            offset = progress * 100 * factor; // Max 10px of translation
            
            // Scaling down as it moves toward the top
            // Scale goes from 1 (at bottom) down to scaleMin (at top)
            scaleValue = 1 - progress * (1 - scaleMin);
        }
        
        // Clamping the scale to ensure it looks good
        scaleValue = Math.max(scaleMin, Math.min(1, scaleValue));


        return {
            transform: `translateY(${offset}px) scale(${scaleValue})`,
            transition: 'transform 0.05s linear', // smooth transition between scroll points
        };
    };


    // Replicating the HTML structure and applying Tailwind classes (dark mode)
    return (
        <section className="py-20 px-4 bg-slate-900 font-sans text-white">
            <div className="max-w-7xl mx-auto grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
                
                {/* --- Left Side Content --- */}
                <div className="space-y-6">
                    <p className="text-red-500 font-bold uppercase text-sm mb-1">Our Smart Parking Solution</p>
                    <h2 className="text-4xl lg:text-5xl font-extrabold text-white leading-tight">
                        Optimize Parking Operations & Revenue!
                    </h2>
                    <p className="text-lg text-slate-400 leading-relaxed mb-8">
                        We offer 10+ years of expertise in delivering superior smart mobility products. Trust us to transform your parking management with real-time data and cutting-edge technology.
                    </p>
                    
                    {/* Tabs Styling - Replicated from CSS */}
                    <div className="flex gap-4 mb-8 flex-wrap">
                        <button onClick={() => alert('Personal Plans: ₹50/hour - Perfect for individuals')} className="py-2 px-4 text-white font-semibold border-b-4 border-red-500 transition-colors duration-300">
                            Personal Plans
                        </button>
                        <button onClick={() => alert('Enterprise Plans: Custom pricing for businesses with fleet management')} className="py-2 px-4 text-slate-400 font-semibold border-b-4 border-transparent hover:text-white hover:border-slate-500 transition-colors duration-300">
                            Enterprise Plans
                        </button>
                        <button onClick={() => alert('Commercial Plans: Monthly subscriptions for commercial parking lots')} className="py-2 px-4 text-slate-400 font-semibold border-b-4 border-transparent hover:text-white hover:border-slate-500 transition-colors duration-300">
                            Commercial Plans
                        </button>
                    </div>

                    {/* Image on the left (bottom) - Animation Applied */}
                    <img 
                        ref={imageBottomRef} 
                        src={placeholderImageBottom} 
                        alt="Team members collaborating on smart city data" 
                        // Apply the dynamic style based on scroll position
                        style={getTransformStyle(imageBottomRef, 0.2, 0.9)} 
                        className="w-full h-[400px] object-cover rounded-xl shadow-2xl shadow-black/50 will-change-transform transition-transform duration-300 hover:-translate-y-3 cursor-pointer hover:shadow-2xl"
                        onError={(e) => { e.target.onerror = null; e.target.src = "" }}
                    />
                </div>

                {/* --- Right Side Content & Card --- */}
                <div className="flex flex-col gap-8">
                    {/* Pages carousel (replaces Management Dashboard) */}
                    <div className="relative">
                      <img 
                          ref={imageTopRef}
                          src={dashboardPages[pageIdx]} 
                          alt={`Dashboard page ${pageIdx + 1}`} 
                          // Apply the dynamic style based on scroll position
                          style={getTransformStyle(imageTopRef, 0.1, 0.95)}
                          className="w-full h-[400px] object-cover rounded-xl shadow-2xl shadow-black/50 will-change-transform transition-transform duration-300 hover:-translate-y-3 hover:shadow-2xl bg-slate-800/60"
                          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/800x460/1f2937/9ca3af?text=Add+page1.png+page2.png+page3.png+to+/public" }}
                      />
                      <div className="absolute top-3 right-3 flex gap-2">
                        <button aria-label="Previous screenshot" onClick={prevPage} className="px-3 py-1 rounded-md bg-slate-900/70 text-slate-200 hover:bg-slate-800 border border-slate-700">Prev</button>
                        <button aria-label="Next screenshot" onClick={nextPage} className="px-3 py-1 rounded-md bg-slate-900/70 text-slate-200 hover:bg-slate-800 border border-slate-700">Next</button>
                      </div>
                    </div>

                    {/* Plan Card Styling - Animation Applied */}
                    <div 
                        ref={cardRef}
                        // Apply the dynamic style based on scroll position
                        style={getTransformStyle(cardRef, 0.05, 0.98)}
                        className="bg-slate-800 p-8 rounded-xl shadow-2xl shadow-black/30 border border-slate-700 will-change-transform"
                    >
                        <h3 className="text-3xl font-bold text-white mb-2">Real-Time Location Tracking</h3>
                        
                        <div className="flex justify-between items-start md:items-center mb-6 pb-4 border-b border-slate-700 flex-wrap gap-y-4">
                            <p className="text-red-400 font-semibold text-sm uppercase">Save 29% on Annual Subscription</p>
                            <div className="text-right">
                                <span className="text-4xl font-extrabold text-red-500 block">$14.99</span>
                                <span className="text-sm text-slate-400 block font-normal">monthly</span>
                            </div>
                        </div>
                        
                        {/* Features List Styling (Using CheckCircle for icons) */}
                        <div className="flex flex-wrap gap-8 justify-between mb-8">
                            <ul className="list-none p-0 m-0 space-y-3 flex-1 min-w-[45%]">
                                <li className="flex items-start text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><span className="font-semibold">Spot Occupancy API</span></span>
                                </li>
                                <li className="flex items-start text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><span className="font-semibold">24/7 Remote Monitoring</span></span>
                                </li>
                            </ul>
                            <ul className="list-none p-0 m-0 space-y-3 flex-1 min-w-[45%]">
                                <li className="flex items-start text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><span className="font-semibold">Automated Payment Processing</span></span>
                                </li>
                                <li className="flex items-start text-slate-300">
                                    <CheckCircle className="w-5 h-5 text-green-400 mr-2 flex-shrink-0 mt-0.5" />
                                    <span><span className="font-semibold">User App Integration</span></span>
                                </li>
                            </ul>
                        </div>
                        
                        {/* Learn More Button */}
                        <button onClick={() => navigate('/register')} className="w-full bg-red-600 text-white uppercase py-4 rounded-lg font-bold text-lg tracking-wider transition-colors duration-300 hover:bg-red-700 shadow-lg shadow-red-600/30">
                            START FREE TRIAL
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};
// --- END NEW COMPONENT ---


// --- START: Stats Section (converted & integrated) ---
const StatsSection = ({ navigate }) => {
  useEffect(() => {
    // --- JavaScript for Animated Counters (adapted from provided HTML snippet) ---
    const animateCount = (element, endValue, duration = 2000) => {
      let startTimestamp;
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = timestamp - startTimestamp;
        const percentage = Math.min(progress / duration, 1);
        const easedPercentage = 1 - Math.pow(1 - percentage, 3);
        const currentValue = Math.floor(easedPercentage * endValue);
        element.textContent = currentValue;
        if (percentage < 1) {
          window.requestAnimationFrame(step);
        } else {
          element.textContent = endValue;
        }
      };
      window.requestAnimationFrame(step);
    };

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5,
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        const statContainer = entry.target;
        const statElement = statContainer.querySelector('.stat-number');
        const endValue = parseInt(statContainer.getAttribute('data-end-value'), 10) || 0;

        if (entry.isIntersecting) {
          if (statElement && statElement.textContent === '0') {
            animateCount(statElement, endValue);
          }
        } else {
          if (statElement) statElement.textContent = '0';
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const items = document.querySelectorAll('.stat-item');
    items.forEach((item) => {
      const num = item.querySelector('.stat-number');
      if (num) num.textContent = '0';
      observer.observe(item);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="stats-section">
      <style>{`
        .stats-section {
            padding: 80px 20px;
            background-color: #1a1e27;
            border-top: 1px solid #30363d;
            position: relative;
            overflow: hidden;
            text-align: center;
        }
        .stats-background {
            position: absolute;
            inset: 0;
            /* Corrected CSS line */
            background-image: url('acc.jpeg');
            background-size: cover;
            background-position: center;
            opacity: 0.1;
            z-index: 0;
        }
        .cta-box {
            position: relative;
            z-index: 1;
            max-width: 1000px;
            margin: 0 auto 50px auto;
            background-color: #2b313b;
            padding: 40px;
            border-radius: 16px;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            border: 1px solid #30363d;
        }
        .cta-box h2 {
            font-size: 3.5em;
            font-weight: 800;
            margin-bottom: 20px;
            line-height: 1.2;
            background: -webkit-linear-gradient(left, #58a6ff, #38bdf8);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
        .cta-box h2 .highlight {
            color: #fbbf24;
            -webkit-text-fill-color: #fbbf24;
        }
        .cta-button {
            background-color: #ffc107;
            color: #1a1e27;
            padding: 15px 40px;
            border: none;
            border-radius: 8px;
            font-size: 1.2em;
            font-weight: 700;
            cursor: pointer;
            transition: background-color 0.3s, transform 0.3s, box-shadow 0.3s;
            text-transform: uppercase;
            letter-spacing: 1px;
            box-shadow: 0 5px 20px rgba(255, 193, 7, 0.4);
        }
        .cta-button:hover {
            background-color: #e0a800;
            transform: scale(1.05);
            box-shadow: 0 8px 25px rgba(255, 193, 7, 0.6);
        }
        .stats-bar {
            position: relative;
            z-index: 1;
            max-width: 1200px;
            margin: 0 auto;
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 20px;
            background-color: #30363d;
            padding: 30px 20px;
            border-radius: 12px;
            box-shadow: inset 0 0 15px rgba(0, 0, 0, 0.4);
        }
        .stat-item {
            text-align: center;
            padding: 10px;
        }
        .stat-item i {
            font-size: 2.2em;
            color: #ffc107;
            margin-bottom: 10px;
        }
        .stat-number {
            font-size: 3.5em;
            font-weight: 800;
            color: #ffffff;
            margin-bottom: 5px;
            display: block;
        }
        .stat-label {
            font-size: 1.1em;
            color: #ffc107;
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 1px;
        }
        @media (max-width: 992px) {
            .stats-bar { grid-template-columns: repeat(2, 1fr); }
            .cta-box h2 { font-size: 2.5em; }
        }
        @media (max-width: 576px) {
            .stats-bar { grid-template-columns: 1fr; }
            .cta-box { padding: 24px; }
            .cta-box h2 { font-size: 2em; }
            .cta-button { padding: 12px 30px; font-size: 1em; }
        }
      `}</style>

      <div className="stats-background" aria-hidden="true"></div>

      <div className="cta-box">
        <h2>
          Get Ready to Start Your <span className="highlight">Hassle-Free</span> Parking Journey.
        </h2>
        <button className="cta-button" onClick={() => navigate('/booking')}>Book Your Spot Today</button>
      </div>

      <div className="stats-bar">
        <div className="stat-item" data-end-value="157">
          <i className="fas fa-users" aria-hidden="true"></i>
          <span className="stat-number">0</span>
          <span className="stat-label">Happy clients</span>
        </div>

        <div className="stat-item" data-end-value="49">
          <i className="fas fa-parking" aria-hidden="true"></i>
          <span className="stat-number">0</span>
          <span className="stat-label">Parking spots</span>
        </div>

        <div className="stat-item" data-end-value="31">
          <i className="fas fa-handshake" aria-hidden="true"></i>
          <span className="stat-number">0</span>
          <span className="stat-label">Partner zones</span>
        </div>

        <div className="stat-item" data-end-value="53">
          <i className="fas fa-city" aria-hidden="true"></i>
          <span className="stat-number">0</span>
          <span className="stat-label">Cities covered</span>
        </div>
      </div>
    </section>
  );
};
// --- END: Stats Section (converted & integrated) ---


// Navbar Component adapted to use custom CSS classes
const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <nav className="navbar">
      <style>{`
        .navbar {
          position: sticky; top: 0; z-index: 50;
          background: rgba(17, 24, 39, 0.65);
          backdrop-filter: saturate(150%) blur(8px);
          border-bottom: 1px solid rgba(56, 189, 248, 0.15);
        }
        .nav-container { width: 100%; margin: 0; display: flex; align-items: center; justify-content: space-between; padding: 14px 16px; }
        .logo { font-size: 1.6em; font-weight: 800; color: #58a6ff; text-decoration: none; letter-spacing: 0.5px; }
        .nav-actions { display: flex; align-items: center; gap: 14px; }
        .nav-links { display: flex; gap: 22px; align-items: center; }
        .nav-link { color: #c9d1d9; text-decoration: none; font-weight: 600; position: relative; padding: 6px 2px; }
        .nav-link::after { content: ''; position: absolute; left: 0; right: 0; bottom: -6px; height: 2px; background: linear-gradient(90deg,#38bdf8,#8b5cf6); transform: scaleX(0); transform-origin: left; transition: transform .25s ease; border-radius: 2px; }
        .nav-link:hover::after { transform: scaleX(1); }
        .nav-cta { padding: 10px 14px; background: linear-gradient(135deg,#3b82f6,#8b5cf6); color: #fff; border-radius: 10px; font-weight: 800; text-decoration: none; box-shadow: 0 8px 18px rgba(99,102,241,.3); transition: transform .15s ease, box-shadow .2s ease; }
        .nav-cta:hover { transform: translateY(-1px); box-shadow: 0 12px 24px rgba(99,102,241,.4); }
        .hamburger { display: none; background: transparent; border: 0; color: #c9d1d9; font-size: 1.4rem; }
        @media (max-width: 860px) {
          .nav-links { display: none; position: absolute; left: 0; right: 0; top: 60px; background: rgba(17,24,39,0.95); padding: 14px 20px; border-bottom: 1px solid rgba(56,189,248,0.12); }
          .nav-links.open { display: flex; flex-direction: column; gap: 14px; }
          .hamburger { display: inline-flex; }
        }
      `}</style>
      <div className="nav-container">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className="logo">SmartPark</a>
        <div className="nav-actions">
          <button className="hamburger" aria-label="Toggle menu" onClick={() => setOpen(!open)}>
            <span className="fas fa-bars" />
          </button>
          <div className={`nav-links ${open ? 'open' : ''}`}>
            <a href="Home.jsx" className="nav-link">Home</a>
            <a href="#features" className="nav-link">Features</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#blog" className="nav-link">Blog</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          <a href="/Register" className="nav-cta">Book Parking</a>
        </div>
      </div>
    </nav>
  );
};

// Top Features Section: clickable + searchable
const TopFeaturesBar = () => {
  const [q, setQ] = useState('');
  const features = [
    { key: 'search', title: 'SEARCH FOR PARKING', desc: 'Find available spots instantly near you', href: '#features', icon: Search, color: '#60a5fa' },
    { key: 'fees', title: 'NO HIDDEN FEES', desc: 'Transparent pricing you can trust', href: '#pricing', icon: DollarSign, color: '#34d399' },
    { key: 'cctv', title: 'CCTV COVERAGE', desc: 'Monitored and secure facilities', href: '#features', icon: Shield, color: '#f59e0b' },
    { key: 'support', title: '24/7 PHONE SUPPORT', desc: 'We are here anytime you need', href: '#contact', icon: Phone, color: '#a78bfa' },
  ];
  const list = features.filter(f => {
    const s = (f.title + ' ' + f.desc).toLowerCase();
    return s.includes(q.trim().toLowerCase());
  });
  return (
    <section className="feature-explorer" id="feature-explorer">
      <style>{`
        .feature-explorer { padding: 18px 16px 26px; background-color: #2b313b; border-top: 1px solid #30363d; border-bottom: 1px solid #30363d; position: relative; }
        .feature-explorer::before { content: ''; position: absolute; left: 0; right: 0; top: 0; height: 2px; background: linear-gradient(90deg, rgba(56,189,248,.0), rgba(56,189,248,.6), rgba(139,92,246,.6), rgba(56,189,248,.0)); opacity: .6; }
        .fx-container { max-width: 1200px; margin: 0 auto; }
        .fx-search { width: 100%; background: #1f2937; color: #e5e7eb; border: 1px solid #374151; border-radius: 10px; padding: 12px 14px; outline: none; transition: box-shadow .2s ease, border-color .2s ease; }
        .fx-search:focus { border-color: #60a5fa; box-shadow: 0 0 0 3px rgba(96,165,250,.25); }
        .fx-grid { margin-top: 14px; display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 14px; }
        .fx-card { display: grid; grid-template-columns: 52px 1fr auto; align-items: center; gap: 12px; background: linear-gradient(180deg,#12161f,#171b25); border: 1px solid #2d3442; border-radius: 14px; padding: 16px; color: #e5e7eb; text-decoration: none; position: relative; overflow: hidden; transition: transform .18s ease, box-shadow .25s ease, border-color .2s ease; }
        .fx-card::after { content:''; position:absolute; inset: -1px; border-radius: 14px; padding: 1px; background: linear-gradient(135deg, rgba(96,165,250,.35), rgba(139,92,246,.35)); -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0); -webkit-mask-composite: xor; mask-composite: exclude; opacity:.0; transition: opacity .25s ease; }
        .fx-card:hover { transform: translateY(-3px); box-shadow: 0 16px 36px rgba(0,0,0,.45); border-color: #3b82f6; }
        .fx-card:hover::after { opacity: 1; }
        .fx-icon-wrap { width: 52px; height: 52px; border-radius: 12px; display: grid; place-items: center; background: rgba(255,255,255,.04); box-shadow: inset 0 0 0 1px rgba(255,255,255,.05); transition: transform .2s ease; }
        .fx-card:hover .fx-icon-wrap { transform: scale(1.06); }
        .fx-title { font-weight: 900; font-size: 1rem; letter-spacing: .25px; }
        .fx-desc { font-size: .85rem; color: #9ca3af; margin-top: 4px; }
        .fx-right { color: #9ca3af; opacity:.9; }
        .fx-chips { display: flex; gap: 8px; flex-wrap: wrap; margin-top: 10px; }
        .fx-chip { background: #374151; color: #e5e7eb; border: 1px solid #4b5563; padding: 6px 10px; border-radius: 999px; font-size: .8rem; cursor: pointer; }
        .fx-chip:hover { background: #4b5563; }
        @media (max-width: 900px) { .fx-grid { grid-template-columns: repeat(2, minmax(0,1fr)); } }
        @media (max-width: 520px) { .fx-grid { grid-template-columns: 1fr; } }
      `}</style>
      <div className="fx-container">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="fx-search"
          type="search"
          placeholder="Search: parking, fees, CCTV, support..."
          aria-label="Search features"
        />
        <div className="fx-chips">
          {features.map(f => (
            <button key={f.key} className="fx-chip" onClick={() => setQ(f.title)}>{f.title}</button>
          ))}
          {q && <button className="fx-chip" onClick={() => setQ('')}>Clear</button>}
        </div>
        <div className="fx-grid">
          {list.map(f => {
            const Icon = f.icon;
            return (
              <a key={f.key} href={f.href} className="fx-card" aria-label={`${f.title} - ${f.desc}`}
                 onKeyDown={(e) => { if (e.key === 'Enter') e.currentTarget.click(); }}>
                <div className="fx-icon-wrap" style={{boxShadow: `inset 0 0 0 1px ${f.color}22`}}>
                  <Icon color={f.color} size={24} />
                </div>
                <div>
                  <div className="fx-title">{f.title}</div>
                  <div className="fx-desc">{f.desc}</div>
                </div>
                <ArrowRight className="fx-right" size={18} />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};





// --- ADD: FuturisticFooter component (replaces the old simple footer) ---
const FuturisticFooter = () => (
  <footer className="futuristic-footer" role="contentinfo">
    <style>{`
      /* --- FUTURISTIC FOOTER STYLES (copied from your HTML) --- */
      .futuristic-footer {
          background-color: #161b22;
          color: #c9d1d9;
          padding: 60px 20px 30px 20px;
          border-top: 2px solid #38bdf8;
          position: relative;
          overflow: hidden;
          font-size: 0.95em;
      }
      .futuristic-footer::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 100% 100%, #161b22 10%, transparent 10%),
                      linear-gradient(45deg, rgba(56, 189, 248, 0.05) 25%, transparent 25%),
                      linear-gradient(-45deg, rgba(56, 189, 248, 0.05) 25%, transparent 25%);
          background-size: 8px 8px;
          opacity: 0.1;
          pointer-events: none;
      }
      .footer-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 2.5fr 1fr 1fr 1fr;
          gap: 40px;
          text-align: left;
          position: relative;
          z-index: 10;
      }
      .footer-logo-info .logo {
          font-size: 1.8em;
          font-weight: 700;
          color: #38bdf8;
          margin-bottom: 5px;
          display: flex;
          align-items: center;
      }
      .footer-logo-info .logo i {
          margin-right: 8px;
          font-size: 1.2em;
      }
      .footer-logo-info p {
          font-size: 0.85em;
          color: #768390;
          line-height: 1.6;
          max-width: 300px;
      }
      .footer-column h4 {
          font-size: 1em;
          font-weight: 700;
          color: #38bdf8;
          margin-bottom: 18px;
          text-transform: uppercase;
          letter-spacing: 1px;
      }
      .footer-column ul {
          list-style: none;
          padding: 0;
          margin: 0;
      }
      .footer-column ul li {
          margin-bottom: 10px;
      }
      .footer-column ul li a {
          color: #c9d1d9;
          text-decoration: none;
          transition: color 0.3s ease;
      }
      .footer-column ul li a:hover {
          color: #38bdf8;
          text-shadow: 0 0 5px rgba(56, 189, 248, 0.5);
      }
      .footer-bottom {
          max-width: 1200px;
          margin: 50px auto 0 auto;
          padding-top: 20px;
          border-top: 1px solid rgba(56, 189, 248, 0.1);
          text-align: center;
          color: #768390;
          font-size: 0.8em;
          position: relative;
          z-index: 10;
      }
      @media (max-width: 768px) {
          .footer-container { grid-template-columns: 1fr 1fr; }
          .footer-logo-info { grid-column: span 2; margin-bottom: 20px; }
      }
      @media (max-width: 480px) {
          .footer-container { grid-template-columns: 1fr; }
          .footer-logo-info { grid-column: span 1; margin-bottom: 30px; }
      }
    `}</style>

    <div className="footer-container">
      <div className="footer-logo-info">
        <span className="logo"><i className="fas fa-microchip" aria-hidden="true" /> SmartPark [AI]</span>
        <p>
          The <strong>Next-Gen Mobility</strong> solution. We use machine learning to make urban parking intelligent, instant, and efficient.
        </p>
      </div>

      <div className="footer-column" aria-labelledby="features-heading">
        <h4 id="features-heading">Core Features</h4>
        <ul>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <li><a href="#">Real-time Occupancy</a></li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <li><a href="#">Dynamic Pricing</a></li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <li><a href="#">Smart Navigation</a></li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <li><a href="#">Mobile Payment</a></li>
        </ul>
      </div>



      <div className="footer-column" aria-labelledby="resources-heading">
        <h4 id="resources-heading">Resources</h4>
        <ul>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <li><a href="#">Project Documentation</a></li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <li><a href="#">GitHub Repository</a></li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <li><a href="#">Data Sources</a></li>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <li><a href="#">Legal Boilerplate</a></li>
        </ul>
      </div>
    </div>

    <div className="footer-bottom">
      &copy; 2024 SmartPark Project | Created for [Hackathon Name]
    </div>
  </footer>
);


// Main Application Component
const App = () => {
  return (
    // We wrap the entire app in the class that applies the custom CSS scope
    <div className="smart-park-system">
      {/* Load Tailwind CSS from CDN for isolated environment */}
      {/* NOTE: This script tag won't actually load a CDN in a React environment like this, 
         but is kept here as a conceptual placeholder for external dependencies. */}
      <script src="https://cdn.tailwindcss.com"></script>
      <Home />
      <FuturisticFooter />
    </div>
  );
};

// Main Home Component integrating all sections
const Home = () => {
  const navigate = useNavigate();
  
  // Trigger the car animation when the contact section scrolls into view
  useEffect(() => {
    const section = document.getElementById('contact');
    const car = section?.querySelector('.hero-car');
    if (!section || !car) return;

    // Trigger immediately if already in view
    const rect = section.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.8) {
      car.classList.add('run');
    }

    let played = false;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if ((entry.isIntersecting || entry.intersectionRatio > 0) && !played) {
            car.classList.add('run');
            played = true;
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -20% 0px' }
    );

    obs.observe(section);
    return () => obs.disconnect();
  }, []);

  return (
    <div className="bg-slate-900">
      <Navbar />
      <TopFeaturesBar />

      {/* Hero Section (Uses Tailwind) */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-purple-600/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 animate-fade-in">
              Smart Parking,
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                {' '}Simplified
              </span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Find, book, and pay for parking in seconds. Never circle the block again.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg cursor-pointer"
              >
                Get Started
                <ArrowRight className="ml-2" size={20} />
              </button>
              <button
                onClick={() => navigate('/register')}
                className="inline-flex items-center px-8 py-4 bg-gray-800 text-white rounded-lg font-semibold hover:bg-gray-700 transition-all border border-gray-700 cursor-pointer"
              >
                Sign Up Free
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section (Uses Tailwind) */}
      {/* Replaced 'Why Choose Us' with provided custom styled section */}
      <section className="why-choose-us" id="features">
        <style>{`
          .why-choose-us {
              padding: 80px 20px;
              text-align: center;
              background-color: #1a1e27;
          }
          .why-choose-us h2 {
              font-size: 2.8em;
              color: #ffffff;
              margin-bottom: 10px;
              letter-spacing: 1px;
          }
          .why-choose-us .tagline {
              font-size: 1.2em;
              color: #c9d1d9;
              margin-bottom: 60px;
              display: block;
          }
          .feature-cards-container {
              display: flex;
              justify-content: center;
              flex-wrap: wrap;
              gap: 30px;
          }
          .feature-card {
              background-color: #2b313b;
              border-radius: 12px;
              padding: 30px;
              width: 250px;
              box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
              transition: transform 0.3s ease, box-shadow 0.3s ease;
              text-align: left;
              position: relative;
              overflow: hidden;
          }
          .feature-card::after {
              content: '';
              position: absolute;
              top: 0;
              right: 0;
              width: 0;
              height: 100%;
              background: linear-gradient(to right, rgba(88, 166, 255, 0.3), rgba(56,189,248,0.3)); 
              transition: width 0.3s ease-out; 
              z-index: 0; 
              border-radius: 0 12px 12px 0; 
          }

          .feature-card:hover::after {
              width: 100%;
              left: 0;
              border-radius: 12px;
          }
          .feature-card:hover {
              transform: translateY(-5px);
              box-shadow: 0 12px 30px rgba(88, 166, 255, 0.5);
          }

          .feature-card .icon {
              font-size: 2.5em;
              margin-bottom: 15px;
              color: #58a6ff; 
              position: relative; 
              z-index: 1;
          }
          /* Custom icon colors */
          .feature-card .icon.save-time { color: #8b5cf6; } 
          .feature-card .icon.best-prices { color: #34d399; } 
          .feature-card .icon.secure-safe { color: #fbbf24; } 
          .feature-card .icon.easy-access { color: #ef4444; } 


          .feature-card h3 {
              font-size: 1.5em;
              color: #ffffff;
              margin-bottom: 10px;
              position: relative;
              z-index: 1;
          }

          .feature-card p {
              font-size: 0.95em;
              color: #c9d1d9;
              margin-bottom: 0;
              line-height: 1.5;
              position: relative;
              z-index: 1;
          }
          @media (max-width: 992px) {
              .feature-card { width: 45%; }
          }
          @media (max-width: 576px) {
              .feature-card { width: 90%; }
          }
        `}</style>

        <h2>Why Choose Us?</h2>
        <span className="tagline">The smartest way to park your vehicle</span>

        <div className="feature-cards-container">
          <div className="feature-card">
            <i className="icon fas fa-clock save-time" aria-hidden="true"></i>
            <h3>Save Time</h3>
            <p>Book in advance and skip the search for parking</p>
          </div>

          <div className="feature-card">
            <i className="icon fas fa-dollar-sign best-prices" aria-hidden="true"></i>
            <h3>Best Prices</h3>
            <p>Competitive rates with no hidden fees</p>
          </div>

          <div className="feature-card">
            <i className="icon fas fa-shield-alt secure-safe" aria-hidden="true"></i>
            <h3>Secure &amp; Safe</h3>
            <p>24/7 monitored parking with CCTV coverage</p>
          </div>

          <div className="feature-card">
            <i className="icon fas fa-mobile-alt easy-access" aria-hidden="true"></i>
            <h3>Easy Access</h3>
            <p>Manage bookings from your phone anytime</p>
          </div>
        </div>
      </section>

      {/* How It Works Section (Now using the custom CSS and components) */}
      <HowItWorksSection />

      {/* Pricing Plans Section (The original 3-card component, Uses Tailwind) */}
      <section className="py-20 px-4 bg-slate-900" id="pricing">
        <div className="text-center">
          <h2 className="text-5xl font-extrabold text-white mb-3 tracking-wide">Simple Pricing</h2>
          <p className="text-xl text-slate-400 mb-16">Pay only for what you use</p>
        </div>

        <div className="flex flex-wrap justify-center gap-8 lg:gap-10 mb-16">
          {plans.map((plan) => (
            <PricingCard key={plan.name} plan={plan} onGetStarted={() => navigate('/register')} />
          ))}
        </div>

        <div className="text-center pt-10 border-t border-dashed border-slate-700 max-w-3xl mx-auto">
          <p className="text-base text-slate-500 mb-6">
            We are the Next-Gen Mobility Solution. We use machine learning and real-time data to make urban parking intelligent, instant, and efficient. We offer 10+ years of expertise in delivering superior smart mobility products.
          </p>
          <button onClick={() => navigate('/about')} className="bg-transparent text-blue-500 border-2 border-blue-500 px-6 py-3 rounded-lg font-semibold transition-colors hover:bg-blue-500 hover:text-slate-950">
            READ MORE INFO
          </button>
        </div>
      </section>

      {/* Split Pricing & Feature Section (Uses Tailwind) */}
      <SplitPricingSection navigate={navigate} />

      {/* Replaced Testimonials + CTA with provided creative sections */}
      <section className="testimonials-section">
        <style>{`
          .testimonials-section { padding: 80px 20px; text-align: center; background-color: #1a1e27; }
          .testimonials-section h2 { font-size: 3em; font-weight: 800; color: #ffffff; margin-bottom: 5px; }
          .testimonials-section p { font-size: 1.2em; color: #c9d1d9; margin-bottom: 50px; }
          .testimonial-container { display: flex; justify-content: center; flex-wrap: wrap; gap: 30px; }
          .testimonial-card { background-color: #2b313b; border-radius: 12px; padding: 30px; width: 300px; text-align: left; border: 1px solid #30363d; box-shadow: 0 4px 15px rgba(0,0,0,0.3); transition: transform 0.3s ease, box-shadow 0.3s ease; }
          .testimonial-card:hover { transform: translateY(-8px); box-shadow: 0 15px 30px rgba(88,166,255,0.2), 0 0 5px #58a6ff; }
          .testimonial-card .stars { color: #ffc107; margin-bottom: 15px; font-size: 1.2em; }
          .testimonial-card .quote { font-size: 1.1em; color: #e0e0e0; margin-bottom: 20px; font-style: italic; }
          .testimonial-card .author { font-size: 1em; font-weight: 700; color: #58a6ff; margin-bottom: 5px; }
          .testimonial-card .role { font-size: 0.9em; color: #90a4ae; display: block; }
          .creative-cta-section { background-color: #4b0082; padding: 50px 20px; text-align: center; position: relative; overflow: hidden; }
          .creative-cta-section .cta-bg-video { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: 0; opacity: 0.35; }
          .creative-cta-box { position: relative; z-index: 2; }
          .creative-cta-section h2 { font-size: 3.5em; font-weight: 800; color: #ffffff; margin-bottom: 10px; line-height: 1.1; }
          .creative-cta-section p { font-size: 1.3em; color: #e0e0e0; margin-bottom: 0; }
          .creative-cta-section::before { content: ''; position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: repeating-linear-gradient(-45deg,#6a0dad,#6a0dad 10px,#7b27d8 10px,#7b27d8 20px), linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%); opacity: 0.1; transform: translateX(-100%); transition: transform 0.8s ease-out; z-index: 1; }
          .creative-cta-section:hover::before { transform: translateX(0); }
          /* blinking cursor next to CTA headline */
          .typing-cursor { display: inline-block; width: 0.6ch; border-right: 3px solid #ffffff; animation: blink 0.9s steps(1,end) infinite; margin-left: 6px; height: 1em; vertical-align: baseline; }
          @keyframes blink { 50% { border-color: transparent; } }
          @media (max-width: 992px) { .testimonial-card { width: 45%; } .creative-cta-section h2 { font-size: 2.5em; } }
          @media (max-width: 576px) { .testimonial-card { width: 90%; } .creative-cta-section h2 { font-size: 2em; } .creative-cta-section p { font-size: 1.1em; } }
        `}</style>

        <h2>What Our Users Say</h2>
        <p>Join thousands of satisfied parkers</p>

        <div className="testimonial-container">
          <div className="testimonial-card">
            <div className="stars">
              <i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" />
            </div>
            <div className="quote">"This app has saved me so much time! No more circling for parking."</div>
            <div className="author">Sarah Johnson</div>
            <div className="role">Daily Commuter</div>
          </div>

          <div className="testimonial-card">
            <div className="stars">
              <i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" />
            </div>
            <div className="quote">"The monthly plan is perfect for my needs. Great value and service."</div>
            <div className="author">Mike Chen</div>
            <div className="role">Business Owner</div>
          </div>

          <div className="testimonial-card">
            <div className="stars">
              <i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" /><i className="fas fa-star" />
            </div>
            <div className="quote">"Easy to use and reliable. I recommend it to everyone!"</div>
            <div className="author">Emily Davis</div>
            <div className="role">Weekend Shopper</div>
          </div>
        </div>
      </section>
      
      {/* Contact form removed as requested */}

      <section className="creative-cta-section">
        <video className="cta-bg-video" autoPlay muted loop playsInline>
          <source src="/videos/parking-bg.mp4" type="video/mp4" />
        </video>
        <div className="creative-cta-box">
          <h2>
            Ready to Start Parking Smarter?
            <span className="typing-cursor" aria-hidden="true"></span>
          </h2>
          <p>Join thousands of users who have already made the switch</p>
        </div>
      </section>

      {/* Integration section should appear between CTA (get ready) and Blog News */}
      <AnimatedCarContact />
      <BlogNewsSection />
      <StatsSection navigate={navigate} />


      {/* Contact form section inserted between CTA and Footer */}
      <section id="contact" className="contact-us-inline">
        <style>{`
          .contact-us-inline { background:#1a1e27; padding: 60px 20px; border-top:1px solid #30363d; overflow:hidden; }
          .contact-wrap { max-width: 1100px; margin: 0 auto; display:flex; gap:28px; align-items: stretch; }
          .contact-left { flex:1; background:#12161f; border:1px solid #2d3442; border-radius:14px; position:relative; overflow:hidden; min-height:440px; }
          .car-stage { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; }
          .hero-car { position:relative; left:0; bottom:0; width:115%; max-width:none; z-index:3; filter: drop-shadow(0 24px 40px rgba(0,0,0,.6));
            transform-origin: center bottom; transform: scaleX(-1) translateX(-220%); pointer-events:none; opacity:0; }
          .hero-car.run { animation: car-enter 1.4s cubic-bezier(.22,1,.36,1) 0s 1 both; }
          .hero-car.stay { opacity:1 !important; transform: scaleX(-1) translateX(0%) !important; }
          @keyframes car-enter {
            0%   { opacity: 0; transform: scaleX(-1) translateX(-220%); }
            60%  { opacity: 1; transform: scaleX(-1) translateX(-8%); }
            85%  { transform: scaleX(-1) translateX(3%); }
            100% { transform: scaleX(-1) translateX(0%); }
          }
          /* subtle lane glow */
          .lane-glow { position:absolute; left:0; right:-40%; bottom:0; height:4px; background: linear-gradient(90deg, rgba(88,166,255,.0), rgba(88,166,255,.6), rgba(139,92,246,.6), rgba(88,166,255,.0)); filter: blur(2px); opacity:.55; }
          @media (prefers-reduced-motion: reduce) { .hero-car { animation: none !important; } }
          @media (max-width: 860px) { .hero-car { left:-4%; width:125%; max-width:none; } .contact-left { min-height:360px; } }
          .contact-right { flex:1; background:#ffffff; border-radius:14px; padding:26px; box-shadow: 0 10px 30px rgba(0,0,0,.35); }
          .contact-right h4 { margin:0 0 6px; color:#0f172a; font-size:1.4rem; font-weight:800; }
          .contact-right small { color:#475569; display:block; margin-bottom:14px; }
          .contact-form { display:grid; grid-template-columns: 1fr 1fr; gap:12px; }
          .contact-form input, .contact-form textarea { width:100%; border:1px solid #e2e8f0; background:#f8fafc; padding:12px 10px; border-radius:8px; outline:none; }
          .contact-form textarea { grid-column:1 / -1; resize:vertical; min-height:110px; }
          .submit-row { grid-column:1 / -1; }
          .send-btn { width:100%; background:#58a6ff; color:#0b1220; border:0; padding:12px; font-weight:800; border-radius:10px; cursor:pointer; }
          .send-btn:hover { background:#4a97f0; }
          @media (max-width: 860px) { .contact-wrap { flex-direction:column; } .contact-form { grid-template-columns: 1fr; } }
        `}</style>

        <div className="contact-wrap">
          <div className="contact-left" aria-hidden="true">
            <div className="car-stage">
              <div className="lane-glow"></div>
              <img
                id="contact-car"
                src={carImg}
                alt=""
                className="hero-car"
                onAnimationEnd={(e)=> { e.currentTarget.classList.add('stay'); }}
                onError={(e)=> { console.error('car image failed to load'); e.currentTarget.src = 'https://via.placeholder.com/420x200/ff4d4f/ffffff?text=CAR+IMAGE+NOT+FOUND'; }}
              />
            </div>
          </div>
          <div className="contact-right" role="form" aria-label="Contact SmartPark">
            <h4>Contact Us</h4>
            <small>We’re ready to power your parking solution</small>
            <form className="contact-form" onSubmit={(e)=>e.preventDefault()}>
              <input type="text" name="name" placeholder="Your Name *" required />
              <input type="email" name="email" placeholder="Your Email *" required />
              <input type="tel" name="phone" placeholder="Phone" />
              <input type="text" name="company" placeholder="Company / Facility" />
              <textarea name="message" placeholder="Tell us about your project..." />
              <div className="submit-row">
                <button type="submit" onClick={(e) => { e.preventDefault(); alert('Thank you! We will contact you soon.'); }} className="send-btn">SEND MESSAGE</button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer comes after */}
    </div>
  );
};

// Add the new component definition before the Home component
const AnimatedCarContact = () => {
  useEffect(() => {
    const carElement = document.querySelector('.hero-car-png');
    const observerTarget = document.getElementById('hero-contact');

    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          carElement?.classList.add('is-visible');
        } else {
          carElement?.classList.remove('is-visible');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    if (observerTarget) observer.observe(observerTarget);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="integration-section">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700;900;1000&display=swap" rel="stylesheet" />
      <style>{`
        :root {
            --main-bg: #0d1117;
            --purple-accent: #3b006c;
            --secondary-text: #a0a0a0;
            --line-color: #444;
            --green-accent: #4caf50;
        }
        body { margin: 0; padding: 0; font-family: 'Roboto', sans-serif; background-color: var(--main-bg); color: #ffffff; }
        .integration-section { position: relative; overflow: hidden; padding: 80px 20px; text-align: center; background-color: var(--main-bg); color: #ffffff; min-height: 100vh; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .integration-video { position:absolute; inset:0; z-index:0; }
        .integration-bg-video { position:absolute; top:50%; left:50%; transform: translate(-50%, -50%) rotate(90deg); width: 100vmax; height: 56.25vmax; object-fit: cover; opacity:.28; filter: saturate(1.05) contrast(1.05) brightness(.95); }
        /* slightly lighter overlay so the video is visible */
        .integration-overlay { position:absolute; inset:0; background: radial-gradient(ellipse at center, rgba(0,0,0,.05), rgba(0,0,0,.35)); }
        .integration-tag { color: var(--green-accent); font-weight: 700; text-transform: uppercase; font-size: 0.85em; letter-spacing: 1px; display: block; margin-bottom: 5px; }
        .integration-section h2 { font-size: 3em; font-weight: 900; margin: 0 0 10px 0; }
        .integration-description { max-width: 800px; margin: 0 auto 30px; color: var(--secondary-text); font-size: 1.1em; }
        .integration-cta { display: inline-flex; align-items: center; padding: 12px 25px; background-color: transparent; border: 2px solid var(--green-accent); color: var(--green-accent); text-decoration: none; border-radius: 5px; font-weight: 700; margin-bottom: 50px; transition: background-color 0.3s, color 0.3s; }
        .integration-cta:hover { background-color: var(--green-accent); color: var(--main-bg); }
        .integration-cta i { margin-left: 10px; }
        .integration-diagram { position: relative; max-width: 1200px; width: 100%; margin: 0 auto; padding: 20px 0; }
        .integration-diagram::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 2px; background-color: var(--line-color); z-index: 1; background: linear-gradient(to right, #444, #666); border: 2px solid var(--line-color); border-top: none; border-left: none; border-right: none; }
        .icon-row { display: flex; justify-content: space-around; position: relative; z-index: 2; }
        .top-row { margin-bottom: 60px; }
        .bottom-row { margin-top: 60px; }
        .tool-icon { width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 1.8em; box-shadow: 0 0 15px rgba(0, 0, 0, 0.4); position: relative; cursor: pointer; transition: transform 0.3s, box-shadow 0.3s; }
        .tool-icon:hover { transform: scale(1.1); box-shadow: 0 0 20px rgba(76, 175, 80, 0.6); }
        .tool-icon::after { content: ''; position: absolute; bottom: -20px; width: 10px; height: 10px; border-radius: 50%; background-color: #ffffff; border: 2px solid var(--line-color); z-index: 3; }
        .bottom-row .tool-icon::after { top: -20px; bottom: auto; }
        .green-icon { background-color: #4caf50; }
        .purple-icon { background-color: #9c27b0; }
        .red-icon { background-color: #f44336; }
        .dark-purple-icon { background-color: #673ab7; }
        .light-blue-icon { background-color: #03a9f4; }
        .pink-icon { background-color: #e91e63; }
        .lime-icon { background-color: #cddc39; }
        .orange-icon { background-color: #ff9800; }
        .indigo-icon { background-color: #3f51b5; }
        .teal-icon { background-color: #009688; }
        .tool-icon::before { content: attr(data-label); position: absolute; top: -45px; background: rgba(0, 0, 0, 0.9); color: #fff; padding: 5px 10px; border-radius: 5px; font-size: 0.8em; white-space: nowrap; opacity: 0; transition: opacity 0.3s; pointer-events: none; z-index: 10; }
        .tool-icon:hover::before { opacity: 1; }
        @media (max-width: 768px) {
            .icon-row { flex-wrap: wrap; justify-content: center; }
            .tool-icon { margin: 15px; }
            .integration-diagram::before, .tool-icon::after { display: none; }
            .top-row, .bottom-row { margin: 0; }
        }
      `}</style>

      <div className="integration-video" aria-hidden="true">
        <video className="integration-bg-video" autoPlay muted loop playsInline preload="metadata" poster="/cta-poster.jpg">
          <source src="/vid.mp4" type="video/mp4" />
          <source src="/vid.mov" type="video/quicktime" />
        </video>
        <div className="integration-overlay"></div>
      </div>

      <div className="integration-content" style={{position:'relative', zIndex:1}}>
        <span className="integration-tag">Integration & Tools</span>
        <h2>Integrate with Top Tools</h2>
        <p className="integration-description">Seamlessly connect your workflow with the industry's leading tools. Whether it's CRM platforms, communication apps, or analytics software, our system is designed to connect.</p>
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a href="#" className="integration-cta">Explore All Integration <i className="fas fa-arrow-right"></i></a>
        <div className="integration-diagram">
          <div className="icon-row top-row">
            <div className="tool-icon green-icon" data-label="CRM/Sales"><i className="fas fa-handshake"></i></div>
            <div className="tool-icon purple-icon" data-label="Payments"><i className="fas fa-credit-card"></i></div>
            <div className="tool-icon red-icon" data-label="IoT Devices"><i className="fas fa-wifi"></i></div>
            <div className="tool-icon dark-purple-icon" data-label="Cloud Sync"><i className="fas fa-cloud"></i></div>
            <div className="tool-icon light-blue-icon" data-label="Navigation"><i className="fas fa-map-marked-alt"></i></div>
          </div>
          <div className="icon-row bottom-row">
            <div className="tool-icon pink-icon" data-label="User Portal"><i className="fas fa-user-circle"></i></div>
            <div className="tool-icon lime-icon" data-label="Reporting"><i className="fas fa-chart-bar"></i></div>
            <div className="tool-icon orange-icon" data-label="Messaging"><i className="fas fa-comment"></i></div>
            <div className="tool-icon indigo-icon" data-label="Data Science"><i className="fas fa-flask"></i></div>
            <div className="tool-icon teal-icon" data-label="Accounting"><i className="fas fa-calculator"></i></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;