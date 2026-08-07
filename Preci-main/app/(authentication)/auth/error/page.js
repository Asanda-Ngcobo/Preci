
// import Card from "../../_components/_auth_components/Card"
import Card from "@/app/_components/_auth_components/Card"
import CardContent from "@/app/_components/_auth_components/CardContent"
import CardHeader from "@/app/_components/_auth_components/CardHeader"



export default async function Page({ searchParams }) {
  const params = await searchParams

  return (
    <div className="flex h-[80vh]
     w-full items-center justify-center p-6 md:p-10">
      <div className="w-[50vh] max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader className='text-2xl'>
              Sorry, something went wrong.
            </CardHeader>
            <CardContent>
              {params?.error ? (
                <p className="text-sm text-muted-foreground">Code error: {params.error}</p>
              ) : (
                <p className="text-sm text-muted-foreground">An unspecified error occurred.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
