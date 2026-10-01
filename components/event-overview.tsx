"use client"

import { Card } from "@/components/ui/card"
import { CheckCircle, TrendingUp, DollarSign, Clock } from "lucide-react"
import { useEffect, useState } from "react"

export function EventOverview() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("event-overview")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const benefits = [
    {
      icon: TrendingUp,
      title: "Este evento es para vos si...",
      description: "Estás buscando una segunda fuente de ingresos que alivie tu economía mes a mes",
    },
    {
      icon: DollarSign,
      title: "Querés generar dinero",
      description: "sin arriesgar tus ahorros",
    },
    {
      icon: Clock,
      title: "Tenés tiempo disponible",
      description: "1 o 2 horas al día que podrías aprovechar mejor",
    },
    {
      icon: CheckCircle,
      title: "Querés cobrar en dólares",
      description: "desde tu casa, con tu compu e internet",
    },
  ]

  return (
    <section id="event-overview" className="py-20 bg-card/50">
      <div className="container mx-auto px-10 md:px-6">
        <div className="text-center mb-16">
          <h2
            className={`text-3xl md:text-5xl font-bold mb-6 text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
          >
            ¿Por qué este entrenamiento es diferente?
          </h2>
          <p
            className={`text-xl text-muted-foreground max-w-3xl mx-auto text-balance ${isVisible ? "animate-fade-in-up" : "opacity-0"} delay-200`}
          >
            No es otro curso teórico. Es el método exacto que transformó la vida financiera de traders reales.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <Card
              key={index}
              className={`p-6 bg-card border-border hover:border-primary/50 transition-all duration-300 hover:scale-105 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-card-foreground">{benefit.title}</h3>
                <p className="text-muted-foreground text-sm">{benefit.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
