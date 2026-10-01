"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function ClientGraciasPage() {
  const router = useRouter()
  const whatsappGroupLink = "https://chat.whatsapp.com/CJGPOYBMEQcLCMfL1pX61T"
  const supportLink =
    "https://wa.me/59899860812?text=Hola%2C%20estoy%20teniendo%20problemas%20para%20acceder%20al%20evento%"

  useEffect(() => {
    router.replace("/gracias-video")
  }, [router])

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <p className="text-white">Redirigiendo...</p>
    </div>
  )
}
