import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Partners - r/IGCSE',
  description: 'Partners and collaborators of the r/IGCSE Server',
}

export default function PartnersPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-4xl flex-col">
        <h1 className="self-center text-3xl font-bold underline decoration-red-500 decoration-2 underline-offset-8 mb-4">
          r/IGCSE Partners
        </h1>
        <h2 className="self-center text-gray-400 text-center text-m mb-4 ">
          Some information about what partners of r/IGCSE are and how they help our community lorem ipsum idk what to put here lol
        </h2>

        <div className="flex w-full items-center justify-center gap-16 mb-6">
          <div className="flex w-100% flex-col gap-6">
            <div className="rounded-lg border-t-4 border-red-500 bg-[#141417] p-4">
              <div className="flex items-center gap-1">
                <img src="flag.png" className="h-16 w-16" />
                <h1 className="text-2xl font-bold">Partner Name</h1>
              </div>
              <p className="mr-6 mt-2 text-left text-base text-white-500">
                Partner Description
                <br /> <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nesciunt laudantium est atque laborum saepe voluptate excepturi, dignissimos velit, quas nam distinctio sed iusto iure fugit fuga aliquid ab repellat.
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-16 mb-6">
          <div className="flex w-100% flex-col gap-6">
            <div className="rounded-lg border-t-4 border-red-500 bg-[#141417] p-4">
              <div className="flex items-center gap-1">
                <img src="flag.png" className="h-16 w-16" />
                <h1 className="text-2xl font-bold">Partner Name</h1>
              </div>
              <p className="mr-6 mt-2 text-left text-base text-white-500">
                Partner Description
                <br /> <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nesciunt laudantium est atque laborum saepe voluptate excepturi, dignissimos velit, quas nam distinctio sed iusto iure fugit fuga aliquid ab repellat.
              </p>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center justify-center gap-16 mb-6">
          <div className="flex w-100% flex-col gap-6">
            <div className="rounded-lg border-t-4 border-red-500 bg-[#141417] p-4">
              <div className="flex items-center gap-1">
                <img src="flag.png" className="h-16 w-16" />
                <h1 className="text-2xl font-bold">Partner Name</h1>
              </div>
              <p className="mr-6 mt-2 text-left text-base text-white-500">
                Partner Description
                <br /> <br />
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nesciunt laudantium est atque laborum saepe voluptate excepturi, dignissimos velit, quas nam distinctio sed iusto iure fugit fuga aliquid ab repellat.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center mt-6 mb-6">
          <h1 className="text-3xl font-bold underline decoration-red-500 decoration-2 underline-offset-8 mb-8 ">
            Partnership Requirements
          </h1>

          <p className="max-w-2xl text-base text-white-500 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nesciunt laudantium est atque laborum saepe voluptate excepturi, dignissimos velit, quas nam distinctio sed iusto iure fugit fuga aliquid ab repellat.
          </p>
        </div>

        <div className="flex flex-col items-center mt-6 mb-6">
          <h1 className="text-3xl font-bold underline decoration-red-500 decoration-2 underline-offset-8 mb-8 ">
            Interested in partnering with r/IGCSE?
          </h1>

          <p className="max-w-2xl text-base text-white-500 text-center">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui nesciunt laudantium est atque laborum saepe voluptate excepturi, dignissimos velit, quas nam distinctio sed iusto iure fugit fuga aliquid ab repellat.
          </p>
        </div>

      </div>
    </div>
  )
}
