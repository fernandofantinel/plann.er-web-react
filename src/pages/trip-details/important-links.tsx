import { Link2, Plus } from "lucide-react"
import { Button } from "../../components/button"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { api } from "../../lib/axios"

interface Link {
  id: string
  title: string
  url: string
}[]

interface ImportantLinksProps {
  openCreateLinkModal: () => void
}

export function ImportantLinks({
  openCreateLinkModal
}: ImportantLinksProps) {
  const { tripID } = useParams()
  const [links, setLinks] = useState<Link[]>([])

  useEffect(() => {
    api.get(`/trips/${tripID}/links`).then(response => setLinks(response.data.links))
  }, [tripID])

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Links importantes</h2>
      <div className="space-y-5">

        {links.length > 0 ?
          links.map(link => {
            return (
              <div key={link.id} className="flex items-center justify-between gap-4">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">{link.title}</span>
                  <a href={link.url} className="block text-xs text-zinc-400 truncate hover:text-zinc-200">
                    {link.url}
                  </a>
                </div>
                <Link2 className="text-zinc-400 size-5 shrink-0" />
              </div>
            )
          }) : (
            <p className="text-sm text-zinc-500">
              Nenhum link salvo.
            </p>
          )
        }
      </div>

      <Button
        onClick={openCreateLinkModal}
        colour="secondary"
        size="full"
      >
        <Plus className="size-5" />
        Cadastrar novo link
      </Button>
    </div>
  )
}