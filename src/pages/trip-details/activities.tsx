import { CircleCheck } from "lucide-react"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../../lib/axios"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface Activity {
  date: string
  activities: {
    id: string
    title: string
    occurs_at: string
  }[]
}

export function Activities() {
  const { tripID } = useParams()
  const [activities, setActivities] = useState<Activity[]>([])

  useEffect(() => {
    api.get(`trips/${tripID}/activities`).then(response => setActivities(response.data.activities))
  }, [tripID])

  return (
    <div className="space-y-8">

      {activities.map(day => {
        return (
          <div key={day.date} className="space-y-2.5">
            <div className="flex items-baseline gap-2">
              <span className="text-xl font-semibold text-zinc-300">Dia {format(day.date, "d")}</span>
              <span className="text-xs text-zinc-500 capitalize">{format(day.date, "EEEE", { locale: ptBR })}</span>
            </div>
            {day.activities.length > 0 ? (
              <div className="space-y-2.5">
                {day.activities.map(activity => {
                  return (
                    <div key={activity.id} className="flex items-center gap-3 px-4 py-2.5 bg-zinc-900 shadow-shape rounded-xl">
                      <CircleCheck className="size-5 text-lime-300" />
                      <span className="text-zinc-100">{activity.title}</span>
                      <span className="text-zinc-400 text-sm ml-auto">{format(activity.occurs_at, "kk':'mm")}</span>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-sm text-zinc-500">
                Nenhuma atividade cadastrada nessa data.
              </p>
            )}
          </div>
        )
      })}
    </div>
  )
}