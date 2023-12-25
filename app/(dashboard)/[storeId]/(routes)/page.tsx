import prismadb from "@/lib/prismadb"

interface DashboardPageProps {
  params: { storeId: string }
}

const DashboardPage: React.FC<DashboardPageProps> = async ({
  params
}) => {
  const store = await prismadb.store.findFirst({
    where: { id: params.storeId },
  })

  return (
    <>
      <div>This is the Dashboard</div>
      <h1>Store ID: {store?.name}</h1>
    </>
  )
}

export default DashboardPage
