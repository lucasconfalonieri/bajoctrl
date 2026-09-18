import "server-only";
import { Resend } from "resend";
import { getRubro } from "./rubros";
import type { LeadInput } from "./validation";

const FROM_ADDRESS = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";

const COLORS = {
  maroon: "#741C28",
  maroonDeep: "#591420",
  pink: "#FF8AE5",
  pinkLight: "#FFD2D9",
  ink: "#2D2D2D",
  cream: "#FFF6F2",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

const FONT_DISPLAY = "'Unbounded','Segoe UI',Arial,sans-serif";
const FONT_BODY = "'Space Grotesk','Segoe UI',Arial,sans-serif";
const FONT_MONO = "'JetBrains Mono','Courier New',monospace";

// Dotted grid, same spirit as the site's .bg-grid — built as a tiny tiled
// SVG data URI since email clients don't reliably support CSS gradients.
const DOT_GRID = (color: string) =>
  `url("data:image/svg+xml,${encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24'><circle cx='1' cy='1' r='1' fill='${color}'/></svg>`
  )}")`;

function buildEmailHtml(lead: LeadInput & { id: string }, siteUrl: string) {
  const rubroDef = getRubro(lead.rubro);
  const rubroLabel = rubroDef?.label ?? lead.rubro;
  const logoUrl = `${siteUrl}/brand/wordmark-cream.png`;
  const detailUrl = `${siteUrl}/admin/leads/${lead.id}`;

  const generalRows: [string, string | undefined][] = [
    ["Nombre y apellido", lead.nombre_apellido],
    ["Negocio / marca", lead.nombre_negocio],
    ["Teléfono", lead.telefono],
    ["Email", lead.email],
    ["Ciudad", lead.ciudad],
    ["Antigüedad del negocio", lead.antiguedad_negocio],
  ];

  const detalleRows: [string, string][] = rubroDef
    ? rubroDef.fields
        .map((field): [string, string] | null => {
          const value = lead.detalle_rubro[field.name];
          if (!value) return null;
          return [field.label, Array.isArray(value) ? value.join(", ") : value];
        })
        .filter((row): row is [string, string] => row !== null)
    : [];

  const digitalRows: [string, string | undefined][] = [
    ["Redes activas", lead.redes_activas],
    ["Usuario Instagram/Facebook", lead.redes_handle],
    ["Tono de comunicación", lead.tono_comunicacion],
    ["Presupuesto para pauta", lead.presupuesto_ads],
    ["Objetivo principal", lead.objetivo_principal],
    ["Materiales visuales", lead.materiales_visuales?.join(", ")],
    ["Restricciones de marca", lead.restricciones_marca],
  ];

  const row = (label: string, value: string, isLast: boolean) => `
    <tr>
      <td style="padding:${isLast ? "10px" : "10px"} 0 ${isLast ? "0" : "10px"};border-bottom:${isLast ? "none" : "1px solid #f4e9e6"};" colspan="2">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td width="38%" style="font:12px/1.5 ${FONT_MONO};color:#7a4a48;text-transform:uppercase;letter-spacing:.04em;vertical-align:top;padding-right:12px;">
              ${escapeHtml(label)}
            </td>
            <td style="font:15px/1.55 ${FONT_BODY};color:${COLORS.ink};vertical-align:top;">
              ${escapeHtml(value)}
            </td>
          </tr>
        </table>
      </td>
    </tr>`;

  const section = (title: string, rows: [string, string | undefined][]) => {
    const filled = rows.filter((r): r is [string, string] => Boolean(r[1]));
    if (filled.length === 0) return "";
    return `
      <tr>
        <td style="padding:0 28px 20px;">
          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${COLORS.cream};border-radius:16px;">
            <tr>
              <td style="padding:20px 22px;">
                <p style="margin:0 0 12px;font:700 12px/1 ${FONT_DISPLAY};color:${COLORS.maroon};text-transform:uppercase;letter-spacing:.06em;">
                  ${escapeHtml(title)}
                </p>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  ${filled.map(([label, value], i) => row(label, value, i === filled.length - 1)).join("")}
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  };

  return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="color-scheme" content="light" />
    <meta name="supported-color-schemes" content="light" />
    <style>
      @import url('https://fonts.googleapis.com/css2?family=Unbounded:wght@600;700&family=Space+Grotesk:wght@400;500;700&family=JetBrains+Mono:wght@400;500&display=swap');
      :root { color-scheme: light; supported-color-schemes: light; }
    </style>
  </head>
  <body style="margin:0;padding:32px 12px;background-color:#f2e9e6;background-image:${DOT_GRID("%23741c2814")};">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
      <tr>
        <td align="center">
          <table role="presentation" width="580" cellpadding="0" cellspacing="0" bgcolor="#ffffff" style="max-width:580px;width:100%;background-color:#ffffff;border-radius:24px;border:2px solid ${COLORS.maroon};overflow:hidden;box-shadow:0 12px 32px rgba(89,20,32,0.12);">
            <tr>
              <td bgcolor="${COLORS.maroon}" style="background-color:${COLORS.maroon};padding:30px 32px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="vertical-align:middle;">
                      <p style="margin:0;font:700 11px/1 ${FONT_MONO};color:${COLORS.pinkLight};text-transform:uppercase;letter-spacing:.1em;">
                        Nuevo presupuesto solicitado
                      </p>
                      <h1 style="margin:8px 0 0;font:700 24px/1.3 ${FONT_DISPLAY};color:${COLORS.cream};">
                        ${escapeHtml(lead.nombre_negocio || lead.nombre_apellido)}
                      </h1>
                      <p style="margin:6px 0 0;font:14px/1.4 ${FONT_BODY};color:${COLORS.pinkLight};">
                        ${escapeHtml(rubroLabel)}
                      </p>
                    </td>
                    <td width="150" style="vertical-align:middle;text-align:right;">
                      <img src="${logoUrl}" width="140" height="52" alt="bajo ctrl estudio creativo" style="display:block;margin-left:auto;" />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr><td style="height:24px;background-color:#ffffff;" bgcolor="#ffffff"></td></tr>

            ${section("Datos generales", generalRows)}
            ${section(rubroDef?.eventMode ? "Sobre el evento o proyecto" : `Sobre el negocio · ${rubroLabel}`, detalleRows)}
            ${section("Presencia digital y objetivos", digitalRows)}

            <tr>
              <td style="padding:4px 28px 32px;">
                <a href="${detailUrl}" style="display:inline-block;background-color:${COLORS.pink};color:${COLORS.ink};text-decoration:none;font:700 13px/1 ${FONT_BODY};text-transform:uppercase;letter-spacing:.04em;padding:15px 26px;border-radius:999px;">
                  Ver el pedido completo →
                </a>
              </td>
            </tr>

            <tr>
              <td bgcolor="${COLORS.ink}" style="background-color:${COLORS.ink};padding:20px 32px;">
                <p style="margin:0;font:11px/1.4 ${FONT_MONO};color:#ffffffcc;text-transform:uppercase;letter-spacing:.06em;">
                  bajo ctrl · estudio creativo · corrientes, argentina
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function buildEmailText(lead: LeadInput & { id: string }, siteUrl: string, rubroLabel: string) {
  const rubroDef = getRubro(lead.rubro);
  const detalleLines = rubroDef
    ? rubroDef.fields
        .map((field) => {
          const value = lead.detalle_rubro[field.name];
          if (!value) return null;
          return `- ${field.label}: ${Array.isArray(value) ? value.join(", ") : value}`;
        })
        .filter(Boolean)
        .join("\n")
    : "";

  return [
    `Nuevo presupuesto solicitado — ${rubroLabel}`,
    "",
    `Nombre: ${lead.nombre_apellido}`,
    lead.nombre_negocio ? `Negocio/marca: ${lead.nombre_negocio}` : null,
    `Teléfono: ${lead.telefono}`,
    `Email: ${lead.email}`,
    lead.ciudad ? `Ciudad: ${lead.ciudad}` : null,
    "",
    detalleLines ? `Detalle de ${rubroLabel}:\n${detalleLines}` : null,
    "",
    `Ver el pedido completo: ${siteUrl}/admin/leads/${lead.id}`,
  ]
    .filter(Boolean)
    .join("\n");
}

export async function sendNewLeadEmail(lead: LeadInput & { id: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.ADMIN_NOTIFICATION_EMAIL;
  if (!apiKey || !to) {
    console.warn("Resend/admin email no configurados — se omite el aviso de nuevo lead.");
    return;
  }

  const resend = new Resend(apiKey);
  const rubroLabel = getRubro(lead.rubro)?.label ?? lead.rubro;
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bajoctrl.com.ar";

  try {
    await resend.emails.send({
      from: `bajo ctrl <${FROM_ADDRESS}>`,
      to,
      subject: `Nuevo presupuesto: ${lead.nombre_negocio || lead.nombre_apellido} (${rubroLabel})`,
      html: buildEmailHtml(lead, siteUrl),
      text: buildEmailText(lead, siteUrl, rubroLabel),
    });
  } catch (err) {
    // Never let an email failure block the lead from being saved — it's
    // already in Supabase by the time this runs, so the worst case is the
    // admin just checks the dashboard instead of getting the ping.
    console.error("Error enviando el mail de aviso de nuevo lead:", err);
  }
}
