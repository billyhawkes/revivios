import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/habits')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/habits"!</div>
}
