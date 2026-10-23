/**
 * Mortgage Report Print & PDF Export Utility
 * Generates an official, printable financial calculation report
 * containing user inputs, calculation assumptions, PITI breakdown, and required federal disclosures.
 */

import { siteConfig } from "@/lib/config/siteConfig";

export interface ReportData {
  calculatorName: string;
  generatedDate: string;
  inputs: Array<{ label: string; value: string }>;
  results: Array<{ label: string; value: string; isHighlight?: boolean }>;
  notes?: string[];
}

export function exportMortgageReport(data: ReportData) {
  if (typeof window === "undefined") return;

  const printWindow = window.open("", "_blank", "width=850,height=900");
  if (!printWindow) {
    alert("Please allow popups to download or print your mortgage summary report.");
    return;
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8" />
      <title>${data.calculatorName} Summary Report - ${siteConfig.brand.name}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
          color: #10243a;
          margin: 40px;
          line-height: 1.5;
        }
        .header {
          border-bottom: 2px solid #10243a;
          padding-bottom: 20px;
          margin-bottom: 25px;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }
        .logo-title {
          font-size: 24px;
          font-weight: 900;
          color: #10243a;
        }
        .tagline {
          font-size: 12px;
          color: #64748b;
          margin-top: 3px;
        }
        .meta {
          text-align: right;
          font-size: 12px;
          color: #64748b;
        }
        h2 {
          font-size: 18px;
          margin-top: 25px;
          margin-bottom: 12px;
          color: #10243a;
          border-bottom: 1px solid #e2e8f0;
          padding-bottom: 6px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
          font-size: 13px;
        }
        th, td {
          padding: 8px 12px;
          text-align: left;
          border-bottom: 1px solid #e2e8f0;
        }
        th {
          background-color: #f8f7f3;
          font-weight: 600;
          color: #172f4d;
        }
        .highlight-row {
          background-color: #f0f7ff;
          font-weight: bold;
          font-size: 15px;
        }
        .highlight-row td {
          color: #10243a;
          border-top: 1px solid #cbd5e1;
          border-bottom: 2px solid #10243a;
        }
        .disclosures {
          margin-top: 40px;
          padding-top: 15px;
          border-top: 1px solid #cbd5e1;
          font-size: 10px;
          color: #64748b;
          line-height: 1.4;
        }
        .footer-cta {
          margin-top: 20px;
          padding: 12px;
          background: #f8f7f3;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 11px;
        }
        @media print {
          body { margin: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div>
          <div class="logo-title">✦ ${siteConfig.brand.name}</div>
          <div class="tagline">${siteConfig.brand.legalName} • NMLS ID #${siteConfig.brand.nmlsId}</div>
          <div class="tagline">Equal Housing Lender • Direct Residential Mortgage Advisory</div>
        </div>
        <div class="meta">
          <div><strong>Report:</strong> ${data.calculatorName}</div>
          <div><strong>Date Generated:</strong> ${data.generatedDate}</div>
          <div><strong>Direct Desk:</strong> ${siteConfig.contact.phoneFormatted}</div>
        </div>
      </div>

      <div class="no-print" style="margin-bottom: 20px; text-align: right;">
        <button onclick="window.print()" style="padding: 8px 16px; background: #10243a; color: white; border: none; border-radius: 4px; font-weight: bold; cursor: pointer;">
          Print / Save as PDF
        </button>
      </div>

      <h2>Calculation Results & Monthly Breakdown</h2>
      <table>
        <thead>
          <tr>
            <th>Item / Metric</th>
            <th style="text-align: right;">Calculated Amount</th>
          </tr>
        </thead>
        <tbody>
          ${data.results
            .map(
              (r) => `
            <tr class="${r.isHighlight ? "highlight-row" : ""}">
              <td>${r.label}</td>
              <td style="text-align: right;">${r.value}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <h2>User-Specified Input Parameters</h2>
      <table>
        <thead>
          <tr>
            <th>Input Parameter</th>
            <th style="text-align: right;">Value</th>
          </tr>
        </thead>
        <tbody>
          ${data.inputs
            .map(
              (i) => `
            <tr>
              <td>${i.label}</td>
              <td style="text-align: right;">${i.value}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>

      <div class="footer-cta">
        <strong>Next Step:</strong> To lock in this rate or request an official underwritten pre-approval letter for purchase or refinance, contact Senior Lending Officer <strong>${siteConfig.primaryLoanOfficer.name}</strong> (NMLS #${siteConfig.primaryLoanOfficer.nmlsId}) at ${siteConfig.primaryLoanOfficer.phone} or visit <strong>https://northstarmortgage.com/get-started</strong>.
      </div>

      <div class="disclosures">
        <p><strong>Regulatory Compliance Notice:</strong> ${siteConfig.disclosures.calculatorDisclaimer}</p>
        <p>${siteConfig.disclosures.generalRateDisclaimer}</p>
        <p>${siteConfig.disclosures.licensingDisclaimer}</p>
      </div>

      <script>
        window.onload = function() {
          setTimeout(function() {
            window.print();
          }, 300);
        };
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}
