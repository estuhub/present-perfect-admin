import prismadb from "@/lib/prismadb"
import { formatter } from "@/lib/utils"
import { format } from "date-fns"

import { ProductClient } from "./components/client"
import { ProductColumn } from "./components/columns"

const Products = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc"
    }
  })

  const formattedProducts: ProductColumn[] = products.map(item => ({
    id: item.id,
    name: item.name,
    category: item.category.name,
    size: item.size.name,
    color: item.color.name,
    price: formatter.format(item.price.toNumber()),
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy")
  }))
  
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <ProductClient data={formattedProducts} />
        </div>
    </div>
  )
}

export default Products
