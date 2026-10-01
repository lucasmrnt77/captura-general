export function isArgentina(country: string | null | undefined, phone: string | null | undefined): boolean {
  if (country?.toUpperCase() === "AR") return true
  const cleanPhone = String(phone || "").replace(/[^0-9]/g, "")
  return cleanPhone.startsWith("54")
}
