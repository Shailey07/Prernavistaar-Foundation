import React, { forwardRef } from "react";
import { QRCodeSVG } from "qrcode.react";

const CertificateOfInternship = forwardRef(({ intern }, ref) => {
  if (!intern) return null;

  const issueDate = new Date(
    intern.certificateIssueDate || new Date()
  ).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const startDate = intern.startDate
    ? new Date(intern.startDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  const endDate = intern.endDate
    ? new Date(intern.endDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
    : "—";

  const verifyUrl = `${window.location.origin}/verify/${encodeURIComponent(
    intern.registrationNumber || "PVF/I/2026/1001"
  )}`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=UnifrakturMaguntia&family=Monsieur+La+Doulaise&family=Montserrat:ital,wght@0,400;0,500;0,600;0,700;1,500&display=swap');
        .cert-gothic { font-family: 'UnifrakturMaguntia', serif; letter-spacing: 1px; }
        .cert-name { font-family: 'Monsieur La Doulaise', cursive; }
        .cert-sans { font-family: 'Montserrat', sans-serif; }
      `}</style>

      <div
        ref={ref}
        style={{
          width: "1123px",
          height: "794px",
          background: "#FFFDF4",
          position: "relative",
          overflow: "hidden",
          color: "#051D40",
          boxSizing: "border-box",
        }}
      >
        {/* Triple Border */}
        <div style={{ position: "absolute", inset: "12px", border: "5px solid #051D40" }} />
        <div style={{ position: "absolute", inset: "22px", border: "2px solid #D4AF37" }} />
        <div style={{ position: "absolute", inset: "28px", border: "0.75px solid #051D40" }} />

        {/* Corner Ornaments (same as appreciation cert) */}
        <div style={{ position: "absolute", top: "34px", left: "34px", width: "90px", height: "90px", color: "#D4AF37" }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0,0 C30,0 45,15 45,35 C45,20 30,5 0,0 Z M0,0 C0,30 15,45 35,45 C20,45 5,30 0,0 Z M15,15 C25,15 30,20 30,30 C30,25 25,20 15,15 Z M5,40 C15,35 20,45 10,50 C5,45 0,42 5,40 Z M40,5 C35,15 45,20 50,10 C45,5 42,0 40,5 Z" />
            <circle cx="8" cy="8" r="2.5" />
          </svg>
        </div>
        <div style={{ position: "absolute", top: "34px", right: "34px", width: "90px", height: "90px", color: "#D4AF37", transform: "scaleX(-1)" }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0,0 C30,0 45,15 45,35 C45,20 30,5 0,0 Z M0,0 C0,30 15,45 35,45 C20,45 5,30 0,0 Z M15,15 C25,15 30,20 30,30 C30,25 25,20 15,15 Z M5,40 C15,35 20,45 10,50 C5,45 0,42 5,40 Z M40,5 C35,15 45,20 50,10 C45,5 42,0 40,5 Z" />
            <circle cx="8" cy="8" r="2.5" />
          </svg>
        </div>
        <div style={{ position: "absolute", bottom: "34px", left: "34px", width: "90px", height: "90px", color: "#D4AF37", transform: "scaleY(-1)" }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0,0 C30,0 45,15 45,35 C45,20 30,5 0,0 Z M0,0 C0,30 15,45 35,45 C20,45 5,30 0,0 Z M15,15 C25,15 30,20 30,30 C30,25 25,20 15,15 Z M5,40 C15,35 20,45 10,50 C5,45 0,42 5,40 Z M40,5 C35,15 45,20 50,10 C45,5 42,0 40,5 Z" />
            <circle cx="8" cy="8" r="2.5" />
          </svg>
        </div>
        <div style={{ position: "absolute", bottom: "34px", right: "34px", width: "90px", height: "90px", color: "#D4AF37", transform: "scale(-1)" }}>
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0,0 C30,0 45,15 45,35 C45,20 30,5 0,0 Z M0,0 C0,30 15,45 35,45 C20,45 5,30 0,0 Z M15,15 C25,15 30,20 30,30 C30,25 25,20 15,15 Z M5,40 C15,35 20,45 10,50 C5,45 0,42 5,40 Z M40,5 C35,15 45,20 50,10 C45,5 42,0 40,5 Z" />
            <circle cx="8" cy="8" r="2.5" />
          </svg>
        </div>

        <div style={{ padding: "42px 100px 0", textAlign: "center" }}>
          <div style={{ marginBottom: "4px" }}>
            <img
              src="/images/logo.png"
              alt="PrernaVistaar Foundation"
              style={{ width: "95px", height: "95px", objectFit: "contain", margin: "0 auto" }}
            />
          </div>

          <h1 style={{ margin: "0", fontSize: "44px", fontWeight: "normal", color: "#051D40", lineHeight: "1.1", fontFamily: "'Montserrat', sans-serif", letterSpacing: "2px" }}>
            PRERNAVISTAAR FOUNDATION
          </h1>

          <div className="cert-sans" style={{ fontSize: "11px", fontWeight: "700", color: "#C5A059", letterSpacing: "4px", marginTop: "6px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ fontSize: "10px", marginRight: "10px" }}>—•—</span>
            ASIND, RAJASTHAN
            <span style={{ fontSize: "10px", marginLeft: "10px" }}>—•—</span>
          </div>
          <div className="cert-sans" style={{ fontSize: "11px", fontWeight: "600", color: "#C5A059", letterSpacing: "2px", marginTop: "2px" }}>
            ESTD SINCE 2007
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "12px 0" }}>
            <div style={{ width: "120px", height: "1px", background: "linear-gradient(to left, #C5A059, transparent)" }} />
            <div style={{ width: "5px", height: "5px", backgroundColor: "#051D40", transform: "rotate(45deg)", margin: "0 8px" }} />
            <div style={{ width: "120px", height: "1px", background: "linear-gradient(to right, #C5A059, transparent)" }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "16px", marginBottom: "8px" }}>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none">
              <path d="M30 8H2M6 3l-5 5 5 5M14 4l-4 4 4 4M22 5l-2 3 2 3" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
            <h2 className="cert-gothic" style={{ margin: "0", fontSize: "36px", fontWeight: "normal", color: "#051D40", lineHeight: "1" }}>
              Certificate of Internship
            </h2>
            <svg width="32" height="16" viewBox="0 0 32 16" fill="none" style={{ transform: "scaleX(-1)" }}>
              <path d="M30 8H2M6 3l-5 5 5 5M14 4l-4 4 4 4M22 5l-2 3 2 3" stroke="#C5A059" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </div>

          <p className="cert-sans" style={{ fontSize: "13px", fontWeight: "600", color: "#4A5568", margin: "0 auto 20px", letterSpacing: "0.5px" }}>
            THIS CERTIFICATE IS PROUDLY PRESENTED TO
          </p>

          <h3 className="cert-name" style={{ fontSize: "80px", margin: "10px auto 16px", color: "#051D40", fontWeight: "normal", lineHeight: "1", minHeight: "80px" }}>
            {intern.fullName || "Intern Name"}
          </h3>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "6px auto 14px" }}>
            <div style={{ width: "350px", height: "1px", background: "linear-gradient(to right, transparent, #C5A059, transparent)" }} />
          </div>

          <p className="cert-sans" style={{ maxWidth: "800px", margin: "0 auto", fontSize: "13px", color: "#1A202C", lineHeight: "1.6", fontWeight: "500" }}>
            For successfully completing the Internship Program at PrernaVistaar Foundation
            and demonstrating dedication, professionalism, responsibility and active
            participation throughout the program.
          </p>

          <div className="cert-sans" style={{ display: "flex", justifyContent: "center", gap: "40px", margin: "20px auto 0", fontSize: "12px", color: "#051D40", fontWeight: "600" }}>
            <span>Internship Duration: <strong>{startDate} — {endDate}</strong></span>
            <span>Department / Area: <strong>{intern.department || "General"}</strong></span>
          </div>
        </div>

        <div
          className="cert-sans"
          style={{
            position: "absolute",
            bottom: "48px",
            left: "75px",
            right: "75px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <table style={{ borderCollapse: "collapse", fontSize: "11px", color: "#051D40", width: "260px", textAlign: "left" }}>
            <tbody>
              <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                <td style={{ padding: "5px 0", fontWeight: "700", width: "125px" }}>Registration No.</td>
                <td style={{ padding: "5px 0", color: "#4A5568", fontWeight: "600" }}>: {intern.registrationNumber || "PVF/I/2026/1001"}</td>
              </tr>
              <tr style={{ borderBottom: "1px solid #E2E8F0" }}>
                <td style={{ padding: "5px 0", fontWeight: "700" }}>Certificate No.</td>
                <td style={{ padding: "5px 0", color: "#4A5568", fontWeight: "600" }}>: {intern.certificateNumber || "CERT-PVF-I-2026-1001"}</td>
              </tr>
              <tr>
                <td style={{ padding: "5px 0", fontWeight: "700" }}>Issue Date</td>
                <td style={{ padding: "5px 0", color: "#4A5568", fontWeight: "600" }}>: {issueDate}</td>
              </tr>
            </tbody>
          </table>

          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", bottom: "-10px", zIndex: 10 }}>
            <img src="/images/seal.png" alt="Official Seal" style={{ width: "120px", height: "120px", objectFit: "contain" }} />
          </div>

          <div style={{ display: "flex", alignItems: "flex-end", gap: "28px" }}>
            <div style={{ textAlign: "center", width: "115px" }}>
              <img src="/images/sign-mohit.mittal.png" alt="Mohit Mittal Signature" style={{ height: "40px", objectFit: "contain", marginBottom: "2px" }} />
              <div style={{ borderTop: "1px solid #051D40", paddingTop: "4px" }}>
                <div style={{ fontWeight: "700", color: "#051D40", fontSize: "12px" }}>Mohit Mittal</div>
                <div style={{ fontSize: "8px", color: "#4A5568", fontWeight: "700", letterSpacing: "0.5px" }}>PROGRAM COORDINATOR</div>
              </div>
            </div>

            <div style={{ textAlign: "center", width: "115px" }}>
              <img src="/images/sign-bharat.seturiya.png" alt="Bharat Seturiya Signature" style={{ height: "40px", objectFit: "contain", marginBottom: "2px" }} />
              <div style={{ borderTop: "1px solid #051D40", paddingTop: "4px" }}>
                <div style={{ fontWeight: "700", color: "#051D40", fontSize: "12px" }}>Bharat Seturiya</div>
                <div style={{ fontSize: "8px", color: "#4A5568", fontWeight: "700", letterSpacing: "0.5px" }}>FOUNDER / DIRECTOR</div>
              </div>
            </div>

            <div style={{ textAlign: "center" }}>
              <div style={{ background: "#fff", padding: "4px", borderRadius: "2px", boxShadow: "0 0 4px rgba(0,0,0,0.06)", display: "inline-block", border: "1px solid #CBD5E1" }}>
                <QRCodeSVG value={verifyUrl} size={64} level="M" />
              </div>
              <div style={{ marginTop: "4px", color: "#051D40", fontSize: "7.5px", fontWeight: "700", width: "75px", lineHeight: "1.2" }}>
                Scan to Verify
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

CertificateOfInternship.displayName = "CertificateOfInternship";

export default CertificateOfInternship;