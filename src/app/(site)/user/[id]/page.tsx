export default async function UserPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  console.log('>>>>user page', id)

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">User {id}</h1>
    </div>
  )
}
